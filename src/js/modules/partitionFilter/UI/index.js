/**
 * Author: memorydream
 * Create: 2020/10/22
 * Description: 屏蔽主页上的分区
 */

import {UI} from 'Libs/UI';

export class PartitionFilterUI extends UI {
    constructor() {
        super({
            name: 'PartitionFilter',
        });
    }

    kindNameMap = {
        'life': ['生活'],
        'live': ['直播'],
        'ent': ['娱乐', '娛樂'],
        'read': ['专栏', '專欄'],
        'game': ['游戏', '遊戲'],
        'music': ['音乐', '音樂'],
        'dance': ['舞蹈'],
        'anime': ['番剧', '番劇'],
        'douga': ['动画', '動畫'],
        'digital': ['数码', '数位'],
        'movie': ['电影', '電影'],
        'manga': ['漫画', '漫畫'],
        'cheese': ['课堂', '課堂'],
        'kichiku': ['鬼畜'],
        'fashion': ['时尚', '時尚'],
        'teleplay': ['TV剧', 'TV劇'],
        'cinephile': ['影视', '影視'],
        'guochuang': ['国创', '國創'],
        'technology': ['知识', '知識'],
        'information': ['资讯', '資訊'],
        'documentary': ['纪录片', '紀錄片'],
        'food': ['美食'],
    };

    kindDOMMap = {};

    load = (containers, settings) => {
        if (!settings.on) { return Promise.resolve(); }
        return new Promise(resolve => {
            let kindDOMList = Array.from(document.querySelectorAll('.item.sortable'));

            if (kindDOMList.length > 0) {
                kindDOMList.forEach((kindDOM) => {
                    this.kindDOMMap[kindDOM.innerText] = kindDOM;
                });

                const filterList = settings.subPage.options.filter((o) => o.on === true);
                filterList.map(item => item.key).map(key => {
                    this.filterMain(key);
                    this.filterListBox(key);
                });
                document.querySelector('div.proxy-box').style.minHeight = 'unset';
            }
            resolve();
        });
    };

    filterMain = (key) => {
        const target = document.getElementById('bili_' + key);
        if (target) {
            target.style.display = 'none';
        }
    };

    filterListBox = (key) => {
        const nameList = this.kindNameMap[key];
        nameList.forEach(name => {
            let box = this.kindDOMMap[name];
            if (box) {
                box.style.display = 'none';
            }
        });
    };
}
