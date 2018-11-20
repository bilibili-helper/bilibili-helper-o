/**
 * Author: DrowsyFlesh
 * Create: 2018/11/8
 * Description:
 */

import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import store from 'store';
import {Button} from 'Components/common/Button';
import {createTab, isLogin, getLink, version, __} from 'Utils';
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
    font-weight: normal;
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

const LinkerWrapper = styled.div`
  display: flex;
`;
const Linker = styled.input.attrs({className: 'bilibili-helper-menu-linker-input'})`
  display: block;
  width: 110px;
  height: 36px;
  margin-bottom: 6px;
  position: relative;
  border: 1px solid ${({error}) => error ? 'red' : 'whitesmoke'};
  box-sizing: border-box;
  font-size: 11px;
  font-weight: normal;
  background-color: rgb(255, 255, 255);
  transition: all 0.3s ease 0s;
  text-align: center;
  outline: none;
`;

const Enter = styled(MenuButton)`
  width: 40px;
  height: 34px;
  button {
    min-width: unset;
    text-indent: 0;
  }
`;

export class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin: false,
            debug: false,
            newWatchPageLink: '',
            menuOptions: {},
            linkerError: false,
            lastSearch: store.get('lastSearch') || '',
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
            commend: 'getSetting',
            feature: 'Debug',
        }, (options) => {
            this.setState({debug: options.on});
        });
        chrome.runtime.sendMessage({
            commend: 'getSetting',
            feature: 'Menu',
        }, (settings) => {
            const oldWatchPage = _.find(settings.options, {key: 'oldWatchPage'}).on;
            const link = !oldWatchPage ? 'https://t.bilibili.com/' : 'https://www.bilibili.com/account/dynamic';
            const menuOptions = {};
            _.each(settings.subPage.options, (option) => {
                menuOptions[option.key] = option.on;
            });

            this.setState({
                newWatchPageLink: link,
                menuOptions: menuOptions,
            });
        });
    }

    handleOnClick = (type, link) => {
        chrome.runtime.sendMessage({
            commend: 'setGAEvent',
            action: 'click',
            category: 'menu',
            label: type,
        });
        createTab(link);
    };

    link = () => {
        const value = $('.bilibili-helper-menu-linker-input').val();
        if (value) {
            const res = /(av|ss|s|md|u|cv|au+)?(\d+)/.exec(value);
            let url = '';
            let pass = true;
            if (res && res[1]) {
                switch (res[1]) {
                    case 'av':
                        url = 'https://www.bilibili.com/video/' + value;
                        break;
                    case 'ss':
                        url = 'https://www.bilibili.com/bangumi/play/' + value;
                        break;
                    case 's':
                        url = 'https://bangumi.bilibili.com/anime/' + value;
                        break;
                    case 'md':
                        url = 'https://www.bilibili.com/bangumi/media/' + value;
                        break;
                    case 'u':
                        if (res[2]) url = 'https://space.bilibili.com/' + res[2];
                        else pass = false;
                        break;
                    case 'cv':
                        url = 'https://www.bilibili.com/read/' + value;
                        break;
                    case 'au':
                        url = 'https://www.bilibili.com/audio/' + value;
                        break;
                }
            } else pass = false;
            if (pass) {
                this.setState({linkerError: false});
                this.lastSearch = value;
                this.setState({lastSearch: value}, () => {
                    store.set('lastSearch', value);
                });
                createTab(url);
            } else this.setState({linkerError: true});
        }
    };

    handleLinkerClick = () => {
        this.link();
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') this.link();
        else {
            const value = $('.bilibili-helper-menu-linker-input').val();
            const res = /(av|ss|s|md|u|cv|au+)?(\d+)/.test(value);
            this.setState({linkerError: !res});
        }
    };

    render() {
        const {hasLogin, newWatchPageLink, debug, menuOptions, linkerError, lastSearch} = this.state;
        const {video, live, dynamic, favourite, linker} = menuOptions;
        return (
            <MenuView>
                {video &&
                <MenuButton onClick={() => this.handleOnClick('video', getLink('video'))}>{__('goBili')}</MenuButton>}
                {live &&
                <MenuButton onClick={() => this.handleOnClick('live', getLink('live'))}>{__('goBiliLive')}</MenuButton>}
                {/* 登录后显示“我的关注”和“我的收藏” */}
                {hasLogin && <React.Fragment>
                    {dynamic && <MenuButton
                        onClick={() => this.handleOnClick('watch', newWatchPageLink)}>{__('goDynamic')}</MenuButton>}
                    {favourite && <MenuButton
                        onClick={() => this.handleOnClick('favourite', getLink('favourite'))}>{__('goFavourite')}</MenuButton>}
                </React.Fragment>}
                {linker && <LinkerWrapper>
                    <Linker error={linkerError} onKeyPress={this.handleKeyPress} placeholder="请输入各种ID"
                            defaultValue={lastSearch}/>
                    <Enter onClick={this.handleLinkerClick}>{__('goVideo')}</Enter>
                </LinkerWrapper>}
                <MenuButton
                    onClick={() => this.handleOnClick('config', getLink('config'))}>{__('goOption')}</MenuButton>
                <Title><span>Bilibili Helper</span><span>{debug === true ? 'Beta.' : ''}{version}</span></Title>
            </MenuView>
        );
    }
}