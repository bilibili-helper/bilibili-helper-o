/**
 * Author: DrowsyFlesh
 * Create: 2019/2/28
 * Description:
 */
import {Feature} from 'Libs/feature';
import _ from 'lodash';
import {fetchJSON, fetchImage, fetchPOST} from './fetch';
import {connect} from './connect';
import {cookie} from './cookie';

export class ProxyForWebsite extends Feature {
    constructor() {
        super({
            name: 'proxyForWebsite',
            kind: 'other',
            settings: {
                on: true,
                hide: true,
                toggle: false,
            },
        });
    }

    addListener = () => {
        chrome.webRequest.onBeforeSendHeaders.addListener(details => {
            const {initiator, requestHeaders, url} = details;
            const fromHelper = !_.isEmpty(_.find(requestHeaders, ({name, value}) => name === 'From' && value === 'bilibili-helper1.2.31'));
            if ((/^chrome-extension:\/\//.test(initiator) || fromHelper) && url.match(/\/reply\/(?:add|action)/)) {
                const originHeader = requestHeaders.find((h) => h.name.toLowerCase() === 'origin');
                if (originHeader) {
                    originHeader.value = 'https://h.bilibili.com';
                } else {
                    requestHeaders.push({
                        name: 'Origin',
                        value: 'https://h.bilibili.com',
                    });
                }
                return {requestHeaders};
            }
        }, {
            urls: [
                'https://api.bilibili.com/x/v2/reply/action?*',
                'https://api.bilibili.com/x/v2/reply/add?*',
            ],
        }, ['blocking', 'requestHeaders', 'extraHeaders']);
        chrome.runtime.onConnect.addListener((port) => {
            port.onMessage.addListener((message, websitePort) => {
                const {command, data} = message;
                switch (command) {
                    case 'connect': {
                        connect(websitePort, data);
                        break;
                    }
                    case 'fetch': {
                        const {type, ...options} = data;
                        if (type === 'json') void fetchJSON(websitePort, options);
                        else if (type === 'image') void fetchImage(websitePort, options);
                        else if (type === 'post') void fetchPOST(websitePort, options);
                        break;
                    }
                    case 'cookie': {
                        void cookie(websitePort, data);
                        break;
                    }
                }
            });
        });
    };
}
