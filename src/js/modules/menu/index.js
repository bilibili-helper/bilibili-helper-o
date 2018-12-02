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
            permissions: ['login'],
            dependencies: ['popupAnchor'],
            settings: {
                on: true,
                toggle: false,
                title: '扩展程序菜单栏',
                type: 'checkbox',
                hasUI: true,
                description: '选择您需要在扩展菜单中显示的常用功能',
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
                        {key: 'linker', title: '视频快速跳转', on: true, description: '支持avXXXX，ssXXX，sXXX，mdxxx'},
                    ],
                },
            },
        });
    }
}