/**
 * Author: DrowsyFlesh
 * Create: 2018/11/11
 * Description:
 */
import URL from 'url-parse';
import _ from 'lodash';
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';

export {VideoDownloadUI} from './UI';

export class VideoDownload extends Feature {
    constructor() {
        super({
            name: 'videoDownload',
            kind: 'video',
            dependentLocality: ['debug', 'videoAnchor'],
            settings: {
                on: true,
                hasUI: true,
                title: '视频下载',
                description: '不支持新页面，但有时候会成功，建议不使用"自动"清晰度，谜一样的功能',
            },
        });
        this.store = new MessageStore('videoDownloadDOMInitialized');
    }

    launch = () => {};

    addListener = () => {
        const requestFilter = {
            urls: [
                //'*://api.bilibili.com/x/v2/dm/history?type=*', // 历史弹幕
                //'*://api.bilibili.com/x/v1/dm/list.so?oid=*', // 最新弹幕

                //'*://api.bilibili.com/x/player.so*', // 新页面特有，用于标记新页面，加载时特殊处理

                //'*://*.acgvideo.com/upgcxcode*',

                '*://interface.bilibili.com/v2/playurl?cid=*', // 旧版页面必定加载，画质，下载地址
                '*://bangumi.bilibili.com/player/web_api/v2/playurl?*', // 番剧页面
                '*://api.bilibili.com/x/player/playurl?*', // 新版页面切换清晰度时调用，返回字段和上面相同
            ],
        };
        chrome.webRequest.onBeforeSendHeaders.addListener(details => {
            const {tabId, method, responseHeaders, requestHeaders, initiator} = details;
            if (/^chrome-extension:\/\//.test(initiator)) return;
            const url = new URL(details.url, '', true);
            const {pathname, query: data, host} = url;
            const tabData = this.store.createData(tabId);
            //console.log(url, tabId, pathname, method, requestHeaders, query);
            //console.log(details, tabData.data['hasLoad'], pathname, /\/upgcxcode\//.test(pathname));

            if (pathname === '/v2/playurl' || pathname === '/player/web_api/v2/playurl') { // 旧页面，画质，下载地址
                //console.log(details, data);
                tabData.queue.push({
                    commend: 'videoDownloadSendVideoRequest',
                    type: 'old',
                    //headers,
                    data,
                    url: url.origin + url.pathname,
                });
            } else if (pathname === '/x/player/playurl') {
                //console.log(details, data);
                tabData.queue.push({
                    commend: 'videoDownloadSendVideoRequest',
                    type: 'new',
                    //headers,
                    data,
                    url: url.origin + url.pathname,
                });
            }
            this.store.dealWithTabStoreTask(tabId); // 处理queue
        }, requestFilter, ['requestHeaders', 'blocking']);
        //chrome.runtime.onMessage.addListener((message, sender) => {
        //    if (message.commend === 'videoDownloadSendVideoName' && message.filename) {
        //        if (this.store.has(sender.tab.id)) {
        //            const tabData = this.store.createData(sender.tab.id);
        //            tabData.data.filename = message.filename;
        //            tabData.data.cidData = message.cidData;
        //        }
        //    }
        //});
        //chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
        //    if (/^http:\/\/.+\.acgvideo\.com\//.test(downloadItem.url)) {
        //        //suggest({filename: })
        //    }
        //});
    };
}