/**
 * Author: DrowsyFlesh
 * Create: 2019/2/4
 * Description:
 */

/* flv容器，用来处理分段flv下载合并任务 */
import _ from 'lodash';
import URL from 'url-parse';
import fetchProgress from 'fetch-progress';
import {DataBase} from './lib/DataBase';

const UPDATE_INTERVAL = 700;

export class FlvFragment {
    constructor(db, cid, quality, {size, length, url, order}) {
        this.size = size;
        this.length = length;
        this.url = new URL(url);
        this.url.protocol = 'https:';
        this.order = order;
        this.quality = quality;

        this.db = db;
        this.cid = cid;
        this.downloaded = false;
        this.progress = {percentage: 0, total: 0, transferred: 0, speed: 0, remaining: 0};
    }

    download = () => {
        return new Promise((resolve) => {
            const res = this.db.get({order: this.order, quality: this.quality});
            res.then((blob) => {
                this.downloaded = true;
                this.progress.percentage = 100;
                this.progress.total = blob.size;
                resolve(blob);
            }, () => {
                fetch(this.url.toString(), {
                    method: 'get',
                    mode: 'cors',
                })
                .then(fetchProgress({
                    onProgress: _.throttle((progress) => {
                        this.progress = progress;
                        if (progress.percentage === 100) this.downloaded = true;
                    }, UPDATE_INTERVAL),
                }))
                .then(response => response.blob())
                .then((blob) => {
                    //this.db.add({order: this.order, quality: this.quality, blob});
                    resolve(blob);
                });
            });
        });
    };
}

export class FlvContainer {
    constructor({durl, format, quality, cid}) {
        this.durl = durl;
        this.format = format;
        this.quality = quality;
        this.cid = cid;

        this.initIndexDataBase();
        this.initFragment();
    }

    // 返回容器内是否所有片段都下载完毕的状态
    get downloaded() {
        const downloadedNum = _.compact(this.fragments.map((fragment) => fragment.downloaded)).length;
        return downloadedNum === this.fragments.length;
    }

    get percentage() {
        let sum = 0;
        this.fragments.forEach((fragment) => {
            sum = sum + fragment.progress.percentage;
        });
        return Math.round(sum / this.fragments.length);
    }

    initIndexDataBase = () => {
        if (!window.indexedDB) console.error('Your browser is not support feature: indexedDB');
        this.db = new DataBase(this.cid);
    };

    initFragment = () => {
        this.fragments = this.durl.map((data) => new FlvFragment(this.db, this.cid, this.quality, data));
    };

    download = (callback = () => {}) => {
        if (this.downloading) return Promise.reject();
        this.downloading = true;
        return new Promise((resolve, reject) => {
            const blobsPromise = Promise.all(this.fragments.map((fragment) => fragment.download()))
                                        .catch(e => reject(e));
            const intervalNum = setInterval(() => {
                if (this.percentage === 100) {
                    clearInterval(intervalNum);
                    this.downloading = false;
                    blobsPromise.then(blobs => resolve(blobs));
                }
                callback(this.percentage);
            }, UPDATE_INTERVAL);
        });
    };

    clear = (quality) => {
        return this.db.clear(quality);
    };
}
