/**
 * Author: DrowsyFlesh
 * Create: 2019/3/2
 * Description:
 */
export const fetchPOST = async (websitePort, {url, options, sign, model}) => {
    if (!model) throw(`fetch from Model ${model}`);
    const {body, ...rest} = options;
    const formData = new FormData();
    for (let name in body) formData.append(name, body[name]);
    options.body = formData;
    rest.body = formData;
    return fetch(url, rest)
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
