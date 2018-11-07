/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {Treasure as TreasureGUI} from './Treasure';
//import {defineGUI} from 'Utils';

//export const Treasure = defineGUI(['video'], ([container], options) => {
//    return new Promise(resolve => {
//        const {on, container, GUI} = options;
//        const intervalNum = on && setInterval(() => {
//            const panelCtrl = $('#gift-control-vm .gift-control-panel');
//            const originCtrl = panelCtrl.find('.treasure-box');
//            if (originCtrl.length > 0) {
//                clearInterval(intervalNum);
//                console.log('开始加载Treasure模块~(*≧∪≦)');
//                const originCtrl = container.find('#gift-control-vm .treasure-box').hide();
//                const helperCtrl = originCtrl.clone().attr({
//                    id: 'bilibili-helper-treasure-panel',
//                    class: 'treasure-box p-relative gift-left-part',
//                }).show();
//                originCtrl.remove();
//                panelCtrl.prepend(helperCtrl);
//                ReactDOM.render(<GUI options={options}/>, helperCtrl[0]);
//            }
//        }, 1000);
//    });
//});