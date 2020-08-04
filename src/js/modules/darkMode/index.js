/**
 * Author: Cotch22
 * Create: 2020/7/26
 * Description:
 */

import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';
export {DarkModeUI} from './UI/index';

export class DarkMode extends Feature {
    constructor() {
        super({
            name: 'darkMode',
            kind: 'global',
            settings: {
                on: false,
                hasUI: true,
                title: __('darkMode_name'),
                description:__('darkMode_description'),
            },
        });
    }
}
