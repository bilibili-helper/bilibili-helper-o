/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */
import {Feature} from 'Libs/feature';
import {__, getURL, createNotification, fetchFromHelper} from 'Utils';
import apis from './apis';

export {AutoTakeVipPrivilegeUI} from './UI';

export class AutoTakeVipPrivilege extends Feature {
    constructor() {
        super({
            name: 'autoTakeVipPrivilege',
            kind: 'global',
            permissions: ['login'],
            settings: {
                on: true,
                title: __('autoTakeVipPrivilege_name'),
                type: 'checkbox',
                hasUI: true,
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
        this.addLaunchedListener();
    };

    pause = () => {
        this.removeLaunchedListener();
    };

    messageListener = (message, sender, sendResponse) => {
        if (message.command === 'checkVipPrivilegeStatus') {
            this.request().then((types) => {
                sendResponse(types);
            });
        } else if (message.command === 'receiveVIPPrivilegeSuccessfully') {
            const notificationState = _.find(this.settings.options, {key: 'notification'});
            notificationState && notificationState.on && createNotification('bilibili-helper-autoTakeVipPrivilege', {
                type: 'basic',
                iconUrl: getURL('/statics/imgs/cat.svg'),
                title: __('extensionNotificationTitle'),
                message: __('autoTakeVipPrivilege_notification_successfully'),
                buttons: [],
            });
        }
        return true;
    };

    addLaunchedListener = () => {
        chrome.runtime.onMessage.addListener(this.messageListener);
    };

    removeLaunchedListener = () => {
        chrome.runtime.onMessage.removeListener(this.messageListener);
    };

    checkout = () => {
        return new Promise((resolve, reject) => {
            this.store = {day: this.getTodayDate()};
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

    //receive = (types) => {
    //    `code: 69801 message: "你已领取过该权益"`;
    //    `code: 69800 message: "网络繁忙 请稍后再试"`;
    //    chrome.cookies.get({
    //        url: 'http://www.bilibili.com',
    //        name: 'bili_jct',
    //    }, (cookie) => {
    //        types.forEach((type) => {
    //            return fetchFromHelper(apis.receive, {
    //                method: 'post',
    //                body: `type=${type}&csrf=${cookie.value}`,
    //                credentials: 'include',
    //                mode: 'cors',
    //                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //            })
    //            .then(res => {
    //                console.warn(res);
    //            });
    //        });
    //    });
    //};

    request = () => {
        if (chrome.extension.inIncognitoContext) {
            return Promise.reject(`${this.name}: 请退出隐私模式`);
        } // 隐身模式
        let {day} = this.store || {};
        if (day !== this.getTodayDate() && this.settings.on) {
            return this.checkout();
        } else return Promise.reject(`${this.name}:今天已经检查过了`);
    };
}
