/**
 * Author: Cotch22
 * Create: 2020/7/26
 * Description:
 */

import {UI} from 'Libs/UI';
import React from 'react';
import ReactDOM from 'react-dom';
import { DynamicDarkMode, ReadCVDarkMode } from './DarkMode';

export class DarkModeUI extends UI {
    constructor() {
        super({
            name: 'darkMode',
        });
    }

    load = (containers, settings) => {
        if (!settings.on) { return Promise.resolve(); }
        return new Promise(resolve => {
            const wrapper = document.createElement('div');
            this.isPage('home');
            this.isPage('space');
            if (this.isPage('dynamic')){
                ReactDOM.render(<DynamicDarkMode/>, wrapper, resolve);
            } else if (this.isPage('readCV')) {
                ReactDOM.render(<ReadCVDarkMode/>, wrapper, resolve);
            }
        });
    };
}
