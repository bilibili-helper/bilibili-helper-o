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
                '#arc_toolbar_report',
            ];
            const newPage = document.querySelector('.video-data');
            const addUI = (container) => {
                if (document.querySelector('.bilibili-helper')) return;
                const helperDOM = document.createElement('span');
                helperDOM.setAttribute('class', 'bilibili-helper');
                container.appendChild(helperDOM);
                ReactDOM.render(<ToolBtn/>, document.querySelector('.bilibili-helper'), () => {
                    /**
                     * !!! 注释掉是因为点击视频下载链接后浏览器会触发beforeunload事件
                     */
                    /*window.addEventListener('beforeunload', function() { // 页面关闭的时候删除后端存储的tabStore
                        console.warn('beforeunload');
                        chrome.runtime.sendMessage({commend: 'tabUnload'}, () => true);
                    });*/
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
                    const title = document.querySelector('.view').getAttribute('title');
                    if (title !== '总播放数--') {
                        clearInterval(timer);
                        addUI(document.querySelector('#arc_toolbar_report .ops'));
                    } else ++retryTime;
                }, 1000);
            } else { // 老的番剧页面
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