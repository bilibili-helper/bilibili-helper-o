/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import styled, {createGlobalStyle} from 'styled-components';
import {UI} from 'Libs/UI';

const UIBuilder = () => {
    const Main = styled.div.attrs({className: 'bilibili-helper-popup-main'})`
      display: flex;
      flex-direction: row-reverse;
      background-color: rgb(250,250,250);
    `;

    const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
      }
    `;
    return {Main, GlobalStyle};
}

export class PopupAnchorUI extends UI {
    constructor() {
        super({
            name: 'popup',
        });
    }

    load = () => {
        return new Promise(resolve => {
            const {Main, GlobalStyle} = UIBuilder();
            ReactDOM.render(
                <Main>
                    <GlobalStyle/>
                </Main>,
                document.getElementById('root'),
                () => resolve(document.querySelector('.bilibili-helper-popup-main')),
            );

        });
    };
}

