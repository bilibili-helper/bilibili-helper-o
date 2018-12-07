/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 扩展守护脚本
 */
import 'babel-polyfill';
import {createTab, hasNewVersion, version, __} from 'Utils';
import {FeatureManager} from 'Libs/FeatureManager';

/**
 * ------------------------------------------------------------------------------------------
 * 事件绑定
 * ------------------------------------------------------------------------------------------
 */
chrome.runtime.onInstalled.addListener(function(details) { // 安装完成后事件
    const {reason, previousVersion} = details;
    if (reason === 'install') { // 安装成功后默认打开设置页面
        createTab(chrome.extension.getURL('config.html?mod=install'));
    } else if (reason === 'update' && !hasNewVersion(previousVersion)) {
        chrome.notifications.create('bilibili-helper-update', {
            type: 'basic',
            iconUrl: '../statics/imgs/icon-256.png',
            title: __('extensionNotificationTitle'),
            message: __('extensionNotificationExtensionUpdate').replace('%v', version),
        });
    }
});



/**
 * ------------------------------------------------------------------------------------------
 * 载入后台任务
 * ------------------------------------------------------------------------------------------
 */
if (typeof (chrome.runtime.setUninstallURL) === 'function') { // 卸载成功后自动跳到助手官网页面
    chrome.runtime.setUninstallURL('https://extlabs.io/analytics/uninstall/?uid=178&pid=264&finish_url=https%3A%2F%2Fbilihelper.guguke.net%2F%3Funinstall%26version%3D' + chrome.runtime.getManifest().version);
}

window.FeatureManager = new FeatureManager(); // 创建统一模块管理对象
