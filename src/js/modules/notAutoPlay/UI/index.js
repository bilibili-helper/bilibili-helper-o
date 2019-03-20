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

    load = () => {
        return new Promise(resolve => {
            const body = document.querySelector('body');
            const script = document.createElement('script');
            script.innerText = `
                const n = setInterval(() => {
                    Array.from(document.querySelectorAll('.vc-video')).map((o) => {
                        if (o.getBoundingClientRect().top === 0) clearInterval(n);
                        o.getBoundingClientRect = () => ({top: 0});
                    });
                }, 1000);
            `;
            body.appendChild(script);
            resolve();
        });
    };
}
