/**
 * Author: DrowsyFlesh
 * Create: 2020/1/4
 * Description:
 */

import {Feature} from 'Libs/feature';
import _ from 'lodash';
import Url from 'url-parse';
//import {__} from 'Utils/functions';
export {LiveReplayDownloadUI} from './UI';
import Apis from './apis';

export class LiveReplayDownload extends Feature {
    constructor() {
        super({
            name: 'liveReplayDownload',
            kind: 'live',
            permissions: ['downloads'],
            settings: {
                on: true,
                title: '直播回放视频下载',
                hasUI: true,
            },
        });
        this.cache = new Map();
        this.downloadFilenames = {};
    }

    listener = (message, sender, sendResponse) => {
        if (message.command === 'getLiveRecord' && message.rid) {
            if (this.cache.has(message.rid)) {
                sendResponse(this.cache.get(message.rid));
            } else {
                fetch(`${Apis.getLiveRecord}?rid=${message.rid}&platform=html5&requestFrom=bilibili-helper`)
                .then(res => res.json())
                .then((res) => {
                    if (res.code === 0) {
                        this.cache.set(message.rid, res.data);
                        res.data.list.forEach((item, index) => {
                            const urlObject = new Url(item.url, '', true);
                            if (res.data.list.length > 1) {
                                this.downloadFilenames[urlObject.pathname] = `${message.title}_${index + 1}`;
                            } else {
                                this.downloadFilenames[urlObject.pathname] = message.title;
                            }
                        });
                        sendResponse(res.data);
                    } else {
                        sendResponse(false);
                    }
                });
            }
        }
        return true;
    };

    renameListener = (details) => {
        const {responseHeaders, initiator, url} = details;
        if (/^chrome-extension:\/\//.test(initiator)) {
            return;
        }
        const urlObject = new Url(url, '', true);
        const {query: data} = url;
        if (data && data.requestFrom) {
            return;
        }
        let filename = this.downloadFilenames[urlObject.pathname];
        if (filename) {
            filename = filename.replace(/[|"*?:<>]/g, '_');
            const targetData = _.find(responseHeaders, (o) => o.name === 'Content-Disposition');
            const nameValue = `attachment; filename="${encodeURIComponent(filename)}.flv"; filename*=utf-8' '${encodeURIComponent(filename)}.flv`.replace('/', '%2f');
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
    };

    launch = () => {
        chrome.runtime.onMessage.addListener(this.listener);
        chrome.webRequest.onHeadersReceived.addListener(this.renameListener, {
            urls: [
                '*://*.acgvideo.com/livechunks/*',
            ],
        }, ['responseHeaders', 'blocking']);
    };
    pause = () => {
        chrome.runtime.onMessage.removeListener(this.listener);
        chrome.webRequest.onHeadersReceived.removeListener(this.renameListener);
    };
}
