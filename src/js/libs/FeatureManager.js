/**
 * Author: DrowsyFlesh
 * Create: 2018/10/23
 * Description:
 */

import _ from 'lodash';
import {Features} from 'Modules/index';

export class FeatureManager {
    constructor() {
        this.features = {};
        this.waitQueue = [];
        this.addListener();
        this.instantiateFeatures().then(this.loadFeatures);
        this.retryMax = _.keys(Features).length;
        this.retryTime = 0;
    }

    // 实例化所有Feature，not include init function
    instantiateFeatures = async () => {
        _.map(Features, (FeatureClass, featureName) => {
            if (!this.features[featureName]) {
                if (!FeatureClass) throw `Feature ${featureName}'s feature class is not defined!`;
                this.features[featureName] = new FeatureClass();
            }
        });
    };

    // 特性模块列表载入
    loadFeatures = () => {
        const PromiseMap = _.map(this.features, (feature, featureName) => {
            return new Promise(resolve => {
                const {dependencies} = feature;
                const checkResult = this.checkModuleRequire(dependencies);
                if (checkResult) {
                    const loadResult = this.loadFeature(featureName);
                    resolve(loadResult);// return Promise
                } else {
                    this.waitQueue.push({dependencies, featureName});
                    resolve(false);
                }
            });
        });
        return Promise.all(PromiseMap).then((e) => {
            this.dealWidthWaitQueue();
        });
    };

    // 单个模块载入
    loadFeature = (featureName) => {
        return new Promise(resolve => {
            this.features[featureName].init().then(f => {
                f && f.settings.on && f.launch();
                resolve(true);
            });
        });
    };

    // 处理等待队列
    dealWidthWaitQueue = () => {
        if (this.retryTime > this.retryMax) return;
        ++this.retryTime;
        const newWaitQueue = [];
        const promiseList = _.map(this.waitQueue, (FeatureDefineObject) => {
            return new Promise(resolve => {
                const {dependencies, featureName} = FeatureDefineObject;
                if (this.checkModuleRequire(dependencies)) { // 依赖检查通过
                    const loadResult = this.loadFeature(featureName);
                    resolve(loadResult);
                } else {
                    newWaitQueue.push(FeatureDefineObject);
                    resolve(false);
                }
            });

        });
        this.waitQueue = newWaitQueue;
        Promise.all(promiseList).then(() => this.waitQueue.length > 0 && this.dealWidthWaitQueue());
    };

    // 依赖检查 全部通过返回true
    checkModuleRequire = (requireList = []) => {
        if (requireList.length === 0) return true;
        let counter = requireList.length;
        _.map(requireList, (requireName) => {
            const name = _.upperFirst(requireName);
            if (this.features[name]) {
                this.features[name].initialed && --counter;
            } else {
                console.error(`Invalid Feature: ${requireName}`);
            }
        });
        return counter === 0;
    };

    // 绑定相关监听事件
    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            /**
             * 获取Feature的配置
             * feature: 如果指定feature则优先返回指定名称的Feature的配置
             * kind: 如果指定kind则返回指定kind那一类Feature的配置
             * checkHide: 如果设置checkHide为true，则忽略那些配置有checkHide的Feature
             * hasUI: 只获取有该setting配置的Feature
             * 如果没有给任何其他参数，则返回所有Feature的配置列表
             */
            if (message.commend === 'getSettings') {
                let features;
                if (message.feature) {
                    features = _.filter(this.features, feature => message.feature === feature.settings.name);
                } else if (message.kind) {
                    features = _.filter(this.features, feature => {
                        const {kind, hide = false, hasUI = false, on = false} = feature.settings;
                        const sameKind = kind === message.kind;
                        if (hide && message.checkHide) {
                            return !hide && sameKind;
                        } else if (hasUI && on && message.hasUI) {
                            return hasUI && on && sameKind;
                        }
                    });
                } else features = message.checkHide ? _.filter(this.features, feature => !feature.settings.hide) : this.features;
                const settings = {};
                _.each(features, (feature) => {
                    const setting = feature.getSetting();
                    // 过滤掉已关闭feature
                    settings[_.upperFirst(setting.name)] = setting;
                });
                sendResponse(settings);
            }
        });
    };
}