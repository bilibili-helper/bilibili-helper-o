/**
 * Author: DrowsyFlesh
 * Create: 2019/3/1
 * Description:
 */

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
    return fetch(url, options)
    .then(response => response.json())
    .then(result => {
        websitePort.postMessage({
            commend: 'returnFetch',
            data: result,
            from: 'helperProxy',
            model,
            sign,
        });
    });
};
