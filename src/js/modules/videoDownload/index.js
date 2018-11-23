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
            dependencies: ['videoAnchor'],
            settings: {
                on: true,
                hasUI: true,
                title: '视频下载',
                description: '不支持新页面，但有时候会成功，建议不使用"自动"清晰度',
            },
        });
        this.store = new MessageStore('videoDownloadDOMInitialized');
        this.downloadFilenames = {};
        this.onceRequestList = [];
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
                '*://bangumi.bilibili.com/player/web_api/v2/playurl?cid=*', // 番剧页面
                '*://api.bilibili.com/x/player/playurl?avid=*', // 新版页面切换清晰度时调用，返回字段和上面相同

                '*://interface.bilibili.com/player?id=cid:*',
                '*://api.bilibili.com/x/player.so?id=cid:*',
            ],
        };
        chrome.webRequest.onBeforeSendHeaders.addListener(details => {
            const {tabId, initiator} = details;
            if (/^chrome-extension:\/\//.test(initiator) || this.onceRequestList.indexOf(details.url) >= 0) return;
            const url = new URL(details.url, '', true);
            const {pathname, query: data} = url;
            const tabData = this.store.createData(tabId);
            if (pathname === '/v2/playurl' || pathname === '/player/web_api/v2/playurl') { // 旧页面，画质，下载地址
                tabData.queue.push({
                    commend: 'videoDownloadSendVideoRequest',
                    type: 'old',
                    //headers,
                    data,
                    url: url.origin + url.pathname,
                });
                this.onceRequestList.push(details.url);
                this.store.dealWith(tabId); // 处理queue
            } else if (pathname === '/x/player/playurl') {
                //console.log(details, data);
                tabData.queue.push({
                    commend: 'videoDownloadSendVideoRequest',
                    type: 'new',
                    //headers,
                    data,
                    url: url.origin + url.pathname,
                });
                this.onceRequestList.push(details.url);
                this.store.dealWith(tabId); // 处理queue
            } else if (pathname === '/player' || pathname === '/x/player.so') {
                tabData.queue.push({
                    commend: 'videoDownloadCid',
                    cid: +data.id.slice(4),
                });
                this.onceRequestList.push(details.url);
                this.store.dealWith(tabId); // 处理queue
            }
        }, requestFilter, ['requestHeaders']);
        chrome.runtime.onMessage.addListener((message) => {
            if (message.commend === 'sendVideoFilename' && message.cid) {
                const url = new URL(message.url, '', true);
                this.downloadFilenames[url.pathname] = {
                    filename: message.filename,
                    cid: message.cid,
                };
            }
        });
        chrome.webRequest.onHeadersReceived.addListener((details) => {
            const {responseHeaders, initiator, url} = details;
            if (/^chrome-extension:\/\//.test(initiator) || this.onceRequestList.indexOf(details.url) >= 0) return;
            const urlObject = new URL(url, '', true);
            const filenameObject = this.downloadFilenames[urlObject.pathname];
            if (filenameObject) {
                this.onceRequestList.push(details.url);
                const {filename, cid} = filenameObject;
                const targetData = _.find(responseHeaders, (o) => o.name === 'Content-Disposition');
                const nameValue = `attachment; filename="${encodeURIComponent(filename)}.${cid}.flv"; filename*=utf-8' '${encodeURIComponent(filename)}.${cid}.flv`.replace('/', '%2f');
                console.warn(nameValue);
                if (targetData) {
                    targetData.value = nameValue;
                } else {
                    responseHeaders.push({
                        name: 'Content-Disposition',
                        value: nameValue,
                    });
                }
            }
            return {responseHeaders};
        }, {
            urls: ['*://*.acgvideo.com/*'],
        }, ['responseHeaders', 'blocking']);
    };
}