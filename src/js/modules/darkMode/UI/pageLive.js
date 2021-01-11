import {createGlobalStyle} from "styled-components";
import {DynamicMain} from "Modules/darkMode/UI/cardMain";

const LivePlayDarkModeStyle = createGlobalStyle`
    .room-bg.p-fixed:after {
      background: #1c2022d9!important;
    }
    
    .link-navbar-ctnr, .link-navbar-vm, .link-navbar, .head-info-section, .gift-control-section, .rank-list-section, .rank-list-ctnr, .chat-history-panel, .announcement-cntr, .chat-control-panel, .control-panel-ctnr,
    .gift-sender-panel, .count-choice, .gift-panel-box, .content-wrapper, .link-progress-tv, .pay-note-panel, .feed-title, .card, .live-record-list-cntr, .flip-view-image, .bg-white, .live-player-ctnr.minimal,
    .user-panel, .link-panel-ctnr, .calendar-checkin, .calendar-checkin .title, .calendar-checkin .calendar-wrapper, .download-panel-ctnr, .side-bar-popup-cntr {
      background-color: var(--dark-card)!important;
    }
    
    .daily-record-title, .choice-item.active, .choice-item:hover, .divider, .more-btn-cntr,  .animation-list .icon-arrow-left, .animation-list .icon-arrow-right {
      background-color: var(--dark-5)!important;
    }
    
    .choice-item, .danmaku-menu, .logout-btn, .load-more-btn, .checkin-btn, .link-popup-panel {
      background-color: var(--dark-3)!important;
    }
    
    .danmaku-item .user-name {
      color: var(--dark-font-1)!important;
    }
    
    body{
      color: var(--dark-font-0);
    }
    
    .selector-box, .feed-title, .glory-name {
      color: var(--dark-font-0)!important;
    }
    
    .common-popup-wrap, .gVPoeh,
    .gift-item.buy:hover, .gift-panel-switch:hover, .download-item:hover, .item.self, .rank-list-ctnr .own {
      background-color: var(--dark-3)!important;
    }
    
    .rank:not(.rank-1):not(.rank-2):not(.rank-3) {
      background: var(--dark-6)!important;
    }
    
    .item, .daily-record-title, .daily-text, .gift-info-expScore, .seeds-wrap, .tab-candidate, .room-introduction-scroll-wrapper,
    .username-info, .calendar-checkin .calendar-wrapper, .download-panel-ctnr a, .list-unit {
      color: var(--dark-font-1)!important;
    }
    
    .gift-info-desc {
      color: var(--dark-font-2)!important;
    }
    
    .link-navbar .main-ctnr .nav-logo, .link-navbar .nav-item, .shortcuts-ctnr, .room-title, .tab-list .item.active, .rank-list-box a.live-skin-main-a-text, .chat-item.danmaku-item,
    .gift-item .label, .gift-info-title, .choice-item, .announcement-cntr .content, .record-title, .live-player-ctnr, .area-list-panel .list-item, .username, .user-row,
    .gift-component-effect-rule, .share-addr-name, th.list-head-text {
      color: var(--dark-font-0)!important;
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
    
    .head-info-section, .gift-control-section, .aside-area, .announcement-cntr,
    .gift-sender-panel.arrow-bottom:before, .gift-panel-box,
    .content-wrapper, .card, .live-record-list-cntr, .side-bar-popup-cntr {
      border-color: var(--dark-card)!important;
    }
    
    .tab-list .item, .l-line, .r-line, .rank-list-ctnr, .count-choice, .choice-item, .gift-reveal-header, .announcement-cntr .content, .room-introduction-tags, .info-item-ctnr, .footer-line, .edit-button {
      border-color: var(--dark-5)!important;
    }
    
    .common-popup-wrap {
      border-color: var(--dark-3)!important;
    }
    
    .common-popup-wrap.arrow-bottom:after, .common-popup-wrap.arrow-bottom:before {
      border-color: var(--dark-3) transparent transparent !important;
    }
  
    .common-popup-wrap.arrow-top:after, .common-popup-wrap.arrow-top:before {
      border-color: transparent transparent var(--dark-3) !important;
    }
    
    .arrow {
      border-color: transparent transparent transparent var(--dark-card)!important;
    }
    
    .link-navbar-ctnr {
      box-shadow: 0 0 5px 1px var(--dark-card)!important;
    }
    
    .gift-sender-panel, .common-popup-wrap, .side-bar-popup-cntr, .gVPoeh {
      box-shadow: 0 6px 12px 0 var(--dark-1)!important;
    }
    
    .link-navbar .panel-shadow {
      box-shadow: 0 8px 20px 0 var(--dark-card)!important;
    }
    
    .live-player-ctnr.minimal {
      box-shadow: 0 0 30px 1px var(--dark-card)!important;
    }
    
    .chat-input-ctnr {
      border-color: var(--divider)!important;
      background-color: var(--dark-3)!important;
      .medal-section {
        border-color: var(--divider)!important;
      }
      .chat-input, .count-choice .count-input {
        background-color: var(--dark-3)!important;
        color: var(--dark-font-0)!important;
        border-color: var(--dark-4)!important;
      }
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
        border-color: var(--divider)!important;
        .footer-linker-line {
          background-color: var(--divider)!important;
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
    
    .flip-view-image-ctnr {
      filter: brightness(0.9);
    }
    
    .pophover>p:first-child {
      color: var(--dark-font-1)!important;
    }
    
    .feed-title {
      border-bottom: 1px solid var(--divider);
    }
    
    ${DynamicMain}
    `;

export {LivePlayDarkModeStyle};
