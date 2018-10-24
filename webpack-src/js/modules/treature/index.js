/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

import {Feature} from 'Modules';
import URL from 'url-parse';
import {PERMISSION_TYPE} from 'Utils';

const {login, notification} = PERMISSION_TYPE;

export class Treasure extends Feature {
    constructor() {
        super({
            name: 'treasure',
            kind: 'live',
            permission: {login, notification},
            options: {
                on: true,
                title: '自动领瓜子',
            },
        });
        this.roomMap = {};
    }

    addListener = () => {
        const requestFilter = {
            urls: [
                /**
                 * 获取当前任务数据
                 * {
                        "code": 0,
                        "msg": "",
                        "message": "",
                        "data": {
                                "minute": 3,
                                "silver": 30,
                                "time_start": 1540399034,
                                "time_end": 1540399214,
                                "times": 1,
                                "max_times": 3
                        }
                    }
                 */
                '*://api.live.bilibili.com/lottery/v1/SilverBox/getCurrentTask*',
                /**
                 * 获取验证码数据
                 * {
                        "code": 0,
                        "msg": "ok",
                        "message": "ok",
                        "data": {
                            "img": "data:image/jpeg;base64,..."
                        }
                    }
                 */
                '*://api.live.bilibili.com/lottery/v1/SilverBox/getCaptcha*',
                /**
                 * 校验验证码
                 * code -902:验证码错误
                 * code -901:验证码过期
                 * {
                        "code": 0,
                        "data": {
                            "awardSilver": 30,
                            "isEnd": 0,
                            "silver": "302066",
                        },
                        "message": "ok",
                        "msg": "ok",
                    }
                 */
                '*://api.live.bilibili.com/lottery/v1/SilverBox/getAward*',
            ],
        };
        chrome.webRequest.onCompleted.addListener((details) => {
            const {tabId} = details;
            const url = new URL(details.url, '', true);
            const {pathname, query} = url;
            if (pathname === '/lottery/v1/SilverBox/getCurrentTask' && !this.roomMap[tabId]) {
                chrome.debugger.attach({tabId}, '1.1', () => {
                    this.roomMap[tabId] = true;
                });
                chrome.debugger.onEvent.addListener((source, method, params) => {
                    console.log(tabId, source, method, params);
                    if (method === 'Network.responseReceived') {
                        chrome.debugger.sendCommand({tabId}, "Network.getResponseBody", {
                            "requestId": this.roomMap[tabId]
                        }, function(response) {
                            console.log(response);
                        });
                    }
                });
            } else if (pathname === '/lottery/v1/SilverBox/getCaptcha') {
                this.roomMap[tabId] = details.requestId;

            }
            console.log(details);
        }, requestFilter, ['responseHeaders']);
    };
}