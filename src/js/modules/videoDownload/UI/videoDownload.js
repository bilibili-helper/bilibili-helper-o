/* global require */
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
import URL from 'url-parse';
import FLV from '../lib/flv';
import {FlvContainer} from '../FlvContainer';
import {DashContainer} from '../DashContainer';
//const ffmpeg = require('ffmpeg.js/ffmpeg-mp4.js');

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
            currentQuality: null,
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

    getContainer = (type, currentCid, currentQuality, data) => {
        if (!this.containers[currentCid]) this.containers[currentCid] = {};
        if (this.containers[currentCid][currentQuality]) {
            return this.containers[currentCid][currentQuality];
        } else switch (type) {
            case 'flv':
                return this.containers[currentCid][currentQuality] = new FlvContainer({...data, cid: currentCid});
            case 'mp4':
                return this.containers[currentCid][currentQuality] = new DashContainer({...data, cid: currentCid});
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
                            if (!videoData[currentCid]) videoData[currentCid] = {};
                            videoData[currentCid][quality] = currentData;

                            this.setState({videoData, currentCid, percentage: 0, currentQuality: quality});
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
                    this.setState({currentCid: message.cid, videoData, currentQuality: quality});
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

    handleOnClickDownloadMp4 = (videoData) => {
        const {currentCid, currentQuality} = this.state;
        this.setState({downloading: true});
        const container = this.getContainer('mp4', currentCid, currentQuality, videoData);
        container.download((percentage) => {
            this.setState({percentage});
        }).then((downloadData) => {
            let [buffers, [videoCodec, audioCodec]] = downloadData;
            this.setState({downloading: false});
            //console.warn(window.ffmpeg_run);
            //const {MP4Box} = require('mp4box');
            //const mp4 = new MP4Box(true);
            //buffers[0].fileStart = 0;
            //mp4.appendBuffer(buffers[0]);
            //mp4.flush();
            //console.warn(mp4, mp4.processSamples());
            //console.warn(buffers);
            //const url = window.URL.createObjectURL(new Blob([buffers[0]], {type: `video/mp4; codecs="${videoCodec}"`}));
            //console.warn(url);
            //let o = ffmpeg({
            //    MEMFS: [{name: 'video.mp4', data: buffers[0]}, {name: 'audio.mp4', data: buffers[1]}],
            //    arguments: [
            //        '-i', 'video.mp4',
            //        '-i', 'audio.mp4',
            //        '-c', 'copy',
            //        '-shortest',
            //        //'-c:a', 'aac',
            //        //'-strict', 'experimental',
            //        '-map', '0:v',
            //        '-map', '1:a',
            //        'output.mp4',
            //    ],
            //    // Ignore stdin read requests.
            //    stdin: function() {},
            //});
            //const out = [...o.MEMFS[0].data];
            //o = null;
            //buffers = null;
            //const url = window.URL.createObjectURL(new Blob([out], {type: `video/mp4; codecs="${videoCodec}, ${audioCodec}"`}));
            //chrome.runtime.sendMessage({
            //    commend: 'downloadMergedVideo',
            //    url,
            //    cid: currentCid,
            //    filename: this.getFilename() + '.mp4',
            //});
        }).catch(e => console.warn(e));
    };

    handleOnClickDownloadFLVAll = (data) => {
        const {currentCid, currentQuality} = this.state;
        this.setState({downloading: true});

        // get quality
        if (!data.quality) data.quality = parseInt(document.querySelector('.bilibili-player-video-btn-quality > div ul li.bui-select-item-active')
                                                           .getAttribute('data-value'));
        // init container
        const container = this.getContainer('flv', currentCid, currentQuality, data);
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

    renderFLV = (percentage) => {
        const {downloading, settings, videoData, currentQuality: quality = null, currentCid} = this.state;
        const showPiece = (settings && _.find(settings.options, {key: 'showPiece'})) || {on: false};
        const {durl, accept_description, accept_quality} = videoData[currentCid][quality];
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
                            {durl.length > 1 && i === 0 ?
                             <LinkGroupTitle key={`title-${quality}-${i}`}>
                                 {accept_description[accept_quality.indexOf(+quality)]}
                             </LinkGroupTitle> : null}

                            <a
                                key={i}
                                href={o.url}
                                referrerPolicy="unsafe-url"
                                onClick={() => this.handleOnClickDownloadFLV(o.url)}
                            >{title}</a>

                            {durl.length > 1 && i === durl.length - 1 &&
                            <a onClick={() => this.handleOnClickDownloadFLVAll(videoData[currentCid][quality])}>
                                {downloading ? `下载中 ${percentage ? `(${percentage}%)` : ''}` : '合并下载'}
                            </a>}
                        </React.Fragment>
                    );
                })}
                <Progress percentage={percentage}/>
            </LinkGroup>
        );
    };

    renderDash = (percentage) => {
        const {downloading, currentQuality: quality, videoData, currentCid} = this.state;
        const {accept_description, accept_quality} = videoData[currentCid][quality];
        const title = accept_description[accept_quality.indexOf(+quality)];
        return (
            <LinkGroup downloading={downloading} disabled={downloading}>
                {/*{<a onClick={() => this.handleOnClickDownloadMp4(videoData[currentCid][quality])}>*/}
                    {/*{title}{downloading ? ` 下载中 ${percentage ? `(${percentage}%)` : ''}` : ''}*/}
                {/*</a>}*/}
                MP4下载功能存在没有声音的问题，暂时下架<br/>
                可切换到旧版播放页面下载flv，目前已支持合FLV合并下载
                <Progress percentage={percentage}/>
            </LinkGroup>
        );
    };

    render() {
        const {videoData, currentCid, percentage, currentQuality} = this.state;
        const loadedVideo = videoData[currentCid] && videoData[currentCid][currentQuality];
        return (
            <React.Fragment>
                <Title>视频下载 - 切换清晰度来获取视频连接</Title>
                <Container>
                    {!_.isEmpty(loadedVideo) && (!_.isEmpty(loadedVideo.durl) ? this.renderFLV : this.renderDash)(percentage)}
                    {!videoData[currentCid] ? <LinkGroupTitle><p>请尝试切换视频清晰度 或 切换到旧播放页面</p></LinkGroupTitle> : null}
                </Container>
            </React.Fragment>
        );
    }
}
