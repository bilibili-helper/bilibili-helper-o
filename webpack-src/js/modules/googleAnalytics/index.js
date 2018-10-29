/**
 * Author: DrowsyFlesh
 * Create: 2018/10/28
 * Description:
 */

import {define} from 'Utils';
import {Feature} from 'Modules/feature';

export const GoogleAnalytics = define(['Debug'], class GoogleAnalytics extends Feature {
    constructor() {
        super({
            name: 'googleAnalytics',
            kind: 'other',
            require: ['debug'],
            options: {
                on: false,
                toggle: false,
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

    insertGAScriptTag = () => {
        if (document.getElementsByClassName('ga-script').length === 0) {
            const debug = this.getOption('debug').on;
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
});