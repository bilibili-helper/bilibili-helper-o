/**
 * Author: Ruo
 * Create: 2018-08-20
 * Description: 我的关注 视频自动提送 功能
 */
import $ from 'jquery';
import {getOption, isLogin} from 'Utils';

export const dynamicCheck = () => {
    if (getOption('dynamicCheck')) {
        let lastTime = 0; // 记录最后一次检查时间
        const check = () => {
            $.get('https://api.bilibili.com/x/feed/unread/count?type=0', (unreadRes) => {
                console.log(unreadRes);
                if (unreadRes.code === 0 && unreadRes.data.all > 0) {
                    chrome.browserAction.setBadgeText({text: unreadRes.data.all}); // 设置扩展菜单按钮上的Badge
                    $.get('https://api.bilibili.com/x/feed/pull?ps=1&type=0', (feedRes) => {
                       if (feedRes.code === 0 && feedRes.data.feeds instanceof Array) { // 返回数据正确
                           const feed = feedRes.data.feeds[0];
                           if (feed && feed.ctime !== lastTime) { // 请求到不同时间，有新推送啦(～￣▽￣)～
                               lastTime = feed.ctime;
                               // TODO Notification
                           } else return; // 为什么检测过了呢Σ(oﾟдﾟoﾉ)
                       } else { // 请求出问题了！
                           console.error(feedRes);
                       }
                    });
                }
            });
        }
        isLogin().then((login) => {
            if (login) { // 登录后每分钟检查一次
                chrome.alarms.onAlarm.addListener(function (alarm) {
                    switch(alarm.name) {
                        case 'dynamicCheck':
                            check();
                            break;
                    }
                });
                chrome.alarms.create('dynamicCheck', {periodInMinutes: 1});
                check();
            } else { // 没有登录

            }
        });
    }
}

