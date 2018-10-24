/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

import {Feature} from 'Modules';

export class Debug extends Feature {
    constructor() {
        super({
            name: 'debug',
            kind: 'other',
            GUI: null,
            permission: {},
            options: {
                on: true,
                toggle: false,
                title: '调试模式',
            },
        });
    }

    afterSetOption = async (options) => {
        chrome.runtime.sendMessage({commend: 'debugMode', value: options.on});
    };

}