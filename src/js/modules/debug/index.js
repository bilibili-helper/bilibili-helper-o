/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

import {Feature} from 'Libs/feature';

export class Debug extends Feature {
    constructor() {
        super({
            name: 'debug',
            kind: 'other',
            settings: {
                on: false,
                toggle: true,
                title: '调试模式',
                description: '开启后会在控制台输出更多信息，并执行更多用于测试的代码',
            },
        });
    }
}