import $ from 'jquery';

/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */
import {Feature} from 'Libs/feature';
import _ from 'lodash';
import {__, getURL} from 'Utils';
import apis from './apis';

export class DoSign extends Feature {
    constructor() {
        super({
            name: 'doSign',
            kind: 'live',
            permissions: ['login'],
            settings: {
                on: true,
                title: '自动签到',
                type: 'checkbox',
                options: [
                    {key: 'notification', title: '推送通知', on: true, description: '签到成功后将会弹出代表成功的推送通知'},
                ],
            },
        });
    }

    launch = () => {
        chrome.alarms.create('doSign', {periodInMinutes: 1});
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
            return true;
        });
    };

    permissionHandleLogin = (hasLogin) => {
        this.request(hasLogin);
    };

    request = (hasLogin = this.permissionMap.login) => {
        if (chrome.extension.inIncognitoContext) return; // 隐身模式
        const today = this.getTodayDate();
        let {day} = this.store || {};
        if (day !== today) {
            this.settings.on && hasLogin && $.ajax({
                method: 'get',
                url: apis.doSign,
                success: (res) => {
                    this.store = {day: today};
                    if (res.code === 0) {
                        const notificationState = _.find(this.settings.options, {key: 'notification'});
                        notificationState && notificationState.on && chrome.notifications.create('bilibili-helper-doSign', {
                            type: 'basic',
                            iconUrl: getURL('/statics/imgs/cat.svg'),
                            title: __('extensionNotificationTitle'),
                            message: '自动签到成功！',
                            buttons: [],
                        });
                    }
                },
            });
        }
    };
}
