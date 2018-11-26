/**
 * Author: DrowsyFlesh
 * Create: 2018/11/20
 * Description:
 */
import $ from 'jquery';
import {Feature} from 'Libs/feature';
import {__} from 'Utils';

export class Silver2coin extends Feature {
    constructor() {
        super({
            name: 'silver2coin',
            kind: 'live',
            permissions: ['login'],
            settings: {
                on: false,
                title: '银瓜子自动换硬币',
            },
        });
    }

    launch = () => {
        if (!chrome.extension.inIncognitoContext) return; // 隐身模式
        chrome.cookies.get({
            url: 'http://www.bilibili.com',
            name: 'bili_jct',
        }, function(cookie) {
            // expirationDate 是秒数
            if (cookie && cookie.expirationDate > (new Date()).getTime() / 1000) {
                $.ajax({
                    method: 'get',
                    url: 'https://api.live.bilibili.com/pay/v1/Exchange/silver2coin',
                    data: {
                        platform: 'pc',
                        csrf_token: cookie.value,
                    },
                    success: (res) => {
                        if (res.code === 0) {
                            let msg = new Notification(__('extensionNotificationTitle'), {
                                body: '银瓜子兑换成功',
                            });
                            setTimeout(() => msg.close(), 10000);
                        }
                    }
                });
            }
        });
    };
}