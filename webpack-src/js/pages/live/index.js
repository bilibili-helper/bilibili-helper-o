/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 直播区功能脚本
 */
//import $ from 'jquery';
//import _ from 'lodash';
//import * as allGUI from 'Modules/index_GUI';
import React from 'react';
//import ReactDOM from 'react-dom';
import {initialByObserver} from 'Utils';
import {inLiveRoom} from './function';
import 'Styles/scss/live.scss';

inLiveRoom() && initialByObserver({
    container: '.live-room-app',
    kind: 'live',
    interval: 200,
});