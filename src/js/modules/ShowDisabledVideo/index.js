/**
 * Author: DrowsyFlesh
 * Create: 2019-05-10
 * Description:
 */
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';
import _ from 'lodash';
import Url from 'url-parse';
import {__, fetchFromHelper} from 'Utils/functions';

export {ShowDisabledVideoUI} from './UI/index.js';

export class ShowDisabledVideo extends Feature {
    constructor() {
        super({
            name: 'showDisabledVideo',
            kind: 'videoList',
            settings: {
                on: true,
                title: __('showDisabledVideo_name'),
                hasUI: true,
            },
        });
        this.messageStore = new MessageStore('showDisabledVideoDOMInitialized');
    }

    addListener = () => {
        const requestFilter = {
            urls: [
                //'*://api.bilibili.com/medialist/gateway/base/spaceDetail?*',
                '*://api.bilibili.com/x/v3/fav/resource/list?*'
            ],
        };
        chrome.webRequest.onBeforeSendHeaders.addListener(details => {
            const {tabId, initiator, requestHeaders} = details;
            const fromHelper = !_.isEmpty(_.find(requestHeaders, ({name, value}) => name === 'From' && value === 'bilibili-helper1.2.31'));
            if (/^chrome-extension:\/\//.test(initiator) || fromHelper) {
                return;
            }
            const url = new Url(details.url, '', true);
            if (url.query && url.query.requestFrom) return;
            const tabData = this.messageStore.createData(tabId);
            tabData.queue.push({
                command: 'showDisabledVideoURLRequest',
                //data: res,
            });
            this.messageStore.dealWith(tabId); // 处理queue

        }, requestFilter, ['requestHeaders']);
    };
}
