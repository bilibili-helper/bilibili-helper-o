/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ToolBtnBuilder from './ToolBtn';
import {UI} from 'Libs/UI.js';

export class VideoAnchorUI extends UI {
    constructor() {
        super({
            name: 'videoAnchor',
        });
    }

    load = () => {
        return new Promise(resolve => {
            const containerSelectors = [
                '#bangumi_detail .func-module',
                '#entryOld',
                //'.video-info .video-title',
                '.entry-old',
                '#arc_toolbar_report',
                '#viewlater-app .video-toolbar-module',
            ];
            const newPage = document.querySelector('.video-data, .stardust-player, iframe.bnj-player-main');
            const addUI = (container, callback) => {
                if (document.querySelector('.bilibili-helper')) return;
                const helperDOM = document.createElement('span');
                helperDOM.setAttribute('class', 'bilibili-helper');
                container.appendChild(helperDOM);
                const ToolBtn = ToolBtnBuilder();
                ReactDOM.render(<ToolBtn/>, document.querySelector('.bilibili-helper'), () => {
                    const helperContentDOM = document.querySelector('.bilibili-helper-content');
                    if (typeof callback === 'function') callback(container);
                    resolve(helperContentDOM);
                });
            };
            if (newPage) { // 新页面要先判断b站代码是否跑完
                document.querySelector('html').classList.add('new-page');
                addUI(document.body);
            } else { // 老页面
                this.interval(containerSelectors).then(() => {
                    const retryMax = 10;
                    let retryTime = 0;
                    let timer = setInterval(() => {
                        if (retryTime > retryMax) {
                            clearInterval(timer);
                            return console.error(`Title for view has not changed or unknow page!`);
                        }
                        const favDOM = document.querySelector('.fav-box .num');
                        const bangumiDOM = document.querySelector('#bangumi_detail .func-module');
                        const favNum = favDOM ? favDOM.innerText : false;
                        if (favNum) {
                            clearInterval(timer);
                            addUI(document.querySelector('#arc_toolbar_report, #bangumi_detail .func-module, #viewlater-app .video-toolbar-module'));
                        } else if (bangumiDOM) {
                            addUI(bangumiDOM);
                        } else ++retryTime;
                    }, 1000);
                });
            }
        });
    };
};
