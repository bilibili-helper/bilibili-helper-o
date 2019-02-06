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

const MAX_LIST_NUMBERS = 10;

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
                description: '第一时间通知关注UP主的视频消息，每分钟检测一次',
                hasUI: true,
                options: [ // 子选项
                    {title: '推送通知', key: 'notification', on: false},
                    {title: '最近推送列表', key: 'dynamicCheckBox', on: true, description: '在扩展菜单显示10条最近推送的视频'},
                ],
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
    checkNew = () => this.userId.then((userId) => $.ajax({
        type: 'get',
        url: apis.dynamic_new + `?uid=${userId}&type_list=8,512`,
        success: (dynamic) => {
            if (dynamic.code === 0) {
                if (dynamic.data.new_num > 0) {
                    chrome.browserAction.setBadgeText({text: String(dynamic.data.new_num)}); // 设置扩展菜单按钮上的Badge\（￣︶￣）/
                }
                this.getFeed(dynamic.data).then(this.sendNotification);
            }
        },
    }));

    // 获取并存储推送数据 - 不缓存到本地(￣.￣)
    getFeed = (data) => {
        return new Promise((resolve) => {
            this.lastCheckTime = Date.now();
            const newFeedList = _.compact(_.map(data.cards.slice(0, data.new_num), (card) => {
                if (!~_.findIndex(this.feedList, (o) => o.desc.dynamic_id === card.desc.dynamic_id)) return card;
                else return;
            }));
            this.feedList = newFeedList.concat(this.feedList).slice(0, MAX_LIST_NUMBERS);
            if (this.feedList.length === 0) this.feedList = data.cards.slice(0, MAX_LIST_NUMBERS);
            if (newFeedList.length > 0) resolve(newFeedList);
            else resolve();
        });
    };

    // 弹出推送通知窗口
    sendNotification = (newFeedList) => {
        const notificationState = _.find(this.settings.options, {key: 'notification'});
        notificationState && notificationState.on && _.map(newFeedList, ({card}) => {
            const {owner: {name}, jump_url, pic, aid, title} = JSON.parse(card);
            chrome.notifications.create('bilibili-helper-aid' + aid, {
                type: 'basic',
                iconUrl: pic || getURL('/statics/imgs/cat.svg'),
                title: __('extensionNotificationTitle'),
                message: `${name}: ${title}`,
                buttons: [{title: __('extensionNotificationWatch')}],
            }, (notificationId) => {
                this.feedList[notificationId] = jump_url;
            });
        });
    };
};
