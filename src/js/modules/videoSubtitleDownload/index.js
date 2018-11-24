/**
 * Author: DrowsyFlesh
 * Create: 2018/11/17
 * Description:
 */
import $ from 'jquery';
import _ from 'lodash';
import URL from 'url-parse';
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';
import {PERMISSION_TYPE} from 'Utils';

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
        chrome.webRequest.onSendHeaders.addListener(details => {
            const that = this;
            const {tabId, initiator, requestHeaders} = details;
            const fromHelper = !_.isEmpty(_.find(requestHeaders, ({name, value}) => name === 'From' && value === 'bilibili-helper'));
            if (/^chrome-extension:\/\//.test(initiator) || fromHelper) return;

            const url = new URL(details.url, '', true);
            const {pathname, query} = url;
            if (pathname === '/x/player.so') {
                const storeObject = this.store.createData(tabId);
                const {data, queue} = storeObject;
                $.ajax({
                    method: 'get',
                    headers: {
                        'From': 'bilibili-helper',
                    },
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
                            that.store.dealWith(tabId); // 处理queue
                        }
                    },
                    error: function(e) {
                        console.error(e);
                        if (e.status === 403) {
                            return;
                        }
                    },
                });
            }
        }, requestFilter, ['requestHeaders']);
        chrome.runtime.onMessage.addListener((message, sender) => {
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