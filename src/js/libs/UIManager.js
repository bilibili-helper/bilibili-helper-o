/**
 * Author: DrowsyFlesh
 * Create: 2018/11/6
 * Description:
 */
import _ from 'lodash';
import {UIs} from 'Modules';
import {consoleLogo} from 'Utils';

export class UIManager {
    constructor(kind) {
        this.kind = kind;
        this.settings = {};
        this.init();
        this.UIMap = {};
        this.waitQueue = [];
        this.retryMax = 10;
        this.retryTime = 0;
    }

    init = () => {
        return this.getUIList().then(this.instantiateUIs).then(this.loadUIs);
    };

    /**
     * 向FeatureManager请求指定type的UI列表
     */
    getUIList = () => {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({commend: 'getSettings', kind: this.kind, hasUI: true}, (settings) => {
                this.retryMax = _.keys(settings).length;
                this.settings = settings;
                resolve(settings);
            });
        });
    };

    instantiateUIs = () => {
        return Promise.all(_.map(this.settings, (option) => new Promise(resolveUI => {
            const name = _.upperFirst(option.name);
            const UIClass = UIs[`${name}UI`];
            //console.log(UIs, name, UIClass);
            if (UIClass) {
                this.UIMap[name] = new UIClass();
            } else {
                throw(`Wrong UI class ${option.name}`);
            }
            resolveUI();
        })));
    };

    loadUIs = () => {
        Promise.all(_.map(this.UIMap, this.loadUI)).then(() => {
            if (this.waitQueue.length > 0) {
                this.dealWithWaitQueue();
            } else {
                consoleLogo();
            }
        });
    };

    loadUI = (UI, name) => {
        return new Promise(resolve => {
            let {pass, dependDOM} = this.checkDependencies(UI.dependencies);
            if (pass) {
                UI.init().load(dependDOM, this.settings[name]).then((outputDOM = []) => {
                    UI.loaded = true;
                    UI.outputDOM = outputDOM;
                    //console.log(`UI loaded: ${UI.name}`);
                    resolve(true);
                });
            } else {
                this.waitQueue.push(UI);
                resolve(false);
            }
        });
    };

    dealWithWaitQueue = () => {
        if (this.retryTime > this.retryMax) {
            return;
        }
        ++this.retryTime;
        const originQueue = _.mapKeys(this.waitQueue, (setting) => _.upperFirst(setting.name));
        this.waitQueue = [];

        Promise.all(_.map(originQueue, this.loadUI)).then(() => {
            if (this.waitQueue.length > 0) {
                this.dealWithWaitQueue();
            } else {
                consoleLogo();
            }
        });
    };

    /**
     * 检查锚依赖
     */
    checkDependencies = (dependencies) => {
        let pass = true;
        let dependDOM = [];
        _.each(dependencies, (dependency) => {
            const UI = this.UIMap[_.upperFirst(dependency)];
            if (!(UI && UI.loaded)) {
                return pass = false;
            } else {
                dependDOM.push(UI.outputDOM);
            }
        });
        return {pass, dependDOM};
    };
}