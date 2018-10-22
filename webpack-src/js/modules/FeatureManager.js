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
        this.loadFeatures();
        this.addListener();
    }

    // 特性模块载入
    loadFeatures = () => {
        _.map(Features, (FeatureClass, featureName) => {
            if (!this.features[featureName]) {
                this.features[featureName] = new FeatureClass();
            }
        });
    };

    // 绑定相关监听事件
    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'getOptions') {
                sendResponse(_.merge(this.features, (feature) => feature.optionArguments));
            } else if (message.commend === 'getOption' && typeof message.feature === 'string') {
                sendResponse(this.features[message.feature].options);
            } else if (message.commend === 'getVideoFeatures') { // TODO 相关钩子列表获取
                sendResponse({
                    ...this.features.Video.GUIArguments,
                });
            }
        });
    }
}