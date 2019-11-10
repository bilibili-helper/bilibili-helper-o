/**
 * Author: DrowsyFlesh
 * Create: 2018/11/22
 * Description:
 */
import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';
export {VideoHideDanmuUI} from './UI';
export class VideoHideDanmu extends Feature {
    constructor() {
        super({
            name: 'videoHideDanmu',
            kind: 'video',
            dependencies: ['videoAnchor'],
            settings: {
                on: false,
                title: __('videoHideDanmu_name'),
                hasUI: true,
            }
        })
    }
}
