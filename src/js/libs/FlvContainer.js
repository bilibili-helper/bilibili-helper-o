/**
 * Author: DrowsyFlesh
 * Create: 2019/2/4
 * Description:
 */

/* flv容器，用来处理分段flv下载合并任务 */
import _ from 'lodash';
import URL from 'url-parse';
import fetchProgress from 'fetch-progress';
import {DataBase} from './DataBase.js';

const UPDATE_INTERVAL = 700;

export class FlvFragment {
    constructor(db, cid, quality, {size, ahead, length, vhead, url, order}) {
        this.size = size;
        this.ahead = ahead;
        this.vhead = vhead;
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
        return fetch(this.url.toString(), {
            method: 'get',
            mode: 'cors',
            header: {
                contentType: 'application/octet-stream',
            },
        })
        .then(fetchProgress({
            onProgress: _.throttle((progress) => {
                this.progress = progress;
                if (progress.percentage === 100) this.downloaded = true;
            }, UPDATE_INTERVAL),
        }))
        .then(response => response.blob())
        .then((blob) => {
            this.db.add({order: this.order, quality: this.quality, blob});
        });
    };
}

export class FlvContainer {
    constructor({
        accept_description, accept_format: accept_format_string,
        accept_quality, durl, format, quality, has_paid, cid,
    }) {
        this.accept_description = accept_description;
        this.accept_format_string = accept_format_string;
        this.accept_quality = accept_quality;
        this.durl = durl;
        this.format = format;
        this.quality = quality;
        this.has_paid = has_paid;
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
        if (this.downloading) return;
        this.downloading = true;
        this.fragments.forEach((fragment) => {
            fragment.download();
            const intervalNum = setInterval(() => {
                if (this.percentage === 100) {
                    this.downloading = false;
                    this.db.add({order: 'end', quality: this.quality, blob: 1});
                    clearInterval(intervalNum);
                }
                callback(this.percentage);
            }, UPDATE_INTERVAL);
        });
    };
}
