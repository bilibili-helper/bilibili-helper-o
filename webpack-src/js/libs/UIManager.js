/**
 * Author: DrowsyFlesh
 * Create: 2018/11/6
 * Description:
 */
import _ from 'lodash';

export class UIManager {
    /**
     * @param kind {string} 指该ui管理器加载那个页面（由kind字段指定）的Feature的UI
     */
    constructor({kind}) {
        this.kind = kind;
        this.options = {};
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
            chrome.runtime.sendMessage({commend: 'getOptions', kind: this.kind}, (options) => {
                this.retryMax = _.keys(options).length + 10;
                this.options = options;
                resolve(options);
            });
        });
    };

    instantiateUIs = () => {
        return Promise.all(_.map(this.options, (option) => new Promise(resolveUI => {
            const name = _.lowerFirst(option.name);
            //let pass = true;
            //console.log(option.dependencies);
            //_.each(option.dependencies.uis, (dependency) => {
            //    if (!_.find(this.options, (o) => o.name === dependency)) { // 检查依赖列表项目是否都在列表中
            //        resolve(pass = false)
            //    }
            //});
            //if (!pass) resolve(false); // 如果有依赖项缺失，则停止实例化
            import(/* webpackChunkName: "[request]" */ `Modules/${name}/UI`).then(({default: UIClass}) => {
                if (UIClass) {
                    this.UIMap[option.name] = new UIClass();
                    resolveUI();
                } else throw(`Wrong UI class ${option.name}`);
            });
        })));
    };

    loadUIs = () => {
        Promise.all(_.map(this.UIMap, this.loadUI)).then(() => {
            if (this.waitQueue.length > 0) this.dealWithWaitQueue();
        });
    };

    loadUI = (UI) => {
        return new Promise(resolve => {
            let {pass, dependDOM} = this.checkDependencies(UI.dependencies);
            console.log(pass, dependDOM);
            if (pass) {
                console.log(`loading ${UI.name}`);
                UI.load(dependDOM).then((outputDOM = null) => {
                    UI.loaded = true;
                    UI.outputDOM = outputDOM;
                    resolve(true);
                });
            } else {
                this.waitQueue.push(UI);
                resolve(false);
            }
        });
    };

    dealWithWaitQueue = () => {
        if (this.retryTime > this.retryMax) return;
        ++this.retryTime;
        const originQueue = [...this.waitQueue];
        this.waitQueue = [];

        Promise.all(_.map(originQueue, this.loadUI)).then(() => {
            if (this.waitQueue.length > 0) this.dealWithWaitQueue();
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
            } else dependDOM.push(UI.outputDOM);
        });
        return {pass, dependDOM};
    };

    /**
     * 设置锚，用于将UI插入到指定锚中的热定位置
     */
    setAnchor = () => {
        console.error(`Empty Function "setAnchor" in UI ${this.name}`);
    };

    /**
     * 获取本UI的锚，供其他模块使用
     */
    getAnchor = () => {
        console.error(`Empty Function "getAnchor" in UI ${this.name}`);
    };
}