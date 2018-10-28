/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

import {define} from 'Utils';
import {Feature} from 'Modules';
import {treasureOpenImg} from 'Modules/treature/GUI/imgUrls';
import {__, PERMISSION_TYPE} from 'Utils';

const {login, notification} = PERMISSION_TYPE;

export const Treasure = define(['googleAnalytics'], class Treasure extends Feature {
    constructor() {
        super({
            name: 'treasure',
            kind: 'live',
            permission: {login, notification},
            options: {
                on: true,
                title: '自动领瓜子',
                optionType: 'checkbox',
                options: [
                    {title: '推送通知', key: 'notification', on: true},
                ],
                toggle: true,
            },
        });
    }

    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'sendNotification' && message.type === 'treasure') {
                const {time_start, silver} = message;
                chrome.notifications.create('bilibili-helper-treasure' + time_start, {
                    type: 'basic',
                    iconUrl: treasureOpenImg,
                    title: __('notificationTitle'),
                    message: `成功领取${silver}瓜子`,
                });
            }
        });
    };
});