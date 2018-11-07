/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {ToolBtn} from 'Components';

export {};

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