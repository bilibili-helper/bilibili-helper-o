/**
 * Author: Ruo
 * Create: 2018/9/4
 * Description:
 */
import _ from 'lodash';
import store from 'store';

/**
 * 特性
 * 规范启用一个特性/功能需要涉及到的一系列方法
 */
export class Feature {

    /**
     * @param name {string} 配置的名称
     * @param kind {string} 配置的列表划分，在渲染设置页面时根据该值在相对应的列表中自动渲染，如：主站，直播，其他等
     * @param permissions {Object}
     * @param settings {object} 特性的额外配置选项，如过滤列表的配置信息
     * @param dependencies {array}
     */
    constructor({name, kind, permissions = [], settings = {}, dependencies = []}) {
        this.name = _.upperFirst(name);
        this.storeName = `bilibili-helper-${this.name}`;
        this.kind = kind;
        this.initialed = false;
        this.dependencies = dependencies;
        this.settings = {...settings, kind, name: this.name};
        this.permissions = permissions;
        this.permissionMap = {};
        _.each(this.permissions, (permissionName) => {
            this.permissionMap[permissionName] = false;
        });
    }

    /**
     * 初始化 - 位于装载过程之前
     * 1.检查(启动)配置
     * 2.鉴权
     * 3.配置初始化
     * @return {Promise} true 表示初始化成功 返回字符串表示初始化失败说明
     */
    init = () => {
        return new Promise((resolve) => {
            this.addListener();
            this.initialed = true;
            this.settings.on && this.launch();
            resolve(this);
        });
    };

    setPermission = (name, value) => {
        const originValue = this.permissionMap[name];
        if (value !== undefined && originValue !== value) {
            this.permissionMap[name] = value;
            const f = this[`permissionHandle${_.upperFirst(name)}`];
            if (typeof f === 'function') f(value);
        }
    };

    // 初始化配置
    initSetting = (sets) => {
        return new Promise(resolve => {
            const settings = sets || store.get(this.storeName) || {}; // 缓存配置
            this.settings = Object.assign({}, this.settings, settings);
            store.set(this.storeName, this.settings);
            resolve(this);
        });
    };

    // 获取配置
    getSetting = (featureName) => {
        if (featureName === this.name || !featureName) return this.settings;
        else {
            const name = _.upperFirst(featureName);
            return chrome.extension.getBackgroundPage().FeatureManager.features[name].getSetting();
        }
    };

    // 设置配置
    setSetting = (settings) => {
        this.settings = settings;
        store.set(this.storeName, settings);
        this.afterSetSetting(settings);
    };

    // 设置之后运行的钩子函数
    afterSetSetting = () => {};

    // 启动 - 装载过程之后
    launch = () => {};

    // 暂停 - 启动后关闭功能时调用
    pause = () => {};

    // 添加监听器
    addListener = () => {};
}