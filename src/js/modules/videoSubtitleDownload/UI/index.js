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
  padding: 0 8px;
  border-right: 1px solid #fff;
  &:last-of-type {
    border-right: none;
  }
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
            permissionMap: {},
        };
    }

    componentDidMount() {
        chrome.runtime.sendMessage({commend: 'videoSubtitleDownloadDOMInitialized'});
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'loadSubtitle' && message.url) {
                $.ajax({
                    method: 'get',
                    headers: {'From': 'bilibili-helper'},
                    url: message.url,
                    success: (res) => {
                        const regExpRes = /<subtitle>(.+)<\/subtitle>/.exec(res);
                        if (regExpRes.length > 0) {
                            const subtitleData = JSON.parse(regExpRes[1]).subtitles;
                            this.setState({subtitleData});
                        }
                    },
                    error: (e) => {
                        console.error(e);
                        if (e.status === 403) {
                            return;
                        }
                    },
                });
                sendResponse(true);
            }
        });
        chrome.runtime.sendMessage({
            commend: 'getPermissionMap',
        }, (permissionMap) => {
            this.setState({permissionMap});
        });
    }

    handleDownloadSubtitle = (subtitleObject) => {
        chrome.runtime.sendMessage({
            commend: 'setGAEvent',
            action: 'click',
            category: 'videoSubtitleDownload',
            label: 'videoSubtitleDownload',
        });
        chrome.runtime.sendMessage({
            commend: 'downloadSubtitle',
            subtitleObject,
            filename: document.querySelector('#viewbox_report h1, .header-info h1').getAttribute('title'),
        });
    };

    render() {
        const {subtitleData, permissionMap} = this.state;
        return (
            <React.Fragment>
                <Title>外挂字幕下载</Title>
                <Container>
                    {permissionMap.login ? <React.Fragment>
                        {subtitleData.length === 0
                         ? <LinkGroupTitle><p>未获取字幕数据，请检查该视频是否拥有字幕</p></LinkGroupTitle>
                         : <LinkGroup>
                             {subtitleData.map((subtitle) => {
                                 const {id, lan_doc} = subtitle;
                                 return (<LinkGroupTitle key={id} onClick={() => this.handleDownloadSubtitle(subtitle)}>
                                     <a>{lan_doc.replace('（', ' (').replace('）', ')')}</a>
                                 </LinkGroupTitle>);
                             })}
                         </LinkGroup>
                        }
                    </React.Fragment> : <LinkGroupTitle><p>未登录</p></LinkGroupTitle>}
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

    load = ([container]) => {
        return new Promise(resolve => {
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilibili-helper-subtitle-download-wrapper');
            wrapper.setAttribute('style', 'order: 2;');
            container.appendChild(wrapper);
            ReactDOM.render(<VideoSubtitleDownload/>, wrapper, resolve);
        });
    };
}
