/**
 * Author: Ruo
 * Create: 2018-08-20
 * Description: 我的关注 视频自动推送 功能
 */
import _ from 'lodash';
import {Feature} from 'Libs/feature';
import {getURL, __, toDuration, createNotification} from 'Utils';
import apis from './apis';

export {DynamicCheckUI} from './UI/index.js';

const MAX_LIST_NUMBERS = 50;

export class DynamicCheck extends Feature {
    constructor() {
        super({
            name: 'dynamicCheck',
            kind: 'popup',
            permissions: ['login', 'notifications'],
            settings: { // 指该feature的配置
                on: true, // 指feature是否执行launch function
                title: __('dynamicCheck_name'), // 在option页面中配置项目的显示名称
                type: 'checkbox', // 指该feature配置子选项的类型，此处为复选框
                description: __('dynamicCheck_description'),
                hasUI: true,
                options: [ // 子选项
                    {
                        title: __('dynamicCheck_options_notification'),
                        key: 'notification',
                        on: false,
                    },
                    {
                        title: __('dynamicCheck_options_dynamicCheckBox'),
                        key: 'dynamicCheckBox',
                        on: true,
                        description: __('dynamicCheck_options_dynamicCheckBox_description', [MAX_LIST_NUMBERS]),
                    },
                ],
                subPage: {
                    type: 'checkbox',
                    title: __('dynamicCheck_subPage_title'),
                    description: __('dynamicCheck_subPage_description'),
                    options: [
                        {key: 'video', title: __('dynamicCheck_subPage_options_video'), on: true, value: 8},
                        {key: 'smallVideo', title: __('dynamicCheck_subPage_options_smallVideo'), on: false, value: 16},
                        {key: 'cv', title: __('dynamicCheck_subPage_options_cv'), on: false, value: 64},
                        {key: 'bangumi', title: __('dynamicCheck_subPage_options_bangumi'), on: false, value: 512},
                    ],
                },
            },
        });
        this.hasLaunched = false;
    }

    get userId() {
        return new Promise((resolve, reject) => {
            chrome.cookies.get({
                url: 'http://www.bilibili.com/',
                name: 'DedeUserID',
            }, (cookie) => {
                if (cookie && cookie.expirationDate > (new Date()).getTime() / 1000) {
                    resolve(cookie.value);
                } else {
                    reject();
                }
            });
        });
    }

    get typeList() {
        const options = this.settings.subPage.options;
        const typeList = _.compact(options.map((option) => option.on ? option.value : null));
        return typeList;
    }

    launch = () => {
        this.currentList = [];
        this.lastList = [];
        this.lastCounter = 0;
        this.lastCheckDynamicID = undefined;
        this.lastDynamicID = this.store;
        chrome.alarms.create('dynamicCheck', {periodInMinutes: 1});
        this.initCurrentList();
        this.hasLaunched = true;
    };

    pause = () => {
        this.currentList = [];
        this.oldList = [];
        this.lastList = [];
        this.lastCounter = 0;
        this.lastCheckDynamicID = undefined;
        chrome.alarms.clear('dynamicCheck');
        this.hasLaunched = false;
    };

    addListener = () => {
        chrome.alarms.onAlarm.addListener((alarm) => {
            switch (alarm.name) {
                case 'dynamicCheck':
                    this.lastCheckDynamicID && this.checkNew();
                    break;
            }
            return true;
        });
        chrome.notifications.onButtonClicked.addListener((notificationId, index) => {
            if (this.currentList[notificationId] && index === 0) {
                chrome.notifications.clear(notificationId);
                chrome.tabs.create({url: this.currentList[notificationId]});
            }
        });
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.command === 'getDynamicList') {
                sendResponse({feedList: this.currentList, lastCounter: this.lastCounter});
            } else if (message.command === 'updateLastDynamicId') {
                if (this.lastList.length > 0) {
                    this.store = this.lastList[0].desc.dynamic_id_str;
                    this.lastCheckDynamicID = this.store;
                    this.oldList = this.lastList.concat(this.oldList).slice(0, MAX_LIST_NUMBERS);
                    this.lastList = [];
                    this.lastCounter = 0;
                }
            }
            return true;
        });
    };

    permissionHandleLogin = (value) => {
        if (value) {
            !this.hasLaunched && this.launch();
        } else {
            this.pause();
        }
    };

    initCurrentList() {
        if (this.typeList.length === 0) {
            return;
        }

        this.getFeed(this.typeList).then(({code, data, message}) => {
            if (code === 0) {
                const newList = data.cards.slice(0, MAX_LIST_NUMBERS);
                this.currentList = _.map(newList, (card) => {
                    try {
                        card.card = typeof card.card === 'string' ? JSON.parse(card.card) : card.card;
                        if (card.card.duration) {
                            card.card.duration = toDuration(card.card.duration);
                        }
                        return card;
                    } catch (e) {
                        console.warn(e);
                    }
                });
                this.oldList = this.currentList.slice(0);
                if (this.currentList.length > 0) {
                    if (!this.store) {
                        this.lastCheckDynamicID = this.currentList[0].desc.dynamic_id_str;
                        this.store = this.lastCheckDynamicID;
                    } else {
                        this.lastCheckDynamicID = this.store;
                        this.checkNew();
                    }
                }
            } else {
                console.warn(message);
            }
        });
    }

    // 检查未读推送
    checkNew = () => {
        this.userId.then((userId) => {
            if (this.typeList.length === 0) {
                return new Promise.reject(false);
            }
            const dynamic_id = this.lastCheckDynamicID ? `&update_num_dy_id=${this.lastCheckDynamicID}` : '';

            return fetch(apis.dynamic_num + `?uid=${userId}&type_list=${this.typeList.join(',')}` + dynamic_id)
            .then(response => response.json())
            .then(({code, data: {new_num, update_num}, message}) => {
                if (code !== 0) {
                    return Promise.reject(message);
                } else {
                    return new_num || update_num;
                }
            })
            .then((new_num) => {
                if (!new_num) {
                    return;
                }
                this.getFeed(this.typeList).then(({code, data, message}) => {
                    if (code !== 0) {
                        return console.warn(message);
                    }
                    // 处理刚获取到的推送列表
                    const newList = _.compact(data.cards.slice(0, new_num).map((card) => {
                        try {
                            // 过滤重复项目
                            const sameCard = this.currentList.find((last) => this.isSameCard(last, card));
                            if (sameCard) {
                                return;
                            }

                            card.card = typeof card.card === 'string' ? JSON.parse(card.card) : card.card;
                            if (card.card.duration) {
                                card.card.duration = toDuration(card.card.duration);
                            }
                            return card;
                        } catch (e) {
                            console.warn(e);
                        }
                    }));
                    if (newList.length > 0) { // 如果新的推送列表不为空
                        this.lastCheckDynamicID = newList[0].desc.dynamic_id_str; // 记录新推送列表第一项的id为offset
                        this.lastList = newList.concat(this.lastList); // 更新最近推送列表，连接到上一次的列表上，
                        this.currentList = this.lastList.concat(this.oldList).slice(0, MAX_LIST_NUMBERS); // 更新用于显示在菜单的推送列表
                        this.lastCounter += new_num;
                        chrome.browserAction.setBadgeText({text: String(this.lastCounter)}); // 设置扩展菜单按钮上的Badge\（￣︶￣）/
                        this.sendNotification(newList);
                    }
                });
            });
        });
    };

    isSameCard = (lastCard, newCard) => lastCard.desc.dynamic_id_str === newCard.desc.dynamic_id_str;

    // 处理推送数据 - 不缓存到本地(￣.￣)
    getFeed = (typeList, offsetID) => {
        return this.userId.then((userId) => {
            const url = offsetID ? `${apis.dynamic_history}?uid=${userId}&type_list=${this.typeList}&offset_dynamic_id=${offsetID}` : `${apis.dynamic_new}?uid=${userId}&type_list=${typeList}`;
            return fetch(url).then(response => response.json());
        });
    };

    createLinkByType = (type, data) => {
        switch (type) {
            case 8:
                return 'https://www.bilibili.com/video/av' + data.stat.aid;
            case 16:
                return 'https://vc.bilibili.com/video/' + data.item.id;
            case 64:
                return 'https://www.bilibili.com/read/cv' + data.id;
            case 512:
                return data.url;
        }
    };

    // 弹出推送通知窗口
    sendNotification = (newFeedList) => {
        const notificationState = _.find(this.settings.options, {key: 'notification'});
        const notifyList = newFeedList.slice(0, 3); // 由于目前会累积没查看的推送，一段时候没查后会累积很多，导致集中推送，故改为只推最近三条
        notificationState && notificationState.on && _.map(notifyList, ({card, desc}) => {
            const cardData = card;
            const picture = cardData.pic || (cardData.item && cardData.item.cover.default) || cardData.banner_url || cardData.cover;
            const name = (cardData.owner && cardData.owner.name) || (cardData.user && cardData.user.name) || (cardData.author && cardData.author.name);
            const topic = cardData.title || (cardData.item && cardData.item.description) || cardData.new_desc || '';
            const link = this.createLinkByType(desc.type, cardData);
            createNotification('bilibili-helper-dynamic-check' + Math.random(), {
                type: 'basic',
                iconUrl: picture || getURL('/statics/imgs/cat.svg'),
                title: __('extensionNotificationTitle'),
                message: `${name ? name + ': ' : ''}${topic}`,
                buttons: [{title: __('extensionNotificationWatch')}],
            }, (notificationId) => {
                this.currentList[notificationId] = link;
            });
        });
    };
};
