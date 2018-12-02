/**
 * Author: DrowsyFlesh
 * Create: 2018/12/2
 * Description:
 */

export const BILIBILI_APIS = {
    doSign: {
        do: 'https://api.live.bilibili.com/sign/doSign',
    },
    treasure: {
        getCurrentTask: 'https://api.live.bilibili.com/lottery/v1/SilverBox/getCurrentTask',
        getCaptcha: 'https://api.live.bilibili.com/lottery/v1/SilverBox/getCaptcha',
        getAward: 'https://api.live.bilibili.com/lottery/v1/SilverBox/getAward',
    },
    danmu: {
        list: 'https://api.bilibili.com/x/v1/dm/list.so',
        historyList: 'https://api.bilibili.com/x/v2/dm/history',
        card: 'https://api.bilibili.com/x/web-interface/card',
    },
    checkVersion: {
        version: 'https://bilihelper.guguke.net/version.json',
    },
    silver2coin: 'https://api.live.bilibili.com/pay/v1/Exchange/silver2coin',
};
export const SOURCE_URL = {
    iconfont: 'https://at.alicdn.com/t/font_894803_vq3rs7jms9.css',
    bilibiliHelperGithub: 'https://github.com/zacyu/bilibili-helper',
    googleAnalytics: 'https://www.google-analytics.com/analytics.js',
};