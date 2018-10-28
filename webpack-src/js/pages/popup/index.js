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
import {Button} from 'Components';
import {Body, DynamicBox} from './components';
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
const Main = styled.div`
  display: flex;
  background-color: rgb(250,250,250);
`;
const PopupBody = styled(Body)`
  position: relative;
  padding: 8px 10px 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 152px;
  font-size: 12px;
  position: absolute;
  bottom: 3px;
  color: ${color('google-grey-300')};
`;

const PopupButton = styled(Button)`
  display: block;
  width: 150px;
  height: 36px;
  border: 1px solid ${color('google-grey-100')};
  border-radius: 0;
  transition: border 0.3s;
  margin-bottom: 6px;
  position: relative;
  &:last-of-type {
    margin-bottom: 0;
  }
  button {
    text-indent: 6px;
    font-size: 11px;
    color: ${color('google-grey-600')};
    background-color: #fff;
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
    constructor(props) {
        super(props);
        this.state = {
            hasLogin: false,
            debug: false,
            newWatchPageLink: '',
        };
    }

    componentWillMount() {
        isLogin().then(res => this.setState({hasLogin: res}));
        chrome.browserAction.setBadgeText({text: ''});
        // 监听配置更新
        chrome.runtime.onMessage.addListener(((message, sender, sendResponse) => {
            if (message.commend === 'debugMode' && message.value !== undefined) {
                this.setState({debug: message.value});
            }
        }));
        // 获取调试模式
        chrome.runtime.sendMessage({
            commend: 'getOption',
            feature: 'Debug',
        }, (options) => {
            this.setState({debug: options.on});
        });
        chrome.runtime.sendMessage({
            commend: 'getOption',
            feature: 'NewWatchPage',
        }, (option) => {
            const type = option.value;
            const link = type === 'new' ? 'https://t.bilibili.com/' : 'https://www.bilibili.com/account/dynamic';
            this.setState({newWatchPageLink: link});
        });
    }

    render() {
        const {hasLogin, debug, newWatchPageLink} = this.state;
        return (
            <Main>
                <DynamicBox/>
                <PopupBody>
                    <PopupButton onClick={() => createTab(getLink('video'))}>{__('goBili')}</PopupButton>
                    <PopupButton onClick={() => createTab(getLink('live'))}>{__('goBiliLive')}</PopupButton>
                    {/* 登录后显示“我的关注”和“我的收藏” */}
                    {hasLogin && <React.Fragment>
                        <PopupButton onClick={() => createTab(newWatchPageLink)}>{__('goDynamic')}</PopupButton>
                        <PopupButton onClick={() => createTab(getLink('favourite'))}>{__('goFavourite')}</PopupButton>
                    </React.Fragment>}
                    <PopupButton
                        onClick={() => createTab(getLink('option'))}>{__('goOption')}</PopupButton>
                    <Title><span>Bilibili Helper</span><span>{debug ? 'Beta.' : ''}{version}</span></Title>
                </PopupBody>
            </Main>
        );
    }
}

$(document).ready(() => {
    ReactDOM.render(
        <PagePopup/>,
        document.getElementById('root'),
    );
});
