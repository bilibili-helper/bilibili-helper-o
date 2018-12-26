/**
 * Author: DrowsyFlesh
 * Create: 2018/12/13
 * Description:
 */
import {Feature} from 'Libs/feature';

export {LiveChatModeUI} from './UI';

export class LiveChatMode extends Feature {
    constructor() {
        super({
            name: 'liveChatMode',
            kind: 'live',
            settings: {
                on: true,
                title: '版聊模式',
                description: '在直播间开启网页全屏或全屏模式时以纵向排列的方式显示聊天内容，同时隐藏弹幕',
                hasUI: true,
            },
        });
    }
}
