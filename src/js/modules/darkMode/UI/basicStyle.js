import {createGlobalStyle} from "styled-components";
import {getURL} from "Utils/functions";
import {CommentMain, InputMain} from "Modules/darkMode/UI/cardMain";

const DarkModeStyle = createGlobalStyle`
    html {
      --dark-0: #101010;
      --dark-1: #141414;
      --dark-2: #131313;
      --dark-3: #1f1f1f;
      --dark-4: #2b2b2b;
      --dark-5: #333333;
      --dark-card: #151515;
      --divider: rgb(47 47 47 / 75%);
        
      --dark-font-0: #e8e8e8;
      --dark-font-1: #99a2aa;
      --dark-font-2: #879199;
    }
    
    body {
      background-color: #1c2022!important;
    }
  `;

//导航栏
const TopBarDarkModeStyle = createGlobalStyle`
    #internationalHeader.international-header {
      .mini-type {
        background: var(--dark-0)!important;
      }
      .link {
        color: var(--dark-font-0)!important;
      }
      
      .nav-user-center { // 右侧用户内容导航
        .item {
          .name, .t a {
            color: var(--dark-font-0)!important;
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
      background-color: var(--dark-3)!important;
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
        border-bottom-color: var(--dark-3)!important;
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

export {
    DarkModeStyle,
    TopBarDarkModeStyle,
    FooterDarkModeStyle,
    CommentDarkModeStyle,
    UserPopperDarkModeStyle,
}
