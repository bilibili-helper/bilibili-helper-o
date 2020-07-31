import {createGlobalStyle} from "styled-components";
import {DynamicMain} from "Modules/darkMode/UI/cardMain";

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

export {DynamicDarkModeStyle}