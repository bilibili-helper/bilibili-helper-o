/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */
import {UI} from 'Libs/UI';

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
            switch (option) {
                case 'wide':
                    document.getElementsByClassName('bilibili-player-video-btn-widescreen')[0].click();
                    break;
                case 'web':
                    document.getElementsByClassName('bilibili-player-video-web-fullscreen')[0].click();
                    break;
            }
            resolve();
        });
    };
}