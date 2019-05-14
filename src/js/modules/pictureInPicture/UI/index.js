/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {UI} from 'Libs/UI';
import UIBuilder from './PIP';


export class PictureInPictureUI extends UI {
    constructor() {
        super({
            name: 'pictureInPicture',
            dependencies: ['videoAnchor'],
        });
    }

    load = ([container], settings) => {
        return new Promise(resolve => {
            const PIP = UIBuilder();
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilibili-helper-pip-wrapper');
            wrapper.setAttribute('style', 'position: static; margin: 0;');
            container.appendChild(wrapper);
            ReactDOM.render(<PIP settings={settings}/>, wrapper, resolve);
        });
    };
}
