/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description: 扩展守护脚本
 */
import 'babel-polyfill';
import {FeatureManager} from 'Libs/FeatureManager';

new Promise((resolve) => {
    chrome.i18n.getAcceptLanguages((acceptLanguages) => {
        const languages = acceptLanguages.map((str) => str.replace('-', '_'));
        const urls = languages.map(lang => `_locales/${lang}/messages.json`);
        const requests = urls.map(url => fetch(url).then(res => res.json()));
        Promise.all(requests).then((langObjects) => {
            window.i18nMap = acceptLanguages.reduce((target, langName, index) => {
                target[langName] = langObjects[index];
                return target;
            }, {});
            resolve();
        });
    });
}).then(() => {
    window.FeatureManager = new FeatureManager(); // 创建统一模块管理对象
});
