/**
 * Author: DrowsyFlesh
 * Create: 2018/12/13
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {UI} from 'Libs/UI';
import UIBuilder from './LiveChatMode';

export class LiveChatModeUI extends UI {
    constructor() {
        super({
            name: 'liveChatMode',
        });
    }

    load = (containers, settings) => {
        if (!settings.on) return Promise.resolve();
        return new Promise(resolve => {
            const LiveChatMode = UIBuilder();
            this.interval('.room-info-down-row', 2000).then((container) => {
                const wrapper = document.createElement('div');
                wrapper.setAttribute('class', 'bilibili-helper-live-chat-mode-wrapper');
                container && container.appendChild(wrapper);
                ReactDOM.render(<LiveChatMode settings={settings}/>, wrapper, resolve);
            });
        });
    };
}
