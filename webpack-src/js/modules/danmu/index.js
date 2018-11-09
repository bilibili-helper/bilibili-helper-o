/**
 * Author: DrowsyFlesh
 * Create: 2018/10/30
 * Description:
 */
import {Feature} from 'Libs/feature';
import URL from 'url-parse';

export {DanmuUI} from './UI/index';

export class Danmu extends Feature {
    constructor() {
        super({
            name: 'danmu',
            kind: 'video',
            dependencies: ['debug', 'video'],
            settings: {
                on: true,
                title: '视频弹幕相关',
                type: 'checkbox',
                hasUI: true,
                options: [
                    //{key: 'download', title: '视频下载', on: true},
                    {key: 'danmu', title: '弹幕查询', on: true},
                    {key: 'danmuDownload', title: '弹幕下载', on: false, toggle: false},
                ],
            },
        });
        this.tabStores = {};
    }

    addListener = () => {
        const requestFilter = {
            urls: [
                '*://api.bilibili.com/x/v2/dm/history?type=*', // 历史弹幕
                '*://api.bilibili.com/x/v1/dm/list.so?oid=*', // 最新弹幕
            ],
        };
        chrome.webRequest.onCompleted.addListener((details) => {
            const {tabId} = details;
            const url = new URL(details.url, '', true);
            const {pathname, query} = url;
            console.log(tabId, 'onCompleted', pathname, query);
            // 收到前端页面请求
            const store = this.createTabStore(tabId);
            const {state, queue, data} = store;
            const newQueue = [];
            if (pathname === '/x/v1/dm/list.so') { // 如果tab请求了当天弹幕
                data.cid = query.oid;
                newQueue.push({ // 将监听到的事件添加到队列中
                    commend: 'loadCurrentDanmu',
                    cid: query.oid,
                });
            } else if (pathname === '/x/v2/dm/history' && query.date) { // 如果tab请求了历史弹幕
                newQueue.push({ // 将监听到的事件添加到队列中
                    commend: 'loadHistoryDanmu',
                    cid: data.cid,
                    date: query.date,
                });
            }
            // 添加新任务到队尾
            if (newQueue.length > 0) this.tabStores[tabId].queue = queue.concat(newQueue);
            if (state) { // state > 0 前端已经初始化完毕
                this.dealWithTabStoreTask(tabId, store); // 处理queue
            }
            //console.log(details, state);
        }, requestFilter, ['responseHeaders']);
        chrome.runtime.onMessage.addListener((message, sender) => {
            /**
             * 监听前端dom的初始化结果推送
             * 然后初始化后端每个tab对应的store
             */
            if (message.commend === 'danmuDOMInitialized' && sender.tab.id) {
                const tabId = sender.tab.id;
                // 发现没有创建过相关tabStore，说明dom初始化在原始页面发送请求前完成，按理说概率不大/不会发生
                const store = this.createTabStore(tabId);
                const {state, iterator, queue} = store;
                if (state === 0) {
                    this.tabStores[tabId].state = iterator.next().value;
                    // 如果在收到前端初始化通知前就有收到请求，则处理任务队列
                    if (queue.length > 0) this.dealWithTabStoreTask(tabId, store);
                } else console.warn(`Tab store is already in state:`, state);
            }
        });
    };

    /**
     * 创建tab数据存储对象
     * @param tabId
     * @return {{state, iterator, generator}}
     */
    createTabStore = (tabId) => {
        if (this.tabStores[tabId]) return this.tabStores[tabId];
        else {
            const generator = (function* () {
                yield 0; // 0 代表等待模块初始化状态
                return 1;
            });
            const iterator = generator();
            const state = iterator.next().value; // 初始状态 0 等待前端信号
            const queue = []; // 任务队列
            const data = {tabId}; // 数据对象 存储如cid之类的数据
            this.tabStores[tabId] = {state, iterator, generator, queue, data};
            console.log(`Created tab[${tabId}] store!`, this.tabStores[tabId]);
            return this.tabStores[tabId];
        }
    };

    // 处理任务队列
    dealWithTabStoreTask = (tabId, store) => {
        const doIt = (tabId, taskData) => {
            if (!taskData) return Promise.resolve();
            return new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(tabId, taskData, (res) => {
                    console.log(taskData, res);
                    res ? resolve() : reject();
                });
            });
        };
        const {state, queue} = store;
        state === 1 && doIt(tabId, queue.shift()).then(() => {
            // 如果队列不为空
            queue.length > 0 && this.dealWithTabStoreTask(tabId, store);
        }, (error) => console.error(error));
    };
};