import {createGlobalStyle} from "styled-components";
import {getURL} from "Utils/functions";
import {CommentMain} from "Modules/darkMode/UI/cardMain";

const ReadDarkModeStyle = createGlobalStyle`
    //文字 轻
    .article-item .item-holder .article-desc, .info-holder .dynamic, .more .info {
      color: var(--dark-font-2)!important;
    }
    
    //文字 中
    .info-holder .dynamic .arc-title {
      color: var(--dark-font-1)!important;
    }
    
    //文字 重
    body, .nav-tab-bar .tab-item, .partitio-name, .article-item .item-holder .article-title-holder, .rank-module .rank-tabs-bar label, .rank-module .rank-list .item a, .up-list .title, .info-holder .head .nick-name, .more .top-bar, .more .title, .categories-bar .tag-item {
      color: var(--dark-font-3)!important;
    }
 
    //hover蓝
    .nav-tab-bar .tab-item.on, .nav-tab-bar .tab-item:hover, .article-item .item-holder .article-title-holder:hover, .rank-module .rank-tabs-bar .rank-tabs-list li.on, .rank-module .rank-list .item a:hover, .info-holder .head .nick-name:hover, .info-holder .dynamic .arc-title:hover, .more .title:hover, .categories-bar .tag-item.on {
      color: #00a1d6!important;
    }
    
    //背景
    .article-item, .rank-module .rank-list .item, .up-list {
      background-color: var(--bg)!important;
    }
    
    .page-content .right-side .rank-module .rank-list .item .rank-index {
      background: var(--dark-4);
    }
    
    //框线
    .article-item, .rank-module .rank-tabs-bar, .up-list .title, .more .top-bar, .categories-bar {
      border-color: var(--divider)!important;
    }
    
    //按钮
    .rank-module .complete-rank, .up-list .fresh-btn {
      background: var(--dark-5)!important;
      border-color: var(--dark-6)!important;
      color: var(--dark-font-0)!important;
      &:hover {
        color: #00a1d6!important;
      }
    }
    
    //搜索
    .search-module .search-block {
      border-color: var(--dark-6)!important;
      background-color: var(--dark-2)!important;
      input {
        background-color: var(--dark-2)!important;
        color: var(--dark-font-0)!important;
      }
      .search-word-panel {
        border-color: var(--dark-card)!important;
        background-color: var(--dark-card)!important;
        .panel-title {
          .split-line {
            border-color: var(--dark-6)!important;
          }
          p span {
            background-color: var(--dark-card)!important;
            color: var(--dark-font-2)!important;
          }
        }
        .suggest-item, .history-item {
          color: var(--dark-font-0);
          &:hover, &.focus {
            background-color: var(--dark-3)!important;
          }
        }
      }
    }
    
    //侧边按钮
    .to-top {
      background-color: var(--dark-4)!important;
      border-color: var(--dark-4)!important;
    }

    //帮助按钮修正
    .more .help .icon {
      background-image: url(${getURL('/statics/imgs/read-help.png')})!important;
    }
    
    //游戏按钮修正
    .nav-tab-bar .tab-item[data-tab-id="1"]:before {
      background-image: url(${getURL('/statics/imgs/read-game.png')});
    }
    `;

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
    .title-container .title, .article-holder, .article-holder h1, .article-holder .color-default, .article-list-plane .button .label, .article-holder .card-container .title {
      color: var(--dark-font-3)!important;
    }
 
    //hover蓝
    .nav-tab-bar .tab-item.on, .nav-tab-bar .tab-item:hover, .article-item .article-title:hover, .more .title:hover,
    .article-action .ops .on, .article-action .ops .on i, .article-action .ops i:hover,
    .article-action .ops .coin-btn:hover, .article-action .ops .fav-btn:hover, .article-action .ops .like-btn:hover,
    .article-action .ops .coin-btn:hover i, .article-action .ops .fav-btn:hover i, .article-action .ops .like-btn:hover i {
      color: #00a1d6!important;
    }
    
    //框线
    .up-article-list-block .block-title, .more .top-bar, .article-action, #article-list-btn .title, #article-list-btn .label, .rightside-article-list-btn .label {
      border-color: var(--divider)!important;
    }
    
    //文章视频引用
    .article-holder .card-container {
      .card, .video-info {
        background-color: #1515154d!important;
      }
      a:after, .slim-video-card{
        border-color: var(--dark-4)!important;
      }
    }
    
    //关注按钮
    .follow-btn-holder .follow-btn {
      background-color: #00a1d6!important;
      border-color: #00a1d6!important;
      &:hover {
        background-color: #00b5e5!important;
        border-color: #00b5e5!important;
      }
      &.followed, &.followed:hover {
        background-color: var(--dark-5)!important;
        border-color: var(--dark-5)!important;
      }
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
      background-color: var(--dark-4)!important;
      border-color: var(--dark-4)!important;
    }
    
    //评论区
    .comment-title-block span {
      color: var(--dark-font-1);
    }
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
    `;

const ReadRankDarkModeStyle = createGlobalStyle`
    #App, .tips, .article-title {
      color: var(--dark-font-3)!important;
    }
    
    .article-desc {
      color: var(--dark-font-2)!important;
    }
    
    .article-title:hover {
      color: #00a1d6!important;
    }
    
    .article-item, .rank-module .rank-list .item, .up-list {
      background-color: var(--bg)!important;
    }
    
    #App .rank-module .tips {
      background: var(--dark-4);
    }
    
    .article-content {
      border-color: var(--dark-1)!important;
    }
    `;

export {ReadDarkModeStyle, ReadCVDarkModeStyle, ReadRankDarkModeStyle}