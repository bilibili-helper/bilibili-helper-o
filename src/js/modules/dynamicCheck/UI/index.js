/**
 * Author: DrowsyFlesh
 * Create: 2018/11/10
 * Description:
 */
import $ from 'jquery';
import _ from 'lodash';
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

    load = ([popupDOM], settings) => {
        return new Promise(resolve => {
            const dynamicCheckBoxState = _.find(settings.options,({key})=>key ==='dynamicCheckBox');
            if (dynamicCheckBoxState.on) {
                const container = $('<div />').attr('class', 'bilibili-helper-dynamic-check-container');
                popupDOM.appendChild(container[0]);
                ReactDOM.render(<DynamicBox innerRef={i => this.container = i}/>, container[0]);
                resolve($(this.container)[0]);
            } else resolve(null);
        });
    };
}