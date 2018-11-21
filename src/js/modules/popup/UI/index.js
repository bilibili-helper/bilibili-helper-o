/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {UI} from 'Libs/UI';

export const Main = styled.div.attrs({className: 'bilibili-helper-popup-main'})`
  display: flex;
  flex-direction: row-reverse;
  background-color: rgb(250,250,250);
  max-height: 290px;
`;

export class PopupUI extends UI {
    constructor() {
        super({
            name: 'popup',
        });
    }

    load = () => {
        return new Promise(resolve => {
            $(document).ready(() => {
                chrome.runtime.sendMessage({
                    commend: 'setGAEvent',
                    action: 'click',
                    category: 'popup',
                });
                ReactDOM.render(
                    <Main innerRef={i => this.container = i}/>,
                    document.getElementById('root'),
                    () => resolve($(this.container)[0]),
                );
            });
        });
    };
}

