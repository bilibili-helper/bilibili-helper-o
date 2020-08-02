import {createGlobalStyle} from "styled-components";
import {HomeBase} from "Modules/darkMode/UI/cardMain";

const HomeDarkModeStyle = createGlobalStyle`
    ${HomeBase}
    .home-slide .item, .card-pic a, .video-card-reco, .pic {
      &:before{
        z-index: 1;
      }
    }
    
    .first-screen img, .storey-box img {
      filter: contrast(0.93) brightness(0.86);
    }
    
    a, .storey-title .no-link {
      color: var(--dark-font-0);
    }
    
    body, .storey-title .text-info, .storey-title .text-info a, .live-card .up .txt .desc {
      color: var(--dark-font-1);
    }
    
    .rank-wrap .number, .pgc-rank-wrap .number, .manga-rank-item .rank-number {
      background: var(--dark-4);
    }
    
    //按钮
    .bypb-window .online {
      background: var(--dark-5)!important;
      border-color: var(--dark-6)!important;
    }
    
    .exchange-btn .btn, .rank-header .more {
      background: var(--dark-5)!important;
      border-color: var(--dark-6)!important;
      color: var(--dark-font-1);
      &:hover {
        background: var(--dark-5)!important;
      }
    }
    
    .time-line .tl-link {
      background: var(--dark-5);
    }
    
    //联系客服
    .contact-help {
      background: var(--dark-4)!important;
      border-color: var(--dark-4)!important;
      box-shadow: 0 6px 10px 0 var(--dark-2)!important;
      color: var(--dark-font-1)!important;
    }
    
    //电梯
    .elevator {
      .ear {
        color: var(--dark-4);
      }
      .list-box {
        background: var(--dark-4)!important;
        border-color: var(--dark-6)!important;
        .item {
          background: var(--dark-4);
          color: var(--dark-font-0);
          &.sort, &.back-top {
            border-color: var(--dark-6)!important;
          }
        }
      }
    }
    `;

const WatchLaterDarkModeStyle = createGlobalStyle`
    ${HomeBase}
    html {
      color: var(--dark-font-0);
    }
    .watch-later-list header {
      .s-btn {
        background: var(--dark-5);
      }
      .d-btn {
        background: var(--dark-5);
        border-color: var(--dark-6);
      }
    }
    .watch-later-list .list-box .av-item .av-about{
      border-color: var(--dark-1)!important;
      .t {
        color: var(--dark-font-0);
      }
      .info .user {
        color: var(--dark-font-1);
      }
    }
    `;

export {HomeDarkModeStyle, WatchLaterDarkModeStyle}