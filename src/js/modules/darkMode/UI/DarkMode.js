/**
 * Author: Cotch22
 * Create: 2020/7/26
 * Description:
 */

import React from 'react';
import {createGlobalStyle} from 'styled-components';
import {getURL} from 'Utils/functions';

//输入框复用
const InputMain = `
    .textarea-container {
      textarea {
        background-color: var(--dark-1)!important;
        border-color: var(--dark-1)!important;
        color: var(--dark-font-1)!important;
      }
      &:hover textarea, &.focus textarea {
        color: var(--dark-font-0)!important;
      }
    }
    
    .emoji-box {
      background: var(--dark-1)!important;
      border-color: var(--dark-1)!important;
      box-shadow: 0 11px 12px 0 var(--dark-1)!important;
      .emoji-text {
        color: var(--dark-font-1)!important;
      }
      .emoji-text:hover {
        background-color: var(--dark-3)!important;
      }
      .emoji-notice {
        background-color: var(--dark-1)!important;
        border-color: var(--dark-1)!important;
        color: var(--dark-font-1)!important;
      }
      .emoji-tabs {
        background: var(--dark-3)!important;
        .tab-link.on {
          background: var(--dark-1)!important;
        }
        .tab-link:hover {
          background: var(--dark-4)!important;
        }
        .emoji-tab-slider {
          .prev {
            background-image: url(https://static.hdslb.com/phoenix/dist/images/left-arrow.svg)!important;
          }
          .next {
            background-image: url(https://static.hdslb.com/phoenix/dist/images/right-arrow.svg)!important;
          }
          .prev.on {
            background-image: url(https://static.hdslb.com/phoenix/dist/images/left-arrow-disable.svg)!important;
          }
          .next.on {
            background-image: url(https://static.hdslb.com/phoenix/dist/images/right-arrow-disable.svg)!important;
          }
        }
      }
    }
  `;

//评论复用
const CommentMain = `
    .bb-comment {
      background-color: unset!important;
      .comment-header {
        border-color: var(--dark-2)!important;
        .tabs-order li {
          color: var(--dark-font-0);
        }
      }
      .comment-send .comment-emoji {
        border: 1px solid var(--dark-1);
        background-color: var(--dark-1);
      }
      .comment-list .list-item {
        .user-face .hot-follow .follow-btn.followed {
          background-color: var(--dark-5);
          color: var(--dark-font-2);
        }
        .con {
          border-color: var(--dark-1)!important;
          .user .name {
            color: var(--dark-font-1);
          }
          .text {
            color: var(--dark-font-0);
          }
          .info {
            .reply:hover {
              background: var(--dark-1);
            }
            .reply-tags span {
              background-color: var(--dark-1);
              color: var(--dark-font-1);
            }
            .operation .opera-list {
              background-color: var(--dark-3);
              color: var(--dark-font-0);
              li:hover {
                background-color: var(--dark-2);
              }
            }
          }
          .reply-box {
            .reply-item .reply-con {
              .user .text-con {
                color: var(--dark-font-0);
              }
              .info .reply:hover {
                background: var(--dark-1);
              }
            }
            .view-more {
              color: var(--dark-font-1);
              .btn-more:hover {
                background: var(--dark-1);
              }
            }
          }
          .paging-box {
            span.result, span.dian {
              color: var(--dark-font-1);
            }
            a.tcd-number, a.next, a.prev {
              color: var(--dark-font-1);
              &:hover {
                color: #00a1d6;
              }
            }
          }
        }
      }
      .bottom-page.center {
        border-color: var(--dark-2)!important;
      }
    }
  `;

//动态复用
const DynamicMain = `
    //文字
    .text-area .view-danmaku {
      color: var(--dark-font-2)!important;
    }
    
    .text-area .content {
      color: var(--dark-font-1)!important;
    }
    
    .text-area .title {
      color: var(--dark-font-0)!important;
    }
    
    //话题标签
    .new-topic-panel .tag-item .label {
      background: var(--dark-3)!important;
    }
    
    //关注的人点赞
    .like-users-panel::before {
      background: var(--dark-1)!important;
    }
    .like-users-panel {
      color: var(--dark-font-2)!important;
      .users-box {
        color: var(--dark-font-1)!important;
      }
    }
    .users-box .like-users-list:link, .users-box .like-users-list:visited {
      color: var(--dark-font-1);
    }
    
    //Card按钮
    .card .more-panel {
      background: var(--dark-3)!important;
      color: var(--dark-font-0)!important;
      border-color: var(--dark-3)!important;
      -webkit-box-shadow: 0 11px 12px 0 var(--dark-3)!important;
      box-shadow: 0 11px 12px 0 var(--dark-3)!important;
      &:after {
        background: var(--dark-3)!important;
        border-color: var(--dark-3)!important;
      }
    }
    
    //视频Card, 番剧Card, 文章Card
    .video-container, .bangumi-container, .article-container, .live-container {
      border-color: var(--dark-3)!important;
      background: var(--dark-4)!important;
    }
    
    //转发Card
    .repost {
      background: var(--dark-3)!important;
    }
    
    //图片预览Card
    .imagesbox .boost-control, .imagesbox .boost-img {
      background: var(--dark-3)!important;
    }
    
    //活动Card, 投票Card, 音乐Card
    .h5share-container, .vote-container, .music-container {
      border-color: var(--dark-3)!important;
    }
    
    //Card阴影
    .article-container:hover, .vote-container:hover, .h5share-container:hover, .music-container:hover {
      .text-area {
        -webkit-box-shadow: 0 3px 10px 0 var(--dark-3)!important;
        box-shadow: 0 3px 10px 0 var(--dark-3)!important;
      }
    }
    
    //相关作品
    .shop-panel {
      .shop-list {
        background: var(--dark-3)!important;
      }
    }
    
    //表情按钮
    .comm-emoji {
      border-color:  var(--dark-1)!important;
      background-color: var(--dark-1)!important;
    }
    
    //评论转发
    .panel-area {
      .forw-area {
        background-color: unset!important;
      }
      ${CommentMain}
    }
    
    //弹出框
    .bp-popup-panel {
      background: var(--dark-4)!important;
      .title-ctnr .popup-title, .popup-content-ctnr {
        color: var(--dark-font-0)!important;
      }
    }
    
    .dynamic-list-item-wrap, .forw-more {
      border-color: var(--dark-2)!important;
    }
    
    ${InputMain}
  `;

const DarkModeStyle = createGlobalStyle`
    html {
      --dark-0: #101010;
      --dark-1: #141414;
      --dark-2: #131313;
      --dark-3: #1f1f1f;
      --dark-4: #2b2b2b;
      --dark-5: #333333;
      --dark-card: #131313;
        
      --dark-font-0: #e8e8e8;
      --dark-font-1: #99a2aa;
      --dark-font-2: #879199;
    }
    
    body {
      background-color: #1c2022!important;
    }
  `;

// 导航栏
const TopBarDarkModeStyle = createGlobalStyle`
    #internationalHeader.international-header {
      .mini-type {
        background: var(--dark-0)!important;
      }
      .link {
        color: var(--dark-font-1)!important;
      }
      
      .nav-user-center { // 右侧用户内容导航
        .item {
          .name, .t a {
            color: var(--dark-font-1)!important;
          }
        }
      }
      
      // 搜索框
      #nav_searchform {
        background: var(--dark-3)!important;
        border-color: var(--dark-3)!important;
        input:focus {
          color: #ffffff;
        }
      }
      .nav-search-btn { // 搜索按钮
        background: var(--dark-4);
      }
      
      .bilibili-search-history, .bilibili-search-suggest {
        background: var(--dark-0)!important;
        border-color: var(--dark-1)!important;
        
        li {
          &:hover {
            background-color: var(--dark-2);
          }
          a {
            color: var(--dark-font-1)!important;
          }
        }
      }
    }
    //弹出Popper
    .channel-menu-mini, .van-popper-avatar, .van-popper-avatar .level-intro, .van-popper-avatar .coins .info .login-award,
    .van-popper-vip, .van-popper-favorite, .van-popper-favorite .view-all, .van-popper-favorite .play-all, .van-popper-history, .van-popper-upload {
      background-color: var(--dark-card)!important;
    }
    
    //文字 轻
    .van-popper-avatar .level-info .progress, .van-popper-avatar .count-item .item-key,
    .van-popper-favorite .tab-item--normal, .van-popper-favorite .tab-item--normal .num, .van-popper-favorite .empty-list,
    .header-video-card .video-info .info,
    .van-popper-history .tab-item,
    .van-popper-history .date-title {
      color: var(--dark-font-1)!important;
    }
    
    //文字 重
    .van-popover a,
    .van-popper-avatar .level-info .grade, .van-popper-avatar .level-intro, .van-popper-avatar .coins, .van-popper-avatar .logout, .van-popper-avatar .count-item .item-value, .van-popper-avatar .links .link-title,
    .vip-m .bubble-traditional .recommand .title,
    .van-popper-favorite .view-all, .van-popper-favorite .play-all,
    .header-video-card .video-info .line-2,
    .van-popper-history .tab-item.tab-item--active,
    .van-popper-history .tab-item.tab-item--active:hover {
      color: var(--dark-font-0)!important;
    }
    
    //框线
    .van-popper-avatar .coins,
    .van-popper-avatar .counts,
    .van-popper-avatar .links,
    .channel-menu-mini .r-box,
    .van-popper-favorite .tabs-panel,
    .van-popper-favorite .play-all,
    .van-popper-history .tab-header {
      border-color: var(--dark-1)!important;
    }
    
    //hover蓝
    .van-popper-avatar .coins .info a:hover,
    .van-popper-avatar .counts .count-item:hover .item-key,
    .van-popper-avatar .counts .count-item:hover .item-value .item-num,
    .van-popper-avatar .level-intro__link,
    .van-popper-history .tab-item:hover {
      color: #00A1D6!important;
    }
    
    //hover深
    .channel-menu-mini .box a:hover,
    .van-popper-avatar .links .link-item:hover,
    .van-popper-avatar .logout a:hover,
    .van-popper-favorite .tab-item--normal:hover,
    .van-popper-favorite .view-all:hover,
    .van-popper-favorite .play-all:hover,
    .header-video-card:hover,
    .van-popper-upload .upload-item:hover {
      background: var(--dark-3)!important;
    }
    
    //经验条
    .van-popper-avatar .level-bar {
      background: var(--dark-0)!important;
    }
    
    //Card顶上的小尖尖
    .van-popper {
      .popper__arrow, .popper__arrow::after {
        border-color: var(--dark-3)!important;
      }
    }
    
    //下载App
    .popover-app-download {
      background: url(${getURL('/statics/imgs/app-download.png')})!important;
      background-size: cover!important;
      .txt {
        color: var(--dark-font-0)!important;
      }
    }
  `;

//底栏
const FooterDarkModeStyle = createGlobalStyle`
    .international-footer {
      background-color: #1c2022!important;
      .link-box .link-item {
        border-color: var(--dark-1);
        .bt {
          color: var(--dark-font-2);
        }
      }
      .link-box .link-item.link-c p, .link-box .link-item.link-c a.weixin:hover p,
      a, .partner, .partner a {
        color: var(--dark-font-0);
      }
    }
  `;

//评论区
const CommentDarkModeStyle = createGlobalStyle`
    .comment-title-block span {
      color: var(--dark-font-1);
    }
    
    ${CommentMain}
    .bb-comment {
      .header-page {
        .result, span.dian, a.tcd-number, a.next, a.prev {
          color: var(--dark-font-1);
        }
      }
      .paging-box-big {
        a.tcd-number, a.next, a.prev {
          color: var(--dark-font-1);
          background-color: var(--dark-2);
          border-color: var(--dark-3);
          &:hover {
            color: white;
            background-color: #00a1d6;
            border-color: var(--dark-3);
          }
        }
        .dian, .dian:hover {
          color: var(--dark-font-1);
          background-color: #1c2022;
          border-color: #1c2022;
        }
        .page-jump {
          input {
            border-color: var(--dark-3);
            background-color: var(--dark-2);
            color: white;
          }
        }
      }
    }
    
    ${InputMain}
  `;

//用户卡片popper
const UserPopperDarkModeStyle = createGlobalStyle`
    .user-card, .userinfo-content {
      background: var(--dark-3)!important;
      color: var(--dark-font-2)!important;
      .face {
        border-color: var(--dark-3)!important;
      }
      .btn-box {
        a.like {
          color: #fff!important;
          border-color: #00a1d6!important;
          background-color: #00a1d6!important;
        }
        a.like:hover {
          border-color: #00b5e5!important;
          background-color: #00b5e5!important;
        }
        a, a.liked {
          background: var(--dark-5)!important;
          color: var(--dark-font-1)!important;
          border-color: var(--dark-5)!important;
        }
        a:hover, a.liked:hover {
          background: var(--dark-4)!important;
        }
      }
      .info .user .name {
        color: var(--dark-font-2)!important;
      }
      .info .user .name.vip {
        color: #fb7299!important;
      }
    }
    
    .user-card, .userinfo-wrapper {
       border-color: var(--dark-3)!important;
    }
    
    .nameplate-card {
     background: var(--dark-3)!important;
     border-color: var(--dark-3)!important;
     .nameplate-text {
       border-color: var(--dark-1)!important;
       .n-name, .n-title {
         color: var(--dark-font-0)!important;
       }
     }
  `;

//动态页
const DynamicDarkModeStyle = createGlobalStyle`
    //底层背景
    #app, .fixed-bg {
      background: none!important;
    }
    
    //所有Card背景
    .user-panel, .live-panel, .section-block, .publish-panel, .core-style, .most-viewed-panel, .tab-bar, .card, .notice-panel, .new-topic-panel {
      background: var(--dark-card)!important;
    }
    
    //特殊背景
    .bg-white {
      background: var(--dark-card)!important;
    }
    
    .live-panel-item .live-up-img {
      background-color: var(--dark-card)!important;
      border-color: var(--dark-3)!important;
    }
    
    .notice-panel .img-container .notice-img {
      background-color: var(--dark-card)!important;
    }
    
    .dynamic-link-hover-bg:hover {
      background: var(--dark-0)!important;
    }
    
    //文字 轻
    .tc-slate, .time, .live-name, .count, .dynamic-repost, .shop-desc .desc-box .sub-title {
      color: var(--dark-font-2)!important;
    }
    
    //文字 中
    .most-viewed-item .name, .tag-item .label, .imagesbox .boost-control li, .shop-panel .panel-desc {
      color: var(--dark-font-1)!important;
    }
    
    //文字 重
    .tc-black, .numbers, .up-name, .user-name, .user-name a, .text .content, .tag-item .content, .item-detail .text, .core-style, .shop-desc .desc-box .title {
      color: var(--dark-font-0)!important;
    }
    
    //大会员修正
    .user-name.big-vip a {
      color: #fb7299!important;
    }
    
    //hover蓝
    .imagesbox .boost-control li:hover {
      color: #23ade5!important;
    }
    
    .live-panel .more-button .more:hover,
    .most-viewed-panel .list-content .most-viewed-item .name.active,
    .most-viewed-panel .list-content .most-viewed-item:hover .name,
    .tab-bar .tab .tab-text.selected,
    .tab-bar .tab .tab-text:hover {
      color: #00b5e5!important;
    }
    
    .user-panel .content .bottom .number-part:hover .numbers,
    .new-topic-panel .tag-item .content:hover,
    .video-container.can-hover:hover .text-area .title,
    .bangumi-container.can-hover:hover .text-area .title,
    .article-container:hover .text-area .title,
    .vote-container:hover .text-area .text-content {
      color: #00a1d6!important;
    }
    
    //新动态
    .new-notice-bar {
      background: #cdcbb0!important;
      .message {
        color: #f39c12!important;
      }
    }
    
    //展开相关动态 
    .fold-box {
      border-color: var(--dark-1)!important;
    }
    
    //常看列表
    .card-list .most-viewed-panel .list-content .most-viewed-item .section {
      .icon-all, .avatar {
        border-color: var(--dark-card);
        -webkit-box-shadow: 0 0 0 1px var(--dark-card);
        box-shadow: 0 0 0 1px var(--dark-card);
        .active {
          -webkit-box-shadow: 0 0 0 1px #00a1d6!important;
          box-shadow: 0 0 0 1px #00a1d6!important;
        }
      }
    }
    
    ${DynamicMain}
  `;

//专栏阅读页
const ReadCVDarkModeStyle = createGlobalStyle`
    .page-container, .article-action .more .more-ops-list {
      background: unset!important;
    }
    
    //文字 轻
    .up-info-right-block .fans-num, .up-info-right-block .view-num .follow-btn-holder .follow-btn.followed, .rightside-article-list-btn .title, .article-item .article-title .info, .more .info, .right-side-bar .to-comment .comment-num, .article-list-plane .button .title {
      color: var(--dark-font-2)!important;
    }
    
    //文字 中
    .article-action, .article-action .ops i, .article-action .more .more-ops-list {
      color: var(--dark-font-1)!important;
    }
    
    //文字 重
    .nav-tab-bar .tab-item, .follow-btn-holder .follow-btn, .up-info-right-block .up-name, .rightside-article-list-btn .label, .up-article-list-block .block-title, .article-item .article-title, .more .top-bar, .more .title,
    .title-container .title, .article-holder, .article-holder h1, .article-list-plane .button .label {
      color: var(--dark-font-0)!important;
    }
 
    //hover蓝
    .nav-tab-bar .tab-item.on, .nav-tab-bar .tab-item:hover, .article-item .article-title:hover, .more .title:hover,
    .article-action .ops .on, .article-action .ops .on i, .article-action .ops i:hover,
    .article-action .ops .coin-btn:hover, .article-action .ops .fav-btn:hover, .article-action .ops .like-btn:hover,
    .article-action .ops .coin-btn:hover i, .article-action .ops .fav-btn:hover i, .article-action .ops .like-btn:hover i {
      color: #00a1d6!important;
    }
    
    //框线
    .up-article-list-block .block-title, .more .top-bar, .article-action {
      border-color: var(--dark-1)!important;
    }
    
    //关注按钮
    .follow-btn-holder .follow-btn.followed, .follow-btn-holder .follow-btn.followed:hover {
      background-color: var(--dark-5)!important;
      border-color: var(--dark-5)!important;
    }
    
    .follow-btn-holder .follow-btn {
      background-color: #00a1d6!important;
      border-color: #00a1d6!important;
    }
    
    .follow-btn-holder .follow-btn:hover {
      background-color: #00b5e5!important;
      border-color: #00b5e5!important;
    }
    
    //文章目录
    .rightside-article-list-btn {
      background-color: var(--dark-5)!important;
      border-color: var(--dark-5)!important;
      &:hover {
        background-color: var(--dark-card)!important;
        border-color: var(--dark-card)!important;
      }
      .icon-list {
        background-image: url(${getURL('/statics/imgs/article-list.png')})!important;
      }
    }
    
    .article-list-plane {
      background-color: var(--dark-5)!important;
      border-color: var(--dark-5)!important;
      .button:hover {
        background-color: var(--dark-card)!important;
        border-color: var(--dark-card)!important;
      }
    }
    
    //更多按钮
    .up-info-holder .fixed-box .up-article-list-block .more-article {
      background-color: var(--dark-5);
      border-color: var(--dark-5);
      color: var(--dark-font-0);
    }

    //帮助按钮修正
    .up-info-holder .fixed-box .more .help .icon {
      background-image: url(${getURL('/statics/imgs/read-help.png')});
    }
    
    //游戏按钮修正
    .nav-tab-bar .tab-item[data-tab-id="1"]:before {
      background-image: url(${getURL('/statics/imgs/read-game.png')});
    }
    
    // 侧边按钮
    .right-side-bar .to-comment, .right-side-bar .to-top, .right-side-bar .to-comment .comment-num {
      background-color: var(--dark-card)!important;
      border-color: var(--dark-card)!important;
    }
  `;

//消息页
const MessageDarkModeStyle = createGlobalStyle`
    html {
      background: url(//s2.hdslb.com/bfs/static/blive/blfe-message-web/static/img/infocenterbg.a1a0d152.jpg) top/cover no-repeat fixed;
      body {
        background: #1c2022d9!important;
      }
    }
    //左栏
    .space-left {
      background-color: #1f1f1fcc!important;
      .side-bar {
        .title {
          color: var(--dark-font-0);
          .icon {
            background-image: url(${getURL('/statics/imgs/message-plane.png')});
          }
        }
        .item {
          color: var(--dark-font-1);
          &:hover, &.active{
            color: #2faee3;
          }
        }
        .divided-line {
          border-color: var(--dark-1);
        }
      }
    }
    
    //右栏
    .space-right {
      background-color: #1f1f1f80!important;
      .space-right-top {
        .title {
          background-color: var(--dark-card)!important;
          color: var(--dark-font-1)!important;
          -webkit-box-shadow: 0 2px 4px 0 #1313138a!important;
          box-shadow: 0 2px 4px 0 #1313138a!important;
        }
        .group-helper-msg-list {
          background-color: var(--dark-card)!important;
          -webkit-box-shadow: 0 2px 4px 0 #1313138a!important;
          box-shadow: 0 2px 4px 0 #1313138a!important;
          .tab-list {
            color: var(--dark-font-1)!important;
            .tab-item.active[data-v-29e10985]::before {
              background-color: var(--dark-card)!important;
            }
          }
          .nothing {
            color: var(--dark-font-2)!important;
          }
          .name-box {
            .name {
              color: var(--dark-font-0)!important;
            }
            .status {
              color: var(--dark-font-2)!important;
            }
          }
          &::after {
            background-color: var(--dark-card)!important;
          }
        }
      }
      .space-right-bottom {
        .card {
          background-color: var(--dark-card)!important;
          -webkit-box-shadow: 0 2px 4px 0 #1313138a!important;
          box-shadow: 0 2px 4px 0 #1313138a!important;
          .loading .link-progress-tv {
            background-color: unset!important;
          }
          .line-1 {
            color: var(--dark-font-1)!important;
            .name-field {
              color: var(--dark-font-0)!important;
            }
          }
          .line-2 {
            color: var(--dark-font-0)!important;
            .orginal-reply {
              border-color: var(--dark-1)!important;
              color: var(--dark-font-2)!important;
            }
          }
          .line-3 {
            color: var(--dark-font-2)!important;
          }
          .text-box {
            color: var(--dark-font-2)!important;
          }
          .reply-box {
            textarea {
              background-color: var(--dark-1);
              border-color: var(--dark-1);
              color: var(--dark-font-1);
            }
            &:hover textarea {
              color: var(--dark-font-0);
            }
          }
          .divider, div::after {
            border-color: var(--dark-1)!important;
          }
          //系统通知
          &.system-item {
            .title {
              color: var(--dark-font-0);
            }
            .time {
              color: var(--dark-font-1);
            }
            .bottom {
              color: var(--dark-font-2);
            }
          }
          //私信存档
          &.whisper {
            .list {
              border-color: var(--dark-1);
              .list-title {
                color: var(--dark-font-0);
                border-color: var(--dark-1);
              }
              .list-content .list-item {
                border-color: var(--dark-1);
                .name {
                  color: var(--dark-font-0);
                }
                .last-word {
                  color: var(--dark-font-2);
                }
                &.active, &:hover {
                  background-color: var(--dark-3)!important;
                }
              }
            }
            .dialog {
              .title {
                color: var(--dark-font-0);
                border-color: var(--dark-1);
              }
              .message-list {
                background-color: var(--dark-3)!important;
                .msg-item .message {
                  color: var(--dark-font-0);
                  .message-content {
                    background-color: var(--dark-4)!important;
                    &.is-me {
                      background-color: #6f9dca!important;
                    }
                  }
                }
              }
            }
          }
        }
        //我的消息
        .bili-im {
          color: var(--dark-font-1);
          background-color: var(--dark-card)!important;
          -webkit-box-shadow: 0 2px 4px 0 #1313138a!important;
          box-shadow: 0 2px 4px 0 #1313138a!important;
          .left, .left .title {
            border-color: var(--dark-1);
          }
          .list {
            .list-item {
              .name {
                color: var(--dark-font-0);
              }
              .last-word {
                color: var(--dark-font-2);
              }
              &.active, &:hover {
                background-color: var(--dark-3)!important;
              }
            }
            .lds-spinner div:after {
              background-color: var(--dark-font-0)!important;
            }
          }
          .dialog {
            .title {
              color: var(--dark-font-0);
              border-color: var(--dark-1);
              .action-menu .menu-list {
                border-color: var(--dark-card);
                background-color: var(--dark-card)!important;
                -webkit-box-shadow: 0 6px 12px 0 var(--dark-card);
                box-shadow: 0 6px 12px 0 var(--dark-card);
                a {
                  color: var(--dark-font-0);
                  .tips {
                    color: var(--dark-font-2);
                  }
                  &:hover {
                    background-color: var(--dark-0)!important;
                  }
                }
                &:before {
                  border-color: var(--dark-card);
                  background-color: var(--dark-card)!important;
                }
              }
            }
            .message-list {
              background-color: var(--dark-3)!important;
              .msg-item .message {
                color: var(--dark-font-0);
                .message-content {
                  background-color: var(--dark-4)!important;
                  &.is-me {
                    background-color: #6f9dca!important;
                  }
                }
              }
            }
            .new-message-tip {
              .text, &::after {
                background-color: var(--dark-4)!important;
              }
            }
            .send-box {
              border-color: var(--dark-0);
              background-color: var(--dark-3)!important;
              .btn-box.send-btn {
                border-color: var(--dark-5)!important;
                background-color: var(--dark-5)!important;
                color: var(--dark-font-2)!important;
              }
              .input-box textarea {
                  color: var(--dark-font-0);
              }
            }
          }
        }
        //消息设置
        .config {
          color: var(--dark-font-0);
          background-color: var(--dark-card)!important;
          -webkit-box-shadow: 0 2px 4px 0 #1313138a!important;
          box-shadow: 0 2px 4px 0 #1313138a!important;
          .tip {
            color: var(--dark-font-2);
          }
          .config-item {
            .css-1xneiug {
              .content {
                fill: var(--dark-5);
              }
              .border {
                fill-opacity: 0.5;
              }
            }
            &::before {
              background: var(--dark-1)!important;
            }
          }
        }
      }
    }
  `;

//个人空间
const SpaceDarkModeStyle = createGlobalStyle`
    html {
      background: unset!important;
    }
    //文字 轻
    .n .n-data .n-data-k, .sec-empty-hint, .channel .empty-state p, .fav-item .state, .small-item .meta, .section.empty:after, .section .user-auth.no-auth .no-auth-title span,
    #page-fav .fav-sidenav .favlist-title, #page-fav .fav-sidenav .watch-later, #page-fav .fav-main .search-types, .favInfo-box .favInfo-details .fav-options .meta,
    .i-live .i-live-unfo-btn, .section .operation, #page-channel-detail .watch-later-btn {
      color: var(--dark-font-2);
    }
    
    //文字 中
    .private-hint, .i-m-btn, .user .info .meta .row, .tc-slate, #page-fav .fav-main .fav-action-bottom .select-counter, #page-fav .fav-main .fav-meta, #page-setting .setting-privacy-item .setting-privacy-switcher .be-switch-label,
    .i-live .i-live-fo-count {
      color: var(--dark-font-1);
    }
    
    //文字 重
    body, .n .n-data .n-data-v, .section-title, .large-item .title, .card .main-content .user-name a,
    #page-fav .fav-main .fav-action-top .back-to-info, #page-fav .fav-main .fav-action-bottom li, #page-fav .fav-main .fav-action-bottom li:hover,
    .article-title, #page-fav .fav-main .fav-content .fav-pugv-list .pugv-item .item-infos p.main-title,
    .sub-tabs span, .sub-tabs .filter-content {
      color: var(--dark-font-0);
    }
    
    //高优先
    .feed-title, .section .user-auth.no-auth .no-auth-title .goto-auth, #page-index .col-2 .section .user-auth .auth-description, .contribution-sidenav, .breadcrumb .item, .my-album .title, .fav-sidenav, .nav-title .text,
    #page-fav .fav-main .filter-item, #page-fav .fav-main .filter-item .filter-type .be-dropdown-item span, .favInfo-box .favInfo-details .fav-name, 
    .pgc-space-follow-item .pgc-item-info .pgc-item-title, .pgc-space-follow-item .pgc-item-info .pgc-item-desc,
    #page-setting .setting-privacy-item .setting-privacy-name, #page-index .channel.guest .channel-item .channel-title .channel-name, #page-index .album .content .album-wrapper .album-item .album-title {
      color: var(--dark-font-0)!important;
    }
    
    .pgc-space-follow-item .pgc-item-info .type-and-area, .pgc-space-follow-item .pgc-item-info .pgc-item-state {
      color: var(--dark-font-1)!important;
    }
    
    //Card背景 
    .h .h-forbid, .n .n-inner, .bg-white,
    #page-index .col-1, .col-2 .section,
    .feed-title,
    .card,
    .col-full,
    .channel-option.no-channel, .channel-add-video,
    #page-fav .fav-main .fav-action-bottom .fav-action-fixtop {
      background-color: var(--dark-card)!important;
    }
    
    //Card边框
    .col-1, .col-2 .section, .fav-covers,
    .card, 
    #page-fav .fav-main .small-item{
      border-color: var(--dark-card)!important;
    }
    
    //Card阴影
    .n .n-inner, .large-item .cover img, .mini-item .cover img, .col-full, .i-pin-c{
      box-shadow: 0 0 0 1px #1313138a!important;
    }
    
    //框线
    .section, .section-title, .i-pin-v .be-tab, .i-m-upload, .i-m-r2, .contribution-sidenav, .contribution-sidenav~.main-content,
    #page-myalbum .album-content, .filter, .channel-detail .channel-action-row .be-dropdown,
    #page-fav .fav-sidenav .nav-container, #page-fav .fav-sidenav .watch-later, #page-fav .fav-main .favList-info,
    #page-fav .fav-main .filter-item.search, #page-fav .fav-main .search-types, #page-fav .fav-main .fav-action-top .back-to-info, #page-fav .fav-main .fav-action-top,
    .article-content, .s-content, #page-setting .setting-index-container, #page-setting .setting-index-module,
    .i-live .i-live-unfo-btn, .i-live .i-live-fo-count, .section .operation, #page-index .channel .channel-item, #page-channel-detail .watch-later-btn {
      border-color: var(--dark-1)!important;
    }
    
    .my-album .line {
      background-color: var(--dark-1)!important;
    }
    
    //hover深
    #page-video #submit-video-type-filter,
    .contribution-sidenav .contribution-item:hover,
    #page-fav .fav-sidenav .fav-item:hover, #page-fav .fav-main .small-item:hover {
      background-color: var(--dark-3)!important;
    }
    
    //搜索
    .g-search input, #page-fav .fav-main .search-input input {
      background: var(--dark-card)!important;
      color: var(--dark-font-0);
    }
    .g-search input {
      border-color: var(--dark-1);
    }
    
    //置顶视频，代表作
    .list-create {
      background-color: unset!important;
      .text {
        color: var(--dark-font-1);
      }
    }
    
    //空收藏夹
    .fav-covers.empty {
      background-image: url(${getURL('/statics/imgs/playlistbg.png')})!important;
    }
    
    //角标
    .section .count {
      background-color: var(--dark-2)!important;
      border-color: var(--dark-1)!important;
      color: var(--dark-font-1);
      &:before {
        background: url(${getURL('/statics/imgs/count-before.png')})!important;
        left: -6px!important;
        top: -1px!important;
      }
    }
    
    //更多
    .section .more {
      border-color: var(--dark-5)!important;
      background-color: var(--dark-5)!important;
      color: var(--dark-font-1);
      background-position: -310px -404.5px!important;
      &:hover {
        background-position: -438px -404.5px!important;
      }
    }
    
    //公告
    #i-ann-content {
      textarea {
        background-color: var(--dark-1);
        border-color: var(--dark-1);
        color: var(--dark-font-1);
      }
      &:hover textarea, &.focus textarea {
        color: var(--dark-font-0);
      }
    }
    
    ${DynamicMain}
    
    //更多操作
    #page-channel-detail .channel-detail .channel-action-row .be-dropdown {
      border-color: var(--dark-5)!important;
      background-color: var(--dark-5)!important;
    }
    .be-dropdown {
      color: var(--dark-font-1);
      .be-dropdown-menu {
        background: var(--dark-3)!important;
        border-color: var(--dark-3)!important;
        box-shadow: 0 11px 12px 0 var(--dark-3)!important;
        li:hover {
          background-color: var(--dark-2)!important;
        }
        .be-dropdown-item {
          color: var(--dark-font-0);
          &.be-dropdown-item-delimiter {
            border-color: var(--dark-1)!important;
          }
        }
      }
      &.filter-item {
        color: var(--dark-font-0);
      }
      .icon-arrow {
        background-position: -1369px -215px;
      }
    }
    
    .album-card .btn {
      background: var(--dark-3)!important;
      border-color: var(--dark-3)!important;
      color: var(--dark-font-0)!important;
    }
    
    .pgc-space-follow-item .bangumi-options .opt-list {
      background: var(--dark-3)!important;
      border-color: var(--dark-3)!important;
      li {
        color: var(--dark-font-0)!important;
        &:hover {
          color: #00a1d6!important;
          background-color: var(--dark-2)!important;
        }
        &.disabled, &.disabled:hover {
          color: #666666!important;
        }
      }
    }
    
    //拖动排序
    #page-fav .fav-sidenav .icon-cursor {
      background-color: var(--dark-1)!important;
    }
    
    //分页
    .be-pager {
      li.be-pager-item, li.be-pager-prev, li.be-pager-next {
        color: var(--dark-font-1)!important;
        background-color: var(--dark-2);
        border-color: var(--dark-3);
        &:hover {
          a {
            color: var(--dark-font-0)!important;
          }
          background-color: #00a1d6;
          border-color: var(--dark-3);
        }
      }
      .be-pager-options-elevator input {
        border-color: var(--dark-3);
        background-color: var(--dark-2);
        color: var(--dark-font-0);
      }
    }
    
    .bangumi-pagelistbox {
       a.p, a.prev-page, a.next-page {
        color: var(--dark-font-1)!important;
        background-color: var(--dark-2);
        border-color: var(--dark-3);
        &:hover {
          a {
            color: var(--dark-font-0)!important;
          }
          background-color: #00a1d6;
          border-color: var(--dark-3);
        }
      }
      .custom-right .custom-right-inner.custompage {
        border-color: var(--dark-3)!important;
        background-color: var(--dark-2)!important;
        color: var(--dark-font-0)!important;
      }
    }
    
    //个人标签
    #page-setting {
      #setting-new-tag, #setting-new-tag-btn {
        border-color: var(--dark-3)!important;
        background: var(--dark-2)!important;
      }
      #setting-new-tag {
        color: var(--dark-font-0)!important;
      }
    }
`;

const StyleRender = (style) => {
    return (
        <React.Fragment>
            <DarkModeStyle/><TopBarDarkModeStyle/>{style}
        </React.Fragment>
    );
};

function DynamicDarkMode() {
    return StyleRender([<DynamicDarkModeStyle/>, <UserPopperDarkModeStyle/>]);
}

function ReadCVDarkMode() {
    return StyleRender([<ReadCVDarkModeStyle/>, <CommentDarkModeStyle/>, <UserPopperDarkModeStyle/>, <FooterDarkModeStyle/>]);
}

function MessageDarkMode() {
    return StyleRender([<MessageDarkModeStyle/>]);
}

function SpaceDarkMode() {
    return StyleRender([<SpaceDarkModeStyle/>]);
}

export {
    DynamicDarkMode,
    ReadCVDarkMode,
    MessageDarkMode,
    SpaceDarkMode,
}