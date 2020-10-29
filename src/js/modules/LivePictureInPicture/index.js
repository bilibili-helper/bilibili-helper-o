/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */

import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';
export {LivePictureInPictureUI} from './UI';

export class LivePictureInPicture extends Feature {
    constructor() {
        super({
            name: 'livePictureInPicture',
            kind: 'live',
            dependencies: ['language'],
            permissions: ['pip'],
            settings: {
                on: true,
                title: `${__('livePictureInPicture_name')} (PIP)`,
                hasUI: true,
            },
        });
    }

    launch = () => {
        if (document.pictureInPictureEnabled) {
            this.settings.on = true;
            this.setSetting(this.settings);
        } else {
            this.pause();
        }
    };
    pause = () => {
        this.settings.on = false;
        this.setSetting(this.settings);
    }
}
