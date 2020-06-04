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

const UIBuilder = () => {

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

    return class VideoSubtitleDownload extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                subtitleData: [], // 因为有多种语言，所以是数组
                permissionMap: {},
            };
        }

        componentDidMount() {
            chrome.runtime.sendMessage({command: 'videoSubtitleDownloadDOMInitialized'});
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                if (message.command === 'loadSubtitle' && message.url) {
                    fetch(message.url, {
                        mode: 'cors',
                        method: 'get',
                        referrer: window.location.href,
                        //headers: {'From': 'bilibili-helper'},
                        credentials: "include",
                    }).then(res => res.text()).then(res => {
                        const regExpRes = /<subtitle>(.+)<\/subtitle>/.exec(res);
                        if (regExpRes.length > 0) {
                            const subtitleData = JSON.parse(regExpRes[1]).subtitles;
                            this.setState({subtitleData});
                        }
                    }).catch((e) => {
                        console.error(e);
                        if (e.status === 403) {
                            return;
                        }
                    })
                    sendResponse(true);
                }
            });
            chrome.runtime.sendMessage({
                command: 'getPermissionMap',
            }, (permissionMap) => {
                this.setState({permissionMap});
            });
        }

        handleDownloadSubtitle = (subtitleObject) => {
            chrome.runtime.sendMessage({
                command: 'setGAEvent',
                action: 'click',
                category: 'videoSubtitleDownload',
                label: 'videoSubtitleDownload',
            });
            chrome.runtime.sendMessage({
                command: 'downloadSubtitle',
                subtitleObject,
                filename: document.querySelector('#viewbox_report h1, .header-info h1').getAttribute('title'),
            });
        };

        render() {
            const {subtitleData, permissionMap} = this.state;
            return (
                <React.Fragment>
                    {!permissionMap.login || subtitleData.length !== 0 && <Title>外挂字幕下载</Title>}
                    <Container>
                        {!permissionMap.login && <LinkGroupTitle><p>未登录</p></LinkGroupTitle>}
                        {permissionMap.login && subtitleData.length !== 0 &&
                        <LinkGroup>
                            {subtitleData.map((subtitle) => {
                                const {id, lan_doc} = subtitle;
                                return (<LinkGroupTitle key={id} onClick={() => this.handleDownloadSubtitle(subtitle)}>
                                    <a>{lan_doc.replace('（', ' (').replace('）', ')')}</a>
                                </LinkGroupTitle>);
                            })}
                        </LinkGroup>}
                    </Container>
                </React.Fragment>
            );
        }
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
        if (!settings.on) return Promise.resolve();
        return new Promise(resolve => {
            const VideoSubtitleDownload = UIBuilder();
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilibili-helper-subtitle-download-wrapper');
            wrapper.setAttribute('style', 'order: 2;');
            container.appendChild(wrapper);
            ReactDOM.render(<VideoSubtitleDownload/>, wrapper, resolve);
        });
    };
}
