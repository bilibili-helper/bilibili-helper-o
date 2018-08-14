/**
 * Author: Ruo
 * Create: 2018-06-12
 * Description:
 */

export default {
    'newWatchList': { // 跳转到新版我的关注页面
        on: true,
    },
    'dynamicCheck': { // 关注动态检查
        on: true,
    },
    'downloadType': { // 视频下载格式优先级设定
        on: true,
        type: [
            'flv',
            'mp4',
        ],
        value: 'flv',
    },
    'videoPlayerWidenType': { // 主站播放器宽屏类型
        on: true,
        type: [
            'wide', // 一般宽屏，隐藏弹幕侧边栏
            'web', // 网页全屏
            'full', // 屏幕全屏
        ],
        value: 'wide',
    },
    'videoPlayerAutoOffset': { // 主站播放器自动定位
        on: true,
    },
    'adBlocking': { // 广告屏蔽
        on: true,
    },
    'sign': { // 直播区自动签到
        on: true,
    },
    'treasure': { // 直播区自动领瓜子
        on: true,
    },
    'chatFilter': { // 直播区弹幕屏蔽
        on: true,
        values: {
            chatMsg: false, // 聊天内容
            gift: false, // 礼物赠送信息
            small: false, // 小型标志
            enterMsg: false, // 进场信息
            topicIcon: false, // 头衔成就
            mediaIcon: false, // 粉丝勋章
            userLevel: false, // 用户等级
            giftNPC: false, // 悬浮NPC（2233娘）
            announcement: false, // 系统公告
        },
    },
};
