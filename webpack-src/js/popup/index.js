/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description:
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {__, isLogin, createTab} from 'Utils';
import {Button, Body} from 'Components';
import {theme} from 'Styles';

const {color} = theme;
// import {Provider} from 'mobx-react';
// import createBrowserHistory from 'history/createBrowserHistory';
// import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
// import {Router} from 'react-router';

// const browserHistory = createBrowserHistory();
// const routingStore = new RouterStore();
// const history = syncHistoryWithStore(browserHistory, routingStore);
// const state = window.__INITIAL_STATE__;
import 'Styles/scss/popup.scss';

const PopupBody = styled(Body)`
  padding: 8px 10px;
  // background-color: ${color('google-grey-100')};
`;

const PopupButton = styled(Button)`
  display: block;
  width: 150px;
  height: 30px;
  border: 1px solid ${color('google-grey-100')};
  border-radius: 0;
  transition: all 0.3s;
  margin-bottom: 6px;
  &:last-of-type {
    //border-bottom: none;
    margin-bottom: 0;
  }
  button {
    text-align: left;
    text-indent: 6px;
    font-size: 12px;
    color: ${color('google-grey-700')};
    //background-color: white;
    background-color: ${color('paper-grey-50')};
    transition: all 0.3s;
    &[disabled] {
      opacity: 0.3;
    }
  }
  .ripple-item {
    //background-color: #00a9e8;
  }
  &:hover {
    border-color: #009cd6;
    button:not([disabled]) {
      background-color: #00a9e8;
      color: white;
    }
  }
`;

class PagePopup extends React.Component {
    constructor() {
        super();
        this.state = {
            hasLogin: false,
        };
        this.optionPageUrl = chrome.extension.getURL('options.html');
    }

    componentWillMount() {
        const that = this;
        isLogin().then(res => that.setState({hasLogin: res}));
    }

    render() {
        const {hasLogin} = this.state;
        return (
            <PopupBody>
                <PopupButton onClick={() => createTab('https://www.bilibili.com/')}>{__('goBili')}</PopupButton>
                <PopupButton onClick={() => createTab('https://live.bilibili.com/')}>{__('goBiliLive')}</PopupButton>
                {hasLogin && <React.Fragment>
                    {/* 登录后显示“我的关注”和“我的收藏” */}
                    <PopupButton>{__('goDynamic')}</PopupButton>
                    <PopupButton>{__('goFavorite')}</PopupButton>
                </React.Fragment>}
                <PopupButton onClick={() => createTab(this.optionPageUrl)}>{__('goOption')}</PopupButton>
            </PopupBody>
        );
    }
}

$(document).ready(() => {
    ReactDOM.render(
        <PagePopup/>,
        document.getElementById('root'),
    );
});
