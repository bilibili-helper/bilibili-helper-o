/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import {Feature} from 'Libs/feature';
export {MenuUI} from './UI/index';
export class Menu extends Feature {
    constructor() {
        super({
            name: 'menu',
            kind: 'popup',
            dependencies: ['debug', 'popup'],
            settings: {
                on: true,
                toggle: false,
                title: '扩展程序菜单栏',
                type: 'checkbox',
                hasUI: true,
                options: [
                    {key: 'oldWatchPage', title: '旧关注页面', on: false},
                ],
                subPage: {
                    title: '启用菜单栏',
                    type: 'checkbox',
                    options: [
                        {key: 'video', title: '前往主站', on: true},
                        {key: 'live', title: '前往直播区', on: true},
                        {key: 'dynamic', title: '我的关注', on: true},
                        {key: 'favourite', title: '我的收藏', on: true},
                    ],
                },
            },
        });
    }
}