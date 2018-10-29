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
                toggle: false,
                title: '调试模式',
                description: '开启后会在控制台输出更多信息，并执行更多用于测试的代码',
            },
        });
    }

    afterSetOption = async (options) => {
        chrome.runtime.sendMessage({commend: 'debugMode', value: options.on});
    };
});