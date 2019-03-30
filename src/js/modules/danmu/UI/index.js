/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Danmu} from './danmu';
import {UI} from 'Libs/UI';

export class DanmuUI extends UI {
    constructor() {
        super({
            name: 'danmu',
            dependencies: ['videoAnchor'],
        });
    }

    load = ([container], settings) => {
        if (!settings.on) return Promise.resolve();
        return new Promise(resolve => {
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilibili-helper-danmu-wrapper');
            wrapper.setAttribute('style', 'order: 3;');
            container.appendChild(wrapper);
            ReactDOM.render(
                <Danmu ref={i => this.container = i} settings={settings}/>,
                wrapper,
                () => resolve(this.container),
            );
        });
    };
}
