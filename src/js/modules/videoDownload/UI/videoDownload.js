import {DashContainer} from 'Libs/DashContainer';
import {DataBase} from 'Libs/DataBase';
import FLV from 'Libs/flv';

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
import {FlvContainer} from 'Libs/FlvContainer';

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
  position: relative;
  display: inline-block;
  margin: 4px;
  padding: 3px;
  border-radius: 3px;
  font-size: 12px;
  font-style: normal;
  letter-spacing: 0.3px;
  background-color: #eaf4ff;
  transition: all 0.3s, visibility 0s;
  cursor: pointer;
  word-break: break-all;
  overflow: hidden;
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
  cursor: pointer;
`;
const Suggest = styled.p`
  margin-bottom: 6px;
  margin-left: 5px;
  font-size: 10px;
  color: ${color('bilibili-pink')};
`;
const Progress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({percentage}) => percentage + '%'};
  height: 2px;
  background-color: ${color('bilibili-blue')};
  transition: all 0.7s;
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
            percentage: 0,
            downloading: false,
            settings: null,
        };
        this.addListener();
        _.map(document.scripts, (o) => {
            if (/^window.__playinfo__=/.test(o.innerHTML)) {
                const playInfo = JSON.parse(o.innerHTML.slice(20));
                this.originVideoData = playInfo.data || playInfo;
            }
        });
        this.containers = {};
    }

    componentDidMount() {
        this.inited = true;
        chrome.runtime.sendMessage({commend: 'videoDownloadDOMInitialized'});
        chrome.runtime.sendMessage({
            commend: 'getSetting',
            feature: 'videoDownload',
        }, (settings) => {
            this.setState({settings});
        });
    }

    getFilename = () => {
        const partDOM = document.querySelector('#v_multipage a.on, #multi_page .cur-list li.on a, #eplist_module .list-wrapper ul .cursor');
        const partName = partDOM ? partDOM.innerText : '';
        const title = document.querySelector('#viewbox_report h1, .header-info h1, .media-wrapper > h1')
                              .getAttribute('title');
        return `${title}${partName ? `_${partName}` : ''}`;
    };

    getContainer = (type, currentCid, data) => {
        if (this.containers[currentCid]) return this.containers[currentCid];
        else switch (type) {
            case 'flv':
                return this.containers[currentCid] = new FlvContainer({...data, cid: currentCid});
            case 'mp4':
                return this.containers[currentCid] = new DashContainer({...data, cid: currentCid});
        }
    };

    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'videoDownloadSendVideoRequest') {
                const {data, url, method, type} = message;
                //const res = /\/av([\d]+)\//.exec(location.pathname); // 新的视频播放页面会同时加载多个不同视频的playUrl
                //console.log(res, avid);
                //if (type === 'old') {
                const {videoData} = this.state;
                const currentCid = data.cid;
                const quality = data.quality;
                if (videoData[currentCid] && videoData[currentCid][quality]) {
                    this.setState({currentCid});
                } else {
                    $.ajax({
                        method,
                        url,
                        data,
                        headers: {
                            'From': 'bilibili-helper',
                        },
                        contentType: 'video/mp4',
                        success: (res) => {
                            if (res.code === 10005) return console.error(res);
                            let downloadData;
                            if (type === 'new' && res.code === 0) {
                                downloadData = res.data || res.result;
                            } else if (type === 'old') {
                                downloadData = res;
                            }

                            const {accept_quality, accept_description, durl, quality, dash} = downloadData;
                            const currentData = {accept_quality, accept_description, durl, dash};

                            videoData[currentCid] = {[quality]: currentData};

                            this.setState({videoData, currentCid, percentage: 0});
                        },
                    });
                }

                sendResponse(true);
            } else if (message.commend === 'videoDownloadCid' && message.cid) { // 本地script加载视频数据时，需要检测cid
                const {videoData} = this.state;
                if (_.isEmpty(videoData) && !_.isEmpty(this.originVideoData)) {
                    const {quality} = this.originVideoData;
                    const currentData = {...this.originVideoData};
                    const cidData = videoData[message.cid] || {};
                    cidData[quality] = currentData;
                    videoData[message.cid] = cidData;
                    this.setState({currentCid: message.cid, videoData});
                }
                sendResponse(true);
            }
        });
    };

    handleOnClickDownloadFLV = (downloadUrl) => {
        const partDOM = document.querySelector('#v_multipage a.on, #multi_page .cur-list li.on a');
        const partName = partDOM ? partDOM.innerHTML : '';
        const title = document.querySelector('#viewbox_report h1, .header-info h1').getAttribute('title');
        chrome.runtime.sendMessage({
            commend: 'sendVideoFilename',
            url: downloadUrl.split('?')[0],
            cid: this.state.currentCid,
            filename: `${title}${partName ? `_${partName}` : ''}`,
        });
    };

    handleOnClickDownloadMp4 = (data) => {
        const {currentCid} = this.state;
        this.setState({downloading: true});

        const container = this.getContainer('mp4', currentCid, data);
        container.download((percentage) => {
            this.setState({percentage});
        }).then((blob) => {
            this.setState({downloading: false});
            const url = (window.URL ? URL : window.webkitURL).createObjectURL(blob, {type: 'video/mp4'});
            chrome.runtime.sendMessage({
                commend: 'downloadMergedVideo',
                url,
                cid: currentCid,
                filename: this.getFilename() + '.mp4',
            });
        }).catch(e => e);
    };

    handleOnClickDownloadFLVAll = (data) => {
        const {currentCid} = this.state;
        this.setState({downloading: true});

        // get quality
        if (!data.quality) data.quality = parseInt(document.querySelector('.bilibili-player-video-btn-quality > div ul li.bui-select-item-active')
                                                           .getAttribute('data-value'));
        // init container
        const container = this.getContainer('flv', currentCid, data);
        // start download
        container.download((percentage) => {
            this.setState({percentage});
        }).then(blobs => {
            FLV.mergeBlobs(blobs).then(mergeBlob => {
                this.setState({downloading: false});
                const url = (window.URL ? URL : window.webkitURL).createObjectURL(mergeBlob, {type: 'video/x-flv'});
                chrome.runtime.sendMessage({
                    commend: 'downloadMergedVideo',
                    url,
                    cid: currentCid,
                    filename: this.getFilename() + '.flv',
                });
            });
        }).catch(e => e);
    };

    /*handleOnClickClearFLVCache = (data) => {
        const {currentCid} = this.state;
        const quality = data.quality || parseInt(document.querySelector('.bilibili-player-video-btn-quality > div ul li.bui-select-item-active')
                                                         .getAttribute('data-value'));
        if (this.containers[currentCid]) {
            const container = this.containers[currentCid];
            container.clear(quality);
        }
    };*/

    renderFLV = (videoData) => {
        const {downloading, settings} = this.state;
        const showPiece = (settings && _.find(settings.options, {key: 'showPiece'})) || {on: false};
        const {quality, durl, accept_description, accept_quality, currentCid, percentage} = videoData;
        if (!showPiece.on) { // 不显示分段
            const title = accept_description[accept_quality.indexOf(+quality)];
            return (
                <LinkGroup key={quality} downloading={downloading} disabled={downloading}>
                    <a onClick={() => this.handleOnClickDownloadFLVAll(videoData)}>{title}{downloading ? ` 下载中 (${percentage}%)` : ''}</a>
                    <Progress percentage={percentage}/>
                </LinkGroup>
            );
        } else return (
            <LinkGroup key={quality} downloading={downloading} disabled={downloading}>
                {_.map(durl, (o, i) => {
                    const title = durl.length > 1 ? `${i + 1}` : accept_description[accept_quality.indexOf(+quality)];
                    return (
                        <React.Fragment key={i}>
                            {durl.length > 1 && i === 0 ? <LinkGroupTitle key={`title-${quality}-${i}`}>{accept_description[accept_quality.indexOf(+quality)]}</LinkGroupTitle> : null}

                            <a key={i} referrerPolicy="unsafe-url" href={o.url} onClick={() => this.handleOnClickDownloadFLV(o.url)}>{title}</a>

                            {durl.length > 1 && i === durl.length - 1 && <a onClick={() => this.handleOnClickDownloadFLVAll(videoData)}>{downloading ? `下载中 (${percentage}%)` : '合并下载'}</a>}
                            {/*{durl.length > 1 && i === durl.length - 1 && this.containers[currentCid] && this.containers[currentCid].percentage === 100 &&*/}
                            {/*<a onClick={() => this.handleOnClickClearFLVCache(videoData)}>清理缓存</a>}*/}
                        </React.Fragment>
                    );
                })}
                <Progress percentage={percentage}/>
            </LinkGroup>
        );
    };

    renderDash = (videoData) => {
        const {downloading} = this.state;
        const {quality, accept_description, accept_quality, percentage} = videoData;
        const title = accept_description[accept_quality.indexOf(+quality)];
        return (
            <LinkGroup downloading={downloading} disabled={downloading}>
                {<a onClick={() => this.handleOnClickDownloadMp4(videoData)}>{title}{downloading ? ` 下载中 (${percentage}%)` : ''}</a>}
                <Progress percentage={percentage}/>
            </LinkGroup>
        );
    };

    render() {
        const {videoData, currentCid, percentage} = this.state;
        return (
            <React.Fragment>
                <Title>视频下载 - 切换清晰度来获取视频连接</Title>
                <Container>
                    {videoData[currentCid] && _.map(videoData[currentCid], (part, quality) => {
                        part.quality = quality;
                        part.currentCid = currentCid;
                        part.percentage = percentage;
                        return (part.durl ? this.renderFLV : this.renderDash)(part);
                    })}
                    {!videoData[currentCid] ? <LinkGroupTitle><p>请尝试切换视频清晰度 或 切换到旧播放页面</p></LinkGroupTitle> : null}
                </Container>
            </React.Fragment>
        );
    }
}
