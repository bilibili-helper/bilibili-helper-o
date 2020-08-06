/**
 * Author: Cotch22
 * Create: 2020/7/26
 * Description:
 */

import {UI} from 'Libs/UI';
import React from 'react';
import ReactDOM from 'react-dom';
import {HomeDarkMode, DynamicDarkMode, ReadDarkMode, ReadCVDarkMode, ReadRankDarkMode, MessageDarkMode, SpaceDarkMode, WatchLaterDarkMode, HistoryDarkMode, LivePlayDarkMode} from './DarkMode';

export class DarkModeUI extends UI {
    constructor() {
        super({
            name: 'darkMode',
        });
    }

    load = (containers, settings) => {
        if (!settings.on) { return Promise.resolve(); }
        return new Promise(resolve => {
            const wrapper = document.createElement('style');
            const pageName = this.isPage();
            switch (pageName) {
                case 'home' :
                    ReactDOM.render(<HomeDarkMode/>, wrapper, resolve);
                    break;
                case 'dynamic' :
                    ReactDOM.render(<DynamicDarkMode/>, wrapper, resolve);
                    break;
                case 'readCV' :
                    ReactDOM.render(<ReadCVDarkMode/>, wrapper, resolve);
                    break;
                case 'readRank' :
                    ReactDOM.render(<ReadRankDarkMode/>, wrapper, resolve);
                    break;
                case 'read' :
                    ReactDOM.render(<ReadDarkMode/>, wrapper, resolve);
                    break;
                case 'message' :
                    ReactDOM.render(<MessageDarkMode/>, wrapper, resolve);
                    break;
                case 'space' :
                    ReactDOM.render(<SpaceDarkMode/>, wrapper, resolve);
                    break;
                case 'watchLater' :
                    ReactDOM.render(<WatchLaterDarkMode/>, wrapper, resolve);
                    break;
                case 'history' :
                    ReactDOM.render(<HistoryDarkMode/>, wrapper, resolve);
                    break;
                case 'livePlay' :
                    ReactDOM.render(<LivePlayDarkMode/>, wrapper, resolve);
                    break;
            }
        });
    };
}
