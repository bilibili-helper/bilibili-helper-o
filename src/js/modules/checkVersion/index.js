/**
 * Author: DrowsyFlesh
 * Create: 2018/11/20
 * Description:
 */
import $ from 'jquery';
import _ from 'lodash';
import {Feature} from 'Libs/feature';
import {__, getURL, version} from 'Utils';
import apis from './apis';

export class CheckVersion extends Feature {
    constructor() {
        super({
            name: 'checkVersion',
            kind: 'other',
            permissions: ['notifications'],
            settings: {
                on: true,
                title: '自动检测更新',
                description: '仅仅进行检测而并不进行更新操作',
                type: 'checkbox',
                options: [
                    {key: 'notification', title: '推送通知', on: false},
                ],
            },
        });
        if (!this.store) {
            this.settings.version = {
                number: version,
                day: new Date().getDate(),
            };
            this.store = this.settings.version;
        }
    }

    launch = () => {
        this.request();
    };

    addListener = () => {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.commend === 'checkVersion') {
                this.request(true);
            }
        });
    };

    setVersion = ({version, update_time: updateTime}) => {
        if (!this.store) {
            this.settings.version = {
                number: version,
                day: new Date().getDate(),
            };
        } else {
            if (version) this.settings.version.number = version;
            if (updateTime) this.settings.version.updateTime = updateTime;
            this.settings.version.day = new Date().getDate();
        }
        this.store = this.settings.version;
    };

    getVersion = () => {
        const v = this.store;
        if (v === undefined) {
            this.settings.version = {
                number: null,
                updateTime: null,
                day: null,
            };
        } else {
            this.settings.version = v;
        }
        return this.settings.version;
    };

    request = (ignore = false) => {
        const {day, updateTime} = this.getVersion();
        if (day !== new Date().getDate() || ignore) {
            const notifyOn = _.find(this.settings.options, (o) => o.key === 'notification').on || ignore;
            const notifyId = `bh-${this.name}-${(Math.random() * 1000).toFixed(0)}`;
            $.ajax({
                method: 'get',
                url: apis.version,
                success: (res) => {
                    if (this.compareVersion(res.version, version) > 0 || updateTime < res.update_time) { // 比较今天是否有检测过
                        this.setVersion(res);
                        notifyOn && chrome.notifications.create(notifyId, {
                            type: 'basic',
                            iconUrl: getURL('/statics/imgs/cat.svg'),
                            title: __('extensionNotificationTitle'),
                            message: __('checkVersionNewVersion') + res.version,
                        });
                    } else if (ignore) {
                        this.setVersion({});
                        chrome.notifications.create(notifyId, {
                            type: 'basic',
                            iconUrl: getURL('/statics/imgs/cat.svg'),
                            title: __('extensionNotificationTitle'),
                            message: __('checkVersionNoNewVersion'),
                        });
                    } else this.setVersion({});
                },
                error: (e) => {
                    notifyOn && chrome.notifications.create(notifyId, {
                        type: 'basic',
                        iconUrl: getURL('/statics/imgs/cat.svg'),
                        title: __('extensionNotificationTitle'),
                        message: __('checkVersionGetUpdateError'),
                    });
                    console.error('Failed to check version', e);
                },
            });
        }
    };

    compareVersion = (a, b) => {
        if (a === b) {
            return 0;
        }

        let a_components = a.split('.');
        let b_components = b.split('.');

        let len = Math.min(a_components.length, b_components.length);

        // loop while the components are equal
        for (let i = 0; i < len; i++) {
            // A bigger than B
            if (parseInt(a_components[i]) > parseInt(b_components[i])) {
                return 1;
            }

            // B bigger than A
            if (parseInt(a_components[i]) < parseInt(b_components[i])) {
                return -1;
            }
        }

        // If one's a prefix of the other, the longer one is greater.
        if (a_components.length > b_components.length) {
            return 1;
        }

        if (a_components.length < b_components.length) {
            return -1;
        }

        // Otherwise they are the same.
        return 0;
    };
}