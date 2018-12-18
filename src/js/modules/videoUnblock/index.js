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
            kined: 'video',
            settings: {
                on: true,
                description: '部分视频只能在部分地区观看，该功能将解除这些限制'
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
