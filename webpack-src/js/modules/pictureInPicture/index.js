/**
 * Author: DrowsyFlesh
 * Create: 2018/11/16
 * Description:
 */

import {Feature} from 'Libs/feature';
export {PictureInPictureUI} from './UI';

export class PictureInPicture extends Feature {
    constructor() {
        super({
            name: 'pictureInPicture',
            kind: 'video',
            dependencies: ['debug'],
            settings: {
                on: true,
                title: '画中画',
                hasUI: true,
            },
        });
    }

    launch = () => {
        if (document.pictureInPictureEnabled !== true) {
            this.settings.on = false;
            this.settings.toggle = false;
            this.setSetting(this.settings);
        } else {
            this.settings.toggle = true;
            this.setSetting(this.settings);
        }
    };
}