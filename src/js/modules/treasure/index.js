/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

import {Feature} from 'Libs/feature';
import _ from 'lodash';
import {treasureOpenImg} from 'Modules/treasure/UI/imgUrls';
import {__, createNotification, fetchFromHelper} from 'Utils';

export {TreasureUI} from './UI/index';

export class Treasure extends Feature {
    constructor() {
        super({
            name: 'treasure',
            kind: 'live',
            permissions: ['login', 'notifications'],
            settings: {
                on: true,
                hasUI: true,
                title: __('treasure_name'),
                description: __('treasure_description'),
                type: 'checkbox',
                options: [
                    {key: 'notification', title: __('treasure_notification'), on: true, description: __('treasure_notification_description')},
                ],
            },
        });
        this.retryTime = 0;
        this.maxRetryTime = 10;
    }

    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.command === 'sendNotification' && message.type === 'treasure') {
                const {time_start, silver} = message;
                const notificationState = _.find(this.settings.options, {key: 'notification'});
                if (notificationState && notificationState.on) {
                    createNotification('bilibili-helper-treasure' + time_start, {
                        type: 'basic',
                        iconUrl: treasureOpenImg,
                        title: __('extensionNotificationTitle'),
                        message: `成功领取${silver}瓜子`,
                    });
                }
            } else if (message.command === 'getCurrentTask' && message.type === 'treasure') {
                fetchFromHelper(message.url, {
                    credentials: 'include',
                }).then(res => res.json()).then((res) => {
                    this.retryTime = 0;
                    sendResponse(res);
                }, (res) => {
                    if (this.retryTime < this.maxRetryTime) {
                        ++this.retryTime;
                        console.error(res);
                        setTimeout(this.getCaptcha, 2000);
                    } else sendResponse(res);
                });
            } else if (message.command === 'getCaptcha' && message.type === 'treasure') {
                fetchFromHelper(message.url, {
                    credentials: 'include',
                }).then(res => res.json()).then((res) => {
                    this.retryTime = 0;
                    sendResponse(res);
                }, (res) => {
                    if (this.retryTime < this.maxRetryTime) {
                        ++this.retryTime;
                        console.error(res.json());
                        setTimeout(this.getCaptcha, 2000);
                    } else sendResponse(res);
                });
            } else if (message.command === 'getAward' && message.type === 'treasure') {
                fetchFromHelper(message.url, {
                    credentials: 'include',
                }).then(res => res.json()).then((res) => {
                    this.retryTime = 0;
                    sendResponse(res);
                }, (res) => {
                    if (this.retryTime < this.maxRetryTime) {
                        ++this.retryTime;
                        console.error(res);
                        setTimeout(this.getCaptcha, 2000);
                    } else sendResponse(res);
                });
            }
            return true;
        });
    };
}
