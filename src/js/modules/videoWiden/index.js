/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */

import {Feature} from 'Libs/feature';

export {VideoWidenUI} from './UI';

export class VideoWiden extends Feature {
    constructor() {
        super({
            name: 'videoWiden',
            kind: 'video',
            settings: {
                on: true,
                title: '宽屏模式',
                hasUI: true,
                subPage: {
                    type: 'radio',
                    title: '启用自动宽屏模式',
                    options: [
                        {key: 'default', title: '默认'},
                        {key: 'wide', title: '宽屏'},
                        {key: 'web', title: '网页全屏'},
                    ],
                    value: 'default',
                },
            },
        });
    }
}
