import {Feature} from 'Modules/feature';
import {getURL} from 'Utils';

/**
 * Author: DrowsyFlesh
 * Create: 2018/10/9
 * Description:
 */

export class Video extends Feature {
    constructor() {
        super({
            name: 'video',
            kind: 'video',
            GUI: null,
            permissions: {},
            options: {
                on: true,
                title: '视频相关',
                optionType: 'checkbox',
                options: [
                    {title: '视频下载', key: 'download', value: true},
                    {title: '弹幕查询', key: 'danmu', value: true},
                ],
            },
        });
    }

    launch = () => {
        const requestFilter = {
            urls: [
                //'*://*.bilibili.com/bangumi/play/ss*',
                //'*://*.bilibili.com/bangumi/play/ep*',
                //'*://*.bilibili.com/video/av*',
                //'*://api.bilibili.com/*',
                '*://api.bilibili.com/x/web-interface/view?aid=*',
            ],
            //types: ['main_frame'],
        };
        chrome.webRequest.onCompleted.addListener((details) => {
            console.log('onCompleted', details);
        }, requestFilter, ['responseHeaders']);
    };
}
