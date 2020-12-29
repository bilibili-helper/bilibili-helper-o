/**
 * Author: DrowsyFlesh
 * Create: 2018/12/14
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {theme} from 'Styles';
import store from 'store';
import {__} from 'Utils/functions';
import {Button} from 'Components';

export default () => {
    const {color} = theme;

    const Btn = styled(Button)`
			width: max-content;
			height: 22px;
			border-radius: 4px;

			button {
				display: inline-block;
				padding: 0 5px;
				font-weight: normal;
				border-radius: 4px;
				border: 1px solid ${color('bilibili-blue')};
				background-color: white;
				color: ${color('bilibili-blue')};
				cursor: pointer;
				transition: background-color 0.3s, color 0.3s;
			}

			&.on button, & button:hover {
				background-color: ${color('bilibili-blue')};
				color: white;
			}

			.chat-area-btn {
				padding-left: 4px;
				border-left: 1px solid;
				margin-left: 4px;
			}
    `;

    const Stylesheet = createGlobalStyle`
			.fullscreen-fix .aside-area,
			.player-full-win.hide-aside-area .aside-area {
				display: block;
			}

			.hide-aside-area, .fullscreen-fix {
				.live-room-app {
					.app-content {
						.app-body {
							.player-and-aside-area {
								.aside-area {
									display: block !important;
									background-color: transparent;
									z-index: 1001 !important;
									pointer-events: auto;

									.chat-history-panel {
										position: fixed;
										left: 0;
										bottom: 180px;
										display: inline-block;
										width: auto;
										height: calc(50% - 20px);
										border-radius: 4px;
										pointer-events: auto;
										background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.8) 15%, transparent 75%);
										background-color: unset;
										overflow: hidden;

										.chat-history-list {
											margin-right: 8px;
											padding: 0;
											overflow: -moz-scrollbars-none;
											scrollbar-width: none;

											&::-webkit-scrollbar {
												display: none;
											}

											.chat-item {
												margin-left: 6px;

												&.danmaku-item {
													margin: 0;
													height: auto;
													font-size: 16px;
												}
											}
										}

										.danmaku-buffer-prompt {
											bottom: 0;
											width: 100%;
											margin-left: -10px;
											border-radius: 4px;
										}

										#chat-history-list {
											border-bottom: 1px solid transparent;
											border-left: 1px solid transparent;
											border-radius: 0 0 0 4px;
										}

										&:hover #chat-history-list {
											border-bottom-color: ${color('bilibili-blue')};
											border-left-color: ${color('bilibili-blue')};
										}
									}

									#chat-control-panel-vm {
										position: fixed;
										left: 0;
										bottom: 0;
										margin-bottom: 3px;
										width: 100%;
										height: auto;
										background-color: unset;
										pointer-events: none !important;
										z-index: 10;

										.control-panel-ctnr {
											height: auto;
											padding: 0 3px;
											background: none;

											.chat-input-ctnr {
												border: none;
												background-color: transparent;

												.medal-section {
													height: 36px;
												}

												.chat-input, textarea {
													height: 36px;
													background-color: #1b1b1b;
													border-color: #2b2b2b;
													color: #eee;
													pointer-events: auto;
												}

												.input-limit-hint {
													bottom: 10px;
													right: 12px;
												}
											}
										}

										.control-panel-icon-row {
											&.superChat {
												display: flex !important;
												height: 24px;

												.icon-right-part {
													float: right !important;
													margin-left: auto;
													margin-right: 13px;
													order: 0;
												}

												.icon-right-end-part {
													float: right !important;
													order: 1;
												}
											}
										}
									}
								}
							}
						}
					}
				}

				//#bilibiliHelper2HandleButtonWrapper,
				#chat-control-panel-vm .chat-input-ctnr .medal-section,
				.live-room-app .app-content .app-body .player-and-aside-area .aside-area .chat-history-panel::-webkit-scrollbar,
				.live-room-app .app-content .app-body .player-and-aside-area .aside-area .rank-list-section,
				#penury-gift-msg,
				#chat-control-panel-vm .bottom-actions,
				.chat-history-panel #chat-history-list .chat-item.danmaku-item:before,
				.chat-history-panel #chat-history-list .chat-item.danmaku-item.guard-danmaku:after {
					display: none;
				}

				.live-room-app .app-content .app-body .chat-history-panel .chat-item,
				#chat-control-panel-vm .control-panel-ctnr,
				.control-panel-icon-row {
					pointer-events: none;
				}

				//#background-manage-vm,
				//#ema-wishing-vm,
				//#enter-failure,
				//#gold-store-vm,
				//#guard-store-vm,
				//#head-info-vm.head-info-section,
				//#link-footer-vm,
				//#link-navbar-vm,
				//#player-effect-vm,
				//#room-background-vm,
				//#sidebar-vm,
				//body.fullscreen-fix section#sections-vm {
				//  display: block !important
				//}

				.live-room-app .app-content .app-body .chat-history-panel .chat-item span,
				#chat-popup-area-vm,
				.chat-small-icon-box,
				.control-panel-icon-row > *,
				.danmaku-menu,
				.dialog-ctnr {
					pointer-events: auto;
				}

				.live-room-app .app-content .app-body .chat-history-panel .chat-item .user-name {
					text-shadow: 0px 1px 1px #000;
				}

				.live-room-app .app-content .app-body .chat-history-panel .chat-item .danmaku-content {
					color: #eee;
					text-shadow: 0px 1px 1px #000;
				}

				.dialog-ctnr {
					width: fit-content !important;

					.yan-ctnr {
						width: 300px;
					}

					&.common-popup-wrap {
						bottom: 80px !important;
						right: 12px !important;
						left: auto !important;
						width: fit-content;
					}

					.superchat-content {
						max-width: 300px;
					}
				}

				.bilibili-live-player-video video {
					height: calc(100% - 40px);
				}

				.bilibili-live-player-video-controller {
					bottom: 38px;

					.control-area {
						padding-left: 140px !important;
						padding-right: 40px !important;
					}
				}

				.bilibili-live-player-video-controller .bilibili-live-player-video-controller-container {
					padding: 0 130px 0 80px;
				}

				.bilibili-live-player-video-controller .bilibili-live-player-video-controller-container .bilibili-live-player-video-controller-right {
					margin-right: 22px;
				}

				.live-chat-mode-width-bar {
					position: absolute;
					top: 14px;
					right: 0;
					width: 8px;
					height: calc(100% - 14px);
					z-index: 1;
					cursor: ew-resize;
				}

				.live-chat-mode-height-bar {
					position: absolute;
					top: 0;
					width: calc(100% - 14px);
					height: 9px;
					z-index: 1;
					cursor: ns-resize;
				}

				.live-chat-mode-move-bar {
					display: block;
					position: absolute;
					top: -1px;
					right: -1px;
					width: 14px;
					height: 14px;
					border-radius: 0 4px 0 6px;
					font-size: 14px;
					color: transparent;
					z-index: 2;
					cursor: move;
				}

				.chat-history-panel:hover .live-chat-mode-width-bar,
				.chat-history-panel:hover .live-chat-mode-height-bar,
				.chat-history-panel:hover .live-chat-mode-move-bar {
					background-color: ${color('bilibili-blue')};
					user-select: none;
				}

				#aside-area-vm {
                  pointer-events: none !important;
                  #pay-note-panel-vm {
                    .pay-note-panel {
                      background-color: transparent !important;
                    }
                  }
				}

				#aside-area-vm > * {
					pointer-events: initial;
				}

				.chat-history-panel:hover {
					.live-chat-mode-width-bar::after {
						content: '';
						display: block;
						width: 1px;
						height: 14px;
						background-color: #a8dbf0;
						position: absolute;
						left: 2px;
						top: calc(50% - 7.5px);
						transform: translate(-50%);
						box-shadow: 2px 0px 0px #a8dbf0, 4px 0px 0px #a8dbf0;
					}

					.live-chat-mode-height-bar::after {
						content: '';
						display: block;
						width: 14px;
						height: 1px;
						background-color: #a8dbf0;
						position: absolute;
						top: 2px;
						left: calc(50% - 7.5px);
						transform: translate(-50%);
						box-shadow: 0px 2px 0px #a8dbf0, 0px 4px 0px #a8dbf0;
					}
				}
			}
    `;
    const locationOption = store.get('bilibili-helper-live-chat-mode') || {};

    return class LiveChatMode extends React.Component {
        constructor(props) {
            super(props);
            this.roomId = location.pathname.substr(1);
            this.state = {
                on: locationOption[this.roomId] ? !!locationOption[this.roomId] : false,
                currentState: 0, // 0: default, 1: webfullscreen, 2: full
            };
            this.addListener();
            this.widthMouseDown = false;
            this.heightMouseDown = false;
            this.moveMouseDown = false;
            this.originOffectLeft = 0;
            this.originOffectBottom = 0;
            this.originX = 0;
            this.originY = 0;
            this.originWidth = 0;
            this.originHeight = 0;
        }

        componentDidMount() {
            this.bodyDOM = document.querySelector('body');
            this.initDraggableBar();
        }

        initDraggableBar = () => {
            const that = this;
            const appContent = document.querySelector('.app-content');
            const videoArea = document.querySelector('.bilibili-live-player-video-area');
            const panel = document.querySelector('.chat-history-panel');
            if (!appContent || !videoArea || !panel) {
                return;
            }
            const heightBar = document.createElement('div');
            const widthBar = document.createElement('div');
            const moveBar = document.createElement('div');
            heightBar.setAttribute('class', 'live-chat-mode-height-bar');
            widthBar.setAttribute('class', 'live-chat-mode-width-bar');
            moveBar.setAttribute('class', 'live-chat-mode-move-bar');

            if (_.isObject(locationOption[this.roomId])) {
                that.originWidth = locationOption[this.roomId].width;
                that.originHeight = locationOption[this.roomId].height;
                that.originOffectLeft = locationOption[this.roomId].offsetLeft;
                that.originOffectBottom = locationOption[this.roomId].offsetBottom;
            }

            widthBar.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                if (e.button !== 0 && e.buttons !== 1) {
                    return;
                } // 确定仅当按下左键时
                that.widthMouseDown = true;
                that.originWidth = panel.clientWidth;
                that.originX = e.clientX;
            });

            heightBar.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                if (e.button !== 0 && e.buttons !== 1) {
                    return;
                } // 确定仅当按下左键时
                that.heightMouseDown = true;
                that.originHeight = panel.clientHeight;
                that.originY = e.clientY;
            });

            moveBar.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                if (e.button !== 0 && e.buttons !== 1) {
                    return;
                } // 确定仅当按下左键时
                that.moveMouseDown = true;
                that.originOffectLeft = panel.offsetLeft;
                that.originOffectBottom = videoArea.offsetHeight - panel.offsetTop - panel.offsetHeight;
                that.originX = e.clientX;
                that.originY = e.clientY;
            });
            appContent.addEventListener('mousemove', _.throttle(function(e) {
                if (!that.state.on) {
                    return;
                }
                if (that.widthMouseDown) {
                    const deltaWidth = that.originX - e.clientX;
                    const currentWidth = that.originWidth - deltaWidth;
                    if (currentWidth > 25 && currentWidth < videoArea.clientWidth && currentWidth < videoArea.offsetWidth) {
                        panel.style.width = `${currentWidth}px`;
                    }
                } else if (that.heightMouseDown) {
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
                    if (currentLeft < 0) {
                        currentLeft = 0;
                    }
                    if (currentBottom < 48) {
                        currentBottom = 48;
                    }
                    panel.style.left = `${currentLeft}px`;
                    panel.style.bottom = `${currentBottom}px`;
                }
            }, 25), true);
            appContent.addEventListener('mouseup', () => {
                if ((that.widthMouseDown || that.heightMouseDown || that.moveMouseDown) && that.state.on) {
                    locationOption[that.roomId] = {};
                    locationOption[that.roomId].width = that.originWidth = panel.clientWidth;
                    locationOption[that.roomId].height = that.originHeight = panel.clientHeight;
                    locationOption[that.roomId].offsetLeft = that.originOffectLeft = panel.offsetLeft;
                    locationOption[that.roomId].offsetBottom = that.originOffectBottom = videoArea.offsetHeight - panel.offsetTop - panel.offsetHeight;

                    store.set('bilibili-helper-live-chat-mode', locationOption);
                    that.widthMouseDown = false;
                    that.heightMouseDown = false;
                    that.moveMouseDown = false;
                }
            }, true);
            panel.appendChild(widthBar);
            panel.appendChild(heightBar);
            panel.appendChild(moveBar);
        };

        addListener = () => {
            if (!this.bodyDOM) {
                this.bodyDOM = document.querySelector('body');
            }
            new MutationObserver(() => {
                this.dealWith();
            }).observe(this.bodyDOM, {
                attributes: true,
                attributeFilter: ['class'],
                attributeOldValue: true,
            });
        };

        dealWith = () => {
            const panel = document.querySelector('.chat-history-panel');
            const classList = this.bodyDOM.classList;
            const {on, currentState} = this.state;
            if (on && classList.contains('player-full-win') && currentState !== 1) { // 当前是网页全屏 且之前并不是该状态
                if (!classList.contains('hide-aside-area')) {
                    document.querySelector('.aside-area-toggle-btn button').click();
                } else {
                    this.setState({currentState: 1}, () => {
                        if (panel) {
                            if (this.originWidth) {
                                panel.style.width = `${this.originWidth}px`;
                            } else {
                                panel.style.width = `30%`;
                            }
                        }
                        if (panel && this.originHeight) {
                            panel.style.height = `${this.originHeight}px`;
                        }
                        if (panel && this.originOffectLeft) {
                            panel.style.left = `${this.originOffectLeft}px`;
                        }
                        if (panel && this.originOffectBottom) {
                            panel.style.bottom = `${this.originOffectBottom}px`;
                        }
                    });
                }
            } else if (on && classList.contains('fullscreen-fix')) {
                this.setState({currentState: 0}, () => {
                    panel.style.width = '';
                    panel.style.height = '';
                });
            } else {
                this.setState({currentState: 0}, () => {
                    if (panel) {
                        panel.style.width = '';
                        panel.style.height = '';
                    }
                });
            }
        };

        handleOnClick = () => {
            const newValue = !this.state.on;

            this.setState({on: newValue}, () => {
                const locationOption = store.get('bilibili-helper-live-chat-mode') || {};
                this.dealWith();
                if (newValue) {
                    locationOption[this.roomId] = true;
                } else {
                    delete locationOption[this.roomId];
                }
                store.set('bilibili-helper-live-chat-mode', locationOption);
                chrome.runtime.sendMessage({
                    command: 'setGAEvent',
                    action: 'click',
                    category: 'liveChatMode',
                    label: `liveChatMode ${newValue}`,
                });
            });
        };

        render() {
            const {on, currentState} = this.state;
            return (
                <React.Fragment>
                    {on && <Btn className="on">
                        <span onClick={this.handleOnClick}>{__('liveChatMode_UI_buttonOFF')}</span>
                    </Btn>}
                    {!on && <Btn onClick={this.handleOnClick}>{__('liveChatMode_UI_buttonON')}</Btn>}
                    {currentState !== 0 && on && <Stylesheet/>}
                </React.Fragment>
            );
        }
    };
}
