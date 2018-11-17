/**
 * Author: DrowsyFlesh
 * Create: 2018/11/17
 * Description:
 */
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {UI} from 'Libs/UI';
import {theme} from 'Styles';

const {color} = theme;

const Title = styled.div.attrs({className: 'bilibili-helper-danmu-title'})`
  width: 100%;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  .count {
    margin-left: 10px;
    color: ${color('google-grey-500')};
  }
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const LinkGroup = styled.div`
  display: inline-block;
  margin: 4px;
  padding: 3px;
  border-radius: 3px;
  font-size: 12px;
  font-style: normal;
  letter-spacing: 0.3px;
  background-color: #eaf4ff;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #d4eaff;
  }
  a {
    padding: 0 3px;
    color: #00a1d6;
    &:hover {
      color: #004c65;
    }
    &:last-of-type {
      border: none;
    }
  }
`;
const LinkGroupTitle = styled.span`
  display: inline-block;
  cursor: default;
  p {
      color: ${color('google-grey-900')};
      font-size: 12px;
  }
`;

class VideoSubtitleDownload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subtitleData: [], // 因为有多种语言，所以是数组
        };
    }

    componentWillMount() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'loadSubtitle' && message.data) {
                this.setState({subtitleData: message.data});
                sendResponse(true);
            }
        });
    }

    handleDownloadSubtitle = (id) => {
        chrome.runtime.sendMessage({
            commend: 'downloadSubtitle',
            id,
            filename: $('#viewbox_report h1, .header-info h1').attr('title'),
        });
    };

    render() {

        const {subtitleData} = this.state;
        return (
            <React.Fragment>
                <Title>字幕下载</Title>
                <Container>
                    {subtitleData.length === 0 && <LinkGroupTitle><p>未获取字幕数据，请检查该视频是否拥有字幕</p></LinkGroupTitle>}
                    {subtitleData.length > 0 && subtitleData.map((o) => {
                        const {id, lan_doc} = o;
                        return (
                            <LinkGroup key={id}>
                                <LinkGroupTitle onClick={() => this.handleDownloadSubtitle(id)}>
                                    <a>{lan_doc.replace('（', ' (').replace('）', ')')}</a>
                                </LinkGroupTitle>
                            </LinkGroup>
                        );
                    })}
                </Container>
            </React.Fragment>
        );
    }
}

export class VideoSubtitleDownloadUI extends UI {
    constructor() {
        super({
            name: 'videoSubtitleDownload',
            dependencies: ['videoAnchor'],
        });
    }

    load = ([container], settings) => {
        return new Promise(resolve => {
            const wrapper = $('<div style="order: 2;"/>').attr('class', 'bilibili-helper-subtitle-download-wrapper');
            container.append(wrapper);
            wrapper[0] && ReactDOM.render(<VideoSubtitleDownload/>, wrapper[0], resolve);
        });
    };
}
