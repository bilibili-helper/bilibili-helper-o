/**
 * Author: DrowsyFlesh
 * Create: 2018/11/10
 * Description:
 */

import {UI} from 'Libs/UI';

export class ShowDisabledVideoUI extends UI {
    constructor() {
        super({
            name: 'showDisabledVideo',
        });
    }

    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.command === 'showDisabledVideoURLRequest') {
                this.dealWithVideoList();
                sendResponse(true);
            }
            return true;
        });
    };

    dealWithVideoList() {
        this.interval('.fav-video-list .small-item', 500, true).then((items) => {
            Array.from(items).forEach((item) => {
                item.classList.remove('disabled');
            });
        });

    }

    load = (containers, settings) => {
        if (!settings.on) {
            return Promise.resolve();
        }
        return new Promise(resolve => {
            this.interval('.fav-video-list').then(() => {
                chrome.runtime.sendMessage({command: 'showDisabledVideoDOMInitialized'});
            });
            resolve(containers);
        });
    };
}
