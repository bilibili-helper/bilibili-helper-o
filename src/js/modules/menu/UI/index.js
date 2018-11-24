/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {Menu} from './Menu';
import {UI} from 'Libs/UI';

export class MenuUI extends UI {
    constructor() {
        super({
            name: 'menu',
            dependencies: ['popup'],
        });
    }

    load = (popupDOM) => {
        return new Promise(resolve => {
            const container = $('<div />').attr('class', 'bilibili-helper-menu-container');
            $(popupDOM).append(container);
            ReactDOM.render(<Menu innerRef={i => this.container = i}/>, container[0]);
            resolve($(this.container)[0]);
        });
    };
}