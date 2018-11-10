/**
 * Author: Ruo
 * Create: 2018-08-19
 * Description: 常用方法
 */
/* global chrome */
//import $ from 'jquery';
//import _ from 'lodash';
//import * as allGUI from 'Modules/index_GUI';
import store from 'store';

/**
 * @param command
 * @param key
 * @param callback
 */
export const sendMessage = (command, key, callback) => {
    chrome.runtime.sendMessage({command, key}, (response) => {
        if (callback instanceof Function) callback(response);
        else console.error(`"SendMessage" (command: ${command} key: ${key}): invalid callback function.`);
    });
};

/**
 * @param url
 * @param name
 * @param callback
 */
//export const getCookie = (url, name, callback) => {
//    chrome.cookies.get({url, name}, function(cookie) {
//        if (callback instanceof Function) callback(cookie);
//        else console.error(`"SendMessage" (url: ${url} name: ${name}): invalid callback function.`);
//    });
//};

/**
 * @param t
 */
export const __ = (t, options) => chrome.i18n.getMessage(t, options);

/**
 * 判断是否登录
 * @return {Promise|boolean}
 */
export const isLogin = () => {
    return new Promise((resolve) => {
        chrome.cookies.get({
            url: 'http://interface.bilibili.com/',
            name: 'DedeUserID',
        }, function(cookie) {
            // expirationDate 是秒数
            if (cookie && cookie.expirationDate > (new Date()).getTime() / 1000) {
                resolve(true);
            } else resolve(false);
        });
    });
};

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

//export const checkNotificationPermission = () => {
//    const permission = store.get('bilibili-helper-permission') || {};
//    let notificationPermission;
//    chrome.notifications.getPermissionLevel((level) => {
//        if (level === 'granted') notificationPermission = true; // 获取到了权限
//        else if (level === 'denied') notificationPermission = false;
//        permission['notification'] = notificationPermission;
//        store.set('permission', permission);
//    });
//    return notificationPermission;
//};

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
        case 'option':
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