/**
 * Author: DrowsyFlesh
 * Create: 2018/11/27
 * Description:
 */
import _ from 'lodash';
import {__} from 'Utils';

/**
 * @param check 检查标记，指示该权限有没有被检查过
 */
export const PERMISSION_STATUS = {
    login: {
        errorMsg: __('permissionManager_login_error_massage'),
        description: __('permissionManager_login_description'),
    },
    notifications: {
        errorMsg: __('permissionManager_notifications_error_massage'),
        description: __('permissionManager_notifications_description'),
    },
    pip: {
        errorMsg: '您的浏览器不支持画中画功能',
        description: '您需要升级浏览器版本或者更换为更加高级的浏览器',
    },
    downloads: {
        errorMsg: '助手未获取到管理下载内容的权限',
        description: '助手需要获得管理下载内容的权限，以便于给您下载的弹幕或视频文件重命名',
    },
};

export class PermissionManager {
    constructor() {
        this.permissionMap = {};
        this.features = {};
        this.addListener();
        this.typeMap = {};
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
                if (!(permissionName in PERMISSION_STATUS)) { // 未定义权限类型
                    return {pass: false, msg: `Undefined permission: ${permissionName}`};
                }
                if (!this.typeMap[permissionName]) this.typeMap[permissionName] = [];
                this.typeMap[permissionName].push(feature);
                switch (permissionName) {
                    case 'login':
                        return this.hasLogin();
                    case 'notifications':
                        return this.checkNotification();
                    case 'pip':
                        return this.pip();
                    case 'downloads':
                        return this.downloads();
                }
            })).then(checkResults => {
                const res = _.filter(checkResults, ({pass}) => !pass);
                if (res.length > 0) resolve({pass: false, data: res});
                else resolve({pass: true, msg: ''});
            });
        });
    };

    updatePermission = (name, value) => {
        if (this.permissionMap[name] !== value) {
            this.permissionMap[name] = value;
            chrome.runtime.sendMessage({
                commend: 'permissionUpdate',
                permission: name,
                value,
            });
        }
        this.triggerListener(name, value);
    };

    // 当权限系统检测到变化时进行通知
    triggerListener = (permission, value) => {
        _.each(this.typeMap[permission], (feature) => {
            if (feature.permissionMap[permission] !== value) {
                feature.setPermission(permission, value);
            }
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
                else [pass, msg] = [false, PERMISSION_STATUS.login.errorMsg];

                this.updatePermission('login', pass);
                resolve({pass, msg});
            });
        });
    };

    pip = () => {
        return new Promise(resolve => {
            const enabled = document.pictureInPictureEnabled;
            resolve({pass: enabled, msg: PERMISSION_STATUS.pip.errorMsg});
        });
    };
    downloads = () => {
        return Promise.resolve({pass: true, msg: PERMISSION_STATUS.downloads.errorMsg});
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

        // 检测登录登出时cookie变化更新UI状态
        chrome.cookies.onChanged.addListener((changeInfo) => {
            const {/*cause,*/ cookie} = changeInfo;
            const {name, domain} = cookie;
            if (name === 'bili_jct' && domain === '.bilibili.com') {
                this.hasLogin();
            }
        });
    };
};