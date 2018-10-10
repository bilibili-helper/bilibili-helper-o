let BKG_PAGE = chrome.extension.getBackgroundPage();
// console.warn(bkg_page);

function getDynamic() {
    BKG_PAGE.chrome.cookies.get({
        url: 'http://interface.bilibili.com/',
        name: 'DedeUserID',
    }, function(cookie) {
        if (cookie === null) {
            $('#go_dynamic').html(chrome.i18n.getMessage('goDynamic') + chrome.i18n.getMessage('notLogged'));
        } else if (BKG_PAGE.getOption('updates') > 0) {
            $('#go_dynamic').html(chrome.i18n.getMessage('goDynamic') + '<span class="red">' + chrome.i18n.getMessage('nNewUpdate').replace('%n', BKG_PAGE.getOption('updates')) + '</span>');
        } else {
            $('#go_dynamic').html(chrome.i18n.getMessage('goDynamic'));
        }
    });
}
let dynamic_url = 'https://www.bilibili.com/account/dynamic';
chrome.runtime.sendMessage({
    command: 'getOption',
    key: 'new-dynamic',
}, (response) => {
    if (response['value'] === 'on') {
        dynamic_url = 'https://t.bilibili.com/';
    }
});

$(document).ready(function() {
    $('#go_bili').html(chrome.i18n.getMessage('goBili'));
    $('#go_bili_live').html(chrome.i18n.getMessage('goBiliLive'));
    $('#go_video').html(chrome.i18n.getMessage('goVideo'));
    $('#go_option').html(chrome.i18n.getMessage('goOption'));
    $('#go_favorite').html(chrome.i18n.getMessage('goFavorite'));
    getDynamic();
    setTimeout(function() {
        $('button').blur();
        $('#video_id').focus();
    }, 100);
    $('#go_bili').click(function() {
        chrome.tabs.create({
            url: 'https://www.bilibili.com/',
        });
        return false;
    });
    $('#go_bili_live').click(function() {
        chrome.tabs.create({
            url: 'https://live.bilibili.com/',
        });
        return false;
    });
    $('#go_dynamic').click(function() {
        BKG_PAGE.chrome.browserAction.setBadgeText({
            text: '',
        });
        BKG_PAGE.setOption('updates', 0);
        chrome.tabs.create({
            url: dynamic_url,
        });
        return false;
    });
    $('#go_favorite').click(function() {
        chrome.tabs.create({
            url: 'https://space.bilibili.com/#!/favlist',
        });
        return false;
    });
    $('#go_option').click(function() {
        chrome.tabs.create({
            url: chrome.extension.getURL('options.html'),
        });
        return false;
    });
    $('#video_id').keyup(function(e) {
        if (e.keyCode === 13) {
            $('#go_video').click();
        }
    });
    $('#go_video').click(function() {
        let value = $('#video_id').val().toLowerCase();
        if (/av[0-9]+/g.test(value)) {
            chrome.tabs.create({
                url: 'https://www.bilibili.com/video/' + value,
            });
        } else if (/[0-9]+/g.test(value)) {
            chrome.tabs.create({
                url: 'https://www.bilibili.com/video/av' + value,
            });
        } else {
            $('#video_id').val('').focus();
        }
        return false;
    });
});
