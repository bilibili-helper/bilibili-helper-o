/**
 * Author: DrowsyFlesh
 * Create: 2018/10/30
 * Description:
 */
import _ from 'lodash';
import URLParse from 'url-parse';
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';
import {GenerateASS} from 'Libs/bilibili_ASS_Danmaku_Downloader';

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
                title: '视频弹幕查询及下载',
                hasUI: true,
                description: '查询弹幕发送者，支持历史弹幕，分P，视频切换等场景',
            },
        });
        this.store = new MessageStore('danmuDOMInitialized');
    }

    addListener = () => {
        const requestFilter = {
            urls: [
                '*://api.bilibili.com/x/v2/dm/history?type=*', // 历史弹幕
                //'*://api.bilibili.com/x/v1/dm/list.so?oid=*', // 最新弹幕

                '*://api.bilibili.com/x/player.so?id=cid:*', // 新页面特有，用于标记新页面，加载时特殊处理
                '*://interface.bilibili.com/player?id=cid:*', // 老页面特有
            ],
        };
        chrome.webRequest.onSendHeaders.addListener((details) => {
            const {tabId, initiator, requestHeaders} = details;
            const fromHelper = !_.isEmpty(_.find(requestHeaders, ({name, value}) => name === 'From' && value === 'bilibili-helper'));
            if (/^chrome-extension:\/\//.test(initiator) || fromHelper) return;
            const url = new URLParse(details.url, '', true);
            const {pathname, query} = url;
            // 收到前端页面请求
            if (pathname === '/x/player.so' || pathname === '/player') { // 如果tab请求了当天弹幕
                const tabData = this.store.createData(tabId);
                tabData.data.cid = query.id.slice(4);
                tabData.queue.push({ // 将监听到的事件添加到队列中
                    commend: 'loadCurrentDanmu',
                    cid: tabData.data.cid,
                });
                this.store.dealWith(tabId); // 处理queue
            } else if (pathname === '/x/v2/dm/history' && query.date) { // 如果tab请求了历史弹幕
                const tabData = this.store.createData(tabId);
                tabData.queue.push({ // 将监听到的事件添加到队列中
                    commend: 'loadHistoryDanmu',
                    cid: tabData.data.cid,
                    date: query.date,
                });
                this.store.dealWith(tabId); // 处理queue
            }
        }, requestFilter, ['requestHeaders']);
        chrome.runtime.onMessage.addListener((message, sender) => {
            if (message.commend === 'downloadDanmuXML' && message.cid) {
                const url = (window.URL ? URL : window.webkitURL).createObjectURL(new Blob([message.danmuDocumentStr], {
                    type: 'application/xml',
                }));
                chrome.downloads.download({
                    saveAs: true,
                    url,
                    filename: `${message.filename}.${message.cid}.${message.date}.xml`.replace(/[|"*?:<>]/g, "_"),
                });
            } else if (message.commend === 'downloadDanmuASS' && message.cid) {
                const parser = new DOMParser();
                const parsedXML = parser.parseFromString(
                    message.danmuDocumentStr.replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/ug, ''), 'text/xml');
                const assData = '\ufeff' + GenerateASS(parsedXML, {
                    'title': message.filename,
                    'ori': message.origin,
                });
                const url = (window.URL ? URL : window.webkitURL).createObjectURL(new Blob([assData], {
                    type: 'application/octet-stream',
                }));
                chrome.downloads.download({
                    saveAs: true,
                    url,
                    filename: `${message.filename}.${message.cid}.${message.date}.xml`.replace(/[|"*?:<>]/g, "_"),
                });
            } else if (message.commend === 'pakkuGetHistoryDanmu') { // 对pakku的hack，仅处理历史弹幕的请求
                const tabData = this.store.createData(sender.tab.id);
                const url = new URLParse(message.url, '', true);
                tabData.queue.push({
                    commend: 'loadHistoryDanmu',
                    cid: tabData.data.cid,
                    date: url.query.date,
                });
                this.store.dealWith(sender.tab.id);
            }
        });
    };
}
