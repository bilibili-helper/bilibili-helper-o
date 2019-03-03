/**
 * Author: DrowsyFlesh
 * Create: 2019/2/28
 * Description:
 */
import {Feature} from 'Libs/feature';
import {fetchJSON, fetchImage, fetchPOST} from './fetch';
import {connect} from './connect';
import {cookie} from './cookie';

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
                    case 'connect': {
                        connect(websitePort, data);
                        break;
                    }
                    case 'fetch': {
                        const {type, ...options} = data;
                        if (type === 'json') void fetchJSON(websitePort, options);
                        else if (type === 'image') void fetchImage(websitePort, options);
                        else if (type === 'post') void fetchPOST(websitePort, options);
                        break;
                    }
                    case 'cookie': {
                        cookie(websitePort, data);
                        break;
                    }
                }
            });
        });
    };
}
