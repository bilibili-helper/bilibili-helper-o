/**
 * Author: DrowsyFlesh
 * Create: 2019/3/1
 * Description:
 */
import Url from 'url-parse';
import {fetchFromHelper} from 'Utils/functions';

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
    return fetchFromHelper(url, options)
    .then(response => response.json())
    .then(result => {
        websitePort.postMessage({
            command: 'returnFetch',
            data: {...result, receipt: urlObject.query},
            from: 'helperProxy',
            model,
            sign,
        });
    });
};
