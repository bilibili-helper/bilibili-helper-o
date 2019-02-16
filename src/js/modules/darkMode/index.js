/**
 * Author: DrowsyFlesh
 * Create: 2019/2/16
 * Description:
 */

import {Feature} from 'Libs/feature';
export {DarkModeUI} from './UI/index';

export class DarkMode extends Feature {
    constructor() {
        super({
            name: 'darkMode',
            kind: 'video',
            settings: {
                on: false,
                hasUI: true,
                title: '夜间模式',
            },
        });
    }
}
