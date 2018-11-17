/**
 * Author: DrowsyFlesh
 * Create: 2018/11/13
 * Description:
 */

//import URL from 'url-parse';
//import _ from 'lodash';
import {Feature} from 'Libs/feature';
//import {MessageStore} from 'Libs/messageStore';

export class VideoQualitySelect extends Feature {
    constructor() {
        super({
            name: 'videoQualitySelect',
            kind: 'video',
            dependencies: ['debug', 'videoAnchor'],
            settings: {
                on: false,
                toggle: false,
                title: '视频清晰度选择',
                description: '待开发',
                //type: 'radio',
                //options: [
                //    {key: '80'}
                //]
            },
        });
    }

    launch = () => {};
}