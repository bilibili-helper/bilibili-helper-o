/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */
import {UI} from 'Libs/UI';
import apis from '../apis';

export class AutoTakeVipPrivilegeUI extends UI {
    constructor() {
        super({
            name: 'popup',
        });
    }

    load = (containers, settings) => {
        if (!settings.on) {
            return Promise.resolve();
        }
        return new Promise(resolve => {
            chrome.runtime.sendMessage({command: 'checkVipPrivilegeStatus'}, (types) => {
                if (types && types.length) {
                    window.onmessage = (event) => {
                        if (event.data && event.data.command === 'receiveVIPPrivilegeSuccessfully') {
                            chrome.runtime.sendMessage({command: 'receiveVIPPrivilegeSuccessfully'});
                        }
                    };
                    chrome.runtime.sendMessage({
                        command: 'getCookie',
                        options: {
                            url: 'http://www.bilibili.com',
                            name: 'bili_jct',
                        },
                    }, (cookie) => {
                        const scriptDOM = document.createElement('script');
                        scriptDOM.setAttribute('type', 'text/javascript');
                        let script = `const fetchObjects = [];`;
                        types.forEach((type) => {
                            script += `
                            fetchObjects.push(fetch("${apis.receive}", {
                                method: 'post',
                                body: 'type=${type}&csrf=${cookie.value}&requestFrom=bilibili-helper',
                                credentials: 'include',
                                mode: 'cors',
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            })
                            .then(res => {
                                return Promise.resolve(res.code === 0);
                            }).catch(console.error));
                            `;
                        });
                        script += `
                        Promise.all(fetchObjects).then((res) => {
                            const resCounter = res.reduce((sum, result) => {
                                if (result) sum += 1;
                                return sum;
                            }, 0);
                            if (resCounter === ${types.length}) {
                                window.postMessage({command: 'receiveVIPPrivilegeSuccessfully'}, '*');
                            }
                        });
                        `;
                        scriptDOM.innerHTML = script;
                        document.body.appendChild(scriptDOM);
                        setTimeout(() => {
                            scriptDOM.remove();
                        }, 5000);
                    });
                }
            });
            resolve();
        });
    };
}

