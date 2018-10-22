/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import React from 'react';
import styled from 'styled-components';

const VideoWrapper = styled.div.attrs({className: 'bilibili-helper-video-wrapper'})``;

const Title = styled.div.attrs({className: 'bilibili-helper-video-gui-title'})`
  font-size: 12px;
`;

export class VideoGUI extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        chrome.runtime.sendMessage({
            commend: 'getOption',
            feature: 'Video',
        }, (options) => {
            console.log(options);
        });
    }

    render() {
        return (
            <React.Fragment>
                <Title>弹幕发送者查询</Title>
            </React.Fragment>
        );
    }
}