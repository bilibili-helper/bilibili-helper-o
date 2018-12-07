/**
 * Author: DrowsyFlesh
 * Create: 2018/11/8
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {UI} from 'Libs/UI.js';
import {Treasure} from './Treasure.js';

export class TreasureUI extends UI {
    constructor() {
        super({
            name: 'treasure',
        });
    }

    load = () => {
        return new Promise(resolve => {
            this.interval('.treasure-box').then((container) => {
                if (container) {
                    container.setAttribute('id', 'bilibili-helper-treasure')
                    ReactDOM.render(<Treasure/>, container, resolve);
                }
            });
        });
    };
}