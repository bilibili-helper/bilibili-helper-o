/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */

import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';

export {VideoWidenUI} from './UI';

export class VideoWiden extends Feature {
    constructor() {
        super({
            name: 'videoWiden',
            kind: 'video',
            settings: {
                on: true,
                title: __('videoWiden_name'),
                hasUI: true,
                subPage: {
                    type: 'radio',
                    title: __('videoWiden_subPage_title'),
                    options: [
                        {key: 'default', title: __('videoWiden_subPage_options_default')},
                        {key: 'wide', title: __('videoWiden_subPage_options_normalWiden')},
                        {key: 'web', title: __('videoWiden_subPage_options_webFullscreen')},
                    ],
                    value: 'default',
                },
            },
        });
    }
}
