/**
 * Author: DrowsyFlesh
 * Create: 2018/11/17
 * Description:
 */
import _ from 'lodash';
import URL from 'url-parse';
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';
import {__} from 'Utils/functions';

export {VideoSubtitleDownloadUI} from './UI';

export class VideoSubtitleDownload extends Feature {
    constructor() {
        super({
            name: 'videoSubtitleDownload',
            kind: 'video',
            dependencies: ['videoAnchor'],
            permissions: ['login', 'downloads'],
            settings: {
                on: true,
                hasUI: true,
                title: __('videoSubtitleDownload_name'),
            },
        });
        this.messageStore = new MessageStore('videoSubtitleDownloadDOMInitialized');
    }

    addListener = () => {
        const requestFilter = {
            urls: [
                '*://api.bilibili.com/x/player.so?id=cid:*',
                '*://api.bilibili.com/x/player.so?id=cid%3A*', // b站改成这样其实挺好的，就是改得有点突然
            ],
        };
        chrome.webRequest.onSendHeaders.addListener(details => {
            const {tabId, initiator, requestHeaders} = details;
            let fromHelper = !_.isEmpty(_.find(requestHeaders, ({name, value}) => name === 'From' && value === 'bilibili-helper'))
                || details.url.match('from=bilibili-helper');
            if (/^chrome-extension:\/\//.test(initiator) || fromHelper) return;

            const tabData = this.messageStore.createData(tabId);
            const url = new URL(details.url, '', true);
            const {pathname, query} = url;
            // 做标记避免循环请求形成攻击，要被打死的_(:з」∠)_
            url.set('query', {...query, from: 'bilibili-helper'});
            if (query && query.requestFrom) return;
            if (pathname === '/x/player.so') {
                tabData.data.cid = query.id.slice(4);
                const storeObject = this.messageStore.createData(tabId);
                const {queue} = storeObject;
                queue.push({
                    command: 'loadSubtitle',
                    url: url.toString(),
                });
                this.messageStore.dealWith(tabId);
            }
        }, requestFilter, ['requestHeaders']);
        chrome.runtime.onMessage.addListener((message, sender) => {
            if (message.command === 'downloadSubtitle' && message.subtitleObject) {
                const tabData = this.messageStore.createData(sender.tab.id || sender.id);
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
        this.setSetting(this.settings);
    }
    pause = () => {
        this.settings.on = false;
        this.setSetting(this.settings);
    }
}
