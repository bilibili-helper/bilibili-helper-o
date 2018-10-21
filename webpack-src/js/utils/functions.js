/**
 * Author: Ruo
 * Create: 2018-08-19
 * Description: 常用方法
 */
/* global chrome */
import _ from 'lodash';
import store from 'store';
import {defaultOptions} from './const';

export const BACKGROUND_PAGE = chrome.extension && chrome.extension.getBackgroundPage && chrome.extension.getBackgroundPage() || null;

/**
 * 获取配置
 * @param key
 */
export const getOption = (key) => {
    if (defaultOptions[key]) {
        let option = store.get(key);
        if (option && defaultOptions[key] && defaultOptions[key].types) {
            option.types = defaultOptions[key].types;
        } else if (option === undefined) {
            const {on, value, notify} = defaultOptions[key];
            option = {on, value, notify};
            setOption(key, {on, value, notify});
        }
        return option;
    }
};

/**
 * 设置配置
 * @param key {String}
 * @param value {any}
 * @return {void}
 */
export const setOption = (key, value) => {
    if (defaultOptions[key]) store.set(key, value);
};

/**
 * 获取所有配置
 * @return {Object}
 */
export const getOptions = () => _.reduce(defaultOptions, (result, value, key) => (result[key] = getOption(key), result), {});

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
export const getCookie = (url, name, callback) => {
    chrome.cookies.get({url, name}, function(cookie) {
        if (callback instanceof Function) callback(cookie);
        else console.error(`"SendMessage" (url: ${url} name: ${name}): invalid callback function.`);
    });
};

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

export const checkNotificationPermission = () => {
    const permission = store.get('bilibili-helper-permission') || {};
    let notificationPermission;
    chrome.notifications.getPermissionLevel((level) => {
        if (level === 'granted') notificationPermission = true; // 获取到了权限
        else if (level === 'denied') notificationPermission = false;
        permission['notification'] = notificationPermission;
        store.set('permission', permission);
    });
    return notificationPermission;
};