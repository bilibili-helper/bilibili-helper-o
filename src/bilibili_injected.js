/* global filenameSanitize: false,
   generateASS: false, setPosition: false, parseXML: false */
(function() {
    if ($('html').hasClass('bilibili-helper')) {
        return false;
    }
    let biliHelper = {};
    biliHelper.eval = function(fn) {
        let Fn = Function;
        return new Fn('return ' + fn)();
    };
    if (document.location.pathname === '/blackboard/html5player.html') {
        biliHelper.site = 2;
    } else if (location.hostname === 'bangumi.bilibili.com') {
        biliHelper.site = 1;
        biliHelper.sameVideo = false;
    } else if (location.hostname === 'www.bilibili.com') {
        biliHelper.site = 0;
    } else {
        return false;
    }
    biliHelper.protocol = location.protocol;
    function formatInt(Source, Length) {
        let strTemp = '';
        for (let i = 1; i <= Length - (Source + '').length; i++) {
            strTemp += '0';
        }
        return strTemp + Source;
    }

    function parseSafe(text) {
        return ('' + text).replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    function parseTime(timecount) {
        return formatInt(parseInt(timecount / 60000), 2) + ':' + formatInt(parseInt((timecount / 1000) % 60), 2);
    }

    function inject_css(name, filename) {
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
    }

    function removeAd() {
        chrome.runtime.sendMessage({
            command: 'getAd',
        }, function(response) {
            if (response.value === 'on') {
                inject_css('bilibiliHelperAdStyle', 'bilibiliHelperAd.min.css');
            }
        });
    }
    removeAd();
    function initStyle() {
        inject_css('bilibiliHelperVideo', 'bilibiliHelperVideo.min.css');
        $('.arc-toolbar .helper .t .icon').css('background-image', 'url(' + chrome.extension.getURL('imgs/helper-neko.png') + ')');
    }
    function setWide() {
        let player = $('#bofqi');
        let doit = ()=>{
            if (!player.hasClass('wide')) {
                let html5WidthButton = $('.bilibili-player-iconfont-widescreen');
                player.addClass('wide');
                if (html5WidthButton.length === 0) {
                    let flashvars = player.find('param[name=flashvars]');
                    flashvars.val(flashvars.val() + '&as_wide=1');
                    $('#player_placeholder').attr('data', $('#player_placeholder').attr('data'));
                } else if (document.location.pathname === '/blackboard/html5player.html' || html5WidthButton.length > 0) {
                    html5WidthButton.click();
                }
            }
        };
        setTimeout(()=>{
            doit();
        }, 2000);
        let observer = new MutationObserver(function() {
            setTimeout(()=>{
                doit();
            }, 2000);
        });
        if (player.length > 0) {
            observer.observe(player[0], {childList: true});
        }
    }
    function setOffset() {
        $(document).scrollTop($('.b-page-body').offset().top);
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        switch (request.command) {
        case 'update':
            removeAd();
            sendResponse({
                result: 'ok',
            });
            return true;
        case 'error':
            return true;
        default:
            sendResponse({
                result: 'unknown',
            });
            return false;
        }
    });

    let removeExtensionParam = function(url) {
        return url.replace(/platform=bilihelper&?/, '');
    };

    let finishUp = function() {
        chrome.runtime.sendMessage({
            command: 'getDownloadLink',
            cid: biliHelper.cid,
        }, function(response) {
            let videoDownloadLink = response['download'],
                videoPlaybackLink = response['playback'];
            biliHelper.downloadUrls = [];
            biliHelper.playbackUrls = [];
            if (typeof videoDownloadLink.durl['url'] === 'undefined') {
                biliHelper.downloadUrls = videoDownloadLink.durl;
            } else {
                biliHelper.downloadUrls.push(videoDownloadLink.durl);
            }
            if (typeof videoPlaybackLink.durl === 'undefined' || typeof videoPlaybackLink.durl['url'] === 'undefined') {
                biliHelper.playbackUrls = videoPlaybackLink.durl;
            } else {
                biliHelper.playbackUrls.push(videoPlaybackLink.durl);
            }
            if (typeof biliHelper.downloadUrls !== 'object' || !biliHelper.downloadUrls.length) {
                let errorMessage = biliHelper.error || '视频地址获取失败';
                biliHelper.mainBlock.downloaderSection.find('p').html('<span></span>' + parseSafe(errorMessage));
            } else {
                biliHelper.mainBlock.downloaderSection.find('p').empty();
                for (let i = 0; i < biliHelper.downloadUrls.length; i++) {
                    let segmentInfo = biliHelper.downloadUrls[i];
                    if (typeof segmentInfo === 'object') {
                        let downloadOptions = getDownloadOptions(removeExtensionParam(segmentInfo.url),
                          getNiceSectionFilename(biliHelper.avid,
                            biliHelper.page, biliHelper.totalPage,
                            i, biliHelper.downloadUrls.length)),
                            $bhDownLink = $('<a class="b-btn w" rel="noreferrer"></a>')
                              .text('分段 ' + (parseInt(i) + 1))
                              // Set download attribute to better file name. When use "Save As" dialog, this value gets respected even the target is not from the same origin.
                              .data('download', downloadOptions.filename)
                              .attr('title', isNaN(parseInt(segmentInfo.filesize / 1048576 + 0.5)) ? ('长度: ' + parseTime(segmentInfo.length)) : ('长度: ' + parseTime(segmentInfo.length) + ' 大小: ' + parseInt(segmentInfo.filesize / 1048576 + 0.5) + ' MB'))
                              .attr('href', removeExtensionParam(segmentInfo.url));
                        biliHelper.mainBlock.downloaderSection.find('p').append($bhDownLink);
                        // register a callback that can talk to extension background
                        $bhDownLink.click(function(e) {
                            e.preventDefault();
                            chrome.runtime.sendMessage({
                                command: 'requestForDownload',
                                url: $(e.target).attr('href'),
                                filename: $(e.target).data('download'),
                            });
                        });
                    }
                }
                if (biliHelper.downloadUrls.length > 1) {
                    let $bhDownAllLink = $('<a class="b-btn"></a>').text('下载全部共 ' + biliHelper.downloadUrls.length + ' 个分段');
                    biliHelper.mainBlock.downloaderSection.find('p').append($bhDownAllLink);
                    $bhDownAllLink.click(function(e) {
                        biliHelper.mainBlock.downloaderSection.find('p .b-btn.w').click();
                    });
                }
        // biliHelper.mainBlock.downloaderSection.find('p').append($('<a class="b-btn" target="_blank" href="http://bilibili.audio/' + biliHelper.avid + '/' + biliHelper.page + '"></a>').text('抽出并下载音频'));
            }
      // if (biliHelper.playbackUrls && biliHelper.playbackUrls.length === 1) {
      //   biliHelper.mainBlock.switcherSection.find('a[type="html5"]').removeClass('hidden');
      // }
      // $('#loading-notice').fadeOut(300);
      // if (biliHelper.favorHTML5 && localStorage.getItem('bilimac_player_type') !== 'force' && biliHelper.cid && biliHelper.playbackUrls && biliHelper.playbackUrls.length === 1 && biliHelper.playbackUrls[0].url.indexOf('m3u8') < 0) {
      //   $('#loading-notice').fadeOut(300, function() {
      //     biliHelper.switcher.html5();
      //   });
      // } else if (biliHelper.replacePlayer) {
      //   $('#loading-notice').fadeOut(300, function() {
      //     biliHelper.switcher.swf();
      //   });
      // } else {
      //   $('#loading-notice').fadeOut(300, function() {
      //     biliHelper.switcher.original();
      //   });
      // }
        });
    };
    let initHelper = function() {
        biliHelper.videoPic = $('img.cover_image').attr('src');
        biliHelper.totalPage = $('#dedepagetitles option').length;
        $('.v1-bangumi-info-operate .helper').remove();
        if (typeof biliHelper.page === 'undefined') {
            biliHelper.page = 1;
        } else {
            biliHelper.page = parseInt(biliHelper.page);
        }
        biliHelper.pageOffset = 0;
        chrome.runtime.sendMessage({
            command: 'init',
        }, function(response) {
            // biliHelper.playerConfig = response.playerConfig;
            biliHelper.version = response.version;
            biliHelper.autowide = response.autowide;
            biliHelper.autooffset = response.autooffset;
            // biliHelper.favorHTML5 = response.html5 === 'on';
            // biliHelper.replaceEnabled = response.replace === 'on';
            biliHelper.originalPlayer = localStorage.getItem('bilimac_original_player') || $('#bofqi').html();
            localStorage.removeItem('bilimac_original_player');
            biliHelper.switcher = {
                current: 'original',
                set: function(newMode) {
                    if (biliHelper.mainBlock.switcherSection) {
                        biliHelper.mainBlock.switcherSection.find('a.b-btn[type="' + this.current + '"]').addClass('w');
                        biliHelper.mainBlock.switcherSection.find('a.b-btn[type="' + newMode + '"]').removeClass('w');
                    }
                    this.current = newMode;
                },
                original: function() {
                    this.set('original');
                    $('#bofqi').html(biliHelper.originalPlayer);
                },
                bilimac: function() {
                    this.set('bilimac');
                    $('#bofqi').html('<div id="player_placeholder" class="player"></div><div id="loading-notice">正在加载 Bilibili Mac 客户端…</div>');
                    $('#bofqi').find('#player_placeholder').css({
                        'background': 'url(' + biliHelper.videoPic + ') 50% 50% / cover no-repeat',
                        '-webkit-filter': 'blur(20px)',
                        'overflow': 'hidden',
                        'visibility': 'visible',
                    });
                    chrome.runtime.sendMessage({
                        command: 'callBilibiliMac',
                        data: {
                            action: 'playVideoByCID',
                            data: biliHelper.cid + '|' + window.location.href + '|' + document.title + '|' + (biliHelper.cidHack === 2 ? 2 : 1),
                        },
                    }, function(succ) {
                        if (succ) {
                            $('#bofqi').find('#loading-notice').text('已在 Bilibili Mac 客户端中加载');
                        } else {
                            $('#bofqi').find('#loading-notice').text('调用 Bilibili Mac 客户端失败 :(');
                        }
                    });
                },
            };
            if (biliHelper.site === 0) {
                biliHelper.helperBlock = $('<div class="block helper" id="bilibili_helper"><span class="t"><div class="icon"></div><div class="t-right"><span class="t-right-top middle">助手</span><span class="t-right-bottom">扩展菜单</span></div></span><div class="info"><div class="main"></div><div class="version" title="' + biliHelper.version + '">哔哩哔哩助手 by <a href="http://weibo.com/guguke" target="_blank">@啾咕咕</a> <a href="http://weibo.com/ruo0037" target="_blank">@肉肉</a><a class="setting b-btn w" href="' + chrome.extension.getURL('options.html') + '" target="_blank">设置</a></div></div></div>');
                biliHelper.helperBlock.find('.t').click(function() {
                    biliHelper.helperBlock.toggleClass('active');
                });
            } else if (biliHelper.site === 1) {
                biliHelper.helperBlock = $('<span class="helper"><div class="v1-bangumi-info-btn" id="bilibili_helper">哔哩哔哩助手</div><div class="info"><div class="main"></div><div class="version" title="' + biliHelper.version + '">哔哩哔哩助手 by <a href="http://weibo.com/guguke" target="_blank">@啾咕咕</a> <a href="http://weibo.com/ruo0037" target="_blank">@肉肉</a><a class="setting b-btn w" href="' + chrome.extension.getURL('options.html') + '" target="_blank">设置</a></div></div></span>');
                biliHelper.helperBlock.find('.v1-bangumi-info-btn').click(function() {
                    biliHelper.helperBlock.toggleClass('active');
                });
            }
            let blockInfo = biliHelper.helperBlock.find('.info');
            biliHelper.mainBlock = blockInfo.find('.main');
            biliHelper.mainBlock.infoSection = $('<div class="section video hidden"><h3>视频信息</h3><p><span></span><span>aid: ' + biliHelper.avid + '</span><span>pg: ' + biliHelper.page + '</span></p></div>');
            biliHelper.mainBlock.append(biliHelper.mainBlock.infoSection);
            biliHelper.mainBlock.dblclick(function(e) {
                if (e.shiftKey) {
                    biliHelper.mainBlock.infoSection.toggleClass('hidden');
                }
            });
      // if (biliHelper.redirectUrl && biliHelper.redirectUrl !== "undefined") {
      //   biliHelper.mainBlock.redirectSection = $('<div class="section redirect"><h3>生成页选项</h3><p><a class="b-btn w" href="' + biliHelper.redirectUrl + '">前往原始跳转页</a></p></div>');
      //   biliHelper.mainBlock.append(biliHelper.mainBlock.redirectSection);
      // }
      // if (biliHelper.redirectUrl) {
      //   biliHelper.mainBlock.switcherSection.find('a[type="original"]').addClass('hidden');
      //   biliHelper.mainBlock.switcherSection.find('a[type="swf"],a[type="iframe"]').removeClass('hidden');
      // }
            if (localStorage.getItem('bilimac_player_type')) {
                biliHelper.mainBlock.switcherSection = $('<div class="section switcher"><h3>播放器切换</h3><p></p></div>');
                biliHelper.mainBlock.switcherSection.find('p').append($('<a class="b-btn w" type="original">原始播放器</a><a class="b-btn w" type="bilimac">Mac 客户端</a>').click(function() {
                    biliHelper.switcher[$(this).attr('type')]();
                }));
                biliHelper.mainBlock.append(biliHelper.mainBlock.switcherSection);
            }
            biliHelper.mainBlock.downloaderSection = $('<div class="section downloder"><h3>视频下载</h3><p><span></span>视频地址获取中，请稍等…</p></div>');
            biliHelper.mainBlock.append(biliHelper.mainBlock.downloaderSection);
            biliHelper.mainBlock.querySection = $('<div class="section query"><h3>弹幕发送者查询</h3><p><span></span>正在加载全部弹幕, 请稍等…</p></div>');
            biliHelper.mainBlock.append(biliHelper.mainBlock.querySection);

            biliHelper.switcher.set('original');
            if (response.autowide === 'on') {
                setWide();
            }
            if (biliHelper.site === 0) {
                $('.player-wrapper .arc-toolbar').append(biliHelper.helperBlock);
            } else if (biliHelper.site === 1) {
                $('.v1-bangumi-info-operate .v1-app-btn').after(biliHelper.helperBlock);
            }
            $(document).ready(biliHelperFunc);
            initStyle();
        });
    };

    if (typeof $ === 'function' && $('.player-wrapper .v-plist').length) {
        let prob = document.createElement('script');
        prob.id = 'page-prob';
        prob.innerHTML = '$(\'.player-wrapper .v-plist\').attr(\'length\', window.VideoPart.nodedata.length);$(\'#page-prob\').remove();';
        document.body.appendChild(prob);
    }
    $('html').addClass('bilibili-helper');
    let bili_reg, urlResult, hashPage;
    if (biliHelper.site === 0) {
        bili_reg = /\/video\/av([0-9]+)\/(?:index_([0-9]+)\.html)?.*?$/;
        urlResult = bili_reg.exec(document.location.pathname);
        hashPage = (/page=([0-9]+)/).exec(document.location.hash);
        if (hashPage && typeof hashPage === 'object' && !isNaN(hashPage[1])) {
            hashPage = parseInt(hashPage[1]);
        }
        if (urlResult) {
            biliHelper.avid = urlResult[1];
            biliHelper.page = hashPage || urlResult[2];
        }
        if (biliHelper.avid) {
            initHelper();
        }
    } else if (biliHelper.site === 1) {
        let playerBlock = $('#bofqi')[0];
        if (playerBlock) {
            let observer = new MutationObserver(function() {
                if ($('iframe.player').length || $('.scontent object param[name="flashvars"]').length) {
                    urlResult = $('.scontent object param[name="flashvars"]').attr('value') || $('iframe.player').attr('src');
                    if (urlResult) {
                        let search = urlResult.split('&').map(function(searchPart) {
                            return searchPart.split('=', 2);
                        });
                        search.forEach(function(param) {
                            let key = param[0], value = param[1];
                            if (key === 'aid') {
                                biliHelper.avid = value;
                            } else if (key === 'cid') {
                                biliHelper.cid = value;
                            } else if (key === 'seasonId') {
                                biliHelper.seasonId = value;
                            } else if (key === 'episodeId') {
                                if (biliHelper.episodeId === value) {
                                    biliHelper.sameVideo = true;
                                } else {
                                    biliHelper.sameVideo = false;
                                }
                                biliHelper.episodeId = value;
                            }
                        });
                        if (biliHelper.sameVideo === false) {
                            initHelper();
                        }
                        // observer.disconnect();
                    }
                }
            });
            observer.observe(playerBlock, {childList: true});
        }
    } else if (biliHelper.site === 2) {
        chrome.runtime.sendMessage({
            command: 'init',
        }, function(response) {
            if (response.autowide === 'on') {
                setWide();
            }
        });
    }
    biliHelper.work = function() {
        chrome.runtime.sendMessage({
            command: 'getVideoInfo',
            avid: biliHelper.avid,
            pg: biliHelper.page + biliHelper.pageOffset,
        }, function(response) {
            let videoInfo = response.videoInfo;
            if (typeof videoInfo.cid === 'number' && $('.b-page-body .viewbox').length === 0 && $('.main-inner .viewbox').length === 0) {
                biliHelper.genPage = true;
                biliHelper.copyright = true;
            }
            biliHelper.videoPic = videoInfo.pic;
            if (typeof biliHelper.totalPage === 'number' && biliHelper.totalPage > videoInfo.pages && biliHelper.pageOffset > videoInfo.pages - biliHelper.totalPage) {
                biliHelper.pageOffset = videoInfo.pages - biliHelper.totalPage;
                biliHelper.work();
                return false;
            }
            if (biliHelper.autowide === 'on') {
                setWide();
            }
            if (biliHelper.autooffset === 'on') {
                setOffset();
            }
            if (typeof videoInfo.code !== 'undefined') {
                if (biliHelper.page !== 1) {
                    chrome.runtime.sendMessage({
                        command: 'getVideoInfo',
                        avid: biliHelper.avid,
                        pg: 1,
                        isBangumi: (biliHelper.site === 1),
                    }, function(response) {
                        let firstVideoInfo = response.videoInfo;
                        if (firstVideoInfo.pages === biliHelper.page - 1) {
                            biliHelper.pageOffset -= 1;
                            biliHelper.work();
                            return false;
                        }
                    });
                } else {
                    biliHelper.error = '错误' + videoInfo.code + ': ' + videoInfo.error;
                    biliHelper.mainBlock.errorSection = $('<div class="section error"><h3>Cid 获取失败</h3><p><span></span><span>' + parseSafe(biliHelper.error) + '</span></p></div>');
                    biliHelper.mainBlock.append(biliHelper.mainBlock.errorSection);
                    $('#loading-notice').fadeOut(300);
                }
            } else {
                // if (!isNaN(biliHelper.cid) && biliHelper.originalPlayer) {
                    // biliHelper.originalPlayer.replace('cid=' + biliHelper.cid, 'cid=' + videoInfo.cid);
                // }
                if (biliHelper.cid === undefined) {
                    biliHelper.cid = videoInfo.cid;
                }
                if (biliHelper.site === 1) {
                    chrome.runtime.sendMessage({
                        command: 'getBangumiInfo',
                        episodeId: biliHelper.episodeId,
                    }, function(response) {
                        biliHelper.avid = response.videoInfo.avid;
                        biliHelper.cid = response.videoInfo.danmaku;
                        biliHelper.index = response.videoInfo.index;
                        createDanmuList();
                    });
                } else {
                    createDanmuList();
                }
            }
            function createDanmuList() {
                biliHelper.mainBlock.infoSection.find('p').append($('<span>cid: ' + biliHelper.cid + '</span>'));
                let commentDiv = $('<div class="section comment"><h3>弹幕下载</h3><p><a class="b-btn w" href="' + biliHelper.protocol + '//comment.bilibili.com/' + biliHelper.cid + '.xml">下载 XML 格式弹幕</a></p></div>');
                let url = biliHelper.protocol + '//comment.bilibili.com/' + biliHelper.cid + '.xml';
                let fileName = getNiceSectionFilename(biliHelper.avid, biliHelper.page, biliHelper.totalPage, 1, 1);
                let downloadFileName = getDownloadOptions(url, fileName).filename;
                commentDiv.find('a').attr('download', downloadFileName).click(function(e) {
                    e.preventDefault();
                    chrome.runtime.sendMessage({
                        command: 'requestForDownload',
                        url: $(e.target).attr('href'),
                        filename: $(e.target).attr('download'),
                    });
                });
                biliHelper.mainBlock.commentSection = commentDiv;
                biliHelper.mainBlock.append(biliHelper.mainBlock.commentSection);
                fetch(biliHelper.protocol + '//comment.bilibili.com/' + biliHelper.cid + '.xml').then((res) => res.text()).then(function(text) {
                    let parser = new DOMParser();
                    let response = parser.parseFromString(
                        text.replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/ug, ''), 'text/xml');
                    let assData = '\ufeff' + generateASS(setPosition(parseXML('', response)), {
                            'title': getNiceSectionFilename(biliHelper.avid, biliHelper.page, biliHelper.totalPage, 1, 1),
                            'ori': location.href,
                        }),
                        assBlob = new Blob([assData], {
                            type: 'application/octet-stream',
                        }),
                        assUrl = window.URL.createObjectURL(assBlob),
                        assBtn = $('<a class="b-btn w">下载 ASS 格式弹幕</a>').attr('download', downloadFileName.replace('.xml', '.ass')).attr('href', assUrl).data('data', assData).click(function(e) {
                            e.preventDefault();
                            chrome.runtime.sendMessage({
                                command: 'requestForDownload',
                                data: $(e.target).data('data'),
                                url: $(e.target).attr('href'),
                                filename: $(e.target).attr('download'),
                            });
                        });
                    biliHelper.mainBlock.commentSection.find('p').append(assBtn);
                    biliHelper.comments = response.getElementsByTagName('d');
                    let control = $('<div><input type="text" class="b-input" placeholder="根据关键词筛选弹幕"><div class="b-slt"><span class="txt">请选择需要查询的弹幕…</span><div class="b-slt-arrow"></div><ul class="list"><li disabled="disabled" class="disabled" selected="selected">请选择需要查询的弹幕</li></ul></div><span></span><span class="result">选择弹幕查看发送者…</span></div>');
                    control.find('.b-input').keyup(function() {
                        let keyword = control.find('input').val(),
                            regex = new RegExp(parseSafe(keyword), 'gi');
                        control.find('ul.list').html('<li disabled="disabled" class="disabled" selected="selected">请选择需要查询的弹幕</li>');
                        if (control.find('.b-slt .txt').text() !== '请选择需要查询的弹幕' && keyword.trim() !== '') {
                            control.find('.b-slt .txt').html(parseSafe(control.find('.b-slt .txt').text()));
                        }
                        if (keyword.trim() !== '') {
                            control.find('.b-slt .txt').text(control.find('.b-slt .txt').text());
                        }
                        let list = control.find('ul.list');
                        for (let i = 0; i < biliHelper.comments.length; i++) {
                            let node = biliHelper.comments[i],
                                text = node.childNodes[0];
                            if (text && node && regex.test(text.nodeValue)) {
                                text = text.nodeValue;
                                let li = $('<li></li>');
                                let commentData = node.getAttribute('p').split(','),
                                    sender,
                                    time,
                                    originalContent;
                                if (biliHelper.comments[i].senderUsername === undefined) {
                                    sender = commentData[6];
                                    biliHelper.comments[i].senderUsername = sender;
                                } else {
                                    sender = biliHelper.comments[i].senderUsername;
                                }
                                if (biliHelper.comments[i].time === undefined) {
                                    time = parseTime(parseInt(commentData[0]) * 1000);
                                    biliHelper.comments[i].time = time;
                                } else {
                                    time = biliHelper.comments[i].time;
                                }
                                if (biliHelper.comments[i].originalContent === undefined) {
                                    originalContent = parseSafe(text);
                                    biliHelper.comments[i].originalContent = originalContent;
                                } else {
                                    originalContent = biliHelper.comments[i].originalContent;
                                }
                                let content = '[' + time + '] ';
                                // if (biliHelper.comments[i].senderId !== undefined) {
                                //     content += '<a href="' + biliHelper.protocol + '//space.bilibili.com/' + biliHelper.comments[i].senderId + '" target="_blank">' + biliHelper.comments[i].senderUsername + '</a>';
                                //     li.addClass('result');
                                // }
                                li.attr({'sender': sender, 'index': i});
                                if (keyword.trim() === '') {
                                    content += originalContent;
                                } else {
                                    content += originalContent.replace(regex, function(kw) {
                                        return '<span class="kw">' + kw + '</span>';
                                    });
                                }
                                li.append(content).attr('title', originalContent);
                                if (node.error === true) {
                                    li.addClass('error');
                                }
                                list.append(li);
                            }
                        }
                        let t = document.createElement('script');
                        t.appendChild(document.createTextNode('UserCard.bind($("#bilibili_helper .query .list .result"));'));
                        document.body.appendChild(t);
                        t.parentNode.removeChild(t);
                        control.find('.b-slt .list li').on('click', (e)=>{
                            $('.b-slt .list').hide();
                            if (biliHelper.selectedDanmu) {
                                biliHelper.selectedDanmu.removeClass('selected');
                            }
                            let item = $(e.target);
                            biliHelper.selectedDanmu = item;
                            biliHelper.selectedDanmu.addClass('selected');
                            let sender = item.attr('sender'),
                                index = item.attr('index');
                            control.find('.result').text('查询中…');
                            if (sender.indexOf('D') === 0) {
                                control.find('.result').text('游客弹幕');
                                return;
                            }
                            let displayUserInfo = function(uid, data) {
                                biliHelper.comments[index].senderId = uid;
                                biliHelper.comments[index].senderUsername = parseSafe(data.name);
                                control.find('.result').html('发送者: <a href="' + biliHelper.protocol + '//space.bilibili.com/' + uid + '" target="_blank" data-usercard-mid="' + uid + '">' + parseSafe(data.name) + '</a><div target="_blank" class="user-info-level l' + parseSafe(data.level_info.current_level) + '"></div>');
                                let s = document.createElement('script');
                                s.appendChild(document.createTextNode('UserCard.bind($("#bilibili_helper .query .result"));'));
                                document.body.appendChild(s);
                                s.parentNode.removeChild(s);
                            };

                            let renderSender = function(uid) {
                                control.find('.result').html('发送者 UID: <a href="' + biliHelper.protocol + '//space.bilibili.com/' + uid + '" target="_blank">' + uid + '</a>');
                                let cachedData = sessionStorage.getItem('user/' + uid);
                                if (cachedData) {
                                    displayUserInfo(uid, JSON.parse(cachedData));
                                } else {
                                    $.getJSON(biliHelper.protocol + '//api.bilibili.com/cardrich?mid=' + uid + '&type=json', function(data) {
                                        if (data.code === 0) {
                                            let cardData = data.data.card;
                                            sessionStorage.setItem('user/' + uid, JSON.stringify({
                                                name: cardData.name,
                                                level_info: {
                                                    current_level: cardData.level_info.current_level,
                                                },
                                            }));
                                            displayUserInfo(uid, cardData);
                                        }
                                    });
                                }
                            };

                            let extracted = /^b(\d+)$/.exec(sender);
                            if (extracted) {
                                renderSender(extracted[1]);
                            } else {
                                $.get('https://biliquery.typcn.com/api/user/hash/' + sender, function(data) {
                                    if (!data || data.error !== 0 || typeof data.data !== 'object' || !data.data[0].id) {
                                        control.find('.result').text('查询失败, 发送用户可能已被管理员删除.');
                                        item.addClass('error');
                                        biliHelper.comments[index].error = true;
                                    } else {
                                        renderSender(data.data[0].id);
                                    }
                                }, 'json').fail(function() {
                                    control.find('.result').text('查询失败, 无法连接到服务器 :(');
                                });
                            }
                        });
                    });
                    control.find('.b-input').keyup();
                    control.find('.b-slt').on('mouseover', ()=>{
                        $('.b-slt .list').show();
                    }).on('mouseleave', ()=>{
                        $('.b-slt .list').hide();
                    });
                    biliHelper.mainBlock.querySection.find('p').empty().append(control);
                });
            }
            let c = null;

            window.postMessage ? (c = function(a) {
                'https://secure.bilibili.com' !== a.origin && 'https://ssl.bilibili.com' !== a.origin || 'secJS:' !== a.data.substr(0, 6) || biliHelper.eval(a.data.substr(6));
            }, window.addEventListener ? window.addEventListener('message', c, !1) : window.attachEvent && window.attachEvent('onmessage', c)) : setInterval(function() {
                let evalCode = window.__GetCookie('__secureJS');
                window.__SetCookie('__secureJS', '');
                biliHelper.eval(evalCode);
            }, 1000);

            if (!biliHelper.cid) {
                biliHelper.error = '错误' + videoInfo.code + ': ' + videoInfo.error;
                biliHelper.mainBlock.errorSection = $('<div class="section error"><h3>Cid 获取失败</h3><p><span></span><span>' + parseSafe(biliHelper.error) + '</span></p></div>');
                biliHelper.mainBlock.append(biliHelper.mainBlock.errorSection);
                return false;
            }

            finishUp();
        });
    };
    let biliHelperFunc = function() {
        biliHelper.totalPage = $('.player-wrapper .v-plist').attr('length');
        if (!isNaN(biliHelper.totalPage)) {
            biliHelper.totalPage = parseInt(biliHelper.totalPage);
        }
        if (localStorage.getItem('bilimac_player_type') === 'force') {
            biliHelper.switcher.set('bilimac');
        }
        localStorage.removeItem('bilimac_player_type');
        biliHelper.replacePlayer = false;
        biliHelper.work();

        window.addEventListener('hashchange', function() {
            let hashPage = (/page=([0-9]+)/).exec(document.location.hash);
            if (hashPage && typeof hashPage === 'object' && !isNaN(hashPage[1])) {
                hashPage = parseInt(hashPage[1]);
            }
            if (hashPage && hashPage !== biliHelper.page) {
                biliHelper.page = hashPage;
                biliHelper.mainBlock.infoSection.html('<h3>视频信息</h3><p><span></span><span>aid: ' + biliHelper.avid + '</span><span>pg: ' + biliHelper.page + '</span></p>');
                biliHelper.mainBlock.downloaderSection.html('<h3>视频下载</h3><p><span></span>视频地址获取中，请稍等…</p>');
                biliHelper.mainBlock.querySection.html('<h3>弹幕发送者查询</h3><p><span></span>正在加载全部弹幕, 请稍等…</p>');
                if (biliHelper.mainBlock.commentSection) {
                    biliHelper.mainBlock.commentSection.remove();
                }
                if (biliHelper.mainBlock.errorSection) {
                    biliHelper.mainBlock.errorSection.remove();
                }
                biliHelper.work();
            }
        }, false);
    };

    function getNiceSectionFilename(avid, page, totalPage, idx, numParts) {
    // TODO inspect the page to get better section name
        let idName = 'av' + avid + '_',
      // page/part name is only shown when there are more than one pages/parts
            pageIdName = (totalPage && (totalPage > 1)) ? ('p' + page + '_') : '',
            pageName = '',
            partIdName = (numParts && (numParts > 1)) ? ('' + idx + '_') : '';

    // try to find a good page name
        if (pageIdName) {
            pageName = $('.player-wrapper #plist > span').text();
            pageName = pageName.substr(pageName.indexOf('、') + 1) + '_';
        }
    // document.title contains other info feeling too much
        return idName + pageIdName + pageName + partIdName + $('div.v-title').text();
    }

  // Helper function, return object {url, filename}, options object used by
  // "chrome.downloads.download"
    function getDownloadOptions(url, filename) {
    // TODO Improve file extension determination process.
    //
    // Parsing the url should be ok in most cases, but the best way should
    // use MIME types and tentative file names returned by server. Not
    // feasible at this stage.
        let resFn = null,
            fileBaseName = url.split(/[\\/]/).pop().split('?')[0],
      // arbitrarily default to "mp4" for no better reason...
            fileExt = fileBaseName.match(/[.]/) ? fileBaseName.match(/[^.]+$/) : 'mp4';

    // file extension auto conversion.
    //
    // Some sources are known to give weird file extensions, do our best to
    // convert them.
        switch (fileExt) {
        case 'letv':
            fileExt = 'flv';
            break;
        default:
            // remain the same, nothing
            break;
        }

        resFn = filenameSanitize(filename, {
            replacement: '_',
            max: 255 - fileExt.length - 1,
        }) + '.' + fileExt;

        return {
            'url': url,
            'filename': resFn,
        };
    }
})();
(function() {
    if (location.pathname === '/video/bgm_calendar.html') {
        let l = $('#bangumi');
        let d = new Date().getDay() - 1;
        for (let i = 0; i < 7; ++i) {
            if (l.children()[0].getAttribute('weekday') !== d) {
                let c = l.children()[0];
                l.children()[0].remove();
                l.append(c);
            } else {
                break;
            }
        }
    }
})();
// wide
