/**
 * Author: DrowsyFlesh
 * Create: 2018/10/10
 * Description: 该文件用于注入到视频播放页面，主要作用是创建DOM钩子，用于装载一些需要在其内显示的功能控件
 */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {ToolBtn} from './components';
import 'Styles/scss/video.scss';

const init = () => {
    let timer = null;

    const getContent = () => {
        let content = null;
        if ($('#bangumi_detail .bangumi-info .info-right .info-title .func-module').length) {
            content = $('#bangumi_detail .bangumi-info .info-right .info-title .func-module');
        } else if ($('#arc_toolbar_report .ops').length) content = $('#arc_toolbar_report .ops');
        else if ($('#arc_toolbar_report').length) content = $('#arc_toolbar_report');
        return content;
    };
    const content = getContent();

    let observer = new MutationObserver(function(mutationList, observer) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            observer.disconnect();
            content.append('<span class="bilibili-helper" title="哔哩哔哩助手"/>');
            const container = content.find('.bilibili-helper')[0];
            ReactDOM.render(<ToolBtn/>, container);
        }, 1000);
    });

    observer.observe(content[0], {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        subtree: true,
        attributeFilter: ['title'],
    });
    return content;
}
init();
