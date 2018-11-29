/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import $ from 'jquery';
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
            const newPage = $('.video-data');
            const addUI = (container) => {
                if ($('.bilibili-helper').length > 0) return;
                const helperDOM = $('<span class="bilibili-helper"/>');
                container.append(helperDOM);
                ReactDOM.render(<ToolBtn/>, container.find('.bilibili-helper')[0], () => {
                    $(window).on('beforeunload', function() { // 页面关闭的时候删除后端存储的tabStore
                        chrome.runtime.sendMessage({commend: 'tabUnload'}, () => true);
                    });
                    const helperContentDOM = helperDOM.find('.bilibili-helper-content');
                    resolve(helperContentDOM);
                });
            };
            if (newPage.length > 0) { // 新页面要先判断b站代码是否跑完
                const retryMax = 10;
                let retryTime = 0;
                let timer = setInterval(() => {
                    if (retryTime > retryMax) {
                        clearInterval(timer);
                        return console.error(`title for view has not changed!`);
                    }
                    const title = newPage.find('.view').attr('title');
                    if (title !== '总播放数--') {
                        clearInterval(timer);
                        const container = $('#arc_toolbar_report .ops');
                        addUI(container);
                    } else ++retryTime;
                }, 1000);
            } else { // 老的番剧页面
                this.observer(containerSelectors).then((container) => {
                    let timer;
                    let timeout = false;
                    timer = setTimeout(() => {
                        timeout = true;
                        container.length > 0 && addUI(container);
                    }, 700);
                    container.length > 0 && new MutationObserver(function(mutationList, observer) {
                        if (timeout) observer.disconnect();
                        if (!!timer) clearTimeout(timer);
                        if ($('.fav-box .num').text() !== 0 || $('.coin-box .num').text() !== '--') {
                            observer.disconnect();
                            addUI(container);
                        }
                    }).observe(container[0], {
                        childList: true,
                        attributes: true,
                        attributeOldValue: true,
                        subtree: true,
                    });
                });
            }
        });
    };
};