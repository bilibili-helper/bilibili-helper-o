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
            switch (pageName) {
                case 'dynamic' :
                    ReactDOM.render(<DynamicDarkMode/>, wrapper, resolve);
                    break;
                case 'readCV' :
                    ReactDOM.render(<ReadCVDarkMode/>, wrapper, resolve);
                    break;
                case 'message' :
                    ReactDOM.render(<MessageDarkMode/>, wrapper, resolve);
                    break;
                case 'space' :
                    ReactDOM.render(<SpaceDarkMode/>, wrapper, resolve);
                    break;
            }
        });
    };
}
