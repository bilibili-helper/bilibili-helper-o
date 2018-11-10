/**
 * Author: DrowsyFlesh
 * Create: 2018/10/28
 * Description:
 */

import {Feature} from 'Libs/feature';
import {version} from 'Utils';

export class GoogleAnalytics extends Feature {
    constructor() {
        super({
            name: 'googleAnalytics',
            kind: 'other',
            dependencies: ['debug'],
            settings: {
                on: true,
                //toggle: false,
                title: '数据统计',
                description: '匿名统计功能的使用情况，有助于帮助开发者改进程序为你提供更好的体验',
            },
        });
    }

    launch = () => {
        this.insertGAScriptTag();
        //ga('set', 'sendHitTask');
        //ga('send', 'event', 'test', 'submit', {
        //    hitCallback: function() {
        //        console.log(1);
        //    },
        //});
    };

    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.commend === 'bilibili-helper-ga') {
                ga('send', {
                    hitType: 'event',
                    eventCategory: version,
                    eventAction: 'init',
                    eventLabel: 'test',
                    nonInteraction: true,
                });
            }
        });
    }

    insertGAScriptTag = () => {
        if (document.getElementsByClassName('ga-script').length === 0) {
            const debug = this.getSetting('debug').on;
            const script = `https://www.google-analytics.com/analytics${debug ? '_debug' : ''}.js`;
            window['GoogleAnalyticsObject'] = 'ga';
            window.ga = window.ga || function() {
                (window.ga.q = window.ga.q || []).push(arguments);
            };
            window.ga.l = 1 * new Date();
            const scriptTag = document.createElement('script');
            scriptTag.setAttribute('class', 'ga-script');
            scriptTag.setAttribute('async', 1);
            scriptTag.setAttribute('src', script);
            document.head.appendChild(scriptTag);
            ga('create', 'UA-39765420-2', 'auto');
            ga('set', 'checkProtocolTask');
        }
    };
};