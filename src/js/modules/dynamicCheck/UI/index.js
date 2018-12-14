/**
 * Author: DrowsyFlesh
 * Create: 2018/11/10
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {DynamicBox} from './DynamicBox';
import {UI} from 'Libs/UI';

export class DynamicCheckUI extends UI {
    constructor() {
        super({
            name: 'dynamicCheck',
            dependencies: ['popupAnchor'],
        });
    }

    load = ([popupDOM], settings) => {
        return new Promise(resolve => {
            const dynamicCheckBoxState = _.find(settings.options, ({key}) => key === 'dynamicCheckBox');
            if (dynamicCheckBoxState.on) {
                const wrapper = document.createElement('div');
                wrapper.setAttribute('class', 'bilibili-helper-dynamic-check-container');
                popupDOM.appendChild(wrapper);
                ReactDOM.render(
                    <DynamicBox ref={i => this.container = i}/>,
                    wrapper,
                    () => resolve(this.container),
                );
            } else resolve(null);
        });
    };
}