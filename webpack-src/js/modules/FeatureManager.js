/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import _ from 'lodash';
import * as allFeatures from './index';

const {Feature, ...Features} = allFeatures;

export class FeatureManager {
    constructor() {
        this.features = {};
        this.waitQueue = [];
        this.addListener();
        this.loadFeatures();
    }

    // 特性模块列表载入
    loadFeatures = () => {
        return Promise.all(_.map(Features, async (FeatureDefineObject, featureName) => {
            const {require, featureClass: FeatureClass} = FeatureDefineObject;
            if (!this.features[featureName]) {
                return this.loadFeature(require, featureName, FeatureClass); // return Promise
            }
        })).then(() => {
            this.dealWidthWaitQueue();
        });
    };

    // 单个模块载入
    loadFeature = (require, featureName, FeatureClass) => {
        return new Promise(resolve => {
            if (this.checkRequire(require)) { // 依赖检查通过
                this.features[featureName] = new FeatureClass();
                this.features[featureName].init().then(f => {
                    f.launch();
                    resolve(true);
                });
            } else {
                this.waitQueue.push({require, featureName, featureClass: FeatureClass});
                resolve(false);
            }
        });
    };

    // 处理等待队列
    dealWidthWaitQueue = () => {
        const newWaitQueue = [];
        const promiseList = _.map(this.waitQueue, (FeatureDefineObject) => {
            const {require, featureName, featureClass: FeatureClass} = FeatureDefineObject;
            if (!this.features[featureName] && this.checkRequire(require)) { // 依赖检查通过
                return this.loadFeature(require, featureName, FeatureClass);
            } else {
                newWaitQueue.push(FeatureDefineObject);
            }
        })
        this.waitQueue = newWaitQueue;
        Promise.all(promiseList).then(() => {
            this.waitQueue.length > 0 && this.dealWidthWaitQueue();
        });
    };

    // 依赖检查 全部通过返回true
    checkRequire = (requireList = []) => {
        if (requireList.length === 0) return true;
        let pass = false;
        _.map(requireList, (requireName) => {
            const name = _.upperFirst(requireName);
            if (this.features[name] || Features[name]) {
                if (this.features[name] && this.features[name].initialed) pass = true;
            } else {
                console.error(`Invalid Feature: ${requireName}`);
            }
        });
        return pass;
    };

    // 绑定相关监听事件
    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'getOptions') {
                let features;
                if (message.kind) features = _.filter(this.features, (feature) => feature.kind === message.kind);
                else features = this.features;
                sendResponse(_.merge(features, (feature) => {
                    const options = feature.getOption();
                    return {[options.name]: options};
                }));
            }
        });
    };
}