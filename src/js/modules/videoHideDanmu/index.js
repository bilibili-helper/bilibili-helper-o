/**
 * Author: DrowsyFlesh
 * Create: 2018/11/22
 * Description:
 */
import {Feature} from 'Libs/feature';
export {VideoHideDanmuUI} from './UI';
export class VideoHideDanmu extends Feature {
    constructor() {
        super({
            name: 'videoHideDanmu',
            kind: 'video',
            dependencies: ['videoAnchor'],
            settings: {
                on: false,
                title: '默认关闭弹幕显示',
                hasUI: true,
            }
        })
    }
}