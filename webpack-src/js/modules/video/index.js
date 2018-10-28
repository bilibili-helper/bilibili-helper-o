/**
 * Author: DrowsyFlesh
 * Create: 2018/10/9
 * Description:
 */

import URL from 'url-parse';
import {define} from 'Utils';
import {Feature} from 'Modules/feature';

export const Video = define(['googleAnalytics'], class Video extends Feature {
    constructor() {
        super({
            name: 'video',
            kind: 'video',
            permissions: {},
            options: {
                on: true,
                title: '视频相关',
                optionType: 'checkbox',
                options: [
                    //{key: 'download', title: '视频下载', on: true},
                    {key: 'danmu', title: '弹幕查询', on: true},
                    {key: 'danmuDownload', title: '弹幕下载', on: false, toggle: false},
                ],
            },
        });
        this.videoMap = {};
    }

    addListener = () => {
        const requestFilter = {
            urls: [
                /**
                 * 新页面首次必定加载
                 */
                //'*://api.bilibili.com/x/web-interface/view?aid=*', // aid 获取视频数据，非清晰度和下载地址
                //'*://api.bilibili.com/x/player/playurl*', // aid cid qn otype=json 视频源地址，清晰度

                /**
                 * 老页面必定加载
                 */
                //'*://api.bilibili.com/x/web-interface/archive/related?aid=*', // aid 相关视频推荐
                //'*://bangumi.bilibili.com/player/web_api/v2/playurl*', // cid 视频源地址，清晰度

                //'*://api.bilibili.com/x/player/playurl*', // 视频源地址，清晰度
                /**
                 * 这是一个讨巧的地址用于获取请求页面的cid
                 * 凡是诸如'https://www.bilibili.com/video/av7895666'这样的视频地址都通过该地址获取cid
                 */
                //'*://data.bilibili.com/v/flashplay/h5_player_op*',
                //'*://api.bilibili.com/x/player/pagelist?aid=*',
                /**
                 * 以上
                 */

                //'*://*.bilibili.com/bangumi/play/ss*',
                //'*://*.bilibili.com/bangumi/play/ep*',
                //'*://*.bilibili.com/video/av*',
                //'*://api.bilibili.com/*',
                //'*://api.bilibili.com/x/web-interface/view?aid=*',
                '*://bangumi.bilibili.com/player/web_api/v2/playurl*', // 视频源地址，清晰度
                '*://api.bilibili.com/x/player/playurl*', // 视频源地址，清晰度
                /**
                 * 这是一个讨巧的地址用于获取请求页面的cid
                 * 凡是诸如'https://www.bilibili.com/video/av7895666'这样的视频地址都通过该地址获取cid
                 */
                '*://data.bilibili.com/v/flashplay/h5_player_op*',
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
            if (pathname === '/player/web_api/v2/playurl' || pathname === 'x/player/playurl' || pathname === '/v/flashplay/h5_player_op') { // 视频源地址，清晰度
                if (!this.videoMap[tabId] || this.videoMap[tabId] !== query.cid) { // 缓存视频cid
                    this.videoMap[tabId] = query.cid;
                    chrome.tabs.sendMessage(tabId, {commend: 'newCid', cid: this.videoMap[tabId]}); // 发送视频讯息
                }
            } else if (pathname === '/x/v2/dm/history' && query.date) { // 如果tab请求了历史弹幕
                // 发送弹幕查询日期, 告知tab页加载制定日期弹幕
                chrome.tabs.sendMessage(tabId, {
                    commend: 'loadHistoryDanmu',
                    cid: this.videoMap[tabId],
                    date: query.date,
                });
            } else if (pathname === '/x/v1/dm/list.so') { // 如果tab请求了当天弹幕
                chrome.tabs.sendMessage(tabId, {
                    commend: 'loadCurrentDanmu',
                    cid: this.videoMap[tabId],
                }); // 告知tab页加载当天弹幕
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
        //chrome.tabs.onActivated.addListener((tabId, selectInfo) => {
        //    if (this.videoMap[tabId]) {}
        //});

        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'getVideoCid') {
                const tabId = sender.tab.id;
                sendResponse(this.videoMap[tabId]);
            }
        });
        //console.log(chrome.tabs);
        //chrome.webRequest.onResponseStarted.addListener((details) => {
        //    console.log('onResponseStarted', details, url);
        //
        //}, requestFilter, ['responseHeaders']);
    };
});
