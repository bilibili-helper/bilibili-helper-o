/**
 * Author: DrowsyFlesh
 * Create: 2019-05-10
 * Description:
 */
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';
import _ from 'lodash';
import Url from 'url-parse';

export {ShowDisabledVideoUI} from './UI/index.js';

export class ShowDisabledVideo extends Feature {
    constructor() {
        super({
            name: 'showDisabledVideo',
            kind: 'videoList',
            settings: {
                on: true,
                title: '显示失效视频部分信息',
                hasUI: true,
            },
        });
        this.messageStore = new MessageStore('showDisabledVideoDOMInitialized');
    }

    addListener = () => {
        const requestFilter = {
            urls: ['*://api.bilibili.com/medialist/gateway/base/spaceDetail?*'],
        };
        chrome.webRequest.onBeforeSendHeaders.addListener(details => {
            const {tabId, initiator, requestHeaders} = details;
            const fromHelper = !_.isEmpty(_.find(requestHeaders, ({name, value}) => name === 'From' && value === 'bilibili-helper'));
            if (/^chrome-extension:\/\//.test(initiator) || fromHelper) {
                return;
            }
            const url = new Url(details.url, '', true);
            const tabData = this.messageStore.createData(tabId);
            console.warn(url.href);
            fetch(url.href)
            .then(res => res.json())
            .then((res) => {
                tabData.queue.push({
                    command: 'showDisabledVideoURLRequest',
                    data: res,
                });
                this.messageStore.dealWith(tabId); // 处理queue
            });


        }, requestFilter, ['requestHeaders']);
    }
}
