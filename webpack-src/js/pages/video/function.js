/**
 * Author: DrowsyFlesh
 * Create: 2018/10/19
 * Description:
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {ToolBtn} from './components';

export const InstallDOM = (callback = () => {}) => {
    const container = (() => {
        let content = null;
        if ($('#bangumi_detail .func-module').length) content = $('#bangumi_detail .func-module');
        else if ($('#arc_toolbar_report .ops').length) content = $('#arc_toolbar_report .ops');
        else if ($('#arc_toolbar_report').length) content = $('#arc_toolbar_report');
        return content;
    })();
    const helperDOM = $('<span class="bilibili-helper" title="哔哩哔哩助手"/>');

    /**
     * 插入助手DOM
     * 在B站原有脚本没有执行完时插入会导致结构莫名被破坏，原因还未查明
     * 故使用observer检测当目标容器的父容器所有加在变化都发生后再执行插入操作
     */
    let timer;
    let observer = new MutationObserver(function(mutationList, observer) {
        if (!!timer) clearTimeout(timer);
        timer = setTimeout(() => {
            observer.disconnect();
            container.append(helperDOM);
            ReactDOM.render(<ToolBtn/>, container.find('.bilibili-helper')[0]);
            typeof callback === 'function' && callback(helperDOM.find('.bilibili-helper-content'));
        }, 500);
    });

    observer.observe(container[0], {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        subtree: true,
    });
};