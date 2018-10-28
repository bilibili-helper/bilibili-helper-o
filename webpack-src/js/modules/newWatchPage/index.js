/**
 * Author: DrowsyFlesh
 * Create: 2018/10/21
 * Description:
 */

import _ from 'lodash';
import {define} from 'Utils';
import {Feature} from 'Modules';

export const NewWatchPage = define(['googleAnalytics'], class NewWatchPage extends Feature {
    constructor() {
        super({
            name: 'newWatchPage',
            kind: 'other',
            permission: {},
            options: {
                on: true,
                toggle: false,
                optionType: 'radio',
                title: '关注页面跳转',
                options: [
                    {key: 'new', title: '新页面'},
                    {key: 'old', title: '旧页面'},
                ],
                value: 'new', // default
            },
        });
    }

    launch = () => {

    };
});