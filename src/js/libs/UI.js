/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import _ from 'lodash';

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

    getContainer = (selectors) => {
        const get = (name) => {
            const queryRes = document.querySelectorAll(name);
            return queryRes.length > 0 ? queryRes : false;
        };
        if (typeof selectors === 'string') {
            const res = get(selectors);
            return res && res.length > 0 ? res[0] : false;
        } else if (selectors instanceof Array) {
            const t = _.compact(selectors.map((name) => get(name)));
            if (t.length > 0) { return _.compact(selectors.map((name) => get(name)))[0]; }
            else { console.error(`No target of name: ${selectors}!`); }
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

    interval = (containerSelectors, interval = 500) => {
        let retryTime = 0;
        const retryMax = 15;
        return new Promise(resolve => {
            let timer = setInterval(() => {
                const container = this.getContainer(containerSelectors);
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
}
