/**
 * Author: DrowsyFlesh
 * Create: 2018/11/10
 * Description:
 */

import {UI} from 'Libs/UI';
import React from 'react';
import ReactDOM from 'react-dom';
import UIBuilder from './ChatFilter';

export class ChatFilterUI extends UI {
    constructor() {
        super({
            name: 'chatFilter',
        });
    }

    load = (containers, settings) => {
        if (!settings.on) return Promise.resolve();
        return new Promise(resolve => {
            const ChatFilter = UIBuilder();
            this.interval('.aside-area .control-panel-icon-row', 2000).then((container) => {
                if (container) {
                    const chatFilter = document.createElement('span');
                    chatFilter.setAttribute('class', 'icon-item icon-font');
                    chatFilter.setAttribute('id', 'bilibili-helper-chat-filter');
                    chatFilter.setAttribute('style', 'position: relative;');

                    const iconBar = document.querySelector('.control-panel-icon-row');
                    iconBar.style.overflow = 'unset';
                    iconBar.style.height = '24px';

                    document.querySelector('.icon-left-part').appendChild(chatFilter);
                    ReactDOM.render(<ChatFilter settings={settings}/>, chatFilter, resolve);
                }
            });
        });
    };
}
