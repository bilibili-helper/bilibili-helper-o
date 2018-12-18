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
            kind: 'video',
            settings: {
                on: true,
                title: '跨区域解锁功能',
                description: '部分视频只能在部分地区观看，该功能将解除这些限制',
            },
        });
    }

    addListener = () => {
        chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
            this.settings.on && details.requestHeaders.push({
                name: 'X-BILIBILI-KEY-REAL-IP',
                value: '104.20.36.173',
            });
            return {requestHeaders: details.requestHeaders};
        }, {urls: ['https://*.bilibili.com/*']}, ['blocking', 'requestHeaders']);
    };
}
