/* eslint no-unused-vars: 0 */
/* global setOption: false, getOption: false, getCSS: false, version: false */

let notification = false,
    notificationAvid = {},
    playerTabs = {},
    viCache = {},
    locale = 0,
    localeAcquired = false,
    localeTimeout = null,
    secureAvailable = false,
    updateNotified = false,
    videoPlaybackHosts = ['http://*.hdslb.com/*', 'http://*.acgvideo.com/*'],
    Live = {},
    bangumi = false;

Live.set = function(n, k, v) {
    if (!window.localStorage || !n) {
        return;
    }
    let storage = window.localStorage;
    if (!storage[n]) {
        storage[n] = JSON.stringify({});
    }
    let l = JSON.parse(storage[n]);
    if (v === undefined) {
        storage[n] = typeof k === 'string' ? k.trim() : JSON.stringify(k);
    } else {
        l[k] = typeof v === 'string' ? v.trim() : JSON.stringify(v);
        storage[n] = JSON.stringify(l);
    }
};

Live.get = function(n, k, v) {
    if (!window.localStorage || !n) {
        return;
    }

    if (!window.localStorage[n]) {
        let temp = (v === undefined ? {} : v);
        if (k !== undefined && v !== undefined) {
            temp[k] = v;
        }
        window.localStorage[n] = JSON.stringify(temp);
    }
    let l = JSON.parse(window.localStorage[n]);
    if (k === undefined) {
        return l;
    }
    if (l[k] === 'true' || l[k] === 'false') {
        l[k] = JSON.parse(l[k]);
    }
    return l[k];
};

Live.del = function(n, k) {
    if (!window.localStorage || n === undefined || window.localStorage[n] === undefined) {
        return;
    }
    if (k === undefined) {
        window.localStorage.removeItem(n);
        return;
    }
    let l = JSON.parse(window.localStorage[n]);
    delete l[k];
    window.localStorage[n] = JSON.stringify(l);
};

Live.notisesIdList = {};
Live.favouritesIdList = Live.get('favouritesIdList', undefined, []);
Live.favouritesList = Live.get('favouritesList', undefined, {});

URL.prototype.__defineGetter__('query', function() {
    let parsed = this.search.substr(1).split('&');
    let parsedObj = {};
    parsed.forEach(function(elem, iter, arr) {
        let vals = arr[iter].split('=');
        parsedObj[vals[0]] = vals[1];
    });
    return parsedObj;
});

// let randomIP = function (fakeip) {
//     let ip_addr = '220.181.111.';
//     if (fakeip === 2) ip_addr = '59.152.193.';
//     ip_addr += Math.floor(Math.random() * 254 + 1);
//     return ip_addr;
// };

function getFileData(url, callback, method) {
    let m = 'GET';
    if (method && (method === 'POST'.toLowerCase() || method === 'GET'.toLowerCase())) {
        m = method;
    }
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open(m, url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            if (typeof callback === 'function') {
                callback(xmlhttp.responseText);
            }
        } else if (xmlhttp.readyState === 4 && xmlhttp.status > 400) {
            if (typeof callback === 'function') {
                callback('{}');
            }
        }
    };
    xmlhttp.send();
}

// http://stackoverflow.com/questions/6832596/how-to-compare-software-version-number-using-js-only-number/6832706#6832706

function compareVersion(a, b) {
    if (a === b) {
        return 0;
    }

    let a_components = a.split('.');
    let b_components = b.split('.');

    let len = Math.min(a_components.length, b_components.length);

    // loop while the components are equal
    for (let i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_components[i]) > parseInt(b_components[i])) {
            return 1;
        }

        // B bigger than A
        if (parseInt(a_components[i]) < parseInt(b_components[i])) {
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
}

function postFileData(url, data, callback) {
    let encodeData = '',
        append = false;
    Object.keys(data).forEach(function(key) {
        if (!append) {
            append = true;
        } else {
            encodeData += '&';
        }
        encodeData += encodeURIComponent(key).replace(/%20/g, '+') + '=' +
            encodeURIComponent(data[key]).replace(/%20/g, '+');
    });
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            if (typeof callback === 'function') {
                callback(xmlhttp.responseText);
            }
        }
    };
    xmlhttp.send(encodeData);
}

// function getUrlVars(url) {
//     let vars = [],
//         hash;
//     let hashes = url.slice(url.indexOf('?') + 1).split('&');
//     for (let i = 0; i < hashes.length; i++) {
//         hash = hashes[i].split('=');
//         vars.push(hash[0]);
//         vars[hash[0]] = hash[1];
//     }
//     return vars;
// }

function searchBilibili(info) {
    chrome.tabs.create({
        url: 'http://www.bilibili.com/search?keyword=' + info.selectionText,
    });
}

function notifyAllTabs(message) {
    chrome.windows.getAll({
        populate: true,
    }, function(wins) {
        wins.forEach(function(win) {
            win.tabs.forEach(function(tab) {
                chrome.tabs.sendMessage(tab.id, message);
            });
        });
    });
}

function updateAll() {
    notifyAllTabs({
        command: 'update',
    });
}

function enableAll() {
    setOption('enabled', true);
    updateAll();
}

function disableAll() {
    setOption('enabled', false);
    updateAll();
}

function checkDynamic() {
    if (getOption('dynamic') === 'on') {
        getFileData('http://api.bilibili.com/x/feed/unread/count?type=0', function(data) {
            let dynamic = JSON.parse(data);
            if (typeof dynamic === 'object' && dynamic.code === 0 && typeof dynamic.data === 'object' &&
                typeof dynamic.data.all === 'number') {
                if (dynamic.data.all > 0) {
                    setOption('updates', dynamic.data.all);
                    chrome.browserAction.setBadgeText({
                        text: getOption('updates'),
                    });
                    getFileData('http://api.bilibili.com/x/feed/pull?ps=1&type=0', function(data) {
                        let feed = JSON.parse(data);
                        if (typeof feed === 'object' && feed.code === 0 && typeof feed.data === 'object' &&
                            typeof feed.data.feeds === 'object' && feed.data.feeds.length > 0) {
                            let content = feed.data.feeds[0];
                            if (content.ctime !== parseInt(getOption('lastDyn'))) {
                                if (notification) {
                                    chrome.notifications.clear('bh-' + notification, function() {});
                                }
                                notification = content.ctime;
                                let message = chrome.i18n.getMessage('followingUpdateMessage').replace('%n', dynamic.data.all).replace('%uploader', content.source.uname).replace('%title', content.addition.title),
                                    icon = content.addition.pic ? content.addition.pic : 'imgs/icon-256.png';
                                notificationAvid['bh-' + notification] = content.addition.aid;
                                chrome.notifications.create('bh-' + notification, {
                                    type: 'basic',
                                    iconUrl: icon,
                                    title: chrome.i18n.getMessage('noticeficationTitle'),
                                    message: message,
                                    isClickable: false,
                                    buttons: [{
                                        title: chrome.i18n.getMessage('notificationWatch'),
                                    }, {
                                        title: chrome.i18n.getMessage('notificationShowAll'),
                                    }],
                                }, function() {});
                                setOption('lastDyn', content.ctime);
                            }
                        }
                    });
                } else {
                    setOption('updates', 0);
                    chrome.browserAction.setBadgeText({
                        text: '',
                    });
                }
            }
        });
    }
}

function resolvePlaybackLink(avPlaybackLink, callback) {
    if (!avPlaybackLink || !avPlaybackLink.durl || !avPlaybackLink.durl[0] || !avPlaybackLink.durl[0].url) {
        if (typeof callback === 'function') {
            callback(avPlaybackLink);
        }
        return false;
    }
    /* if (typeof avPlaybackLink.durl[0].backup_url === 'object' &&
      avPlaybackLink.durl[0].backup_url.length) {
      avPlaybackLink.durl[0].backup_url.forEach(function(url) {
        if (url.indexOf('hd.mp4') > -1) {
          avPlaybackLink.durl[0].url = url;
        }
      })
    }*/
    let xmlhttp = new XMLHttpRequest(),
        xmlChange = function() {
            if (xmlhttp.readyState === 2) {
                if (!retry && xmlhttp.status !== 200) {
                    retry = true;
                    xmlhttp.abort();
                    xmlhttp = new XMLHttpRequest();
                    xmlhttp.open('GET', avPlaybackLink.durl[0].url, true);
                    xmlhttp.onreadystatechange = xmlChange;
                    xmlhttp.send();
                }
                let url = xmlhttp.responseURL || avPlaybackLink.durl[0].url;
                let videoHost = new URL(url).origin + '/*';
                if (videoPlaybackHosts.indexOf(videoHost) < 0) {
                    videoPlaybackHosts.push(videoHost);
                    resetVideoHostList();
                }
                avPlaybackLink.durl[0].url = url;
                if (typeof callback === 'function') {
                    callback(avPlaybackLink);
                }
                xmlhttp.abort();
            }
        },
        retry = false;
    xmlhttp.open('HEAD', avPlaybackLink.durl[0].url, true);
    xmlhttp.onreadystatechange = xmlChange;
    xmlhttp.send();
}

function getVideoInfo(avid, page, callback) {
    page = parseInt(page);
    let currTime = parseInt(new Date().getTime() / 1000);
    if (isNaN(page) || page < 1) {
        page = 1;
    }
    if (typeof viCache[avid + '-' + page] !== 'undefined' && currTime - viCache[avid + '-' + page]['ts'] <= 3600) {
        callback(viCache[avid + '-' + page]);
        return true;
    }
    resetVideoHostList();
    getFileData('http://api.bilibili.com/view?type=json&appkey=8e9fc618fbd41e28&id=' + avid + '&page=' + page + '&batch=true', function(avInfo) {
        avInfo = JSON.parse(avInfo);
        if (typeof avInfo.code !== 'undefined' && avInfo.code === -503) {
            setTimeout(function() {
                getVideoInfo(avid, page, callback);
            }, 1000);
        } else {
            if (typeof avInfo.list === 'object') {
                avInfo.pages = avInfo.list.length;
                for (let i = 0; i < avInfo.pages; i++) {
                    if (avInfo.list[i].page === page) {
                        avInfo.cid = avInfo.list[i].cid;
                        break;
                    }
                }
            }
            if (typeof avInfo.cid === 'number') {
                viCache[avid + '-' + page] = {
                    mid: avInfo.mid,
                    tid: avInfo.tid,
                    cid: avInfo.cid,
                    pic: avInfo.pic,
                    pages: avInfo.pages,
                    title: avInfo.title,
                    list: avInfo.list,
                    sp_title: avInfo.sp_title,
                    spid: avInfo.spid,
                    season_id: avInfo.season_id,
                    created_at: avInfo.created_at,
                    description: avInfo.description,
                    tag: avInfo.tag,
                    ts: currTime,
                    bangumi: false,
                };
                if (typeof avInfo.bangumi === 'object') {
                    getFileData('http://api.bilibili.cn/sp?spid=' + avInfo.spid, function(spInfo) {
                        spInfo = JSON.parse(spInfo);
                        if (spInfo.isbangumi === 1) {
                            viCache[avid + '-' + page].bangumi = {
                                cover: spInfo.cover,
                                desc: spInfo.description,
                            };
                        }
                        callback(viCache[avid + '-' + page]);
                    });
                } else {
                    callback(viCache[avid + '-' + page]);
                }
            } else {
                callback(avInfo);
            }
        }
    });
    return true;
}

function checkSecurePlayer() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('HEAD', 'https://static-s.bilibili.com/play.swf', true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            secureAvailable = xmlhttp.getResponseHeader('Content-Type') === 'application/x-shockwave-flash';
        }
    };
    xmlhttp.send();
}

if (typeof (chrome.runtime.setUninstallURL) === 'function') {
    chrome.runtime.setUninstallURL('https://extlabs.io/analytics/uninstall/?uid=178&pid=264&finish_url=https%3A%2F%2Fbilihelper.guguke.net%2F%3Funinstall%26version%3D' + chrome.runtime.getManifest().version);
}
Live.treasure = {};
Live.watcherRoom = {};
Live.tvs = {};
Live.tvNotification = {};

function setTreasure(data) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
        for (let index in data) {
            if ({}.hasOwnProperty.call(data, index)) {
                Live.treasure[index] = data[index];
            }
        }
    }
}

function setWatcherRoom(data) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
        for (let index in data) {
            if ({}.hasOwnProperty.call(data, index)) {
                Live.watcherRoom[index] = data[index];
            }
        }
    }
}

function setFavourite(upInfo) {
    if (Live.favouritesIdList.indexOf(upInfo.roomId) === -1) {
        Live.favouritesIdList.push(upInfo.roomId);
        Live.favouritesList[upInfo.roomId] = upInfo;
        Live.set('favouritesIdList', Live.favouritesIdList);
        Live.set('favouritesList', Live.favouritesList);
        return true;
    }
    return false;
}

function setNotFavourite(id) {
    let index = Live.favouritesIdList.indexOf(id);
    if (index !== -1) {
        Live.favouritesIdList.splice(index, 1);
        delete Live.favouritesList[id];
        Live.set('favouritesIdList', Live.favouritesIdList);
        Live.set('favouritesList', Live.favouritesList);
        return true;
    }
    return false;
}
chrome.runtime.onConnect.addListener(function(port) {
    Live.treasure.port = port;
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.command) {
    case 'init':
        sendResponse({
            // replace: getOption('replace'),
            autowide: getOption('autowide'),
            version: version,
            macplayer: getOption('macplayer'),
            autooffset: getOption('autooffset'),
        });
        return true;
    case 'cidHack':
        if (isNaN(request.cid)) {
            return false;
        }
        playerTabs[sender.tab.id] = request.cid;
        sendResponse();
        return true;
    case 'getOption':
        sendResponse({
            value: getOption(request.key),
        });
        return true;
    case 'getAd':
        sendResponse({
            value: getOption('ad'),
        });
        return true;
    case 'setOption':
        setOption(request.key, request.value);
        sendResponse({
            value: getOption(request.key),
        });
        return true;
    case 'getTreasure':
        sendResponse({
            data: Live.treasure,
        });
        return true;
    case 'setTreasure':
        setTreasure(request.data);
        sendResponse({
            data: Live.treasure,
        });
        return true;
    case 'setCurrentTreasure':
        if (request.data.time_end !== undefined && request.data.time_end !== Live.treasure.time_end && Live.treasure.port) {
            setTreasure(request.data);
            Live.treasure.port.postMessage({
                command: 'updateCurrentTreasure',
                data: {
                    minute: request.data.minute,
                    silver: request.data.silver,
                    time_end: request.data.time_end,
                    time_start: request.data.time_start,
                },
            });
        }
        return true;
    case 'getCurrentTreasure':
        sendResponse({
            data: {
                minute: Live.treasure.minute,
                silver: Live.treasure.silver,
                time_end: Live.treasure.time_end,
                time_start: Live.treasure.time_start,
            },
        });
        return true;
    case 'delTreasure':
        sendResponse({
            data: Live.treasure = {},
        });
        return true;
    case 'getWatcherRoom':
        sendResponse({
            data: Live.watcherRoom,
        });
        return true;
    case 'setWatcherRoom':
        setWatcherRoom(request.data);
        sendResponse({
            data: Live.watcherRoom,
        });
        return true;
    case 'delWatcherRoom':
        sendResponse({
            data: Live.watcherRoom = {},
        });
        return true;
    case 'setFavourite':
        sendResponse({
            data: setFavourite(request.upInfo),
        });
        return true;
    case 'setNotFavourite':
        sendResponse({
            data: setNotFavourite(request.id),
        });
        return true;
    case 'getFavourite':
        sendResponse({
            data: Live.get('favouritesIdList'),
        });
        return true;
    case 'enableAll':
        enableAll();
        sendResponse({
            result: 'ok',
        });
        return true;
    case 'disableAll':
        disableAll();
        sendResponse({
            result: 'ok',
        });
        return true;
    case 'getCSS':
        if (getOption('enabled') === 'true' || getOption('ad') !== 'keep') {
            sendResponse({
                result: 'ok',
                css: getCSS(request.url),
            });
        } else {
            sendResponse({
                result: 'disabled',
            });
        }
        return true;
    case 'getVideoInfo':
        getVideoInfo(request.avid, request.pg, function(avInfo) {
            sendResponse({
                videoInfo: avInfo,
            });
        });
        return true;
    case 'getDownloadLink': {
        let url = {
            download: 'http://interface.bilibili.com/playurl?platform=bilihelper&otype=json&appkey=95acd7f6cc3392f3&cid=' + request.cid + '&quality=' + getOption('dlquality'),
            playback: 'http://interface.bilibili.com/playurl?platform=bilihelper&otype=json&appkey=95acd7f6cc3392f3&cid=' + request.cid + '&quality=2&type=mp4',
        };
        getFileData(url['download'], function(avDownloadLink) {
            avDownloadLink = JSON.parse(avDownloadLink);
            if (getOption('dlquality') === 'mp4') {
                if (avDownloadLink) {
                    resolvePlaybackLink(avDownloadLink, function(avRealPlaybackLink) {
                        sendResponse({
                            download: avDownloadLink,
                            playback: avRealPlaybackLink,
                            dlquality: getOption('dlquality'),
                            rel_search: getOption('rel_search'),
                        });
                    });
                }
            } else {
                getFileData(url['playback'], function(avPlaybackLink) {
                    avPlaybackLink = JSON.parse(avPlaybackLink);
                    resolvePlaybackLink(avPlaybackLink, function(avRealPlaybackLink) {
                        sendResponse({
                            download: avDownloadLink,
                            playback: avRealPlaybackLink,
                            dlquality: getOption('dlquality'),
                            rel_search: getOption('rel_search'),
                        });
                    });
                });
            }
        });
        return true;
    }
    case 'getMyInfo':
        getFileData('http://api.bilibili.com/myinfo', function(myinfo) {
            myinfo = JSON.parse(myinfo);
            if (typeof myinfo.code === undefined) {
                myinfo.code = 200;
            }
            sendResponse({
                code: myinfo.code || 200,
                myinfo: myinfo,
            });
        });
        return true;
    case 'getBangumiInfo':
        {
            let episodeId = request.episodeId;
            getFileData('http://bangumi.bilibili.com/web_api/episode/' + episodeId + '.json', function(bangumiInfo) {
                bangumiInfo = JSON.parse(bangumiInfo);
                if (typeof bangumiInfo.code === undefined) {
                    bangumiInfo.code = 200;
                }
                bangumiInfo = bangumiInfo.result;
                sendResponse({
                    videoInfo: bangumiInfo.currentEpisode,
                });
            });
            return true;
        }
    case 'searchVideo':
        { let keyword = request.keyword;
            getFileData('http://api.bilibili.com/search?type=json&appkey=8e9fc618fbd41e28&keyword=' + encodeURIComponent(keyword) + '&page=1&order=ranklevel', function(searchResult) {
                searchResult = JSON.parse(searchResult);
                if (searchResult.code === 0) {
                    sendResponse({
                        status: 'ok',
                        result: searchResult.result[0],
                    });
                } else {
                    sendResponse({
                        status: 'error',
                        code: searchResult.code,
                        error: searchResult.error,
                    });
                }
            });
            return true; }
    case 'checkComment':
        getFileData('http://www.bilibili.com/feedback/arc-' + request.avid + '-1.html', function(commentData) {
            let test = commentData.indexOf('<div class="no_more">');
            if (test >= 0) {
                sendResponse({
                    banned: true,
                });
            } else {
                sendResponse({
                    banned: false,
                });
            }
        });
        return true;
    case 'savePlayerConfig':
        sendResponse({
            result: setOption('playerConfig', JSON.stringify(request.config)),
        });
        return true;
    case 'sendComment':
        { let errorCode = ['正常', '选择的弹幕模式错误', '用户被禁止', '系统禁止',
            '投稿不存在', 'UP主禁止', '权限有误', '视频未审核/未发布', '禁止游客弹幕',
        ];
            request.comment.cid = request.cid;
            postFileData('http://interface.bilibili.com/dmpost?cid=' + request.cid +
                '&aid=' + request.avid + '&pid=' + request.page, request.comment,
                function(result) {
                    result = parseInt(result);
                    if (result < 0) {
                        sendResponse({
                            result: false,
                            error: errorCode[-result],
                        });
                    } else {
                        sendResponse({
                            result: true,
                            id: result,
                        });
                    }
                });
            return true; }
    case 'tvNotification':
        {
            let data = request.data;
            let roomId = data.roomId;
            Live.tvNotification[roomId] = true;
            chrome.notifications.create(roomId, {
                type: 'basic',
                iconUrl: 'http://static.hdslb.com/live-static/live-room/images/gift-section/gift-25.gif',
                title: '小电视抽奖提示',
                message: '直播间【' + roomId + '】正在进行小电视抽奖',
                isClickable: true,
                buttons: [{
                    title: chrome.i18n.getMessage('notificationGetTv'),
                }],
            }, function(id) {
                setTimeout(function() {
                    chrome.notifications.clear(id);
                }, 10000);
            });

            return true;
        }
    case 'getTVReward':
        { let rewardStr = '',
            lost = '很遗憾，此次您没有中奖';
            let data = request.data;
            if (data.rewardId === 1) {
                rewardStr += '大号小电视' + data.rewardNum + '个';
            } else if (data.rewardId === 2) {
                rewardStr += '蓝白胖次道具' + data.rewardNum + '个';
            } else if (data.rewardId === 3) {
                rewardStr += 'B坷垃' + data.rewardNum + '个';
            } else if (data.rewardId === 4) {
                rewardStr += '喵娘' + data.rewardNum + '个';
            } else if (data.rewardId === 5) {
                rewardStr += '便当' + data.rewardNum + '个';
            } else if (data.rewardId === 6) {
                rewardStr += '银瓜子' + data.rewardNum + '个';
            } else if (data.rewardId === 7) {
                rewardStr += '辣条' + data.rewardNum + '个';
            } else {
                rewardStr += lost;
            }
            if (data.rewardNum > 0) {
                if (data.rewardId === 1 || data.isWin) {
                    chrome.notifications.create('getTV', {
                        type: 'basic',
                        iconUrl: 'http://static.hdslb.com/live-static/live-room/images/gift-section/gift-25.png',
                        title: '小电视抽奖结果',
                        message: '恭喜你抽到了小电视，请尽快前往填写收货地址，不填视为放弃',
                        isClickable: false,
                        buttons: [{
                            title: chrome.i18n.getMessage('notificationGetTv'),
                        }],
                    }, function(id) {
                        setTimeout(function() {
                            chrome.notifications.clear(id);
                        }, 10000);
                    });
                } else {
                    chrome.notifications.create('getTV', {
                        type: 'basic',
                        iconUrl: 'http://static.hdslb.com/live-static/live-room/images/gift-section/gift-25.png',
                        title: '小电视抽奖结果',
                        isClickable: false,
                        message: '在直播间:' + data.roomId + ' 抽到' + rewardStr,
                    }, function(id) {
                        setTimeout(function() {
                            chrome.notifications.clear(id);
                        }, 10000);
                    });
                }
            } else {
                chrome.notifications.create('getTV', {
                    type: 'basic',
                    iconUrl: 'http://static.hdslb.com/live-static/live-room/images/gift-section/gift-25.png',
                    title: '直播间:' + data.roomId,
                    message: rewardStr,
                    isClickable: false,
                }, function(id) {
                    setTimeout(function() {
                        chrome.notifications.clear(id);
                    }, 10000);
                });
            }
            return true; }
    case 'requestForDownload':
        chrome.downloads.download({
            saveAs: true,
            url: request.data ? URL.createObjectURL(new Blob([request.data], {
                type: 'application/octet-stream',
            })) : request.url,
            filename: 'Bilibili/' + request.filename,
        });
        return true;

    case 'callBilibiliMac':
        postFileData('http://localhost:23330/rpc', request.data, function() {
            sendResponse(true);
        });
        return true;

    default:
        sendResponse({
            result: 'unknown',
        });
        return false;
    }
});

if (localStorage.getItem('enabled') === null) {
    enableAll();
}

if (getOption('contextmenu') === 'on') {
    chrome.contextMenus.create({
        title: chrome.i18n.getMessage('searchBili'),
        contexts: ['selection'],
        onclick: searchBilibili,
    });
}

checkDynamic();

if (window.navigator.userAgent.indexOf('Windows') < 0) {
    checkSecurePlayer();
}

chrome.alarms.create('checkDynamic', {
    periodInMinutes: 1,
});
getOption('versionNotify') === 'on' && chrome.alarms.create('checkVersion', {
    periodInMinutes: 60,
});

/* chrome.alarms.create('getLocale', {
    periodInMinutes: 5,
}); */

/*
function getLocale() {
    getFileData('https://telize.guguke.net/geoip', function(result) {
        try {
            result = JSON.parse(result);
            if (result.country_code) {
                switch (result.country_code) {
                case 'CN':
                    locale = 1;
                    break;
                case 'TW':
                case 'HK':
                case 'MO':
                    locale = 2;
                    break;
                default:
                    locale = 0;
                    break;
                }
                localeAcquired = true;
                checkVersion();
            } else {
                throw new Error('locale undetermined');
            }
        } catch (e) {
            console.error('Failed to get locale', e);
            localeTimeout = setTimeout(function() {
                getLocale();
            }, 10000);
        }
    });
}
*/

function checkVersion() {
    let versionNotify = getOption('versionNotify');
    versionNotify === 'on' &&
        getFileData('https://bilihelper.guguke.net/version.json?v=' + encodeURIComponent(chrome.runtime.getManifest().version), function(result) {
            try {
                result = JSON.parse(result);
                if (compareVersion(result.version, chrome.runtime.getManifest().version) > 0) {
                    setOption('crx_update', JSON.stringify(result));
                    if (!localeAcquired || locale === 1 || new Date().getTime() - result.update_time > 259200000) {
                        updateNotified = true;

                        chrome.tabs.create({
                            url: chrome.extension.getURL('options.html?mod=new'),
                        });
                    }
                }
            } catch (e) {
                console.error('Failed to check version', e);
            }
        });
}
chrome.runtime.onInstalled.addListener(function(details) {
    setOption('version', chrome.runtime.getManifest().version);
    if (details.reason === 'install') {
        chrome.tabs.create({
            url: chrome.extension.getURL('options.html?mod=install'),
        });
    } else if (details.reason === 'update') {
        if (compareVersion(getOption('version'), chrome.runtime.getManifest().version) < 0) {
            chrome.notifications.create('bh-update', {
                type: 'basic',
                iconUrl: 'imgs/icon-256.png',
                title: chrome.i18n.getMessage('noticeficationTitle'),
                message: chrome.i18n.getMessage('noticeficationExtensionUpdate').replace('%v', chrome.runtime.getManifest().version),
                isClickable: false,
                buttons: [{
                    title: chrome.i18n.getMessage('noticeficationNewFeatures'),
                }],
            }, function() {});
        }
    }
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    switch (alarm.name) {
    case 'checkDynamic':
        checkDynamic();
        return true;
    case 'checkVersion':
        if (!updateNotified) {
            checkVersion();
        }
        return true;
    case 'getLocale':
        if (!localeAcquired) {
            clearTimeout(localeTimeout);
            // getLocale();
        }
        return true;
    default:
        return false;
    }
});

chrome.notifications.onButtonClicked.addListener(function(notificationId, index) {
    if (Live.tvNotification[notificationId] !== undefined) {
        chrome.tabs.create({
            url: 'http://live.bilibili.com/' + notificationId,
        });
    }
    if (Live.notisesIdList[notificationId] !== undefined) {
        if (index === 0) {
            chrome.tabs.create({
                url: Live.notisesIdList[notificationId].link,
            });
        } else if (index === 1) {
            chrome.tabs.create({
                url: 'http://live.bilibili.com/i/following',
            });
        }
    } else if (notificationId === 'bh-update') {
        chrome.tabs.create({
            url: chrome.extension.getURL('options.html?mod=update'),
        });
    } else if (notificationId === 'getTV') {
        chrome.tabs.create({
            url: 'http://live.bilibili.com/i/awards',
        });
    } else if (index === 0 && notificationAvid[notificationId]) {
        chrome.tabs.create({
            url: 'http://www.bilibili.com/video/av' + notificationAvid[notificationId],
        });
    } else if (index === 1) {
        chrome.tabs.create({
            url: 'http://www.bilibili.com/account/dynamic',
        });
    }
});

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    chrome.tabs.sendMessage(details.tabId, {
        command: 'error',
    });
}, {
    urls: ['http://comment.bilibili.com/1272.xml'],
});

chrome.webRequest.onBeforeRequest.addListener(function() {
    if (secureAvailable) {
        return {
            redirectUrl: 'https://static-s.bilibili.com/play.swf',
        };
    } else {
        return {};
    }
}, {
    urls: ['http://static.hdslb.com/play.swf'],
}, ['blocking']);

function receivedHeaderModifier(details) {
    let hasCORS = false;
    details.responseHeaders.forEach(function(v) {
        if (v.name.toLowerCase() === 'access-control-allow-origin') {
            hasCORS = true;
        }
    });
    if (!hasCORS && !bangumi) {
        details.responseHeaders.push({
            name: 'Access-Control-Allow-Origin',
            value: 'http://www.bilibili.com',
        });
    } else if (!hasCORS) {
        details.responseHeaders.push({
            name: 'Access-Control-Allow-Origin',
            value: 'http://bangumi.bilibili.com',
        });
    }
    return {
        responseHeaders: details.responseHeaders,
    };
}

function resetVideoHostList() {
    if (chrome.webRequest.onHeadersReceived.hasListener(receivedHeaderModifier)) {
        chrome.webRequest.onHeadersReceived.removeListener(receivedHeaderModifier);
    }
    chrome.webRequest.onHeadersReceived.addListener(receivedHeaderModifier, {
        urls: videoPlaybackHosts,
    }, ['responseHeaders', 'blocking']);
}

chrome.webRequest.onHeadersReceived.addListener(function(details) {
    let headers = details.responseHeaders;
    if (details.statusLine.indexOf('HTTP/1.1 302') === 0 && getOption('replace') === 'on') {
        for (let i = 0; i < headers.length; i++) {
            if (headers[i].name.toLowerCase() === 'location') {
                headers.splice(i, 1, {
                    name: 'Set-Cookie',
                    value: 'redirectUrl=' + encodeURIComponent(headers[i].value),
                });
            }
        }
    }
    return {
        responseHeaders: headers,
    };
}, {
    urls: ['http://www.bilibili.com/video/av*', 'http://bangumi.bilibili.com/anime/v/*'],
}, ['responseHeaders', 'blocking']);

function getCookie(name) {
    let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

function each(obj, fn) {
    if (!fn) {
        return;
    }
    if (obj instanceof Array) {
        let i = 0,
            len = obj.length;
        for (; i < len; i++) {
            if (fn.call(obj[i], i) === false) {
                break;
            }
        }
    } else if (typeof obj === 'object') {
        let j = null;
        for (j in obj) {
            if (fn.call(obj[j], j) === false) {
                break;
            }
        }
    }
}
Live.notise = {
    page: 1,
    userMode: function() {
        return getCookie('DedeUserID');
    }(),
    hasMore: !1,
    list: [],
    count: 0,
    intervalNum: undefined,
    heart: {},
    roomIdList: {},
    cacheList: {},
    getList: function(d) {
        let url = 'http://live.bilibili.com/feed/getList/' + Live.notise.page;
        let callback = function(t) {
            t = t.substr(1, t.length - 3);
            t = JSON.parse(t);
            let roomIdList = {},
                newList = [];
            each(t.data.list, function(i) {
                roomIdList[t.data.list[i].roomid] = t.data.list[i];
            });

            if (1 === Live.notise.page) {
                Live.notise.cacheList = roomIdList;
            } else {
                each(roomIdList, function(i) {
                    Live.notise.cacheList[i] = roomIdList[i];
                });
            }
            Live.notise.hasMore = (t.data.count > 10 && t.data.list.length === 10 && Live.notise.userMode);

            if (!Live.notise.hasMore || d.has_new) {
                for (let q in Live.notise.cacheList) {
                    if (Live.notise.roomIdList[q] === undefined) {
                        newList.push(Live.notise.cacheList[q]);
                    }
                }

                if (newList.length) {
                    each(newList, function(i) {
                        if (Live.favouritesIdList.indexOf(parseInt(newList[i].roomid)) !== -1) {
                            let data = newList[i];
                            chrome.notifications.create(data.roomid, {
                                type: 'basic',
                                iconUrl: data.face,
                                title: data.nickname + chrome.i18n.getMessage('notificationLiveOn'),
                                message: data.roomname,
                                isClickable: true,
                                buttons: [{
                                    title: chrome.i18n.getMessage('notificationWatch'),
                                }],
                            }, function(id) {
                                Live.notisesIdList[id] = data;
                                setTimeout(function() {
                                    chrome.notifications.clear(id);
                                    delete Live.notisesIdList[id];
                                }, 10000);
                            });
                        }
                    });
                }
                Live.notise.roomIdList = Live.notise.cacheList;
                Live.notise.cacheList = {};
            }
        };
        let type = Live.notise.userMode ? 'POST' : 'GET';

        getFileData(url, callback, type);
    },
    heartBeat: function() {
        getFileData('http://live.bilibili.com/feed/heartBeat/heartBeat', function(data) {
            data = JSON.parse(data);
            Live.notise.do(data);
        }, 'POST');
    },
    do: function(data) {
        if (data.data) {
            Live.notise.feedMode = data.data.open;
            if (0 === data.code) {
                Live.notise.count = data.data.count;
                if (data.data.open && data.data.has_new) {
                    Live.notise.count = 0;
                    Live.notise.page = 1;
                    Live.notise.open = !0;
                    Live.notise.getList(data.data);
                }
            } else {
                clearInterval(Live.notise.intervalNum);
            }
        }
    },
    init: function() {
        Live.notise.count = 0;
        Live.notise.hasMore = !1;
        Live.notise.list = [];
        Live.notise.count = 0;
        Live.notise.intervalNum = undefined;
        Live.notise.heart = {};
        Live.notise.roomIdList = {};
        Live.notise.cacheList = {};
        Live.notise.heartBeat();
        Live.notise.getList();
        Live.notise.intervalNum = setInterval(function() {
            Live.notise.heartBeat();
            if (Live.notise.hasMore) {
                Live.notise.page++;
                Live.notise.getList();
            }
        }, 30000);
    },
};
if (getOption('liveNotification') === 'on') {
    Live.notise.init();
}

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(request) {
        if (!request.cmd) {
            return false;
        }
    });
});
