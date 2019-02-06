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
  padding: 9px 0 9px 10px;
  max-height: 258px;
  overflow: auto;
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
  &::-webkit-scrollbar {
    display: none;
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
        const minutesStr = String(duration.minutes()).padStart(2,0)
        const secondsStr = String(duration.seconds()).padStart(2,0)
        let durationStr = `${Number(hoursStr) ? hoursStr + ':' : ''}${minutesStr}:${secondsStr}`;
        if (durationStr[0] === '0') durationStr = durationStr.slice(1);
        return durationStr;
    }

    render() {
        const {feedList} = this.state;
        console.warn(feedList);
        return (
            feedList && feedList.length > 0 ? <FeedsContainer>
                {_.map(feedList, ({card}, index) => {
                    const {owner, jump_url, pic, title, duration: seconds, new_desc, cover, url, apiSeasonInfo} = JSON.parse(card);
                    const link = jump_url ? 'https' + jump_url.slice(0,8) : url;
                    const cardTitle = apiSeasonInfo ? `${apiSeasonInfo.title}：${new_desc}`: title;
                    return (
                        <FeedBox key={index} onClick={() => this.handleOnClick(link)}>
                            <FeedImg style={{backgroundImage: `url(${pic || cover})`}}/>
                            <FeedInfo>
                                {owner && <span title={owner.name}>{owner.name}</span>}
                                {seconds && <span>{this.toDuration(seconds)}</span>}
                            </FeedInfo>
                            <FeedTitle title={cardTitle}>{cardTitle}</FeedTitle>
                        </FeedBox>
                    );
                })}
            </FeedsContainer> : <div/>
        );
    }
}
