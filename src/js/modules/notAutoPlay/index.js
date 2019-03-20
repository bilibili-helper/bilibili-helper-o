/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import {Feature} from 'Libs/feature';

export {NotAutoPlayUI} from './UI';

export class NotAutoPlay extends Feature {
    constructor() {
        super({
            name: 'notAutoPlay',
            kind: 'tbilibili',
            settings: {
                on: true,
                hasUI: true,
                title: '关闭动态页面小视频自动播放',
            },
        });
    }
}
