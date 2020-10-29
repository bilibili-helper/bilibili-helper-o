/**
 * Author: Ruo
 * Create: 2019-05-08
 * Description: 直播主播开播推送
 */
import _ from 'lodash';
import {Feature} from 'Libs/feature';
import {getURL, __, createNotification, fetchFromHelper} from 'Utils';
import apis from './apis';

export {LiveUpCheckUI} from './UI';

const intervalTime = 1;
const MAX_LIST_NUMBERS = 100;

export class LiveUpCheck extends Feature {
    constructor() {
        super({
            name: 'liveUpCheck',
            kind: 'popup',
            dependencies: ['language'],
            permissions: ['login', 'notifications'],
            settings: { // 指该feature的配置
                on: true, // 指feature是否执行launch function
                title: __('liveUpCheck_name'), // 在option页面中配置项目的显示名称
                type: 'checkbox', // 指该feature配置子选项的类型，此处为复选框
                description: __('liveUpCheck_description', [intervalTime]),
                hasUI: true,
                options: [ // 子选项
                    {
                        title: __('liveUpCheck_options_notification'),
                        key: 'notification',
                        on: true,
                    },
                    {
                        title: __('liveUpCheck_options_dynamicCheckBox'),
                        key: 'dynamicCheckBox',
                        on: true,
                        description: __('liveUpCheck_options_dynamicCheckBox_description', [MAX_LIST_NUMBERS]),
                    },
                ],
            },
        });
        this.hasLaunched = false;
        this.notifyList = {};
    }

    launch = () => {
        this.currentList = [];
        this.lastList = [];
        this.newCounter = 0;
        chrome.alarms.create('liveUpCheck', {periodInMinutes: intervalTime});
        this.initList();
        this.hasLaunched = true;
    };

    pause = () => {
        this.currentList = [];
        this.lastList = [];
        this.newCounter = 0;
        chrome.alarms.clear('liveUpCheck');
        this.hasLaunched = false;
    };

    addListener = () => {
        chrome.alarms.onAlarm.addListener((alarm) => {
            switch (alarm.name) {
                case 'liveUpCheck':
                    this.checkNew();
                    break;
            }
            return true;
        });
        chrome.notifications.onButtonClicked.addListener((notificationId, index) => {
            if (this.notifyList[notificationId] && index === 0) {
                chrome.notifications.clear(notificationId);
                chrome.tabs.create({url: this.notifyList[notificationId]});
                delete this.notifyList[notificationId];
            }
        });
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.command === 'getLiveUpperDynamicList') {
                sendResponse({feedList: this.currentList, newCounter: this.newCounter});
            } else if (message.command === 'updateLastLiveUpList') {
                this.newCounter = 0;
            }
            return true;
        });
    };

    permissionHandleLogin = (value) => {
        if (value) {
            !this.hasLaunched && this.launch();
        } else {
            this.pause();
        }
    };

    initList() {
        void this.getList(this.currentList || []);
    }

    checkNew() {
        this.getList(this.lastList).then(() => {
            const newList = this.getDifferent(this.currentList, this.lastList);
            if (this.newCounter > 0) {
                this.sendNotification(newList.slice(0, this.newCounter));
                this.currentList = newList;
            }
            this.lastList = [];
        });
    }

    getDifferent(current, last) {
        const newList = [];
        const oldList = [];
        let newCounter = 0;
        last.forEach(({uid: l}, index) => {
            let same = false;
            current.forEach(({uid: c}) => {
                if (l === c) {
                    same = true;
                }
            });
            if (!same) {
                newList.push(last[index]);
                newCounter += 1;
            } else {
                oldList.push(last[index]);
            }
        });
        this.newCounter = newCounter;
        return newList.concat(oldList);
    }

    // 检查未读推送
    getList(list, page = 1) {
        return fetchFromHelper(apis.getList + `?page=${page}&page_size=10`)
        .then(response => response.json())
        .then(({code, data: {rooms, count}, message}) => {
            if (code === 0) {
                list.splice(0, 0, ...rooms);
                if (list.length < count) {
                    return this.getList(list, page + 1);
                }
            } else {
                console.error(message);
            }
        });
    };

    createRoomLink = (roomId) => {
        return `https://live.bilibili.com/${roomId}`;
    };

    // 弹出推送通知窗口
    sendNotification = (newFeedList) => {
        const notificationState = _.find(this.settings.options, {key: 'notification'});
        notificationState && notificationState.on && _.map(newFeedList, ({room_id, uname, title, cover_from_user}) => {
            createNotification('bilibili-helper-live-up-check' + Math.random(), {
                type: 'basic',
                iconUrl: cover_from_user || getURL('/statics/imgs/cat.svg'),
                title: __('followingLiveUpdateMessage', [uname]),
                message: `${title}`,
                buttons: [{title: __('extensionNotificationWatch')}],
            }, (notificationId) => {
                this.notifyList[notificationId] = this.createRoomLink(room_id);
            });
        });
    };
};
