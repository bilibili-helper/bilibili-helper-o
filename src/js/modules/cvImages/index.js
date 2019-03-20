/**
 * Author: DrowsyFlesh
 * Create: 2019/3/17
 * Description:
 */
import {Feature} from 'Libs/feature';

export {CvImagesUI} from './UI';

export class CvImages extends Feature {
    constructor() {
        super({
            name: 'cvImages',
            kind: 'cv',
            settings: {
                on: true,
                hasUI: true,
                title: '专栏图片保存',
            },
        });
        this.imageMap = {};
        this.canvas = document.createElement('canvas');
        this.image = new Image();
    }

    addListener = () => {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.commend === 'cvDownloadImage') {
                this.image.src = message.src;
                this.getData(message.src).then((url) => {
                    chrome.downloads.download({
                        saveAs: true,
                        url,
                        filename: Date.now() + '.jpg',
                    });
                });
            }
            return true;
        });
    };

    getData = (src) => {
        return new Promise(resolve => {
            const that = this;
            if (this.imageMap[src]) resolve(this.imageMap[src]);
            else this.image.onload = function() {
                that.canvas.width = this.width;
                that.canvas.height = this.height;
                that.canvas.getContext('2d').drawImage(this, 0, 0);
                that.imageMap[src] = that.canvas.toDataURL('image/jpeg');
                resolve(that.imageMap[src]);
            };
        });
    };
}
