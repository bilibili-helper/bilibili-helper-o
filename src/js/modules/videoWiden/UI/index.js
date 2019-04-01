/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */
import {UI} from 'Libs/UI';
import _ from 'lodash';

export class VideoWidenUI extends UI {
    constructor() {
        super({
            name: 'videoWiden',
            dependencies: ['videoAnchor'],
        });
    }

    load = (containers, settings) => {
        if (!settings.on) return Promise.resolve();
        return new Promise(resolve => {
            const option = settings.subPage.value;
            this.setWide(option);
            new MutationObserver((mutationList) => {
                _.map(mutationList, (mutation) => {
                    if (mutation.oldValue) {
                        this.setWide(option);
                    }
                });
            }).observe(document.querySelector('#bofqi'), {
                attributes: true,
                attributeOldValue: true,
                subtree: true,
            });
            resolve();
        });
    };

    setWide = (option) => {
        switch (option) {
            case 'wide': {
                const btn = document.querySelector('.bilibili-player-video-btn-widescreen:not(.closed)');
                if (btn && !btn.getAttribute('bilibili-helper-data')) {
                    btn.setAttribute('bilibili-helper-data', true);
                    btn.click();
                }
                break;
            }
            case 'web': {
                const btn = document.querySelector('.bilibili-player-video-web-fullscreen:not(.closed)');
                if (btn && !btn.getAttribute('bilibili-helper-data')) {
                    btn.setAttribute('bilibili-helper-data', true);
                    btn.click();
                }
                break;
            }
        }
    };
}
