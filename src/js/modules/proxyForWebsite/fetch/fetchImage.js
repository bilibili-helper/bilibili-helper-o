/**
 * Author: DrowsyFlesh
 * Create: 2019/3/1
 * Description:
 */

const arrayBufferToBase64 = (buffer) => {
    const bytes = [].slice.call(new Uint8Array(buffer));
    let binary = '';
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

const imageList = {};

/**
 *
 * @param websitePort
 * @param url
 * @param options
 * @param sign
 * @param model
 * @param mine
 * @return {Promise<void>}
 */
export const fetchImage = async (websitePort, {url, options, sign, model, mine}) => {
    let imageBase64String = '';
    if (imageList[sign]) imageBase64String = imageList[sign];
    else {
        imageBase64String = await fetch(url, options)
        .then(response => response)
        .then((response) => {
            return response.arrayBuffer().then(buffer => {
                return imageList[sign] = `data:${mine};base64,` + arrayBufferToBase64(buffer);
            });
        });
    }
    websitePort.postMessage({
        command: 'returnFetch',
        data: imageBase64String,
        from: 'helperProxy',
        model,
        sign,
    });
};
