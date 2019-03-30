/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Menu} from './Menu';
import {UI} from 'Libs/UI';

export class MenuUI extends UI {
    constructor() {
        super({
            name: 'menu',
            dependencies: ['popupAnchor'],
        });
    }

    load = ([popupDOM], settings) => {
        return new Promise(resolve => {
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilibili-helper-menu-container');
            popupDOM.appendChild(wrapper);
            ReactDOM.render(
                <Menu settings={settings} ref={i => this.container = i}/>,
                wrapper,
                () => resolve(this.container),
            );
        });
    };
}
