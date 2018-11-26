/**
 * Author: DrowsyFlesh
 * Create: 2018/11/27
 * Description:
 */
import _ from 'lodash';

/**
 * @param check 检查标记，指示该权限有没有被检查过
 */
const PERMISSION_STATUS = {
    login: {
        errorMsg: 'you have not log in',
    },
    notifications: {
        errorMsg: 'no permission for notifications',
    },
};

export class PermissionManager {
    constructor() {
        this.permissionMap = {
            login: false,
            notifications: false,
        };
        this.features = {};
        this.addListener();
    }

    load = (feature) => {
        this.features[feature.name] = feature;
        return this.check(feature);
    };

    check = (feature) => {
        return new Promise(resolve => {
            let [pass, msg] = [true, '']; // 通过状态
            if (_.isEmpty(feature.permissions)) resolve({pass, msg});// 没有设置需要检查的权限，则无条件通过
            Promise.all(_.map(feature.permissions, async (permissionName) => {
                if (!(permissionName in this.permissionMap)) { // 未定义权限类型
                    return {pass: false, msg: `Undefined permission: ${permissionName}`};
                }
                switch (permissionName) {
                    case 'login':
                        return this.hasLogin();
                    case 'notifications':
                        return this.checkNotification();
                }
            })).then(checkResults => {
                const res = _.filter(checkResults, ({pass}) => !pass);
                if (res.length > 0) resolve({pass: false, data: res});
                else resolve({pass: true, msg: ''});
            });
        });
    };

    updatePermission = (permissionName, value) => {
        if (this.permissionMap[permissionName] === undefined) throw('Undefined permission: ' + permissionName);
        if (this.permissionMap[permissionName] !== value) {
            this.permissionMap[permissionName] = value;
            this.triggerListener(permissionName, value);
        }
    };

    // 当权限系统检测到变化时进行通知
    triggerListener = (permission, value) => {
        _.each(this.features, (feature) => {
            if (permission in feature.permissionMap) {
                feature.setPermission(permission, value);
            }
        });
        chrome.runtime.sendMessage({
            commend: 'permissionUpdate',
            permission,
            value,
        });
    };

    hasLogin = () => {
        return new Promise((resolve) => {
            chrome.cookies.get({
                url: 'http://interface.bilibili.com/',
                name: 'DedeUserID',
            }, (cookie) => {
                const thisSecond = (new Date()).getTime() / 1000;
                let [pass, msg] = [false, ''];
                // expirationDate 是秒数
                if (cookie && cookie.expirationDate > thisSecond) [pass, msg] = [true, ''];
                else [pass, msg] = [false, PERMISSION_STATUS.login];

                this.updatePermission('login', pass);
                resolve({pass, msg});
            });
        });
    };

    checkNotification = () => {
        return new Promise(resolve => {
            chrome.notifications.getPermissionLevel((level) => {
                const pass = level === 'granted' ? true : false;
                const msg = !pass ? PERMISSION_STATUS['notifications'].errorMsg : '';
                this.updatePermission('notifications', pass);
                resolve({pass, msg});
            });
        });
    };

    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'getPermissionMap') {
                sendResponse(this.permissionMap);
            }
        });
    };
};