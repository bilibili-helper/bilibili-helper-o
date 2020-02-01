/**
 * Author: DrowsyFlesh
 * Create: 2018/11/11
 * Description: 本模块用于同步前端DOM状态和收到的请求。
 * 例如，如果在前端DOM初始化之前就收到任务将会缓存任务等收到初始化完毕消息后执行
 */

export class MessageStore {
    constructor(initializedName) {
        this.store = {};
        this.initializedName = initializedName;
        this.addListener();
    }

    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender) => {
            /**
             * 监听前端dom的初始化结果推送
             * 然后初始化后端每个对应的store
             */
            const id = (sender.tab && sender.tab.id) || sender.id;
            if (message.command === this.initializedName) {
                // 发现没有创建过相关tabStore，说明dom初始化在原始页面发送请求前完成，按理说概率不大/不会发生
                let data = this.createData(id);
                if (data.state === 0) {
                    data.state = 1;
                } else {
                    console.warn(`This store is already in state:`, data.state);
                }
                // 如果在收到前端初始化通知前就有收到请求，则处理任务队列
                this.dealWith(id);
            }
            return true;
        });
        chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
            this.has(tabId) && removeInfo.isWindowClosing && this.delete(tabId);
        });
        chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
            const {status, url, favIconUrl, audible} = changeInfo;
            // 切换分P时url!==undefined，不需要清除
            if (this.has(tabId) && status === 'loading' && url === undefined && !favIconUrl && audible === undefined) {
                this.delete(tabId);
            } else if (this.has(tabId) && status === 'complete' && !favIconUrl && audible === undefined) {
                this.createData(tabId);
            }
        });
    };

    /**
     * 创建数据存储对象
     * @param id
     * @return {{state, queue, data}}
     */
    createData = (id, frameId) => {
        const storeId = this.createStoreId(id, frameId);
        if (this.has(storeId)) {
            return this.store[storeId];
        } else {
            //console.warn(`Create MessageStore on Tab ${id}`);
            return this.store[storeId] = {
                state: 0, // 初始状态 0 等待前端信号
                queue: [], // 任务队列
                data: {id}, // 数据对象 存储如cid之类的数据
            };
        }
    };

    createStoreId = (id, frameId) => `${id}${frameId ? '-' + frameId : ''}`;

    has = storeId => !!this.store[storeId];

    get = storeId => this.store[storeId];

    delete = storeId => delete this.store[storeId];

    doIt = (id, taskData) => {
        if (!taskData) { return Promise.resolve(); }
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(+id, taskData, (res) => {
                res !== undefined ? resolve() : reject(`No result from tab[${id}] - command[${taskData.command}]`);
            });
        });
    };

    // 处理任务队列
    dealWith = (id, frameId) => {
        const storeId = this.createStoreId(id, frameId);
        return this.dealWithOnce(id, frameId).then(() => {
            this.store[storeId] && this.store[storeId].queue.length > 0 && this.dealWithOnce(id); // 如果队列不为空
        });
    };

    dealWithOnce = (id, frameId) => {
        const storeId = this.createStoreId(id, frameId);
        if (this.has[storeId] === false) { return Promise.resolve(console.error(`Invalid store id ${storeId}`)); }
        const {state, queue} = this.store[storeId];
        if (state && queue.length > 0) {
            return this.doIt(id, queue.shift()).catch((error) => console.error(error));
        } else { return Promise.resolve(); }
    };
}
