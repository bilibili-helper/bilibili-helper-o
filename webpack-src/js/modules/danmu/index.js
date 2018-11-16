/**
 * Author: DrowsyFlesh
 * Create: 2018/10/30
 * Description:
 */
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';
import URL from 'url-parse';

export {DanmuUI} from './UI/index';

export class Danmu extends Feature {
    constructor() {
        super({
            name: 'danmu',
            kind: 'video',
            dependencies: ['debug', 'videoAnchor'],
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
                '*://api.bilibili.com/x/v1/dm/list.so?oid=*', // 最新弹幕

                //'*://api.bilibili.com/x/player.so*', // 新页面特有，用于标记新页面，加载时特殊处理
            ],
        };
        chrome.webRequest.onCompleted.addListener((details) => {
            const {tabId, initiator} = details;
            if (/^chrome-extension:\/\//.test(initiator)) return;
            const url = new URL(details.url, '', true);
            const {pathname, query} = url;
            //console.log(tabId, 'onCompleted', pathname, query);
            // 收到前端页面请求
            const tabData = this.store.createData(tabId);
            if (pathname === '/x/v1/dm/list.so') { // 如果tab请求了当天弹幕
                tabData.data.cid = query.oid;
                tabData.queue.push({ // 将监听到的事件添加到队列中
                    commend: 'loadCurrentDanmu',
                    cid: query.oid,
                });
            } else if (pathname === '/x/v2/dm/history' && query.date) { // 如果tab请求了历史弹幕
                tabData.queue.push({ // 将监听到的事件添加到队列中
                    commend: 'loadHistoryDanmu',
                    cid: tabData.data.cid,
                    date: query.date,
                });
            }
            this.store.dealWithTabStoreTask(tabId); // 处理queue
        }, requestFilter, ['responseHeaders']);
        chrome.runtime.onMessage.addListener(message => {
            if (message.commend === 'downloadDanmuXML' && message.cid) {
                chrome.downloads.download({
                    saveAs: true,
                    url: `https://comment.bilibili.com/${message.cid}.xml`,
                    filename: `${message.cid}-${message.filename}.xml`,
                });
            }
        });
    };
};