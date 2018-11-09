/**
 * Author: DrowsyFlesh
 * Create: 2018/10/27
 * Description:
 */

import {Feature} from 'Libs/feature';

export const ChatFilter =  class ChatFilter extends Feature {
    constructor() {
        super({
            name: 'chatFilter',
            kind: 'live',
            dependencies: ['debug'],
            settings: {
                on: true,
                title: '聊天内容过滤',
                options: [],
                toggle: true,
            },
        });
    }
};