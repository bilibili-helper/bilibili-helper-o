/* global process */
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
            dependencies: ['language'],
            settings: {
                on: process.env.DEBUG || false,
                toggle: !process.env.DEBUG,
                hide: true,
                title: '调试模式',
                description: '测试版中该选项无法关闭。开启后会在控制台输出更多信息，并执行更多用于测试的代码',
            },
        });
    }

    launch = () => {
        this.settings.on = process.env.DEBUG;
        this.setSetting(this.settings);
    }
    afterSetSetting = async ({on}) => {
        chrome.runtime.sendMessage({command: 'debugMode', value: on});
    };
}
