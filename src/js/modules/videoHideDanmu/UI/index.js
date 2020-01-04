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
        this.btn1 = null;
        this.btn2 = null;
    }

    load = (containers, settings) => {
        if (!settings.on) {
            return Promise.resolve();
        }
        return new Promise(resolve => {
            this.hide();
            new MutationObserver((mutationList) => {
                mutationList.forEach((mutation) => {
                    if (mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach((dom) => {
                            if (dom.tagName === 'VIDEO' || dom.tagName === 'INPUT') {
                                this.btn1 = document.querySelector('.bilibili-player-video-control .bilibili-player-iconfont.bilibili-player-iconfont-danmaku');
                                this.btn2 = document.querySelector('.bilibili-player-video-danmaku-switch input[type=checkbox]');
                                setTimeout(this.hide, 1000);
                            }
                        });
                    }
                });
            }).observe(document.querySelector('#bofqi'), {
                subtree: true,
                childList: true,
            });
            resolve();
        });
    };

    hide = () => {
        if (this.btn1 && !this.btn1.getAttribute('bibili-helper-data')) {
            this.btn1.setAttribute('bibili-helper-data', true);
            this.btn1.click();
        } else if (this.btn2 && this.btn2.checked) {
            this.btn2.click();
        }
    };
}
