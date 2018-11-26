/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */
import $ from 'jquery';
import {Feature} from 'Libs/feature';

export class DoSign extends Feature {
    constructor() {
        super({
            name: 'doSign',
            kind: 'live',
            permissions: ['login'],
            settings: {
                on: true,
                title: '自动签到',
            },
        });
    }

    launch = () => {
        this.settings.on && !chrome.extension.inIncognitoContext && $.ajax({
            method: 'get',
            url: 'https://api.live.bilibili.com/sign/doSign',
        });
    };
};