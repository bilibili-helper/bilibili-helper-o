/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */


import {Feature} from 'Libs/feature';
import {treasureOpenImg} from 'Modules/treasure/UI/imgUrls';
import {__, PERMISSION_TYPE} from 'Utils';

const {login, notification} = PERMISSION_TYPE;
export {TreasureUI} from './UI/index';
export class Treasure extends Feature {
    constructor() {
        super({
            name: 'treasure',
            kind: 'live',
            permission: {login, notification},
            dependencies: ['debug'],
            settings: {
                on: true,
                toggle: true,
                hasUI: true,
                title: '自动领瓜子',
                type: 'checkbox',
                options: [
                    {key: 'notification', title: '推送通知', on: true},
                ],
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
}