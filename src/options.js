$(document).ready(function () {
    var bkg_page   = chrome.extension.getBackgroundPage();
    var Live       = {}
    document.title = chrome.i18n.getMessage('extShortName') + " - " + chrome.i18n.getMessage('optionPage');

    Live.set = function (n, k, v) {
        if (!window.localStorage || !n) return;
        var storage = window.localStorage;
        if (!storage[n])storage[n] = JSON.stringify({});
        var l = JSON.parse(storage[n]);
        if (v == undefined) {
            storage[n] = typeof k == 'string'? k.trim():JSON.stringify(k);
        } else {
            l[k] = typeof v == 'string'?v.trim():JSON.stringify(v);
            storage[n] = JSON.stringify(l);
        }
    };

    Live.get = function(n, k, v) {
        if (!window.localStorage || !n) return;

        if (!window.localStorage[n]) {
            var temp = {};
            if (k != undefined && v != undefined) temp[k] = v;
            window.localStorage[n] = JSON.stringify(temp);
        }
        var l = JSON.parse(window.localStorage[n]);
        if (k == undefined) return l;
        if (l[k] == 'true' || l[k] == 'false') l[k] = JSON.parse(l[k]);
        return l[k];
    };
    
    Live.del = function (n, k) {
        if (!window.localStorage || n==undefined || window.localStorage[n]==undefined) return;
        if(k == undefined) {
            window.localStorage.removeItem(n);
            return;
        }
        var l = JSON.parse(window.localStorage[n]);
        delete l[k];
        window.localStorage[n] = JSON.stringify(l);
    };
    function each(obj, fn) {
        if (!fn) return;
        if (obj instanceof Array) {
            var i = 0, len = obj.length;
            for (; i < len; i++) {
                if (fn.call(obj[i], i) == false)
                    break;
            }
        } else if (typeof obj === 'object') {
            var j = null;
            for (j in obj) {
                if (fn.call(obj[j], j) == false)
                    break;
            }
        }
    }

    $("#menu_title").text(chrome.i18n.getMessage('extShortName'));
    $("#version").html(bkg_page.version);
    $("#ad_opacity_opt").hide();
    $("div[option=\"" + bkg_page.getOption("replace") + "\"].replace").addClass("on");
    $("div[option=\"" + bkg_page.getOption("html5") + "\"].html5").addClass("on");
    $("div[option=\"" + bkg_page.getOption("contextmenu") + "\"].contextmenu").addClass("on");
    $("div[option=\"" + bkg_page.getOption("dynamic") + "\"].dynamic").addClass("on");
    // $("div[option=\"" + bkg_page.getOption("support") + "\"].support").addClass("on");
    $("div[option=\"" + bkg_page.getOption("dlquality") + "\"].dlquality").addClass("on");
    $("div[option=\"" + bkg_page.getOption("indexversion") + "\"].indexversion").addClass("on");
    $("div[option=\"" + bkg_page.getOption("rel_search") + "\"].rel_search").addClass("on");
    $("div[option=\"" + bkg_page.getOption("doSign") + "\"].doSign").addClass("on");
    $("div[option=\"" + bkg_page.getOption("autoTreasure") + "\"].autoTreasure").addClass("on");
    $("div[option=\"" + bkg_page.getOption("danmu") + "\"].danmu").addClass("on");
    $("div[option=\"" + bkg_page.getOption("liveNotification") + "\"].liveNotification").addClass("on");

    //chat-display
    $("div[option=\"" + bkg_page.getOption("chatDisplay") + "\"].chatDisplay").addClass("on");
    var c_options = JSON.parse(bkg_page.getOption("displayOption"));
    $(".display-option .option .button[option=off]").addClass("on");
    each(c_options,function(i){
        $(".display-option .option ."+c_options[i]+"[option=\"off\"]").removeClass("on");
        $(".display-option .option ."+c_options[i]+"[option=\"on\"]").addClass("on");
    });

    //watcher-options
    $("div[option=\"" + bkg_page.getOption("watcher") + "\"].watcher").addClass("on");
    var w_options = JSON.parse(bkg_page.getOption("watchList"));
    $(".watcher-option .option .button[option=off]").addClass("on");
    each(w_options,function(i){
        $(".watcher-option .option ."+w_options[i]+"[option=\"off\"]").removeClass("on");
        $(".watcher-option .option ."+w_options[i]+"[option=\"on\"]").addClass("on");
    });

    var adOption = bkg_page.getOption("ad");
    $("div[option=\"" + adOption + "\"].ad").addClass("on");
    if (adOption == "fade") $("#ad_opacity_opt").show();
    $("#ad_opacity").val(bkg_page.getOption("ad_opacity"));
    $('.ad').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.ad').removeClass('on');
        $(this).addClass('on');
        if ($(this).attr("option") == "fade") $("#ad_opacity_opt").slideDown(300);
        else $("#ad_opacity_opt").slideUp(300);
        bkg_page.setOption("ad", $(this).attr("option"), true);
        updatepreview();
    });
    $('#ad_opacity').change(function () {
        bkg_page.setOption("ad_opacity", $(this).val(), true);
        updatepreview();
    });


    /*$('.support').click(function() {
     if ($(this).hasClass('on')) return false;
     $('.support').removeClass('on');
     $(this).addClass('on');
     bkg_page.setOption("support", $(this).attr("option"));
     });*/
    $('.dynamic').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.dynamic').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("dynamic", $(this).attr("option"));
    });
    $('.replace').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.replace').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("replace", $(this).attr("option"));
    });
    $('.html5').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.html5').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("html5", $(this).attr("option"));
    });
    $('.contextmenu').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.contextmenu').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("contextmenu", $(this).attr("option"));
        if ($(this).attr("option") == 'on') {
            chrome.contextMenus.create({
                title   : chrome.i18n.getMessage('searchBili'),
                contexts: ["selection"],
                onclick : bkg_page.searchBilibili
            });
        } else {
            chrome.contextMenus.removeAll();
        }
    });
    $('.dlquality').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.dlquality').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("dlquality", $(this).attr("option"));
        // updatepreview();
    });
    $('.indexversion').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.indexversion').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("indexversion", $(this).attr("option"));
        // updatepreview();
    });
    $('.rel_search').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.rel_search').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("rel_search", $(this).attr("option"));
        // updatepreview();
    });
    $('.danmaku_filter').click(function() {
        $('#main_panel>div').css('display','none');
        $('#main_panel>#danmaku_filter_settings').css('display','block');
    });
    $('.doSign').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.doSign').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("doSign", $(this).attr("option"));
        // updatepreview();
    });
    $('.autoTreasure').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.autoTreasure').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("autoTreasure", $(this).attr("option"));
        // updatepreview();
    });
    $('.danmu').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.danmu').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("danmu", $(this).attr("option"));
        // updatepreview();
    });
    $('.liveNotification').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.liveNotification').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("liveNotification", $(this).attr("option"));

        if (bkg_page.getOption("liveNotification") != 'on') {
            clearInterval(bkg_page.Live.notise.intervalNum);
        }else if (bkg_page.getOption("liveNotification") == 'on') {
            bkg_page.Live.notise.init();
        }
        // updatepreview();
    });
    $('.chatDisplay').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.chatDisplay').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("chatDisplay", $(this).attr("option"));
        // updatepreview();
    });
    $('.chat-display .display-option .option .button').click(function(){
        var classes = $(this).attr('class').split(' ')[1];
        if ($(this).hasClass('on')) return false;
        $('.'+classes).removeClass('on');
        $(this).addClass('on');
        var displayOption = JSON.parse(bkg_page.getOption("displayOption"));
        var type = $(this).attr('option');
        if(type == "on"){
            var index = displayOption.indexOf(classes);
            if(index == -1) displayOption.push(classes);
        }else{
            var index = displayOption.indexOf(classes);
            if(index != -1) displayOption.splice(index,1);
        }
        bkg_page.setOption("displayOption", JSON.stringify(displayOption));
    });
    $('.watcher').click(function () {
        if ($(this).hasClass('on')) return false;
        $('.watcher').removeClass('on');
        $(this).addClass('on');
        bkg_page.setOption("watcher", $(this).attr("option"));
        // updatepreview();
    });
    $('.close-panel').click(function() {
        $('#main_panel>div').css('display','none');
        $('#main_panel>#about').css('display','block');
    });
    $('.watcher-options .watcher-option .option .button').click(function(){
        var classes = $(this).attr('class').split(' ')[1];
        if ($(this).hasClass('on')) return false;
        $('.'+classes).removeClass('on');
        $(this).addClass('on');
        var watchList = JSON.parse(bkg_page.getOption("watchList"));
        var type = $(this).attr('option');
        if(type == "on"){
            var index = watchList.indexOf(classes);
            if(index == -1) watchList.push(classes);
        }else{
            var index = watchList.indexOf(classes);
            if(index != -1) watchList.splice(index,1);
        }
        bkg_page.setOption("watchList", JSON.stringify(watchList));
    });

    // Danmaku-filter control script
    var danmaku_filter = {
        list: document.querySelector('#df_rulelist'),
        filters: JSON.parse(bkg_page.getOption('danmaku_filter')), // Array of rule objects
        selected: [], // Array of selected indexes in `filters`
        Rule: function(type, content) { // Rule Constructor (just a struct though...)
            this.type = type;
            this.active = true;
            if (content) {
                this.content = content;
            } else {
                this.content = "";
            }
            return this;
        },
        updateList: function() {
            // Re-render the filter list HTML element
            danmaku_filter.list.innerHTML = '';
            var type_names = {"text":"文本","color":"颜色","user":"用户"};
            for (var i=0; i<danmaku_filter.filters.length; i++) {
                var rule = danmaku_filter.filters[i];
                var row = document.createElement('tr'),
                    cell_type = document.createElement('td'),
                    cell_content = document.createElement('td'),
                    cell_operations = document.createElement('td');
                if (!rule.active) {
                    row.style.background = '#ccc';
                    row.style.opacity = '0.4';
                }

                var select_checkbox = document.createElement('input');
                select_checkbox.type='checkbox';
                if (danmaku_filter.selected.indexOf(i)!=-1) {
                    select_checkbox.checked = true;
                }
                select_checkbox.addEventListener('change', danmaku_filter.selectItem.bind(select_checkbox, i));
                var text_type = document.createElement('span');
                text_type.innerText = type_names[rule.type]
                cell_type.appendChild(select_checkbox);
                cell_type.appendChild(text_type);

                var edit_content = document.createElement('input');
                edit_content.type='text';
                edit_content.value = rule.content;
                edit_content.addEventListener('input', danmaku_filter.setItemContent.bind(edit_content, i));
                cell_content.appendChild(edit_content);

                var btn_enable = document.createElement('div');
                btn_enable.className = 'button';
                if (rule.active) {
                    btn_enable.innerText = '禁用';
                    btn_enable.addEventListener('click', danmaku_filter.enableItem.bind(btn_enable, [i], false));
                } else {
                    btn_enable.innerText = '启用';
                    btn_enable.addEventListener('click', danmaku_filter.enableItem.bind(btn_enable, [i], true));
                }
                var btn_delete = document.createElement('div');
                btn_delete.className = 'button';
                btn_delete.innerText = '删除';
                btn_delete.addEventListener('click', danmaku_filter.deleteItem.bind(btn_delete, [i]));
                cell_operations.appendChild(btn_enable);
                cell_operations.appendChild(btn_delete);

                row.appendChild(cell_type);
                row.appendChild(cell_content);
                row.appendChild(cell_operations);
                danmaku_filter.list.appendChild(row);

                bkg_page.setOption('danmaku_filter', JSON.stringify(danmaku_filter.filters));
            };
        },
        selectItem: function(index) {
            var i = danmaku_filter.selected.indexOf(index);
            if (this.checked && i == -1) {
                danmaku_filter.selected.push(index);
            }
            if (!this.checked && i != -1) {
                danmaku_filter.selected.splice(i, 1);
            }
        },
        setItemContent: function(index) {
            danmaku_filter.filters[index].content = this.value;
        },
        enableItem: function(indexes, enable) {
            indexes.forEach(function(index) {
                danmaku_filter.filters[index].active = enable;
            });
            danmaku_filter.updateList();
        },
        deleteItem: function(indexes) {
            indexes.sort(function(a,b){return b-a;});
            indexes.forEach(function(index) {
                danmaku_filter.filters.splice(index, 1);
            });
            danmaku_filter.selected = [];
            danmaku_filter.updateList();
        },
        importXML: function(xmlData) {
            var parser = document.createElement('div');
            parser.innerHTML = xmlData;
            if (danmaku_filter.filters.length>0 && confirm('是否清空当前列表?\n\n确认: 清空'+danmaku_filter.filters.length+'条规则并导入XML规则\n取消: 将XML规则添加在当前规则后')) {
                danmaku_filter.filters = [];
            }
            parser.querySelectorAll('filters>item').forEach(function(item) {
                var content = item.innerHTML;
                switch(content.substr(0,2)) {
                    case 't=':
                        var rule = new danmaku_filter.Rule('text', content.substr(2));
                        break;
                    case 'c=':
                        var rule = new danmaku_filter.Rule('color', content.substr(2));
                        break;
                    case 'u=':
                        var rule = new danmaku_filter.Rule('user', content.substr(2));
                        break;
                    default:
                        // This should not happen!
                        console.warn('Unrecognized entry: `'+content+'\'. It is processed as text');
                        var rule = new danmaku_filter.Rule('text', content);
                }
                danmaku_filter.filters.push(rule);
            });
            danmaku_filter.updateList();
        },
        importBili: function() {
            var type_values = {"keyword":"text","user":"user","color":"color"};
            $.get('http://interface.bilibili.com/blocklist?random='+Math.random(), function(xmlData) {
                danmaku_filter.filters = [];
                xmlData.querySelectorAll('filter>f').forEach(function(rule) {
                    danmaku_filter.filters.push(new danmaku_filter.Rule(type_values[rule.getAttribute('t')], rule.innerHTML));
                });
                danmaku_filter.updateList();
            });
        },
        exportXML: function() {
            var data = "<filters>\n";
            var type_symbols = {"text":"t","color":"c","user":"u"};
            danmaku_filter.filters.forEach(function(rule) {
                data += "\t<item enabled=\""+rule.active+"\">"+type_symbols[rule.type]+"="+rule.content+"</item>\n";
            });
            data += "</filters>";
            return data;
        },
        insertEntry: function(type) {
            danmaku_filter.filters.push(new danmaku_filter.Rule(type));
            danmaku_filter.updateList();
        },
        init: function() {
            // Add event listeners to controls
            // Render list HTML element
            danmaku_filter.updateList();
            $('#df_save').click(function() {
                bkg_page.setOption('danmaku_filter', JSON.stringify(danmaku_filter.filters));
            });
            $('#df_export').click(function() {
                var xmlBlob = new Blob([danmaku_filter.exportXML()],{type:'text/xml'});
                chrome.downloads.download({url:URL.createObjectURL(xmlBlob),filename:'tv.bilibili.player.xml'});
            });
            document.querySelector('#df_import').addEventListener('change', function(evt) {
                var reader = new FileReader();
                reader.onload = function(loadEvt) {
                    danmaku_filter.importXML(loadEvt.target.result);
                };
                reader.readAsText(evt.target.files[0]);
            });
            $('#df_download').click(function() {
                danmaku_filter.importBili();
            });
            $('#df_insert_regex').click(function() {
                danmaku_filter.insertEntry('text');
            });
            $('#df_insert_color').click(function() {
                danmaku_filter.insertEntry('color');
            });
            $('#df_insert_user').click(function() {
                danmaku_filter.insertEntry('user');
            });
            $('#df_batch_delete').click(function() {
                if (confirm('确认删除'+danmaku_filter.selected.length+'项过滤规则?')) {
                    danmaku_filter.deleteItem(danmaku_filter.selected);
                }
            });
            $('#df_batch_enable').click(function() {
                danmaku_filter.enableItem(danmaku_filter.selected, true);
            });
            $('#df_batch_disable').click(function() {
                danmaku_filter.enableItem(danmaku_filter.selected, false);
            });
            document.querySelector('#df_selectall').addEventListener('change', function(evt) {
                $('#df_rulelist input[type=checkbox]').attr('checked', this.checked);
                danmaku_filter.selected = []
                if (this.checked) {
                    for (var i = 0; i < danmaku_filter.filters.length; i++) {
                        danmaku_filter.selected.push(i);
                    }
                }
            });
        }
    };
    danmaku_filter.init();
    // End Danmaku-filter control script

    function initUpList() {
        var list    = Live.get('favouritesList');
        var idList  = Live.get('favouritesIdList');
        var ListDom = $('#up-list');
        each(list, function (i) {
            var upInfo = list[i];
            var del    = $('<button class="button on delete" />').text('取消关注')
            var l      = $('<li />').attr('roomId', upInfo.roomId).append($('<span class="upName"/>').text(upInfo.upName), del);
            ListDom.append(l);
            del.click(function () {
                var index = idList.indexOf(parseInt(i));
                if (index != -1) {
                    idList.splice(index, 1);
                    delete list[i];
                    Live.set('favouritesIdList', idList);
                    Live.set('favouritesList', list);
                    l.remove();
                }
            });
        });
    }

    initUpList();
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars  = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
    }

    function formateDatetime(timestamp) {
        if (timestamp == 0) {
            return lang['oneDay'];
        }
        var date = new Date((parseInt(timestamp)) * 1000),
            year, month, day, hour, minute, second;
        year     = String(date.getFullYear());
        month    = String(date.getMonth() + 1);
        if (month.length == 1) month = "0" + month;
        day = String(date.getDate());
        if (day.length == 1) day = "0" + day;
        hour = String(date.getHours());
        if (hour.length == 1) hour = "0" + hour;
        minute = String(date.getMinutes());
        if (minute.length == 1) minute = "0" + minute;
        second = String(date.getSeconds());
        if (second.length == 1) second = "0" + second;
        return String(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
    }

    var updateInfo = JSON.parse(bkg_page.getOption('crx_update'));

    if (updateInfo.version && bkg_page.compareVersion(updateInfo.version, chrome.app.getDetails().version) > 0) {
        $('#update').show();
        $('#update .version').text(updateInfo.version);
        $('#update .date').text(formateDatetime(updateInfo.update_time / 1000));
        if (updateInfo.detail) {
            $('#update .detail').text(updateInfo.detail);
        } else {
            $('#update .detail').parent().hide();
        }
        $('#update .url').attr('href', 'https://bilihelper.guguke.net/');
        $('#about #update p').addClass('highlight');
    }

    switch (getQueryVariable('mod')) {
        case 'update':
            swal({
                title            : "升级成功",
                text             : "您已成功升级至哔哩哔哩助手版本 v" + chrome.app.getDetails().version + "！请参阅右侧有关扩展更新内容，再次感谢您对哔哩哔哩助手项目的支持。",
                type             : "success",
                confirmButtonText: "好的",
                html             : true
            });
            break;
        case 'install':
            swal({
                title            : "安装成功",
                text             : "感谢您安装哔哩哔哩助手版本 v" + chrome.app.getDetails().version + "！请根据您的需要在左侧更改扩展的选项，右侧为有关扩展的相关介绍和说明。使用此扩展前请您阅读相关<a href=\"http://addons-privacy.com/\" target=\"_blank\">使用协议和隐私策略</a>。",
                type             : "success",
                confirmButtonText: "同意并开始使用扩展",
                html             : true,
                //closeOnConfirm: false
            }, function () {
                //$('#support_qm').click();
            });
            break;
        case 'new':
            if (updateInfo.version) {
                swal({
                    title            : "发现新版本",
                    text             : "发现新版哔哩哔哩助手: v" + updateInfo.version + "<br/>您当前使用的版本是: v" + chrome.app.getDetails().version + "<br/>如果您不能通过 Google 自动更新扩展或者在使用上遇到严重的问题，建议您参阅右侧信息，手动更新。",
                    type             : "warning",
                    confirmButtonText: "好的",
                    cancelButtonText : "不再提醒",
                    html             : true,
                    showCancelButton : true
                }, function (isConfirm) {
                    !isConfirm && bkg_page.setOption("versionNotify", 'off', false);
                });
            }
            break;
    }

    window.history.replaceState({}, document.title, '/options.html');
});
