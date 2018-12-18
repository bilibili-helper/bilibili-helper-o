/**
 * Author: DrowsyFlesh
 * Create: 2018/12/18
 * Description:
 */
import {Feature} from 'Libs/feature';

export class VideoUnblock extends Feature {
    constructor() {
        super({
            name: 'videoUnblock',
            settings: {
                on: true,
            },
        });
    }

    addListener = () => {
        this.settings.on && chrome.webRequest.onBeforeSendHeaders.addListener(details => {
            details.requestHeaders.push({
                name: 'X-BILIBILI-KEY-REAL-IP',
                value: '59.125.39.5',
            });
            return {requestHeaders: details.requestHeaders};
        }, {urls: ['https://*.bilibili.com/*']}, ['blocking', 'requestHeaders']);
    };
}
