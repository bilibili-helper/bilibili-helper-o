import {createGlobalStyle} from "styled-components";
import {getURL} from "Utils/functions";

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

export {ReadCVDarkModeStyle}