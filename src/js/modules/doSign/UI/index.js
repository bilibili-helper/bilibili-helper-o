import $ from 'jquery';

/**
 * Author: DrowsyFlesh
 * Create: 2018/11/28
 * Description:
 */
import {UI} from 'Libs/UI';

export class DoSignUI extends UI {
    constructor() {
        super({
            name: 'doSign',
        });
    }

    load = (containers, settings) => {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({
                commend: 'inIncognitoContext',
            }, (inIncognitoContext) => {
                chrome.runtime.sendMessage({
                    commend: 'getPermissionMap',
                }, (permissionMap) => {
                    if (permissionMap.login && settings.on && !inIncognitoContext) {
                        $.ajax({
                            method: 'get',
                            url: 'https://api.live.bilibili.com/sign/doSign',
                            success: () => {
                                resolve();
                            },
                        });
                    }
                });

            });
        });

    };
}