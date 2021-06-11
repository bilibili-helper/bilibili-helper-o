/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import styled, {createGlobalStyle} from 'styled-components';
import {UI} from 'Libs/UI';
import store from 'store';

const UIBuilder = (zoomFactor) => {
    const Wrapper = styled.div`
			${({showFeedMessage}) => showFeedMessage ? `min-width: 340px` : ''};

			.bilibili-helper-popup-main {
				display: flex;
				flex-direction: row-reverse;
				background-color: rgb(250, 250, 250);
			}

			.feed-message {
				position: absolute;
				top: 36px;
				right: 36px;
				height: 72px;
				display: flex;
				max-width: 360px;
				min-width: 230px;
				align-items: center;
				justify-content: center;
				line-height: 18px;
				border-radius: 2px;
				background-image: url('../statics/imgs/bg1.png');
				background-size: cover;
				box-shadow: 0 2px 3px #00000057;
				backdrop-filter: blur(30px);

				.link {
					color: purple;
					margin: 0 4px;
				}

				.avatar {
					width: 52px;
					border-radius: 50%;
					margin-right: 8px;
				}
			}

			.message-content {
				position: relative;
				top: -9px;
			}

			.close-btn {
				position: absolute;
				bottom: -22px;
				left: 0;
                width: fit-content;
				border: 1px solid;
				padding: 0px 4px;
				border-radius: 4px;
				zoom: 0.85;
				height: 15px;
				line-height: 15px;
				cursor: pointer;
			}
    `;

    const GlobalStyle = createGlobalStyle`
			* {
				font-size: ${zoomFactor > 1.45 ? 14 : 12}px !important;
			}

			body {
				margin: 0;
				padding: 0;
				font-family: -apple-system, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
			}
    `;

    const hideFeedMessageExpireDate = store.get('temp-hide-feed-message-expire-date') || 0;

    class Main extends React.Component {
        constructor(props) {
            super(props);
        }

        state = {
            showFeedMessage: false,
        };

        componentDidMount() {
            fetch('https://api.bilibili.com/x/space/acc/info?mid=50623')
            .then(res => res.json())
            .then(res => {
                if (res && res.code === 0) {
                    if (!res.data.is_followed) {
                        if (hideFeedMessageExpireDate === 0) { // 7天内不再提示
                            chrome.runtime.sendMessage({
                                command: 'setGAEvent',
                                action: 'click',
                                category: 'popup',
                                label: 'close feed message',
                            });
                            this.setState({showFeedMessage: true});
                        }
                    }
                }
            });
        }

        handleOnClickClose = () => {
            store.set('temp-hide-feed-message-expire-date', Date.now());
            this.setState({showFeedMessage: false});
        };

        render() {
            return (
                <Wrapper showFeedMessage={this.state.showFeedMessage}>
                    <GlobalStyle/>
                    <div className="bilibili-helper-popup-main"/>
                    {this.state.showFeedMessage && <div className="feed-message">
                        <a href="https://space.bilibili.com/50623/" target="_blank" rel="noreferrer noopener">
                            <img className="avatar" src="../statics/imgs/50623_avatar.jpg" alt="50632 avatar"/>
                        </a>
                        <div className="message-content">
                            关注开发者
                            <br/>关注2.0最新动态<a className="link" href="https://space.bilibili.com/50623/dynamic" target="_blank"
                                               rel="noopener noreferrer">点击前往</a>
                            <br/><span className="close-btn" onClick={this.handleOnClickClose}>关闭且不再显示</span>
                        </div>
                    </div>}
                </Wrapper>
            );
        }
    }

    return {Main};
};

export class PopupAnchorUI extends UI {
    constructor() {
        super({
            name: 'popup',
        });
    }

    load = () => {
        return new Promise(resolve => {
            chrome.tabs.query({currentWindow: true}, (tabs) => {
                const tabId = tabs[0].id;
                if (tabs && tabId) {
                    chrome.tabs.getZoom((zoomFactor) => {
                        if (zoomFactor > 1.45) {
                            document.body.style.zoom = (1 / zoomFactor) * 1.45;
                        }
                        const {Main} = UIBuilder(zoomFactor);
                        ReactDOM.render(
                            <Main/>,
                            document.getElementById('root'),
                            () => resolve(document.querySelector('.bilibili-helper-popup-main')),
                        );
                    });
                }
            });
        });
    };
}

