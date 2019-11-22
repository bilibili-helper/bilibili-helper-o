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
            if (message.command === 'showDisabledVideoURLRequest' && message.data && message.data.code === 0) {
                this.dealWithVideoList(message.data.data.medias);
                sendResponse(true);
            }
            return true;
        });
    };

    dealWithVideoList(list) {
        list.forEach((item) => {
            if (item.attr === 9 || item.attr === 1) {
                const {id, cover = '', title = '', intro = '', pages = []} = item;
                const disabledVideoDOM = document.querySelector(`.small-item.disabled[data-aid="${id}"]`);
                disabledVideoDOM.classList.remove('disabled');
                if (!cover && !cover.match('be27fd62c99036dce67efface486fb0a88ffed06')) { // 如果封面数据有效
                    disabledVideoDOM.querySelector('img[alt=已失效视频]').src = cover;
                }
                const titleDOM = disabledVideoDOM.querySelector('a[title=已失效视频]');
                if (titleDOM && title === '已失效视频' && pages.length > 0 && pages[0].title !== '') { // 如果标题数据有效
                    titleDOM.textContent = pages[0].title;
                } else if(titleDOM && intro) titleDOM.textContent = intro;

                if (titleDOM && intro) {
                    titleDOM.title = intro;
                }

                disabledVideoDOM.querySelector('.disabled-cover').setAttribute('style', 'display: block;')
            }
        });
    }

    load = (containers, settings) => {
        if (!settings.on) {
            return Promise.resolve();
        }
        return new Promise(resolve => {
            this.interval('.fav-video-list')
                .then(() => {
                    chrome.runtime.sendMessage({command: 'showDisabledVideoDOMInitialized'});
                });
            resolve(containers);
        });
    };
}
