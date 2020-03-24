/**
 * Author: DrowsyFlesh
 * Create: 2018/11/27
 * Description:
 */
import _ from 'lodash';
import {__, isBiggerThan} from 'Utils';

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
    checkChromeVersion: {
        bigger: {
            errorMsg: '浏览器内核版本过低，需要大于%version%',
            description: '请更新浏览器',
        },
        smaller: {
            errorMsg: '浏览器内核版本过高，需要小于%version%',
            description: '由于浏览器升级获得的新特性导致功能受限，尝试使用更低版本的浏览器以正常使用功能',
        },
        noneWebkit: {
            errorMsg: '浏览器内核版本错误',
            description: '请使用以chrome内核的浏览器',
        },
    },
};

export class PermissionManager {
    constructor() {
        this.permissionMap = {};
        this.features = {};
        this.addListener();
        this.typeMap = {};
        this.hasCheckAll = false;
    }

    load = (feature) => {
        this.features[feature.name] = feature;
        return this.check(feature);
    };

    checkAll = () => {
        const promiseArray = _.map(PERMISSION_STATUS, (value, permissionName) => {
            return new Promise((resolve) => {
                switch (permissionName) {
                    case 'login':
                        resolve(this.hasLogin());
                        break;
                    case 'notifications':
                        resolve(this.checkNotification());
                        break;
                    case 'pip':
                        resolve(this.pip());
                        break;
                    case 'downloads':
                        resolve(this.downloads());
                        break;
                    default:
                        resolve();
                    //case 'checkChromeVersion': {
                    //    const params = {};
                    //    permissionMap[1] && permissionMap[1].split('&').map((queryStr) => {
                    //        const queryMap = queryStr.split('=');
                    //        if (queryMap) { params[queryMap[0]] = queryMap[1]; }
                    //    });
                    //    if (!_.isEmpty(params)) {
                    //        resolve(this.checkChromeVersion(params.version, params.operation));
                    //    } else { console.warn('no params for version check'); }
                    //    break;
                    //}
                }
                //resolve({pass: false, msg: `Invalid permission: ${permissionName}`});
            }).then((res) => {
                this.permissionMap[permissionName] = res;
            });
        });
        return Promise.all(promiseArray, () => {
            this.hasCheckAll = true;
        }).catch((e) => console.warn(e));
    };

    checkOne = (feature) => {
        return new Promise(resolve => {
            let [pass, msg] = [true, '']; // 通过状态
            if (_.isEmpty(feature.permissions)) { resolve({pass, msg}); }// 没有设置需要检查的权限，则无条件通过
            Promise.all(_.map(feature.permissions, async (permissionStr) => {
                const permissionMap = permissionStr.split('?');
                const permissionName = permissionMap[0];
                if (!(permissionName in PERMISSION_STATUS)) { // 未定义权限类型
                    return {pass: false, msg: `Undefined permission: ${permissionName}`};
                } else if (permissionName in PERMISSION_STATUS && !this.typeMap[permissionName] && this[permissionName] && permissionMap[1]) {
                    this[permissionName](permissionMap[1]).then((res) => {
                        this.permissionMap[permissionName] = res;
                    });
                }
                if (!this.typeMap[permissionName]) { this.typeMap[permissionName] = []; }
                this.typeMap[permissionName].push(feature);

                return this.permissionMap[permissionName];
            })).then(checkResults => {
                const res = _.filter(checkResults, (res) => (res && !res.pass) || !res); // 过滤出权检未通过的项
                if (res.length > 0) { resolve({pass: false, data: res}); } // 如果有未通过权检的，则该feature设为权检失败
                else { resolve({pass: true, msg: ''}); }
            });
        });
    };

    check = (feature) => {
        if (!this.hasCheckAll) {
            return this.checkAll().then(() => this.checkOne(feature));
        } else { return this.checkOne(feature); }
    };

    updatePermission = (name, value, msg) => {
        if (this.permissionMap[name] === undefined) { this.permissionMap[name] = {}; }
        if (this.permissionMap[name].pass !== value) {
            this.permissionMap[name].pass = value;
            chrome.runtime.sendMessage({
                command: 'permissionUpdate',
                permission: name,
                value,
                msg,
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
                if (cookie && cookie.expirationDate > thisSecond) { [pass, msg] = [true, '']; } else {
                    [pass, msg] = [
                        false, PERMISSION_STATUS.login.errorMsg,
                    ];
                }

                this.updatePermission('login', pass, msg);
                resolve({pass, msg});
            });
        });
    };

    pip = () => {
        return new Promise(resolve => {
            const enabled = !!document.pictureInPictureEnabled;
            const [pass, msg] = enabled ? [true, ''] : [false, PERMISSION_STATUS.pip.errorMsg];
            this.updatePermission('pip', pass, msg);
            resolve({pass, msg});
        });
    };

    downloads = () => {
        return new Promise(resolve => {
            chrome.permissions.contains({permissions: ['downloads']}, (res) => {
                const [pass, msg] = res ? [true, ''] : [false, PERMISSION_STATUS.downloads.errorMsg];
                this.updatePermission('downloads', pass, msg);
                resolve({pass, msg});
            });
        });
    };

    // check whether local chrome version is bigger then param version
    checkChromeVersion = (paramsStr) => {
        const params = {};
        paramsStr && paramsStr.split('&').map((queryStr) => {
            const queryMap = queryStr.split('=');
            if (queryMap) { params[queryMap[0]] = queryMap[1]; }
        });
        const {version, operation} = params;
        return new Promise(resolve => {
            const Regexp = new RegExp(/Chrome\/([\d|\\.]+)/g);
            const checkChrome = Regexp.exec(navigator.appVersion);
            let [pass, msg] = [true, ''];
            if (checkChrome) {
                switch (operation) {
                    case 'bigger':
                        if (isBiggerThan(checkChrome[1], version) < 0) {
                            [pass, msg] = [false, PERMISSION_STATUS.checkChromeVersion.bigger.errorMsg.replace('%version%', version)];
                        }
                        break;
                    case 'smaller':
                        if (isBiggerThan(checkChrome[1], version) > 0) {
                            [pass, msg] = [false, PERMISSION_STATUS.checkChromeVersion.smaller.errorMsg.replace('%version%', version)];
                        }
                        break;
                    default:
                        break;
                }
            } else {
                [pass, msg] = [false, PERMISSION_STATUS.checkChromeVersion.noneWebkit.errorMsg];
            }
            resolve({pass, msg, type: operation});
        });
    };

    checkNotification = () => {
        return new Promise(resolve => {
            chrome.permissions.contains({permissions: ['notifications']}, (res) => {
                const [pass, msg] = res ? [true, ''] : [false, PERMISSION_STATUS.notifications.errorMsg];
                this.updatePermission('notifications', pass, msg);
                resolve({pass, msg});
            });
        });
    };

    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.command === 'getPermissionMap') {
                sendResponse(this.permissionMap);
            }
            return true;
        });

        // 检测登录登出时cookie变化更新UI状态
        chrome.cookies.onChanged.addListener((changeInfo) => {
            const {/*cause,*/ cookie} = changeInfo;
            const {name, domain} = cookie;
            if (name === 'bili_jct' && domain === '.bilibili.com') {
                this.hasLogin();
            }
        });

        // ff 下不兼容
        chrome.permissions.onAdded && chrome.permissions.onAdded.addListener((permissions) => {
            permissions.map((permissionName) => {
                switch (permissionName) {
                    case 'login':
                        this.hasLogin();
                        break;
                    case 'notifications':
                        this.checkNotification();
                        break;
                    case 'downloads':
                        this.downloads();
                        break;
                }
            });
        });
    };
}
