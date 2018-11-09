/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {ToolBtn} from 'Components';
import {UI} from 'Libs/UI.js';

export class VideoUI extends UI {
    constructor() {
        super({
            name: 'video',
        });
    }

    load = () => {
        return new Promise(resolve => {
            const containerSelectors = [
                '#bangumi_detail .func-module',
                '#arc_toolbar_report .ops',
                '#arc_toolbar_report',
            ];
            this.observer(containerSelectors).then((container) => {
                const helperDOM = $('<span class="bilibili-helper" title="哔哩哔哩助手"/>');
                container.append(helperDOM);
                ReactDOM.render(<ToolBtn/>, container.find('.bilibili-helper')[0], () => {
                    const helperContentDOM = helperDOM.find('.bilibili-helper-content');
                    resolve(helperContentDOM);
                });
            });
        })
    };
};

//export const Video = defineGUI([], ([], options) => {
//    return new Promise (resolve => {
//        const {on, container, name} = options;
//        if (on) {
//            const helperDOM = $('<span class="bilibili-helper" title="哔哩哔哩助手"/>');
//            container.append(helperDOM);
//            ReactDOM.render(<ToolBtn/>, container.find('.bilibili-helper')[0], () => {
//                const container = $('<div/>').addClass(`bilibili-helper-${name}-wrapper`);
//                const helperContentDOM = helperDOM.find('.bilibili-helper-content');
//                helperContentDOM.append(container);
//                resolve(container);
//            });
//        }
//    });
//
//});