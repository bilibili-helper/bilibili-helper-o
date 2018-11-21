/**
 * Author: DrowsyFlesh
 * Create: 2018/11/17
 * Description:
 */
import $ from 'jquery';
import URL from 'url-parse';
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';
import {isLogin, PERMISSION_TYPE} from 'Utils';

const {login} = PERMISSION_TYPE;

export {VideoSubtitleDownloadUI} from './UI';

export class VideoSubtitleDownload extends Feature {
    constructor() {
        super({
            name: 'videoSubtitleDownload',
            kind: 'video',
            permissions: {login},
            dependencies: ['videoAnchor'],
            settings: {
                on: true,
                hasUI: true,
                title: '外挂字幕下载',
            },
        });
        this.store = new MessageStore('videoSubtitleDownloadDOMInitialized');
    }

    addListener = () => {
        const requestFilter = {
            urls: [
                '*://api.bilibili.com/x/player.so?id=cid:*',
            ],
        };
        chrome.webRequest.onCompleted.addListener(details => {
            const {tabId, initiator} = details;
            if (/^chrome-extension:\/\//.test(initiator)) return;
            const url = new URL(details.url, '', true);
            const {pathname, query} = url;
            if (pathname === '/x/player.so') {
                const storeObject = this.store.createData(tabId);
                const {data, queue} = storeObject;
                $.ajax({
                    method: 'get',
                    url: details.url,
                    success: function(res) {
                        const regExpRes = /<subtitle>(.+)<\/subtitle>/.exec(res);
                        if (regExpRes.length > 0) {
                            const subtitleData = JSON.parse(regExpRes[1]).subtitles;
                            const cid = +query.id.slice(4);
                            subtitleData.map((o) => data[o.id] = {...o, cid});
                            queue.push({
                                commend: 'loadSubtitle',
                                data: subtitleData,
                            });
                            this.store.dealWith(tabId); // 处理queue
                        }
                    },
                    error: function(e) {
                        if (e.status === 403) return;
                        console.log(e);
                    }
                });
            }
        }, requestFilter);
        chrome.runtime.onMessage.addListener((message,sender) => {
            if (message.commend === 'downloadSubtitle' && message.id && message.filename) {
                const tabData = this.store.createData(sender.tab.id);
                if (tabData) {
                    const {subtitle_url, lan, cid} = tabData.data[message.id];
                    chrome.downloads.download({
                        saveAs: true,
                        url: `http://${subtitle_url}`,
                        filename: `${message.filename}-${cid}.${lan}.bbc`,
                    });
                }

            }
        });
    };
}