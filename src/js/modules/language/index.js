/**
 * Author: DrowsyFlesh
 * Create: 2018/10/28
 * Description:
 */

import {Feature} from 'Libs/feature';
import {__} from 'Utils/functions';

let langOption = {
    lang: navigator.language,
    t: Date.now(),
};

export class Language extends Feature {
    constructor() {
        super({
            name: 'language',
            kind: 'other',
            settings: {
                on: true,
                toggle: false,
                title: __('language_name'),
                description: __('language_description'),
                subPage: {
                    type: 'radio',
                    title: __('language_subPage_title'),
                    description: __('language_subPage_description'),
                    options: [
                        {key: 'auto', title: __('language_subPage_options_auto')},
                        {key: 'zh-CN', title: __('language_subPage_options_zhCN')},
                        {key: 'zh-TW', title: __('language_subPage_options_zhTW')},
                        {key: 'en', title: __('language_subPage_options_en')},
                    ],
                    value: 'auto',
                },
            },
        });
    }

    launch = () => {
        langOption = {
            lang: (this.store && this.store.subPage && this.store.subPage.value) || navigator.language,
            t: Date.now(),
        };

        if (langOption.lang !== window.navigator.language && langOption.lang !== 'auto') {
            langOption.lang = window.navigator.language;
            langOption.t = Date.now();
        }
    };

    addListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.command === 'getI18nMap') {
                sendResponse(window.i18nMap);
            }
            return true;
        });
    };
};
