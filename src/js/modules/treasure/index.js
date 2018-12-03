/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

import {Feature} from 'Libs/feature';
import _ from 'lodash';
import {treasureOpenImg} from 'Modules/treasure/UI/imgUrls';
import {__} from 'Utils';

export {TreasureUI} from './UI/index';

export class Treasure extends Feature {
    constructor() {
        super({
            name: 'treasure',
            kind: 'live',
            permissions: ['login', 'notifications'],
            settings: {
                on: true,
                toggle: true,
                hasUI: true,
                title: '自动领瓜子',
                description: '打开直播间就会自动领瓜子',
                type: 'checkbox',
                options: [
                    {key: 'notification', title: '推送通知', on: true, description: '领取成功后将会弹出代表成功的推送通知'},
                ],
            },
        });
    }

    addListener = () => {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.commend === 'sendNotification' && message.type === 'treasure') {
                const {time_start, silver} = message;
                const notificationState = _.find(this.settings.options, {key: 'notification'});
                if (notificationState && notificationState.on) {
                    chrome.notifications.create('bilibili-helper-treasure' + time_start, {
                        type: 'basic',
                        iconUrl: treasureOpenImg,
                        title: __('extensionNotificationTitle'),
                        message: `成功领取${silver}瓜子`,
                    });
                }
            }
        });
    };
}