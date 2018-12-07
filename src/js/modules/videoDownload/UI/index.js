/**
 * Author: DrowsyFlesh
 * Create: 2018/11/11
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {UI} from 'Libs/UI';
import {VideoDownload} from './videoDownload';

export class VideoDownloadUI extends UI {
    constructor() {
        super({
            name: 'videoDownload',
            dependencies: ['videoAnchor'],
        });
    }

    load = ([container], setting) => {
        return new Promise(resolve => {
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilibili-helper-video-download-wrapper');
            wrapper.setAttribute('style', 'order: 0;');

            container.appendChild(wrapper);
            ReactDOM.render(
                <VideoDownload innerRef={i => this.container = i} setting={setting}/>,
                wrapper,
                () => resolve(this.container),
            );
        });
    };
}