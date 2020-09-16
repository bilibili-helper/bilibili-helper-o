/**
 * Author: DrowsyFlesh
 * Create: 2018/10/21
 * Description:
 */

import React from 'react';
import styled from 'styled-components';
import {List} from 'react-virtualized';
import {createTab} from 'Utils';
import 'react-virtualized/styles.css';
import {theme} from 'Styles';
import {av2bv} from 'Utils';

export default () => {
    const FeedsContainer = styled.div.attrs({className: 'feeds-container'})`
      margin: 9px 0 9px 10px;
      max-height: 258px;
      overflow: auto;
      & .ReactVirtualized__List::-webkit-scrollbar {
        display: none;
      }
    `;
    const FeedBoxWrapper = styled.div.attrs({
        className: ({isNew}) => (isNew ? 'is-new' : ''),
    })`
      & > * {
        margin-bottom: 1px;
      }
      &:last-of-type > * {
        margin-bottom: 0;
      }
    `;

    const FeedBox = styled.div.attrs({className: 'feed-box'})`
      position: relative;
      border-radius: 3px;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        .feed-img {
          filter: grayscale(0) brightness(0.8);
          transform: scale(1);
        }
      }
    `;

    const FeedImg = styled.div.attrs({className: 'feed-img'})`
      width: 200px;
      height: 85px;
      box-shadow: inset 0px 0px 50px -10px #333;
      background-size: 100% auto;
      background-position: center;
      background-color: #eee;
      filter: grayscale(0.5) brightness(0.3);
      transform: scale(1.3);
      transition: filter .3s, transform .3s;
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
      z-index: 1;
      .is-new & :first-child {
        display: flex;
        flex-direction: row-reverse;
        &::after {
          content: 'new';
          display: inline-block;
          height: 13px;
          transform: scale(0.8);
          margin: 0 4px 0 -5px;
          padding: 0px 4px 2px 4px;
          text-transform: uppercase;
          border-radius: 3px;
          background-color: ${theme.color('bilibili-pink')};
        }
      }
    `;

    return class DynamicBox extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                feedList: [],
                lastCounter: 0,
            };
        }

        componentDidMount() {
            chrome.runtime.sendMessage({
                command: 'getDynamicList',
            }, ({feedList, lastCounter}) => {
                this.setState({feedList, lastCounter});
                chrome.runtime.sendMessage({command: 'updateLastDynamicId'});
            });

        }

        handleOnClick = (e, link) => {
            if (e.button !== 2) {
                chrome.runtime.sendMessage({
                    command: 'setGAEvent',
                    action: 'click',
                    category: 'dynamicCheck',
                    label: 'dynamicCheck',
                });
                createTab(link, e.button === 0);
            }
        };

        createLinkByType = (type, data) => {
            switch (type) {
                case 8:
                    if (this.props.useBvid) {
                        return 'https://www.bilibili.com/video/' + av2bv(data.stat.aid);
                    } else {
                        return 'https://www.bilibili.com/video/av' + data.stat.aid;
                    }
                case 16:
                    return 'https://vc.bilibili.com/video/' + data.item.id;
                case 64:
                    return 'https://www.bilibili.com/read/cv' + data.id;
                case 512:
                    return data.url;
            }
        };

        // up投稿
        renderType8 = ({index, link, owner, title, pic, duration, desc}) => (
            <FeedBox href={link} key={index} onMouseDown={(e) => this.handleOnClick(e, link)}>
                <FeedImg style={{backgroundImage: `url(${pic})`}}/>
                <FeedInfo>
                    <span
                        title={desc.user_profile ? desc.user_profile.info.uname : owner.name}>{desc.user_profile ? desc.user_profile.info.uname : owner.name}</span>
                    <span>{duration}</span>
                </FeedInfo>
                <FeedTitle title={title}>{title}</FeedTitle>
            </FeedBox>
        );

        // up小视频
        renderType16 = ({index, link, item, user}) => (
            <FeedBox href={link} key={index} onMouseDown={(e) => this.handleOnClick(e, link)}>
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
            <FeedBox href={link} key={index} onMouseDown={(e) => this.handleOnClick(e, link)}>
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
            <FeedBox href={link} key={index} onMouseDown={(e) => this.handleOnClick(e, link)}>
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
                <FeedBoxWrapper style={style} isNew={index < this.state.lastCounter}>
                    {typeFunc({index, link, ...card.card, desc: card.desc})}
                </FeedBoxWrapper>
            ) : null;
        };

        render() {
            const {feedList} = this.state;
            return (
                feedList && feedList.length > 0 ? (
                    <FeedsContainer>
                        <List
                            width={200}
                            height={255}
                            rowCount={this.state.feedList.length}
                            rowHeight={86}
                            rowRenderer={this.renderLine}
                        />
                    </FeedsContainer>
                ) : null
            );
        }
    };

}
