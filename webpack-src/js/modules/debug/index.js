/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

import {define} from 'Utils';
import {Feature} from 'Modules';

export const Debug = define([], class Debug extends Feature {
    constructor() {
        super({
            name: 'debug',
            kind: 'other',
            options: {
                on: true,
                title: '调试模式',
            },
        });
    }

    afterSetOption = async (options) => {
        chrome.runtime.sendMessage({commend: 'debugMode', value: options.on});
    };
});