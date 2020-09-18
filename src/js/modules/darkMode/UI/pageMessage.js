import {createGlobalStyle} from "styled-components";
import {getURL} from "Utils/functions";

const messagelist = `
    .message-list {
      background-color: var(--dark-3)!important;
      .msg-item .message {
        color: var(--dark-font-0);
        .message-content {
          background-color: var(--dark-4)!important;
          &.is-me {
            background-color: #6f9dca!important;
          }
        }
      }
      .msg-notify, .msg-push {
        background: var(--dark-4)!important;
        .content {
          color: var(--dark-font-1);
        }
        hr {
          background: var(--dark-1)!important;
        }
        .link {
          color: var(--dark-font-0);
        }
      }
    }
    `;

const MessageDarkModeStyle = createGlobalStyle`
    html {
      background: url(//s2.hdslb.com/bfs/static/blive/blfe-message-web/static/img/infocenterbg.a1a0d152.jpg) top/cover no-repeat fixed;
      body {
        background: #1c2022d9!important;
      }
    }
    //左栏
    .space-left {
      background-color: #151515cc!important
      .side-bar {
        .title {
          color: var(--dark-font-0);
          .icon {
            background-image: url(${getURL('/statics/imgs/message-plane.png')});
          }
        }
        .item {
          color: var(--dark-font-1);
          &:hover, &.active{
            color: #2faee3;
          }
        }
        .divided-line {
          border-color: var(--divider);
        }
      }
    }
    
    //右栏
    .space-right {
      background-color: #1f1f1f80!important;
      .space-right-top {
        .title {
          background-color: var(--dark-card)!important;
          color: var(--dark-font-1)!important;
          -webkit-box-shadow: 0 2px 4px 0 #1313138a!important;
          box-shadow: 0 2px 4px 0 #1313138a!important;
        }
        .group-helper-msg-list {
          background-color: var(--dark-card)!important;
          -webkit-box-shadow: 0 2px 4px 0 #1313138a!important;
          box-shadow: 0 2px 4px 0 #1313138a!important;
          .tab-list {
            color: var(--dark-font-1)!important;
            .tab-item.active[data-v-29e10985]::before {
              background-color: var(--dark-card)!important;
            }
          }
          .nothing {
            color: var(--dark-font-2)!important;
          }
          .name-box {
            .name {
              color: var(--dark-font-0)!important;
            }
            .status {
              color: var(--dark-font-2)!important;
            }
          }
          &::after {
            background-color: var(--dark-card)!important;
          }
        }
      }
      .space-right-bottom {
        .card {
          background-color: var(--dark-card)!important;
          -webkit-box-shadow: 0 2px 4px 0 #1313138a!important;
          box-shadow: 0 2px 4px 0 #1313138a!important;
          .header::after {
            background: var(--divider)!important;
          }
          .loading .link-progress-tv {
            background-color: unset!important;
          }
          .line-1 {
            color: var(--dark-font-1)!important;
            .name-field {
              color: var(--dark-font-0)!important;
            }
          }
          .line-2 {
            color: var(--dark-font-0)!important;
            .orginal-reply {
              border-color: var(--dark-1)!important;
              color: var(--dark-font-2)!important;
            }
          }
          .line-3 {
            color: var(--dark-font-2)!important;
          }
          .text-box {
            color: var(--dark-font-2)!important;
          }
          .reply-box {
            textarea {
              background-color: var(--dark-3);
              border-color: var(--dark-3);
              color: var(--dark-font-1);
            }
            &:hover textarea {
              color: var(--dark-font-0);
            }
          }
          .divider, div::after {
            border-color: var(--divider)!important;
          }
          //系统通知
          &.system-item {
            .title {
              color: var(--dark-font-0);
            }
            .time {
              color: var(--dark-font-1);
            }
            .bottom {
              color: var(--dark-font-2);
            }
          }
          //私信存档
          &.whisper {
            .list {
              border-color: var(--dark-1);
              .list-title {
                color: var(--dark-font-0);
                border-color: var(--dark-1);
              }
              .list-content .list-item {
                border-color: var(--dark-1);
                .name {
                  color: var(--dark-font-0);
                }
                .last-word {
                  color: var(--dark-font-2);
                }
                &.active, &:hover {
                  background-color: var(--dark-3)!important;
                }
              }
            }
            .dialog {
              .title {
                color: var(--dark-font-0);
                border-color: var(--dark-1);
              }
              ${messagelist}
            }
          }
        }
        //我的消息
        .bili-im {
          color: var(--dark-font-1);
          background-color: var(--dark-card)!important;
          -webkit-box-shadow: 0 2px 4px 0 #1313138a!important;
          box-shadow: 0 2px 4px 0 #1313138a!important;
          .left, .left .title {
            border-color: var(--dark-1);
          }
          .list {
            .list-item {
              .name {
                color: var(--dark-font-0);
              }
              .last-word {
                color: var(--dark-font-2);
              }
              &.active, &:hover {
                background-color: var(--dark-3)!important;
              }
            }
            .lds-spinner div:after {
              background-color: var(--dark-font-0)!important;
            }
          }
          .dialog {
            .title {
              color: var(--dark-font-0);
              border-color: var(--dark-1);
              .action-menu .menu-list {
                border-color: var(--dark-card);
                background-color: var(--dark-card)!important;
                -webkit-box-shadow: 0 6px 12px 0 var(--dark-card);
                box-shadow: 0 6px 12px 0 var(--dark-card);
                a {
                  color: var(--dark-font-0);
                  .tips {
                    color: var(--dark-font-2);
                  }
                  &:hover {
                    background-color: var(--dark-0)!important;
                  }
                }
                &:before {
                  border-color: var(--dark-card);
                  background-color: var(--dark-card)!important;
                }
              }
            }
            ${messagelist}
            .new-message-tip {
              .text, &::after {
                background-color: var(--dark-4)!important;
              }
            }
            .send-box {
              border-color: var(--dark-0);
              background-color: var(--dark-3)!important;
              .btn-box.send-btn {
                border-color: var(--dark-5)!important;
                background-color: var(--dark-5)!important;
                color: var(--dark-font-2)!important;
                &.active {
                  background-color: #1389bf!important;
                  border-color: #1389bf!important;
                  color: #fff!important;
                }
              }
              .input-box textarea {
                  color: var(--dark-font-0);
              }
            }
          }
        }
        //消息设置
        .config {
          color: var(--dark-font-0);
          background-color: var(--dark-card)!important;
          -webkit-box-shadow: 0 2px 4px 0 #1313138a!important;
          box-shadow: 0 2px 4px 0 #1313138a!important;
          .tip {
            color: var(--dark-font-2);
          }
          .config-item {
            .css-1xneiug {
              .content {
                fill: var(--dark-5);
              }
              .border {
                fill-opacity: 0.5;
              }
            }
            &::before {
              background: var(--dark-1)!important;
            }
          }
        }
      }
    }
  `;

export {MessageDarkModeStyle}
