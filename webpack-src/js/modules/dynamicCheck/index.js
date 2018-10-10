/**
 * Author: Ruo
 * Create: 2018-08-20
 * Description: 我的关注 视频自动提送 功能
 */
import $ from 'jquery';
import {Feature} from '../feature';
import {PERMISSION_TYPE} from 'Utils';

const {login, notifications} = PERMISSION_TYPE;

class DynamicCheck extends Feature {
    constructor() {
        super({
            name: 'dynamicCheck',
            kind: 'main',
            GUI: null,
            optionDOM: null,
            permissions: { // q权限
                login,
                notifications,
            },
            options: {
                on: true,
                notify: {
                    title: '视频动态推送通知',
                    type: 'basic',
                    iconUrl: '',
                },
            },
        });
    }

    launch = () => {
        chrome.alarms.onAlarm.addListener((alarm) => {
            switch (alarm.name) {
                case 'dynamicCheck':
                    this.checkUnread();
            }
        });
        chrome.alarms.create('dynamicCheck', {periodInMinutes: 1});
        this.checkUnread();
    };

    lastTime = new Date().getTime();

    // 检查未读推送
    checkUnread = () => {
        $.get('https://api.bilibili.com/x/feed/unread/count?type=0', {}, (unreadRes) => {
            if (unreadRes.code === 0 && unreadRes.data.all > 0) {
                chrome.browserAction.setBadgeText({text: String(unreadRes.data.all)}); // 设置扩展菜单按钮上的Badge
                this.getFeed();
            }
        });
    };

    // 获取推送
    getFeed = () => {
        $.get('https://api.bilibili.com/x/feed/pull?ps=1&type=0', {}, (feedRes) => {
            if (feedRes.code === 0 && feedRes.data.feeds instanceof Array) { // 返回数据正确
                const feed = feedRes.data.feeds[0];
                if (feed && feed.ctime !== this.lastTime) { // 请求到不同时间，有新推送啦(～￣▽￣)～
                    this.lastTime = feed.ctime;
                    const {id, addition} = feed;
                    chrome.notifications.create('bh-' + id, {
                        type: 'basic',
                        iconUrl: this.options.notify.iconUrl,
                        title: chrome.i18n.getMessage('noticeficationTitle'),
                        message: addition.title,
                        isClickable: false,
                        buttons: [{title: chrome.i18n.getMessage('notificationWatch')}],
                    }, function() {});
                    // TODO Notification
                } else return; // 为什么检测过了呢Σ(oﾟдﾟoﾉ)
            } else { // 请求出问题了！
                console.error(feedRes);
            }
        });
    };
};

export {DynamicCheck};
