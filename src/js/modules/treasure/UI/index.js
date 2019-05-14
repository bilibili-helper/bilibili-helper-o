/**
 * Author: DrowsyFlesh
 * Create: 2018/11/8
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {UI} from 'Libs/UI.js';
import UIBuilder from './Treasure.js';

export class TreasureUI extends UI {
    constructor() {
        super({
            name: 'treasure',
        });
    }

    load = (containers, settings) => {
        if (!settings.on) return Promise.resolve();
        return new Promise(resolve => {
            const Treasure = UIBuilder();
            this.interval('.treasure-box', 2000).then((container) => {
                if (container) {
                    container.setAttribute('id', 'bilibili-helper-treasure');
                    ReactDOM.render(<Treasure/>, container, resolve);
                }
            });
        });
    };
}
