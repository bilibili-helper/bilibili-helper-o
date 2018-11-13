/**
 * Author: DrowsyFlesh
 * Create: 2018/11/11
 * Description:
 */
import $ from 'jquery';
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
            const wrapper = $('<div style="order: 0;"class="bilibili-helper-video-download-wrapper"/>');
            container.append(wrapper);
            ReactDOM.render(<VideoDownload setting={setting}/>, wrapper[0], () => {
                chrome.runtime.sendMessage({commend: 'videoDownloadDOMInitialized'});
                resolve(wrapper);
            });
        });
    };
}