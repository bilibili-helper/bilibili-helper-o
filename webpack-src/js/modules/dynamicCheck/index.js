/**
 * Author: Ruo
 * Create: 2018-08-20
 * Description: 我的关注 视频自动推送 功能
 */
import $ from 'jquery';
import _ from 'lodash';
import {Feature} from 'Libs/feature';
import {PERMISSION_TYPE, getURL, __} from 'Utils';

const {login, notifications} = PERMISSION_TYPE;
export {DynamicCheckUI} from './UI/index';
export class DynamicCheck extends Feature {
    constructor() {
        super({
            name: 'dynamicCheck',
            kind: 'popup',
            permissions: {login, notifications},
            dependencies: ['debug'],
            settings: { // 指该feature的配置
                on: true, // 指feature是否执行launch function
                title: '动态推送', // 在option页面中配置项目的显示名称
                type: 'checkbox', // 指该feature配置子选项的类型，此处为复选框
                description: '第一时间通知关注UP主的视频消息，每分钟检测一次',
                hasUI: true,
                options: [ // 子选项
                    {title: '推送通知', key: 'notification', on: true},
                    {title: '最近推送列表', key: 'dynamicCheckBox', on: true, description: '在扩展菜单显示10条最近推送的视频'},
                ],
            },
        });
    }

    launch = () => {
        this.feedList = [];
        this.newFeedList = [];
        this.lastCheckTime = Date.now();
        chrome.alarms.create('dynamicCheck', {periodInMinutes: 1});
        this.checkUnread();
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
                    this.checkUnread();
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

    // 检查未读推送
    checkUnread = () => {
        return $.get('https://api.bilibili.com/x/feed/unread/count?type=0', {}, (unreadRes) => {
            if (unreadRes.code === 0 && unreadRes.data.all > 0) {
                chrome.browserAction.setBadgeText({text: String(unreadRes.data.all)}); // 设置扩展菜单按钮上的Badge\（￣︶￣）/
                this.getFeed().then(this.sendNotification);
            }
        });
    };

    // 获取并存储推送数据 - 不缓存到本地(￣.￣)
    getFeed = async () => {
        return $.get('https://api.bilibili.com/x/feed/pull?ps=1&type=0', {}, (feedRes) => {
            const {code, data} = feedRes;
            if (code === 0 && data.feeds instanceof Array) { // 当返回数据正确(￣.￣)
                this.lastCheckTime = Date.now();
                this.newFeedList = _.filter(data.feeds, v => !~_.findIndex(this.feedList, {id: v.id}));
                this.feedList = this.newFeedList.concat(this.feedList).slice(0, 9);
            } else { // 请求出问题了！
                console.error(feedRes);
                chrome.browserAction.setBadgeText({text: 'error'});
            }
        });
    };

    // 弹出推送通知窗口
    sendNotification = () => {
        const notificationState = _.find(this.settings.options, {key: 'notification'});
        notificationState && notificationState.on && _.map(this.newFeedList, (feed) => {
            const {id: aid, addition, ctime} = feed;
            if (feed && ctime !== this.lastCheckTime) { // 请求到不同时间，有新推送啦(～￣▽￣)～
                chrome.notifications.create('bilibili-helper-aid' + aid, {
                    type: 'basic',
                    iconUrl: getURL('/statics/imgs/cat.svg'),
                    title: __('notificationTitle'),
                    message: addition.title,
                    buttons: [{title: __('notificationWatch')}],
                }, (notificationId) => {
                    this.feedList[notificationId] = addition.link;
                });
            } else return; // 为什么检测过了呢Σ(oﾟдﾟoﾉ)
        });
    };
};
