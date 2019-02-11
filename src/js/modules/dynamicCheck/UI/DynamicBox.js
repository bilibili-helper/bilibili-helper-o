/**
 * Author: DrowsyFlesh
 * Create: 2018/10/21
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {createTab} from 'Utils';

const FeedsContainer = styled.div.attrs({className: 'feeds-container'})`
  margin: 9px 0 9px 10px;
  max-height: 258px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const FeedBox = styled.div.attrs({className: 'feed-box'})`
  position: relative;
  margin-bottom: 1px;
  cursor: pointer;
  &:hover {
    .feed-img {
      filter: grayscale(0) brightness(0.8);
      background-size: 100% auto;
    }
    .feed-info {
      //opacity: 0;
    }
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const FeedImg = styled.div.attrs({className: 'feed-img'})`
  width: 200px;
  height: 85px;
  background-size: 130% auto;
  background-position: center;
  background-color: #eee;
  filter: grayscale(0.5) brightness(0.4);
  box-shadow: inset 0px 0px 50px -10px #333;
  transition: all 0.3s;
`;

const FeedTitle = styled.h4.attrs({className: 'feed-title'})`
  position: absolute;
  bottom: 4px; 
  width: 230px;
  margin: 0;
  transform: scale(0.8) translateX(-20px);
  font-size: 12px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #fff;
`;

const FeedInfo = styled.div.attrs({className: 'feed-info'})`
  display: flex;
  justify-content: space-between;
  width: 230px;
  position: absolute;
  top: 5px;
  left: 0px;
  font-size: 12px;
  transform: scale(0.8) translateX(-20px);
  transition: all 0.3s;
  color: #fff;
  opacity: 1;
`;

export class DynamicBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedList: [],
        };
    }

    componentDidMount() {
        chrome.runtime.sendMessage({
            commend: 'getDynamicList',
        }, (feedList) => this.setState({feedList}));
    }

    handleOnClick = (link) => {
        chrome.runtime.sendMessage({
            commend: 'setGAEvent',
            action: 'click',
            category: 'dynamicCheck',
            label: 'dynamicCheck',
        });
        createTab(link);
    };

    toDuration(seconds) {
        const duration = moment.duration(seconds, 'seconds');
        const hoursStr = duration.hours();
        const minutesStr = String(duration.minutes()).padStart(2, 0);
        const secondsStr = String(duration.seconds()).padStart(2, 0);
        let durationStr = `${Number(hoursStr) ? hoursStr + ':' : ''}${minutesStr}:${secondsStr}`;
        if (durationStr[0] === '0') durationStr = durationStr.slice(1);
        return durationStr;
    }

    createLinkByType = (type, data) => {
        switch (type) {
            case 8:
                return 'https://www.bilibili.com/video/av' + data.stat.aid;
            case 16:
                return 'https://vc.bilibili.com/video/' + data.item.id;
            case 64:
                console.warn(data);
                return 'https://www.bilibili.com/read/cv' + data.id;
            case 512:
                return data.url;
        }
    };

    // up投稿
    renderType8 = ({index, link, owner, title, pic, duration}) => (
        <FeedBox key={index} onClick={() => this.handleOnClick(link)}>
            <FeedImg style={{backgroundImage: `url(${pic})`}}/>
            <FeedInfo>
                <span title={owner.name}>{owner.name}</span>
                <span>{this.toDuration(duration)}</span>
            </FeedInfo>
            <FeedTitle title={title}>{title}</FeedTitle>
        </FeedBox>
    );

    // up小视频
    renderType16 = ({index, link, item, user}) => (
        <FeedBox key={index} onClick={() => this.handleOnClick(link)}>
            <FeedImg style={{backgroundImage: `url(${item.cover.default})`}}/>
            <FeedInfo>
                <span title={user.name}>{user.name}</span>
                <span>小视频</span>
            </FeedInfo>
            <FeedTitle title={item.description}>{item.description}</FeedTitle>
        </FeedBox>
    );

    // 专栏
    renderType64 = ({index, link, author, title, banner_url}) => (
        <FeedBox key={index} onClick={() => this.handleOnClick(link)}>
            <FeedImg style={{backgroundImage: `url(${banner_url})`}}/>
            <FeedInfo>
                <span title={author.name}>{author.name}</span>
                <span>专栏</span>
            </FeedInfo>
            <FeedTitle title={title}>{title}</FeedTitle>
        </FeedBox>
    );

    // 番剧
    renderType512 = ({index, link, new_desc, cover, apiSeasonInfo}) => (
        <FeedBox key={index} onClick={() => this.handleOnClick(link)}>
            <FeedImg style={{backgroundImage: `url(${cover})`}}/>
            <FeedInfo>
                <span title={apiSeasonInfo.title}>{apiSeasonInfo.title}</span>
                <span>番剧</span>
            </FeedInfo>
            <FeedTitle title={new_desc}>{new_desc}</FeedTitle>
        </FeedBox>
    );

    render() {
        const {feedList} = this.state;
        return (
            feedList && feedList.length > 0 ? <FeedsContainer>
                {_.map(feedList, (card, index) => {
                    const typeFunc = this[`renderType${card.desc.type}`];
                    const cardData = typeof card.card === 'string' ? JSON.parse(card.card) : card.card;
                    const link = this.createLinkByType(card.desc.type, cardData);
                    if (typeFunc) return typeFunc({index, link, ...cardData});
                })}
            </FeedsContainer> : <div/>
        );
    }
}
