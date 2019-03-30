/**
 * Author: DrowsyFlesh
 * Create: 2019/3/17
 * Description:
 */
import {UI} from 'Libs/UI';
import $ from 'jquery';
import './styles.scss';

export class CvImagesUI extends UI {
    constructor() {
        super({
            name: 'cvImages',
        });
        this.currentSrc = null;
    }

    load = (containers, settings) => {
        const that = this;
        if (!settings.on) return Promise.resolve();
        return new Promise(resolve => {
            if (!settings.on) return resolve(containers);
            const btn = document.createElement('button');
            btn.innerText = '下载图片';
            $(document).on('mouseenter', '.page-container .img-box', function(e) {
                e.preventDefault();
                that.currentSrc = 'https:' + $(this).children('img').attr('src');
                $(this).append(btn);
                $(btn).on('click', function() {
                    if (that.currentSrc) {
                        chrome.runtime.sendMessage({
                            commend: 'cvDownloadImage',
                            src: that.currentSrc,
                        });
                    }
                })
            });
            $(document).on('mouseleave', '.page-container .img-box', function(e) {
                e.preventDefault();
                $(this).children('button').remove();
            })
            resolve(containers);
        });
    };
}
