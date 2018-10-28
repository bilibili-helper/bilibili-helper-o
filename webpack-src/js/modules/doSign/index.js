import $ from 'jquery';

/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */
import {define} from 'Utils';
import {Feature} from 'Modules';

export const Dosign = define(['googleAnalytics'], class DoSign extends Feature {
    constructor() {
        super({
            name: 'doSign',
            kind: 'live',
            GUI: null,
            permission: {},
            options: {
                on: true,
                title: '自动签到',
            },
        });
    }

    launch = () => {
        this.options.on && $.ajax({method: 'get', url: 'https://api.live.bilibili.com/sign/doSign'});
    };
});