/**
 * Author: DrowsyFlesh
 * Create: 2019/2/5
 * Description:
 */
import _ from 'lodash';
import URL from 'url-parse';
import fetchProgress from 'fetch-progress';
import {DataBase} from './lib/DataBase';

const UPDATE_INTERVAL = 700;

export class Dash {
    constructor(db, cid, {
        order, SegmentBase, bandwidth, baseUrl, codecid, codecs,
        frameRate, height, quality, mimeType, width,
    }) {
        this.db = db;
        this.cid = cid;
        this.quality = quality;
        this.order = order;
        this.url = new URL(baseUrl);
        this.url.protocol = 'https:';
        //this.SegmentBase = SegmentBase;
        //this.bandwidth = bandwidth;
        //this.codecid = codecid;
        this.codecs = codecs;
        //this.frameRate = frameRate;
        this.height = height;
        this.mimeType = mimeType;
        this.width = width;

        this.downloaded = false;
        this.progress = {percentage: 0, total: 0, transferred: 0, speed: 0, remaining: 0};
    }

    /*get blob() {
        return this.db.get({order: this.order, quality: this.quality});
    }

    get size() {
        return this.blob.then(blob => blob.size);
    }*/
    readAsBuffer = (blob) => new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            resolve(event.target.result);
        };
        fileReader.readAsArrayBuffer(blob);
    });

    download = () => {
        return new Promise((resolve) => {
            const res = this.db.get({order: this.order, quality: this.quality});
            res.then((blob) => {
                this.downloaded = true;
                this.progress.percentage = 100;
                this.progress.total = blob.size;
                resolve(this.readAsBuffer(blob));
            }, () => {
                let range = 'bytes=0-';
                fetch(this.url.toString(), {
                    method: 'get',
                    mode: 'cors',
                    referrerPolicy: 'no-referrer-when-downgrade',
                    headers: {
                        Range: range,
                        'Access-Control-Request-Headers': 'range',
                        'Access-Control-Request-Method': 'GET',
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
                    console.warn(this.quality);
                    this.db.add({order: this.order, quality: this.quality, blob});
                    resolve(this.readAsBuffer(blob));
                });
            });
        });
    };
}

export class DashContainer {
    constructor(data) {
        const {format, quality, cid, timelength} = data;
        this.data = data;
        this.format = format;
        this.quality = quality;
        this.cid = cid;

        this.initIndexDataBase();
        this.initDashAudio();
        this.initDashVideo();

        // 以下为创建track需要的参数
        this.timescale = 1000;

    }

    //get downloaded() {
    //    return this.dash.downloaded;
    //}

    get percentage() {
        return this.video.progress.percentage;
    }

    //get size() {
    //    return Promise.all(this.dashes.map(dash => dash.size)).then(sizeArray => _.sum(sizeArray));
    //}

    initIndexDataBase = () => {
        if (!window.indexedDB) console.error('Your browser is not support feature: indexedDB');
        this.db = new DataBase(this.cid);
    };

    initDashAudio = (quality = parseInt(this.quality)) => {
        const currentQualityDash = _.find(this.data.dash.audio, {id: 30280});
        currentQualityDash.quality = quality;
        currentQualityDash.order = 'audio';
        //const meta = {
        //    id: this.quality,
        //    duration: this.data.timelength,
        //    presentWidth: currentQualityDash.width,
        //    presentHeight: currentQualityDash.height,
        //    type: 'video',
        //}
        this.audio = new Dash(this.db, this.cid, currentQualityDash);
    };

    initDashVideo = (quality = +this.quality) => {
        const currentQualityDash = _.find(this.data.dash.video, {id: quality});
        currentQualityDash.quality = quality;
        currentQualityDash.order = 'video';
        //const meta = {
        //    id: this.quality,
        //    duration: this.data.timelength,
        //    presentWidth: currentQualityDash.width,
        //    presentHeight: currentQualityDash.height,
        //    type: 'video',
        //}
        this.video = new Dash(this.db, this.cid, currentQualityDash);
    };

    download = (callback = () => {}) => {
        if (this.downloading) return Promise.reject();
        this.downloading = true;
        return new Promise((resolve, reject) => {
            const videoBlobsPromise = this.video.download().catch(e => reject(e));
            const audioBlobsPromise = this.audio.download().catch(e => reject(e));
            const intervalNum = setInterval(() => {
                if (this.percentage === 100) {
                    clearInterval(intervalNum);
                    this.downloading = false;
                    Promise.all([videoBlobsPromise, audioBlobsPromise]).then(blobArray => {
                        //const mimeCodec = `video/mp4; codecs="${this.video.codecs}, ${this.audio.codecs}"`;
                        resolve([blobArray, [this.video.codecs, this.audio.codecs]]);
                    });
                }
                callback(this.percentage);
            }, UPDATE_INTERVAL);
        });
    };

    installVideo() {

    }
}
