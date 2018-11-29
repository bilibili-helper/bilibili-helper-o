/**
 * Author: DrowsyFlesh
 * Create: 2018/11/10
 * Description:
 */

import $ from 'jquery';
import {UI} from 'Libs/UI';
import React from 'react';
import ReactDOM from 'react-dom';
import {ChatFilter} from './ChatFilter';
import './style.scss';

export class ChatFilterUI extends UI {
    constructor() {
        super({
            name: 'chatFilter',
        });
    }

    load = (containers, settings) => {
        return new Promise(resolve => {
            this.interval('.aside-area .control-panel-icon-row', 1000).then((container) => {
                if (container) {
                    const panel = container.find('.icon-left-part');
                    const chatFilter = $('<span />').attr({
                        'class': 'icon-item icon-font',
                        'id': 'bilibili-helper-chat-filter',
                        'style': 'position: relative;',
                    });
                    panel.append(chatFilter);
                    ReactDOM.render(<ChatFilter settings={settings}/>, chatFilter[0], resolve);
                }
            });
        });
    };
}