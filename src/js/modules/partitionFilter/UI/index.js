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

    isTW = navigator.language === 'zh-TW';

    getListBoxText = (cn, tw) => {
        return this.isTW && tw ? tw : cn;
    }

    keyToListBoxText = {
        'life': this.getListBoxText('生活'),
        'live': this.getListBoxText('直播'),
        'ent': this.getListBoxText('娱乐', '娛樂'),
        'read': this.getListBoxText('专栏', '專欄'),
        'game': this.getListBoxText('游戏', '遊戲'),
        'music': this.getListBoxText('音乐', '音樂'),
        'dance': this.getListBoxText('舞蹈'),
        'anime': this.getListBoxText('番剧', '番劇'),
        'douga': this.getListBoxText('动画', '動畫'),
        'digital': this.getListBoxText('数码', '数位'),
        'movie': this.getListBoxText('电影', '電影'),
        'manga': this.getListBoxText('漫画', '漫畫'),
        'cheese': this.getListBoxText('课堂', '課堂'),
        'kichiku': this.getListBoxText('鬼畜'),
        'fashion': this.getListBoxText('时尚', '時尚'),
        'teleplay': this.getListBoxText('TV剧', 'TV劇'),
        'cinephile': this.getListBoxText('影视', '影視'),
        'guochuang': this.getListBoxText('国创', '國創'),
        'technology': this.getListBoxText('知识', '知識'),
        'information': this.getListBoxText('资讯', '資訊'),
        'documentary': this.getListBoxText('纪录片', '紀錄片'),
        'food': this.getListBoxText('美食'),
    };

    listBoxTextToItem = {};

    load = (containers, settings) => {
        if (!settings.on) { return Promise.resolve(); }

        return new Promise(resolve => {
            let listBox = document.querySelectorAll('.item.sortable');

            if (listBox.length > 0) {
                this.attack(settings, listBox);
            } else {                               //有些浏览器会在该脚本加载完成后才加载分区
                var mo = new MutationObserver(() => {
                    listBox =  document.querySelectorAll('.item.sortable');
                    if (listBox.length > 0) {
                        mo.disconnect();
                        this.attack(settings, listBox);
                    }
                });

                mo.observe($('.list-box')[0].firstChild, {childList: true, subtree: true});
            }
            resolve();
        });
    };

    attack = (settings ,listBox) => {
        _.forEach(listBox, (item) => {
            this.listBoxTextToItem[item.innerText] = item;
        });

        const filterList = _.filter(settings.subPage.options, (o) => o.on === true);
        _.forEach(filterList, (v) => {
            this.filterMain(v.key);
            this.filterListBox(v.key);
        });
    }

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
