import {createGlobalStyle} from "styled-components";
import {getURL} from "Utils/functions";

const DarkModeStyle = createGlobalStyle`
    html {
      --dark-0: #101010;
      --dark-1: #141414;
      --dark-2: #131313;
      --dark-3: #1f1f1f;
      --dark-4: #2b2b2b;
      --dark-5: #333333;
      --dark-6: #393939;
      --dark-card: #151515;
      
      --bg: #1c2022;
      --divider: rgb(47 47 47 / 75%);
      
      --dark-font-0: #e8e8e8;
      --dark-font-1: #99a2aa;
      --dark-font-2: #879199;
      --dark-font-3: #d9d9d9;
    }
    
    body {
      background-color: var(--bg)!important;
    }
    `;

//导航栏
const TopBarWithoutBanner = createGlobalStyle`
    .international-header .mini-type {
      background: var(--dark-card)!important;
    }
    
    .nav-link .nav-link-ul .nav-link-item .link,
    .nav-user-center .user-con .item .name {
      color: var(--dark-font-0)!important;
    }
    `;

const TopBarDarkModeStyle = createGlobalStyle`
    // 搜索框
    .international-header .nav-search #nav_searchform {
      background: var(--dark-3)!important;
      border-color: var(--dark-3)!important;
      input:focus {
        color: var(--dark-font-0)!important;
      }
      .nav-search-btn {
        background: var(--dark-4)!important;
      }
    }
    
    .bilibili-search-history, .bilibili-search-suggest {
      background: var(--dark-card)!important;
      border-color: var(--dark-card)!important;
      li {
        &:hover, &.focus {
          background-color: var(--dark-3)!important;
        }
        a {
          color: var(--dark-font-0)!important;
        }
      }
    }
    
    //弹出Popper
    .channel-menu-mini, .van-popper-avatar, .van-popper-avatar .level-intro, .van-popper-avatar .coins .info .login-award, .van-popper-avatar .lang-change .lang-intro,
    .van-popper-avatar .coins .contact-tips,
    .van-popper-vip, .van-popper-favorite, .van-popper-favorite .view-all, .van-popper-favorite .play-all, .van-popper-history, .van-popper-upload {
      background-color: var(--dark-3)!important;
    }
    
    //文字 轻
    .van-popper-avatar .level-info .progress, .van-popper-avatar .count-item .item-key,
    .van-popper-avatar .coins .contact-tips,
    .van-popper-favorite .tab-item--normal, .van-popper-favorite .tab-item--normal .num, .van-popper-favorite .empty-list,
    .header-video-card .video-info .info,
    .header-video-card .video-info .desc,
    .van-popper-history .tab-item,
    .van-popper-history .date-title {
      color: var(--dark-font-1)!important;
    }
    
    //文字 重
    .van-popover a,
    .van-popper-avatar .level-info .grade, .van-popper-avatar .level-intro, .van-popper-avatar .coins,
    .van-popper-avatar .lang-change .lang-title, .van-popper-avatar .count-item .item-value, .van-popper-avatar .links .link-title,
    .van-popper-avatar .lang-change .lang-intro, .van-popper-avatar .logout, .van-popper-avatar .logout span:hover,
    .vip-m .bubble-traditional .recommand .title,
    .van-popper-favorite .view-all, .van-popper-favorite .play-all,
    .header-video-card .video-info .line-1,
    .header-video-card .video-info .line-2,
    .van-popper-history .tab-item.tab-item--active,
    .van-popper-history .tab-item.tab-item--active:hover {
      color: var(--dark-font-0)!important;
    }
    
    //框线
    .van-popper-avatar .coins,
    .van-popper-avatar .counts,
    .van-popper-avatar .links,
    .van-popper-avatar .lang-change,
    .channel-menu-mini .r-box,
    .van-popper-favorite .tabs-panel,
    .van-popper-favorite .play-all,
    .van-popper-history .tab-header {
      border-color: var(--divider)!important;
    }
    
    //hover蓝
    .van-popover a:hover,
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
    .van-popper-avatar .lang-change .lang-item:hover,
    .van-popper-avatar .lang-change .lang-intro-item:hover,
    .van-popper-avatar .logout span:hover,
    .van-popper-favorite .tab-item--normal:hover,
    .van-popper-favorite .view-all:hover,
    .van-popper-favorite .play-all:hover,
    .header-video-card:hover,
    .van-popper-upload .upload-item:hover {
      background: var(--dark-2)!important;
    }
    
    //经验条
    .van-popper-avatar .level-bar {
      background: var(--dark-0)!important;
    }
    
    //Card顶上的小尖尖
    .van-popper-vip, .van-popper-favorite, .van-popper-history, .van-popper-upload, .popover-app-download {
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
    
    //历史查看更多
    .van-popper-history .view-all {
      background: var(--dark-5)!important;
    }
    `;

//底栏
const FooterDarkModeStyle = createGlobalStyle`
    .international-footer {
      background-color: var(--bg)!important;
      .link-box .link-item {
        border-color: var(--divider);
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

const FooterDarkModeStyle_2 = createGlobalStyle`
    .bili-footer {
      .footer-wrp {
        background-color: var(--bg)!important;
        padding-bottom: 70px!important;
      }
      .boston-postcards li {
        border-color: var(--divider);
        .tips {
          color: var(--dark-font-2);
        }
      }
      a {
        color: var(--dark-font-0);
      }
      .partner a:hover {
        color: #00a1d6!important;
      }
    }
    `;

//用户卡片popper
const UserPopperDarkModeStyle = createGlobalStyle`
    .user-card, .user-card-m, .userinfo-content {
      background: var(--dark-3)!important;
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
          &:hover {
            background: var(--dark-4)!important;
          }
        }
      }
      .info {
        .user .name {
          color: var(--dark-font-0)!important;
          &.vip, &.vip-red-name {
            color: #fb7299!important;
          }
          &:hover {
            color: #00A1D6!important;
          }
        }
        .social a, .sign {
          color: var(--dark-font-1)!important;
        }
      }
    }
    
    .user-card, .user-card-m, .userinfo-wrapper {
      border-color: var(--dark-3)!important;
    }
    
    .user-card-m .loading div {
      background: var(--dark-3)!important;
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
    }
    `;

export {
    DarkModeStyle,
    TopBarWithoutBanner,
    TopBarDarkModeStyle,
    FooterDarkModeStyle,
    FooterDarkModeStyle_2,
    UserPopperDarkModeStyle,
}
