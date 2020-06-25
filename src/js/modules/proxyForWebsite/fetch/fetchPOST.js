import _ from 'lodash';
import {fetchFromHelper} from 'Utils/functions';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/2
 * Description:
 */

chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    const {tabId, initiator, requestHeaders, url} = details;
    const fromHelper = !_.isEmpty(_.find(requestHeaders, ({name, value}) => name === 'From' && value === 'bilibili-helper'));
    if ((/^chrome-extension:\/\//.test(initiator) || fromHelper) && url.match('/reply/add')) {
        const originHeader = requestHeaders.find((h) => h.name.toLowerCase() === 'origin');
        if (originHeader) {
            originHeader.value = 'https://h.bilibili.com';
        } else {
            requestHeaders.push({
                name: 'Origin',
                value: 'https://h.bilibili.com',
            });
        }
        console.log(requestHeaders);
        return {requestHeaders};
    }
}, {
    urls: [
        'https://api.bilibili.com/x/v2/reply/add?*',
    ],
}, ['blocking', 'requestHeaders', 'extraHeaders']);
export const fetchPOST = async (websitePort, {url, options, sign, model}) => {
    if (!model) throw(`fetch from Model ${model}`);
    const {body, ...rest} = options;
    const formData = new FormData();
    for (let name in body) formData.append(name, body[name]);
    options.body = formData;
    rest.body = formData;
    return fetchFromHelper(url, rest)
    .then(response => response.json())
    .then(result => {
        websitePort.postMessage({
            command: 'returnFetch',
            data: {...result, receipt: body},
            from: 'helperProxy',
            model,
            sign,
        });
    });
};
