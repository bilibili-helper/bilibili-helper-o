/**
 * Author: Ruo
 * Create: 2018-08-19
 * Description: 常量配置
 */
import {getOption} from 'Utils';


/**
 * 获取url
 * @param url_name
 * @return string
 */
export const getURL = (url_name) => {
    switch(url_name) {
        case 'video': return 'https://www.bilibili.com/';
        case 'live': return 'https://live.bilibili.com/';
        case 'option': return chrome.extension.getURL('options.html');
        case 'dynamic': return getOption('newWatchPage') ? 'https://t.bilibili.com/' : 'https://www.bilibili.com/account/dynamic';
        case 'favourite': return 'https://space.bilibili.com/';
    }
};

// 默认功能呢配置
export const defaultOptions = {
    'newWatchPage': { // 跳转到新版我的关注页面
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
        types: [
            {key: 'chatMsg', name: '聊天内容'}, // 聊天内容
            {key: 'gift', name: '礼物信息'}, // 礼物信息
            {key: 'small', name: '小型标志'}, // 小型标志
            {key: 'enterMsg', name: '进场信息'}, // 进场信息
            {key: 'topicIcon', name: '头衔成就'}, // 头衔成就
            {key: 'mediaIcon', name: '粉丝勋章'}, // 粉丝勋章
            {key: 'userLevel', name: '用户等级'}, // 用户等级
            {key: 'giftNPC', name: '2233娘'}, // 悬浮NPC（2233娘）
            {key: 'announcement', name: '系统公告'}, // 系统公告
        ],
        value: {
            chatMsg: false,
            gift: false,
            small: false,
            enterMsg: false,
            topicIcon: false,
            mediaIcon: false,
            userLevel: false,
            giftNPC: false,
            announcement: false,
        },
    },
};
