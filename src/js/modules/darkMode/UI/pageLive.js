import {createGlobalStyle} from "styled-components";
import {DynamicMain} from "Modules/darkMode/UI/cardMain";

const LivePlayDarkModeStyle = createGlobalStyle`
    .room-bg.p-fixed:after {
      background: #1c2022d9!important;
    }
    
    .link-navbar-ctnr, .link-navbar-vm, .link-navbar, .head-info-section, .gift-control-section, .rank-list-section, .rank-list-ctnr, .chat-history-panel, .announcement-cntr, .chat-control-panel,
    .gift-sender-panel, .count-choice, .common-popup-wrap, .gift-panel-box, .content-wrapper, .card, .live-record-list-cntr, .flip-view-image, .bg-white, .live-player-ctnr.minimal,
    .user-panel, .link-panel-ctnr, .calendar-checkin, .calendar-checkin .title, .calendar-checkin .calendar-wrapper, .download-panel-ctnr {
      background-color: var(--dark-card)!important;
    }
    
    .daily-record-title, .choice-item.active, .choice-item:hover, .logout-btn, .divider, .load-more-btn {
      background-color: var(--dark-5)!important;
    }
    
    .choice-item {
      background-color: var(--dark-4)!important;
    }
    
    .gift-item.buy:hover, .gift-panel-switch:hover, .download-item:hover {
      background-color: var(--dark-3)!important;
    }
    
    .item, .daily-record-title, .daily-text, .gift-info-expScore, .seeds-wrap, .tab-candidate, .room-introduction-scroll-wrapper,
    .username-info, .calendar-checkin .calendar-wrapper, .download-panel-ctnr a {
      color: var(--dark-font-1)!important;
    }
    
    .gift-info-desc {
      color: var(--dark-font-2)!important;
    }
    
    .link-navbar .main-ctnr .nav-logo, .link-navbar .nav-item, .shortcuts-ctnr, .room-title, .tab-list .item.active, .rank-list-box a, .chat-item.danmaku-item,
    .gift-item .label, .gift-info-title, .choice-item, .announcement-cntr .content, .record-title, .live-player-ctnr, .area-list-panel .list-item, .username {
      color: var(--dark-font-0)!important;
    }
    
    body{
      color: var(--dark-font-0);
    }
    
    .calendar-checkin .calendar-wrapper .calendar .date-ctnr .day-item {
      color: var(--dark-5)!important;
      &.checked {
        color: #fff!important;
      }
    }
    
    .rank-list-box a:hover, .chat-item.danmaku-item .danmaku-content:hover, .area-list-panel .list-item:hover, .user-item:hover .username, .download-item:hover {
      color: #23ade5!important;
    }
    
    .head-info-section, .gift-control-section, .rank-list-ctnr, .aside-area, .announcement-cntr,
    .gift-sender-panel.arrow-bottom:before, .common-popup-wrap, .common-popup-wrap.arrow-bottom:before, .gift-panel-box,
    .content-wrapper, .card, .live-record-list-cntr {
      border-color: var(--dark-card)!important;
    }
    
    .tab-list .item, .l-line, .r-line, .count-choice, .choice-item, .gift-reveal-header, .announcement-cntr .content, .room-introduction-tags, .info-item-ctnr {
      border-color: var(--dark-5)!important;
    }
    
    .link-navbar-ctnr {
      box-shadow: 0 0 5px 1px var(--dark-card)!important;
    }
    
    .gift-sender-panel, .common-popup-wrap {
      box-shadow: 0 6px 12px 0 var(--dark-card)!important;
    }
    
    .link-navbar .panel-shadow {
      box-shadow: 0 8px 20px 0 var(--dark-card)!important;
    }
    
    .live-player-ctnr.minimal {
      box-shadow: 0 0 30px 1px var(--dark-card)!important;
    }
    
    .chat-input, .count-choice .count-input {
      background-color: var(--dark-3)!important;
      color: var(--dark-font-0)!important;
      border-color: var(--dark-4)!important;
    }
    
    .bl-button--primary:disabled {
      background-color: var(--dark-4)!important;
      color: var(--dark-font-2)!important;
    }
    
    .area-list-panel {
      background-color: var(--dark-3)!important;
      .list-item:hover {
        background-color: var(--dark-2)!important;
      }
    }
    
    .search-bar-ctnr .search-bar {
      background-color: var(--dark-3)!important;
      input {
        color: var(--dark-font-1)!important;
        &:focus {
          color: var(--dark-font-0)!important;
        }
      }
    }
    
    .live-room-app .app-content .link-footer-ctnr {
      background-color: unset!important;
      .link-footer {
        background-color: unset!important;
        border-color: var(--dark-1)!important;
        .footer-linker-line {
          background-color: var(--dark-1)!important;
        }
      }
    }
    
    .record-download button {
      background: var(--dark-5)!important;
      border-color: var(--dark-6)!important;
      color: var(--dark-font-1)!important;
    }
    
    .side-bar-cntr {
      background-color: var(--dark-card)!important;
      border-color: var(--dark-card)!important;
    }
    
    ${DynamicMain}
    `;

export {LivePlayDarkModeStyle};