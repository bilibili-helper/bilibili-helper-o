/**
 * Author: DrowsyFlesh
 * Create: 2019/3/17
 * Description:
 */
import {Feature} from 'Libs/feature';

export class CvImages extends Feature {
    constructor() {
        super({
            name: 'cvImages',
            kind: 'cv',
            settings: {
                on: true,
                title: '专栏图片保存',
            },
        });
    }
}
