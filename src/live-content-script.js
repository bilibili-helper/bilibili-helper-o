let Live = {
    setInterval: function(object, func, timeout) {
        let a = setInterval(function() {
            if (object && typeof func === 'function') {
                func();
                clearInterval(a);
            }
        }, timeout);
    },
    set: function(n, k, v) {
        if (!window.localStorage || !n) {
            return;
        }
        let storage = window.localStorage;
        if (!storage[n]) {
            storage[n] = JSON.stringify({});
        }
        let l = JSON.parse(storage[n]);
        if (v === undefined) {
            storage[n] = typeof k === 'string' ? k.trim() : JSON.stringify(k);
        } else {
            l[k] = typeof v === 'string' ? v.trim() : JSON.stringify(v);
            storage[n] = JSON.stringify(l);
        }
    },
};
console.warn('%c弹幕监控脚本 插入成功㇏(°ω° )ノ♪~');
let event = document.createEvent('Event');
event.initEvent('sendMessage', true, true);
let sendMessage = function(json) {
    let message = JSON.stringify(json);
    Live.set('bilibili_helper_message', message);
    document.dispatchEvent(event);
};
let options = document.getElementById('bilibiliHelperScript').getAttribute('options');
if (options !== '{}') {
    options = JSON.parse(options);
}
// treause
if (options['treasure']) {
    Live.setInterval(window.refreshCaptcha, function() {
        window.refreshCaptcha = function() {
            $('#captchaImg').attr('src', 'http://live.bilibili.com/freeSilver/getCaptcha?ts=' + Date.now());
        };
    }, 1000);
}
if (options['chat']) {
    let text = '';

    let sendDamu = function() {
        if (text.length > 0) {
            let colorStr = $('.color-select-panel').attr('data-dd');
            let mode = $('.mode-select-panel').find('a.active').attr('class').split(' ', 3)[1];
            window.LivePlayer.sendMsg(text.substr(0, options['chat']['maxLength']), colorStr, options['chat']['danmuMode'][mode]);
            text = text.substr(options['chat']['maxLength']);
            if (text.length > 0) {
                setTimeout(function() {
                    sendDamu();
                }, 4000);
            }
        }
    };
    $('.helper-send-btn').on('click', function(e) {
        e.preventDefault();
        if ($('.helper-text-area').val() !== '') {
            if (text.length === 0) {
                text = $('.helper-text-area').val().trim();
                $('.helper-text-area').val('');

                // /*beat*/
                // doBeat(Live.chat.text);

                sendDamu();
            } else {
                text += $('.helper-text-area').val();
                $('.helper-text-area').val('');
            }

            $('.danmu-length-count').text('0 / 1 + 0');
        } else {
            window.liveToast($('.helper-send-btn'), 'info', '请输入弹幕后再发送~');
        }
    });
}
// giftpackage
// if (options['giftpackage']){
//     Live.setInterval(window.flash_giftPackageOpen, function () {
//         window.flash_giftPackageOpen = function () {
//             $(".items-package").click();
//         };
//     }, 1000);
// }
// beat
// if (options['beat']) {
//     Live.setInterval(window.sendBeatStorm, function () {
//         var b = window.sendBeatStorm;
//         window.sendBeatStorm = function (json) {
//             b(json);
//             var beat = json.content;
//             $.ajax({ url: "http://live.bilibili.com/msg/send", type: "post", data: { color: 16777215, fontsize: 25, mode: 1, msg: beat, rnd: new Date().getTime(), roomid: window.ROOMID } })
//         };
//     }, 1000);
// }
// watcher
if (options['watcher']) {
    Live.setInterval(window.protocol, function() {
        Live.setInterval(window.protocol.SYS_MSG, function() {
            let b = window.protocol.SYS_MSG;
            window.protocol.SYS_MSG = function(json) {
                b(json);
                sendMessage(json);
            };
        }, 500);
        // Live.setInterval(window.protocol.SYS_GIFT, function() {
        //     let b = window.protocol.SYS_GIFT;
        //     window.protocol.SYS_GIFT = function(json) {
        //         b(json);
        //         sendMessage(json);
        //     };
        // }, 500);
        // Live.setInterval(window.protocol.TV_END, function () {
        //     var b = window.protocol.TV_END;
        //     window.protocol.TV_END = function (json) {
        //         b(json);
        //         sendMessage(json);
        //     };
        // }, 500);
    }, 1000);
    // Live.setInterval(window.liveRoomFuncs, function() {
        // Live.setInterval(window.liveRoomFuncs.addDanmu, function() {
        //     let b = window.liveRoomFuncs.addDanmu;
        //     window.liveRoomFuncs.addDanmu = function(json) {
        //         b(json);
        //         sendMessage(json);
        //     };
        // }, 500);
        // Live.setInterval(window.liveRoomFuncs.addGift, function() {
        //     let b = window.liveRoomFuncs.addGift;
        //     window.liveRoomFuncs.addGift = function(json) {
        //         b(json);
        //         sendMessage(json);
        //     };
        // }, 500);
    // }, 1000);
}
// var html = $(e.target).html();
// var reg = new RegExp('([\\d]+)s');
// var timer = reg.exec(html);
// var getBeat = function (roomId) {return $.get('http://live.bilibili.com/SpecialGift/room/' + window.ROOMID, {}, function () {}, 'json').promise();};
// $('#player-container').on('DOMNodeInserted', function (e) {
//     getBeat().done(function (data) {
//         if (data.code == 0 && data.data['39'].hadJoin == 0) {
//             console.log(data.data['39'].hadJoin);
//             $.ajax({ url: "http://live.bilibili.com/msg/send", type: "post", data: { color: 16777215, fontsize: 25, mode: 1, msg: data.data['39'].content, rnd: new Date().getTime(), roomid: window.ROOMID } })
//         }
//     });
// });
// $('.activity-lottery').on('DOMNodeInserted', function(e) {
//     $('.lottery-box').click();
// });
