/**
 * Author: Ruo
 * Create: 2018-08-19
 * Description: 常用方法
 */
/* global chrome */

import moment from 'moment';
import Url from 'url-parse';
import store from 'store';

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

let currentLangConfig = store.get('bilibili-helper-language');
let lang = (currentLangConfig && currentLangConfig.subPage && currentLangConfig.subPage.value) || navigator.language;
let i18nCacheValidTime = 1000; // 1s
let i18nCacheTimer;
/**
 * i18n工具函数
 * @description 配合language模块重新写了一下
 * @param string {string}
 * @param [options] {object}
 */
export const __ = (string, options = null) => {
    // 做一次短暂缓存，用于响应语言设置变化
    if (!i18nCacheTimer) {
        i18nCacheTimer = setTimeout(() => {
            currentLangConfig = store.get('bilibili-helper-language');
            lang = (currentLangConfig && currentLangConfig.subPage && currentLangConfig.subPage.value) || navigator.language;
            i18nCacheTimer = null;
        }, i18nCacheValidTime);
    }
    if (lang === 'auto' || lang === chrome.i18n.getUILanguage()) {
        return chrome.i18n.getMessage(string, options);
    } else if (window.i18nMap && (lang in window.i18nMap)) {
        const target = window.i18nMap[lang][string];
        if (target) {
            const {message, placeholders = {}} = target;
            let resultMessage = message;
            // 检查替换变量
            const replacedValue = /\$(.+?)\$/g.exec(message);

            if (replacedValue) {
                const targetRes = replacedValue.slice(1);
                targetRes.map(t => t.toLowerCase()).map(t => {
                    if (t in placeholders) {
                        resultMessage = message.replace(new RegExp(`\\$${t}\\$`, 'ig'), () => {
                            return options.shift();
                        });
                    }
                });
            }
            return resultMessage;
        } else {
            return '';
        }
    } else {
        console.error(`not catch lang: ${lang} in string ${string}`);
        return '';
    }
};

/**
 * 创建新tab页面
 * @param url
 */
export const createTab = (url, active = true) => {
    chrome.tabs.create({url, active});
};

/**
 * 当前版本号
 * @type {string}
 */
export const version = chrome.runtime.getManifest().version;

export const appName = chrome.runtime.getManifest().name;

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
    return isBiggerThan(checkVersion, version) > 0;
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
        case 'history':
            return 'https://www.bilibili.com/account/history';
    }
};

/**
 * Get semantic file name (without extension) from video playback page.
 * @param doc
 * @return {string}
 */
export const getFilename = (doc) => {
    const partDOM = doc.querySelector('#v_multipage a.on, #multi_page .cur-list li.on a, #eplist_module .list-wrapper ul .cursor');
    const partName = partDOM ? partDOM.innerText : '';
    const title = doc.querySelector('#viewbox_report h1, .header-info h1, .media-wrapper > h1, h1.video-title');
    return `${title ? title.getAttribute('title') : ''}${partName ? `_${partName}` : ''}`.replace(/\s/g, '').replace(/[|"*?:<>\s~/]/g, '_');
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
export const inLiveRoom = () => /^\/([/blanc/\d]+)|(\/record\/)/.exec(window.location.pathname) ? true : false;

export const consoleLogo = (from) => {
    // eslint-disable-next-line no-console
    console.log(`%c
 ____ _____ _      _____ ____ _____ _      _____ _    _ ______ _      _____  ______ _____
|  _ |_   _| |    |_   _|  _ |_   _| |    |_   _| |  | |  ____| |    |  __ \\|  ____|  __ \\
| |_) || | | |      | | | |_) || | | |      | | | |__| | |__  | |    | |__) | |__  | |__) |
|  _ < | | | |      | | |  _ < | | | |      | | |  __  |  __| | |    |  ___/|  __| |  _  /
| |_) _| |_| |____ _| |_| |_) _| |_| |____ _| |_| |  | | |____| |____| |    | |____| | \\ \\
|____|_____|______|_____|____|_____|______|_____|_|  |_|______|______|_|    |______|_|  \\_\\

-... .. .-.. .. -... .. .-.. ..    .... . .-.. .--. . .-.   version: ${version} ${from ? `from: ${from}` : ''}
`, 'color: #00a1d6');
};

/**
 * 将秒数转为00:00:00格式
 * @param seconds
 * @return {string}
 */
export const toDuration = (seconds) => {
    const duration = moment.duration(seconds, 'seconds');
    const hoursStr = duration.hours();
    const minutesStr = String(duration.minutes()).padStart(2, 0);
    const secondsStr = String(duration.seconds()).padStart(2, 0);
    let durationStr = `${Number(hoursStr) ? hoursStr + ':' : ''}${minutesStr}:${secondsStr}`;
    if (durationStr[0] === '0') { durationStr = durationStr.slice(1); }
    return durationStr;
};

export const isBiggerThan = (a, b) => {
    if (a === b) {
        return 0;
    }

    let a_components = a.split('.');
    let b_components = b.split('.');

    let len = Math.min(a_components.length, b_components.length);

    // loop while the components are equal
    for (let i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_components[i] || 0) > parseInt(b_components[i] || 0)) {
            return 1;
        }

        // B bigger than A
        if (parseInt(a_components[i] || 0) < parseInt(b_components[i] || 0)) {
            return -1;
        }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
        return 1;
    }

    if (a_components.length < b_components.length) {
        return -1;
    }

    // Otherwise they are the same.
    return 0;
};

export const isFireFox = typeof InstallTrigger !== 'undefined';

export const createNotification = (id, options, callback) => {
    if (isFireFox) { delete options.buttons; }
    return chrome.notifications.create(id, options, callback);
};

export const fetchFromHelper = (url, options) => {
    if (options) {
        if (options.headers) {
            options.headers = {...options.headers, 'From': 'bilibili-helper'};
        } else {
            options.headers = {'From': 'bilibili-helper'};
        }
    } else {
        options = {headers: {'From': 'bilibili-helper'}};
    }
    const urlObject = new Url(url, '', true);
    if (!urlObject.query || !urlObject.query.requestFrom) {
        urlObject.set('query', {
            ...urlObject.query,
            requestFrom: 'bilibili-helper',
        });
    }

    return fetch(decodeURIComponent(urlObject.href), options).catch((e) => console.error(url, e));
};

// 来源 https://www.zhihu.com/question/381784377/answer/1099438784
const avbv = {
    table: 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF',
    map: JSON.parse(`{"1":13,"2":12,"3":46,"4":31,"5":43,"6":18,"7":40,"8":28,"9":5,"f":0,"Z":1,"o":2,"d":3,"R":4,"X":6,"Q":7,"D":8,"S":9,"U":10,"m":11,"y":14,"C":15,"k":16,"r":17,"z":19,"B":20,"q":21,"i":22,"v":23,"e":24,"Y":25,"a":26,"h":27,"b":29,"t":30,"x":32,"s":33,"W":34,"p":35,"H":36,"n":37,"J":38,"E":39,"j":41,"L":42,"V":44,"G":45,"g":47,"u":48,"M":49,"T":50,"K":51,"N":52,"P":53,"A":54,"w":55,"c":56,"F":57}`),
    s: [11, 10, 3, 8, 4, 6],
    xor: 177451812,
    add: 8728348608,
};

export const av2bv = (avid) => {
    if (typeof avid === 'number') {
        avid = (avid ^ avbv.xor) + avbv.add;
        const r = ['B', 'V', '1', ' ', ' ', '4', ' ', '1', ' ', '7', ' ', ' '];
        for (let i = 0; i < 6; ++i) {
            r[avbv.s[i]] = avbv.table[Math.floor(avid / 58 ** i) % 58];
        }
        return r.join('');
    } else {
        console.warn('wrong id:' + avid);
    }
};

export const bv2av = (bvid) => {
    let r = 0;
    for (let i = 0; i < 6; ++i) {
        r += avbv.map[bvid[avbv.s[i]]] * 58 ** i;
    }

    return (r - avbv.add) ^ avbv.xor;
};

export const initI18n = () => {
    return new Promise(resolve => {
        if (!window.i18nMap) {
            if (chrome.runtime.getBackgroundPage) {
                chrome.runtime.getBackgroundPage((win) => {
                    window.i18nMap = win.i18nMap;
                    resolve();
                });
            } else {
                chrome.runtime.sendMessage({command: 'getI18nMap'}, (i18nMap) => {
                    window.i18nMap = i18nMap;
                    resolve();
                });
            }
        }
    });
};

export const getUID = () => {
    return new Promise(resolve => {
        chrome.cookies.get({
            url: 'http://interface.bilibili.com/',
            name: 'DedeUserID',
        }, (cookie) => {
            const thisSecond = (new Date()).getTime() / 1000;
            // expirationDate 是秒数
            if (cookie && cookie.expirationDate > thisSecond) {
                resolve(cookie.value);
            } else {
                resolve();
            }
        });
    });
};

/**
 * 将部分HTML实体字符转化为名称
 * @param string
 * @return {*}
 */
export const encodeHTMLEntries = (string) => {
    return string.replace(/(["'&<>])/g, (char) => {
        switch (char) {
            case '"':
                return '&quot;';
            case '\'':
                return '&apos;';
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            default:
                return char;
        }
    });
};
