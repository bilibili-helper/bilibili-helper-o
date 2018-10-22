/**
 * Author: DrowsyFlesh
 * Create: 2018/10/21
 * Description:
 */

import _ from 'lodash';
import {Feature} from 'Modules';

export class NewWatchPage extends Feature {
    constructor() {
        super({
            name: 'newWatchPage',
            kind: 'other',
            GUI: null,
            permission: {},
            options: {
                on: true,
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
}