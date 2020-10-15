import {createGlobalStyle} from "styled-components";

const SearchDarkModeStyle = createGlobalStyle`
  html {
    background: unset!important;
  }
  body {
    color: var(--dark-font-0);
  }
  input {
    border-color: var(--dark-4)!important;
    outline: none!important;
    color: var(--dark-font-0)!important;
  }
  .suggest-wrap {
    background: var(--dark-card)!important;
    border-color: var(--dark-card)!important;
    .horizontal .hz-text:not(:hover) {
      border-color: var(--dark-6);
      color: var(--dark-font-0);
    }
    .title {
      border-color: var(--dark-6);
      span {
        background: var(--dark-card);
      }
    }
    .vt-text {
      color: var(--dark-font-0);
      &:hover {
        background-color: var(--dark-3);
      }
    }
    .keyword-wrap .keyword {
      color: var(--dark-font-0);
    }
  }
  //主页
  .home-wrap {
    .home-input {
      .type {
        background-color: var(--dark-4)!important;
        border-color: var(--dark-4)!important;
        &.selected, &:hover {
          background-image: linear-gradient(0deg,var(--dark-3),var(--dark-4));
        }
      }
      .list {
        background-color: var(--dark-4);
        border-color: var(--dark-4);
        li:hover {
          background-color: var(--dark-3);
        }
      }
      .content {
        background-color: var(--dark-3)!important;
      }
    }
    .home-suggest {
      .hot-search, .history {
        border-color: var(--dark-5);
      }
      .hotlist {
        .num {
          background-color: var(--dark-4);
          &:not(.special) {
            color: var(--dark-font-1);
          }
        }
        .item {
          border-color: var(--dark-6);
        }
      }
      .history .list .item {
        border-color: var(--dark-6);
        a {
          color: var(--dark-font-0);
        }
      }
    }
  }
  //结果
  .total-wrap .total-text {
    color: var(--dark-font-2);
  }
  .search-wrap .search-block .input-wrap {
    background-color: var(--dark-3)!important;
  }
  #navigator .v-switcher-header-item {
    border-color: var(--divider);
    a {
      color: var(--dark-font-1);
    }
  }
  .filter-wrap {
    border-color: var(--divider);
    .filter-item:not(active) a {
      color: var(--dark-font-1);
    }
    .fold:hover {
      background-color: var(--dark-2);
    }
  }
  #all-list .mixin-list ul:not(:last-child) {
    border-color: var(--divider);
  }
  .activity-item .info {
    .type {
      border-color: var(--dark-6);
      color: var(--dark-font-2);
    }
    .title {
      color: var(--dark-font-0);
    }
    .desc {
      color: var(--dark-font-1);
    }
  }
  .fixed-top {
    background: hsla(0,100%,0%,.9)!important;
  }
  .page-wrap .pager {
    background: unset!important;
    .pages .page-item:not(.active) button:not(:hover) {
      color: var(--dark-font-1);
      background-color: var(--dark-2);
      border-color: var(--dark-3);
    }
  }
  .error-wrap {
    border-color: var(--divider);
    background-color: unset!important;
  }
  //视频
  .video-item.matrix, .video-item.list {
    border-color: var(--divider);
    .title {
      color: var(--dark-font-0);
    }
    .type {
      border-color: var(--dark-6);
      color: var(--dark-font-2);
    }
  }
  //番剧，影视
  .bangumi-item, .pgc-item {
    border-color: var(--divider);
    .right-info {
      .headline {
        span {
          border-color: var(--dark-6)!important;
          color: var(--dark-font-2)!important;
        }
        .title {
          color: var(--dark-font-0);
        }
      }
      .intros .value {
        color: var(--dark-font-0);
      }
      .ep-box .ep-sub .ep-item {
        border-color: var(--divider)!important;
        &:not(:hover) {
          color: var(--dark-font-2)!important;
        }
      }
    }
  }
  //直播
  #live-list {
    .live-tabs a {
      color: var(--dark-font-0);
    }
    .headline-live, .headline-room {
      h3 {
        color: var(--dark-font-1);
        .num-txt {
          color: var(--dark-font-2);
        }
      }
    }
    .live-user-wrap .live-user-item {
      box-shadow: 0 0 3px var(--dark-6);
      .item-right {
        .uname {
          color: var(--dark-font-1);
        }
        .status.free {
          background-color: var(--dark-4);
          color: var(--dark-font-1);
        }
        .info .star, .info .type {
          color: var(--dark-font-1);
        }
        .tags>span {
          border-color: var(--dark-6)!important;
          color: var(--dark-font-2);
        }
      }
    }
    .headline-room .filter a {
      color: var(--dark-font-0);
    }
    .live-room-item {
      .item-title {
        color: var(--dark-font-0);
      }
      .item-info .live-num, .item-info .uname {
        color: var(--dark-font-1);
      }
    }
  }
  //专栏
  .article-item {
    border-color: var(--divider);
    .content .title {
      color: var(--dark-font-0);
    }
  }
  //话题
  .topic-item {
    border-color: var(--divider);
    .content .headline a {
      color: var(--dark-font-0);
    }
  }
  //用户
  #user-list .dropdown-wrap .select-wrap .bili-dropdown {
    color: var(--dark-font-0);
    .selected {
      color: var(--dark-font-2);
    }
    .dropdown-list {
      background: var(--dark-3);
      border-color: var(--dark-3);
      .dropdown-item:hover {
        background: var(--dark-2);
      }
    }
  }
  .user-item {
    border-color: var(--divider);
    .title {
      color: var(--dark-font-0);
    }
    .attention-btn.followed, .attention-btn.followed:hover {
      background: var(--dark-5);
      color: var(--dark-font-1);
    }
    .up-info>span, .desc {
      color: var(--dark-font-1);
    }
    .up-videos .video-item .video-desc {
      color: var(--dark-font-0);
    }
  }
  //相簿
  .photo-item {
    border-color: var(--divider);
    .title {
      color: var(--dark-font-0);
    }
  }
`;

export {
  SearchDarkModeStyle,
}