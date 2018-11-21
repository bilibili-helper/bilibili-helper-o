
/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */
import $ from 'jquery';
import {Feature} from 'Libs/feature';
import {PERMISSION_TYPE} from 'Utils';

const {login} = PERMISSION_TYPE;

export class DoSign extends Feature {
    constructor() {
        super({
            name: 'doSign',
            kind: 'live',
            permissions: {login},
            settings: {
                on: true,
                title: '自动签到',
            },
        });
    }

    launch = () => {
        this.settings.on && $.ajax({method: 'get', url: 'https://api.live.bilibili.com/sign/doSign'});
    };
};