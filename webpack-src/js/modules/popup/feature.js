/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */

import {Feature} from 'Libs/feature';

export class Popup extends Feature {
    constructor() {
        super({
            name: 'popup',
            kind: 'popup',
            options: {
                on: true,
                hide: true,
            },
            dependencies: ['debug'],
        });
    }
}