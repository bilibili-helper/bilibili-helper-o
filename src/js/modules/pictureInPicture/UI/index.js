/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {UI} from 'Libs/UI';
import {Button} from 'Components/common/Button';
import {__} from 'Utils';

const PipButton = styled(Button).attrs({
    class: `bilibili-helper-pip-btn`,
})`
  position: absolute;
  right: 20px;
  top: 14px;
  border-radius: 4px;
  button {
    padding: 0 4px;
    min-width: unset;
    font-size: 12px;
    border: 1px solid #fb7299;
    border-radius: 4px;
    color: ${({on}) => on ? '#fff' : '#fb7299'};
    background-color: ${({on}) => on ? '#fb7299' : '#fff'};
  }
`;

class PIP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inPIP: false,
        };
        this.video = null;
    }

    componentDidMount() {
        const that = this;
        this.video = document.querySelector('#bofqi .bilibili-player-video video');
        this.addListener(this.video);
        document.querySelector('#bofqi').addEventListener('DOMNodeInserted', function(e) {
            if (e.target.localName === 'video' && that.video !== e.target) {
                that.video = e.target;
                that.addListener(that.video);
                setTimeout(() => {
                    document.querySelector('.bilibili-helper-pip-btn').click();
                }, 1000);
            }
        });
    }

    addListener = (videoDOM) => {
        if (!videoDOM || !videoDOM.addEventListener) return;
        const that = this;
        videoDOM.removeEventListener('enterpictureinpicture', null);
        videoDOM.removeEventListener('leavepictureinpicture', null);
        videoDOM.addEventListener('ended', function() {
            document.exitPictureInPicture();
        });
        videoDOM.addEventListener('loadedmetadata', function() {
            that.state.inPIP && that.handleOnClick(true);
        });
        videoDOM.addEventListener('enterpictureinpicture', function() {
            that.setState({inPIP: true});
        });
        videoDOM.addEventListener('leavepictureinpicture', function() {
            that.setState({inPIP: false});
        });
    };

    // 将事件绑定到点击事件上，因为新版页面可能会对this.video重新赋值
    handleOnClick = () => {
        if (!this.video) {
            this.video = document.querySelector('#bofqi .bilibili-player-video video');
            this.addListener(this.video);
        }
        if (!this.video || !this.video.requestPictureInPicture) return;
        if (!this.state.inPIP) {
            this.video.requestPictureInPicture().then(() => {
                this.setState({inPIP: true}, () => this.video.play());
            });
        } else if (this.state.inPIP) {
            document.exitPictureInPicture().then(() => {
                this.setState({inPIP: false});
            }).catch(e => {
                console.error(e);
                this.setState({inPIP: false});
            });
        }
        chrome.runtime.sendMessage({
            commend: 'setGAEvent',
            action: 'click',
            category: 'PIP',
            label: 'PIP',
        });
    };

    render() {
        return (
            <React.Fragment>
                <PipButton title="点击进入画中画" onClick={() => this.handleOnClick()} on={this.state.inPIP}>
                    {__('pictureInPictureTitle')}
                </PipButton>
            </React.Fragment>
        );
    }
}

export class PictureInPictureUI extends UI {
    constructor() {
        super({
            name: 'pictureInPicture',
            dependencies: ['videoAnchor'],
        });
    }

    load = ([container], settings) => {
        return new Promise(resolve => {
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilibili-helper-pip-wrapper');
            wrapper.setAttribute('style', 'position: static; margin: 0;');
            container.appendChild(wrapper);
            ReactDOM.render(<PIP settings={settings}/>, wrapper, resolve);
        });
    };
}
