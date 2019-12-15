
/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */
import {Feature} from 'Libs/feature';
import {__, getURL, createNotification, fetchFromHelper} from 'Utils';
import apis from './apis';

export class AutoTakeVipPrivilege extends Feature {
    constructor() {
        super({
            name: 'autoTakeVipPrivilege',
            kind: 'other',
            permissions: ['login'],
            settings: {
                on: true,
                title: __('autoTakeVipPrivilege_name'),
                type: 'checkbox',
                options: [
                    {
                        on: true,
                        key: 'notification',
                        title: __('autoTakeVipPrivilege_notification'),
                        description: __('autoTakeVipPrivilege_notification_description'),
                    },
                ],
            },
        });
    }

    launch = () => {
        chrome.alarms.create('autoTakeVipPrivilege', {periodInMinutes: 5});
    };

    pause = () => {
        chrome.alarms.clear('autoTakeVipPrivilege');
    };

    addListener = () => {
        chrome.alarms.onAlarm.addListener((alarm) => {
            switch (alarm.name) {
                case 'autoTakeVipPrivilege':
                    this.request();
                    break;
            }
            return true;
        });
    };

    permissionHandleLogin = (hasLogin) => {
        this.request(hasLogin);
    };

    checkout = () => {
        return new Promise((resolve, reject) => {
            fetchFromHelper(apis.getStatus, {
                credentials: 'include',
                mode: 'cors',
            })
            .then(res => res.json())
            .then(res => {
                if (res.code === 0 && res.data && res.data.list) {
                    resolve(res.data.list.map((item) => {
                        return item.state !== 1 ? item.type : -1;
                    }).reduce((sum, current) => {
                        current !== -1 && sum.push(current);
                        return sum;
                    }, []));
                } else {
                    reject('获取会员福利状态数据失败');
                }
            });
        });
    };

    receive = (types) => {
        `code: 69801 message: "你已领取过该权益"`;
        `code: 69800 message: "网络繁忙 请稍后再试"`;
        chrome.cookies.get({
            url: 'http://www.bilibili.com',
            name: 'bili_jct',
        }, (cookie) => {
            types.forEach((type) => {
                return fetchFromHelper(apis.receive, {
                    method: 'post',
                    body: `type=${type}&csrf=${cookie.value}`,
                    credentials: 'include',
                    mode: 'cors',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                })
                .then(res => {
                    console.warn(res);
                });
            });
        });
    };

    request = (hasLogin = this.permissionMap.login) => {
        if (chrome.extension.inIncognitoContext) {
            return;
        } // 隐身模式
        let {day} = this.store || {};
        if (day !== this.getTodayDate() && this.settings.on && hasLogin) {
            this.checkout().then(() => {
                //chrome.
            });
            //this.settings.on && hasLogin && $.ajax({
            //    method: 'get',
            //    url: apis.getStatus,
            //    success: (res) => {
            //        this.store = {day: this.getTodayDate()};
            //        if (res.code === 0) {
            //            const notificationState = _.find(this.settings.options, {key: 'notification'});
            //            notificationState && notificationState.on && createNotification('bilibili-helper-autoTakeVipPrivilege', {
            //                type: 'basic',
            //                iconUrl: getURL('/statics/imgs/cat.svg'),
            //                title: __('extensionNotificationTitle'),
            //                message: __('autoTakeVipPrivilege_notification_successfully'),
            //                buttons: [],
            //            });
            //        }
            //    },
            //});
        }
    };
}
