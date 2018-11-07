/**
 * Author: DrowsyFlesh
 * Create: 2018/10/21
 * Description:
 */

import {Feature} from 'Libs/feature';

export class NewWatchPage extends Feature {
    constructor() {
        super({
            name: 'newWatchPage',
            kind: 'menu',
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
            dependencies: ['menu'],
        });
    }

    launch = () => {};
};