/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {Button} from 'Components/common/Button';
import {createTab, isLogin, getLink, version, __} from 'Utils';
import {UI} from 'Libs/UI';
import {theme} from 'Styles';

const {color} = theme;

const MenuView = styled.div.attrs({className: 'bilibili-helper-menu-view'})`
  display: flex;
  position: relative;
  padding: 8px 10px 20px;
  flex-direction: column;
  transition: all 0.3s;
  &.extend {
    margin-bottom: 0;
  }
  &::-webkit-scrollbar {
    //display: none;
    //visibility: hidden;
  }
`;
const MenuButton = styled(Button)`
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 152px;
  font-size: 12px;
  position: absolute;
  bottom: 3px;
  color: ${color('google-grey-300')};
`;

class Menu extends React.Component {
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
        const {hasLogin, newWatchPageLink, debug} = this.state;
        return (
            <MenuView>
                <MenuButton onClick={() => createTab(getLink('video'))}>{__('goBili')}</MenuButton>
                <MenuButton onClick={() => createTab(getLink('live'))}>{__('goBiliLive')}</MenuButton>
                {/* 登录后显示“我的关注”和“我的收藏” */}
                {hasLogin && <React.Fragment>
                    <MenuButton onClick={() => createTab(newWatchPageLink)}>{__('goDynamic')}</MenuButton>
                    <MenuButton onClick={() => createTab(getLink('favourite'))}>{__('goFavourite')}</MenuButton>
                </React.Fragment>}
                <MenuButton onClick={() => createTab(getLink('option'))}>{__('goOption')}</MenuButton>
                <Title><span>Bilibili Helper</span><span>{debug ? 'Beta.' : ''}{version}</span></Title>
            </MenuView>
        );
    }
}

export default class MenuUI extends UI {
    constructor() {
        super({
            name: 'menu',
            dependencies: ['popup'],
        });
    }

    load = (popupDOM) => {
        return new Promise(resolve => {
            const container = $('<div />').attr('class', 'bilibili-helper-menu-container');
            $(popupDOM).append(container);
            ReactDOM.render(<Menu innerRef={i => this.container = i}/>, container[0]);
            resolve($(this.container)[0]);
        });
    };
}