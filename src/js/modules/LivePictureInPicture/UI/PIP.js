/**
 * Author: DrowsyFlesh
 * Create: 2019-05-14
 * Description:
 */
import {Button} from 'Components/common/Button';
import React from 'react';
import styled from 'styled-components';
import {theme} from 'Styles/theme';
import {__} from 'Utils';
const {color} = theme;

export default () => {
    const PipButton = styled(Button).attrs({
        class: `bilibili-helper-pip-btn`,
    })`
      position: absolute;
      right: 230px;
      top: 1px;
      height: 22px;
      line-height: 21px;
      border-radius: 4px;
      button {
        display: inline-block;
        padding: 0 5px;
        vertical-align: middle;
        font-weight: normal;
        border-radius: 4px;
        border: 1px solid ${color('bilibili-blue')};
        background-color: white;
        color: ${color('bilibili-blue')};
        cursor: pointer;
        transition: all 0.3s;
        
      }
      &.on button, & button:hover {
        background-color: ${color('bilibili-blue')};
        color: white;
      }
    `;

    return class PIP extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                inPIP: false,
            };
            this.video = null;
            this.isEnd = false;
        }

        componentDidMount() {
            const that = this;
            this.video = document.querySelector('.bilibili-live-player-video video');
            this.addListener(this.video);
            document.querySelector('.bilibili-live-player-video').addEventListener('DOMNodeInserted', function(e) {
                if (e.target.localName === 'video' && that.video !== e.target) {
                    that.video = e.target;
                    that.addListener(that.video);
                    that.isEnd = false;
                }
            });
        }

        addListener = (videoDOM) => {
            if (!videoDOM || !videoDOM.addEventListener) {
                return;
            }
            const that = this;
            videoDOM.removeEventListener('enterpictureinpicture', null);
            videoDOM.removeEventListener('leavepictureinpicture', null);
            videoDOM.addEventListener('ended', function() {
                document.exitPictureInPicture();
                that.isEnd = true;
            });
            videoDOM.addEventListener('loadedmetadata', function() {
                that.state.inPIP && that.handleOnClick(true);
            });
            videoDOM.addEventListener('enterpictureinpicture', function() {
                that.setState({inPIP: true});
            });
            videoDOM.addEventListener('leavepictureinpicture', function() {
                that.setState({inPIP: false}, () => {
                    if (!that.isEnd) {
                        this.play();
                    }
                });
            });
        };

        // 将事件绑定到点击事件上，因为新版页面可能会对this.video重新赋值
        handleOnClick = () => {
            if (!this.video) {
                this.video = document.querySelector('.bilibili-live-player-video video');
                this.addListener(this.video);
            }
            if (!this.video || !this.video.requestPictureInPicture) {
                return;
            }
            if (!this.state.inPIP) {
                this.video.requestPictureInPicture().then(() => {
                    this.setState({inPIP: true}, () => this.video.play());
                });
            } else if (this.state.inPIP) {
                document.exitPictureInPicture().then(() => {
                    this.setState({inPIP: false}, () => this.video.play());
                }).catch(e => {
                    console.error(e);
                    this.setState({inPIP: false});
                });
            }
            chrome.runtime.sendMessage({
                command: 'setGAEvent',
                action: 'click',
                category: 'Live PIP',
                label: 'Live PIP',
            });
        };

        render() {
            return (
                <PipButton
                    className={[this.state.inPIP ? 'on' : null]}
                    title={__('livePictureInPicture_UI_buttonTitle')}
                    onClick={() => this.handleOnClick()}
                    on={this.state.inPIP}
                >
                    {__('livePictureInPicture_name')}
                </PipButton>
            );
        }
    }
}
