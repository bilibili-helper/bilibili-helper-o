/**
 * Author: DrowsyFlesh
 * Create: 2018/11/20
 * Description:
 */
import $ from 'jquery';
import {Feature} from 'Libs/feature';
import {__, getURL} from 'Utils';
import apis from './apis';

export class Silver2coin extends Feature {
    constructor() {
        super({
            name: 'silver2coin',
            kind: 'live',
            permissions: ['login', 'notifications'],
            settings: {
                on: false,
                title: '银瓜子自动换硬币',
            },
        });
    }

    launch = () => {
        chrome.alarms.create('silver2coin', {periodInMinutes: 5});
        this.request();
    };

    pause = () => {
        chrome.alarms.clear('silver2coin');
    };

    addListener = () => {
        chrome.alarms.onAlarm.addListener((alarm) => {
            switch (alarm.name) {
                case 'silver2coin':
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
        this.settings.on && hasLogin && chrome.cookies.get({
            url: 'http://www.bilibili.com',
            name: 'bili_jct',
        }, (cookie) => {
            $.ajax({
                method: 'get',
                url: apis.silver2coin,
                data: {
                    platform: 'pc',
                    csrf_token: cookie.value,
                },
                success: (res) => {
                    if (res.code === 0) {
                        chrome.notifications.create('bilibili-helper-silver2coin', {
                            type: 'basic',
                            iconUrl: getURL('/statics/imgs/cat.svg'),
                            title: __('extensionNotificationTitle'),
                            message: '银瓜子换硬币成功！',
                            buttons: [],
                        });
                    }
                },
            });
        });
    };
}