/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {UI} from 'Libs/UI';
import {Button} from 'Components/common/Button';
import {theme} from 'Styles';

const {color} = theme;

const Title = styled.div.attrs({className: 'bilibili-helper-danmu-title'})`
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  .count {
    margin-left: 10px;
    color: ${color('google-grey-500')};
  }
`;

const PipButton = styled(Button)`
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

    componentWillMount() {
        this.video = document.getElementsByTagName('video')[0];
        const that = this;
        if (this.video) {
            this.video.addEventListener('enterpictureinpicture', function() {
                that.setState({inPIP: true});
            });
            this.video.addEventListener('leavepictureinpicture', function() {
                that.setState({inPIP: false});
            });
        }
    }

    handleOnClick = () => {
        if (this.video.requestPictureInPicture) this.video = document.getElementsByTagName('video')[0];
        if (!this.video) return;
        if (!this.state.inPIP) {
            this.video.requestPictureInPicture().then(() => {
                this.setState({inPIP: true});
            });
        } else if (this.state.inPIP) {
            document.exitPictureInPicture().then(() => {
                this.setState({inPIP: false});
            });
        }
        chrome.runtime.sendMessage({
            commend: 'setGAEvent',
            action: 'click',
            category: 'PIP',
        });
    };

    render() {
        return (
            <React.Fragment>
                <PipButton on={this.state.inPIP} title="点击进入画中画" onClick={this.handleOnClick}>画中画</PipButton>
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
            const pipWrapper = $('<div />')
            .attr('class', 'bilibili-helper-pip-wrapper')
            .css({position: 'static', margin: 0});
            container.append(pipWrapper);
            pipWrapper[0] && ReactDOM.render(<PIP settings={settings}/>, pipWrapper[0], resolve);
            resolve();
        });
    };
}