/**
 * Author: Ruo
 * Create: 2018-08-19
 * Description: 常用方法
 */
/* global chrome */

import moment from 'moment';

/**
 * @param command {string}
 * @param key {string}
 * @param callback {Function}
 */
export const sendMessage = (command, key, callback) => {
    chrome.runtime.sendMessage({command, key}, (response) => {
        if (callback instanceof Function) {
            callback(response);
        } else {
            console.error(`"SendMessage" (command: ${command} key: ${key}): invalid callback function.`);
        }
    });
};

/**
 * @param t {string}
 * @param options {object}
 */
export const __ = (t, options = null) => chrome.i18n.getMessage(t, options);

/**
 * 创建新tab页面
 * @param url
 */
export const createTab = (url) => {
    chrome.tabs.create({url});
};

/**
 * 当前版本号
 * @type {string}
 */
export const version = chrome.runtime.getManifest().version;

/**
 * 根据资源名获取扩展程序内部资源
 * @param name
 */
export const getURL = (name) => chrome.extension.getURL(name);

/**
 * 检查传入的版本号是否比当前版本号大
 * @param checkVersion
 * @return {boolean}
 */
export const hasNewVersion = (checkVersion) => {
    const checkVersionStr = checkVersion.split('.').join('');
    const currentVersionStr = version.split('.').join('');
    if (checkVersionStr.length !== currentVersionStr.length) { // 版本号格式不同
        console.error('版本号格式不同');
        return false;
    }
    return Number(checkVersionStr) > Number(currentVersionStr);
};

/**
 * 获取url
 * @param url_name
 * @return string
 */
export const getLink = (url_name) => {
    switch (url_name) {
        case 'video':
            return 'https://www.bilibili.com/';
        case 'live':
            return 'https://live.bilibili.com/';
        case 'config':
            return chrome.extension.getURL('config.html');
        case 'favourite':
            return 'https://space.bilibili.com/';
    }
};

/**
 * 将毫秒数转化为XX:XX格式的字符串
 * @param time
 * @return {string}
 */
export const parseTime = (time) => {
    const minute = parseInt(time / 60000);
    const second = parseInt((time / 1000) % 60);
    return String(minute).padStart(2, '0') + ':' + String(second).padStart(2, '0');
};

// 判断是否在直播间
export const inLiveRoom = () => /^\/(\d+)$/.exec(window.location.pathname) ? true : false;

export const consoleLogo = () => {
    // eslint-disable-next-line no-console
    console.log(`%c
 ____ _____ _      _____ ____ _____ _      _____ _    _ ______ _      _____  ______ _____  
|  _ |_   _| |    |_   _|  _ |_   _| |    |_   _| |  | |  ____| |    |  __ \\|  ____|  __ \\ 
| |_) || | | |      | | | |_) || | | |      | | | |__| | |__  | |    | |__) | |__  | |__) |
|  _ < | | | |      | | |  _ < | | | |      | | |  __  |  __| | |    |  ___/|  __| |  _  / 
| |_) _| |_| |____ _| |_| |_) _| |_| |____ _| |_| |  | | |____| |____| |    | |____| | \\ \\ 
|____|_____|______|_____|____|_____|______|_____|_|  |_|______|______|_|    |______|_|  \\_\\

-... .. .-.. .. -... .. .-.. ..    .... . .-.. .--. . .-.                    version: ${version}
`, 'color: #00a1d6');
};

export const toDuration = (seconds) => {
    const duration = moment.duration(seconds, 'seconds');
    const hoursStr = duration.hours();
    const minutesStr = String(duration.minutes()).padStart(2, 0);
    const secondsStr = String(duration.seconds()).padStart(2, 0);
    let durationStr = `${Number(hoursStr) ? hoursStr + ':' : ''}${minutesStr}:${secondsStr}`;
    if (durationStr[0] === '0') durationStr = durationStr.slice(1);
    return durationStr;
}
