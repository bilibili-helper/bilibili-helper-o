/**
 * Author: DrowsyFlesh
 * Create: 2018/10/22
 * Description:
 */
import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import styled from 'styled-components';
import {parseTime} from 'Utils';
import {theme} from 'Styles';
import {Crc32Engine} from 'Libs/crc32';

const {color} = theme;
const crcEngine = new Crc32Engine();

const DanmuWrapper = styled.div.attrs({className: 'bilibili-helper-danmu-wrapper'})`
  position: relative;
`;

const Title = styled.div.attrs({className: 'bilibili-helper-video-gui-title'})`
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  .count {
    margin-left: 10px;
    color: ${color('google-grey-500')};
  }
`;

const DanmuList = styled.div.attrs({className: 'bilibili-helper-danmu-list'})`
  height: 150px;
  padding: 1px;
  border: 1px solid #eee;
  border-radius: 4px 4px 0 0;
  font-size: 12px;
  overflow: auto;
  & .no-data {}
`;

const DanmuSearchInput = styled.input.attrs({className: 'bilibili-helper-danmu-input'})`
  display: block;
  width: 100%;
  padding: 4px 6px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-top: none;
  border-radius: 0 0 4px 4px;
  font-size: 12px;
`;

const DanmuListLine = styled.div`
  display: flex;
  margin-bottom: 1px;
  padding: 0 8px 1px;
  line-height: 18px;
  border-radius: 2px;
  background-color: ${({hasQueried}) => hasQueried ? '#d6e8f5' : 'white'};
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #00a1d6;
    .target-words {
      color: #fff;
    }
  }
  & .time {
    flex-grow: 0;
    flex-shrink: 0;
    width: 30px;
    padding-right: 7px;
  }
  & .danmu {
    flex-grow: 1;
    margin: 0 7px 0 3px;
    padding: 0 7px;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  & .author {
    flex-shrink: 0;
    width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  & .target-words {
    font-weight: bold;
    color: #00a1d6;
  }
`;

const LoadingMask = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 23px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: no-drop;
  user-select: none;
`;

export class Danmu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loading: false,
            loadingText: null,
            danmuJSON: {},
            filterText: '',
            /**
             * 需要一个字段用于通知react重新渲染组件
             * 这里选择使用较为简单的authorHashMap
             */
            authorHashMap: {}, // authorHash -> uid
            queryUserMode: null, // 用户UID查询模式
        };
        this.orderedJSON = {}; // 经过弹幕发送时间排序的数据
        this.userMap = {}; // uid -> data
        this.queryUserModeTemplateMap = {}; // 切换到用户UID查询模式前，将之前的查询结果被分到该map中
        this.addListener();
    }

    componentDidMount() {
        chrome.runtime.sendMessage({commend: 'danmuDOMInitialized'});
    }

    //componentDidUpdate(prevProps) {
    //    /**
    //     * 如下地址格式的视频页面加载完需要主动加载弹幕列表
    //     * https://www.bilibili.com/video/av7895666
    //     * 除此之外都被动加载
    //     */
    //    if (prevProps.cid !== this.props.cid && this.props.cid && _.isEmpty(this.orderedJSON)) {
    //        this.getDANMUList(this.props.cid);
    //    }
    //}

    addListener = () => {
        $(window).on('beforeunload', function() { // 页面关闭的时候删除后端存储的tabStore
            chrome.runtime.sendMessage({commend: 'danmuTabUnload'});
        });
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'loadHistoryDanmu') { // 被通知载入历史弹幕
                if (message.date) {
                    this.getDANMUList(message.cid, message.date);
                    sendResponse(true);
                } else console.error(`Error history danmu date: ${message.date}`);
            } else if (message.commend === 'loadCurrentDanmu') { // 被通知载入当日弹幕
                this.getDANMUList(message.cid);
                sendResponse(true);
            }
        });
    };

    // 获取弹幕xml数据源
    getDANMUList = (cid, date) => {
        const url = 'https://api.bilibili.com/x/v1/dm/list.so';
        const historyUrl = 'https://api.bilibili.com/x/v2/dm/history';
        if (!!cid && !this.state.loading) {
            const timer = setTimeout(() => { // 请求时长超过800毫秒则显示查询中
                this.setState({
                    loading: true,
                    loadingText: '弹幕加载中~(๑•̀ㅂ•́)و',
                });
            }, 800);
            $.ajax({
                method: 'get',
                url: date ? historyUrl : url,
                data: {
                    platform: 'bilibiliHelper', // 必须添加，用于区分助手发出的请求，避免被监听
                    type: 1,
                    oid: cid,
                    date,
                },
                contentType: 'text/xml',
                success: (danmuDocument) => {
                    clearTimeout(timer);
                    const danmuJSON = this.danmuDocument2JSON(danmuDocument);
                    danmuJSON.list = this.sortJSONByTime(danmuJSON.list);
                    this.orderedJSON = {...danmuJSON};
                    this.setState({
                        danmuJSON: danmuJSON,
                        loaded: true,
                        loading: false,
                    });
                },
                error: (res) => {
                    console.error(res);
                    this.setState({loadingText: '弹幕加载失败!请刷新页面！'});
                },
            });
        }
    };

    // 通过uid获取用户信息
    getUserInfoByUid = (uid) => {
        return new Promise((resolve) => {
            if (this.userMap[uid]) resolve(this.userMap[uid]);
            else {
                const timer = setTimeout(() => { // 请求时长超过800毫秒则显示查询中
                    this.setState({
                        loading: true,
                        loadingText: '努力查询中~(๑•̀ㅂ•́)و',
                    });
                }, 300);
                uid && $.ajax({
                    method: 'get',
                    url: 'https://api.bilibili.com/x/web-interface/card',
                    data: {mid: uid},
                    //beforeSend: ,
                    success: ({code, data}) => {
                        clearTimeout(timer);
                        if (code === 0 && !this.isRobotUser(data)) { // 过滤掉可能是机器人的用户
                            this.userMap[uid] = {...data.card};
                            this.setState({loading: false});
                            resolve(uid);
                        } else resolve(false);
                    },
                    error: (res) => {
                        console.log(res);
                        this.setState({loadingText: '查询失败!'});
                    },
                });
            }
        });
    };

    // 检查机器人用户
    isRobotUser = (userData = {}) => {
        const {archive_count, article_count, follower, card} = userData;
        const {level_info, official_verify, name} = card;
        const {current_level, current_exp} = level_info; // 当前用户等级
        //const {type} = official_verify; // 正式用户!?(･_･;?
        if (archive_count === 0 && article_count === 0 && follower === 0 && current_level === 0 && current_exp === 0
            && name === '') {
            return true;
        } else return false;
    };

    // 将弹幕数据以时间顺序排序
    sortJSONByTime = (originJSON) => {
        return _.sortBy(originJSON, 'time');
    };

    // 将xml文档转化为json
    danmuDocument2JSON = (document) => {
        const list = [];
        _.forEach(document.getElementsByTagName('d'), (d) => {
            const [
                time, danmuMode, fontSize, color, unixTime,
                unknow,
                authorHash, rowId,
            ] = d.getAttribute('p').split(',');
            const danmu = d.innerHTML;
            list.push({danmuMode, fontSize, color, unixTime, authorHash, rowId, danmu, time: parseTime(time * 1000)});
        });
        return {
            cid: Number(document.getElementsByTagName('chatid')[0].innerHTML),
            maxLimit: Number(document.getElementsByTagName('maxlimit')[0].innerHTML),
            count: list.length,
            list,
        };
        this.setState({loaded: true});
    };

    // 搜索框编辑事件
    handleInputChange = (e) => {
        const value = e.target.value;
        const {danmuJSON} = this.state;
        const {cid} = danmuJSON;
        if (!e.target.value) {
            const {count, list} = this.orderedJSON;
            this.setState({danmuJSON: {cid, count, list}});
        } else {
            const list = [];
            _.forEach(this.orderedJSON.list, (data, time) => {
                const index = data.danmu.indexOf(value);
                if (!!~index) {
                    // 这里一定要复制一份，不然会修改原数据
                    const danmu = data.danmu.replace(value, `<span class="target-words">${value}</span>`);
                    list.push({...data, danmu});
                }
            });
            this.setState({danmuJSON: {cid, count: list.length, list}});
        }
    };

    // 当点击没有查询过用户名的弹幕列表行时触发
    handleDanmuLineClick = (authorHash) => {
        let extracted = /^b(\d+)$/.exec(authorHash);
        let uids = [];
        if (extracted && extracted[1]) {
            uids = [extracted[1]];
        } else {
            uids = crcEngine.crack(authorHash);
        }
        Promise.all(uids.map((uid) => this.getUserInfoByUid(uid))).then((res) => {
            const {authorHashMap} = this.state;
            authorHashMap[authorHash] = _.compact(res)[0];
            this.setState({authorHashMap});
        });
    };

    // 当点击查询过用户名的弹幕行时
    handleAuthorClick = (uid) => {
        const {queryUserMode} = this.state;
        if (!queryUserMode) {
            const authorHash = _.findKey(this.state.authorHashMap, (id) => id === uid);
            const {cid, list} = this.orderedJSON;
            const queryList = [];
            _.forEach(list, (data) => {
                if (data.authorHash === authorHash) {
                    // 这里一定要复制一份，不然会修改原数据
                    queryList.push({...data});
                }
            });
            this.queryUserModeTemplateMap = {...this.state.danmuJSON};
            this.setState({
                queryUserMode: true,
                danmuJSON: {cid, count: queryList.length, list: queryList},
            });
        } else {
            this.setState({
                queryUserMode: false,
                danmuJSON: this.queryUserModeTemplateMap,
            });
        }

    };

    render() {
        const {on} = this.props.settings;
        const {loaded, danmuJSON, authorHashMap, loading, loadingText} = this.state;
        return on ? (
            <DanmuWrapper>
                <Title>弹幕发送者查询{danmuJSON.count ? <span className="count">{danmuJSON.count} 条</span> : null}</Title>
                <DanmuList>
                    {loaded && danmuJSON.count > 0 ? _.map(danmuJSON.list, (danmuData, index) => {
                        const {danmu, authorHash, time} = danmuData;
                        const uid = authorHashMap[authorHash];
                        const authorName = this.userMap[uid] ? this.userMap[uid].name : '';
                        return (
                            <DanmuListLine
                                key={index}
                                title={`[${time}] ${danmu} ${authorName ? `by:${authorName}` : ''}`}
                                onClick={() => uid ? this.handleAuthorClick(uid) : this.handleDanmuLineClick(authorHash)}
                                hasQueried={authorName}
                            >
                                <span className="time">{time}</span>
                                <span className="danmu" dangerouslySetInnerHTML={{__html: danmu}}/>
                                <span className="author" data-usercard-mid={uid}>{authorName}</span>
                            </DanmuListLine>
                        );
                    }) : <DanmuListLine>无数据</DanmuListLine>}
                </DanmuList>
                <DanmuSearchInput placeholder="请输入需要查询的弹幕内容" onChange={this.handleInputChange}/>
                {loading && <LoadingMask>{loadingText}</LoadingMask>}
            </DanmuWrapper>
        ) : null;
    }
}