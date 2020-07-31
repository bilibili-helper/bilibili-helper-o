/**
 * Author: Cotch22
 * Create: 2020/7/26
 * Description:
 */

import {UI} from 'Libs/UI';
import React from 'react';
import ReactDOM from 'react-dom';
import { DynamicDarkMode, ReadCVDarkMode, MessageDarkMode, SpaceDarkMode } from './DarkMode';

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
            const pageName = this.isPage();
            if (pageName) {
                if (pageName === 'dynamic'){
                    ReactDOM.render(<DynamicDarkMode/>, wrapper, resolve);
                }
                if (pageName === 'readCV') {
                    ReactDOM.render(<ReadCVDarkMode/>, wrapper, resolve);
                }
                if (pageName === 'message') {
                    ReactDOM.render(<MessageDarkMode/>, wrapper, resolve);
                }
                if (pageName === 'space') {
                    ReactDOM.render(<SpaceDarkMode/>, wrapper, resolve);
                }
            }
        });
    };
}
