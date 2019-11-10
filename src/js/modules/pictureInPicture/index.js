/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */

import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';
export {PictureInPictureUI} from './UI';

export class PictureInPicture extends Feature {
    constructor() {
        super({
            name: 'pictureInPicture',
            kind: 'video',
            permissions: ['pip'],
            dependencies: ['videoAnchor'],
            settings: {
                on: true,
                title: `${__('pictureInPicture_name')} (PIP)`,
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
