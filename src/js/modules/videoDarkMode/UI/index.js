/**
 * Author: DrowsyFlesh
 * Create: 2019/2/16
 * Description:
 */

import {UI} from 'Libs/UI';
import React from 'react';
import ReactDOM from 'react-dom';

import UIBuilder from './VideoDarkMode';


export class VideoDarkModeUI extends UI {
    constructor() {
        super({
            name: 'videoDarkMode',
            dependencies: ['videoAnchor'],
        });
    }

    load = ([container], {on}) => {
        return new Promise((resolve) => {
            const VideoDarkMode = UIBuilder();
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilibili-helper-video-dark-mode');
            wrapper.setAttribute('style', 'position: static; margin: 0;');
            container.append(wrapper);
            ReactDOM.render(<VideoDarkMode on={on}/>, wrapper, () => resolve(wrapper));
        });
    };
}
