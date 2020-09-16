/**
 * Author: Cotch22
 * Create: 2020/7/26
 * Description:
 */

import _ from "lodash";
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
            const darkFollowSys =  _.find(settings.options, {key: 'darkFollowSys'});
            const t = {darkFollowSys: darkFollowSys.on};
            const wrapper = document.createElement('style');
            const pageName = this.isPage();
            switch (pageName) {
                case 'home' :
                    ReactDOM.render(<HomeDarkMode {...t}/>, wrapper, resolve);
                    break;
                case 'dynamic' :
                    ReactDOM.render(<DynamicDarkMode {...t}/>, wrapper, resolve);
                    break;
                case 'readCV' :
                    ReactDOM.render(<ReadCVDarkMode {...t}/>, wrapper, resolve);
                    break;
                case 'readRank' :
                    ReactDOM.render(<ReadRankDarkMode {...t}/>, wrapper, resolve);
                    break;
                case 'read' :
                    ReactDOM.render(<ReadDarkMode {...t}/>, wrapper, resolve);
                    break;
                case 'message' :
                    ReactDOM.render(<MessageDarkMode {...t}/>, wrapper, resolve);
                    break;
                case 'space' :
                    ReactDOM.render(<SpaceDarkMode {...t}/>, wrapper, resolve);
                    break;
                case 'watchLater' :
                    ReactDOM.render(<WatchLaterDarkMode {...t}/>, wrapper, resolve);
                    break;
                case 'history' :
                    ReactDOM.render(<HistoryDarkMode {...t}/>, wrapper, resolve);
                    break;
                case 'livePlay' :
                    ReactDOM.render(<LivePlayDarkMode {...t}/>, wrapper, resolve);
                    break;
            }
        });
    };
}
