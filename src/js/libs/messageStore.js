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
            if (message.commend === this.initializedName && sender.tab.id) {
                const id = sender.tab.id;
                // 发现没有创建过相关tabStore，说明dom初始化在原始页面发送请求前完成，按理说概率不大/不会发生
                let data = this.has(id) ? this.store[id] : this.createData(id);
                if (data.state === 0) {
                    data.state = 1;
                    // 如果在收到前端初始化通知前就有收到请求，则处理任务队列
                    this.dealWith(id);
                } else {
                    console.warn(`This store is already in state:`, data.state);
                }
            } else if (message.commend === 'tabUnload' && !!this.has(sender.tab.id)) {
                this.delete(sender.tab.id);
            }
        });
    };

    /**
     * 创建数据存储对象
     * @param id
     * @return {{state, queue, data}}
     */
    createData = (id) => {
        if (this.store[id]) return this.store[id];
        else return this.store[id] = {
            state: 0, // 初始状态 0 等待前端信号
            queue: [], // 任务队列
            data: {id}, // 数据对象 存储如cid之类的数据
        };
    };

    has = (id) => !!this.store[id];

    get = (id) => this.store[id];

    delete = (id) => delete this.store[id];

    // 处理任务队列
    dealWith = (id) => {
        const doIt = (id, taskData) => {
            if (!taskData) return Promise.resolve();
            const {commend} = taskData;
            return new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(id, taskData, (res) => {
                    res !== undefined ? resolve() : reject(`No result from tab[${id}] - commend[${commend}]`);
                });
            });
        };
        const {state, queue} = this.store[id];
        state && queue.length > 0 && doIt(id, queue.shift()).then(() => {
            queue.length > 0 && this.dealWith(id, this.store[id]); // 如果队列不为空
        }, (error) => console.error(error));
    };
}