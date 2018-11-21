/**
 * Author: DrowsyFlesh
 * Create: 2018/11/12
 * Description:
 */
import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import styled from 'styled-components';
import {theme} from 'Styles';

const {color} = theme;

const Title = styled.div.attrs({className: 'bilibili-helper-video-download-title'})`
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
  transition: all 0.3s, visibility 0s;
  &:hover {
    background-color: #d4eaff;
  }
  a {
    padding: 0 8px;
    border-right: 1px solid #fff;
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
  p {
    color: ${color('google-grey-900')};
    font-size: 12px;
  }
`;

export class VideoDownload extends React.Component {
    constructor(props) {
        super(props);
        this.inited = false;
        this.originVideoData = {};
        this.state = {
            videoData: {},
            currentCid: NaN,
            originVideoData: {},
        };
        this.addListener();
        _.map(document.scripts, (o) => {
            if (/^window.__playinfo__=/.test(o.innerHTML)) {
                const playInfo = JSON.parse(o.innerHTML.slice(20));
                let i = playInfo.data || playInfo;
                if (i.durl) this.originVideoData = i;
            }
        });
    }

    componentDidMount() {
        this.inited = true;
        chrome.runtime.sendMessage({commend: 'videoSubtitleDownloadDOMInitialized'});
    }

    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'videoDownloadSendVideoRequest') {
                const {data, url, method, type} = message;
                //const res = /\/av([\d]+)\//.exec(location.pathname); // 新的视频播放页面会同时加载多个不同视频的playUrl
                //console.log(res, avid);
                //if (type === 'old') {
                const currentCid = data.cid;
                $.ajax({
                    method,
                    url,
                    data: {
                        platform: 'bilibili-helper',
                        ...data
                    },
                    contentType: 'video/mp4',
                    success: (res) => {
                        if (res.code === 10005) {
                            console.error(res);
                            return;
                        }
                        let downloadData;
                        if (type === 'new' && res.code === 0) {
                            downloadData = res.data;
                        } else if (type === 'old') {
                            downloadData = res;
                        }

                        const {accept_quality, accept_description, durl, quality} = downloadData;
                        const currentData = {accept_quality, accept_description, durl};
                        const {videoData} = this.state;
                        const cidData = videoData[currentCid] || {};
                        cidData[quality] = currentData;
                        videoData[currentCid] = cidData;
                        this.setState({videoData, currentCid});
                    },
                });
                sendResponse(true);
            } else if (message.commend === 'videoDownloadCid' && message.cid) { // 本地script加载视频数据时，需要检测cid
                const {videoData} = this.state;
                if (_.isEmpty(videoData) && !_.isEmpty(this.originVideoData)) {
                    const {accept_quality, accept_description, durl, quality} = this.originVideoData;
                    const currentData = {accept_quality, accept_description, durl};
                    const cidData = videoData[message.cid] || {};
                    cidData[quality] = currentData;
                    videoData[message.cid] = cidData;
                    this.setState({currentCid: message.cid, videoData});
                }
                sendResponse(true);
            }
        });
    };

    handleOnClickDownload = (downloadUrl) => {
        chrome.runtime.sendMessage({
            commend: 'sendVideoFilename',
            url: downloadUrl.split('?')[0],
            cid: this.state.currentCid,
            filename: $('#viewbox_report h1, .header-info h1').attr('title'),
        });
    };

    render() {
        const {videoData, currentCid} = this.state;
        return (
            <React.Fragment>
                <Title>视频下载 - 切换清晰度来获取视频连接</Title>
                <Container>
                    {videoData[currentCid] && _.map(videoData[currentCid], (part, quality) => {
                        const {accept_quality, accept_description, durl} = part;
                        return (
                            durl ? <LinkGroup key={quality}>
                                {_.map(durl, (o, i) => {
                                    const title = durl.length > 1 ? `${i + 1}` : accept_description[accept_quality.indexOf(+quality)];
                                    return (
                                        <React.Fragment key={`${quality}${i}`}>
                                            {durl.length > 1 && i === 0 ? <LinkGroupTitle
                                                key={`title-${quality}-${i}`}
                                            >{accept_description[accept_quality.indexOf(+quality)]}</LinkGroupTitle> : null}
                                            <a
                                                key={`${quality}${i}`}
                                                referrerPolicy="unsafe-url"
                                                href={o.url}
                                                onClick={() => this.handleOnClickDownload(o.url)}
                                            >{title}</a>
                                        </React.Fragment>
                                    );
                                })}
                            </LinkGroup> : null
                        );
                    })}
                    {!videoData[currentCid] && <LinkGroupTitle><p>请尝试切换视频清晰度 或 切换到旧播放页面</p></LinkGroupTitle>}
                </Container>
            </React.Fragment>
        );
    }
}
