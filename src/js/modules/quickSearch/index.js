/**
 * Author: DrowsyFlesh
 * Create: 2018/11/20
 * Description:
 */
import {Feature} from 'Libs/feature';
import {__, createTab} from 'Utils';

export class QuickSearch extends Feature {
    constructor() {
        super({
            name: 'quickSearch',
            kind: 'other',
            settings: {
                on: true,
                title: '右键用哔哩哔哩搜索',
            },
        });
    }

    launch = () => {
        chrome.contextMenus.create({
            id: 'bilibili-searchBili',
            title: __('searchBili'),
            contexts: ['selection'],
            onclick: function(info) {
                chrome.runtime.sendMessage({
                    commend: 'setGAEvent',
                    action: 'click',
                    category: 'quickSearch',
                });
                createTab(`https://search.bilibili.com/all?keyword=${encodeURIComponent(info.selectionText)}`);
            },
        });
    };

    pause = () => {
        chrome.contextMenus.remove('bilibili-searchBili', null);
    };
}