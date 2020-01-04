/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {UI} from 'Libs/UI';
import UIBuilder from './PIP';


export class LivePictureInPictureUI extends UI {
    constructor() {
        super({
            name: 'livePictureInPicture',
        });
    }

    load = (containers, settings) => {
        return new Promise(resolve => {
            if (!settings.on) return resolve();
            const PIP = UIBuilder();
            this.interval('.room-info-down-row .attention-btn-ctnr', 2000).then((container) => {
                const wrapper = document.createElement('div');
                wrapper.setAttribute('class', 'bilibili-helper-live-pip-wrapper');
                wrapper.setAttribute('style', 'display: inline-block; float: left; margin-right: 7px;');
                container && container.appendChild(wrapper);
                ReactDOM.render(<PIP settings={settings}/>, wrapper, resolve);
            });
        });
    };
}
