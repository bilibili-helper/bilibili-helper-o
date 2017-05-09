/* global updateAll */
/* eslint no-unused-vars: 0 */

let version = 'v' + chrome.runtime.getManifest().version;
let general = '';
let defaultOptions = {
    'ad': 'off',
    // 'ad_opacity': 0.1,
    'contextmenu': 'on',
    'crx_update': '{}',
    'dlquality': 'flv',
    'dynamic': 'on',
    'enabled': false,
	// "html5": "off",
    'indexversion': 'new',
    'lastDyn': 0,
    // 'playerConfig': '{"volume":1,"opacity":0.8,"scale":1,"prop":true}',
    'rel_search': 'without',
	// "replace": "on",
    'updates': 0,
    'version': 0,
    'doSign': 'on',
    'autoTreasure': 'on',
    'danmu': 'on',
    'liveNotification': 'on',
    'favouritesIdList': '[]',
    'favouritesList': '{}',
    'chatDisplay': 'on',
    'displayOption': '[]',
    'versionNotify': 'on',
    'watcher': 'on',
    'watchList': '["tv"]',
    'watchNotify': 'on',
    'watchNotifyList': '[]',
    'giftpackage': 'on',
    'autowide': 'on',
    'macplayer': 'off',
    'autooffset': 'on',
};
let cidCache = {};
if (localStorage.getItem('cidCache') !== null) {
    try {
        cidCache = JSON.parse(localStorage.getItem('cidCache'));
    } catch (e) {
        localStorage.setItem('cidCache', null);
    }
}
function getOption(key) {
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, defaultOptions[key]);
    }
    return localStorage.getItem(key);
}

function setOption(key, value, pushcss) {
    localStorage.setItem(key, value);
    if (pushcss) {
        updateAll();
    }
    return true;
}

function clearStorage() {
    let storageItems = Object.keys(localStorage);
    for (let i = 0; i < storageItems.length; i++) {
        if (typeof defaultOptions[storageItems[i]] === 'undefined') {
            localStorage.removeItem(storageItems[i]);
        }
    }
}

clearStorage();
