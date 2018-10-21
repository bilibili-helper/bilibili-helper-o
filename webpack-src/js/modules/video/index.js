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
            permissions: {},
            options: {
                on: true,
                title: '视频相关',
                optionType: 'checkbox',
                options: [
                    {key: 'download', title: '视频下载', value: true},
                    {key: 'danmu', title: '弹幕查询', value: true},
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
