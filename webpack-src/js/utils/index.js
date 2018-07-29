/**
 * Author: Ruo
 * Create: 2018-06-12
 */
/* global chrome */
import defaultOptions from '../defaultOptions';
import store from 'store';
const bkg_page = chrome.extension.getBackgroundPage();

/**
 * @param key
 */
export const getOption = (key) => {
    if (store.get(key) === null) {
        store.set(key, defaultOptions[key]);
    }
    return store.get(key);
};

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
    chrome.cookies.get({url, name}, function (cookie) {
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
 * @return {Promise}
 */
export const isLogin = () => {
    return new Promise((resolve) => {
        bkg_page.chrome.cookies.get({
            url: 'http://interface.bilibili.com/',
            name: 'DedeUserID',
        }, function(cookie) {
            if (cookie && cookie.expirationDate > (new Date()).getTime() / 1000) {
                resolve(true);
            } else resolve(false);
        });
    })
}

/**
 * 创建新tab页面
 * @param url
 */
export const createTab = (url) => {
    chrome.tabs.create({url});
}

export const version = chrome.runtime.getManifest().version;

export const getUrl = (name) => chrome.extension.getURL(name);