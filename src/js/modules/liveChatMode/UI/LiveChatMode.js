/**
 * Author: DrowsyFlesh
 * Create: 2018/12/14
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import styled, {css} from 'styled-components';
import {theme} from 'Styles';
import store from 'store';
import {__} from 'Utils/functions';
export default () => {
    const {color} = theme;

    const Btn = styled.span`
      display: inline-block;
      position: absolute;
      right: 130px;
      top: 50%;
      height: 20px;
      padding: 0 5px;
      line-height: 20px;
      vertical-align: middle;
      transform: translateY(-50%);
      background-color: white;
      border-radius: 4px;
      border: 1px solid ${color('bilibili-blue')};
      color: ${color('bilibili-blue')};
      cursor: pointer;
      transition: all 0.3s;
      &.on, &:hover {
        background-color: ${color('bilibili-blue')};
        color: white;
      }
    `;

    const stylesheet = css`
      .player-full-win.hide-aside-area .aside-area {
        display: block;
      }
      .hide-aside-area .live-room-app .app-content .app-body .player-and-aside-area .aside-area {
        background-color: transparent;
        pointer-events: none;
        z-index: 1001!important;
        pointer-events: auto;
      }
      .hide-aside-area .live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-history-panel {
        position: fixed;
        left: 0;
        bottom: 80px;
        display: inline-block;
        width: auto;
        height: calc(50% - 20px);
        pointer-events: auto;
        background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.8) 15%, transparent 75%);
        background-color: unset;
      }
      .hide-aside-area .chat-history-panel:hover #chat-history-list {
        outline: 1px solid ${color('bilibili-blue')};
      }
      .hide-aside-area .chat-history-panel #chat-history-list::-webkit-scrollbar {
        display: none;
      }
      .hide-aside-area .live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-history-panel::-webkit-scrollbar,
      .hide-aside-area .live-room-app .app-content .app-body .player-and-aside-area .aside-area .rank-list-section,
      .hide-aside-area #penury-gift-msg,
      .hide-aside-area #chat-control-panel-vm .bottom-actions,
      .hide-aside-area .chat-history-panel #chat-history-list .chat-item.danmaku-item:before,
      .hide-aside-area .chat-history-panel #chat-history-list .chat-item.danmaku-item.guard-danmaku:after {
        display: none;
      }
      .hide-aside-area .chat-history-panel #chat-history-list .chat-item.danmaku-item {
        margin: 0;
        padding: 0 5px;
      }
      .hide-aside-area .live-room-app .app-content .app-body .chat-history-panel .chat-item,
      .hide-aside-area .control-panel-icon-row {
        pointer-events: none;
      }
      .hide-aside-area .live-room-app .app-content .app-body .chat-history-panel .chat-item {
        margin-left: 6px;
      }
      .hide-aside-area .live-room-app .app-content .app-body .chat-history-panel .chat-item .user-name {
        text-shadow: 0px 1px 1px #000;
      }
      .hide-aside-area .live-room-app .app-content .app-body .chat-history-panel .chat-item .danmaku-content {
        color: #eee;
        text-shadow: 0px 1px 1px #000;
      }
      .hide-aside-area .live-room-app .app-content .app-body .chat-history-panel .chat-item span,
      .hide-aside-area #chat-popup-area-vm,
      .hide-aside-area .chat-small-icon-box,
      .hide-aside-area .control-panel-icon-row > *,
      .hide-aside-area .danmaku-menu,
      .hide-aside-area .z-chat-control-panel-dialog.dialog-ctnr {
        pointer-events: auto;
      }
      .hide-aside-area .z-chat-control-panel-dialog.dialog-ctnr .yan-ctnr {
        width: 300px;
      }
      .hide-aside-area #chat-control-panel-vm{
        position: fixed;
        left: 0;
        bottom: 0;
        margin-bottom: 3px;
        width: 100%;
        height: auto;
        background-color: unset;
        pointer-events: none;
        z-index: 1;
      }
      .hide-aside-area #chat-control-panel-vm .control-panel-ctnr {
        height: auto;
        padding: 0 3px;
        pointer-events: none;
      }
      .hide-aside-area #chat-control-panel-vm .chat-input,
      .hide-aside-area #chat-control-panel-vm textarea {
        height: 36px;
        background-color: #1b1b1b;
        border-color: #2b2b2b;
        color: #eee;
        pointer-events: auto;
      }
      .hide-aside-area #chat-control-panel-vm .input-limit-hint {
        bottom: 10px;
        right: 12px;
      }
      .hide-aside-area:not(.fullscreen-fix) .bilibili-live-player-video video {
        height: calc(100% - 40px);
      }
      .hide-aside-area:not(.fullscreen-fix) .bilibili-live-player-video-controller {
        bottom: 38px;
      }
      .hide-aside-area .bilibili-live-player-video-controller .bilibili-live-player-video-controller-container {
        padding: 0 130px 0 80px;
      }
      
      .hide-aside-area .live-chat-mode-height-bar {
        position: absolute;
        top: 0;
        width: calc(100% - 14px);
        height: 8px;
        z-index: 1;
        cursor: ns-resize;
      }
      .hide-aside-area .live-chat-mode-move-bar {
        display: block;
        position: absolute;
        top: -1px;
        right: -1px;
        width: 14px;
        height: 14px;
        z-index: 2;
        color: transparent;
        font-size: 14px;
        cursor: move;
      }
      .hide-aside-area .chat-history-panel:hover .live-chat-mode-height-bar,
      .hide-aside-area .chat-history-panel:hover .live-chat-mode-move-bar{
        background-color: ${color('bilibili-blue')};
        user-select: none;
      }
      
      .hide-aside-area .chat-history-panel:hover .live-chat-mode-height-bar::after {
        content: '';
        display: block;
        width: 15px;
        height: 1px;
        background-color: #a8dbf0;
        position: absolute;
        top: 1px;
        left: 50%;
        transform: translate(-50%);
        box-shadow: 0px 2px 0px #a8dbf0, 0px 4px 0px #a8dbf0;
      }
      .hide-aside-area .chat-item.danmaku-item {
        font-size: 16px;
        height: 28px;
      }
    `;

    return class LiveChatMode extends React.Component {
        constructor(props) {
            super(props);
            this.roomId = location.pathname.substr(1);
            const locationOption = store.get('bilibili-helper-live-chat-mode') || {};
            this.state = {
                on: locationOption[this.roomId] || false,
                currentState: 0, // 0: default, 1: webfullscreen, 2: full
            };
            this.addListener();
            this.heightMouseDown = false;
            this.moveMouseDown = false;
            this.originOffectLeft = 0;
            this.originOffectBottom = 0;
            this.originX = 0;
            this.originY = 0;
            this.originHeight = 0;
        }

        componentDidMount() {
            this.bodyDOM = document.querySelector('body');
            this.initDraggableBar();
        }

        initDraggableBar = () => {
            const that = this;
            const locationOption = store.get('bilibili-helper-live-chat-mode') || {};
            const appContent = document.querySelector('.app-content');
            const videoArea = document.querySelector('.bilibili-live-player-video-area');
            const panel = document.querySelector('.chat-history-panel');
            if (!appContent || !videoArea || !panel) return;
            const heightBar = document.createElement('div');
            const moveBar = document.createElement('div');
            heightBar.setAttribute('class', 'live-chat-mode-height-bar');
            moveBar.setAttribute('class', 'live-chat-mode-move-bar');

            if (_.isObject(locationOption[this.roomId])) {
                that.originHeight = locationOption[this.roomId].height;
                that.originOffectLeft = locationOption[this.roomId].offsetLeft;
                that.originOffectBottom = locationOption[this.roomId].offsetBottom;
            }

            heightBar.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                if (e.button !== 0 && e.buttons !== 1) return; // 确定仅当按下左键时
                that.heightMouseDown = true;
                that.originHeight = panel.clientHeight;
                that.originY = e.clientY;
            });
            moveBar.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                if (e.button !== 0 && e.buttons !== 1) return; // 确定仅当按下左键时
                that.moveMouseDown = true;
                that.originOffectLeft = panel.offsetLeft;
                that.originOffectBottom = videoArea.offsetHeight - panel.offsetTop - panel.offsetHeight;
                that.originX = e.clientX;
                that.originY = e.clientY;
            });
            appContent.addEventListener('mousemove', _.throttle(function(e) {
                if (!that.state.on) return;
                if (that.heightMouseDown) {
                    const deltaHeight = that.originY - e.clientY;
                    const currentHeight = that.originHeight + deltaHeight;
                    if (currentHeight > 25 && currentHeight < videoArea.clientHeight && currentHeight < videoArea.offsetHeight) {
                        panel.style.height = `${currentHeight}px`;
                    }
                } else if (that.moveMouseDown) {
                    const deltaX = that.originX - e.clientX;
                    const deltaY = that.originY - e.clientY;
                    let currentLeft = that.originOffectLeft - deltaX;
                    let currentBottom = that.originOffectBottom + deltaY;
                    if (currentLeft < 0) currentLeft = 0;
                    if (currentBottom < 48) currentBottom = 48;
                    panel.style.left = `${currentLeft}px`;
                    panel.style.bottom = `${currentBottom}px`;
                }
            }, 25), true);
            appContent.addEventListener('mouseup', function() {
                if ((that.heightMouseDown || that.moveMouseDown) && that.state.on) {
                    that.originHeight = panel.clientHeight;
                    that.originOffectLeft = panel.offsetLeft;
                    that.originOffectBottom = videoArea.offsetHeight - panel.offsetTop - panel.offsetHeight;
                    locationOption[that.roomId] = {
                        height: that.originHeight,
                        offsetLeft: that.originOffectLeft,
                        offsetBottom: that.originOffectBottom,
                    };
                    store.set('bilibili-helper-live-chat-mode', locationOption);
                    that.heightMouseDown = false;
                    that.moveMouseDown = false;
                }
            }, true);
            panel.appendChild(heightBar);
            panel.appendChild(moveBar);
        };

        addListener = () => {
            if (!this.bodyDOM) this.bodyDOM = document.querySelector('body');
            const classList = this.bodyDOM.classList;
            const panel = document.querySelector('.chat-history-panel');
            const hideBtn = document.querySelector('.bilibili-live-player-video-controller-hide-danmaku-btn button');
            new MutationObserver(() => {
                const {on, currentState} = this.state;
                if (on && classList.contains('player-full-win') && currentState !== 1) { // 当前是网页全屏 且之前并不是该状态
                    if (!classList.contains('hide-aside-area')) {
                        document.querySelector('.aside-area-toggle-btn button').click();
                    }
                    if (hideBtn.getAttribute('data-title') === '隐藏弹幕') hideBtn.click();
                    this.setState({currentState: 1}, () => {
                        if (panel && this.originHeight) panel.style.height = `${this.originHeight}px`;
                        if (panel && this.originOffectLeft) panel.style.left = `${this.originOffectLeft}px`;
                        if (panel && this.originOffectBottom) panel.style.bottom = `${this.originOffectBottom}px`;
                    });
                } else if (classList.contains('fullscreen-fix') || !classList.contains('player-full-win')) {
                    this.setState({currentState: 0}, () => {
                        if (panel) panel.style.height = '';
                        if (hideBtn.getAttribute('data-title') === '显示弹幕') hideBtn.click();
                    });
                }
                //if (classList.contains('fullscreen-fix')) this.setState({currentState: 2});
            }).observe(this.bodyDOM, {
                attributes: true,
                attributeFilter: ['class'],
                attributeOldValue: true,
            });
        };

        handleOnClick = () => {
            const newValue = !this.state.on;
            this.setState({on: newValue}, () => {
                const locationOption = store.get('bilibili-helper-live-chat-mode') || {};
                if (newValue) {
                    locationOption[this.roomId] = true;
                } else {
                    delete locationOption[this.roomId];
                }
                chrome.runtime.sendMessage({
                    command: 'setGAEvent',
                    action: 'click',
                    category: 'liveChatMode',
                    label: `liveChatMode ${newValue}`,
                });
                store.set('bilibili-helper-live-chat-mode', locationOption);
            });
        };

        render() {
            const {on, currentState} = this.state;
            return (
                <React.Fragment>
                    <Btn className={on ? 'on' : ''} onClick={this.handleOnClick}>
                        {on ? __('liveChatMode_UI_buttonOFF') : __('liveChatMode_UI_buttonON')}
                    </Btn>
                    {currentState !== 0 && on && <style>{stylesheet}</style>}
                </React.Fragment>
            );
        }
    }
}
