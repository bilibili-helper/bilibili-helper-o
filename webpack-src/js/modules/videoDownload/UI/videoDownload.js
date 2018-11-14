/**
 * Author: DrowsyFlesh
 * Create: 2018/11/12
 * Description:
 */
import md5 from 'md5';
import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import styled from 'styled-components';
import {theme} from 'Styles';

const {color} = theme;

import './style.scss';

const Title = styled.div.attrs({className: 'bilibili-helper-video-download-title'})`
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  .count {
    margin-left: 10px;
    color: ${color('google-grey-500')};
  }
`;

const DownloadLinkGroup = styled.div`
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
const DownloadLinkGroupTitle = styled.span`
  display: inline-block;
  padding: 0 8px;
  width: 80px;
  border-right: 1px solid #fff;
  cursor: default;
`;

export class VideoDownload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: {},
            currentCid: NaN,
        };
        this.addListener();

    }

    componentWillMount() {
        //const qualityList = $('.bpui-selectmenu-list');
        //if (qualityList.length > 0) {
        //    qualityList.find('li:eq(0)').click();
        //}
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
                    data,
                    contentType: 'video/mp4',
                    success: (res) => {
                        let downloadData;
                        if (type === 'new' && res.code === 0) {
                            downloadData = res.data;
                        } else if (type === 'old') {
                            downloadData = res;
                        }

                        const {accept_quality, accept_description, durl} = downloadData;
                        const quality = downloadData.quality;

                        const currentData = {accept_quality, accept_description, durl};
                        const {videoData} = this.state;
                        const cidData = videoData[currentCid] || {};
                        cidData[quality] = currentData;
                        videoData[currentCid] = cidData;
                        //console.log(videoData, currentCid);
                        this.setState({videoData, currentCid},() => {
                            //chrome.runtime.sendMessage({
                            //    commend: 'videoDownloadSendVideoName',
                            //    filename: $('.header-info h1, #viewbox_report h1').attr('title'),
                            //    cidData,
                            //});
                        });
                    },
                });
                //}

                sendResponse(true);
            }
        });
    };

    /*handleOnClickDownload = (downloadUrl) => {
        chrome.runtime.sendMessage({
            commend: 'createVideoDownload',
            referrer: location.href,
            url: downloadUrl,
            filename: $('#viewbox_report h1').attr('title'),
        });
    };*/

    render() {
        const {videoData, currentCid} = this.state;
        return (
            <React.Fragment>
                <Title>视频下载 - 切换清晰度来获取视频连接</Title>
                {_.map(videoData[currentCid], (part, quality) => {
                    const {accept_quality, accept_description, durl} = part;
                    return (
                        durl ? <DownloadLinkGroup key={quality}>
                            {_.map(durl, (o, i) => {
                                const title = durl.length > 1 ? `${i + 1}` : accept_description[accept_quality.indexOf(+quality)];
                                return (
                                    <React.Fragment key={`${quality}${i}`}>
                                        {durl.length > 1 && i === 0 ? <DownloadLinkGroupTitle
                                            key={`title-${quality}-${i}`}
                                        >{accept_description[accept_quality.indexOf(+quality)]}</DownloadLinkGroupTitle> : null}
                                        <a
                                            key={`${quality}${i}`}
                                            referrerPolicy="unsafe-url"
                                            href={o.url}
                                            //onClick={() => this.handleOnClickDownload(part.url)}
                                        >{title}</a>
                                    </React.Fragment>
                                );
                            })}
                        </DownloadLinkGroup> : null
                    );
                })}
            </React.Fragment>
        );
    }
}