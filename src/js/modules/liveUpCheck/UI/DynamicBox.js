/**
 * Author: DrowsyFlesh
 * Create: 2019/05/09
 * Description:
 */

import React from 'react';
import styled from 'styled-components';
import {List} from 'react-virtualized';
import {createTab} from 'Utils';
import 'react-virtualized/styles.css';
import {theme} from 'Styles';

export default () => {
    const FeedsContainer = styled.div.attrs({className: 'feeds-upper-container'})`
      margin: 9px 0 9px 10px;
      max-height: 258px;
      overflow: auto;
      & .ReactVirtualized__List{
        outline: none;
        ::-webkit-scrollbar {
          display: none;
        }
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

    const FeedBox = styled.div`
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      cursor: pointer;
      &:hover {
        .feed-img {
          filter: grayscale(0) brightness(0.8);
          transform: scale(1);
        }
      }
    `;

    const Face = styled.img`
      width: 30px;
      height: 30px;
      position: absolute;
      top: 3px;
      left: 3px;
      border-radius: 50%;
      border: 1px solid #e8e6e6;
      box-sizing: border-box;
      cursor: pointer;
    `;

    const Cover = styled.div.attrs({className: 'feed-img'})`
      width: 100%;;
      height: 85px;
      border-radius: 3px;
      background-size: 100% auto;
      background-position: center;
      background-color: #eee;
      filter: grayscale(0.5) brightness(0.3);
      transition: filter .3s, transform .3s;
    `;

    const UserName = styled.h6`
      position: absolute;
      top: 3px;
      left: 39px;
      margin: 0;
      padding: 0 4px 0 0;
      border-radius: 3px;
      font-size: 12px;
      font-weight: normal;
      transform: scale(0.8);
      transform-origin: left;
      //background-color: #ececec;
      color: #eee;
    `;

    const RoomName = styled.h6`
      max-width: 182px;
      position: absolute;
      left: 7px;
      bottom: 5px;
      margin: 0;
      padding: 0 4px 0 0;
      border-radius: 3px;
      font-size: 12px;
      font-weight: normal;
      transform: scale(0.8);
      transform-origin: left;
      //background-color: #ececec;
      color: #eee;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      pointer-events: none;
    `;
    const NewTag = styled.span`
      margin: 0 5px 0 0;
      padding: 0 2px;
      font-size: 10px;
      border-radius: 3px;
      background-color: ${theme.color('bilibili-pink')};
      color: #fff;
    `;

    return class DynamicBox extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                feedList: [],
                newCounter: 0,
            };
        }

        componentDidMount() {
            chrome.runtime.sendMessage({
                command: 'getLiveUpperDynamicList',
            }, ({feedList, newCounter}) => {
                this.setState({feedList, newCounter});
                chrome.runtime.sendMessage({command: 'updateLastLiveUpList'});
            });

        }

        renderLine = ({index, style}) => {
            const {cover_from_user, face, link, roomname, uname, uid} = this.state.feedList[index];
            const isNew = index < this.state.newCounter;
            return (
                <FeedBoxWrapper key={uid} style={style} isNew={isNew}>
                    <FeedBox>
                        <Cover
                            style={{backgroundImage: `url(${cover_from_user})`}}
                            onClick={() => createTab(link)}
                        />
                        <Face src={face} onClick={() => createTab(link)}/>
                        <UserName>{uname}</UserName>
                        <RoomName>{isNew ? <NewTag>NEW</NewTag> : null}{roomname}</RoomName>
                    </FeedBox>
                </FeedBoxWrapper>
            );
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
