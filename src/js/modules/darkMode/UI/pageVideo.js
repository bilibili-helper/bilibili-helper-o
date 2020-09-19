import {createGlobalStyle} from "styled-components";
import {CommentMain} from "Modules/darkMode/UI/cardMain";

const VideoPlayDarkModeStyle = createGlobalStyle`
    // 播放器mini窗口
    #bofqi.mini-player:before {
      box-shadow: #000000 0 0 8px;
    }
    
    // 视频信息
    #v_desc {
      .info {
        color: #879199;
      }
    }
    // 创作团队
    .members-info {
      .members-info__header {
        background-color: var(--dark-1);
        .title, .btn {
          color: var(--dark-font-1);
        }
      }
      .up-card {
        .avatar .info-tag {
          background-color: var(--dark-4)!important;
        }
        .avatar-name {
          color: var(--dark-font-0);
        }
        .attention {
          background-color: var(--dark-5)!important;
        }
      }
    }
    // up信息
    .up-info {
      .btn .b-cd {
        background: var(--dark-3)!important;
      }
      .up-info_right .name {
        .username {
          color: var(--dark-font-0);
        }
        .message {
          color: var(--dark-font-1);
        }
      }
      .btn-panel .following {
        background-color: var(--dark-5);
        border-color: var(--dark-5);
      }
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
    .main-container .media-info .media-right .media-tool-bar {
      .btn-rating {
        background-color: var(--dark-5);
        border-color: var(--dark-5);
        color: var(--dark-font-1)!important;
        &:hover {
          background-color: var(--dark-4);
        }
      }
      .btn-follow.active {
        background-color: var(--dark-5)!important;
      }
      .bangumi-options .opt-list {
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
    #member-container {
      .up-card {
        .info-name {
          color: #c7c7c7;
        }
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
    .danmaku-wrap {
      background: #191919!important;
      color: var(--dark-font-1)!important;
      .player-auxiliary-area {
        .player-auxiliary-danmaku-wrap, .player-auxiliary-danmaku-btn-history, .player-auxiliary-danmaku-btn-footer {
          background: #191919!important;
        }
      }
      .player-auxiliary-danmaku-contaner {
        .player-auxiliary-danmaku-load-status {
          background: #191919!important;
          color: #fff;
        }
      }
    }
    .player-auxiliary-area {
      background: #191919!important;
    }
    .danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-wrap .bscroll-vertical-scrollbar {
      background-color: black !important;
    }
    .danmaku-info-row {
      .danmaku-info-danmaku, span {
        color: var(--dark-font-1)!important;
      }
      &.danmaku-info-row-block {
        opacity: 0.3!important;
      }
    }
    // 弹幕列表管理菜单
    .danmaku-wrap .player-auxiliary-area .player-auxiliary-danmaku-management {
      background-color: var(--dark-3)!important;
      & > * {
        border-color:  var(--dark-1)!important;
      }
      .player-auxiliary-danmaku-wrap .player-auxiliary-danmaku-load-status {
        background: transparent !important;
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
      .list-wrapper.simple li {
        width: 64px;
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
    .bilibili-player {
      background: unset!important;
    }
    .bilibili-player-video-bottom-area {
      :before {
        background: var(--dark-2)!important;
      }
    }
    .bilibili-player-video-sendbar {
      background: transparent!important;
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
      .bilibili-player-video-sendbar-left, .bilibili-player-video-sendbar-right {
        background-color: var(--dark-1)!important;
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
      .right .inside-bg:before {
        background-image: linear-gradient(90deg,var(--dark-1),transparent 30%);
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
    
    // 右侧视频推荐区
    #recom_module {
      .recom-title, .recom-list .video-title {
        color: var(--dark-font-3);
      }
      .expand-more {
        background-color: var(--dark-1);
        color: var(--dark-font-1);
      }
    }
    #reco_list {
      .rec-title {
        color: var(--dark-font-3);
      }
      .rec-list .card-box {
        .pic-box {
          background: var(--dark-1)!important;
        }
        .info .title {
          color: var(--dark-font-3);
        }
      }
      a:hover {
        color: #00a1d6!important;
      }
      .rec-footer {
        background-color: var(--dark-1);
      }
    }
    // 番剧剧集信息
    #seasonlist_module {
      .series-title, .ss-list-wrapper .ss-item .ss-info .ss-title {
        color: var(--dark-font-3);
      }
      .ss-list-wrapper .ss-item .ss-info {
        .ss-title {
          color: var(--dark-font-3);
        }
        .pub-info {
          color: var(--dark-font-3);
        }
      }
      .expand-more {
        background-color: var(--dark-1);
        color: var(--dark-font-1);
      }
    }
    // 直播推荐 
    #live_recommand_report .pl__card {
      border-color: var(--dark-1);
      background-color: var(--dark-1);
      .pl__info .pl__title {
        color: var(--dark-font-1);
      }
    }
    // 侧边按钮
    .float-nav .nav-menu .item, .main-container .nav-tools .tool-item {
      background-color: var(--dark-4);
      border-color: var(--dark-4);
    }
    //投币弹出
    .coin-operated-m {
      background-color: var(--dark-3);
      .coin-title, .like-checkbox {
        color: var(--dark-font-0);
      }
    }
    //收藏弹出
    .collection-m {
      background-color: var(--dark-3);
      .title {
        border-color: var(--dark-1)!important;
        color: var(--dark-font-0)!important;
      }
      .content .group-list {
        li .fav-title {
          color: var(--dark-font-0);
        }
        ul .collection-mask {
          background-color: unset!important;
        }
      }
      .add-group {
        .add-btn {
          color: var(--dark-font-1)!important;
          border-color: var(--dark-1)!important;
        }
        .input-group {
          background-color: var(--dark-2)!important;
          input {
            background: var(--dark-2)!important;
            border-color: var(--dark-1)!important;
            color: var(--dark-font-0);
          }
          .submit {
            background: #d9f1f933!important;
          }
        }
      }
      .bottom {
        border-color: var(--dark-1)!important;
        .btn.disable {
          background-color: var(--dark-4)!important;
          border-color: var(--dark-4)!important;
          color: var(--dark-font-2)!important;
        }
      }
    }
    //转发弹出
    .video-toolbar .ops .share .share-pos {
      background-color: var(--dark-card)!important;
      border-color: var(--dark-card)!important;
      color: var(--dark-font-1);
      .box-a .share-down .share-btn {
        color: var(--dark-font-1);
      }
      .share-address .t {
        color: var(--dark-font-3);
      }
      .box-b {
        border-color: var(--dark-6)!important;
      }
    }
    
    //评论区
    #comment_module, #comment .common{
      border-color: var(--dark-1)!important;
      .b-head {
        color: var(--dark-font-1);
      }
    }
    .comm, .comment {
        ${CommentMain}
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
        .comment-emoji {
          border: 1px solid var(--dark-1)!important;
          background-color: var(--dark-1)!important;
        }
      }
    `;

export {VideoPlayDarkModeStyle};