/**
 * Author: DrowsyFlesh
 * Create: 2018/11/20
 * Description:
 */
import $ from 'jquery';
import _ from 'lodash';
import {Feature} from 'Libs/feature';
import {__, getURL, createNotification} from 'Utils';
import apis from './apis';

export class Silver2coin extends Feature {
    constructor() {
        super({
            name: 'silver2coin',
            kind: 'live',
            dependencies: ['language'],
            permissions: ['login', 'notifications'],
            settings: {
                on: false,
                title: __('silver2coin_name'),
                type: 'checkbox',
                options: [
                    {
                        key: 'notification',
                        title: __('silver2coin_options_notification'),
                        on: true,
                        description: __('silver2coin_options_notification_description'),
                    },
                ],
            },
        });
    }

    launch = () => {
        chrome.alarms.create('silver2coin', {periodInMinutes: 1});
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
        if (chrome.extension.inIncognitoContext) {
            return;
        } // 隐身模式
        let {day} = this.store || {};
        if (day !== this.getTodayDate()) {
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
                        requestFrom: 'bilibili-helper',
                    },
                    success: (res) => {
                        // TODO 这里不应该请求成功就记作已兑换，还要考虑银瓜子暂时不够但之后又足够兑换的情况
                        this.store = {day: this.getTodayDate()};
                        if (res.code === 0) {
                            const notificationState = _.find(this.settings.options, {key: 'notification'});
                            notificationState && notificationState.on && createNotification('bilibili-helper-silver2coin', {
                                type: 'basic',
                                iconUrl: getURL('/statics/imgs/cat.svg'),
                                title: __('extensionNotificationTitle'),
                                message: __('silver2coin_notification_successfully'),
                                buttons: [],
                            });
                        }
                    },
                });
            });
        }
    };
}
