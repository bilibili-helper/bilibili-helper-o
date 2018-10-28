/**
 * Author: DrowsyFlesh
 * Create: 2018/10/27
 * Description:
 */

import {define} from 'Utils';
import {Feature} from 'Modules';

export const ChatFilter =  define([], class ChatFilter extends Feature {
    constructor() {
        super({
            name: 'chatFilter',
            kind: 'live',
            permission: {},
            options: {
                on: true,
                title: '聊天内容过滤',
                options: [],
                toggle: true,
            },
        });
    }
});