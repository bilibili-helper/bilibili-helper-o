import $ from 'jquery';

/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */
import {Feature} from 'Libs/feature';
import {__, getURL} from 'Utils';
import apis from './apis';

export {DoSignUI} from './UI';

export class DoSign extends Feature {
    constructor() {
        super({
            name: 'doSign',
            kind: 'live',
            permissions: ['login'],
            settings: {
                on: true,
                title: '自动签到',
                hasUI: true,
            },
        });
    }

    launch = () => {
        chrome.alarms.create('doSign', {periodInMinutes: 5});
        this.request();
    };

    pause = () => {
        chrome.alarms.clear('doSign');
    };

    addListener = () => {
        chrome.alarms.onAlarm.addListener((alarm) => {
            switch (alarm.name) {
                case 'doSign':
                    this.request();
                    break;
            }
        });
    };

    permissionHandleLogin = (hasLogin) => {
        this.request(hasLogin);
    };

    request = (hasLogin = this.permissionMap.login) => {
        if (chrome.extension.inIncognitoContext) return; // 隐身模式
        this.settings.on && hasLogin && $.ajax({
            method: 'get',
            url: apis.doSign,
            success: (res) => {
                if (res.code === 0) {
                    chrome.notifications.create('bilibili-helper-doSign', {
                        type: 'basic',
                        iconUrl: getURL('/statics/imgs/cat.svg'),
                        title: __('extensionNotificationTitle'),
                        message: '自动签到成功！',
                        buttons: [],
                    });
                }
            },
        });
    };
}