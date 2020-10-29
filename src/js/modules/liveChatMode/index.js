/**
 * Author: DrowsyFlesh
 * Create: 2018/12/13
 * Description:
 */
import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';

export {LiveChatModeUI} from './UI';

export class LiveChatMode extends Feature {
    constructor() {
        super({
            name: 'liveChatMode',
            kind: 'live',
            dependencies: ['language'],
            settings: {
                on: true,
                title: __('liveChatMode_name'),
                description: __('liveChatMode_description'),
                hasUI: true,
            },
        });
    }
}
