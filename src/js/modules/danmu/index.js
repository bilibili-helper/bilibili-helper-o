/**
 * Author: DrowsyFlesh
 * Create: 2018/10/30
 * Description:
 */
import _ from 'lodash';
import URLParse from 'url-parse';
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';
import {GenerateASSByOriginData} from 'Libs/bilibili_ASS_Danmaku_Downloader';
import {__, fetchFromHelper} from 'Utils';
import {DmWebViewReplyDecoder, DmSegMobileReplyDecoder} from './protobufjs';

export {DanmuUI} from './UI/index';

export class Danmu extends Feature {
    constructor() {
        super({
            name: 'danmu',
            kind: 'video',
            permissions: ['downloads'],
            dependencies: ['videoAnchor'],
            settings: {
                on: true,
                title: __('danmu_name'),
                hasUI: true,
                description: __('danmu_description'),
            },
        });
        this.messageStore = new MessageStore('danmuDOMInitialized');
    }

    addListener = () => {
        const requestFilter = {
            urls: [
                '*://api.bilibili.com/x/v2/dm/history?type=*', // 历史弹幕
                '*://api.bilibili.com/x/v1/dm/list.so?oid=*', // 最新弹幕

                '*://api.bilibili.com/x/player.so?id=cid:*', // 新页面特有，用于标记新页面，加载时特殊处理
                '*://interface.bilibili.com/player?id=cid:*', // 老页面特有

                '*://api.bilibili.com/x/v2/dm/web/view?*', // 最新protoBuff格式下的弹幕配置接口
                '*://api.bilibili.com/x/v2/dm/web/seg.so?*', // 最新的protocolBuff格式的数据
            ],
        };
        chrome.webRequest.onSendHeaders.addListener((details) => {
            const {tabId, initiator, requestHeaders} = details;
            const fromHelper = !_.isEmpty(_.find(requestHeaders, ({name, value}) => name === 'From' && value === 'bilibili-helper1.2.31')) || details.url.match('from=bilibili-helper');
            if (/^chrome-extension:\/\//.test(initiator) || fromHelper) {
                return;
            }
            const url = new URLParse(details.url, '', true);
            const {pathname, query} = url;
            if (query && query.requestFrom) {
                return;
            }
            // 收到前端页面请求

            if (pathname === '/x/v2/dm/web/view') {
                const tabData = this.messageStore.createData(tabId);
                tabData.data.cid = query.oid;
                tabData.queue.push({ // 将监听到的事件添加到队列中
                    command: 'loadNewTypeDanmu',
                    oid: query.oid,
                    pid: query.pid,
                    type: query.type,
                });
                this.messageStore.dealWith(tabId); // 处理queue
            } else if (pathname === '/x/v2/dm/web/seg.so') { // 最新的protocolBuff格式的数据
                const tabData = this.messageStore.createData(tabId);
                tabData.data.cid = query.oid;
                tabData.queue.push({ // 将监听到的事件添加到队列中
                    command: 'loadNewTypeDanmu',
                    oid: query.oid,
                    pid: query.pid,
                    segmentIndex: query.segment_index,
                });
                this.messageStore.dealWith(tabId); // 处理queue
            } else if (pathname === '/x/player.so' || pathname === '/player') { // 如果tab请求了当天弹幕
                const tabData = this.messageStore.createData(tabId);
                tabData.data.cid = query.id.slice(4);
                tabData.queue.push({ // 将监听到的事件添加到队列中
                    command: 'loadCurrentDanmu',
                    cid: tabData.data.cid,
                });
                this.messageStore.dealWith(tabId); // 处理queue
            } else if (pathname === '/x/v1/dm/list.so') { // 新弹幕请求地址
                const tabData = this.messageStore.createData(tabId);
                tabData.data.cid = query.oid;
                tabData.queue.push({ // 将监听到的事件添加到队列中
                    command: 'loadCurrentDanmu',
                    cid: tabData.data.cid,
                });
                this.messageStore.dealWith(tabId); // 处理queue
            } else if (pathname === '/x/v2/dm/history' && query.date) { // 如果tab请求了历史弹幕
                const tabData = this.messageStore.createData(tabId);
                tabData.queue.push({ // 将监听到的事件添加到队列中
                    command: 'loadHistoryDanmu',
                    cid: tabData.data.cid,
                    date: query.date,
                });
                this.messageStore.dealWith(tabId); // 处理queue
            }
        }, requestFilter, ['requestHeaders']);
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.command === 'fetchCardInfo' && message.url) {
                fetchFromHelper(message.url)
                .then(res => res.json())
                .then((danmuDocument) => {
                    sendResponse(danmuDocument);
                }, (res) => {
                    console.error(res);
                    sendResponse(res);
                });
            }
            if (message.command === 'fetchNewTypeDanmuOption' && message.url) {
                fetchFromHelper(message.url)
                .then(res => res.arrayBuffer())
                .then(res => {
                    const danmuViewOption = DmWebViewReplyDecoder(res);
                    sendResponse(danmuViewOption.dmSge)
                });
            } else if (message.command === 'fetchNewTypeDanmu' && message.url) {
                fetchFromHelper(message.url)
                .then(res => res.arrayBuffer())
                .then(res => {
                    const danmu = DmSegMobileReplyDecoder(res);
                    sendResponse(danmu.elems || []);
                }, (res) => {
                    console.error(res);
                    sendResponse(res);
                });
            } else if (message.command === 'fetchDanmu' && message.url) {
                fetchFromHelper(message.url)
                .then(res => res.text())
                .then((danmuDocument) => {
                    sendResponse(danmuDocument);
                }, (res) => {
                    console.error(res);
                    sendResponse(res);
                });
            } else if (message.command === 'downloadDanmuXML' && message.cid) {
                const url = (window.URL ? URL : window.webkitURL).createObjectURL(new Blob([message.danmuDocumentStr], {
                    type: 'application/xml',
                }));
                const filename = `${message.filename ? message.filename + '.' : ''}${message.cid}.${message.date}.xml`;
                chrome.downloads.download({
                    saveAs: true,
                    url,
                    filename: filename.replace(/\s/g, '').replace(/[|"*?:<>\s~/]/g, '_'),
                });
            } else if (message.command === 'downloadDanmuASS' && message.cid) {
                const assData = '\ufeff' + GenerateASSByOriginData(message.danmuJSON.list, {
                    'title': message.filename,
                    'ori': message.origin,
                });
                const url = (window.URL ? URL : window.webkitURL).createObjectURL(new Blob([assData], {
                    type: 'application/octet-stream',
                }));
                const filename = `${message.filename ? message.filename + '.' : ''}${message.cid}.${message.date}.ass`;
                chrome.downloads.download({
                    saveAs: true,
                    url,
                    filename: filename.replace(/\s/g, '').replace(/[|"*?:<>\s~/]/g, '_'),
                });
            } else if (message.command === 'pakkuGetHistoryDanmu') { // 对pakku的hack，仅处理历史弹幕的请求
                const tabData = this.messageStore.createData(sender.id);
                const url = new URLParse(message.url, '', true);
                tabData.queue.push({
                    command: 'loadHistoryDanmu',
                    cid: tabData.data.cid,
                    date: url.query.date,
                });
                this.messageStore.dealWith(sender.id);
            }
            return true;
        });
    };
}
