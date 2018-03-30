/* eslint-disable */
/* global $, store */
/* TODO(zacyu): Fix 214 errors according to eslint rules. */

/**
 * Created by Ruo on 4/12/2016.
 */
(() => {
    if (location.hostname === 'live.bilibili.com' && location.pathname !== '/') {
        if (!store.enabled) {
            return;
        }
        store.delete = (key, value) => {
            if (key === undefined) {
                return;
            }
            let o = store.get(key);
            if (o === undefined) {
                return;
            }
            if (value !== undefined && value !== null) {
                if (typeof value === 'string' || typeof value === 'number') {
                    o[value] && delete o[value];
                    store.set(key, o);
                }
            } else {
                store.remove(key);
            }
        };
        let Live = {scriptOptions: {}, hasInit: false, giftList: {}, protocol: location.protocol};
        Live.addScriptByFile = (fileName, options) => {
            let a = document.createElement('script');
            a.id = 'bilibiliHelperScript';
            a.src = chrome.extension.getURL(fileName);
            typeof options === 'object' && a.setAttribute('options', JSON.stringify(options));
            document.body.appendChild(a);
        };
        Live.addScriptByText = (text) => {
            let a = document.createElement('script');
            a.innerHTML = text;
            document.body.appendChild(a);
        };
        Live.getDateDiff = (startDate, endDate) => {
            let startTime = new Date(Date.parse(startDate.replace(/-/g, '/'))).getTime();
            let endTime = new Date(Date.parse(endDate.replace(/-/g, '/'))).getTime();
            let dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
            return dates;
        };
        Live.getRoomHTML = (url) => {
            return $.get('//live.bilibili.com/' + url).promise();
        };
        Live.getRoomIdByUrl = (url, callback) => (parseInt(/^\/([\d]+)/.exec(location.pathname)[1], 10));
        Live.getUser = () => {
            return $.getJSON('//live.bilibili.com/user/getuserinfo').promise();
        };
        Live.eval = (fn) => {
            let Fn = Function;
            return new Fn('return ' + fn)();
        };
        Live.scrollEvent = _.throttle(function (ev) {
            var $this = $(ev.currentTarget),
                scrollTop = $this.scrollTop(),
                scrollLeft = $this.scrollLeft(),
                scrollWidth = $this[0].scrollWidth,
                scrollHeight = $this[0].scrollHeight,
                width = $this.innerWidth(),
                height = $this.innerHeight(),
                deltaY = (ev.type == 'DOMMouseScroll' ? ev.originalEvent.detail * -40 : ev.originalEvent.wheelDeltaY),
                deltaX = (ev.type == 'DOMMouseScroll' ? ev.originalEvent.detail * -40 : ev.originalEvent.wheelDeltaX);
            var prevent = function () {
                ev.stopPropagation();
                ev.preventDefault();
                ev.returnValue = false;
                return false;
            };
            const x = Math.abs(deltaX);
            const y = Math.abs(deltaY);
            if (y > x) {
                if (deltaY <= 0 && -deltaY > scrollHeight - height - scrollTop) {
                    // Scrolling down, but this will take us past the bottom.
                    $this.scrollTop(scrollHeight);
                    return prevent();
                } else if (deltaY > 0 && deltaY > scrollTop) {
                    // Scrolling up, but this will take us past the top.
                    $this.scrollTop(0);
                    return prevent();
                }
            } else if (y < x) {
                if (deltaX > 0 && deltaX > scrollLeft) {
                    $this.scrollLeft(0);
                    return prevent();
                } else if (deltaX < 0 && -deltaX > scrollWidth - width - scrollLeft) {
                    $this.scrollLeft(scrollWidth);
                    return prevent();
                }
            }
        }, 60);
        Live.each = (obj, fn) => {
            if (!fn) {
                return;
            }
            if (obj instanceof Array) {
                let i = 0,
                    len = obj.length;
                for (; i < len; i++) {
                    if (fn.call(obj[i], i) === false) {
                        break;
                    }
                }
            } else if (typeof obj === 'object') {
                let j = null;
                for (j in obj) {
                    if (fn.call(obj[j], j) === false) {
                        break;
                    }
                }
            }
        };
        Live.getCookie = (name) => {
            let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            } else {
                return null;
            }
        };
        Live.setCookie = (name, value, seconds) => {
            seconds = seconds || 0;
            let expires = '';
            if (seconds != 0) {
                let date = new Date();
                date.setTime(date.getTime() + (seconds * 1000));
                expires = '; expires=' + date.toGMTString();
            }
            document.cookie = name + '=' + escape(value) + expires + '; path=/';
        };
        Live.liveQuickLogin = () => {
            if (!Live.getCookie('DedeUserID') && !Live.getCookie('LIVE_LOGIN_DATA')) {
                try {
                    if (!window.biliQuickLogin) {
                        $.getScript('https://static-s.bilibili.com/account/bili_quick_login.js', (response, status) => {
                            status === 'success' && login();
                        });
                    } else {
                        login();
                    }
                } catch (tryErr) {
                    throw new Error(tryErr);
                }
            }

            function login() {
                if (window.biliQuickLogin) {
                    window.biliQuickLogin(() => {
                        window.location.reload();
                    });
                    throw 'Bilibili Live: 您没登陆，想干撒子？~~ -_-';
                } else {
                    throw 'Bilibili Live: 快速登录脚本未正确载入.';
                }
            }
        };
        Live.getRoomId = () => {
            return store.get('bilibili_helper_live_roomId')[Live.getRoomIdByUrl()];
        };
        Live.getRoomInfo = () => {
            return $.getJSON('//api.live.bilibili.com/room/v1/Room/room_init?id=' + Live.roomId).promise();
        };
        Live.getAnchorInRoom = () => {
            return $.getJSON('//api.live.bilibili.com/live_user/v1/UserInfo/get_anchor_in_room?roomid=' + Live.roomId).promise();
        };
        Live.numFormat = (num) => {
            let number = num;
            if (num >= 10000) {
                number = (num / 10000).toFixed(1) + '万';
            }
            return number;
        };
        Live.rgb2hex = (rgb) => {
            function zero_fill_hex(num, digits) {
                let s = num.toString(16);
                while (s.length < digits) {
                    s = '0' + s;
                }
                return s;
            }

            if (rgb.charAt(0) === '#') {
                return rgb;
            }
            let ds = rgb.split(/\D+/);
            let decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
            return '#' + zero_fill_hex(decimal, 6);
        };
        Live.getDomType = (t) => {
            let e = Object.prototype.toString.call(t),
                n = /HTML.*.Element/;
            return '[object Object]' === e && t.jquery ? 'jQuery Object' : '[object Object]' === e ? 'Object' : '[object Number]' === e ? 'Number' : '[object String]' === e ? 'String' : '[object Array]' === e ? 'Array' : '[object Boolean]' === e ? 'Boolean' : '[object Function]' === e ? 'Function' : '[object Null]' === e ? 'null' : '[object Undefined]' === e ? 'undefined' : e.match(n) ? 'HTML Element' : '[object HTMLCollection]' === e ? 'HTML Elements Collection' : null;
        };
        Live.randomEmoji = {
            list: {
                happy: ['(｀･ω･´)', '=‿=✧', '●ω●', '(/ ▽ \\)', '(=・ω・=)', '(●\'◡\'●)ﾉ♥', '<(▰˘◡˘▰)>', '(⁄ ⁄•⁄ω⁄•⁄ ⁄)', '(ง,,• ᴗ •,,)ง ✧'],
                shock: [',,Ծ‸Ծ,,', '(｀･д･´)', 'Σ( ° △ °|||)︴', '┌( ಠ_ಠ)┘', '(ﾟДﾟ≡ﾟдﾟ)!?'],
                sad: ['∑(っ °Д °;)っ', '＞︿＜', '＞△＜', '●︿●', '(´；ω；`)'],
                helpless: ['◐▽◑', 'ʅ（´◔౪◔）ʃ', '_(:3 」∠)_', '_(┐「ε:)_', '(/・ω・＼)', '(°▽°)ﾉ']
            },
            happy: () => {
                return Live.randomEmoji.list.happy[Math.floor(Math.random() * Live.randomEmoji.list.happy.length)];
            },
            sad: () => {
                return Live.randomEmoji.list.sad[Math.floor(Math.random() * Live.randomEmoji.list.sad.length)];
            },
            shock: () => {
                return Live.randomEmoji.list.shock[Math.floor(Math.random() * Live.randomEmoji.list.shock.length)];
            },
            helpless: () => {
                return Live.randomEmoji.list.helpless[Math.floor(Math.random() * Live.randomEmoji.list.helpless.length)];
            }
        };
        Live.countdown = class countdown {
            constructor(param) {
                let dateNow = new Date(),
                    endTime = param.endTime;

                if (!endTime || !(endTime instanceof Date) || endTime.getTime() <= dateNow.getTime()) {
                    console.error('倒计时时间设置错误');
                    return;
                }

                // Definition: 倒计时定义.
                var interval = setInterval(() => {
                    let ms = endTime.getTime() - dateNow.getTime(); // 倒计时剩余总时间: 毫秒.
                    let mm = Math.floor(ms / 60 / 1000); // 倒计时剩余总时间: 分钟.
                    let s = ms - (mm * 60 * 1000); // 倒计时秒数零头毫秒数: 总毫秒时间 - 总分钟取整时间
                    let ss = Math.floor(s / 1000); // 倒计时秒数零头秒数.
                    mm = mm < 10 ? '0' + mm : mm;
                    ss = ss < 10 ? '0' + ss : ss;

                    // Action: 在 HTML 中写入时间.
                    let outputTime = mm + ':' + ss;
                    if (Live.getDomType(param.element) === 'jQuery Object') {
                        param.element.html(outputTime);
                    } else {
                        param.element.innerHTML = outputTime;
                    }

                    // Action: 倒计时结束.
                    if (mm === '00' && ss === '00') {
                        clearInterval(interval);
                        param.callback && param.callback();
                        return;
                    }

                    endTime.setSeconds(endTime.getSeconds() - 1);
                }, 1000);
                this.countDown = interval;
                this.clearCountdown = () => {
                    clearInterval(this.countDown);
                };
            }
        };
        Live.console = {
            option: {
                display: {
                    'danmu': false,
                    'tv_end': false,
                    'gift': false,
                    'system': false,
                    'tv': false,
                    'sys_gift': true
                }
            },
            watcher: (msg) => {
                console.warn('%c监控:' + msg, 'color:#FFFFFF;background-color:#4fc1e9;padding:5px;border-radius:7px;line-height:30px;');
            },
            info: (type, json) => {
                if (type === 'danmu' && Live.console.option.display['danmu']) {
                    let danmu = json.info[1];
                    let userId = json.info[2][0];
                    let username = json.info[2][1];
                    let userUL = json.info[4][0];
                    let userULRank = json.info[4][1];
                    console.warn('%c(UL:' + userUL + ')' + userId + '-' + username + ':' + danmu + ' 排名:' + userULRank, 'color:#FFFFFF;background-color:#646c7a;padding:5px;border-radius:7px;line-height:30px;');
                } else if (type === 'system' && Live.console.option.display['system']) {
                    // var a = {
                    //     cmd: "SYS_MSG",
                    //     msg: "【磨茶先生】在直播间【44515】赠送 小电视一个，请前往抽奖",
                    //     rep: 1,
                    //     styleType: 2,
                    //     url: "http://live.bilibili.com/44515"
                    // };
                    let msg = json.msg;
                    let url = json.url;
                    console.warn('%c系统通告:' + msg + ' 地址:' + url, 'color:#FFFFFF;background-color:#e74e8f;padding:5px;border-radius:7px;line-height:30px;');
                } else if (type === 'tv_end' && Live.console.option.display['tv_end']) {
                    // var a = {
                    //     "cmd": "TV_END",
                    //     "data": {
                    //         "id": 5467,
                    //         "sname": "机智的聪明蛋",
                    //         "uname": "私生恋人Li"
                    //     },
                    //     "roomid": "20105"
                    // };
                    // console.warn(json);
                } else if (type === 'gift' && Live.console.option.display['gift']) {
                    // var a = {
                    //     "cmd": "SEND_GIFT",
                    //     "data": {
                    //         "giftName": "辣条",
                    //         "num": 11,
                    //         "uname": "墨颜曦",
                    //         "rcost": 26870158,
                    //         "uid": 7915142,
                    //         "top_list": [],
                    //         "timestamp": 1468160121,
                    //         "giftId": 1,
                    //         "giftType": 0,
                    //         "action": "喂食",
                    //         "super": 0,
                    //         "price": 100,
                    //         "rnd": "1468156041",
                    //         "newMedal": 0,
                    //         "medal": 1,
                    //         "capsule": []
                    //     },
                    //     "roomid": 1029
                    // };
                    let gift = json.data['giftName'];
                    let count = json.data['num'];
                    let uname = json.data['uname'];
                    console.warn('%c喂食:' + gift + ' x' + count + ' 用户名:' + uname, 'color:#FFFFFF;background-color:#ff8e29;padding:5px;border-radius:7px;line-height:30px;');
                } else if (type === 'sys_gift' && Live.console.option.display['sys_gift']) {
                    // var a = {
                    //     "cmd": "SYS_GIFT",
                    //     "msg": "正義の此方:? 在Hoshilily的:?直播间81688:?内赠送:?36:?共100个，触发1次刨冰雨抽奖，快去前往抽奖吧！",
                    //     "tips": "【正義の此方】在直播间【81688】内 赠送 刨冰共 100 个，触发 1 次刨冰雨抽奖，快去前往抽奖吧！",
                    //     "rep": 1,
                    //     "msgTips": 1,
                    //     "url": "http://live.bilibili.com/81688",
                    //     "roomid": 81688,
                    //     "rnd": "1468493403"
                    // };
                    console.warn('%c系统通告:' + json.tips + ' 地址:' + json.url, 'color:#FFFFFF;background-color:#e74e8f;padding:5px;border-radius:7px;line-height:30px;');
                }
            }
        };
        Live.createPanel = (parentDOM, toggleDom, eventName, className, id, callback) => {
            let openEvent, closeEvent;
            switch (eventName) {
                case 'click':
                    openEvent = eventName;
                    closeEvent = eventName;
                    break;
                case 'mouseenter':
                case 'hover':
                case 'mouseover':
                    openEvent = 'mouseenter';
                    closeEvent = 'mouseleave';
                    break;
            }
            let panel = $('<div />').addClass('live-hover-panel arrow-top ' + className).attr('id', id);
            parentDOM.append(toggleDom, panel);
            toggleDom.off(openEvent).on(openEvent, (t) => {
                t.stopPropagation();
                $(window).click();
                if (panel.hasClass('show')) {
                    typeof $(window)[closeEvent] === 'function' && $(window)[closeEvent]();
                    return;
                }
                panel.addClass('show');

                function n(t) {
                    t.stopPropagation();
                    let e = t && (t.target || t.srcElement);
                    if (!$(e).hasClass(className) && !$(e).parents('.' + className).length) {
                        panel.addClass('out');
                        setTimeout(() => {
                            $(window).off(openEvent, n);
                            panel.removeClass('out').removeClass('show').css('display', '');
                        }, 300);
                    }
                }

                setTimeout(() => {
                    $(window).off(closeEvent).on(closeEvent, n);
                }, 1);
                if (typeof callback === 'function') {
                    callback();
                }
            });
            return panel;
        };
        Live.liveToast = function r(t, e, n, r) {
            'boolean' == typeof n && (n = 'info');
            var o = document.createDocumentFragment()
                , a = document.createElement('div');
            if ('success' !== (n = n || 'info') && 'caution' !== n && 'error' !== n && 'info' !== n)
                throw new Error(i + ' 在使用 Link Toast 时必须指定正确的类型: success || caution || error || info');
            if (a.innerHTML = '<span class="toast-text">' + e + '</span>',
                    a.className = 'link-toast ' + n + ' ' + (r ? 'fixed' : ''),
                !t.className && !t.attributes)
                throw new Error(i + ' 传入 element 不是有效节点.');
            var c = t.getBoundingClientRect()
                , s = c.left
                , u = c.top
                , l = c.width
                , f = c.height
                , p = document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft;
            a.style.left = s + l + p + 'px';
            var d = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
            a.style.top = u + f + d + 'px',
                setTimeout((function () {
                        a.className += ' out',
                            setTimeout((function () {
                                    a.parentNode.removeChild(a);
                                }
                            ), 350);
                    }
                ), 4e3),
                o.appendChild(a),
                document.body.appendChild(o);
            var h = document.body.offsetWidth
                , v = a.getBoundingClientRect().left
                , m = a.offsetWidth;
            h - m - v < 0 && (a.style.left = h - m - 10 + p + 'px');
        };
        Live.doSign = {
            getSignInfo: () => {
                return $.getJSON('//live.bilibili.com/sign/GetSignInfo').promise();
            },
            init: () => {
                chrome.runtime.sendMessage({
                    command: 'getOption',
                    key: 'doSign'
                }, (response) => {
                    if (response['value'] === 'on') {
                        let username = store.get('bilibili_helper_userInfo')['username'];
                        let o;
                        (o = {})[username] = {today: false, date: undefined};
                        store.set('bilibili_helper_doSign', o);
                        Live.doSign.getSignInfo().done((data) => {
                            if (data.code === 0 && data.data.status === 0) {
                                Live.doSign.sign();
                                // $('.sign-up-btn').click();
                                setInterval(Live.doSign.sign, 60000); // doSign per 1 min
                            } else if (data.code === 0 && data.data.status === 1) {
                                let username = store.get('bilibili_helper_userInfo')['username'];
                                let o;
                                (o = store.get('bilibili_helper_doSign'))[username] = {
                                    today: true,
                                    date: new Date().getDate()
                                };
                                store.set('bilibili_helper_doSign', o);
                            }
                        });
                    }
                });
            },
            sign: () => {
                /* check login*/

                let date = new Date().getDate();
                let username = store.get('bilibili_helper_userInfo')['username'];
                if (!store.get('bilibili_helper_doSign')[username].today || store.get('bilibili_helper_doSign')[username].date != date) {
                    $.get('/sign/doSign', (data) => {
                        console.log(data);
                        let e = data, msg;
                        //    {
                        //    "code": 0,
                        //    "msg": "ok",
                        //    "data": {
                        //        "text": "200\u94f6\u74dc\u5b50,3000\u7528\u6237\u7ecf\u9a8c\u503c",
                        //        "lottery": {"status": false, "lottery": {"id": "", "data": ""}},
                        //        "allDays": "30",
                        //        "hadSignDays": 22,
                        //        "remindDays": 8
                        //    }
                        // };
                        if (e.code === 0) {
                            // noinspection JSDuplicatedDeclaration
                            msg = new Notification('签到成功', {
                                body: '您获得了' + e.data.text,
                                icon: '//static.hdslb.com/live-static/images/7.png'
                            });
                            var o;
                            (o = store.get('bilibili_helper_doSign'))[username] = {today: true, date: date};
                            store.set('bilibili_helper_doSign', o);
                            setTimeout(() => {
                                msg.close();
                            }, 10000);
                            let spans = $('.body-container').find('.room-left-sidebar .sign-and-mission .sign-up-btn .dp-inline-block span');
                            $(spans[0]).hide(), $(spans[1]).show();
                        } else if (e.code === -500) {
                            msg = new Notification(e.msg, {
                                body: '不能重复签到',
                                icon: '//static.hdslb.com/live-static/live-room/images/gift-section/gift-1.gif'
                            });
                            var o;
                            (o = store.get('bilibili_helper_doSign'))[username] = {today: true, date: date};
                            store.set('bilibili_helper_doSign', o);
                            setTimeout(() => {
                                msg.close();
                            }, 10000);
                        } else {
                            msg = new Notification(e.msg, {
                                body: '',
                                icon: '//static.hdslb.com/live-static/live-room/images/gift-section/gift-1.gif'
                            });
                            setTimeout(() => {
                                msg.close();
                            }, 10000);
                        }
                    });
                }
            }
        };
        Live.currentRoom = [];
        Live.treasure = {
            imgInit: false,
            timer: 0,
            stop: false,
            silverSum: 0,
            correctStr: {
                'g': 9,
                'z': 2,
                '_': 4,
                'Z': 2,
                'o': 0,
                'l': 1,
                'B': 8,
                'O': 0,
                'S': 6,
                's': 6,
                'i': 1,
                'I': 1
            },
            silverSeed: false, // current silver
            allowCtrl: false,
            status: 'waiting', // current treasure status: "waiting" || "acquirable"
            finished: false,
            boxHidden: false,
            panelHidden: true,
            panelOut: false,
            page: 1, // treasure animate status
            countdown: null, // countdown object
            taskInfo: {
                startTime: '',
                endTime: '',
                minute: '',
                award: ''
            },
            captcha: {
                src: '',
                userInput: '',
                question: '',
                answer: '',
                refresh: () => {
                    Live.treasure.getCaptcha((base64Text) => {
                        Live.treasure.captcha.src = base64Text;
                        Live.treasure.captchaBoxImg.attr('src', base64Text);
                    });
                    Live.treasure.captchaBoxInput.val('');
                }
            },
            awardBtn: {
                text: '领取',
                bk: '',
                interval: null,
                awarding: () => {
                    Live.treasure.awardBtn.bk = Live.treasure.awardBtn.text;
                    Live.treasure.awardBtn.text = '领取中.';
                    let btn = Live.treasure.treasureCtrl.find('.acquiring-panel .get-award-btn');
                    btn.text(Live.treasure.awardBtn.text);
                    Live.treasure.awardBtn.interval = setInterval(() => {
                        if (Live.treasure.awardBtn.text.indexOf('...') > -1) {
                            Live.treasure.awardBtn.text = '领取中';
                            btn.text(Live.treasure.awardBtn.text);
                            return;
                        }
                        Live.treasure.awardBtn.text += '.';
                        btn.text(Live.treasure.awardBtn.text);
                    }, 500);
                },
                restore: () => {
                    clearInterval(Live.treasure.awardBtn.interval);
                    Live.treasure.awardBtn.text = Live.treasure.awardBtn.bk;
                }
            },
            waitingEmoji: Live.randomEmoji.happy(),
            panelEmoji: Live.randomEmoji.helpless(),
            init: () => {
                chrome.runtime.sendMessage({
                    command: 'getOption',
                    key: 'autoTreasure'
                }, (res) => {
                    if (res['value'] === 'on') {
                        setTimeout(() => {
                            Live.scriptOptions['treasure'] = true;
                            // chrome.runtime.sendMessage({
                            //     command: 'getTreasure'
                            // }, (response) => {

                            // let msg = new Notification('辅助领瓜子功能已经启动', {
                            //     body: '房间号:' + Live.roomInfo.short_id || Live.roomInfo.room_id,
                            //     icon: '//static.hdslb.com/live-static/images/7.png',
                            // });
                            //
                            // setTimeout(() =>{
                            //     msg.close();
                            // }, 10000);
                            Live.treasure.silverSum = store.get('bilibili_helper_treasure_silver_count');

                            // init dom
                            Live.treasure.originCtrl = $('#gift-control-vm .treasure-box');
                            Live.treasure.treasureCtrl = Live.treasure.originCtrl.clone();
                            Live.treasure.originCtrl.hide();
                            Live.treasure.treasureCtrl.attr('id', 'helperTreasurePlanel');
                            $('#gift-control-vm .treasure-box').attr('id', 'originTreasurePlanel').after(Live.treasure.treasureCtrl);
                            Live.treasure.statusText = Live.treasure.treasureCtrl.find('.status-text');
                            Live.treasure.infoSection = Live.treasure.treasureCtrl.find('.info-section');
                            Live.treasure.boxSide = Live.treasure.treasureCtrl.find('.box-slide');

                            //新版瓜子宝箱用于填写验证码的div
                            Live.treasure.captchaBox = $('<div/>').addClass('captcha-widget').hide();
                            Live.treasure.captchaBoxTitle = $('<div>宝箱时间到，输入验证码领取奖励 ●ω●</div>').addClass('status-text t-no-wrap');
                            Live.treasure.captchaBoxForm = $('<form/>').addClass('treasure-box-captcha-form');
                            Live.treasure.captchaBoxInputCtl = $('<div/>').addClass('input-ctnr');
                            Live.treasure.captchaBoxInput = $('<input/>').addClass('link-input dp-i-block v-middle');
                            Live.treasure.captchaBoxImg = $('<img/>').addClass('captcha-img dp-i-block v-middle');
                            Live.treasure.captchaBoxRefreshButton = $('<button/>').addClass('refresh-captcha dp-i-block v-middle pointer').append('<i class="icon icon-font icon-replace"></i>');
                            Live.treasure.captchaBoxSubmitButtonBox = $('<div/>').addClass('submit-btn');
                            Live.treasure.captchaBoxSubmitButton = $('<button/>').addClass('bl-button bl-button--primary bl-button--size').append('<span data-v-d19d45c0="" class="txt">领取</span>');
                            Live.treasure.captchaBoxInputCtl.append(
                                Live.treasure.captchaBoxInput,
                                Live.treasure.captchaBoxImg,
                                Live.treasure.captchaBoxRefreshButton
                            );
                            Live.treasure.getCaptcha((base64Text) => {
                                Live.treasure.captchaBoxImg.attr('src', base64Text);
                            });
                            Live.treasure.captchaBoxSubmitButtonBox.append(Live.treasure.captchaBoxSubmitButton);
                            Live.treasure.captchaBoxForm.append(
                                Live.treasure.captchaBoxInputCtl,
                                Live.treasure.captchaBoxSubmitButtonBox
                            ).attr('name', 'treasure-box-captcha-form');
                            Live.treasure.captchaBox.append(
                                Live.treasure.captchaBoxTitle,
                                Live.treasure.captchaBoxForm
                            );
                            Live.treasure.statusText.after(Live.treasure.captchaBox);
                            // init canvas
                            Live.treasure.canvas = document.createElement('canvas');
                            Live.treasure.canvas.width = 120;
                            Live.treasure.canvas.height = 40;
                            document.body.appendChild(Live.treasure.canvas);
                            Live.treasure.context = Live.treasure.canvas.getContext('2d');
                            Live.treasure.context.font = '40px agencyfbbold';
                            Live.treasure.context.textBaseline = 'top';
                            if (!window.OCRAD) {
                                let d = document.createElement('script');
                                d.src = chrome.extension.getURL('ocrad.min.js');
                                document.body.appendChild(d);
                            }
                            // init dom event
                            Live.treasure.infoSection.find('.slide-btn.right').show().on('click', () => {
                                if (Live.treasure.page < Live.treasure.taskInfo.max_times) {
                                    Live.treasure.page += 1;
                                    Live.treasure.setInfoSectionPage(Live.treasure.page, Live.treasure.taskInfo.max_times);
                                }
                            });
                            Live.treasure.infoSection.find('.slide-btn.left').show().on('click', () => {
                                if (Live.treasure.page > 1) {
                                    Live.treasure.page -= 1;
                                    Live.treasure.setInfoSectionPage(Live.treasure.page, Live.treasure.taskInfo.max_times);
                                }
                            });

                            Live.treasure.captchaBoxImg.on('load', () => {
                                Live.treasure.context.clearRect(0, 0, Live.treasure.canvas.width, Live.treasure.canvas.height);
                                Live.treasure.context.drawImage(Live.treasure.captchaBoxImg[0], 0, 0);
                                Live.treasure.captcha.question = Live.treasure.correctQuestion(OCRAD(Live.treasure.context.getImageData(0, 0, 120, 40)));
                                Live.treasure.captcha.answer = Live.eval(Live.treasure.captcha.question);
                                // Live.treasure.treasureTipAcquire.find('input').val(Live.treasure.captcha.answer);

                                Live.treasure.captcha.userInput = Live.treasure.captcha.answer;
                                let captcha = Live.treasure.captcha.answer;
                                Live.treasure.captchaBoxInput.val(captcha);
                                setTimeout(() => {
                                    Live.treasure.captchaBoxSubmitButton.click();
                                }, 1000);
                            }).on('error', () => {
                                Live.treasure.captcha.refresh();
                            });

                            Live.treasure.captchaBoxRefreshButton.on('click', () => {
                                Live.treasure.captcha.refresh();
                            });
                            Live.treasure.treasureCtrl.find('.bg-cover').on('click', () => {
                                Live.treasure.showPanel();
                                Live.treasure.page = Live.treasure.taskInfo.times;
                                Live.treasure.setInfoSectionPage(Live.treasure.taskInfo.times, Live.treasure.taskInfo.max_times);
                            });
                            //隐藏宝箱展开面板
                            Live.treasure.treasureCtrl.on('click', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                return false;
                            });
                            Live.treasure.treasureCtrl.find('.close-btn').on('click', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                Live.treasure.hidePanel();
                                return false;
                            });
                            $(document).on('click', (e) => {
                                Live.treasure.hidePanel();
                            });

                            //提交答案
                            Live.treasure.captchaBoxSubmitButton.on('click', () => {
                                if (!Live.treasure.allowCtrl) {
                                    return;
                                }
                                Live.treasure.allowCtrl = false;
                                Live.treasure.submit();
                            });

                            Live.treasure.checkNewTask();
                            $(window).on('beforeunload', () => {
                                chrome.runtime.sendMessage({
                                    command: 'delTreasure'
                                });
                            });
                            // });
                        }, 1000);
                    }
                });
            },
            setInfoSectionPage: (page = 1, maxPage = 3) => {
                Live.treasure.infoSection.find('.slide-btn.left')[page === 1 ? 'hide' : 'show']();
                Live.treasure.infoSection.find('.slide-btn.right')[page === maxPage ? 'hide' : 'show']();
                Live.treasure.infoSection.find('.round-count').text(`第 ${page} / ${Live.treasure.taskInfo.max_times} 轮`);
                Live.treasure.treasureCtrl.find('.awarding-panel .info-section .box-slide .round-ctnr').css({
                    transform: `translate(-${200 * (page - 1)}px, 0px)`
                });
            },
            submit: () => {
                const captcha = Live.treasure.captchaBoxInput.val();
                if (captcha) {
                    Live.treasure.getAward(Live.treasure.taskInfo.startTime, Live.treasure.taskInfo.endTime, captcha);
                }
            },
            showBox: () => {
                if (!Live.treasure.boxHidden || !Live.treasure.allowCtrl) {
                    return;
                }
                Live.treasure.boxHidden = false;
            },
            hideBox: () => {
                if (!Live.treasure.allowCtrl || Live.treasure.boxHidden) {
                    return;
                }
                Live.treasure.boxHidden = true;
            },
            showPanel: () => {
                if (!Live.treasure.allowCtrl || !Live.treasure.panelHidden) {
                    Live.treasure.hidePanel();
                    return;
                }
                Live.liveQuickLogin();
                Live.treasure.treasureCtrl.find('.awarding-panel').css({'display': 'block'});
                Live.treasure.treasureCtrl.find('.awarding-panel').addClass('v-enter-active', 'v-enter-to');
                setTimeout(() => {
                    Live.treasure.treasureCtrl.find('.awarding-panel').removeClass('v-enter-active', 'v-enter-to');
                    Live.treasure.panelHidden = false;
                }, 300);
                Live.treasure.captcha.userInput = '';
                Live.treasure.waitingEmoji = Live.randomEmoji.happy();
                Live.treasure.panelEmoji = Live.randomEmoji.helpless();
                // Live.treasure.treasureBox.find('.hide-box').hide();
                if (Live.treasure.status === 'acquirable') {
                    Live.treasure.makeAcquirable();
                } else {
                    Live.treasure.makeWaiting();
                }
                // Live.treasure.treasureTip.show();
            },
            hidePanel: () => {
                if (Live.treasure.panelHidden) {
                    return;
                }
                Live.treasure.allowCtrl = false;
                Live.treasure.panelOut = true;
                Live.treasure.treasureCtrl.find('.awarding-panel').addClass('a-scale-out-ease', 'v-leave-to');
                setTimeout(() => {
                    Live.treasure.treasureCtrl.find('.awarding-panel').removeClass('a-scale-out-ease', 'v-leave-to');
                    Live.treasure.treasureCtrl.find('.awarding-panel').css({'display': 'none'});
                    Live.treasure.panelHidden = true;
                    Live.treasure.panelOut = false;
                    Live.treasure.allowCtrl = true;
                }, 300);
            },
            makeAcquirable: () => {
                Live.treasure.allowCtrl = true;
                Live.treasure.statusText.hide();
                Live.treasure.captchaBox.show();
                Live.treasure.status = 'acquirable';
            },
            makeWaiting: () => {
                Live.treasure.setInfoSectionPage(Live.treasure.taskInfo.times, Live.treasure.taskInfo.max_times);
                Live.treasure.treasureCtrl.find(`.box-slide .round-ctnr .box-slide-item`).removeClass('in-countdown');
                Live.treasure.treasureCtrl.find(`.box-slide .round-ctnr:nth-child(${Live.treasure.taskInfo.times}) .box-slide-item:nth-child(${Live.treasure.taskInfo.minute / 3})`).addClass('in-countdown');
                Live.treasure.status = 'waiting';
            },
            makeFinished: () => {
                Live.treasure.finished = true;
                Live.setCookie('F_S_T_' + window.UID, 1);
                Live.treasure.treasureCtrl.hide();
            },
            checkNewTask: (opened) => {
                Live.treasure.getCurrentTask().done((result) => {
                    if (result.code !== undefined) {
                        result.code = parseInt(result.code, 10);
                    } else {
                        console.error('接口数据不完整：code 丢失.');
                        return;
                    }
                    if (result.code === -10017) {
                        Live.treasure.makeFinished();
                        return;
                    } else if (result.code !== 0) {
                        console.error('宝箱任务设置失败：' + result.msg);
                        if (result.code === -101) {
                        } else if (data.code === -99) { // 领奖信息不存在
                        } else {
                        }
                        Live.treasure.makeFinished();
                        return;
                    }
                    if (!opened) {
                        Live.treasure.page = result.data.times;
                        Live.treasure.setNewTask(result.data.times, result.data.max_times, result.data.time_start, result.data.time_end, parseInt(result.data.minute, 10), parseInt(result.data.silver, 10));
                    }
                }).fail(() => {
                	console.error('无法获取当前宝箱任务.');
                    setTimeout(() => Live.treasure.checkNewTask(), 1e3); // 1秒后重试
                });
            },
            setNewTask: (times, max_times, startTime, endTime, minute, silver) => {
                Live.treasure.hidePanel();
                // Live.treasure.restoreBox();
                Live.treasure.statusText.show();
                Live.treasure.captchaBox.hide();
                setTimeout(Live.treasure.makeWaiting, 300); // 等待动画结束后延迟执行.

                Live.treasure.taskInfo.times = times;
                Live.treasure.taskInfo.max_times = max_times;
                Live.treasure.taskInfo.startTime = startTime;
                Live.treasure.taskInfo.endTime = endTime;
                Live.treasure.taskInfo.minute = minute;
                Live.treasure.taskInfo.silver = silver;
                Live.treasure.taskInfo.max_times = max_times;

                Live.treasure.setCountdown(minute);
            },
            getAward: (time_start, time_end, captcha) => {
                Live.treasure.imgInit = false;
                $.get('//api.live.bilibili.com/lottery/v1/SilverBox/getAward', {
                    time_start: time_start,
                    time_end: time_end,
                    captcha: captcha
                }, () => {
                }, 'json').promise().done((result) => {
                    if (result.code != 0) {
                        Live.liveToast(Live.treasure.treasureCtrl[0], result.msg + Live.randomEmoji.helpless(), 'info');
                        Live.treasure.allowCtrl = true;
                        Live.treasure.awardBtn.restore();
                        Live.treasure.checkNewTask();
                        return;
                    }

                    // 如果是最后一次则结束宝箱.
                    if (parseInt(result.data.isEnd, 10) === 1) {
                        Live.treasure.makeFinished();
                        return;
                    }
                    Live.treasure.updateCurrency(); // 更新银瓜子.
                    Live.console.watcher('自动领瓜子 成功领取瓜子 ' + Live.treasure.taskInfo.silver + ' 个');
                    Live.treasure.silverSum += Live.treasure.taskInfo.silver;
                    store.set('bilibili_helper_treasure_silver_count', Live.treasure.silverSum);

                    let msg = new Notification('自动领取成功', {
                        body: '领取了' + Live.treasure.taskInfo.silver + '个瓜子',
                        icon: '//static.hdslb.com/live-static/images/7.png'
                    });
                    setTimeout(() => {
                        msg.close();
                    }, 10000);

                    // 设置新的任务.
                    Live.treasure.treasureCtrl.find('.bg-cover').click();
                    Live.treasure.checkNewTask();
                    Live.treasure.awardBtn.restore();
                    Live.treasure.allowCtrl = true;
                }).fail((xhrObject) => {
                    Live.console.watcher(`系统错误，请稍后再试 ${Live.randomEmoji.sad()}`);
                    Live.treasure.awardBtn.restore();
                    Live.treasure.allowCtrl = true;
                    Live.treasure.getAward(time_start, time_end, captcha);
                    // MOCKING.
                    // treasureCtrl.setNewTask(111, 222, 5, 10);
                }).always(() => {
                    Live.treasure.captcha.userInput = '';
                });
            },
            updateCurrency: () => {
                if (isNaN(parseInt(Live.treasure.silverSeed, 10))) {
                    return;
                }
                let newSeed = Live.treasure.silverSeed + Live.treasure.taskInfo.award;
                Live.treasure.silverSeed = newSeed;
            },
            setCountdown: (countMinutes) => {
                Live.treasure.countdown && Live.treasure.countdown.clearCountdown();
                Live.treasure.statusText.show();
                Live.treasure.captchaBox.hide();
                let newDate = new Date();
                let targetMinutes = newDate.getMinutes() + countMinutes; // MOCKING: SHOULD RESTORE TO GET MINUTES.
                newDate.setMinutes(targetMinutes); // MOCKING: SHOULD RESTORE TO GET MINUTES.
                Live.treasure.treasureCtrl.find('.count-down,.countdown-text span:nth-child(4)').text(` ${Live.treasure.taskInfo.silver} `);
                Live.treasure.treasureCtrl.find('.count-down').text('领取中');
                Live.treasure.countdown = new Live.countdown({
                    endTime: newDate,
                    element: Live.treasure.treasureCtrl.find('.countdown-text span:nth-child(2)'),
                    callback: () => {
                        Live.treasure.makeAcquirable();
                        // Live.treasure.treasureBox.find('.treasure-box').click();
                        Live.treasure.treasureCtrl.find('.bg-cover').click();
                        Live.treasure.captcha.refresh();
                    }
                });
                Live.treasure.allowCtrl = true;
            },
            correctQuestion: (question) => {
                var q = '',
                    question = question.trim();
                for (let i in question) {
                    let a = Live.treasure.correctStr[question[i]];
                    q += (a != undefined ? a : question[i]);
                }
                return q;
            },
            getCurrentTask: () => {
                return $.get('//api.live.bilibili.com/lottery/v1/SilverBox/getCurrentTask', {}, () => {
                }, 'json').promise();
            },
            // getSurplus: () => {
            //     return $.get('//api.live.bilibili.com/FreeSilver/getSurplus', {}, () => {
            //     }, 'json').promise();
            // },
            getCaptcha: (callback) => {
                $.get('//api.live.bilibili.com/lottery/v1/SilverBox/getCaptcha?ts=' + Date.now(), {}, () => {
                }, 'json').then(function (res) {
                    if (res.code === 0) {
                        callback(res.data.img);
                    }
                });
            }
        };
        Live.chat = {
            maxLength: 20,
            text: '',
            beat: false,
            colorValue: {
                'white': '0xffffff',
                'red': '0xff6868',
                'blue': '0x66ccff',
                'pink': '0xfca992',
                'cyan': '0x00fffc',
                'green': '0x7eff00',
                'yellow': '0xffed4f',
                'orange': '0xff9800'
            },
            danmuMode: {'top': 5, 'scroll': 1},
            hideStyle: {
                chat: {
                    title: '聊天内容',
                    css: '.chat-item.danmaku-item{display:none;}',
                    value: 'off'
                },
                gift: {
                    title: '礼物信息',
                    css: '.chat-item.gift-item,.bilibili-live-player-video-area > .bilibili-live-player-video-gift{display:none !important;}',
                    value: 'off'
                },
                small: {
                    title: '小型标志',
                    css: '.chat-item:not(.system-msg) > a{display:none !important;}',
                    value: 'off'
                },
                vipEnterMsg: {
                    title: '进场消息',
                    css: '.chat-item.welcome-msg,.chat-item.welcome-guard{display: none !important;}',
                    value: 'off'
                },
                liveTitleIcon: {
                    title: '成就头衔',
                    css: '.chat-item .title-label{display:none !important;}',
                    value: 'off'
                },
                mediaIcon: {
                    title: '粉丝勋章',
                    css: '.chat-item .fans-medal-item-ctnr{display:none !important;}',
                    value: 'off'
                },
                userLevel: {
                    title: '用户等级',
                    css: '.chat-item .user-level-icon{display:none !important;}',
                    value: 'off'
                },
                /*chatBg: {
                    title: '聊天背景',
                    css: '#chat-list-ctnr{background:#f8f8f8!important;}',
                    value: 'off',
                },*/
                superGift: {
                    title: '礼物连击',
                    css: '#my-dear-haruna-vm{display:none !important;}',
                    value: 'off'
                },
                announcement: {
                    title: '系统通告',
                    css: '.chat-item.system-msg{display:none !important;}',
                    value: 'off'
                }
            },
            displayOption: [],
            init: () => {
                Live.chat.chat_ctrl_panel = $('#chat-control-panel-vm').css('position', 'relative');
                Live.chat.counter = Live.chat.chat_ctrl_panel.find('.danmu-length-count');
                // chrome.runtime.sendMessage({
                //     command: "getOption",
                //     key: 'beat',
                // }, function(res) {
                //     if (res['value'] === 'on' && Live.BBQ && Live.BBQ.level >= 10 && Live.user && (typeof Live.user.user_level_rank === 'number') && Live.user.user_level_rank <= 25000) {
                //         Live.chat.beat = true;
                //     }
                // });
                // chrome.runtime.sendMessage({
                //     command: 'getOption',
                //     key: 'danmu',
                // }, function(response) {
                //     if (response['value'] === 'on') {
                //         $('#chat-ctrl-panel').append($('<div class="room-silent-merge dp-none p-absolute p-zero help-chat-shade" style="display:block;"><p><span class="hint-text"></span>弹幕增强功能正在初始化</p></div>'));
                //         setTimeout(Live.chat.initDanmu, 2000);
                //     }
                // });
                chrome.runtime.sendMessage({
                    command: 'getOption',
                    key: 'chatDisplay'
                }, (response) => {
                    if (response['value'] === 'on') {
                        Live.chat.initChatDisplay(true);
                    }
                });
            },
            sendDamu: () => {
                if (Live.chat.text.length > 0) {
                    let colorStr = $('.color-select-panel').attr('data-dd');
                    let mode = $('.mode-select-panel').find('a.active').attr('class').split(' ', 3)[1];
                    console.log(chrome.windows);
                    console.log($('#player_object')[0]);
                    // $('#player_object')[0].sendMsg(Live.chat.text.substr(0, Live.chat.maxLength), colorStr, Live.chat.danmuMode[mode]);
                    // Live.chat.text = Live.chat.text.substr(Live.chat.maxLength);
                    // if (Live.chat.text.length > 0) {
                    //     setTimeout(function() {
                    //         Live.chat.sendDamu();
                    //     }, 4000);
                    // }
                }
            },
            initDanmu: () => {
                // init & hide original ui

                Live.chat.maxLength = parseInt(store.get('bilibili_helper_userInfo')['userLevel']) >= 20 ? 30 : 20;

                Live.chat.counter.text('0 / 1 + 0');
                Live.scriptOptions['chat'] = {
                    colorValue: Live.chat.colorValue,
                    danmuMode: Live.chat.danmuMode,
                    maxLength: Live.chat.maxLength
                };

                // init has finished
                Live.chat.chat_ctrl_panel.find('.help-chat-shade').hide('middle');
            },
            initChatHelper: () => {
                Live.chat.chat_ctrl_panel.find('#chatHelper').remove();
                Live.chat.chatHelper = $('<div id="chatHelper"></div>').css('background-image', 'url(' + chrome.extension.getURL('imgs/jinkela.png') + ')');
                Live.chat.chatDisplayBlock = $('<div class="chat-display"><h2 class="panel-title">屏蔽选项</h2></div>');
                Live.chat.chatHelperWindow = $('<div id="chatHelperWindow" class="chat-helper-panel ctrl-panel"></div>').hide();
                Live.each(Live.chat.hideStyle, (i) => {
                    let displayOptionDOM = $(
                        '<div class="display-option">' +
                        '<span class="title">' + Live.chat.hideStyle[i].title + '</span>' +
                        '<div class="option">' +
                        '<div class="button ' + i + (Live.chat.hideStyle[i].value === 'on' ? ' on' : '') + '" option="on">屏蔽</div>' +
                        '<div class="button ' + i + (Live.chat.hideStyle[i].value === 'off' ? ' on' : '') + '" option="off">显示</div>' +
                        '</div>' +
                        '</div>');
                    Live.chat.chatDisplayBlock.append(displayOptionDOM);
                });
                Live.chat.chatHelperWindow.append(Live.chat.chatDisplayBlock);
                Live.chat.chat_ctrl_panel.append(Live.chat.chatHelper, Live.chat.chatHelperWindow);
                Live.chat.chatHelper.off('click').on('click', () => {
                    if (Live.chat.chatHelperWindow.css('display') === 'none') {
                        Live.chat.chatHelperWindow.fadeIn(200);

                        function n(t) {
                            let e = t && (t.target || t.srcElement);
                            !$(e).hasClass('chat-helper-panel') && !$(e).parents('#chatHelperWindow').length &&
                            $('.chat-helper-panel').fadeOut(200, () => {
                                $(window).off('click', n);
                            });
                        }

                        setTimeout(() => {
                            $(window).on('click', n);
                        }, 1);
                    }
                });
                Live.chat.chatDisplayBlock.find('.display-option .option .button').off('click').on('click', (e) => {
                    const $this = $(e.currentTarget);
                    let classes = $(e.currentTarget).attr('class').split(' ')[1];
                    if ($this.hasClass('on')) {
                        return false;
                    }
                    $('.' + classes).removeClass('on');
                    $this.addClass('on');
                    let type = $this.attr('option');
                    if (type === 'on') {
                        var index = Live.chat.displayOption.indexOf(classes);
                        if (index === -1) {
                            Live.chat.displayOption.push(classes);
                        }
                    } else {
                        var index = Live.chat.displayOption.indexOf(classes);
                        if (index != -1) {
                            Live.chat.displayOption.splice(index, 1);
                        }
                    }
                    let o;
                    (o = store.get('bilibili_helper_chat_display'))[Live.roomId] = Live.chat.displayOption;
                    store.set('bilibili_helper_chat_display', o);

                    Live.chat.initChatDisplay();
                });
            },
            initChatDisplay: (isInit) => {
                chrome.runtime.sendMessage({
                    command: 'getOption',
                    key: 'displayOption'
                }, (response) => {
                    let local = store.get('bilibili_helper_chat_display')[Live.roomId] || [];
                    let local_option = local.length ? local : [];
                    let global_option = JSON.parse(response['value']);
                    let big, small, count = 0;
                    if (local_option.length > global_option.length) {
                        big = local_option;
                        small = global_option;
                    } else {
                        big = global_option;
                        small = local_option;
                    }
                    count = big.length;
                    for (let i = 0; i < big.length; ++i) {
                        if (small.indexOf(big[i]) >= 0) {
                            --count;
                        }
                    }
                    if (!count) {
                        store.delete('bilibili_helper_chat_display', Live.roomId);
                        Live.chat.displayOption = global_option;
                    } else if (local_option.length) {
                        Live.chat.displayOption = local_option;
                    } else {
                        Live.chat.displayOption = global_option;
                    }
                    let options = Live.chat.displayOption;
                    Live.each(Live.chat.hideStyle, (i) => {
                        let index = options.indexOf(i);
                        if (index < 0) {
                            $('.chatDisplayStyle_' + i).remove();
                            Live.chat.hideStyle[i].value = 'off';
                        } else if ($('.chatDisplayStyle_' + i).length === 0) {
                            Live.chat.addStylesheet(i);
                            Live.chat.hideStyle[i].value = 'on';
                        }
                    });
                    if (isInit) {
                        Live.chat.initChatHelper();
                    }
                });
            },
            addStylesheet: (displayType) => {
                let styleElement = document.createElement('style');
                styleElement.setAttribute('class', 'chatDisplayStyle_' + displayType);
                styleElement.setAttribute('type', 'text/css');
                styleElement.appendChild(document.createTextNode(Live.chat.hideStyle[displayType].css));
                if (document.head) {
                    document.head.appendChild(styleElement);
                } else {
                    document.documentElement.appendChild(styleElement);
                }
            },
            updateCounter: (text) => {
                let part = parseInt(text.length / Live.chat.maxLength);
                let rest = part > 0 ? text.length % Live.chat.maxLength : 0;
                Live.chat.counter.text(text.length + ' / ' + (part === 0 ? 1 : part) + ' + ' + rest);
            }
        };
        Live.notise = {
            init: () => {
                let upInfo = {};
                Live.getRoomInfo().done((data) => {
                    upInfo.uid = Live.roomInfo.uid;
                    upInfo.roomId = Live.roomInfo.room_id;
                    upInfo.roomShortId = Live.roomInfo.short_id;
                    upInfo.upName = Live.roomInfo.info.uname;
                    upInfo.url = location.href;
                    var notiseBtn = $('<div>').addClass('fav-part dp-i-block pointer p-relative').append('<i class="icon-font icon-attention v-middle icon-attention" style="top: 1px"></i><span class="follow-text v-middle d-inline-block">特别关注</span>').click((e) => {
                        if ($(e.currentTarget).find('i').hasClass('favourited')) {
                            chrome.runtime.sendMessage({
                                command: 'setNotFavourite',
                                id: upInfo.roomId
                            }, (response) => {
                                if (response.data) {
                                    notiseBtn.find('span').html('特别关注');
                                    notiseBtn.find('i').removeClass('favourited');
                                }
                            });
                        } else {
                            chrome.runtime.sendMessage({
                                command: 'setFavourite',
                                upInfo: upInfo
                            }, (response) => {
                                if (response.data) {
                                    notiseBtn.find('span').html('已特别关注');
                                }
                                notiseBtn.find('i').addClass('favourited');
                            });
                        }
                    }).hover((e) => {
                        $(e.currentTarget).attr('title', '关注之后再特别关注会在主播开播时进行推送哦' + Live.randomEmoji.happy());
                    });
                    chrome.runtime.sendMessage({
                        command: 'getFavourite'
                    }, (response) => {
                        if (response.data.indexOf(parseInt(Live.roomId)) != -1) {
                            notiseBtn.find('span').html('已特别关注');
                            notiseBtn.find('i').addClass('icon-solid-heart');
                        }
                    });
                    $('.attention-btn-ctnr').prepend(notiseBtn);
                });
            }
        };
        Live.smallTV = {
            tvList: {},
            count: 0,
            reward: {},
            rewardList: {
                '1': {title: '大号小电视'},
                '2': {title: '蓝白胖次道具'},
                '3': {title: 'B坷垃'},
                '4': {title: '喵娘'},
                '5': {title: '便当'},
                '6': {title: '银瓜子'},
                '7': {title: '辣条'}
            },
            init: () => {
                Live.smallTV.reward = store.get('bilibili_helper_tvs_reward');
                Live.smallTV.count = store.get('bilibili_helper_tvs_count');
            },
            getTVdata: (roomId) => {
                if (Live.smallTV.tvList[roomId]) {
                    var iter = roomId != undefined ? Live.smallTV.tvList[roomId]['iter'] : undefined;
                    console.log('获取第' + (iter + 1) + '个小电视数据');
                    var tv = iter != undefined ? Live.smallTV.tvList[roomId]['tv'][iter] : false;
                    return tv;
                }
            },
            get: (roomId) => {
                $.getJSON('/SmallTV/index', {
                    roomid: roomId,
                    _: (new Date()).getTime()
                }).promise().done((result) => {
                    if (result.code == 0) { // 正在抽奖中
                        if (result.data.unjoin.length || result.data.join.length) {
                            // sTvVM.isShowPanel = true;
                        }
                        // sTv.events.updatePanelsArr();
                        Live.console.watcher('监测到小电视抽奖活动 直播间【' + roomId + '】');
                        if (result.data.lastid) { // 抽奖结束
                            // sTv.events.showSmallTvTips(result.data.lastid);
                            Live.console.watcher('小电视活动 直播间【' + roomId + '】 抽奖已经结束');
                        } else {
                            Live.console.watcher('小电视活动 直播间【' + roomId + '】 成功获取抽奖信息');
                            var unjoin = result.data.unjoin;
                            if (Live.smallTV.tvList[roomId] == undefined) Live.smallTV.tvList[roomId] = {
                                'tv': [],
                                'iter': 0
                            };
                            for (var i = 0; i < unjoin.length; ++i) {
                                var tv = unjoin[i];
                                tv.finished = false;
                                tv.joined = false;
                                tv.drawIn = false;
                                Live.smallTV.tvList[roomId]['tv'].push(tv);
                                Live.smallTV.notify(roomId);
                                // Live.watcher.pushNotification('tv', "小电视抽奖提醒", "直播间【" + roomId + "】", "//static.hdslb.com/live-static/live-room/images/gift-section/gift-25.png");
                            }
                            // var iter = Live.smallTV.tvList[roomId]['iter'];
                            // var tv = Live.smallTV.tvList[roomId]['tv'][iter];
                            // if (tv && tv.drawIn == false) 
                        }
                    }
                }).fail((result) => {
                    Live.smallTV.get(roomId);
                });
            },
            notify: (roomId) => {
                $.getJSON('/SmallTV/index', {
                    roomid: roomId,
                    _: (new Date()).getTime()
                }).promise().done((result) => {
                    if (result.code == 0) { // 正在抽奖中
                        if (result.data.unjoin.length || result.data.join.length) {
                            // sTvVM.isShowPanel = true;
                        }
                        // sTv.events.updatePanelsArr();
                        Live.console.watcher('监测到小电视抽奖活动 直播间【' + roomId + '】');
                        if (result.data.lastid) { // 抽奖结束
                            // sTv.events.showSmallTvTips(result.data.lastid);
                            Live.console.watcher('小电视活动 直播间【' + roomId + '】 抽奖已经结束');
                        } else {
                            Live.console.watcher('小电视活动 直播间【' + roomId + '】 成功获取抽奖信息');
                            var unjoin = result.data.unjoin;
                            if (Live.smallTV.tvList[roomId] == undefined) Live.smallTV.tvList[roomId] = {
                                'tv': [],
                                'iter': 0
                            };
                            if (unjoin.length > 0) {
                                chrome.runtime.sendMessage({
                                    command: 'tvNotification',
                                    data: {
                                        roomId: roomId
                                    }
                                }, (response) => {
                                });
                            }
                        }
                    }
                }).fail((result) => {
                    Live.smallTV.notify(roomId);
                });

            }
            /*join: function(roomId, tvId) {
                $.getJSON('/SmallTV/join', { roomid: roomId, _: (new Date()).getTime(), id: tvId }).promise().then(function(result) {
                    if (result.code == 0 && result.data.status == 1) { // 参加成功
                        var iter = Live.smallTV.tvList[roomId]['iter'];
                        Live.smallTV.tvList[roomId]['tv'][iter] = result.data;
                        Live.smallTV.tvList[roomId]['tv'][iter]['joined'] = true;
                        var time = new Date();
                        Live.smallTV.tvList[roomId]['tv'][iter].timestamp = {
                            year: time.getFullYear(),
                            month: time.getMonth(),
                            day: time.getDate(),
                            week: time.getDay(),
                            hour: time.getHours(),
                            min: time.getMinutes(),
                            sec: time.getSeconds()
                        };
                        Live.smallTV.count += 1;
                        store.set('bilibili_helper_tvs_count', Live.smallTV.count);
                        Live.watcher.pushNotification('tv', "已参与小电视抽奖", "直播间【" + roomId + "】", "//static.hdslb.com/live-static/live-room/images/gift-section/gift-25.png")
                        Live.console.watcher('小电视活动 直播间【' + roomId + '】 编号:' + tvId + ' 参加抽奖成功');
                    } else if (result.code == 0 && result.data.status == 2) { // 参加的时候已经过了三百秒，但是还未计算出结果
                        // sTv.panels.drawingPanel.open();
                        Live.console.watcher('小电视活动 直播间【' + roomId + '】 编号:' + tvId + ' ' + result.msg);
                    } else {
                        // sTv.panels.commonPanel("提示", result.msg);
                        Live.console.watcher('小电视活动 直播间【' + roomId + '】 编号:' + tvId + ' ' + result.msg);
                    }
                });
            },
            getReward: function(tvId, roomId) {
                $.getJSON('/SmallTV/getReward', { id: tvId }).promise().then(function(result) {

                    if (result.code == 0 && result.data.status == 0) {
                        var iter = Live.smallTV.tvList[roomId]['iter'];
                        Live.smallTV.tvList[roomId]['tv'][iter]['reward'] = result.data.reward;
                        Live.smallTV.tvList[roomId]['tv'][iter]['win'] = result.data.win;
                        Live.smallTV.tvList[roomId]['tv'][iter]['fisished'] = true;
                        Live.smallTV.tvList[roomId]['iter'] = ++iter;
                        var reward_num = Live.smallTV.reward[result.data.reward.id];
                        if (reward_num == undefined) Live.smallTV.reward[result.data.reward.id] = 0;

                        Live.smallTV.reward[result.data.reward.id] += result.data.reward.num;
                        store.set('bilibili_helper_tvs_reward', Live.smallTV.reward);

                        var tv = Live.smallTV.tvList[roomId]['tv'][iter];
                        if (tv && tv.joined == false && tv.finished == false) Live.smallTV.join(roomId, tv.id);
                        if (result.data.reward.num) {
                            Live.console.watcher('小电视活动 直播间【' + roomId + '】 编号:' + tvId + ' 获得' + Live.smallTV.rewardList[result.data.reward.id].title + "x" + result.data.reward.num);

                            if (Live.watcher.notifyOptions && Live.watcher.notifyOptions.tv) {
                                chrome.extension.sendMessage({
                                    command: "getTVReward",
                                    data: {
                                        roomId: roomId,
                                        rewardId: result.data.reward.id,
                                        rewardNum: result.data.reward.num,
                                        isWin: result.data.win
                                    }
                                });
                            }
                            Live.watcher.updateReward('tv');
                        } else Live.console.watcher('小电视活动 直播间【' + roomId + '】 编号:' + tvId + ' 您未赢得任何奖品');

                        // Live.console.info('tv', { msg: '你居然中了小电视' });
                    } else if (result.code == 0 && result.data.status == 1) {
                        // sTv.panels.commonPanel("抽奖过期", "非常抱歉，您错过了此次抽奖，下次记得早点来哦 (▔□▔)/");
                        Live.console.watcher('小电视活动 直播间【' + roomId + '】 编号:' + tvId + ' ' + result.msg);
                    } else if (result.code == 0 && result.data.status == 2) {
                        // sTv.panels.drawingPanel.open();
                        // setTimeout(Live.smallTV.getReward(result.data.id, roomId), 1000);
                        Live.console.watcher('小电视活动 直播间【' + roomId + '】 编号:' + tvId + ' ' + result.msg);
                    } else {
                        // sTv.panels.commonPanel("提示", result.msg);
                        Live.console.watcher('小电视活动 直播间【' + roomId + '】 编号:' + tvId + ' ' + result.msg);
                    }
                });
            }*/
        };
        Live.watcher = {
            able: false,
            options: {
                tv: false
                // lottery: false,
            },
            notifyStatus: false,
            notifyOptions: {
                tv: false
                // lottery: false,
            },
            panelDOM: {
                ty: undefined
                // lottery: undefined,
            },
            init: (callback) => {
                chrome.runtime.sendMessage({
                    command: 'getOption',
                    key: 'watcher'
                }, (res) => {
                    if (res['value'] === 'on') {
                        setTimeout(() => {
                            chrome.runtime.sendMessage({
                                command: 'getWatcherRoom'
                            }, (response) => {
                                if (response['data'].roomId === undefined) {
                                    // setWatcherRoom
                                    Live.getRoomInfo().done((data) => {
                                        chrome.runtime.sendMessage({
                                            command: 'setWatcherRoom',
                                            data: {
                                                uid: data.data.UID,
                                                roomId: data.data.ROOMID,
                                                roomShortId: Live.roomInfo.short_id,
                                                upName: data.data.ANCHOR_NICK_NAME,
                                                url: location.href
                                            }
                                        });
                                    });
                                    chrome.runtime.sendMessage({
                                        command: 'getOption',
                                        key: 'watchList'
                                    }, (response) => {
                                        let watchList = response['value'] ? JSON.parse(response['value']) : [];
                                        Live.scriptOptions['watcher'] = [];
                                        Live.each(watchList, (i) => {
                                            let option = Live.watcher.options[watchList[i]];
                                            if (option === false) {
                                                Live.watcher.options[watchList[i]] = true;
                                                Live.scriptOptions['watcher'].push(watchList[i]);
                                                Live.console.watcher('启动:' + watchList[i]);
                                            }
                                        });
                                        Live.watcher.initRewardPanel();
                                        $(window).on('beforeunload', (e) => {
                                            // e.returnValue = "这个直播间已经开启抽奖监控，真的要关闭吗？";
                                            chrome.runtime.sendMessage({
                                                command: 'delWatcherRoom'
                                            });
                                            // return e.returnValue;
                                        });

                                        if (Live.watcher.options['tv']) {
                                            Live.smallTV.init();
                                            Live.watcher.updateReward('tv');
                                        }
                                        // if (Live.watcher.options['lottery']) {
                                        //     Live.lottery.init();
                                        //     Live.watcher.updateReward('lottery');
                                        // }

                                        document.addEventListener('sendMessage', (event) => {
                                            let message = store.get('bilibili_helper_message');
                                            if (!message.cmd) {
                                                return false;
                                            }
                                            Live.watcher.classify(message);
                                        });
                                        Live.watcher.initData();
                                        if (typeof callback === 'function') {
                                            callback();
                                        }
                                    });
                                    chrome.runtime.sendMessage({
                                        command: 'getOption',
                                        key: 'watchNotify'
                                    }, (response) => {
                                        Live.watcher.notifyStatus = response['value'] === 'on';
                                    });
                                    chrome.runtime.sendMessage({
                                        command: 'getOption',
                                        key: 'watchNotifyList'
                                    }, (response) => {
                                        let notifyOptionsList = response['value'] ? JSON.parse(response['value']) : [];
                                        Live.each(notifyOptionsList, (i) => {
                                            let option = Live.watcher.notifyOptions[notifyOptionsList[i]];
                                            if (!option) {
                                                Live.watcher.notifyOptions[notifyOptionsList[i]] = true;
                                            }
                                        });
                                    });
                                    // Live.watcherInfoDOM.html('该房间已开启监控功能');

                                } else {
                                    chrome.runtime.sendMessage({
                                        command: 'getOption',
                                        key: 'watchList'
                                    }, (response) => {
                                        let watchList = response['value'] ? JSON.parse(response['value']) : [];
                                        Live.each(watchList, (i) => {
                                            Live.watcher.options[watchList[i]] = true;
                                        });
                                        Live.watcher.initRewardPanel();
                                    });
                                    if (typeof callback === 'function') {
                                        callback();
                                    }
                                    // Live.watcherInfoDOM.html('监控功能已在<a target="_blank" href="' + response['data'].url + '">' + response['data'].upName + '</a>的直播间启动');
                                }

                                Live.watcher.able = true;
                            });
                        }, 2000);
                    }
                });
            },
            initData: () => {
                chrome.runtime.sendMessage({
                    command: 'getOption',
                    key: 'watcherDataClean'
                }, (res) => {
                    let oDate = store.get('bilibili_helper_watcher_data_date');
                    let currentYear = new Date().getFullYear(),
                        currentMonth = new Date().getMonth() + 1,
                        currentDay = new Date().getDate();
                    let date = currentYear + '-' + currentMonth + '-' + currentDay;
                    if (res['value'] === '0') {
                        return;
                    } else if (res['value'] === '1') {
                        if (oDate === undefined) {
                            Live.watcher.cleanData();
                        } else if (oDate != date) {
                            Live.watcher.cleanData();
                        }
                        store.set('bilibili_helper_watcher_data_date', date);
                    } else if (res['value'] === '2') {
                        if (!oDate || Live.getDateDiff(oDate, date) >= 7) {
                            Live.watcher.cleanData();
                            store.set('bilibili_helper_watcher_data_date', date);
                        }
                    }
                });
            },
            cleanData: () => {
                store.set('bilibili_helper_tvs_reward', {});
                store.set('bilibili_helper_tvs_count', 0);
                store.set('bilibili_helper_lottery_reward', {});
                store.set('bilibili_helper_lottery_count', 0);
            },
            classify: (json) => {
                switch (json.cmd) {
                    case 'DANMU_MSG':
                        Live.console.info('danmu', json);
                        break;
                    case 'SYS_MSG':
                        Live.console.info('system', json);
                        Live.watcher.options['tv'] && Live.watcher.dealWithSysMsg(json);
                        break;
                    case 'TV_END':
                        // Live.console.info('tv_end', json);
                        break;
                    case 'SEND_GIFT':
                        Live.console.info('gift', json);
                        break;
                    case 'SYS_GIFT':
                        Live.console.info('sys_gift', json);
                        Live.watcher.options['lottery'] && Live.watcher.dealWithSysGift(json);
                        break;
                }
            },
            dealWithSysMsg: (json) => {
                let msg = json.msg;
                if (msg[0] === '【' && json.url != '' && json.rep === 1 && json.styleType === 2) { //join smallTV
                    var reg = new RegExp('【([\\S]+)】在直播间【([\\d]+)】');
                    var res = reg.exec(msg);
                    let roomUrl = res[2];
                    Live.getRoomIdByUrl(roomUrl, (roomId) => {
                        // Live.smallTV.get(roomId);
                        Live.smallTV.notify(roomId);
                    });
                }
                /*else if (msg[0] === '恭' && json.url === '' && json.rep === 1 && json.styleType === 2) { // get smallTV reward
                                   var reg = new RegExp('恭喜【([\\S]+)】在直播间【([\\d]+)】');
                                   var res = reg.exec(msg);
                                   let url = res[2];
                                   let roomId = store.get('bilibili_helper_live_roomId')[url];
                                   let tv = Live.smallTV.getTVdata(roomId);
                                   tv && Live.smallTV.getReward(tv.id, roomId);
                               }*/
            },
            dealWithSysGift: (json) => {
                // "tips": "【正義の此方】在直播间【81688】内 赠送 刨冰共 100 个，触发 1 次刨冰雨抽奖，快去前往抽奖吧！"
                // try {
                let msg = json.tips;
                if (typeof msg !== 'string' && !json.giftId) {
                    return;
                }
                switch (json.giftId) {
                    case 39:
                        var reg = new RegExp('在直播间【([0-9]+)】');
                        var res = reg.exec(msg);
                        var roomUrl = res[1];
                        Live.getRoomIdByUrl(roomUrl, (roomId) => {
                            Live.beat.getBeat(roomId).done((res) => {
                                if (res.data['39']['id']) {
                                    let beat = res.data['39']['content'];
                                    Live.beat.sendBeat(roomId, beat);
                                    let rewardCount = Live.lottery.reward['6'];
                                    if (rewardCount === undefined) {
                                        rewardCount = 0;
                                    }
                                    Live.lottery.reward['6'] = ++rewardCount;
                                    store.set('bilibili_helper_lottery_reward', Live.lottery.reward);
                                    Live.watcher.updateReward('lottery');
                                }
                            });
                        });
                        break;
                }
                // } catch (e) {
                //     console.log(e);
                //     return;
                // }
            },
            pushNotification: (type, title, body, icon) => {
                // if (Live.watcher.notifyStatus && Live.watcher.notifyOptions[type]) {
                let msg = new Notification(title, {
                    body: body,
                    icon: icon
                });
                setTimeout(() => {
                    msg.close();
                }, 5000);
                // }
            },
            initRewardPanel: () => {
                if (Live.watcher.options['tv']) {
                    Live.watcher.panelDOM.tv = $('<div />').addClass('tv reward-panel');
                    let tvCounter = $('<span />').addClass('reward-counter');
                    var title = $('<div />').addClass('reward-title').text('小电视抽奖').append(tvCounter);
                    var container = $('<div />').addClass('reward-container');
                    Live.watcher.panelDOM.tv.append(title, container);
                    // Live.watcherPanel.append(Live.watcher.panelDOM.tv);
                }
                // if (Live.watcher.options['lottery']) {
                //     Live.watcher.panelDOM.lottery = $('<div />').addClass('lottery reward-panel');
                //     let lotteryCounter = $('<span />').addClass('reward-counter');
                //     var title = $('<div />').addClass('reward-title').text('活动抽奖').append(lotteryCounter);
                //     var container = $('<div />').addClass('reward-container');
                //     Live.watcher.panelDOM.lottery.append(title, container);
                //     Live.watcherPanel.append(Live.watcher.panelDOM.lottery);
                // }
            },
            updateReward: (type) => {
                let gifts = {},
                    counter = 0,
                    giftsList = undefined;
                if (Live.watcher.able) {
                    switch (type) {
                        case 'tv':
                            gifts = store.get('bilibili_helper_tvs_reward');
                            counter = store.get('bilibili_helper_tvs_count');
                            giftsList = Live.smallTV.rewardList;
                            break;
                        // case 'lottery':
                        //     gifts = store.get('bilibili_helper_lottery_reward');
                        //     counter = store.get('bilibili_helper_lottery_count');
                        //     giftsList = store.get('bilibili_helper_lottery_reward_list');
                        //     break;
                    }
                    if (giftsList && Live.watcher.panelDOM[type]) {
                        Live.watcher.panelDOM[type].find('.reward-container').empty();
                        let length = 0;
                        Live.each(gifts, (id) => {
                            ++length;
                            let giftName = giftsList[id] ? giftsList[id].title : (Live.giftList[id] ? Live.giftList[id].title : '神秘礼物'),
                                number = gifts[id];
                            let giftDOM = $('<span />').addClass('gift').text(giftName + 'x' + Live.numFormat(number));

                            Live.watcher.panelDOM[type].find('.reward-container').append(giftDOM);
                        });
                        if (!length) {
                            Live.watcher.panelDOM[type].find('.reward-container').append($('<span class="gift">没有获奖记录</span>'));
                        }
                    }
                    Live.watcher.panelDOM[type] && Live.watcher.panelDOM[type].find('.reward-counter').text(counter + ' 次');
                }
            }
        };
        Live.giftpackage = {
            giftPackageStatus: 0, // 0: 没有道具 1: 包裹中有赠送的新道具 2:包裹里非新增道具
            giftPackageData: {},
            giftList: {},
            giftPackageNewPanel: {
                data: [],
                show: false,
                out: false,
                outTimeout: null,
                open: () => {
                    // 获取赠送的新道具数据
                    Live.giftpackage.getSendGift((result) => {
                        if (result.code === 0) {
                            Live.giftpackage.giftPackageNewPanel.data = result.data;
                        }
                    });
                },
                close: () => {
                    let giftPackageNewPanel = Live.giftpackage.giftPackageNewPanel;
                    giftPackageNewPanel.out = true;
                    giftPackageNewPanel.outTimeout = setTimeout(() => {
                        giftPackageNewPanel = null;
                        Live.giftpackage.giftPackageStatus = 2;
                        // Live.giftpackage.openGiftPackagePanel(); // 打开包裹
                    }, 380);
                }
            },
            init: () => {
                chrome.runtime.sendMessage({
                    command: 'getOption',
                    key: 'giftpackage'
                }, (res) => {

                    if (res['value'] === 'on') {
                        // init dom
                        Live.giftpackage.getGiftList();
                        Live.giftpackage.originCtl = $('#gift-control-vm .gift-package').hide();
                        Live.giftpackage.ctl = Live.giftpackage.originCtl.clone().css({'display': 'inline-block'}).attr('id', 'helper-gift-ctl');
                        console.log(Live.giftpackage.ctl.children().not('.warp'));
                        Live.giftpackage.ctl.children().not('.warp').on('click', function (e) {
                                e.stopPropagation();
                                // so that clicking on popup will not invoke Live.giftpackage.mainPanel.toggle(e);
                                // if ($(e.target).hasClass('gift-package'))
                                Live.giftpackage.mainPanel.toggle(e);
                            });
                        // so that click event will reach div.gift-package instead and invoke Live.giftpackage.mainPanel.toggle(e)
                        Live.giftpackage.originCtl.after(Live.giftpackage.ctl).hide();
                        Live.giftpackage.mainPanel.initDOM();
                        Live.giftpackage.sendPanel.initDOM();
                        Live.giftpackage.mainPanel.update(() => {
                            Live.giftpackage.mainPanel.createPanel();
                        });
                    }
                });
            },
            mainPanel: {
                state: false,
                update: (callback) => {
                    Live.giftpackage.getGiftPackage().done((res) => {
                        if (res.code === 0) {
                            if (res.data && res.data.length === 0) {
                                Live.giftpackage.giftPackageData = {};
                                Live.giftpackage.mainPopupBoxEmptyBox.show();
                                Live.giftpackage.sendAllBtn.hide();
                            } else {
                                Live.giftpackage.giftPackageData = Live.giftpackage.sortGifts(res.data.list);
                                Live.giftpackage.mainPopupBoxEmptyBox.hide();
                                Live.giftpackage.sendAllBtn.show();
                            }
                            if (typeof callback === 'function') callback(res);
                        }
                    });
                },
                open: function () {
                    Live.giftpackage.mainPanel.update(() => {
                        Live.giftpackage.mainPanel.createPanel();
                        Live.giftpackage.mainPanel.show();
                    });
                },
                show: () => {
                    Live.giftpackage.mainPanel.state = true;
                    Live.giftpackage.mainBox.fadeIn('fast');
                    setTimeout(() => {
                        Live.giftpackage.mainBox.removeClass('slide-fade-enter-active v-enter-to');
                    }, 380);
                    setTimeout(function () {
                        let n = function (t) {
                            let e = t && (t.target || t.srcElement);
                            if (!($(e).hasClass('gift-package') && $(e).hasClass('link-popup-ctnr')) && !$(e).parents('.gift-package,.link-popup-ctnr').length) {
                                Live.giftpackage.mainPanel.hide();
                                $(document).off('click', n);
                            }
                        };
                        $(document).on('click', n);
                    }, 1);
                },
                hide: () => {
                    Live.giftpackage.mainPanel.state = false;
                    Live.giftpackage.mainBox.addClass('slide-fade-leave-active slide-fade-leave-to');
                    setTimeout(() => {
                        Live.giftpackage.mainBox.hide();
                        Live.giftpackage.mainBox.removeClass('slide-fade-leave-active slide-fade-leave-to');
                    }, 380);
                },
                toggle: (e) => {
                    e.stopPropagation();
                    Live.liveQuickLogin();
                    if (!Live.giftpackage.mainPanel.state) {
                        if (Live.giftpackage.giftPackageStatus === 1) { // 有新道具，先打开新送道具面板
                            // Live.giftpackage.giftPackageNewPanel.open();
                        } else {
                            Live.giftpackage.mainPanel.open(); // 否则直接打开包裹
                        }
                    } else {
                        Live.giftpackage.mainPanel.hide();
                    }
                },
                initDOM: () => {
                    Live.giftpackage.mainBox = $('<div />').addClass('warp slide-fade-enter-active v-enter-to').hide();
                    Live.giftpackage.mainBoxInner = $('<div />').addClass('common-popup-wrap arrow-bottom popup');

                    Live.giftpackage.mainPopupBoxInner = $('<div />').addClass('box');
                    Live.giftpackage.mainPopupBoxHeader = $('<header />').append('道具包裹');
                    Live.giftpackage.sendAllBtn = $('<div />').addClass('send-all').text('一键清空');
                    Live.giftpackage.sendIntimacyBtn = $('<div />').addClass('send-intimacy').text('满亲密度清空');
                    Live.giftpackage.mainPopupBoxGiftBox = $('<div />').addClass('a-move-in-left');
                    Live.giftpackage.mainPopupBoxGiftWapper = $('<div />').addClass('content');
                    Live.giftpackage.sendLineBtn = $('<div />').addClass('send-line').text('清空本类');

                    Live.giftpackage.mainPopupBoxGiftItemBox = $('<div />').addClass('item-box');
                    Live.giftpackage.mainPopupBoxGiftItem = $('<div />').addClass('gift-box item');
                    Live.giftpackage.mainPopupBoxGiftItemIcon = $('<div />').addClass('gift bg-cover');
                    Live.giftpackage.mainPopupBoxGiftItemNum = $('<div />').addClass('num');
                    Live.giftpackage.mainPopupBoxGiftItemExpires = $('<span />').addClass('expires');

                    // 包裹为空时显示dom
                    Live.giftpackage.mainPopupBoxEmptyBox = $('<div />').append(
                        $('<div />').addClass('des').text('包裹中没有道具哦～'),
                        $('<img />').addClass('img').attr('src', '//s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/404.6c08e48.png')
                    ).hide();

                    // 拼装主窗口
                    Live.giftpackage.mainPopupBoxHeader.append(Live.giftpackage.sendAllBtn, Live.giftpackage.sendIntimacyBtn);
                    Live.giftpackage.mainBox.append(Live.giftpackage.mainBoxInner);
                    Live.giftpackage.mainBoxInner.append(Live.giftpackage.mainPopupBoxInner);
                    Live.giftpackage.mainPopupBoxInner.append(
                        Live.giftpackage.mainPopupBoxHeader,
                        Live.giftpackage.mainPopupBoxGiftBox,
                        Live.giftpackage.mainPopupBoxEmptyBox
                    );
                    Live.giftpackage.ctl.find('.wrap').remove();
                    Live.giftpackage.ctl.append(Live.giftpackage.mainBox);
                },
                createPanel: (data) => {
                    data = data || Live.giftpackage.giftPackageData;
                    if (data) {
                        Live.giftpackage.sendAllBtn.data('giftsData', data);
                        Live.giftpackage.sendIntimacyBtn.data('giftsData', data);
                        Live.giftpackage.mainPopupBoxGiftBox.empty();
                        const keys = Object.keys(data);
                        if (keys.length > 0) {
                            Live.each(data, (index) => {
                                const gifts = data[index];
                                const wrapper = Live.giftpackage.mainPopupBoxGiftWapper.clone().on('DOMMouseScroll mousewheel', Live.scrollEvent);
                                const sendLineBtn = Live.giftpackage.sendLineBtn.clone().data('giftsData', gifts);
                                const items = Live.giftpackage.mainPopupBoxGiftItemBox.clone();
                                Live.each(gifts, (i) => {
                                    const gift = gifts[i];
                                    const item = Live.giftpackage.mainPopupBoxGiftItem.clone()
                                        .data('giftData', gift);
                                    const icon = Live.giftpackage.mainPopupBoxGiftItemIcon.clone();
                                    icon.css({
                                        'background-image': `url("//s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/gift-images/image-png/gift-${index}.png")`
                                    });
                                    const expires = Live.giftpackage.mainPopupBoxGiftItemExpires.clone().text(gift.day);
                                    const num = Live.giftpackage.mainPopupBoxGiftItemNum.clone().text(gift.gift_num);
                                    item.append(expires, icon, num).data('giftData', gift);
                                    items.append(item);
                                });
                                wrapper.append(sendLineBtn, items);
                                Live.giftpackage.mainPopupBoxGiftBox.append(wrapper);
                                sendLineBtn.on('click', function () {
                                    const giftsData = $(this).data('giftsData');
                                    Live.giftpackage.sendPanel.createPanel({data: giftsData});
                                });
                            });
                        } else {
                            Live.giftpackage.mainPopupBoxEmptyBox.show();
                        }
                    }
                    Live.giftpackage.ctl.find('.gift-box.item').off('click').on('click', function (e) {
                        const giftData = $(this).data('giftData');
                        Live.giftpackage.sendPanel.createPanel({
                            data: giftData,
                            single: true
                        });
                    });
                    Live.giftpackage.sendAllBtn.off('click').on('click', function (e) {
                        const giftData = $(this).data('giftsData');
                        Live.giftpackage.sendPanel.createPanel({
                            data: giftData,
                            all: true
                        });
                    });
                    Live.giftpackage.sendIntimacyBtn.off('click').on('click', function (e) {
                        return;
                        const giftData = $(this).data('giftsData');
                        Live.giftpackage.sendPanel.createPanel({
                            data: giftData,
                            all: true
                        });
                    });
                }
            },
            sendPanel: {
                showState: false,
                sendState: false,
                data: {},
                show: function () {
                    Live.giftpackage.sendPanel.showState = true;
                    Live.giftpackage.linkPopupCtl.empty().append(Live.giftpackage.linkPopupCtlInner);
                },
                hide: function () {
                    Live.giftpackage.sendPanel.showState = false;
                    Live.giftpackage.linkPopupCtlInner.addClass('fade-ut-leave-active fade-out-leave-to');
                    Live.giftpackage.linkBox.addClass('a-scale-out scale-out-leave-to');
                    setTimeout(() => {
                        Live.giftpackage.linkPopupCtlInner.removeClass('fade-ut-leave-active fade-out-leave-to');
                        Live.giftpackage.linkBox.removeClass('a-scale-out scale-out-leave-to');
                        Live.giftpackage.linkPopupCtl.empty();
                    }, 380);
                },
                toggle: function (e) {
                    e.stopPropagation();
                    Live.liveQuickLogin();
                    if (!Live.giftpackage.sendPanel.showState) {
                        Live.giftpackage.sendPanel.open();
                    } else {
                        Live.giftpackage.sendPanel.hide();
                    }
                },
                initDOM: () => {
                    Live.giftpackage.linkPopupCtl = $('<div />').addClass('link-popup-ctnr');
                    Live.giftpackage.linkPopupCtlInner = $('<div />').addClass('link-popup-ctnr dp-table w-100 h-100 p-fixed p-zero f-family');
                    Live.giftpackage.linkPopupCtlMerge = $('<div />').addClass('body-merge w-100 h-100 p-absolute p-zero');
                    Live.giftpackage.linkPopupCtlBox = $('<div />').addClass('dp-table-cell v-middle');

                    Live.giftpackage.linkBox = $('<div />').addClass('link-popup-panel p-relative m-auto a-move-in-top a-forwards');
                    Live.giftpackage.linkBoxHeader = $('<div />').addClass('title-ctnr p-relative');
                    Live.giftpackage.linkBoxH2 = $('<div><h2 class="popup-title">赠送礼物</h2></div>').addClass('title-ctnr p-relative');
                    Live.giftpackage.linkBoxClose = $('<div><i data-v-599b0ddc="" class="close icon-font icon-close"></i></div>').addClass('close-btn p-absolute bg-center bg-no-repeat pointer t-center');
                    Live.giftpackage.linkBoxContentWapper = $('<div />').addClass('popup-content-ctnr');
                    Live.giftpackage.linkBoxContent = $('<div />').addClass('gift-sender');
                    Live.giftpackage.linkBoxForm = $('<div />').addClass('sender-form');
                    Live.giftpackage.linkBoxGiftInfo = $('<div />').addClass('gift-info');
                    Live.giftpackage.intimacyCheckBox = $('<input type="checkbox" name="intimacy" />');
                    Live.giftpackage.intimacyLabel = $('<label/>').append(Live.giftpackage.intimacyCheckBox);

                    Live.giftpackage.linkBoxGiftInfoIcon = $('<div />').addClass('img bg-cover dp-i-block v-top');
                    Live.giftpackage.linkBoxGiftInfoDesc = $('<div />').addClass('desc dp-i-block v-top');

                    Live.giftpackage.linkBoxGiftSubmitBox = $('<div />');
                    Live.giftpackage.linkBoxGiftSubmitInput = $('<input />').attr('type', 'number').addClass('input no-switcher');
                    Live.giftpackage.linkBoxGiftSubmitButton = $('<button><span class="txt">赠送</span></button>').addClass('bl-button bl-button--primary bl-button--size');
                    Live.giftpackage.medal = $('<div class="fans-medal-item v-middle"><span class="label"></span><span class="level"></span></div>');

                    //拼装送礼界面
                    $('body').append(Live.giftpackage.linkPopupCtl);
                    Live.giftpackage.linkPopupCtlInner.append(
                        Live.giftpackage.linkPopupCtlMerge,
                        Live.giftpackage.linkPopupCtlBox
                    );
                    Live.giftpackage.linkPopupCtlBox.append(Live.giftpackage.linkBox);
                    Live.giftpackage.linkBoxHeader.append(Live.giftpackage.linkBoxH2);
                    Live.giftpackage.linkBoxContentWapper.append(Live.giftpackage.linkBoxContent);
                    Live.giftpackage.linkBoxContent.append(Live.giftpackage.linkBoxForm);
                    Live.giftpackage.linkBoxForm.append(Live.giftpackage.linkBoxGiftInfo);
                    Live.giftpackage.linkBox.append(
                        Live.giftpackage.linkBoxHeader,
                        Live.giftpackage.linkBoxContentWapper,
                        Live.giftpackage.linkBoxClose
                    );
                    Live.giftpackage.linkBoxGiftSubmitBox.append(
                        Live.giftpackage.linkBoxGiftSubmitInput,
                        Live.giftpackage.linkBoxGiftSubmitButton
                    );
                },
                createNumberBox: (inputDOM, maxNum) => {
                    let numberGroup = ['1', '5', '10', '30', '50', '5%', '10%', '30%', '50%', 'MAX'];
                    const bumBtnBox = $('<div />').addClass('number-btn-box');
                    for (let i = 0; i < numberGroup.length; ++i) {
                        let numberBtn = $('<span />').addClass('number-btn').text(numberGroup[i]);
                        if (i < 5 && maxNum < parseInt(numberGroup[i])) {
                            numberBtn.addClass('disabled');
                        }
                        bumBtnBox.append(numberBtn);
                        numberBtn.off('click').on('click', function () {
                            let n = $(this).text();
                            switch (n) {
                                case '1':
                                case '5':
                                case '10':
                                case '30':
                                case '50':
                                    var num = parseInt(n);
                                    if (maxNum < num) {
                                        num = maxNum;
                                    }
                                    inputDOM.val(num);
                                    break;
                                case '5%':
                                case '10%':
                                case '30%':
                                case '50%':
                                    var num = Math.ceil(parseInt(n.substr(0, n.length - 1)) * 0.01 * maxNum);
                                    if (maxNum < num) {
                                        num = maxNum;
                                    }
                                    inputDOM.val(num);
                                    break;
                                case 'MAX':
                                    inputDOM.val(maxNum);
                            }
                            inputDOM.focus();
                        });
                    }
                    return bumBtnBox;
                },
                createSingleTypeDOM: (data) => {
                    console.log(data);
                    const icon = Live.giftpackage.linkBoxGiftInfoIcon.clone()
                        .css({
                            'background-image': `url(//s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/gift-images/image-gif/gift-${data.gift_id}.gif)`
                        });
                    const desc = Live.giftpackage.linkBoxGiftInfoDesc.clone().text(`您的包裹中还剩 ${data.gift_num} 个可用`);
                    const infoBox = Live.giftpackage.linkBoxGiftInfo.clone().append(icon, desc);
                    const submitBox = Live.giftpackage.linkBoxGiftSubmitBox.clone();
                    const input = submitBox.find('input').val(1);
                    const numBox = Live.giftpackage.sendPanel.createNumberBox(input, data.gift_num);
                    Live.giftpackage.linkBoxForm.empty().append(infoBox, submitBox, numBox);
                    setTimeout(() => {
                        input.focus();
                    }, 380);
                    submitBox.find('button').on('click', function (e) {
                        Live.giftpackage.sendPanel.send(e, data);
                    });
                },
                createTypeDOM: (giftsData, all) => {
                    const items = Live.giftpackage.mainPopupBoxGiftItemBox.clone();
                    const wearedMedal = Live.medal.wearedMedal;
                    const giftList = [];
                    const s = (gifts) => {
                        Live.each(gifts, (i) => {
                            const gift = gifts[i];
                            giftList.push(gift);
                            const item = Live.giftpackage.mainPopupBoxGiftItem.clone()
                                .data('giftData', gift);
                            const icon = Live.giftpackage.mainPopupBoxGiftItemIcon.clone();
                            icon.css({
                                'background-image': `url("//s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/gift-images/image-png/gift-${gift.gift_id}.png")`
                            });
                            const expires = Live.giftpackage.mainPopupBoxGiftItemExpires.clone().text(gift.day);
                            const num = Live.giftpackage.mainPopupBoxGiftItemNum.clone().text(gift.gift_num);
                            item.append(expires, icon, num).data('giftData', gift);
                            items.append(item);
                        });
                    };
                    if (all) { // 一键清空
                        const keys = Object.keys(giftsData);
                        Live.each(keys, (i) => {
                            const singleGifts = giftsData[keys[i]];
                            s(singleGifts);
                        });
                    } else { // 清空本行
                        s(giftsData);
                    }
                    const intimacyData = Live.giftpackage.filterGiftsByIntimacy(giftList);
                    const hasWearedMedal = Live.medal.hasWeared();
                    const hasMedal = Live.medal.hasMedal();
                    const medalDOM = Live.giftpackage.medal.clone();
                    if (hasWearedMedal) {
                        medalDOM.addClass(`level-${wearedMedal.level}`)
                            .find('.label').append(wearedMedal.medal_name);
                        medalDOM.find('.level').append(wearedMedal.level);
                    }
                    console.log(wearedMedal);
                    const infoBox = Live.giftpackage.linkBoxGiftInfo.clone().append(
                        items,
                        hasWearedMedal && $('<div class="intimacy"></div>').append(
                        medalDOM,
                        ` <div>共计增加亲密度：<span class="up">${intimacyData.intimacy}⬆</span> + ${wearedMedal.intimacy} / ${wearedMedal.next_intimacy}</div>`,
                        `<div>今日亲密度上限：<span class="up">${intimacyData.intimacy}⬆</span> + ${wearedMedal.today_feed} / ${wearedMedal.day_limit}</div>`
                        )
                    ).on('DOMMouseScroll mousewheel', Live.scrollEvent);
                    if (!hasMedal) {
                        infoBox.addClass('no-medal');
                    }
                    if (hasMedal && !hasWearedMedal) {
                        infoBox.addClass('not-weared');
                    }
                    const submitBox = Live.giftpackage.linkBoxGiftSubmitBox.clone().empty().append(Live.giftpackage.linkBoxGiftSubmitButton.clone());
                    Live.giftpackage.linkBoxForm.empty().append(infoBox, submitBox);
                    submitBox.find('button').on('click', function (e) {
                        if (all) {
                            Live.giftpackage.sendPanel.sendAll(e, giftsData);
                        } else {
                            Live.giftpackage.sendPanel.sendLine(e, giftsData);
                        }
                    });
                },
                createPanel: ({data, single = false, all = false}) => {
                    Live.medal.init();
                    if (single === true) {
                        Live.giftpackage.sendPanel.createSingleTypeDOM(data);
                    } else if (!single) {
                        Live.giftpackage.sendPanel.createTypeDOM(data, all);
                    } else return;
                    Live.giftpackage.sendPanel.show();
                    Live.giftpackage.linkBoxClose.on('click', function (e) {
                        e.stopPropagation();
                        Live.giftpackage.sendPanel.hide();
                    });
                    Live.giftpackage.linkPopupCtlMerge.on('click', function (e) {
                        e.stopPropagation();
                        Live.giftpackage.sendPanel.hide();
                    });
                },
                send: (event, data) => {
                    if (event.type === 'keyup' && event.keyCode !== 13) {
                        Live.giftpackage.sendPanel.sendState = false;
                        return;
                    }
                    const element = event.target || event.srcElement;
                    const input = Live.giftpackage.linkPopupCtlBox.find('input');
                    if (Live.giftpackage.sendPanel.sendState) {
                        element && Live.liveToast(input[0], Live.randomEmoji.sad() + ' 送礼失败：有礼物正在派送中 ' + Live.randomEmoji.sad(), 'error');
                        Live.giftpackage.sendPanel.sendState = false;
                        return;
                    }
                    Live.giftpackage.sendPanel.sendState = true;
                    let giftData = data;
                    giftData.count = input.val();
                    let num = parseInt(giftData.count, 10);
                    // 检测礼物数量是否为合法数字.
                    if (isNaN(num) || num > giftData.gift_num) {
                        giftData.count = 0;
                        Live.liveToast(element, '请填写正确的礼物数量 ' + Live.randomEmoji.helpless(), 'error');
                        Live.giftpackage.sendPanel.sendState = false;
                        return;
                    }
                    return Live.giftpackage.sendPanel.sendAjax(giftData, element, input);
                },
                sendLine: (each, data) => {
                    if (event.type === 'keyup' && event.keyCode !== 13) {
                        Live.giftpackage.sendPanel.sendState = false;
                        return;
                    }
                    const element = event.target || event.srcElement;
                    if (Live.giftpackage.sendPanel.sendState) {
                        element && Live.liveToast(element, Live.randomEmoji.sad() + ' 送礼失败：有礼物正在派送中 ' + Live.randomEmoji.sad(), 'error');
                        Live.giftpackage.sendPanel.sendState = false;
                        return;
                    }
                    if (data instanceof Array) {
                        let counter = data.length - 1;
                        return Live.giftpackage.sendPanel.sendLineAjax(counter, data, element);
                    } else {
                        element && Live.liveToast(element, Live.randomEmoji.sad() + ' 送礼失败：礼物数据有误 ' + Live.randomEmoji.sad(), 'error');
                    }
                },
                sendAll: (event, data) => {
                    if (event.type === 'keyup' && event.keyCode !== 13) {
                        Live.giftpackage.sendPanel.sendState = false;
                        return;
                    }
                    const element = event.target || event.srcElement;
                    if (Live.giftpackage.sendPanel.sendState) {
                        element && Live.liveToast(element, Live.randomEmoji.sad() + ' 送礼失败：有礼物正在派送中 ' + Live.randomEmoji.sad(), 'error');
                        Live.giftpackage.sendPanel.sendState = false;
                        return;
                    }
                    if (data instanceof Object) {
                        const keys = Object.keys(data);
                        const counter = keys.length;
                        return Live.giftpackage.sendPanel.sendAllAjax(counter - 1, data, element);
                    } else {
                        element && Live.liveToast(element, Live.randomEmoji.sad() + ' 送礼失败：礼物数据有误 ' + Live.randomEmoji.sad(), 'error');
                    }
                },
                sendAjax: (giftData, submitBtnDOM, inputDOM) => {
                    let rnd = store.get('bilibili_helper_live_danmu_rnd')[(Live.roomInfo.short_id || Live.roomInfo.room_id)];
                    return $.post('//api.live.bilibili.com/gift/v2/live/bag_send', {
                        uid: Live.user.mid,
                        gift_id: giftData.gift_id,
                        ruid: Live.roomInfo.uid,
                        gift_num: giftData.count,
                        bag_id: giftData.bag_id,
                        platform: 'pc',
                        biz_code: 'live',
                        biz_id: Live.roomInfo.room_id,
                        rnd: rnd,
                        storm_beat_id: 0,
                        csrf_token: Live.getCookie('bili_jct') || ''
                    }, function (result) {
                        Live.giftpackage.sendPanel.successCallback(giftData, result, submitBtnDOM, inputDOM);
                    }, 'json').fail(function (result) {
                        submitBtnDOM && Live.liveToast(submitBtnDOM, Live.randomEmoji.sad() + ' 送礼失败：' + result.statusText + ' ' + Live.randomEmoji.sad(), 'error');
                    }).always(function () {
                        Live.giftpackage.sendPanel.sendState = false;
                    });
                },
                sendLineAjax: (counter, giftsData, submitBtnDOM) => {
                    let p;
                    if (counter !== -1) {
                        let giftData = giftsData[counter];
                        giftData.count = giftData.gift_num;
                        p = Live.giftpackage.sendPanel.sendAjax(giftData, submitBtnDOM);
                        p.done((data) => {
                            giftData.complete = data.code === 0;
                        }).fail(() => {
                            giftData.complete = false;
                        }).always(() => {
                            Live.giftpackage.sendPanel.sendLineAjax(counter - 1, giftsData);
                        });
                    } else {
                        Live.giftpackage.mainPanel.hide();
                    }
                    return p;
                },
                sendAllAjax: (kindIndex, giftsData, submitBtnDOM) => {
                    if (giftsData instanceof Object) {
                        let p;
                        if (kindIndex !== -1) {
                            const keys = Object.keys(giftsData);
                            const giftData = giftsData[keys[kindIndex]];
                            const counter = giftData.length;
                            p = Live.giftpackage.sendPanel.sendLineAjax(counter - 1, giftData, submitBtnDOM);
                            p && p.always(() => {
                                Live.giftpackage.sendPanel.sendAllAjax(kindIndex - 1, giftsData, submitBtnDOM);
                            });
                        }
                        return p;
                    } else {
                        Live.giftpackage.mainPanel.hide();
                    }
                },
                successCallback: (giftData, result, submitBtnDOM, inputDOM) => {
                    if (result.code === 0) {
                        Live.liveToast(submitBtnDOM, '送出去啦～诶嘿嘿' + Live.randomEmoji.helpless(), 'success');
                        Live.console.watcher(`成功送出 ${result.data.gift_name} x ${result.data.gift_num}`);
                        let giftTarget = document.getElementById('penury-gift-msg'); // 低价礼物容器节点.
                        function chatGiftList(json) {
                            // 礼物信息
                            let giftLtInfo = {
                                uname: json.uname,
                                num: json.gift_num,
                                giftName: json.gift_name,
                                giftId: json.gift_id
                            };

                            giftTarget.innerHTML = '<div class="penury-gift-item v-middle a-move-in-top">' +
                                '<span class="username v-middle">' + giftLtInfo.uname + '</span> ' +
                                '<span class="action v-middle">喂食' + giftLtInfo.giftName + '</span>' +
                                '<div class="gift-img dp-i-block v-middle bg-contain live-gift-image gift-gray-' + giftLtInfo.giftId + '" role="img">' +
                                '</div>' +
                                'X <span class="gift-count">' + giftLtInfo.num + '</span></div>';
                            setTimeout(() => {
                                giftTarget.innerHTML = '';
                            }, 3000);
                        }

                        if (parseInt(result.data.gift_num, 10) < 10) {
                            chatGiftList(result.data);
                        } else {
                            // 本地添加送礼记录.
                            // window.liveRoomFuncs.addGiftHistory(result.data);
                        }

                        // Callback
                        giftData.giftNum = result.data.extra.gift_bag.gift_num;
                        Live.giftpackage.linkPopupCtlBox.find('.gift-info .desc.dp-i-block.v-top').text('您的包裹中还剩 ' + result.data.extra.gift_bag.gift_num + ' 个可用');
                        inputDOM && inputDOM.focus();
                        // 当 remain 为 0 时检查包裹状态并更新
                        if (giftData.giftNum === 0) {
                            Live.liveToast(submitBtnDOM, '已经没有道具了 ' + Live.randomEmoji.sad(), 'error', 'caution');
                            inputDOM && inputDOM.val(0);
                            Live.giftpackage.sendPanel.hide();
                            // getGiftPackageStatus(function(result) {
                            //     Live.giftpackage.giftPackageStatus = result.data.result;
                            // });
                        }
                    } else if (result.code === 1) {// 道具包裹刷道具锁定状态不提示错误
                        console.error('系统繁忙...');
                    } else if (result.code === -400 && result.msg === '余额不足') {// 余额不足自动弹出相应弹窗.
                        Live.giftpackage.sendPanel.hide();
                    } else {
                        submitBtnDOM && Live.liveToast(submitBtnDOM, result.msg + ' ' + Live.randomEmoji.sad(), 'error');
                    }
                }
            },
            giftFilter: {},
            sortGifts: (giftpackageData) => {
                let r = {},
                    gs = giftpackageData;
                Live.giftpackage.giftPackageData = {};
                let now = new Date();
                now.setHours(0);
                now.setMinutes(0);
                now.setSeconds(0);
                now.setMilliseconds(0);
                const today = (new Date().setTime(now.getTime())) / 1000;
                Live.each(gs, (i) => {
                    // expireat:"31天"
                    // gift_id:37
                    // gift_name:"团扇"
                    // gift_num:39
                    // gift_price:"1000金瓜子"
                    // gift_type:3q
                    // id:4473074
                    // uid:50623
                    let gift = gs[i];
                    Live.giftpackage.giftPackageData[gift.id] = gift;
                    if (gift.expire_at === 0) {
                        gift.expireatDate = -1;
                        gift.day = '永久';
                    } else {
                        const diff = gift.expire_at - today;
                        const day = parseInt(diff / 60 / 60 / 24, 10);
                        gift.expireatDate = day;
                        if (day > 1) {
                            gift.day = day + '天';
                        } else {
                            gift.day = '今天';
                        }
                    }
                    if (r[gift.gift_id] === undefined) {
                        r[gift.gift_id] = [];
                    }
                    let position = 0;
                    Live.each(r[gift.gift_id], (index) => {
                        if (gift.expireatDate < r[gift.gift_id][index].expireatDate && position >= index) {
                            position = index;
                        } else if (position >= index) {
                            position = index + 1;
                        }
                    });
                    r[gift.gift_id].splice(position, 0, gift);
                });
                return r;
            },
            filterGiftsByIntimacy: (giftpackageData) => {
                let gs = giftpackageData;
                // if (_.isObject(gs) && !_.isArray(gs)) gs = [gs];
                Live.giftpackage.giftPackageData = {};
                let intimacy = 0;
                return {
                    data: _.sortBy(gs, [function (o) {
                        intimacy += (Live.giftpackage.giftList[o.gift_id].price / 100) * o.gift_num;
                        return o.expireatDate;
                    }]),
                    intimacy
                };
            },
            getGiftPackage: () => { // get package data
                return $.get('//api.live.bilibili.com/gift/v2/gift/bag_list', {}, () => {
                }, 'json').promise();
            },
            getSendGift: () => { // get new gift
                return $.get('//api.live.bilibili.com/giftBag/getSendGift', {}, () => {
                }, 'json').promise();
            },
            getGiftPackageStatus: () => { // get the info for 'if has new gift'
                return $.get('//api.live.bilibili.com/giftBag/sendDaily', {}, () => {
                }, 'json').promise();
            },
            getGiftList: () => {
                return $.get('https://api.live.bilibili.com/gift/v2/live/room_gift_list', {}, (res) => {
                    res.code === 0 && _.forEach(res.data, (e) => {
                        Live.giftpackage.giftList[e.id] = e;
                    });
                }, 'json').promise();
            }
        };
        Live.medal = {
            medalList: {},
            wearedMedal: {},
            hasMedal: false,
            hasMedal: () => {
                return _.filter(Live.medalList.fansMedalList, (o) => {
                    return o.anchorInfo.uname === Live.roomInfo.info.uname;
                }).length > 0;
            },
            hasWeared: () => {
                return Live.roomInfo.info.uname === Live.medal.wearedMedal.target_name;
            },
            getMedalList: () => {
                return $.getJSON('//api.live.bilibili.com/i/api/medal?page=1&pageSize=30').promise();
            },
            getWearedMedal: () => {
                return $.post('//api.live.bilibili.com/live_user/v1/UserInfo/get_weared_medal', {
                    source: 1,
                    uid: Live.user.mid,
                    target_id: Live.roomId,
                    csrf_token: Live.getCookie('bili_jct') || ''
                }).promise();
            },
            wearMedal: (medalId) => {
                return $.getJSON(`//api.live.bilibili.com/i/ajaxWearFansMedal?medal_id=${medalId}`).promise();
            },
            cancelWear: () => {
                return $.getJSON('//api.live.bilibili.com/i/ajaxCancelWear').promise();
            },
            deleteMedal: (medalId) => {
                return $.getJSON(`//api.live.bilibili.com/i/ajaxDeleteMyFansMedal?medal_id=${medalId}`).promise();
            },
            updateMedalList: () => {
                Live.medal.getMedalList().done((medalList) => {
                    Live.medalList = medalList.data;
                });
            },
            updateWearedMedal: (callback) => {
                Live.medal.getWearedMedal().done(function (res) {
                    if (res.code === 0) {
                        Live.medal.wearedMedal = res.data;
                        if (callback instanceof Function) callback();
                    }
                });
            },
            init: () => {
                Live.medal.updateMedalList();
                Live.medal.updateWearedMedal();
            }
        };
        Live.init = {
            do: () => {
                Live.init.localStorage();
                Live.init.ad();
                Live.init.userInfo((user) => {
                    if (store.get('bilibili_helper_login', 'login')) {
                        const shortId = Live.getRoomIdByUrl();
                        if (shortId && !isNaN(shortId)) {
                            /* get options*/

                            chrome.runtime.sendMessage({
                                command: 'getOption',
                                key: 'version'
                            }, (response) => {
                                Live.version = response.value;
                                let version = store.get('bilibili_helper_version');
                                if (!version || version != Live.version) {
                                    store.set('bilibili_helper_version', Live.version);
                                }
                                $('.seeds-wrap').prepend('<div class="version"><span title="version: ' + Live.version + '">哔哩哔哩助手</span> by <a href="http://weibo.com/guguke" target="_blank">@啾咕咕www</a> <a href="http://weibo.com/ruo0037" target="_blank">@沒睡醒的肉啊</a></div>');
                                Live.init.style();

                                Live.addScriptByText('(function(){const urlId = parseInt(/^\\\/([\\d]+)/.exec(location.pathname)[1], 10); if (urlId && !isNaN(urlId)) {var a=function(f,d,c){if(!window.localStorage||!f){return}var e=window.localStorage;if(!e[f]){e[f]=JSON.stringify({})}var b=JSON.parse(e[f]);if(c==undefined){e[f]=typeof d=="string"?d.trim():JSON.stringify(d)}else{b[d]=typeof c=="string"?c.trim():JSON.stringify(c);e[f]=JSON.stringify(b)}};a("bilibili_helper_live_roomId",urlId,window.BilibiliLive.ROOMID);a("bilibili_helper_live_danmu_rnd",urlId,DANMU_RND);}})();');
                                Live.roomId = Live.getRoomId();
                                Live.getRoomInfo().done((data) => {
                                    Live.medal.init();
                                    Live.init.giftList();
                                    Live.roomInfo = data.data;
                                    Live.getAnchorInRoom().done((res) => {
                                        if (res.code === 0) {
                                            Object.assign(Live.roomInfo, res.data);
                                        }
                                    });
                                    Live.roomInfo.roomShortId = location.pathname.substr(1);

                                    // function init
                                    setTimeout(() => {
                                        Live.doSign.init();
                                        Live.chat.init();
                                        Live.notise.init();
                                        Live.giftpackage.init();
                                        // Live.bet.init();
                                        // Live.beat.init();
                                        Live.treasure.init();
                                        Live.watcher.init();
                                    }, 2500);
                                    setTimeout(() => {
                                        Live.addScriptByFile('live-content-script.min.js', Live.scriptOptions);
                                    }, 5000);
                                    Notification.requestPermission();
                                });
                            });
                        }
                    }
                });
            },
            style: () => {
                // init stylesheet
                let l = $('document').find('#bilibiliHelperLive');
                if (l.length) {
                    l.remove();
                }
                Live.init.inject_css('bilibiliHelperLive', 'live.min.css');
            },
            inject_css: (name, filename) => {
                let styleLink = document.createElement('link');
                styleLink.setAttribute('id', name);
                styleLink.setAttribute('type', 'text/css');
                styleLink.setAttribute('rel', 'stylesheet');
                styleLink.setAttribute('href', chrome.extension.getURL(filename));
                if (document.head) {
                    document.head.appendChild(styleLink);
                } else {
                    document.documentElement.appendChild(styleLink);
                }
            },
            ad: () => {
                chrome.runtime.sendMessage({
                    command: 'getAd'
                }, (response) => {
                    if (response.value === 'on') {
                        Live.init.inject_css('bilibiliHelperAdStyle', 'bilibiliHelperAd.min.css');
                    }
                });
            },
            giftList: () => {
                let giftsDom = $('.gifts-ctnr .gift-item[role=listitem]');
                if (giftsDom.length > 0) {
                    for (let i = 0; i < giftsDom.length; ++i) {
                        let gift = $(giftsDom[i]);
                        let giftId = gift.attr('data-gift-id');
                        if (!isNaN(parseInt(giftId))) {
                            Live.giftList[giftId] = {
                                title: gift.attr('data-title'),
                                type: gift.attr('data-type'),
                                description: gift.attr('data-desc')
                            };
                        }
                    }
                }
            },
            clearLocalStorage: () => {
                store.delete('bilibili_helper_quiz_bet', Live.roomId);
                store.delete('bilibili_helper_quiz_check', Live.roomId);
                store.delete('bilibili_helper_quiz_number', Live.roomId);
                store.delete('bilibili_helper_quiz_rate', Live.roomId);
                store.delete('bilibili_helper_quiz_which', Live.roomId);
                store.delete('bilibili_helper_doSign');
                store.delete('bilibili_helper_userInfo');
            },
            localStorage: () => {
                Live.init.clearLocalStorage();
                /* install init*/
                if (store.has('bilibili_helper_init')) {
                    Live.hasInit = true;
                } else {
                    store.set('bilibili_helper_init', true);
                }
                if (!store.has('bilibili_helper_live_roomId')) {
                    store.set('bilibili_helper_live_roomId', {});
                }

                /* sign*/
                !store.has('bilibili_helper_doSign') && store.set('bilibili_helper_doSign', {});
                !store.has('bilibili_helper_userInfo') && store.set('bilibili_helper_userInfo', {});

                /* treasure*/
                !store.has('bilibili_helper_treasure_silver_count') && store.set('bilibili_helper_treasure_silver_count', 0);

                /* chat*/
                !store.has('bilibili_helper_chat_display') && store.set('bilibili_helper_chat_display', {});

                /* small tv*/
                !store.has('bilibili_helper_tvs_count') && store.set('bilibili_helper_tvs_count', 0);
                !store.has('bilibili_helper_tvs_reward') && store.set('bilibili_helper_tvs_reward', {});

                /* lottery*/
                !store.has('bilibili_helper_lottery_count') && store.set('bilibili_helper_lottery_count', 0);
                !store.has('bilibili_helper_lottery_reward') && store.set('bilibili_helper_lottery_reward', {});
                !store.has('bilibili_helper_lottery_reward_list') && store.set('bilibili_helper_lottery_reward_list', {});

                /* bet*/
                // !store.has('bilibili_helper_quiz_autoMode') && store.set('bilibili_helper_quiz_autoMode', {});
                // !store.has('bilibili_helper_quiz_check') && store.set('bilibili_helper_quiz_check', {});
                // !store.has('bilibili_helper_quiz_bet') && store.set('bilibili_helper_quiz_bet', {});
                // !store.has('bilibili_helper_quiz_rate') && store.set('bilibili_helper_quiz_rate', {});
                // !store.has('bilibili_helper_quiz_number') && store.set('bilibili_helper_quiz_number', {});
                // !store.has('bilibili_helper_quiz_which') && store.set('bilibili_helper_quiz_which', {});

                /* beat*/
                // !store.has('bilibili_helper_beat_history') && store.set('bilibili_helper_beat_history', {});
                !store.has('bilibili_helper_beat_roomList') && store.set('bilibili_helper_beat_roomList', []);

                // var tv_reward = store.get('bilibili_helper_tvs_reward');
                // var tv_count = store.get('bilibili_helper_tvs_count');
                // Live.addScriptByText('(function(){window.localStorage.clear();})();');
                // store.set('bilibili_helper_version', Live.version);
                // store.set('bilibili_helper_tvs_reward', tv_reward);
                // store.set('bilibili_helper_tvs_count', tv_count);
            },
            userInfo: (callback) => {
                Live.getUser().done((user) => {
                    if (user.code === 'REPONSE_OK') {
                        let userData = user.data;
                        $.ajax({
                            dataType: 'json',
                            url: '//space.bilibili.com/ajax/member/MyInfo'
                        }).promise().done((res) => {
                            userData = Object.assign({}, userData, res.data);
                            store.set('bilibili_helper_userInfo', userData);
                            Live.user = userData;
                            store.set('bilibili_helper_login', true);
                            if (callback && typeof callback === 'function') {
                                callback(userData);
                            }
                        });
                    } else if (user.code === -101) {
                        store.remove('bilibili_helper_userInfo');
                    }
                });
            }
        };
        Live.init.do();
    }
})();
