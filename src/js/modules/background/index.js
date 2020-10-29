/**
 * Author: DrowsyFlesh
 * Create: 2018/12/9
 * Description:
 */
import {Feature} from 'Libs/feature';
import {__, createTab, hasNewVersion, version, createNotification} from 'Utils';

export class Background extends Feature {
    constructor() {
        super({
            name: 'background',
            kind: 'other',
            dependencies: ['language'],
            settings: {
                on: true,
                hide: true,
                toggle: false,
            },
        });
    }

    addListener = () => {
        chrome.runtime.onInstalled.addListener(function(details) { // 安装完成后事件
            const {reason, previousVersion} = details;
            if (reason === 'install') { // 安装成功后默认打开设置页面
                createTab(chrome.extension.getURL('config.html?mod=install'));
            } else if (reason === 'update' && !hasNewVersion(previousVersion)) {
                createNotification('bilibili-helper-update', {
                    type: 'basic',
                    iconUrl: '../statics/imgs/cat.svg',
                    title: __('extensionNotificationTitle'),
                    message: __('extensionNotificationExtensionUpdate').replace('%v', version),
                })
            }
        });
        if (typeof (chrome.runtime.setUninstallURL) === 'function') { // 卸载成功后自动跳到助手官网页面
            //chrome.runtime.setUninstallURL('https://extlabs.io/analytics/uninstall/?uid=178&pid=264&finish_url=https%3A%2F%2Fbilihelper.guguke.net%2F%3Funinstall%26version%3D' + version);
        }
    };
}
