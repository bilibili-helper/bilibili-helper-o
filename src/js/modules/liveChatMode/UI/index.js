/**
 * Author: DrowsyFlesh
 * Create: 2018/12/13
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {UI} from 'Libs/UI';
import {LiveChatMode} from './LiveChatMode';

export class LiveChatModeUI extends UI {
    constructor() {
        super({
            name: 'liveChatMode',
        });
    }

    load = (containers, settings) => {
        return new Promise(resolve => {
            this.interval('.room-info-down-row').then((container) => {
                const wrapper = document.createElement('div');
                wrapper.setAttribute('class', 'bilibili-helper-live-chat-mode-wrapper');
                container && container.appendChild(wrapper);
                ReactDOM.render(<LiveChatMode settings={settings}/>, wrapper, resolve);
            });
        });
    };
}
