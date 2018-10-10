/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 扩展菜单脚本
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {__, isLogin, createTab, getLink, version} from 'Utils';
import {Button, Icon} from 'Components';
import {Body} from './components';
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
// import 'Styles/scss/popup.scss';

const PopupBody = styled(Body)`
  padding: 8px 44px 8px 10px;
  min-height: 164px;
`;

const LOGO = styled.div`
  display: flex;
  align-items: center;
  transform: rotateZ(90deg);
  position: absolute;
  right: -36px;
  top: 48px;
  font-size: 12px;
  color: ${color('google-grey-300')};
  .button-wrapper {
    left: 40px;
  }
  .icon {
    color: ${color('google-grey-300')};
    cursor: pointer;
  } 
`;

const PopupButton = styled(Button)`
  display: block;
  width: 150px;
  height: 36px;
  border: 1px solid ${color('google-grey-100')};
  border-radius: 0;
  transition: border 0.3s;
  margin-bottom: 6px;
  &:last-of-type {
    margin-bottom: 0;
  }
  button {
    text-align: left;
    text-indent: 6px;
    font-size: 12px;
    color: ${color('google-grey-700')};
    background-color: ${color('paper-grey-50')};
    transition: all 0.3s;
    &[disabled] {
      opacity: 0.3;
    }
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
    }

    componentWillMount() {
        isLogin().then(res => this.setState({hasLogin: res}));
        this.logoText = <div>{version}<br/>BILIBILI HELPER</div>
    }

    render() {
        const {hasLogin} = this.state;
        return (
            <PopupBody>
                <LOGO>
                    {this.logoText}
                    <Button icon={'options'}  onClick={() => createTab(getLink('option'))}/>
                </LOGO>
                <PopupButton onClick={() => createTab(getLink('video'))}>{__('goBili')}</PopupButton>
                <PopupButton onClick={() => createTab(getLink('live'))}>{__('goBiliLive')}</PopupButton>
                {hasLogin && <React.Fragment> {/* 登录后显示“我的关注”和“我的收藏” */}
                    <PopupButton onClick={() => createTab(getLink('dynamic'))}>{__('goDynamic')}</PopupButton>
                    <PopupButton onClick={() => createTab(getLink('favourite'))}>{__('goFavourite')}</PopupButton>
                </React.Fragment>}
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
