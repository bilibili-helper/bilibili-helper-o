/**
 * Author: DrowsyFlesh
 * Create: 2018/11/17
 * Description:
 */
import _ from 'lodash';
import URL from 'url-parse';
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';
import {isBiggerThan} from 'Utils';

export {VideoSubtitleDownloadUI} from './UI';

export class VideoSubtitleDownload extends Feature {
    constructor() {
        super({
            name: 'videoSubtitleDownload',
            kind: 'video',
            permissions: ['login', 'downloads', 'checkChromeVersion?version=73&operation=smaller'],
            dependencies: ['videoAnchor'],
            settings: {
                on: true,
                hasUI: true,
                title: '外挂字幕下载',
            },
        });
        this.messageStore = new MessageStore('videoSubtitleDownloadDOMInitialized');
    }

    addListener = () => {
        const requestFilter = {
            urls: [
                '*://api.bilibili.com/x/player.so?id=cid:*',
            ],
        };
        chrome.webRequest.onSendHeaders.addListener(details => {
            const {tabId, initiator, requestHeaders} = details;
            const fromHelper = !_.isEmpty(_.find(requestHeaders, ({name, value}) => name === 'From' && value === 'bilibili-helper'));
            if (/^chrome-extension:\/\//.test(initiator) || fromHelper) return;

            const tabData = this.messageStore.createData(tabId);
            const url = new URL(details.url, '', true);
            const {pathname, query} = url;
            if (pathname === '/x/player.so') {
                tabData.data.cid = query.id.slice(4);
                const storeObject = this.messageStore.createData(tabId);
                const {queue} = storeObject;
                fetch(details.url, {
                    mode: 'cors',
                    headers: {
                        'From': 'bilibili-helper',
                        'Referer': location.href,
                    },
                })
                .then(res => res.text())
                .then((res) => {
                    if (!res) return;
                    const regExpRes = /<subtitle>(.+)<\/subtitle>/.exec(res);
                    if (regExpRes.length > 0) {
                        const subtitleData = JSON.parse(regExpRes[1]).subtitles;
                        queue.push({
                            commend: 'loadSubtitle',
                            data: subtitleData,
                        });
                        this.messageStore.dealWith(tabId);
                    }
                }, (e) => {
                    console.error(e);
                    if (e.status === 403) {
                        return;
                    }
                });
            }
        }, requestFilter, ['requestHeaders']);
        chrome.runtime.onMessage.addListener((message, sender) => {
            if (message.commend === 'downloadSubtitle' && message.subtitleObject) {
                const tabData = this.messageStore.createData(sender.id);
                if (tabData) {
                    const {lan, subtitle_url} = message.subtitleObject;
                    const {cid} = tabData.data;
                    chrome.downloads.download({
                        saveAs: true,
                        url: `http:${subtitle_url}`,
                        filename: `${message.filename}-${cid}.${lan}.bbc`,
                    });
                }
            }
            return true;
        });
    };

    launch = () => {
        this.settings.on = true;
        this.settings.toggle = true;
        this.setSetting(this.settings);
    }
    pause = () => {
        this.settings.on = false;
        this.settings.toggle = false;
        this.setSetting(this.settings);
    }
}
