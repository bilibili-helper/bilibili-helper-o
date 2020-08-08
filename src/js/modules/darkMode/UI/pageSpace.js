import {createGlobalStyle} from "styled-components";
import {getURL} from "Utils/functions";
import {DynamicMain} from "Modules/darkMode/UI/cardMain";

const SpaceDarkModeStyle = createGlobalStyle`
    html {
      background: unset!important;
    }
    //文字 轻
    .n .n-data .n-data-k, .sec-empty-hint, .channel .empty-state p, .fav-item .state, .small-item .meta, .section.empty:after, .section .user-auth.no-auth .no-auth-title span,
    #page-fav .fav-sidenav .favlist-title, #page-fav .fav-sidenav .watch-later, #page-fav .fav-main .search-types,
    .i-live .i-live-unfo-btn, .section .operation, #page-channel-detail .watch-later-btn {
      color: var(--dark-font-2);
    }
    
    //文字 中
    .private-hint, .i-m-btn, .user .info .meta .row, .tc-slate, #page-fav .fav-main .fav-action-bottom .select-counter, #page-fav .fav-main .fav-meta, #page-setting .setting-privacy-item .setting-privacy-switcher .be-switch-label,
    .i-live .i-live-fo-count {
      color: var(--dark-font-1);
    }
    
    //文字 重
    body, .n .n-data .n-data-v, .section-title, .large-item .title,
    #page-fav .fav-main .fav-action-top .back-to-info, #page-fav .fav-main .fav-action-bottom li, #page-fav .fav-main .fav-action-bottom li:hover,
    .article-title, #page-fav .fav-main .fav-content .fav-pugv-list .pugv-item .item-infos p.main-title,
    .sub-tabs span, .sub-tabs .filter-content {
      color: var(--dark-font-0);
    }
    
    //高优先
    .feed-title, .section .user-auth.no-auth .no-auth-title .goto-auth, .user-auth .auth-description, .contribution-sidenav, .breadcrumb .item, .my-album .title, .fav-sidenav, .nav-title .text,
    .fav-main .filter-item, .fav-main .filter-item .filter-type .be-dropdown-item span, .favInfo-box .favInfo-details .fav-name, 
    .pgc-item-title, .pgc-item-desc, .setting-privacy-item .setting-privacy-name, .channel-title .channel-name, .album-title, .follow-item {
      color: var(--dark-font-0)!important;
    }
    
    .pgc-space-follow-item .pgc-item-info .type-and-area, .pgc-space-follow-item .pgc-item-info .pgc-item-state, .favInfo-box .favInfo-details .fav-options .meta {
      color: var(--dark-font-1)!important;
    }
    
    //Card背景 
    .h .h-forbid, .n .n-inner, .bg-white,
    #page-index .col-1, .col-2 .section,
    .feed-title,
    .card,
    .col-full,
    .channel-option.no-channel, .channel-add-video,
    #page-fav .fav-main .fav-action-bottom .fav-action-fixtop, #page-fav .fav-main .small-item:hover {
      background-color: var(--dark-card)!important;
    }
    
    //Card边框
    .col-1, .col-2 .section, .fav-covers, .card, .fav-main .small-item{
      border-color: var(--dark-card)!important;
    }
    
    //Card阴影
    .n .n-inner, .large-item .cover img, .mini-item .cover img, .col-full, .i-pin-c{
      box-shadow: 0 0 0 1px #1313138a!important;
    }
    
    //框线
    .section, .section-title, .i-pin-v .be-tab, .i-m-upload, .i-m-r2, .user .tags, .contribution-sidenav, .contribution-sidenav~.main-content,
    .album-content, .filter, .channel-detail .channel-action-row .be-dropdown,
    .fav-sidenav,.fav-sidenav .nav-container, .fav-sidenav .watch-later, .fav-main .favList-info,
    .fav-main .filter-item.search, .fav-main .search-types, .fav-main .fav-action-top .back-to-info, .fav-main .fav-action-top,
    .article-content, .s-content, .setting-index-container, .setting-index-module,
    .i-live .i-live-unfo-btn, .i-live .i-live-fo-count, .section .operation, .channel .channel-item, .watch-later-btn, .mini-item,
    .follow-sidenav, .follow-sidenav .nav-container.follow-container, .follow-main, .follow-main .follow-header.follow-header-info, .list-item, .fans-action-btn.follow {
      border-color: var(--divider)!important;
    }
    
    .my-album .line {
      background-color: var(--dark-1)!important;
    }
    
    //hover深
    #submit-video-type-filter,
    .contribution-sidenav .contribution-item:hover,
    .fav-item:hover,
    .follow-item:hover {
      background-color: var(--dark-3)!important;
    }
    
    //搜索
    .g-search input, #page-fav .fav-main .search-input input {
      background: var(--dark-card)!important;
      color: var(--dark-font-0);
    }
    .g-search input {
      border-color: var(--divider);
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
        background-color: var(--dark-3);
        border-color: var(--dark-3);
        color: var(--dark-font-1)!important;
      }
      &:hover textarea, &.focus textarea {
        color: var(--dark-font-0)!important;
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
    
    //认证标识修正
    #page-index .col-2 .section .user-auth .auth-icon {
      &.organization-auth {
        background-position: -2px -50px!important;
      }
      &.personal-auth {
        background-position: -36px -50px!important;
      }
    }
    
    //充电图片
    .elec {
      .elec-status {
        color: var(--dark-font-0)!important;
        .elec-count {
          color: var(--dark-font-1)!important;
        }
        background-image: url(${getURL('/statics/imgs/charging_unfocus.png')})!important
      }
      .elec-status-bg-grey {
        background: var(--dark-card)!important;
      }
      &:hover .elec-status {
        background-image: url(${getURL('/statics/imgs/charging_focus.gif')})!important
      }
      .elec-avatar {
        border-color: var(--dark-5)!important;
      }
    }
    
    //弹出框
    .modal-wrapper {
      background-color: var(--dark-3)!important;
      .modal-title, .title {
        border-color: var(--dark-1)!important;
      }
      .modal-title p {
        color: var(--dark-font-0)!important;
      }
      .btn.default {
        background-color: var(--dark-5)!important;
        border-color: var(--dark-5)!important;
        color: var(--dark-font-1)!important;
      }
      .be-input_inner, .be-textarea_inner {
        background: var(--dark-2)!important;
        border-color: var(--dark-1)!important;
        color: var(--dark-font-0);
      }
    }
    
    .h .report-popup-item-text {
      color: unset!important;
    }
    
    .edit-media-list .edit-mask {
      .edit-board, .default-edit {
        background-color: var(--dark-3)!important;
        .head {
          color: unset!important;
          border-color: var(--dark-1)!important;
        }
        .info-wrap {
          .name-input, .media-list-intro{
            background: var(--dark-2)!important;
            border-color: var(--dark-1)!important;
            color: var(--dark-font-0);
          }
          .title {
            color: unset!important;
          }
        }
        .media-list-type {
          color: var(--dark-font-1)!important;
        }
        .default-btn-wrap .default-btn.cancel {
          background-color: var(--dark-5)!important;
          border-color: var(--dark-5)!important;
          color: var(--dark-font-1)!important;
        }
      }
    }
    
    #pin-wrapper {
      #pin-layer {
        background-color: var(--dark-3)!important;
      }
      .pin-layer-header {
        color: unset!important;
        border-color: var(--dark-1)!important;
      }
      #pin-layer-search {
        background: var(--dark-2)!important;
        border-color: var(--dark-1)!important;
        color: var(--dark-font-0);
      }
      .pin-layer-order-tip {
        color: unset!important;
      }
      .btn.btn-disabled {
        background-color: var(--dark-4)!important;
        border-color: var(--dark-4)!important;
        color: var(--dark-font-2)!important;
      }
      .btn.default {
        background-color: var(--dark-5)!important;
        border-color: var(--dark-5)!important;
        color: var(--dark-font-1)!important;
      }
    }
    
    .follow-dialog-wrap .follow-dialog-window {
      background-color: var(--dark-3)!important;
      .title {
        color: unset!important;
        border-color: var(--dark-1)!important;
      }
      .content .group-list {
        li {
          color: unset!important;
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
        ul .follow-group-mask {
          background: unset!important;
        }
      }
      .bottom {
        border-color: var(--dark-1)!important;
        .btn:disabled {
          background-color: var(--dark-4)!important;
          border-color: var(--dark-4)!important;
          color: var(--dark-font-2)!important;
        }
      }
    }
    
    .wrapper .edit-video-modal {
      .target-favlist {
        .target-favitem .target-fav-title .fav-meta .fav-name, .target-fav-count {
          color: unset!important;
        }
      }
      .addfav-container {
        .fake-fav-input {
          color: var(--dark-font-1)!important;
          border-color: var(--dark-1)!important;
        }
        .fav-container {
          background-color: var(--dark-2)!important;
          input {
            background: var(--dark-2)!important;
            border-color: var(--dark-1)!important;
            color: var(--dark-font-0);
          }
          .fav-add-btn {
            background: #d9f1f933!important;
          }
        }
      }
      .favlist-body:after {
        background: var(--dark-1)!important;
      }
      .btn.ghost {
        background-color: var(--dark-4)!important;
        border-color: var(--dark-4)!important;
        color: var(--dark-font-2)!important;
      }
    }
    
    .fans-action-btn {
      color: var(--dark-font-1);
    }
    
    .fans-action-follow {
      background-color: var(--dark-5)!important;
      color: var(--dark-font-1);
    }
    
    #id-card {
      background: var(--dark-3)!important;
      .idc-meta, .idc-auth-description {
        color: var(--dark-font-1)!important;
      }
      .idc-avatar {
        border-color: var(--dark-3)!important;
      }
      .btn-center {
        a.primary {
          color: #fff!important;
          border-color: #00a1d6!important;
          background-color: #00a1d6!important;
        }
        a.primary:hover {
          border-color: #00b5e5!important;
          background-color: #00b5e5!important;
        }
        a, a.ghost {
          background: var(--dark-5)!important;
          color: var(--dark-font-1)!important;
          border-color: var(--dark-5)!important;
          &:hover {
            background: var(--dark-4)!important;
          }
        }
      }
      .idc-content {
        a .idc-uname{
          color: var(--dark-font-0)!important;
          &.this-is-vip {
            color: #fb7299!important;
          }
          &:hover {
            color: #00A1D6!important;
          }
        }
      }
    }
  `;

export {SpaceDarkModeStyle}