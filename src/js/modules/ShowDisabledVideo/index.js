/**
 * Author: DrowsyFlesh
 * Create: 2019-05-10
 * Description:
 */
import {Feature} from 'Libs/feature';

export {ShowDisabledVideoUI} from './UI/index.js';

export class ShowDisabledVideo extends Feature {
    constructor() {
        super({
            name: 'showDisabledVideo',
            kind: 'videoList',
            settings: {
                on: true,
                title: '显示失效视频部分信息',
            },
        });
    }
}
