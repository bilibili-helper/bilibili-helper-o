/**
 * Author: DrowsyFlesh
 * Create: 2018/11/10
 * Description:
 */

import {UI} from 'Libs/UI';

export class ShowDisabledVideoUI extends UI {
    constructor() {
        super({
            name: 'showDisabledVideo',
        });
    }

    load = (containers, settings) => {
        if (!settings.on) return Promise.resolve();
        return new Promise(resolve => {
            console.warn(1);
            resolve(containers);
        });
    };
}
