/**
 * Author: DrowsyFlesh
 * Create: 2019/2/16
 * Description:
 */

import {Feature} from 'Libs/feature';
export {VideoDarkModeUI} from './UI/index';

export class VideoDarkMode extends Feature {
    constructor() {
        super({
            name: 'videoDarkMode',
            kind: 'video',
            dependencies: ['videoAnchor'],
            settings: {
                on: false,
                hasUI: true,
                title: '夜间模式',
            },
        });
    }
}
