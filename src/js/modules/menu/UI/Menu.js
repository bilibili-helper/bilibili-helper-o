/**
 * Author: DrowsyFlesh
 * Create: 2018/11/8
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import store from 'store';
import {Button, Icon} from 'Components';
import {createTab, getLink, __} from 'Utils';
import {theme} from 'Styles';

export default () => {
    const {color} = theme;

    const MenuView = styled.div.attrs({className: 'bilibili-helper-menu-view'})`
      display: flex;
      position: relative;
      padding: 8px 10px;
      flex-direction: column;
      align-items: flex-end;
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
        color: ${color('google-grey-700')};
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

    const IconBtn = styled(MenuButton)`
      width: auto;
      button {
        display: block;
        padding: 0;
        min-width: 60px;
        text-indent: 0;
      }
      .bilibili-helper-iconfont {
        line-height: 22px;
      }
    `;

    //const Title = styled.div`
    //  display: flex;
    //  justify-content: space-between;
    //  width:${({showIcon}) => showIcon ? '60px' : '152px'};
    //  font-size: 12px;
    //  position: absolute;
    //  bottom: 3px;
    //  color: ${color('google-grey-300')};
    //`;

    const LinkerWrapper = styled.div`
      display: flex;
    `;
        const Linker = styled.input.attrs({className: 'bilibili-helper-menu-linker-input'})`
      display: block;
      width: ${({showIcon}) => showIcon ? '63px' : '110px'};
      height: 36px;
      margin-bottom: 6px;
      position: relative;
      border: 1px solid ${({error}) => error ? 'red !important' : 'whitesmoke'};
      box-sizing: border-box;
      font-size: 11px;
      font-weight: normal;
      transition: all 0.3s ease 0s;
      text-align: center;
      outline: none;
      color: ${color('google-grey-700')};
      &:focus {
        border-color: #009cd6;
        color: #000;
      }
    `;

    const Enter = styled(MenuButton)`
      width: 40px;
      height: 34px;
      button {
        min-width: unset;
        text-indent: 0;
      }
    `;

    return class Menu extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                debug: false,
                newWatchPageLink: '',
                menuOptions: {},
                linkerError: false,
                lastSearch: store.get('lastSearch') || '',
                permissionMap: {},
                options: [],
                version: null,
            };
            this.linkerRegExp = new RegExp(/^(av|ss|s|md|u|cv|au|ep)?(\d+)$/);
        }

        componentDidMount() {
            // 监听配置更新
            chrome.runtime.onMessage.addListener(((message) => {
                if (message.command === 'debugMode' && message.value !== undefined) {
                    this.setState({debug: message.value});
                } else if (message.command === 'permissionUpdate') {
                    const permissionMap = {...this.state.permissionMap};
                    permissionMap[message.permission] = {pass: message.value, msg: message.msg};
                    this.setState({permissionMap});
                }
                return true;
            }));
            // 获取调试模式
            chrome.runtime.sendMessage({
                command: 'getSetting',
                feature: 'debug',
            }, (options) => {
                this.setState({debug: options.on});
            });
            chrome.runtime.sendMessage({
                command: 'getSetting',
                feature: 'menu',
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
                    options: settings.options,
                });
            });

            chrome.runtime.sendMessage({
                command: 'getPermissionMap',
            }, (permissionMap) => {
                this.setState({permissionMap});
            });

            chrome.runtime.sendMessage({command: 'getFeatureStore', feature: 'versionManager'}, (featureStore) => {
                this.setState({version: featureStore.version});
            });
        }

        handleOnClick = (type, link) => {
            chrome.runtime.sendMessage({
                command: 'setGAEvent',
                action: 'click',
                category: 'menu',
                label: `menu ${type}`,
            });
            if (type === 'favourite') {
                chrome.cookies.get({
                    url: 'http://www.bilibili.com/',
                    name: 'DedeUserID',
                }, (cookie) => {
                    if (cookie && cookie.expirationDate > (new Date()).getTime() / 1000) {
                        createTab(`${link}${cookie.value}/favlist`);
                    }
                });
            } else createTab(link);

        };

        link = () => {
            const value = document.querySelector('.bilibili-helper-menu-linker-input').value;
            if (value) {
                const res = this.linkerRegExp.exec(String(value).toLowerCase().trim());
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
                            if (res[2]) url = 'https://bangumi.bilibili.com/anime/' + res[2];
                            else pass = false;
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
                        case 'ep':
                            url = 'https://www.bilibili.com/bangumi/play/' + value;
                    }
                } else if (res && !res[1] && res[2]) {
                    url = 'https://www.bilibili.com/video/av' + res[2];
                } else {
                    pass = false;
                }
                if (pass) {
                    this.setState({linkerError: false});
                    this.lastSearch = value;
                    this.setState({lastSearch: value}, () => {
                        store.set('lastSearch', value);
                        chrome.runtime.sendMessage({
                            command: 'setGAEvent',
                            action: 'click',
                            category: 'menu',
                            label: 'linker ' + (res[1] || 'av'),
                        });
                    });

                    createTab(url);
                } else this.setState({linkerError: true});
            }
        };

        checkLinkerValue = (value) => {
            const res = this.linkerRegExp.exec(String(value).toLowerCase().trim());
            if (res && res[1] && res[2]) return true;
            else if (res && !res[1] && res[2]) return true;
            else return false;
        };

        handleLinkerClick = () => {
            this.link();
        };

        handleKeyUp = (event) => {
            if (event.key === 'Enter') this.link();
            else {
                const value = String(event.target.value).toLowerCase().trim();
                store.set('lastSearch', value);
                const res = this.checkLinkerValue(value);
                this.setState({linkerError: !res && value !== ''});
            }
        };

        handleFocusIn = (e) => {
            e.target.select();
            this.handleKeyUp(e);
        };

        render() {
            const {newWatchPageLink, menuOptions, linkerError, lastSearch, permissionMap, options} = this.state;
            const {video, live, dynamic, favourite, linker} = menuOptions;
            const showIconOption = options ? _.find(options, (o) => o.key === 'showIcon') : {};
            const showIcon = showIconOption ? showIconOption.on : false;
            return (
                <MenuView>
                    {video && (showIcon ? <IconBtn
                        title={__('goBili')}
                        onClick={() => this.handleOnClick('video', getLink('video'))}>
                        <Icon size={20} iconfont="tv"/>
                    </IconBtn> : <MenuButton onClick={() => this.handleOnClick('video', getLink('video'))}>
                                   {__('goBili')}
                               </MenuButton>)}
                    {live && (showIcon ? <IconBtn
                        title={__('goBiliLive')}
                        onClick={() => this.handleOnClick('live', getLink('live'))}>
                        <Icon size={20} iconfont="live"/>
                    </IconBtn> : <MenuButton onClick={() => this.handleOnClick('live', getLink('live'))}>
                                  {__('goBiliLive')}
                              </MenuButton>)}
                    {/* 登录后显示“我的关注”和“我的收藏” */}
                    {permissionMap.login && permissionMap.login.pass ? <React.Fragment>
                        {dynamic && (showIcon ? <IconBtn
                            title={__('goDynamic')}
                            onClick={() => this.handleOnClick('watch', newWatchPageLink)}>
                            <Icon size={20} iconfont="like"/>
                        </IconBtn> : <MenuButton
                                         onClick={() => this.handleOnClick('watch', newWatchPageLink)}>{__('goDynamic')}</MenuButton>)}
                        {favourite && (showIcon ? <IconBtn
                            title={__('goFavourite')}
                            onClick={() => this.handleOnClick('favourite', getLink('favourite'))}>
                            <Icon size={20} iconfont="favourite"/>
                        </IconBtn> : <MenuButton
                                           onClick={() => this.handleOnClick('favourite', getLink('favourite'))}>{__('goFavourite')}</MenuButton>)}
                    </React.Fragment> : <MenuButton>{__('notLogin')}</MenuButton>}
                    {linker && <LinkerWrapper>
                        <Linker
                            error={linkerError}
                            onKeyUp={this.handleKeyUp}
                            onFocus={this.handleFocusIn}
                            onFocusOut={this.handleFocusIn}
                            placeholder={__('enterID')}
                            defaultValue={lastSearch}
                            showIcon={showIcon}
                        />
                        {!showIcon && <Enter onClick={this.handleLinkerClick}>{__('goVideo')}</Enter>}
                    </LinkerWrapper>}
                    {showIcon ? <IconBtn
                        title={__('goOption')}
                        onClick={() => this.handleOnClick('config', getLink('config'))}
                    ><Icon size={20} iconfont="option"/></IconBtn> : <MenuButton
                         onClick={() => this.handleOnClick('config', getLink('config'))}>{__('goOption')}</MenuButton>}
                </MenuView>
            );
        }
    }

}
