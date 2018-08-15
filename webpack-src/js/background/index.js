/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description:
 */
import defaultOptions from '../defaultOptions';
import {createTab, hasNewVersion} from 'Utils';
/**
 * ------------------------------------------------------------------------------------------
 * 初始化
 * ------------------------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------------------------
 * 权限获取
 * ------------------------------------------------------------------------------------------
 */
// 推送窗口弹出权限
chrome.notifications.getPermissionLevel((level) => {
    switch (level) {
        case 'granted': { // 获取到了权限
            break;
        }
        case 'denied': { // 被禁止
            break;
        }
    }
});

/**
 * ------------------------------------------------------------------------------------------
 * 事件绑定
 * ------------------------------------------------------------------------------------------
 */
// 安装完成后事件
chrome.runtime.onInstalled.addListener(function (details) { // 安装完成事件
    const {reason, previousVersion} = details;
    switch (reason) {
        case 'install': { // 安装成功后默认打开设置页面
            createTab(chrome.extension.getURL('options.html?mod=install'));
            break;
        }
        case 'update': {
            if (!hasNewVersion(previousVersion)) { // 有新版本待更新
                chrome.notifications.create('bilibili-helper-update', {
                    type: 'basic',
                    iconUrl: 'statics/imgs/icon-256.png',
                    title: chrome.i18n.getMessage('notificationTitle'),
                    message: chrome.i18n.getMessage('notificationExtensionUpdate').replace('%v', chrome.runtime.getManifest().version),
                });
            }
            break;
        }
    }
    if (reason === 'update') {

    }
});

// 消息监听事件
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

});

// 时钟时间
chrome.alarms.onAlarm.addListener(function (alarm) {

});

// 推送框按钮点击事件
chrome.notifications.onButtonClicked.addListener(function (notificationId, index) {

});

// 请求发送前触发的事件
// chrome.webRequest.onBeforeRequest.addListener(function(details) {
//
// });

// sendHeaders前触发的事件
// chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
//
// });

// 请求开始相应时触发的事件
// chrome.webRequest.onResponseStarted.addListener(function(details) {
//
// });

// 接收到HTTP响应头时触发的事件
// chrome.webRequest.onHeadersReceived.addListener(function(details) {
//
// });

/**
 * ------------------------------------------------------------------------------------------
 * 载入后台任务
 * ------------------------------------------------------------------------------------------
 */

/*
 * 卸载成功后自动跳到助手官网页面
 **/
if (typeof (chrome.runtime.setUninstallURL) === 'function') {
    chrome.runtime.setUninstallURL('https://extlabs.io/analytics/uninstall/?uid=178&pid=264&finish_url=https%3A%2F%2Fbilihelper.guguke.net%2F%3Funinstall%26version%3D' + chrome.runtime.getManifest().version);
}

/**
 * 我的关注 视频自动提送 功能
 */

