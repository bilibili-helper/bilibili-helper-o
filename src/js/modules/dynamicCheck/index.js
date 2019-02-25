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
        this.lastDynamicID = null;
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

    launch = () => {
        this.feedList = [];
        this.lastCheckTime = Date.now();
        chrome.alarms.create('dynamicCheck', {periodInMinutes: 1});
        this.checkNew();
    };

    pause = () => {
        this.feedList = [];
        this.lastCheckTime = Date.now();
        chrome.alarms.clear('dynamicCheck');
    };

    addListener = () => {
        chrome.alarms.onAlarm.addListener((alarm) => {
            switch (alarm.name) {
                case 'dynamicCheck':
                    this.checkNew();
                    break;
            }
        });
        chrome.notifications.onButtonClicked.addListener((notificationId, index) => {
            if (this.feedList[notificationId] && index === 0) {
                chrome.notifications.clear(notificationId);
                chrome.tabs.create({url: this.feedList[notificationId]});
            }
        });
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'getDynamicList') sendResponse(this.feedList);
        });
    };

    permissionHandleLogin = (value) => {
        if (value) this.launch();
        else this.pause();
    };

    // 检查未读推送
    checkNew = () => this.userId.then((userId) => {
        const options = this.settings.subPage.options;
        const typeList = _.compact(options.map((option) => option.on ? option.value : null));
        const dynamic_id = this.lastDynamicID ? `&update_num_dy_id=${this.lastDynamicID}` : '';
        if (typeList.length > 0) return $.ajax({
            type: 'get',
            url: apis.dynamic_num + `?uid=${userId}&type_list=${typeList.join(',')}` + dynamic_id,
            success: ({code, data: {new_num}, message}) => {
                if (code === 0) {
                    if (!this.lastDynamicID) this.getFeed(typeList);
                    else if (new_num > 0) this.getFeed(typeList, new_num).then(this.sendNotification);
                } else console.error(message);
            },
        });
    });

    // 处理推送数据 - 不缓存到本地(￣.￣)
    getFeed = (typeList, newNum) => {
        return new Promise(resolve => this.userId.then((userId) => {
            return $.ajax({
                type: 'get',
                url: apis.dynamic_new + `?uid=${userId}&type_list=${typeList}`,
                success: ({code, data}) => {
                    if (code === 0) {
                        if (data.cards.length > 0) {
                            const res = _.find(this.feedList, (feed) => feed.desc.dynamic_id_str === data.cards[0].desc.dynamic_id_str);
                            if (res) return;
                        }
                        let newFeedList = _.map(data.cards.slice(0, newNum || MAX_LIST_NUMBERS), (card) => {
                            try {
                                card.card = typeof card.card === 'string' ? JSON.parse(card.card) : card.card;
                                if (card.card.duration) card.card.duration = toDuration(card.card.duration);
                                return card;
                            } catch (e) {
                                console.warn(e);
                            }
                        });
                        this.feedList = newFeedList.concat(this.feedList).slice(0, MAX_LIST_NUMBERS);
                        if (this.feedList.length === 0) this.feedList = data.cards.slice(0, MAX_LIST_NUMBERS);
                        this.lastDynamicID = newFeedList.length > 0 ? newFeedList[0].desc.dynamic_id_str : this.feedList[0].desc.dynamic_id_str;
                        if (newFeedList.length > 0 && newNum > 0) {
                            chrome.browserAction.setBadgeText({text: String(newFeedList.length)}); // 设置扩展菜单按钮上的Badge\（￣︶￣）/
                            resolve(newFeedList);
                        } else resolve();
                    }
                },
            });
        }));
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
            chrome.notifications.create('bilibili-helper-aid' + Math.random(), {
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
