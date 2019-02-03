/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {ToolBtn} from './ToolBtn';
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
                '#arc_toolbar_report .ops',
                //'.video-info .video-title',
                '#toolbar_module',
                '#arc_toolbar_report',
            ];
            const newPage = document.querySelector('.video-data, .stardust-player');
            const addUI = (container) => {
                if (document.querySelector('.bilibili-helper')) return;
                const helperDOM = document.createElement('span');
                helperDOM.setAttribute('class', 'bilibili-helper');
                container.appendChild(helperDOM);
                ReactDOM.render(<ToolBtn/>, document.querySelector('.bilibili-helper'), () => {
                    const helperContentDOM = document.querySelector('.bilibili-helper-content');
                    resolve(helperContentDOM);
                });
            };
            if (newPage) { // 新页面要先判断b站代码是否跑完
                const retryMax = 10;
                let retryTime = 0;
                let timer = setInterval(() => {
                    if (retryTime > retryMax) {
                        clearInterval(timer);
                        return console.error(`title for view has not changed!`);
                    }
                    const coin = document.querySelector('.coin-info,.coin');
                    if (!coin) return;
                    if ('coin'.indexOf(coin.classList) > -1) {
                        const title = document.querySelector('.view').getAttribute('title');
                        if (title !== '总播放数--') {
                            clearInterval(timer);
                            addUI(document.querySelector('#arc_toolbar_report .ops'));
                        } else ++retryTime;
                    } else if ('coin-info'.indexOf(coin.classList) > -1) { // 新版番剧页面
                        const coinStr = coin.innerText;
                        if (coinStr !== '--') {
                            clearInterval(timer);
                            addUI(document.querySelector('#toolbar_module'));
                        } else ++retryTime;
                    } else ++retryTime;
                }, 1000);
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
                            addUI(document.querySelector('#arc_toolbar_report, #bangumi_detail .func-module'));
                        } else if (bangumiDOM) {
                            addUI(bangumiDOM);
                        } else ++retryTime;
                    }, 1000);
                });
            }
        });
    };
};
