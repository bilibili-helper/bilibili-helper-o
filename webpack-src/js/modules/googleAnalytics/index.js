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
                on: true,
                title: '数据统计',
            },
        });
    }

    launch = () => {
        const debug = this.getOption('debug').on;
        const script = `https://www.google-analytics.com/analytics${debug ? '_debug' : ''}.js`;
        (function() {
            window['GoogleAnalyticsObject'] = 'ga';
            window.ga = window.ga || function() {
                (window.ga.q = window.ga.q || []).push(arguments);
            };
            window.ga.l = 1 * new Date();
            const scriptTag = document.createElement('script');
            const m = document.getElementsByTagName('script')[0];
            scriptTag.async = 1;
            scriptTag.src = script;
            m.parentNode.insertBefore(scriptTag, m);
        })(null, null, null, null, 'ga');

        ga('create', 'UA-39765420-2', 'auto');
        ga('set', 'checkProtocolTask');
        ga('set', 'sendHitTask');
        //ga('send', 'event', 'test', 'submit', {
        //    hitCallback: function() {
        //        console.log(1);
        //    },
        //});
    };
});