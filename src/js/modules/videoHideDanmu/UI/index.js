/**
 * Author: DrowsyFlesh
 * Create: 2018/11/22
 * Description:
 */
import {UI} from 'Libs/UI';
import _ from 'lodash';

export class VideoHideDanmuUI extends UI {
    constructor() {
        super({
            name: 'videoHideDanmu',
            dependencies: ['videoAnchor'],
        });
    }

    load = (containers, settings) => {
        if (!settings.on) return Promise.resolve();
        return new Promise(resolve => {
            this.hide();
            new MutationObserver((mutationList) => {
                _.map(mutationList, (mutation) => {
                    if (mutation.oldValue) this.hide();
                });
            }).observe(document.querySelector('#bofqi'), {
                attributeOldValue: true,
                subtree: true,
            });
            resolve();
        });
    };

    hide = () => {
        const btn1 = document.querySelector('.bilibili-player-video-control .bilibili-player-iconfont.bilibili-player-iconfont-danmaku');
        const btn2 = document.querySelector('.bilibili-player-video-danmaku-switch input[type=checkbox]');
        if (btn1 && !btn1.getAttribute('bibili-helper-data')) {
            btn1.setAttribute('bibili-helper-data', true);
            btn1.click();
        } else if (btn2 && !btn2.getAttribute('bibili-helper-data')) {
            btn2.setAttribute('bibili-helper-data', true);
            btn2.click();
        }
    };
}
