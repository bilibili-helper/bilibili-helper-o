/**
 * Author: DrowsyFlesh
 * Create: 2019/3/1
 * Description:
 */
import Url from 'url-parse';

/**
 *
 * @param websitePort
 * @param url
 * @param options
 * @param sign
 * @param model
 * @return {Promise<Response | never>}
 */
export const fetchJSON = async (websitePort, {url, options, sign, model}) => {
    if (!model) throw(`fetch from Model ${model}`);
    const urlObject = new Url(url, true);
    return fetch(url, options)
    .then(response => response.json())
    .then(result => {
        websitePort.postMessage({
            commend: 'returnFetch',
            data: {...result, receipt: urlObject.query},
            from: 'helperProxy',
            model,
            sign,
        });
    });
};
