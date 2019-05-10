/**
 * Author: DrowsyFlesh
 * Create: 2019/2/16
 * Description:
 */

import {Button} from 'Components/common/Button';
import {UI} from 'Libs/UI';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';

const VideoDarkModeButton = styled(Button).attrs({
    class: `bilibili-helper-video-dark-mode-btn`,
})`
  position: absolute;
  right: 66px;
  top: 14px;
  border-radius: 4px;
  button {
    padding: 0 4px;
    min-width: unset;
    font-size: 12px;
    border: 1px solid #fb7299;
    border-radius: 4px;
    color: ${({on}) => on ? '#fff' : '#fb7299'};
    background-color: ${({on}) => on ? '#fb7299' : '#fff'};
    cursor: pointer;
  }
`;

const VideoDarkModeStyle = createGlobalStyle`
  html {
    --dark-1: #0c0c0c;
    --dark-2: #131313;
    --dark-3: #1f1f1f;
    --dark-4: #2b2b2b;
      
    --dark-font-0: #e8e8e8;
    --dark-font-1: #99a2aa;
    --dark-font-2: #879199;
  }
  
  body {
    background-color: #1c2022!important;
  }
  // nav 搜索框
  .bili-header-m .nav-menu .showSearch.nav-search #nav_searchform {
    border-color: var(--dark-3);
    background-color: var(--dark-2);
    input {
      color: var(--dark-font-0);
    }
  }
  .bili-header-m .nav-menu .bilibili-suggest {
    border-color: var(--dark-4);
    background-color: var(--dark-2);
    .kw .b-line {
      border-color: var(--dark-4);
      span {
        background-color: var(--dark-2);
      }
    }
    li.suggest-item:hover {
      background-color: var(--dark-3);
    }
  }
  // 视频信息
  #v_desc {
    .info {
      color: #879199;
    }
  }
  // up信息
  .up-info .btn .b-cd {
    background: var(--dark-3)!important;
  }
  .bili-header-m .nav-menu .nav-mask {
    background-color: var(--dark-1)!important;
  }
  .nav-wrapper .nav-con ul li a {
    color: var(--dark-font-1)!important;
  }
  #viewbox_report .video-title .tit, .media-wrapper > h1,
   .media-right > *:not(.media-tool-bar),
  .media-right > *:not(.media-tool-bar) a, .media-right > *:not(.media-tool-bar) span {
    color: var(--dark-font-0)!important;
  }
  #bilibiliPlayer {
    box-shadow: 0 0 8px var(--dark-1)!important; 
  }
  #paybar_module {
    .vip a.btn-pay.active {
      background-color: var(--dark-1)!important;
      border: 1px solid var(--dark-3);
    }
  }
  // tags
  #v_tag {
    border-color: var(--dark-1)!important;
    ul li {
      background-color: var(--dark-1)!important;
      border-color: var(--dark-1)!important;
      .tag-info-pane, a, .text {
        background-color: var(--dark-1)!important;
        color: var(--dark-font-1)!important;
     }
    }
    .btn-add, .ipt {
      background-color: var(--dark-2)!important;
      border-color: var(--dark-1)!important;
      color: var(--dark-font-1)!important;
    }
  }
  // 弹幕列表
  .player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function [class*=player-auxiliary-danmaku-btn-],
  .player-auxiliary-area .player-auxiliary-danmaku .player-auxiliary-danmaku-function,
  .danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap,
  .danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-btn-history,
  .danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-btn-footer,
  .player-auxiliary-area {
    background: #191919!important;
  }
  .danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .bscroll-vertical-scrollbar {
    background-color: black !important;
  }
  .danmaku-info-row {
    .danmaku-info-danmaku,span {
      color: var(--dark-font-1)!important;
    }
  }
  .v-wrap .danmaku-wrap {
    background-color: var(--dark-2)!important;
  }
  .bui-collapse-wrap {
    .bui-collapse-header, .player-auxiliary-filter {
      background-color: var(--dark-2)!important;
    }
  }
  .bui-collapse .bui-collapse-header, .player-auxiliary-filter {
    background: var(--dark-2);
    span {
      color: var(--dark-font-1);
    }
  }
  
  // 选集列表
  #eplist_module, #multi_page, .ep-section-module {
    background-color: var(--dark-2);
    .list-wrapper.longlist {
      padding-right: 6px;
    }
    .list-title, .head-con {
      h4, h3 {
        color: var(--dark-font-1);
      }
    }
    .section-title {
      color: var(--dark-font-1);
    }
    
    .module-box  {
      li {
        &:not(.on):not(:hover) {
          border-color: var(--dark-3);
          background-color: #232323;
          a {
            color: var(--dark-font-1);
          }
        }
        &:not(.on):hover {
          background-color: #232323;
        }
      }
    }
    .list-wrapper, .cur-list .list-box, .section-ep-wrapper {
      &.simple {
        .ep-item:not(.cursor) {
          color: var(--dark-font-1);
          border-color: var(--dark-3);
          background-color: #232323;
        }
      }
      .ep-item, li {
        width: auto;
        margin-right: 5px;
        color: var(--dark-font-1);
        a {
          color: var(--dark-font-1);
        }
        &.cursor, & {
          background-color: #232323;
        }
        &.visited, &.watched {
          color: #757575;
        }
        &:hover {
          background-color: var(--dark-3);
          color: var(--dark-font-1);
        }
      }
    }
  }
  // 播放器工具栏
  .bilibili-player-video-sendbar {
    background-color: var(--dark-2)!important;
    .bilibili-player-video-inputbar {
      background-color: unset!important;
      .bilibili-player-video-inputbar-wrap {
        border-color: var(--dark-4)!important;
        background-color: var(--dark-4);
      }
      .bilibili-player-video-danmaku-input {
        color: var(--dark-font-1)!important;
      }
    }
  }
  
  // 交互栏
  #arc_toolbar_report, #toolbar_module, #media_module, .main-container .review-module {
    border-color: var(--dark-1)!important;
    .more-ops-list {
      background-color: var(--dark-1)!important;
      border-color: var(--dark-1)!important;
      box-shadow: unset!important;
      color: var(--dark-font-1)!important;
      li:hover {
        background-color: var(--dark-3)!important;
      }
    }
    .media-desc i {
      background-color: var(--dark-1);
    }
  }
  .media-tool-bar {
    .btn-rating {
      background-color: var(--dark-1);
      border-color: var(--dark-1);
    }
  }
  
  // 活动
  #activity_vote .inside-wrp {
    border-color: var(--dark-1);
        background-color: var(--dark-1);
    .left {
      color: var(--dark-font-1);
    }
  }
  
  // 评价
  #review_module {
    border-color: var(--dark-1)!important;
    .review-list .review-item .review-body {
      background-color: var(--dark-1)!important;
     .review-header .review-author, .review-title {
        color: var(--dark-font-1)
     }
     .review-content {
       color: var(--dark-font-1)!important;
     }
    }
  }
  
  // 承包榜
  #sponsor_module {
    border-color: var(--dark-1)!important;
    .sponsor-rank-header {
      h3, .sponsor-rank-tab li {
        color: var(--dark-font-1)!important;
      }
    }
    .sponsor-rank-item {
      .sp-right .sp-msg {
        color: var(--dark-font-1)!important;
        border-color: var(--dark-1)!important;
        background-color: var(--dark-1)!important;
      }
    }
  }
  
  // 评论区
  #comment .b-head span{
    color: var(--dark-font-1);
  }
  #comment_module, #comment {
    border-color: var(--dark-1)!important;
    .b-head span{
      color: var(--dark-font-1);
    }
    .textarea-container textarea, .textarea-container:hover textarea {
      background-color: var(--dark-1);
      border: 1px solid var(--dark-1);
      color: var(--dark-font-1);
    }
    .comment-emoji {
      border: 1px solid var(--dark-1);
      background-color: var(--dark-1);
    }
    .emoji-box {
      //background: var(--dark-1);
      border: 1px solid var(--dark-1);
      .emoji-wrap {
        
      }
    }
    .paging-box {
      .dian, .next, .prev, .tcd-number {
        color: var(--dark-font-1);
      }
    }
  }
  
  .comment-header {
    border-color: var(--dark-1)!important;
    .tabs-order li:not(.on):not(:hover) {
      color: var(--dark-font-1)!important;
    }
  }
  .opera-list {
    background-color: var(--dark-1)!important;
    border-color: var(--dark-1)!important;
    box-shadow: unset!important;
    color: var(--dark-font-1)!important;
    li:hover {
      background-color: var(--dark-3)!important;
    }
  }
  .bb-comment {
    background-color: unset!important;
    .header-page .result, .header-page a.tcd-number, .header-page span.dian {
      color: var(--dark-font-1);
    }
    .comment-list {
      .hot-line {
        border-color: var(--dark-1);
        span {
          background: var(--dark-1);
          color: var(--dark-font-1);
          a:hover {
            background: var(--dark-3);
          }
        }
      }
      .list-item .con {
        border-color: var(--dark-1)!important;
        .text {
          color: var(--dark-font-1);
        }
        .info .reply:hover {
          background: var(--dark-1);
        }
        .reply-box{
          .reply-item .reply-con {
            .user .text-con {
              color: var(--dark-font-1);
            }
            .info .reply:hover {
              background: var(--dark-1);
            }
          }
          .view-more .btn-more:hover {
            background: var(--dark-1);
          }
        }
      }
    }
  }
  // 右侧视频推荐区
  #recom_module {
    .recom-title, .recom-item .info-wrapper a{
      color: var(--dark-font-0);
      font-weight: 400;
    }
    .expand-more {
      background-color: var(--dark-1);
      color: var(--dark-font-1);
    }
  }
  #reco_list {
    .rec-title,
    .rec-list .card-box .info .title {
      color: var(--dark-font-1);
    }
    .rec-footer {
      background-color: var(--dark-1);
    }
  }
  // 番剧剧集信息
  #seasonlist_module {
    .series-title {
      color: var(--dark-font-1);
    }
    .ss-list-wrapper .ss-item .ss-info .ss-title {
      color: var(--dark-font-1);
    }
    .expand-more {
      background-color: var(--dark-1);
      color: var(--dark-font-1);
    }
  }
  
  // up信息
  #v_upinfo .u-info .name .username{
    color: var(--dark-font-1);
  }
  // 直播推荐 
  #live_recommand_report .pl__card {
    border-color: var(--dark-1);
    background-color: var(--dark-1);
    .pl__info .pl__title {
      color: var(--dark-font-1);
    }
  }
`;

class VideoDarkMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {},
        };
        this.isOldPageOrWatchLater = !!document.querySelector('#__bofqi,.view-later-module, #bangumi_detail');
    }

    componentDidMount() {
        chrome.runtime.sendMessage({
            command: 'getSetting',
            feature: 'videoDarkMode',
        }, (settings) => {
            this.setState({settings});
        });
    }

    handleOnClick = () => {
        const {on} = this.state.settings;
        this.setState({settings: {...this.state.settings, on: !on}});
        chrome.runtime.sendMessage({
            command: 'setSetting',
            feature: 'videoDarkMode',
            settings: {...this.state.settings, on: !on},
        });
        chrome.runtime.sendMessage({
            command: 'setGAEvent',
            action: 'click',
            category: 'videoDarkMode',
            label: 'videoDarkMode',
        });
    };

    render() {
        const {on} = this.state.settings;
        return (
            <React.Fragment>
                <VideoDarkModeButton onClick={this.handleOnClick} on={on && !this.isOldPageOrWatchLater}>夜间模式</VideoDarkModeButton>
                {on && !this.isOldPageOrWatchLater && <VideoDarkModeStyle/>}
            </React.Fragment>
        );
    }
}

export class VideoDarkModeUI extends UI {
    constructor() {
        super({
            name: 'videoDarkMode',
            dependencies: ['videoAnchor'],
        });
    }

    load = ([container], {on}) => {
        return new Promise((resolve) => {
            const wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilibili-helper-video-dark-mode');
            wrapper.setAttribute('style', 'position: static; margin: 0;');
            container.append(wrapper);
            ReactDOM.render(<VideoDarkMode on={on}/>, wrapper, () => resolve(wrapper));
        });
    };
}
