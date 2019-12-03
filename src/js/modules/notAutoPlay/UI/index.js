/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import {UI} from 'Libs/UI';

export class NotAutoPlayUI extends UI {
    constructor() {
        super({
            name: 'notAutoPlay',
        });
    }

    load = (containers, settings) => {
        if (!settings.on) return Promise.resolve();
        return new Promise(resolve => {
            const body = document.querySelector('body');
            const script = document.createElement('script');
            script.innerHTML = `
                const bilibiliNotAutoPlayInterval = setInterval(() => {
                    Array.from(document.querySelectorAll('.vc-video')).map((o) => {
                        if (o.getBoundingClientRect().top === 0) return;
                        o.getBoundingClientRect = () => ({top: 0});
                    });
                }, 1000);
            `;
            body.appendChild(script);
            resolve();
        });
    };
}
