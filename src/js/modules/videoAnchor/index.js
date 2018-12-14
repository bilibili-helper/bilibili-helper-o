/**
 * Author: DrowsyFlesh
 * Create: 2018/10/9
 * Description:
 */

import {Feature} from 'Libs/feature';
export {VideoAnchorUI} from './UI/index';
export class VideoAnchor extends Feature {
    constructor() {
        super({
            name: 'videoAnchor',
            kind: 'video',
            settings: {
                on: true,
                hide: true,
                hasUI: true,
            },
        });
    }
}