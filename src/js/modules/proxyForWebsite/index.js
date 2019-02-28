/**
 * Author: DrowsyFlesh
 * Create: 2019/2/28
 * Description:
 */
import {Feature} from 'Libs/feature';
import {fetchJSON, fetchImage} from './fetch';

export class ProxyForWebsite extends Feature {
    constructor() {
        super({
            name: 'proxyForWebsite',
            kind: 'other',
            settings: {
                on: true,
                hide: true,
                toggle: false,
            },
        });
    }

    addListener = () => {
        chrome.runtime.onConnect.addListener((port) => {
            port.onMessage.addListener((message, websitePort) => {
                const {commend, data} = message;
                switch (commend) {
                    case 'fetch': {
                        const {type, ...options} = data;
                        if (type === 'json') fetchJSON(websitePort, options);
                        else if (type === 'image') fetchImage(websitePort, options);
                        break;
                    }
                }
            });
        });
    };
}
