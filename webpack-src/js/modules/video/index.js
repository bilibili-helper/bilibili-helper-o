/**
 * Author: DrowsyFlesh
 * Create: 2018/10/9
 * Description:
 */

import {Feature} from 'Modules/feature';
import URL from 'url-parse';

export class Video extends Feature {
    constructor() {
        super({
            name: 'video',
            kind: 'video',
            permissions: {},
            GUI: 'VideoGUI',
            options: {
                on: true,
                title: '视频相关',
                optionType: 'checkbox',
                options: [
                    {key: 'download', title: '视频下载', on: true},
                    {key: 'danmu', title: '弹幕查询', on: true},
                ],
            },
        });
        this.videoMap = {};
    }

    launch = () => {};

    addListener = () => {
        const requestFilter = {
            urls: [
                //'*://*.bilibili.com/bangumi/play/ss*',
                //'*://*.bilibili.com/bangumi/play/ep*',
                //'*://*.bilibili.com/video/av*',
                //'*://api.bilibili.com/*',
                //'*://api.bilibili.com/x/web-interface/view?aid=*',
                '*://bangumi.bilibili.com/player/web_api/v2/playurl*', // 视频源地址，清晰度
                '*://api.bilibili.com/x/v2/dm/history?type=*', // 历史弹幕
                '*://api.bilibili.com/x/v1/dm/list.so?oid=*', // 最新弹幕
                //'https://api.bilibili.com/x/v2/dm/history/index?type=1&oid=57642404&month=2018-10', // 某月历史弹幕列表
            ],
            //types: ['main_frame'],
        };
        chrome.webRequest.onCompleted.addListener((details) => {
            const {tabId} = details;
            const url = new URL(details.url, '', true);
            const {pathname, query} = url;
            //console.log('onCompleted', pathname);
            if (pathname === '/player/web_api/v2/playurl') { // 视频源地址，清晰度
                this.videoMap[tabId] = query; // 缓存视频信息
                console.log(query);
                chrome.tabs.sendMessage(tabId, {commend: 'videoInfo', videoInfo: query}); // 发送视频讯息
            } else if (pathname === '/x/v2/dm/history' && query.date) { // 如果tab请求了历史弹幕
                // 发送弹幕查询日期, 告知tab页加载制定日期弹幕
                chrome.tabs.sendMessage(tabId, {commend: 'historyDanmu', date: query.date});
            } else if (pathname === '/x/v1/dm/list.so') { // 如果tab请求了当天弹幕
                chrome.tabs.sendMessage(tabId, {commend: 'currentDanmu'}); // 告知tab页加载当天弹幕
            }
        }, requestFilter, ['responseHeaders']);

        // 当页面关闭后，清理缓存的视频数据
        chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
            const {isWindowClosing} = removeInfo;
            if (!isWindowClosing && this.videoMap[tabId]) {
                delete this.videoMap[tabId];
                //console.info(`TadID ${tabId}'s data has been deleted.`);
            }
        });
        // 当页面被激活后再发送相关请求
        chrome.tabs.onActivated.addListener((tabId, selectInfo) => {
            if (this.videoMap[tabId]) {}
        });
        //console.log(chrome.tabs);
        //chrome.webRequest.onResponseStarted.addListener((details) => {
        //    console.log('onResponseStarted', details, url);
        //
        //}, requestFilter, ['responseHeaders']);
    };
}
