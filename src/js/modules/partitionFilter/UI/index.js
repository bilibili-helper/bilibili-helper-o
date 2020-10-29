/**
 * Author: memorydream
 * Create: 2020/10/22
 * Description: 屏蔽主页上的分区
 */

import {UI} from 'Libs/UI';
import _ from 'lodash';
import $ from 'jquery';

export class PartitionFilterUI extends UI {

    constructor() {
        super({
            name: 'PartitionFilter',
        });
    }

    keyToListBoxText = {
        'life': '生活',
        'live': '直播',
        'ent': '娱乐',
        'read': '专栏',
        'game': '游戏',
        'music': '音乐',
        'dance': '舞蹈',
        'anime': '番剧',
        'douga': '动画',
        'digital': '数码',
        'movie': '电影',
        'manga': '漫画',
        'cheese': '课堂',
        'kichiku': '鬼畜',
        'fashion': '时尚',
        'teleplay': 'TV剧',
        'cinephile': '影视',
        'guochuang': '国创',
        'technology': '知识',
        'information': '资讯',
        'documentary': '纪录片',
        'food': '美食',
    };

    listBoxTextToItem = {};

    load = (containers, settings) => {
        if (!settings.on) { return Promise.resolve(); }

        return new Promise(resolve => {
            let listBox = document.querySelectorAll('.item.sortable');

            if (listBox.length > 0) {
                _.forEach(listBox, (item) => {
                    this.listBoxTextToItem[item.innerText] = item;
                });

                const filterList = _.filter(settings.subPage.options, (o) => o.on === true);
                _.forEach(filterList, (v) => {
                    this.filterMain(v.key);
                    this.filterListBox(v.key);
                });
            }
            resolve();
        });
    };

    getFilterItemInListBox = (key) => {
        return this.listBoxTextToItem[this.keyToListBoxText[key]];
    };

    filterMain = (key) => {
        $('#bili_' + key).hide();
    };

    filterListBox = (key) => {
        this.getFilterItemInListBox(key).style.display = 'none';
    };
}
