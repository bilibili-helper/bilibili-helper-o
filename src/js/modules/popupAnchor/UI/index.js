/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import styled, {createGlobalStyle} from 'styled-components';
import {UI} from 'Libs/UI';

export const Main = styled.div.attrs({className: 'bilibili-helper-popup-main'})`
  display: flex;
  flex-direction: row-reverse;
  background-color: rgb(250,250,250);
  max-height: 290px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export class PopupAnchorUI extends UI {
    constructor() {
        super({
            name: 'popup',
        });
    }

    load = () => {
        return new Promise(resolve => {
            ReactDOM.render(
                <Main>
                    <GlobalStyle/>
                </Main>,
                document.getElementById('root'),
                () => {
                    chrome.runtime.sendMessage({
                        commend: 'setGAEvent',
                        action: 'click',
                        category: 'popup',
                    });
                    resolve(document.querySelector('.bilibili-helper-popup-main'));
                },
            );

        });
    };
}

