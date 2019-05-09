/**
 * Author: Ruo
 * Create: 2018-08-20
 * Description: 我的关注 视频自动推送 功能
 */
import $ from 'jquery';
import _ from 'lodash';
import {Feature} from 'Libs/feature';
import {getURL, __, toDuration} from 'Utils';
import apis from './apis';

export {DynamicCheckUI} from './UI/index';

const MAX_LIST_NUMBERS = 100;

export class DynamicCheck extends Feature {
    constructor() {
        super({
            name: 'dynamicCheck',
            kind: 'popup',
            permissions: ['login', 'notifications'],
            settings: { // 指该feature的配置
                on: true, // 指feature是否执行launch function
                title: '动态推送', // 在option页面中配置项目的显示名称
                type: 'checkbox', // 指该feature配置子选项的类型，此处为复选框
                description: '视频消息、小视频、专栏、番剧自动推送，每分钟检测一次',
                hasUI: true,
                options: [ // 子选项
                    {title: '推送通知', key: 'notification', on: false},
                    {
                        title: '最近推送列表', key: 'dynamicCheckBox', on: true,
                        description: `在扩展菜单显示${MAX_LIST_NUMBERS}条最近推送的视频`,
                    },
                ],
                subPage: {
                    type: 'checkbox',
                    title: '动态推送',
                    description: '如果都选择关闭，将不会进行进行检测',
                    options: [
                        {key: 'video', title: '视频投稿', on: true, value: 8},
                        {key: 'smallVideo', title: '小视频', on: false, value: 16},
                        {key: 'cv', title: '专栏', on: false, value: 64},
                        {key: 'bangumi', title: '番剧', on: false, value: 512},
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
                if (cookie && cookie.expirationDate > (new Date()).getTime() / 1000) resolve(cookie.value);
                else reject();
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
            if (message.command === 'getDynamicList') sendResponse({feedList: this.currentList, lastCounter: this.lastCounter});
            else if (message.command === 'updateLastDynamicId') {
                if (this.lastList.length > 0) {
                    this.store = this.lastList[0].desc.dynamic_id_str;
                    this.lastCheckDynamicID = this.store;
                    this.oldList = this.lastList.concat(this.oldList);
                    this.lastList = [];
                    this.lastCounter = 0;
                }
            }
            return true;
        });
    };

    permissionHandleLogin = (value) => {
        if (value) !this.hasLaunched && this.launch();
        else this.pause();
    };

    initCurrentList() {
        if (this.typeList.length === 0) return;

        this.getFeed(this.typeList, this.lastDynamicID).then(({code, data, message}) => {
            if (code === 0) {
                const newList = data.cards.slice(0, MAX_LIST_NUMBERS);
                this.currentList = _.map(newList, (card) => {
                    try {
                        card.card = typeof card.card === 'string' ? JSON.parse(card.card) : card.card;
                        if (card.card.duration) card.card.duration = toDuration(card.card.duration);
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
            } else console.warn(message);
        });
    }

    // 检查未读推送
    checkNew = () => {
        this.userId.then((userId) => {
            if (this.typeList.length === 0) return new Promise.reject(false);
            const dynamic_id = this.lastCheckDynamicID ? `&update_num_dy_id=${this.lastCheckDynamicID}` : '';

            return fetch(apis.dynamic_num + `?uid=${userId}&type_list=${this.typeList.join(',')}` + dynamic_id)
            .then(response => response.json())
            .then(({code, data: {new_num}, message}) => {
                if (code !== 0) return console.error(message);
                else if (new_num > 0) return new_num;
            })
            .then((new_num) => {
                if (!new_num) return;
                this.getFeed(this.typeList).then(({code, data, message}) => {
                    if (code !== 0) return console.warn(message);
                    const newList = _.map(data.cards.slice(0, new_num || MAX_LIST_NUMBERS), (card) => {
                        try {
                            card.card = typeof card.card === 'string' ? JSON.parse(card.card) : card.card;
                            if (card.card.duration) card.card.duration = toDuration(card.card.duration);
                            return card;
                        } catch (e) {
                            console.warn(e);
                        }
                    });
                    if (newList[0].desc.dynamic_id_str !== this.currentList[0].desc.dynamic_id_str) {
                        this.lastCheckDynamicID = newList[0].desc.dynamic_id_str;
                        this.lastList = newList.concat(this.lastList);
                        this.currentList = this.lastList.concat(this.oldList);
                        this.lastCounter += new_num;
                        chrome.browserAction.setBadgeText({text: String(this.lastCounter)}); // 设置扩展菜单按钮上的Badge\（￣︶￣）/
                        this.sendNotification(newList);
                    }
                });
            });
        });
    };

    // 处理推送数据 - 不缓存到本地(￣.￣)
    getFeed = (typeList, offsetID) => {
        return this.userId.then((userId) => {
            const url = offsetID ? `${apis.dynamic_history}?uid=${userId}&type_list=${this.typeList}&offset_dynamic_id=${offsetID}` : `${apis.dynamic_new}?uid=${userId}&type_list=${typeList}`;
            return fetch(url).then(response => response.json());
        });
        /*return $.ajax({
                type: 'get',
                url,
                success: ({code, data}) => {
                    if (code === 0) {
                        const newList = data.cards.slice(0, newNum || MAX_LIST_NUMBERS);
                        if (newList.length > 0) {
                            // 检查新获取到的列表时候包含之前的条目
                            if (this.lastList.length > 0) {
                                if (this.lastList[0].desc.dynamic_id_str === newList[0].desc.dynamic_id_str) return;
                            }
                            if (this.feedList.length > 0) { // 包含或者初始化获取的话就判定为旧数据
                                if (this.feedList[0].desc.dynamic_id_str === newList[0].desc.dynamic_id_str)
                                    return;
                            }
                        }
                        // 处理新数据列表
                        let newFeedList = _.map(newList, (card) => {
                            try {
                                card.card = typeof card.card === 'string' ? JSON.parse(card.card) : card.card;
                                if (card.card.duration) card.card.duration = toDuration(card.card.duration);
                                return card;
                            } catch (e) {
                                console.warn(e);
                            }
                        });

                        if (this.feedList.length > 0) {
                            this.lastCounter += newFeedList.length;
                            this.lastList.splice(0, 0, ...newFeedList);
                        }
                        this.feedList = newFeedList.concat(this.feedList).slice(0, MAX_LIST_NUMBERS);

                        //this.lastDynamicID = newFeedList.length > 0 ? newFeedList[0].desc.dynamic_id_str : '';
                        //this.store = this.lastDynamicID;

                        if (newFeedList.length > 0 && this.lastCounter > 0) {
                            chrome.browserAction.setBadgeText({text: String(this.lastCounter)}); // 设置扩展菜单按钮上的Badge\（￣︶￣）/
                            resolve(newFeedList);
                        } else resolve();
                    }
                },
            });*/
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
        notificationState && notificationState.on && _.map(newFeedList, ({card, desc}) => {
            const cardData = card;
            const picture = cardData.pic || (cardData.item && cardData.item.cover.default) || cardData.banner_url || cardData.cover;
            const name = (cardData.owner && cardData.owner.name) || (cardData.user && cardData.user.name) || (cardData.author && cardData.author.name);
            const topic = cardData.title || (cardData.item && cardData.item.description) || cardData.new_desc || '';
            const link = this.createLinkByType(desc.type, cardData);
            chrome.notifications.create('bilibili-helper-dynamic-check' + Math.random(), {
                type: 'basic',
                iconUrl: picture || getURL('/statics/imgs/cat.svg'),
                title: __('extensionNotificationTitle'),
                message: `${name ? name + ': ' : ''}${topic}`,
                buttons: [{title: __('extensionNotificationWatch')}],
            }, (notificationId) => {
                this.feedList[notificationId] = link;
            });
        });
    };
};
