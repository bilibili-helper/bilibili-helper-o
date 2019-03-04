/**
 * Author: DrowsyFlesh
 * Create: 2019/3/3
 * Description:
 */
import {version} from 'Utils';

export const connect = (websitePort, {model, sign}) => {
    websitePort.postMessage({
        commend: 'returnApp',
        data: {
            code: 0,
            data: {
                connected: true,
                version,
            },
        },
        from: 'helperProxy',
        model,
        sign,
    });
};
