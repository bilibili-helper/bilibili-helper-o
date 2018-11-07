/**
 * Author: DrowsyFlesh
 * Create: 2018/10/30
 * Description:
 */

import {defineModule} from 'Utils';
import {Feature} from 'Modules/feature';

export const Danmu = defineModule(['debug', 'video'], class Video extends Feature {
    constructor() {
        super({
            name: 'danmu',
            kind: 'video',
            permissions: {},
            options: {
                on: true,
                title: '视频弹幕相关',
                optionType: 'checkbox',
                options: [
                    //{key: 'download', title: '视频下载', on: true},
                    {key: 'danmu', title: '弹幕查询', on: true},
                    {key: 'danmuDownload', title: '弹幕下载', on: false, toggle: false},
                ],
            },
        });
        this.videoMap = {};
    }
});