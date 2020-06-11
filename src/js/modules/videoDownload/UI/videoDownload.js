/* global require */
/**
 * Author: DrowsyFlesh
 * Create: 2018/11/12
 * Description:
 */
import _ from 'lodash';
import $ from 'jquery';
//const ffmpeg = require('ffmpeg.js/ffmpeg-mp4.js');
import FLV from '../lib/flv';
import React from 'react';
import Url from 'url-parse';
import styled from 'styled-components';
import {DashContainer} from '../DashContainer';
import {FlvContainer} from '../FlvContainer';
import {getFilename} from 'Utils';
import {normalFlvDownloadURL, bangumiFlvDownloadURL} from '../api';
import {theme} from 'Styles';

const videoDataCache = {
    old: {},
    new: {},
};

export default () => {
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
    const Description = styled.p`
      font-size: 12px;
      min-width: unset;
      max-width: 100%;
      color: rgb(255, 255, 255);
      background-color: rgb(251, 114, 153);
      padding: 0px 4px;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(251, 114, 153);
      border-image: initial;
      border-radius: 4px;
      width: max-content;
      transform: translate(4px, 0px) scale(0.9);
      transform-origin: left;
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

    return class VideoDownload extends React.Component {
        constructor(props) {
            super(props);
            this.inited = false;
            this.originVideoData = {};
            this.state = {
                videoData: {},
                currentCid: null,
                originVideoData: {},
                percentage: 0,
                downloading: false,
                settings: null,
                currentQuality: null,
                errorStr: '',
            };
            this.currentAvid = null;
            this.currentBvid = null;
            this.containers = {};
        }

        componentDidMount() {
            this.inited = true;
            this.addListener();
            _.map(document.scripts, (o) => {
                if (/^window.__playinfo__=/.test(o.innerHTML)) {
                    const playInfo = JSON.parse(o.innerHTML.slice(20));
                    this.originVideoData = playInfo.data || playInfo;
                }
            });
            chrome.runtime.sendMessage({command: 'videoDownloadDOMInitialized'});
            chrome.runtime.sendMessage({
                command: 'getSetting',
                feature: 'videoDownload',
            }, (settings) => {
                this.setState({settings});
            });
            $('.player-sidebar-list-item-inner, .bnj-player-single-item-mask').click(() => {
                setTimeout(() => {
                    chrome.runtime.sendMessage({command: 'videoDownloadDOMInitialized'});
                }, 500);
            });
        }

        getContainer = (type, currentCid, currentQuality, data) => {
            if (!this.containers[currentCid]) {
                this.containers[currentCid] = {};
            }
            if (this.containers[currentCid][currentQuality]) {
                return this.containers[currentCid][currentQuality];
            } else {
                const videoData = data[currentCid][currentQuality];
                switch (type) {
                    case 'flv':
                        return this.containers[currentCid][currentQuality] = new FlvContainer({
                            ...videoData, cid: currentCid,
                        });
                    case 'mp4':
                        return this.containers[currentCid][currentQuality] = new DashContainer({
                            ...videoData, cid: currentCid,
                        });
                }
            }
        };

        addListener = () => {
            const that = this;
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                if (message.command === 'initVideoDownload' && message.data) {
                    if (this.originVideoData.from === 'local') {
                        const {cid, aid, bvid} = message.data;
                        if (+cid) {
                            const {quality} = this.originVideoData;
                            const {videoData} = this.state;
                            const currentData = {...this.originVideoData};
                            const cidData = videoData[aid || bvid] || {};
                            cidData[quality] = currentData;
                            videoData[+cid] = cidData;
                            this.currentAvid = +aid;
                            this.currentBvid = bvid;
                            this.setState({currentCid: +cid, videoData, currentQuality: quality}, () => {
                                this.changeQuality(quality);
                            });
                        }
                    }
                    sendResponse();
                } else if (message.command === 'videoDownloadSendVideoRequest') {
                    let {data, url, method, type} = message;
                    const {cid, avid, bvid, qn = ''} = data;
                    if (type === 'new') {
                        if (location.href.indexOf('bangumi') >= 0) {
                            url = new Url(bangumiFlvDownloadURL);
                        } else {
                            url = new Url(normalFlvDownloadURL);
                        }
                        url.set('query', {cid, avid, bvid, qn, otype: 'json'});
                        url = url.toString();
                    }
                    //const res = /\/av([\d]+)\//.exec(location.pathname); // 新的视频播放页面会同时加载多个不同视频的playUrl
                    //console.log(res, avid);
                    //if (type === 'old') {
                    const {videoData} = this.state;
                    const currentCid = +data.cid;
                    this.currentAvid = avid;
                    this.currentBvid = bvid;
                    const quality = data.quality || data.qn;
                    this.setState({currentCid});
                    if (videoData[+currentCid] && videoData[currentCid][quality] && !videoData[currentCid][quality].dash) {
                        //
                    } else {
                        this.getFlvResponse(method, url);
                    }

                    sendResponse(true);
                } else if (message.command === 'videoDownloadCid' && message.cid) { // 本地script加载视频数据时，需要检测cid
                    const {videoData} = this.state;
                    if (_.isEmpty(videoData)) {
                        const {quality = 80} = this.originVideoData;
                        this.currentAvid = message.avid;
                        this.currentBvid = message.bvid;
                        if (!_.isEmpty(this.originVideoData) && this.originVideoData.durl) {
                            const currentData = {...this.originVideoData};
                            const cidData = videoData[message.cid] || {};
                            cidData[quality] = currentData;
                            videoData[message.cid] = cidData;
                            this.setState({currentCid: message.cid, videoData, currentQuality: quality});
                        } else {
                            let url = null;
                            if (location.href.indexOf('bangumi') >= 0) {
                                url = new Url(bangumiFlvDownloadURL);
                            } else {
                                url = new Url(normalFlvDownloadURL);
                            }
                            url.set('query', {cid: message.cid, avid: message.avid, qn: quality, otype: 'json'});
                            this.setState({currentCid: message.cid});
                            this.getFlvResponse('get', url.toString());
                        }
                    }
                    sendResponse(true);
                }
                return true;
            });
            $(document).on('click', '.bui-select-list li, .bpui-selectmenu-list li', (e) => {
                const quality = e.currentTarget.getAttribute('data-value');
                that.changeQuality(quality);
            });

            window.addEventListener('message', (event) => {
                if (event.data.command === 'bilibili-helper-video-download-get-flv-url' && event.data.res) {
                    const res = event.data.res;
                    if (res.code !== 0) {
                        this.setState({errorStr: res.message});
                        return;
                    }
                    const {videoData} = this.state;
                    const targetURL = new Url(res.url, true);
                    const currentCid = +targetURL.query.cid;

                    let downloadData;
                    if (res.type === 'new' && res.code === 0) {
                        downloadData = res.data || res.result || res;
                    } else if (res.type === 'old') {
                        downloadData = res.result || res.data || res;
                    }
                    videoDataCache[res.type][res.url] = {...downloadData, cid: currentCid};

                    const {accept_quality, accept_description, durl, quality, dash} = downloadData;
                    const currentData = {accept_quality, accept_description, durl, dash, quality};
                    if (!videoData[currentCid]) {
                        videoData[currentCid] = {};
                        videoData[currentCid][quality] = currentData;
                        this.setState({videoData, currentCid, percentage: 0, currentQuality: quality});
                    } else {
                        videoData[currentCid][quality] = {...videoData[currentCid][quality], ...currentData};
                        this.setState({videoData, currentCid, percentage: 0, currentQuality: quality});
                    }
                }
            });
        };

        changeQuality = (qn) => {
            const {currentCid, videoData} = this.state;
            let url;
            if (location.href.indexOf('bangumi') >= 0) {
                url = new Url(bangumiFlvDownloadURL);
            } else {
                url = new Url(normalFlvDownloadURL);
            }
            url.set('query', {cid: currentCid, avid: this.currentAvid, bvid: this.currentBvid, qn, otype: 'json'});
            url = url.toString();
            console.warn(url, this.currentBvid);
            //console.warn('changeQuality', qn);

            this.setState({currentCid, currentQuality: qn});
            if (videoData[currentCid] && videoData[currentCid][qn] && !videoData[currentCid][qn].dash) {
            } else {
                this.getFlvResponse('get', url);
            }
        };

        // 由于chrome73开始CROB策略，改为插入页面的请求方式，在用window的message传回脚本，心累累
        getFlvResponse = (method, url, type = 'old') => {
            const {videoData} = this.state;
            if (videoDataCache[type][url]) {
                const {accept_quality, accept_description, durl, quality, dash, cid} = videoDataCache[type][url];
                const currentData = {accept_quality, accept_description, durl, dash, quality};
                if (!videoData[+cid]) {
                    videoData[+cid] = {};
                }
                videoData[+cid][+quality] = currentData;
                this.setState({videoData, currentCid: cid, percentage: 0, currentQuality: quality});
            } else {
                const scriptHTML = document.createElement('script');
                scriptHTML.innerHTML = `
                fetch('${url}&requestFrom=bilibili-helper', {
                    method: 'get',
                    credentials: 'include',
                })
                .then(res => res.json())
                .then(res => {
                    window.postMessage({command:'bilibili-helper-video-download-get-flv-url', res: {...res, type: '${type}', url: '${url}'}}, '*');
                }).catch(e => {
                    console.log(e);
                });
                `;
                document.body.appendChild(scriptHTML);
            }
        };

        handleOnClickDownloadFLV = (e, downloadUrl) => {
            chrome.runtime.sendMessage({
                command: 'sendVideoFilename',
                url: downloadUrl,
                sign: downloadUrl.split('?')[0],
                cid: this.state.currentCid,
                filename: getFilename(document),
            });
        };

        handleOnClickDownloadMp4 = (videoData) => {
            const {currentCid, currentQuality} = this.state;
            this.setState({downloading: true});
            const container = this.getContainer('mp4', currentCid, currentQuality, videoData);
            container.download((percentage) => {
                this.setState({percentage});
            }).then((downloadData) => {
                //let [buffers, [videoCodec, audioCodec]] = downloadData;
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
                //    command: 'downloadMergedVideo',
                //    url,
                //    cid: currentCid,
                //    filename: getFilename(document) + '.mp4',
                //});
            }).catch(e => console.warn(e));
        };

        handleOnClickDownloadFLVAll = (data) => {
            const {currentCid, currentQuality, videoData} = this.state;
            this.setState({downloading: true});

            // get quality
            if (!data.quality) {
                data.quality = parseInt(document.querySelector('.bilibili-player-video-btn-quality > div ul li.bui-select-item-active')
                                                .getAttribute('data-value'));
            }
            // init container
            const container = this.getContainer('flv', currentCid, currentQuality, videoData);
            // start download
            container.download((percentage) => {
                this.setState({percentage});
            }).then(blobs => {
                FLV.mergeBlobs(blobs).then(mergeBlob => {
                    this.setState({downloading: false});
                    const url = window.URL.createObjectURL(mergeBlob, {type: 'video/x-flv'});
                    chrome.runtime.sendMessage({
                        command: 'downloadMergedVideo',
                        url,
                        cid: currentCid,
                        filename: getFilename(document) + '.flv',
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

        renderFLV = () => {
            const {downloading, settings, videoData, currentQuality: quality = null, currentCid, percentage} = this.state;
            //const showPiece = (settings && _.find(settings.options, {key: 'showPiece'})) || {on: false};
            const {durl, accept_description, accept_quality} = videoData[currentCid][quality];
            //if (!showPiece.on) { // 不显示分段
            //    const title = accept_description[accept_quality.indexOf(+quality)];
            //    if (videoData[currentCid][quality].durl.length === 1) { // 如果只有一个分段则直接显示下载地址的按钮
            //        return (
            //            <LinkGroup key={quality}>
            //                <a
            //                    href={videoData[currentCid][quality].durl[0].url}
            //                    onClick={(e) => this.handleOnClickDownloadFLV(e, videoData[currentCid][quality].durl[0].url)}
            //                    referrerPolicy="unsafe-url"
            //                    download
            //                    target="__blank"
            //                >{title}</a>
            //            </LinkGroup>
            //        );
            //    } else {
            //        return (
            //            <LinkGroup key={quality} downloading={downloading} disabled={downloading}>
            //                <a onClick={() => this.handleOnClickDownloadFLVAll(videoData[currentCid][quality])}>{title}{downloading ? ` 下载中 (${percentage}%)` : ''}</a>
            //                <Progress percentage={percentage}/>
            //            </LinkGroup>
            //        );
            //}
            //} else
            return (<LinkGroup key={quality} downloading={downloading} disabled={downloading}>
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
                                target="__blank"
                                download
                                onClick={(e) => {this.handleOnClickDownloadFLV(e, o.url);}}
                            >{title}</a>

                            {durl.length > 1 && i === durl.length - 1 &&
                            <a onClick={() => this.handleOnClickDownloadFLVAll(videoData[currentCid][quality])}>
                                {downloading ? `下载中 ${percentage ? `(${percentage}%)` : ''}` : '合并下载'}
                            </a>}
                        </React.Fragment>
                    );
                })}
                <Progress percentage={percentage}/>
            </LinkGroup>);
            //);
        };

        /*renderDash = () => {
            const {downloading, currentQuality: quality, videoData, currentCid, percentage} = this.state;
            const {accept_description, accept_quality} = videoData[currentCid][quality];
            const title = accept_description[accept_quality.indexOf(+quality)];
            return (
                <LinkGroup downloading={downloading} disabled={downloading}>
                    {<a onClick={() => this.handleOnClickDownloadMp4(videoData[currentCid][quality])}>
                        {title}{downloading ? ` 下载中 ${percentage ? `(${percentage}%)` : ''}` : ''}
                    </a>}
                    MP4下载功能存在没有声音的问题，暂时下架<br/>
                    可切换到旧版播放页面下载flv，目前已支持合FLV合并下载
                    <Progress percentage={percentage}/>
                </LinkGroup>
            );
        };*/

        render() {
            const {videoData, currentCid, currentQuality, errorStr} = this.state;
            const loadedVideo = videoData[currentCid] && videoData[currentCid][currentQuality];
            return (
                <React.Fragment>
                    <Title>视频下载 - 切换清晰度</Title>
                    <Description>暂时无法支持4K下载；下载出现问题请检查是否有安装下载或者广告屏蔽相关的其他扩展，他们可能导致会处理浏览器的默认行为导致助手下载功能异常</Description>
                    <Description>合并下载会先下载至内存最后弹出另存为窗口。当卡住时，请下载分段</Description>
                    <Container>
                        {loadedVideo && (loadedVideo.durl || loadedVideo.dash) && this.renderFLV()}
                        {!videoData[currentCid] ? <LinkGroupTitle>
                            {!errorStr && <p>请尝试切换视频清晰度 或 切换到旧播放页面</p>}
                            {errorStr && <p>{errorStr}</p>}
                        </LinkGroupTitle> : null}
                    </Container>
                </React.Fragment>
            );
        }
    };
}
