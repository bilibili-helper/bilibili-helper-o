/* global process */
/**
 * Author: DrowsyFlesh
 * Create: 2018/10/28
 * Description:
 */

import {Feature} from 'Libs/feature';
import {__, version} from 'Utils';
import ReactGA from 'react-ga';

export class GoogleAnalytics extends Feature {
    constructor() {
        super({
            name: 'googleAnalytics',
            kind: 'other',
            settings: {
                on: true,
                //toggle: false,
                title: __('googleAnalytics_name'),
                description: __('googleAnalytics_description'),
            },
        });
    }

    launch = () => {
        this.insertGAScriptTag().then(() => {
            const debugMode = this.getSetting('debug').on;
            this.send({
                hitType: 'event',
                eventCategory: 'initialization',
                eventAction: 'init',
                eventLabel: `${(debugMode ? 'official' : 'dev')} ${version}`,
                nonInteraction: true,
            });
        });
    };

    send = ({
        hitType, action, category, label, nonInteraction, value,
        path, title,
        variable,
    }) => {
        switch (hitType) {
            case 'event':
                ReactGA.event({
                    action,
                    category,
                    label,
                    nonInteraction,
                    value,
                });
                break;
            case 'pageview':
                ReactGA.pageview(path, title);
                break;
            case 'timing':
                ReactGA.timing({
                    category,
                    variable, // 计时变量名称
                    value, // 变量值
                    label,
                });
                break;
        }
    };

    listener = (message) => {
        /**
         * 需要如下几个字段
         * action 表示操作类型 click init等
         * category 类别 功能名称等
         * label 功能中的具体项目名称等
         * nonInteraction 标记非交互
         */
        if (this.settings.on && message.command === 'setGAEvent' && message.action && message.category) {
            const {hitType = 'event', action, label, category = '', nonInteraction = false} = message;
            this.insertGAScriptTag().then(() => {
                this.send({
                    hitType,
                    action,
                    category,
                    label,
                    nonInteraction,
                });
            });
        }
        return true;
    };

    addListener = () => {
        chrome.runtime.onMessage.addListener(this.listener);
    };

    insertGAScriptTag = (UA = 'UA-39765420-2') => {
        return new Promise(resolve => {
            if (document.getElementsByClassName('ga-script').length === 0) {
                this.getStorage('userId')
                    .then(({userId}) => {
                        if (userId) {
                            return userId;
                        } else {
                            const userId = String(Math.random()).slice(2);
                            return this.setStorage({userId}).then(() => userId);
                        }
                    })
                    .then((userId) => {
                        ReactGA.initialize(UA, {
                            debug: process.env.DEBUG || false,
                            titleCase: false,
                            gaOptions: {
                                userId: userId,
                            },
                        });
                        ReactGA.set({dimension1: version});
                        resolve();
                    });
            } else {
                resolve();
            }
        });
    };
};
