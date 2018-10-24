/**
 * Author: DrowsyFlesh
 * Create: 2018/10/10
 * Description: 该文件用于注入到视频播放页面，主要作用是创建DOM钩子，用于装载一些需要在其内显示的功能控件
 */
import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {getTargetDOM} from 'Utils';
import {ToolBtn} from './components';
import * as allGUI from 'Modules/index_GUI.js';
import 'Styles/scss/video.scss';

getTargetDOM([
    '#bangumi_detail .func-module',
    '#arc_toolbar_report .ops',
    '#arc_toolbar_report',
], (container) => {
    const helperDOM = $('<span class="bilibili-helper" title="哔哩哔哩助手"/>');
    container.append(helperDOM);
    ReactDOM.render(<ToolBtn/>, container.find('.bilibili-helper')[0], () => {
        const helperContentDOM = helperDOM.find('.bilibili-helper-content');
        chrome.runtime.sendMessage({commend: 'getVideoFeatures'}, (videoFeatureNames = []) => {
            /**
             * 获取和video相关的模块及其option配置
             * 根据option配置加载相应GUI
             */
            _.map(videoFeatureNames, (option, featureName) => {
                const {GUI, options} = option;
                const Gui = allGUI[GUI];
                //console.log(allGUI, <Gui/>, GUI, options, featureName);
                if (options.on) {
                    /**
                     * GUI 组件只需要在输出时用React.Fragment包裹即可
                     * 目的是为了在输出到钩子容器时手动创建每个Feature的子容器而不会覆盖掉已存在的容器
                     */
                    const container = $('<div/>').addClass(`bilibili-helper-${featureName}-wrapper`);
                    helperContentDOM.append(container);
                    ReactDOM.render(<Gui/>, container[0]);
                }
            });
        });
    });

});


