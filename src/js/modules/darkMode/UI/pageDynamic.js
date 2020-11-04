import {createGlobalStyle} from "styled-components";
import {DynamicMain} from "Modules/darkMode/UI/cardMain";

const DynamicDarkModeStyle = createGlobalStyle`
    //底层背景
    #app, .fixed-bg {
      background: none!important;
    }
    
    //所有Card背景
    .user-panel, .live-panel, .section-block, .publish-panel, .core-style, .most-viewed-panel, .tab-bar, .card, .notice-panel, .new-topic-panel,
    .feed-topic .publish-panel-container, .feed-topic .empty-content,
    .sticky-bar {
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
    
    //文字 轻
    .tc-slate, .time, .live-name, .count, .dynamic-repost, .shop-desc .desc-box .sub-title {
      color: var(--dark-font-2)!important;
    }
    
    //文字 中
    .most-viewed-item .name, .tag-item .label, .shop-panel .panel-desc {
      color: var(--dark-font-1)!important;
    }
    
    //文字 重
    .tc-black, .numbers, .up-name, .text .content, .tag-item .content, .item-detail .text, .core-style, .shop-desc .desc-box .title {
      color: var(--dark-font-0)!important;
    }
    
    //hover蓝
    .more-button .more:hover,
    .most-viewed-panel .list-content .most-viewed-item .name.active,
    .most-viewed-panel .list-content .most-viewed-item:hover .name,
    .tab-bar .tab .tab-text.selected,
    .tab-bar .tab .tab-text:hover {
      color: #00b5e5!important;
    }
    
    .user-panel .content .bottom .number-part:hover .numbers,
    .new-topic-panel .tag-item .content:hover {
      color: #00a1d6!important;
    }
    
    //输入框
    .hash-popup {
      background: var(--dark-3)!important;
      border-color: var(--dark-3)!important;
      .topic-container .item.is-selected {
        background: var(--dark-2)!important;
      }
    }
    
    //新动态
    .new-notice-bar {
      background: #d7d4b8!important;
      .message {
        color: #cf8612!important;
      }
    }
    
    //常看列表
    .card-list .most-viewed-panel .list-content .most-viewed-item .section {
      .icon-all, .avatar {
        border-color: var(--dark-5);
        -webkit-box-shadow: 0 0 0 1px var(--dark-0);
        box-shadow: 0 0 0 1px var(--dark-0);
        .active {
          -webkit-box-shadow: 0 0 0 1px #00a1d6!important;
          box-shadow: 0 0 0 1px #00a1d6!important;
        }
      }
    }
    
    //话题标签
    .new-topic-panel .tag-item .label {
      background: var(--dark-3)!important;
    }
    
    //feed
    .feed-topic .separater-line, .feed-topic .card, .card-offset {
      border-color: var(--dark-card)!important;
    }
    
    .card .focus-btn .unfocus {
      background-color: var(--dark-5)!important;
      color: var(--dark-font-1);
    }
    
    .active-panel {
      .tc-dark-slate {
        color: var(--dark-font-1);
      }
      .show-more-button {
        background-color: unset!important;
      }
    }
    
    //动态详情
    .sticky-bar {
      -webkit-box-shadow: 0 2px 4px 0 var(--dark-card)!important;
      box-shadow: 0 2px 4px 0 var(--dark-card)!important;
      .bar-content {
        .title {
          color: var(--dark-font-0)!important;
        }
        .message {
          color: var(--dark-font-2)!important;
          &:hover {
            color: #00b5e5 !important;
          }
        }
      }
    }
    .detail-content .card {
      border-color: var(--dark-card)!important;
    }
    
    ${DynamicMain}
  `;

export {DynamicDarkModeStyle}