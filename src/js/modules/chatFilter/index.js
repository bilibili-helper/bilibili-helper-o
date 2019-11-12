/**
 * Author: DrowsyFlesh
 * Create: 2018/10/27
 * Description:
 */

import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';

export {ChatFilterUI} from './UI/index';

export class ChatFilter extends Feature {
    constructor() {
        super({
            name: 'chatFilter',
            kind: 'live',
            settings: {
                on: true,
                title: __('charFilter_name'),
                hasUI: true,
                description: __('charFilter_description'),
                subPage: {
                    type: 'checkbox',
                    title: __('charFilter_subPage_title'),
                    description: __('charFilter_subPage_description'),
                    options: [
                        {
                            key: 'chat',
                            title: __('charFilter_subPage_options_chat'),
                            on: false,
                        },
                        {
                            key: 'small',
                            title: __('charFilter_subPage_options_small'),
                            on: true,
                            description: __('charFilter_subPage_options_small_description'),
                        },
                        {
                            key: 'gift',
                            title: __('charFilter_subPage_options_gift'),
                            on: true,
                        },
                        {
                            key: 'enterMsg',
                            title: __('charFilter_subPage_options_enterMsg'),
                            on: true,
                        },
                        {
                            key: 'medal',
                            title: __('charFilter_subPage_options_medal'),
                            on: true,
                        },
                        {
                            key: 'achievement',
                            title: __('charFilter_subPage_options_achievement'),
                            on: true,
                        },
                        {
                            key: 'level',
                            title: __('charFilter_subPage_options_level'),
                            on: true,
                        },
                        {
                            key: '2233',
                            title: __('charFilter_subPage_options_2233'),
                            on: true,
                        },
                        {
                            key: 'announcement',
                            title: __('charFilter_subPage_options_announcement'),
                            on: false,
                            description: __('charFilter_subPage_options_announcement_description'),
                        },
                    ],
                },
            },
        });
    }
};
