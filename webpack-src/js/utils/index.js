/**
 * Author: Ruo
 * Create: 2018-06-12
 */
/* global chrome */
import defaultOptions from '../defaultOptions';
import store from 'store';

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
export const i18n = (t) => chrome.i18n.getMessage(t);
