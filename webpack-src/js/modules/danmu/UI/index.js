/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {Danmu} from './danmu';
import {UI} from 'Libs/UI';

export class DanmuUI extends UI {
    constructor() {
        super({
            name: 'danmu',
            dependencies: ['videoAnchor'],
        });
    }

    load = ([container], settings) => {
        return new Promise(resolve => {
            const danmuWrapper = $('<div style="order: 1;"/>').attr('class', 'bilibili-helper-danmu-wrapper');
            container.append(danmuWrapper);
            danmuWrapper[0] && ReactDOM.render(<Danmu settings={settings}/>, danmuWrapper[0], resolve);
        });
    };
}