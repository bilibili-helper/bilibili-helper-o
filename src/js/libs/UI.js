/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import _ from 'lodash';

const PAGE_REGEXP = {
    home: /^https?:\/\/www\.bilibili\.com\/(\?spm_id_from(.*)$|$)/,
    dynamic: /^https?:\/\/t\.bilibili\.com\//,
    video: /^https?:\/\/www\.bilibili\.com\/(video\/(av|bv|BV)|bangumi\/play\/(ss|ep))(.*)/,
    live: /^https?:\/\/live\.bilibili\.com\//,
    readCV: /^https?:\/\/www\.bilibili\.com\/read\/cv(.*)/,
    space: /^https?:\/\/space\.bilibili\.com\//,
    message: /^https?:\/\/message\.bilibili\.com\//,
}

export class UI {
    constructor({name, dependencies = []}) {
        this.name = name;
        this.dependencies = dependencies;
        this.outputDOM = null;
    }

    init = () => {
        this.addListener();
        return this;
    };

    addListener = () => {};

    /**
     * 用于重载
     */
    load = () => {
        console.error(`UI ${this.name}'s load function is not recode!`);
    };

    getContainer = (selectors, returnMore = false) => {
        const get = (name) => {
            const queryRes = document.querySelectorAll(name);
            return queryRes.length > 0 ? queryRes : false;
        };
        if (typeof selectors === 'string') {
            const res = get(selectors);
            if (res && res.length > 0) {
                if (returnMore) {
                    return res;
                } else {
                    return res[0];
                }
            } else {
                return false;
            }
        } else if (selectors instanceof Array) {
            const t = _.compact(selectors.map((name) => get(name)));
            if (t.length > 0) {
                if (returnMore) {
                    return _.compact(t);
                } else {
                    return _.compact(selectors.map((name) => get(name)))[0];
                }
            } else { console.error(`No target of name: ${selectors}!`); }
        }
    };

    observer = (containerSelectors, interval = 500) => {
        if (!containerSelectors) { throw (`Wrong containerSelectors in ${this.name}: ${containerSelectors}`); }
        return new Promise(resolve => {
            const container = this.getContainer(containerSelectors);
            if (!container) {
                console.warn(`Not find container ${containerSelectors}`);
                resolve(false);
            }
            let timer;
            let timeout = false;
            timer = setTimeout(() => {
                timeout = true;
                resolve(container);
            }, interval);
            new MutationObserver(function(mutationList, observer) {
                if (timeout) { observer.disconnect(); } // container在第一个interval间隔内没有变化
                if (timer) { clearTimeout(timer); }
                timer = setTimeout(() => {
                    observer.disconnect();
                    resolve(container);
                }, interval);
            }).observe(container[0], {
                childList: true,
                attributes: true,
                attributeOldValue: true,
                subtree: true,
            });
        });
    };

    /**
     * 轮询给定选择器并返回结果
     * @param containerSelectors 查询Selectors
     * @param interval 轮询间隔
     * @param more 返回所有匹配的对象
     * @return {Promise<*>}
     */
    interval = (containerSelectors, interval = 500, more = false) => {
        let retryTime = 0;
        const retryMax = 15;
        return new Promise(resolve => {
            let timer = setInterval(() => {
                const container = this.getContainer(containerSelectors, more);
                if (container) {
                    clearInterval(timer);
                    resolve(container);
                } else if (retryTime < retryMax) {
                    ++retryTime;
                } else {
                    clearInterval(timer);
                    console.warn(`Not find container ${containerSelectors}`);
                    resolve();
                }
            }, interval);
        });
    };

    isPage = (pageName = false) => {
        const url = window.location.href;
        if (!pageName) {
            for (const item in PAGE_REGEXP) {
                const pageUrl = new RegExp(PAGE_REGEXP[item]);
                if (pageUrl.test(url)) {
                    return item;
                }
            }
            return false;
        } else {
            if (!PAGE_REGEXP[pageName]) { return false; }
            const pageUrl = new RegExp(PAGE_REGEXP[pageName]);
            return pageUrl.test(url);
        }
    }
}
