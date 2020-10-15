/**
 * Author: DrowsyFlesh
 * Create: 2020/1/4
 * Description:
 */
import {UI} from 'Libs/UI';

export class LiveReplayDownloadUI extends UI {
    constructor() {
        super({
            name: 'liveReplayDownload',
        });
    }

    createBtns = () => {
        this.interval('.left-container .live-record-list-cntr, .live-record-list .live-record-list-cntr', 1000).then((list) => {
            Array.from(list.querySelectorAll('.card')).forEach((card) => {
                const href = card.querySelector('a').href;
                if (href) {
                    const dom = document.createElement('div');
                    dom.classList.add('record-download');
                    dom.setAttribute('style', 'display:flex;flex-wrap:wrap;margin-top:6px;');
                    const res = href.match(/live.bilibili.com\/record\/(.+)/);
                    if (res) {
                        const title = card.querySelector('.record-title').textContent;
                        const button = document.createElement('button');
                        button.innerText = '点击获取下载数据';
                        button.setAttribute('style', 'width:100%;height:30px;border-radius:4px;border-color:#eef1f5;color:#333;cursor:pointer;font-size:12px;border-style:none;')
                        button.addEventListener('click', () => {
                            chrome.runtime.sendMessage({
                                command: 'setGAEvent',
                                action: 'click',
                                category: 'Live record download',
                                label: 'Live record download',
                            });
                            button.innerText = '数据获取中';
                            chrome.runtime.sendMessage({
                                command: 'getLiveRecord',
                                rid: res[1],
                                title,
                            }, (res) => {
                                if (res) {
                                    button.remove();
                                    res.list.forEach((fragment, index) => {
                                        const fragmentBtn = document.createElement('a');
                                        fragmentBtn.setAttribute('style', `display:inline-block;min-width:20px;font-size:12px;padding:6px;border:1px solid #eee;border-radius:4px;color:#7a7a7b;flex-shrink:0;margin-right:${Number.isInteger((index + 1)/5) ? 0 : 9}px;margin-bottom:9px;text-align:center;`);
                                        fragmentBtn.setAttribute('download', '');
                                        fragmentBtn.setAttribute('target', '__blank');
                                        fragmentBtn.setAttribute('referrerPolicy', 'unsafe-url');
                                        fragmentBtn.href = fragment.url;
                                        fragmentBtn.innerText = `${index + 1}`;
                                        dom.appendChild(fragmentBtn);
                                    });
                                } else {
                                    button.innerText = '数据获取失败';
                                }
                            });
                        });
                        Array.from(card.querySelectorAll('.record-download')).forEach((d) => d.remove());
                        card.appendChild(dom);
                        dom.appendChild(button);
                    }
                }
            });
        });
    }

    load = (containers, settings) => {
        return new Promise(resolve => {
            if (!settings.on) {
                return resolve();
            }
            this.interval('#sections-vm .room-feed .tabs, #section-ctnr .room-feed .tabs', 1000).then((container) => {
                if (!container) {
                    return;
                }
                new MutationObserver((mutationList) => {
                    let same = false;
                    mutationList.forEach((mutation) => {
                        if (mutation.target.textContent === '直播回放'&& !same) {
                            same = true;
                            this.createBtns();
                        }
                    });
                }).observe(container, {
                    attributes: true,
                    subtree: true,
                });
            });

        });
    };
}
