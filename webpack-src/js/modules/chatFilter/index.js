/**
 * Author: DrowsyFlesh
 * Create: 2018/10/27
 * Description:
 */

import {Feature} from 'Libs/feature';
export {ChatFilterUI} from './UI/index';

export class ChatFilter extends Feature {
    constructor() {
        super({
            name: 'chatFilter',
            kind: 'live',
            dependencies: ['debug'],
            settings: {
                on: true,
                title: '聊天过滤',
                hasUI: true,
                subPage: {
                    type: 'checkbox',
                    title: '开启聊天过滤',
                    options: [
                        {key: 'chat', title: '聊天内容', on: false},
                        {key: 'small', title: '小型标志', on: true},
                        {key: 'gift', title: '礼物信息', on: true},
                        {key: 'enterMsg', title: '进场信息', on: true},
                        {key: 'medal', title: '粉丝勋章', on: true},
                        {key: 'achievement', title: '成就头衔', on: true},
                        {key: 'level', title: '用户等级', on: true},
                        {key: 'announcement', title: '系统公告', on: true},
                    ],
                },
            },
        });
    }
};