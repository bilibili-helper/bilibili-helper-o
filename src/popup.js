let bkg_page = chrome.extension.getBackgroundPage();
console.warn(bkg_page);

function getDynamic() {
    bkg_page.chrome.cookies.get({
        url: 'http://interface.bilibili.com/',
        name: 'DedeUserID',
    }, function(cookie) {
        if (cookie === null) {
            $('#go_dynamic').html(chrome.i18n.getMessage('goDynamic') + chrome.i18n.getMessage('notLogged'));
        } else if (bkg_page.getOption('updates') > 0) {
            $('#go_dynamic').html(chrome.i18n.getMessage('goDynamic') + '<span class="red">' + chrome.i18n.getMessage('nNewUpdate').replace('%n', bkg_page.getOption('updates')) + '</span>');
        } else {
            $('#go_dynamic').html(chrome.i18n.getMessage('goDynamic'));
        }
    });
}

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
            url: 'http://www.bilibili.com/',
        });
        return false;
    });
    $('#go_bili_live').click(function() {
        chrome.tabs.create({
            url: 'http://live.bilibili.com/',
        });
        return false;
    });
    $('#go_dynamic').click(function() {
        bkg_page.chrome.browserAction.setBadgeText({
            text: '',
        });
        bkg_page.setOption('updates', 0);
        chrome.tabs.create({
            url: 'http://www.bilibili.com/account/dynamic',
        });
        return false;
    });
    $('#go_favorite').click(function() {
        chrome.tabs.create({
            url: 'http://space.bilibili.com/#!/favlist',
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
                url: 'http://www.bilibili.com/video/' + value,
            });
        } else if (/[0-9]+/g.test(value)) {
            chrome.tabs.create({
                url: 'http://www.bilibili.com/video/av' + value,
            });
        } else {
            $('#video_id').val('').focus();
        }
        return false;
    });
});
