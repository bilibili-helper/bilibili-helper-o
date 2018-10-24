/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

import {Feature} from 'Modules';

export class DoSign extends Feature {
    constructor() {
        super({
            name: 'doSign',
            kind: 'live',
            GUI: null,
            permission: {},
            options: {
                on: true,
                title: '自动签到',
            },
        });
    }
}