/**
 * Author: Ruo
 * Create: 2018-08-20
 * Description: 我的关注 视频自动推送 功能
 */
import $ from 'jquery';
import _ from 'lodash';
import {Feature} from 'Libs/feature';
import {getURL, __} from 'Utils';
import apis from './apis';

export {DynamicCheckUI} from './UI/index';

const MAX_LIST_NUMBERS = 12;

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
        if (typeList.length > 0) return $.ajax({
            type: 'get',
            url: apis.dynamic_new + `?uid=${userId}&type_list=${typeList.join(',')}`,
            success: (dynamic) => {
                if (dynamic.code === 0) this.getFeed(dynamic.data).then(this.sendNotification);
            },
        });
    });

    // 处理推送数据 - 不缓存到本地(￣.￣)
    getFeed = (data) => {
        return new Promise((resolve) => {
            this.lastCheckTime = Date.now();
            const newFeedList = _.compact(_.map(data.cards.slice(0, data.new_num), (card) => {
                if (!~_.findIndex(this.feedList, (o) => o.desc.dynamic_id === card.desc.dynamic_id)) {
                    card.card = JSON.parse(card);
                    return card;
                }
            }));
            this.feedList = newFeedList.concat(this.feedList).slice(0, MAX_LIST_NUMBERS);
            if (this.feedList.length === 0) this.feedList = data.cards.slice(0, MAX_LIST_NUMBERS);
            if (newFeedList.length > 0) {
                chrome.browserAction.setBadgeText({text: String(data.new_num)}); // 设置扩展菜单按钮上的Badge\（￣︶￣）/
                resolve(newFeedList);
            } else resolve();
        });
    };

    createLinkByType = (type, data) => {
        switch(type) {
            case 8:
                return 'https://www.bilibili.com/video/av' + data.stat.aid;
            case 16:
                return 'https://vc.bilibili.com/video/' + data.id;
            case 64:
                return 'https://www.bilibili.com/read/cv' + data.id;
            case 512:
                return data.url;
        }
    }

    // 弹出推送通知窗口
    sendNotification = (newFeedList) => {
        const notificationState = _.find(this.settings.options, {key: 'notification'});
        notificationState && notificationState.on && _.map(newFeedList, ({card, desc}) => {
            const cardData = JSON.parse(card);
            const {owner, pic, title, item, banner_url, cover, user, author, new_desc} = cardData;
            const picture = pic || (item && item.cover.default) || banner_url || cover;
            const name = (owner && owner.name) || (user && user.name) || (author && author.name);
            const topic = title || (item && item.description) || new_desc || '';
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
