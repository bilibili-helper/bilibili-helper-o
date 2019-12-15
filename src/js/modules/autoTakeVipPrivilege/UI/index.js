/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import React from 'react';
import {UI} from 'Libs/UI';

export class AutoTakeVipPrivilegeUI extends UI {
    constructor() {
        super({
            name: 'popup',
        });
    }

    load = () => {
        return new Promise(resolve => {
            const script = `
            `;
            const scriptDOM = document.createElement('script');
            scriptDOM.innerHTML = script;
            scriptDOM.setAttribute('type', 'text/javascript');
            document.appendChild(scriptDOM);
            resolve();
        });
    };
}

