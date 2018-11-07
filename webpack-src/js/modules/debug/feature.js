
/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import {Feature} from 'Libs/feature';

export class Debug extends Feature {
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
}