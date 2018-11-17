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

    load = (containers, setting) => {
        return new Promise(resolve => {
            this.interval('.control-panel-icon-row .icon-left-part').then((container) => {
                if (container) {
                    const chatFilter = $('<span />').attr({
                        'class': 'icon-item icon-font',
                        'id': 'bilibili-helper-chat-filter',
                        'style': "position: relative;",
                    });
                    container.append(chatFilter);
                    ReactDOM.render(<ChatFilter setting={setting}/>, chatFilter[0], resolve);
                }
            });
        });
    };
}