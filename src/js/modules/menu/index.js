/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';

export {MenuUI} from './UI/index';

export class Menu extends Feature {
    constructor() {
        super({
            name: 'menu',
            kind: 'popup',
            permissions: ['login'],
            dependencies: ['popupAnchor'],
            settings: {
                on: true,
                toggle: false,
                title: __('menu_name'),
                type: 'checkbox',
                hasUI: true,
                description: __('menu_description'),
                options: [
                    {
                        key: 'shortMode',
                        title: __('menu_options_shortMode'),
                        on: false,
                        description: __('menu_options_shortMode_description'),
                    },
                    {
                        key: 'oldWatchPage',
                        title: __('menu_options_oldWatchPage'),
                        on: false,
                        hide: true,
                    },
                ],
                subPage: {
                    title: __('menu_subPage_title'),
                    type: 'checkbox',
                    options: [
                        {key: 'video', title: __('menu_subPage_options_video'), on: true},
                        {key: 'live', title: __('menu_subPage_options_live'), on: true},
                        {key: 'dynamic', title: __('menu_subPage_options_dynamic'), on: true},
                        {key: 'favourite', title: __('menu_subPage_options_favourite'), on: true},
                        {
                            key: 'linker',
                            title: __('menu_subPage_options_linker'),
                            on: true,
                            description: __('menu_subPage_options_linker_description'),
                        },
                    ],
                },
            },
        });
    }
}
