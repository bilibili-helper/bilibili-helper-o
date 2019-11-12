/**
 * Author: DrowsyFlesh
 * Create: 2019/3/17
 * Description:
 */
import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';

export {CvImagesUI} from './UI';

export class CvImages extends Feature {
    constructor() {
        super({
            name: 'cvImages',
            kind: 'cv',
            settings: {
                on: true,
                hasUI: true,
                title: __('cvImages_name'),
            },
        });
        this.imageMap = {};
        this.canvas = document.createElement('canvas');
        this.image = new Image();
    }

    getMineStr = (extension) => {
        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'webp':
                return 'image/jpeg';
            case 'gif':
                return 'image/gif';
        }
    };

    addListener = () => {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.command === 'cvDownloadImage') {
                this.image.src = message.src;
                if (message.extension === 'gif') {
                    chrome.downloads.download({
                        saveAs: true,
                        url: message.src,
                        filename: (message.filename || Date.now()) + '.gif',
                    });
                } else {
                    const mime = this.getMineStr(message.extension);
                    this.getData(message.src, mime).then((url) => {
                        chrome.downloads.download({
                            saveAs: true,
                            url,
                            filename: (message.filename || Date.now()) + `.${this.getMineStr(message.extension)}`,
                        });
                    });
                }
            }
            return true;
        });
    };

    getData = (src, mime) => {
        return new Promise(resolve => {
            const that = this;
            if (this.imageMap[src]) resolve(this.imageMap[src]);
            else this.image.onload = function() {
                that.canvas.width = this.width;
                that.canvas.height = this.height;
                that.canvas.getContext('2d').drawImage(this, 0, 0);
                that.imageMap[src] = that.canvas.toDataURL(mime);
                resolve(that.imageMap[src]);
            };
        });
    };
}
