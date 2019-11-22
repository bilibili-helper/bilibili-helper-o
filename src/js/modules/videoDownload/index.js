import $ from 'Libs/jquery.min';

/**
 * Author: DrowsyFlesh
 * Create: 2018/11/11
 * Description:
 */
import Url from 'url-parse';
import _ from 'lodash';
import {Feature} from 'Libs/feature';
import {MessageStore} from 'Libs/messageStore';
import {__} from 'Utils/functions';
//import {flvDownloadURL} from 'Modules/videoDownload/api';

export {VideoDownloadUI} from './UI';

export class VideoDownload extends Feature {
    constructor() {
        super({
            name: 'videoDownload',
            kind: 'video',
            permissions: ['downloads'],
            dependencies: ['videoAnchor'],
            settings: {
                on: true,
                hasUI: true,
                title: __('videoDownload_name'),
                description: __('videoDownload_description'),
                type: 'checkbox',
                options: [
                    {key: 'showPiece', title: __('videoDownload_options_showFLVSegment'), on: true, description: __('videoDownload_options_showFLVSegment_description')},
                ],
            },
        });
        this.messageStore = new MessageStore('videoDownloadDOMInitialized');
        this.downloadFilenames = {};
    }

    launch = () => {};

    addListener = () => {
        const requestFilter = {
            urls: [
                //'*://api.bilibili.com/x/v2/dm/history?type=*', // 历史弹幕
                //'*://api.bilibili.com/x/v1/dm/list.so?oid=*', // 最新弹幕

                //'*://api.bilibili.com/x/player.so*', // 新页面特有，用于标记新页面，加载时特殊处理

                //'*://*.acgvideo.com/upgcxcode*',

                '*://interface.bilibili.com/v2/playurl?cid=*', // 旧版页面必定加载，画质，下载地址
                //'*://bangumi.bilibili.com/player/web_api/v2/playurl?cid=*', // 老番剧页面
                '*://api.bilibili.com/pgc/player/web/playurl?avid=*', // 新番剧页面
                '*://api.bilibili.com/x/player/playurl?avid=*', // 新版页面切换清晰度时调用，返回字段和上面相同

                '*://interface.bilibili.com/player?id=cid:*',
                '*://api.bilibili.com/x/player.so?id=cid:*',
            ],
        };
        chrome.webRequest.onBeforeSendHeaders.addListener(details => {
            const {tabId, initiator, requestHeaders} = details;
            const fromHelper = !_.isEmpty(_.find(requestHeaders, ({name, value}) => name === 'From' && value === 'bilibili-helper'));
            if (/^chrome-extension:\/\//.test(initiator) || fromHelper) {
                return;
            }
            const url = new Url(details.url, '', true);
            const {pathname, query: data} = url;
            const tabData = this.messageStore.createData(tabId);
            if (pathname === '/v2/playurl' || pathname === '/player/web_api/v2/playurl') { // 旧页面，画质，下载地址
                tabData.queue.push({
                    command: 'videoDownloadSendVideoRequest',
                    type: 'old',
                    data,
                    url: url.origin + url.pathname,
                });
                this.messageStore.dealWith(tabId); // 处理queue
            } else if (pathname === '/x/player/playurl' || pathname === '/pgc/player/web/playurl') { // 新页面
                //const newUrl = new Url(flvDownloadURL);
                //const {cid, avid, qn = ''} = data;
                //newUrl.set('query', {cid, avid, otype: 'json', qn});
                tabData.queue.push({
                    command: 'videoDownloadSendVideoRequest',
                    type: 'new',
                    data,
                    //url: newUrl.toString(),
                });
                this.messageStore.dealWith(tabId); // 处理queue
            } else if (pathname === '/player' || pathname === '/x/player.so') {
                tabData.queue.push({
                    command: 'videoDownloadCid',
                    cid: +data.id.slice(4),
                    avid: data.aid,
                });
                this.messageStore.dealWith(tabId); // 处理queue
            }
        }, requestFilter, ['requestHeaders']);
        chrome.runtime.onMessage.addListener((message) => {
            if (message.command === 'sendVideoFilename' && message.cid) {
                const url = new Url(message.url, '', true);
                this.downloadFilenames[url.pathname] = {
                    filename: message.filename,
                    cid: message.cid,
                };
            } else if (message.command === 'downloadMergedVideo' && message.url && message.filename) {
                chrome.downloads.download({
                    saveAs: true,
                    url: message.url,
                    filename: message.filename,
                });
            }
            return true;
        });
        chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
            const {url} = downloadItem;
            const urlObject = new Url(url, '', true);
            const filenameObject = this.downloadFilenames[urlObject.pathname];
            if (filenameObject) {
                const {filename, cid} = filenameObject;
                suggest({filename: `${filename}.${cid}.flv`, conflictAction: 'prompt'});
            }
            return true;
        });
    };
}
