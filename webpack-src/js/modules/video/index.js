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
                    {key: 'download', title: '视频下载', value: true},
                    {key: 'danmu', title: '弹幕查询', value: true},
                ],
            },
        });
        this.videoMap = {};
    }

    launch = () => {

    };

    addListener = () => {
        const requestFilter = {
            urls: [
                //'*://*.bilibili.com/bangumi/play/ss*',
                //'*://*.bilibili.com/bangumi/play/ep*',
                //'*://*.bilibili.com/video/av*',
                //'*://api.bilibili.com/*',
                //'*://api.bilibili.com/x/web-interface/view?aid=*',
                '*://bangumi.bilibili.com/player/web_api/v2/playurl*', // 视频源地址，清晰度
                '*://api.bilibili.com/x/v2/dm/history*', // 历史弹幕
            ],
            //types: ['main_frame'],
        };
        chrome.webRequest.onCompleted.addListener((details) => {
            const {tabId} = details;
            const url = new URL(details.url, '', true);
            const {pathname, query} = url;
            console.log('onCompleted', details, url);
            switch(pathname) {
                case '/player/web_api/v2/playurl': // 视频源地址，清晰度
                    this.videoMap[tabId] = query; // 缓存视频信息
                    break;
                case '/x/v2/dm/history': // 历史弹幕
                    chrome.tabs.sendMessage(tabId, {commend: 'getDANMUList'}, (res) => { //请求弹幕

                    })
                    break;
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
    }

    getPlayurl = () => {

    }

    getDANMU = (oid, date) => {
        let url;
        if (date) url = 'https://api.bilibili.com/x/v2/dm/history';
        else url = 'https://api.bilibili.com/x/v1/dm/list.so';
        //$.ajax({
        //    method: 'get',
        //     url,
        //    //data:
        //})
    }
}
