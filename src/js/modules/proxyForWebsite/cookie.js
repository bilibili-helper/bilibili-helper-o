/**
 * Author: DrowsyFlesh
 * Create: 2019/3/3
 * Description:
 */

export const cookie = async (websitePort, data) => {
    const {detail, model, sign} = data;
    if (!model) throw(`fetch from Model ${model}`);
    chrome.cookies.get(detail, (cookie) => {
        websitePort.postMessage({
            command: 'returnCookie',
            data: cookie.value,
            from: 'helperProxy',
            model,
            sign,
        });
    });
};
