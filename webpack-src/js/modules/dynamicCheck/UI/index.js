/**
 * Author: DrowsyFlesh
 * Create: 2018/11/10
 * Description:
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {DynamicBox} from './DynamicBox';
import {UI} from 'Libs/UI';

export class DynamicCheckUI extends UI {
    constructor() {
        super({
            name: 'dynamicCheck',
            dependencies: ['popup'],
        });
    }

    load = (popupDOM) => {
        return new Promise(resolve => {
            const container = $('<div />').attr('class', 'bilibili-helper-dynamic-check-container');
            $(popupDOM).append(container);
            ReactDOM.render(<DynamicBox innerRef={i => this.container = i}/>, container[0]);
            resolve($(this.container)[0]);
        });
    };
}