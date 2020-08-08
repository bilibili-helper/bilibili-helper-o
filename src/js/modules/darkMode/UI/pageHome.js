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
      filter: contrast(0.93) brightness(0.89);
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
        background: var(--bg);
      }
      .d-btn {
        background: var(--bg);
        border-color: var(--dark-6);
        color: var(--dark-font-2);
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
    .bili-dialog {
      color: unset!important;
      header {
        border-color: var(--dark-1)!important;
      }
      .con {
        background: var(--dark-3)!important;
        .btn-cancel {
          background-color: var(--dark-5)!important;
          &:not(:hover) {
            color: var(--dark-font-1)!important;
            border-color: var(--dark-5)!important;
          }
        }
      }
    }
    `;

const HistoryDarkModeStyle = createGlobalStyle`
    .history-wrap .b-head {
      .b-head-t {
        color: var(--dark-font-0);
      }
      .history-btn .btn {
        border-color: #00a1d6!important;
      }
    }
    .history-list {
      .l-info {
        border-color: var(--dark-6);
        .lastplay-time .history-red-round {
          border-color: transparent var(--dark-6) transparent;
        }
      }
      .r-info {
        background: unset!important;
        .r-txt {
          border-color: var(--dark-1)!important;
          .title:not(:hover) {
            color: var(--dark-font-0);
          }
          .username {
            color: var(--dark-font-1);
          }
        }
      }
    }
    .history-dlg {
      background-color: var(--dark-3)!important;
      border-color: var(--dark-3)!important;
      .dlg-txt {
        color: var(--dark-font-0)!important;
      }
      .cancel {
        height: 32px!important;
        background-color: var(--dark-5)!important;
        &:not(:hover) {
          color: var(--dark-font-1)!important;
          border-color: var(--dark-5)!important;
        }
      }
    }
    .go-top-m .go-top {
      background-color: var(--dark-4)!important;
      border-color: var(--dark-4)!important;
    }
    `;

export {HomeDarkModeStyle, WatchLaterDarkModeStyle, HistoryDarkModeStyle}