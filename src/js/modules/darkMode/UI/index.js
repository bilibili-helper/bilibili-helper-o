/**
 * Author: Cotch22
 * Create: 2020/7/26
 * Description:
 */

import _ from "lodash";
import {UI} from 'Libs/UI';
import React from 'react';
import ReactDOM from 'react-dom';
import {HomeDarkMode, DynamicDarkMode, ReadDarkMode, ReadCVDarkMode, ReadRankDarkMode, MessageDarkMode, SpaceDarkMode, WatchLaterDarkMode, HistoryDarkMode, LivePlayDarkMode, SearchDarkMode} from './DarkMode';
import VideoDarkBtnBuilder from './VideoBtn';

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
                case 'search' :
                    ReactDOM.render(<SearchDarkMode {...t}/>, wrapper, resolve);
                    break;
            }
        });
    };
}

export class VideoDarkBtnUI extends UI {
    constructor() {
        super({
            name: 'videoDarkBtn',
            dependencies: ['videoAnchor'],
        });
    }

    load = ([container]) => {
        return new Promise(resolve => {
            const VideoDarkBtn = VideoDarkBtnBuilder();
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilibili-helper-video-dark-mode');
            wrapper.setAttribute('style', 'position: static; margin: 0;');
            container.append(wrapper);
            ReactDOM.render(<VideoDarkBtn/>, wrapper, () => resolve(wrapper));
        });
    };
}
