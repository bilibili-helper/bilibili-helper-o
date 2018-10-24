import $ from 'jquery';

/**
 * Author: DrowsyFlesh
 * Create: 2018/10/24
 * Description:
 */

export const DoSign = {
    launch: (options) => {
        // getSignInfo https://api.live.bilibili.com/sign/GetSignInfo
        //console.log(options);
        options.on && $.ajax({method: 'get', url: 'https://api.live.bilibili.com/sign/doSign'});
    },
};