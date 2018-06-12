/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description:
 */
import defaultOptions from '../defaultOptions';

/**
 * ------------------------------------------------------------------------------------------
 * 初始化任务
 * ------------------------------------------------------------------------------------------
 */
// 消息监听事件
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

});

// 安装完成后事件
chrome.runtime.onInstalled.addListener(function(details) {

});

// 时钟时间
chrome.alarms.onAlarm.addListener(function(alarm) {

});

// 推送框按钮点击事件
chrome.notifications.onButtonClicked.addListener(function(notificationId, index) {

});

// 请求发送前触发的事件
chrome.webRequest.onBeforeRequest.addListener(function(details) {

});

// sendHeaders前触发的事件
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {

});

// 请求开始相应时触发的事件
chrome.webRequest.onResponseStarted.addListener(function(details) {

});

// 接收到HTTP响应头时触发的事件
chrome.webRequest.onHeadersReceived.addListener(function(details) {

});

/**
 * ------------------------------------------------------------------------------------------
 * 载入后台任务
 * ------------------------------------------------------------------------------------------
 */

/*
 * 卸载成功后自动跳到助手官网页面
 **/
if (typeof (chrome.runtime.setUninstallURL) === 'function') {
    chrome.runtime.setUninstallURL(protocol + 'extlabs.io/analytics/uninstall/?uid=178&pid=264&finish_url=https%3A%2F%2Fbilihelper.guguke.net%2F%3Funinstall%26version%3D' + chrome.runtime.getManifest().version);
}

/**
 * 我的关注 视频自动提送 功能
 */



export default {};
