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
            dependencies: ['debug'],
            settings: {
                on: true,
                title: '宽屏模式',
                type: 'radio',
                hasUI: true,
                options: [
                    {key: 'default', title: '默认'},
                    {key: 'wide', title: '宽屏'},
                    {key: 'web', title: '网页宽屏'},
                ],
                value: 'default',
            },
        });
    }
}