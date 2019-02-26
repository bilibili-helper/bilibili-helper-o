/**
 * Author: DrowsyFlesh
 * Create: 2018/10/21
 * Description:
 */

import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {List} from 'react-virtualized';
import {createTab} from 'Utils';
import 'react-virtualized/styles.css';

const FeedsContainer = styled.div.attrs({className: 'feeds-container'})`
  margin: 9px 0 9px 10px;
  max-height: 258px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const FeedBoxWrapper = styled.div`
  & > * {
    margin-bottom: 1px;
  }
  &:last-of-type > * {
    margin-bottom: 0;
  }
`;

const FeedBox = styled.div.attrs({className: 'feed-box'})`
  position: relative;
  cursor: pointer;
  &:hover {
    .feed-img {
      filter: grayscale(0) brightness(0.8);
      background-size: 100% auto;
    }
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

    createLinkByType = (type, data) => {
        switch (type) {
            case 8:
                return 'https://www.bilibili.com/video/av' + data.stat.aid;
            case 16:
                return 'https://vc.bilibili.com/video/' + data.item.id;
            case 64:
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
                <span>{duration}</span>
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

    renderLine = ({index, style}) => {
        const card = this.state.feedList[index];
        const typeFunc = this[`renderType${card.desc.type}`];
        const link = this.createLinkByType(card.desc.type, card.card);
        return typeFunc ? (
            <FeedBoxWrapper style={style}>
                {typeFunc({index, link, ...card.card})}
            </FeedBoxWrapper>) : null;
    };

    renderList = () => {
        return (
            <List
                width={200}
                height={255}
                rowCount={this.state.feedList.length}
                rowHeight={86}
                rowRenderer={this.renderLine}
            />
        );
    };

    render() {
        const {feedList} = this.state;
        return (
            feedList && feedList.length > 0 ? <FeedsContainer>
                {this.renderList()}
            </FeedsContainer> : null
        );
    }
}
