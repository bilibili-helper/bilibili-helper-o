/**
 * Author: DrowsyFlesh
 * Create: 2018/11/22
 * Description:
 */
import $ from 'jquery';
import {UI} from 'Libs/UI';
import _ from 'lodash';

export class VideoHideDanmuUI extends UI {
    constructor() {
        super({
            name: 'videoHideDanmu',
            dependencies: ['videoAnchor'],
        });
    }

    load = ([container], settings) => {
        return new Promise(resolve => {
            this.hide(settings.on);
            new MutationObserver((mutationList) => {
                _.map(mutationList, (mutation) => {
                    if (mutation.oldValue) {
                        this.hide(settings.on);
                    }
                });
            }).observe($('#bofqi')[0], {
                attributeOldValue: true,
                subtree: true,
            });
            resolve();
        });
    };

    hide = (on) => {
        if (on) {
            const btn1 = $('.bilibili-player-video-control .bilibili-player-iconfont.bilibili-player-iconfont-danmaku');
            const btn2 = $('.bilibili-player-video-danmaku-switch input[type=checkbox]');
            if (btn1.length === 1 && !btn1.attr('bibili-helper-data')) {
                btn1.attr({'bibili-helper-data': true});
                btn1.click();
            } else if (btn2.length === 1 && !btn2.attr('bibili-helper-data')) {
                btn2.attr({'bibili-helper-data': true});
                btn2.click();
            }
        }
    };
}