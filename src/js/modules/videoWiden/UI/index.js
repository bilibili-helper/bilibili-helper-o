/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */
import $ from 'jquery';
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
        return new Promise(resolve => {
            const option = settings.subPage.value;
            this.setWide(option);
            new MutationObserver((mutationList) => {
                _.map(mutationList, (mutation) => {
                    if (mutation.oldValue) {
                        this.setWide(option);
                    }
                });
            }).observe($('#bofqi')[0], {
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
                const btn = $('.bilibili-player-video-btn-widescreen');
                if (btn.length > 0 && !btn.attr('bilibili-helper-data')) {
                    btn.attr({'bilibili-helper-data': true});
                    btn.click();
                }
                break;
            }
            case 'web': {
                const btn = $('.bilibili-player-video-web-fullscreen');
                document.getElementsByClassName('bilibili-player-video-web-fullscreen')[0].click();
                if (btn.length > 0 && !btn.attr('bilibili-helper-data')) {
                    btn.attr({'bilibili-helper-data': true});
                    btn.click();
                }
                break;
            }
        }
    };
}