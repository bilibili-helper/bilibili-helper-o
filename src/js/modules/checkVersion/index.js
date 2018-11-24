/**
 * Author: DrowsyFlesh
 * Create: 2018/11/20
 * Description:
 */
import $ from 'jquery';
import _ from 'lodash';
import store from 'store';
import {Feature} from 'Libs/feature';
import {__, getURL, version} from 'Utils';
import {PERMISSION_STATUS} from 'Utils';

const {notifications} = PERMISSION_STATUS;

export class CheckVersion extends Feature {
    constructor() {
        super({
            name: 'checkVersion',
            kind: 'other',
            permissions: {notifications},
            settings: {
                on: true,
                title: '自动检测更新',
                type: 'checkbox',
                options: [
                    {key: 'notification', title: '推送通知', on: false},
                ],
            },
        });
        if (!store.get('version')) {
            this.settings.version = {
                number: version,
                day: new Date().getDate(),
            };
            store.set('version', this.settings.version);
        }
    }

    launch = () => {
        $.ajax({
            method: 'get',
            url: `https://bilihelper.guguke.net/version.json`,
            success: (res) => {
                const {day, updateTime} = this.getVersion();
                if ((this.compareVersion(res.version, version) > 0 || updateTime < res.update_time) && day !== new Date().getDate()) { // 比较今天是否有检测过
                    this.setVersion(res);
                    const notifyOn = _.find(this.settings.options, (o) => o.key === 'notification').on;
                    notifyOn && chrome.notifications.create(`bh-${this.name}-${(Math.random() * 1000).toFixed(0)}`, {
                        type: 'basic',
                        iconUrl: getURL('/statics/imgs/cat.svg'),
                        title: __('extensionNotificationTitle'),
                        message: __('checkVersionNewVersion') + res.version,
                    });
                }
            },
            error: (e) => {
                const notifyOn = _.find(this.settings.options, (o) => o.key === 'notification').on;
                notifyOn && chrome.notifications.create(`bh-${this.name}-${(Math.random() * 1000).toFixed(0)}`, {
                    type: 'basic',
                    iconUrl: getURL('/statics/imgs/cat.svg'),
                    title: __('extensionNotificationTitle'),
                    message: __('checkVersionGetUpdateError'),
                });
                console.error('Failed to check version', e);
            },
        });
    };

    setVersion = ({version, update_time: updateTime}) => {
        if (!store.get('version')) {
            this.settings.version = {
                number: version,
                day: new Date().getDate(),
            };
        } else {
            this.settings.version.number = version;
            this.settings.version.updateTime = updateTime;
            this.settings.version.day = new Date().getDate();
        }
        store.set('version', this.settings.version);
    };

    getVersion = () => {
        const v = store.get('version');
        if (v === undefined) {
            this.settings.version = {
                number: null,
                updateTime: null,
                date: null,
            };
        } else {
            this.settings.version = v;
        }
        return this.settings.version;
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