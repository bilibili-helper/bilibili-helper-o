/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 直播区功能脚本
 */
import $ from 'jquery';
import {getTargetDOM} from 'Utils';
import {inLiveRoom} from './function';
import 'Styles/scss/live.scss';

inLiveRoom() && getTargetDOM('.live-room-app', (container) => {
    chrome.runtime.sendMessage({commend: 'getOption', feature: 'doSign'}, ({on}) => {
        on && $.ajax({method: 'get', url: 'https://api.live.bilibili.com/sign/doSign'});
    });
}, 200);