/**
 * Author: memorydream
 * Create: 2020/10/22
 * Description: 屏蔽主页上的分区
 */

import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';

export {PartitionFilterUI} from './UI';

export class PartitionFilter extends Feature{
    constructor() {
        super({
            name: 'partitionFilter',
            kind: 'home',
            settings: {
                on: false,
                title: __('partitionFilter_name'),
                hasUI: true,
                subPage: {
                    type: 'checkbox',
                    title: __('partitionFilter_subPage_title'),
                    description: __('partitionFilter_subPage_description'),
                    options: [
                        {
                            key: 'live',
                            title: __('partitionFilter_subPage_options_live'),
                            on: false,
                        },
                        {
                            key: 'guochuang',
                            title: __('partitionFilter_subPage_options_guochuang'),
                            on: false,
                        },
                        {
                            key: 'anime',
                            title: __('partitionFilter_subPage_options_anime'),
                            on: false,
                        },
                        {
                            key: 'duoga',
                            title: __('partitionFilter_subPage_options_duoga'),
                            on: false,
                        },
                        {
                            key: 'music',
                            title: __('partitionFilter_subPage_options_music'),
                            on: false,
                        },
                        {
                            key: 'dance',
                            title: __('partitionFilter_subPage_options_dance'),
                            on: false,
                        },
                        {
                            key: 'game',
                            title: __('partitionFilter_subPage_options_game'),
                            on: false,
                        },
                        {
                            key: 'technology',
                            title: __('partitionFilter_subPage_options_technology'),
                            on: false,
                        },
                        {
                            key: 'cheese',
                            title: __('partitionFilter_subPage_options_cheese'),
                            on: false,
                        },
                        {
                            key: 'digital',
                            title: __('partitionFilter_subPage_options_digital'),
                            on: false,
                        },
                        {
                            key: 'life',
                            title: __('partitionFilter_subPage_options_life'),
                            on: false,
                        },
                        {
                            key: 'kichiku',
                            title: __('partitionFilter_subPage_options_kichiku'),
                            on: false,
                        },
                        {
                            key: 'fashion',
                            title: __('partitionFilter_subPage_options_fashion'),
                            on: false,
                        },
                        {
                            key: 'information',
                            title: __('partitionFilter_subPage_options_information'),
                            on: false,
                        },
                        {
                            key: 'ent',
                            title: __('partitionFilter_subPage_options_ent'),
                            on: false,
                        },
                        {
                            key: 'movie',
                            title: __('partitionFilter_subPage_options_movie'),
                            on: false,
                        },
                        {
                            key: 'cinephile',
                            title: __('partitionFilter_subPage_options_cinephile'),
                            on: false,
                        },
                        {
                            key: 'read',
                            title: __('partitionFilter_subPage_options_read'),
                            on: false,
                        },
                        {
                            key: 'teleplay',
                            title: __('partitionFilter_subPage_options_teleplay'),
                            on: false,
                        },
                        {
                            key: 'manga',
                            title: __('partitionFilter_subPage_options_manga'),
                            on: false,
                        },
                        {
                            key: 'documentary',
                            title: __('partitionFilter_subPage_options_documentary'),
                            on: false,
                        },
                    ],
                },
            },
        });
    }
}