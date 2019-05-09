/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */
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
  right: 10px;
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
    cursor: pointer;
  }
`;

class PIP extends React.Component {
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
        this.video = document.querySelector('#bofqi .bilibili-player-video video');
        this.addListener(this.video);
        document.querySelector('#bofqi').addEventListener('DOMNodeInserted', function(e) {
            if (e.target.localName === 'video' && that.video !== e.target) {
                that.video = e.target;
                that.addListener(that.video);
                that.isEnd = false;
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
            that.isEnd = true;
        });
        videoDOM.addEventListener('loadedmetadata', function() {
            that.state.inPIP && that.handleOnClick(true);
        });
        videoDOM.addEventListener('enterpictureinpicture', function() {
            that.setState({inPIP: true});
        });
        videoDOM.addEventListener('leavepictureinpicture', function() {
            that.setState({inPIP: false},() => {
                if (!that.isEnd) this.play();
            });
        });
    };

    // 将事件绑定到点击事件上，因为新版页面可能会对this.video重新赋值
    handleOnClick = (next = false) => {
        if (!this.video) {
            this.video = document.querySelector('#bofqi .bilibili-player-video video');
            this.addListener(this.video);
        }
        if (!this.video || !this.video.requestPictureInPicture) return;
        if (!this.state.inPIP || next) {
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
