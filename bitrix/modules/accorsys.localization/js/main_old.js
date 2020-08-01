;(function(jqLoc) {
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function () {};

    // variables
    var $ = jqLoc,
        imageAbout = '/bitrix/images/accorsys.localization/accorsys_localization_240x240.png',
        showPopupTimeSet = 1000, //
        observeMutationsTimerFl = false,
        langPlace = readCookie('current_language'),
        tagNameToPost = false,
        $document = $(document),
        keyupLocaleHadler = false,
        localMainObject = {},
        isCanCloseAccorsysLocaleWindow = true,
        undoData = {},
        $actElOnPopup = false,
        mouseDownX = 0, mouseDownY = 0,
        mouseUpX = 0, mouseUpY = 0,
        saveFindedText = '',
        saveFindedTextChanged = '',
        toMoreTimeSending = false,
        erorrMicrosoftKeyRequest = false,
        localeMesTimeOver = 300,
        notReload = true,
        whoNotReloaded = '',
        changeGlobalText = '',
        popupReturnObject;

    // �������� ������� �����, ���������
    $(document).on('mousemove', function(e) {
        $.mouseDocX = e.pageX;
        $.mouseDocY = e.pageY;
    });

    $(document).ready(function() {
        $('body').append('<img src="'+imageAbout+'" style="display: none">');

        $('#loadContOn').click(function() {
            $("#loadContBlock")
                .append('<a href="http://accorsysmodules.ah/bitrix/admin/index.php">Admin</a>')
                .append('<input type="text" value="<i class=\'locale_mes\'>123</i>">');

        });
        aHaveTargetBlank();
        inputValLocalMes();
    });

    // �������� ������ ��������� ������  ��� ������� Microsoft
    function getMicrosoftTranslatorSupportedLangs(){
        if(arLocaleParams.microsofttranslate_sup_langs)
            return false;
        var url = 'http://api.microsofttranslator.com/V2/Ajax.svc/GetLanguagesForTranslate',
            data = {
                appId: 'Bearer ' + arLocaleParams.microsofttranslate_key
            };

        $.ajax({
            'url':url,
            'data':data,
            'dataType':'jsonp',
            'jsonp':'oncomplete',
            'jsonpCallback':'mycallBack'
        }).done(function(jqXHR){
            arLocaleParams.microsofttranslate_sup_langs = jqXHR;
        }).fail(function(jqXHR, textStatus, errorThrow){
            erorrMicrosoftKeyRequest = true;
        });
    }

    function getMicrosoftTranslatorKey() {
        $.post('/ajax/accorsys.localization/get_microsoft_token.php',
            {
                'method':'ajax'
            },
            function(data){
                arLocaleParams.microsofttranslate_key = data;
                getMicrosoftTranslatorSupportedLangs();
            }
        );
    }

    $.fn.addLocaleFormHandlers = function() {
        //���������� �� ������ ������ ��������
        this.find('.locale-click-arrow').click(function(e) {
            if($(this).hasClass('disabled')) return false;

            var $this = $(this), //������ ������
                $localPopup = $this.siblings('.locale_popup'),//� ���� �����
                $textarea = $this.closest('.locale-select').find('textarea').eq(0),//TextArea � ������ �����
                thisLocalPopupVisible = $localPopup.is(':visible');

            //��������� ��� ������ ������ �����
            $this
                .closest('form[name=new_locale_tag]')//������� �����
                .find('.locale_popup')//������� � ��� ��� ������
                .hide()//��������� ��� ������
                .end()//������������ � �����
                .find('a.locale-click-arrow')//������� ��� ������ ��� �������� �����
                .removeClass('active');//������� ���������� ���� ������

            // ����� ��������� ��� ���������
            thisLocalPopupVisible?$localPopup.hide():$localPopup.show();

            //������ ������, ���������� ��� ���
            if ($textarea.attr('name') && undoData[$textarea.attr('name')]) {
                $localPopup.find('.undo').parent().show();
            } else {
                $localPopup.find('.undo').parent().hide();
            }

            if($localPopup.find('a.activate').length){
                $localPopup.find('li > a').each(function(){
                    if(
                        $(this).hasClass('g_translate') ||
                        $(this).hasClass('microsoft_translate') ||
                        $(this).hasClass('y_translate')
                    ) {
                        $(this).closest('li').addClass('no-act');
                    }
                });
            }

            //���������� �����
            if ($localPopup.is(':visible')) {
                $this.addClass('active');
                $document.one('click',function(){
                    $localPopup.hide();
                    $this.removeClass('active');
                });
            } else {
                $this.removeClass('active');
            }

            e.preventDefault();
            e.stopPropagation();
        });

        this.find('.g_translate, .y_translate, .microsoft_translate').click(function(e){
            var input = $(this).closest('.locale-block').find('textarea'),
                lang = input.attr('data-lang'),
                text = input.val(),
                func = $(this).hasClass('g_translate') ? loc_googleTranslate: $(this).hasClass('microsoft_translate') ? loc_microsoftTranslate:loc_translate_ya,
                translate = $(this).hasClass('g_translate') ? 'gtranslate_key': $(this).hasClass('microsoft_translate') ? 'microsoft_translate_key':'ytranslate_key';

            if(text.removeSpacesLocal() === '') {
                pcLoaderStop();
                return false;
            } else {
                text = text.removeSpacesLocal();
            }

            window.translateImput = input;

            if (input.val())
                func(text,'',lang, input);
            $(this).closest('.locale_popup').hide().prev().removeClass('active');

            e.preventDefault();
            e.stopPropagation();
        });

        this.find('.wiki').click(function(e){
            var input = $(this).closest('.locale-block').find('textarea');
            if (input.val())
                window.open(arLocaleParams.wiki_url.replace('#TEXT#',encodeURIComponent(input.val())));

            e.preventDefault();
            e.stopPropagation();
        });
        this.find('.youtube').click(function(e){
            var input = $(this).closest('.locale-block').find('textarea');
            if (input.val())
                window.open(arLocaleParams.ytube_url.replace('#TEXT#',encodeURIComponent(input.val())));

            e.preventDefault();
            e.stopPropagation();
        });
        this.find('.google_search').click(function(e){
            var input = $(this).closest('.locale-block').find('textarea');
            if (input.val())
                window.open(arLocaleParams.google_url.replace('#TEXT#',encodeURIComponent(input.val())));

            e.preventDefault();
            e.stopPropagation();
        });
        this.find('.undo').click(function(e){
            var input = $(this).closest('.locale-select').find('textarea').eq(0);
            if (input.attr('name') && undoData[input.attr('name')]){
                input.val(undoData[input.attr('name')]);
            }
            delete undoData[input.attr('name')];
            $(this).parent().hide().prev().hide().closest('.locale_popup').hide().prev().removeClass('active');

            e.preventDefault();
            e.stopPropagation();
        });
        $('.locale-select textarea').keydown(function(e) {
            if (!undoData[$(this).attr('name')]){
                undoData[$(this).attr('name')] = $(this).val();
            }
        });

        return false;
    };

    //������������ ����
    $(document).on('click', '.locale_popup .deactivate', function(event){
        var $this = $(this),
            $localTextarea = $this.closest('.locale-select').find('>textarea'),
            $thisSpan = $this.find('span'),
            thisDataFile = $this.data('file'),
            thisDataTag = $this.data('tag'),
            thisDataText = $this.data('text');

        var killFunc = pcLoaderStart($this.closest('.PCPopup.popupLNMenu'));

        $this.closest('.locale_popup').hide().siblings('.locale-click-arrow.active').removeClass('active');

        if(thisDataText){
            toMoreTimeSending = sendLocaleData({
                'file': thisDataFile,
                'tag': thisDataTag,
                'text': thisDataText
            },function(data){
                if(data.MESSAGE != 'OK') return false; //���� �� ��, �� �����������
                killFunc();
                $localTextarea.addClass('textarea-disabled');
                $thisSpan.removeClass('icon-deactivate').addClass('icon-activate').html(arLocaleParams.lang.activate);
                $this.removeClass('deactivate').addClass('activate');

            },'deactivateTag');
        }

        event.preventDefault();
        event.stopPropagation();
    });

    //���������� ����
    $(document).on('click', '.locale_popup .activate', function(event){
        var $this = $(this),
            $localTextarea = $this.closest('.locale-select').find('>textarea'),
            $thisSpan = $this.find('span'),
            thisDataFile = $this.data('file'),
            thisDataTag = $this.data('tag'),
            thisDataText = $this.data('text');

        var killFunc = pcLoaderStart($this.closest('.PCPopup.popupLNMenu'));

        $this.closest('.locale_popup').hide().siblings('.locale-click-arrow.active').removeClass('active');

        if(thisDataText){
            toMoreTimeSending = sendLocaleData({
                'file': thisDataFile,
                'tag': thisDataTag,
                'text': thisDataText
            },function(data){
                if(data.MESSAGE == 'OK') {
                    killFunc();

                    $localTextarea.removeClass('textarea-disabled');
                    $thisSpan.removeClass('icon-activate').addClass('icon-deactivate').html(arLocaleParams.lang.deactivate);
                    $this.removeClass('activate').addClass('deactivate');
                }
            },'activateTag');
        }

        event.preventDefault();
        event.stopPropagation();
    });

    $.fn.addKeyupLocaleHandler = function(){
        this.on('click','ul.selectblock li > a',function(event){
            var tagName = $(this).attr('rel'),
                text = $(this).attr('title'),
                input = $(this).closest('ul').prev();

            if (input.attr('name') == 'tag_name' || input.attr('name') == 'new_tag_name'){
                input.val(tagName);
            }else{
                var tagNameInput = $(this).closest('form').find('input[name=tag_name], input[name=new_tag_name]');
                if (tagNameInput.get(0) && !tagNameInput.val()){
                    tagNameInput.val(tagName);
                }
                input.val(text);
            }
            $(this).closest('ul').hide();

            event.preventDefault();
            event.stopPropagation();
        });

        return this;
    };

    $(function() {
        function toHTML(docFragment){
            var d = document.createElement('div');
            d.appendChild(docFragment);
            return d.innerHTML;
        }
        $.fn.selectText = function() {
            var text = this.get(0);
            if ($.browser.msie) {
                var range = document.body.createTextRange();
                range.moveToElementText(text);
                if (range && range.select && !this.is('input') && !this.is('select') && !this.is('textarea'))
                    range.select();
            } else if ($.browser.mozilla || $.browser.opera || $.browser.chrome) {
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(text);
                selection.removeAllRanges();
                selection.addRange(range);
            } else if ($.browser.safari) {
                var selection = window.getSelection();
                selection.setBaseAndExtent(text, 0, text, 1);
            }
            return this;
        }

        $.fn.getSelectionText = function() {
            var ie = false;

            if ( window.getSelection ) {
                var selectedText = window.getSelection();
            } else if ( document.getSelection ) {
                var selectedText = document.getSelection();
            } else if ( document.selection ) {
                ie = true;
                var selectedText = document.selection.createRange();
            }
            if (selectedText) {
                if(!ie) {
                    if (selectedText.anchorNode) {
                        var theParent = selectedText.getRangeAt(0).cloneContents();
                        return toHTML(theParent);
                    }
                } else {
                    return selectedText.htmlText;
                }
            } else {
                return this.text();
            }

            return false;
        };

        function formToObject(form,additional){
            if (!additional) additional = {};

            var term = {};
            $(form).find('input, textarea').each(function(){
                if ($(this).attr('name') &&
                    (($(this).is(":checkbox") && $(this).is(":checked"))&&($(this).attr("name").indexOf('[]')>-1))){
                    var name = $(this).attr('name').replace('[]','');
                    if (!term[name])
                        term[name] = [];
                    term[name].push($(this).val());
                }else if($(this).is("textarea") || $(this).attr("type")=='text' || $(this).attr("type")=='hidden' || $(this).is(":checkbox") && $(this).is(":checked")){
                    term[$(this).attr('name')] = $(this).val();
                }
            });
            for (i in additional){
                term[i] = additional[i];
            }
            return term;
        };

        function parseTemplateScript( text ) {
            var patt = /component_name=([^\&]+)/,
                result = patt.exec(text),
                patttempl = /component_template=([^\&]+)/,
                resulttmpl = patttempl.exec(text);

            if ( result[1] ) {
                var component_name = unescape(result[1]);
            }
            if ( resulttmpl && resulttmpl[1] ) {
                var template_name = unescape(resulttmpl[1]);
            }
            if (!template_name) template_name=".default";
            return {component:component_name,template:template_name}
        }

        function setDataUrlBXComponents() {
            var $bxAreaBlocks = $('[id ^= "bx_incl_area"]');

            if ( $bxAreaBlocks.length ) {

                for (var bx = 0; bx < $bxAreaBlocks.length; bx++) {
                    var $this = $bxAreaBlocks.eq(bx),
                        thisId = $this.attr('id');

                    if (thisId) {
                        var $scThis = $('body').find('script:contains("\'parent\':\''+ thisId +'\'")'),
                            scTextOrg = $scThis.text(),
                            pt = 'path=',
                            cp = '&component_name=',
                            ct = '&template_id=',
                            mn = 'component_name=bitrix%3Amenu',
                            dataText = '',
                            componentText = '',
                            componentTemp = '';

                        if ( ~scTextOrg.indexOf("'"+thisId+"'") ) {
                            var scText = scTextOrg.substring(scTextOrg.indexOf('BX.CEditorDialog'));

                            if ( ~scText.indexOf(pt) ) {
                                scText = scText.substring(scText.indexOf(pt)+1);
                                dataText = scText.substring(pt.length-1, scText.indexOf('&'));
                            }

                            if ( ~scTextOrg.indexOf(cp) ) {
                                componentText = scTextOrg.substring(scTextOrg.indexOf(cp)+1);
                                componentText = componentText.substring(cp.length-1, componentText.indexOf('&'));
                            }

                            if ( ~scTextOrg.indexOf(ct) ) {
                                componentTemp = scTextOrg.substring(scTextOrg.indexOf(ct)+1);
                                componentTemp = componentTemp.substring(ct.length-1, componentTemp.indexOf('&'));
                            }

                            if ( dataText ) {
                                $this.data('local_pathsave', dataText);

                                if ( ~scTextOrg.indexOf(mn) ) {
                                    $this.data('local_bx_menu', 'yes');
                                }

                                if ( componentText ) {
                                    $this.data('local_bx_name', componentText);
                                }

                                if ( componentTemp ) {
                                    $this.data('local_bx_temp', componentTemp);
                                }
                            }
                        }
                    }
                }
            }
        }

        /*function setDataUrlBXComponents() {
         var $bxAreaBlocks = $('[id ^= "bx_incl_area"]'),
         $getAllScripts = $('body').find('script').not('script[src]');

         if ( $bxAreaBlocks.length ) {

         for (var bx = 0; bx < $bxAreaBlocks.length; bx++) {
         var $this = $bxAreaBlocks.eq(bx),
         thisId = $this.attr('id');

         for (var sc = 0; sc < $getAllScripts.length; sc++) {
         var $scThis = $getAllScripts.eq(sc),
         scTextOrg = $scThis.text(),
         pt = '&path=%2F',
         cp = '&component_name=',
         ct = '&template_id=',
         mn = 'component_name=bitrix%3Amenu',
         dataText = '',
         componentText = '',
         componentTemp = '';

         console.log('thisId:' + thisId);
         console.log($scThis);

         if ( ~scTextOrg.indexOf("'"+thisId+"'") && ~scTextOrg.indexOf(pt) ) {
         var scText = scTextOrg.substring(scTextOrg.indexOf('BX.CEditorDialog'));

         if ( ~scText.indexOf(pt) ) {
         scText = scText.substring(scText.indexOf(pt)+1);
         dataText = scText.substring(pt.length-1, scText.indexOf('&'));
         }

         if ( ~scTextOrg.indexOf(cp) ) {
         componentText = scTextOrg.substring(scTextOrg.indexOf(cp)+1);
         componentText = componentText.substring(cp.length-1, componentText.indexOf('&'));
         }

         if ( ~scTextOrg.indexOf(ct) ) {
         componentTemp = scTextOrg.substring(scTextOrg.indexOf(ct)+1);
         componentTemp = componentTemp.substring(ct.length-1, componentTemp.indexOf('&'));
         }

         if ( dataText ) {
         $this.data('local_pathsave', '%2F'+dataText);

         if ( ~scTextOrg.indexOf(mn) ) {
         $this.data('local_bx_menu', 'yes');
         }

         if ( componentText ) {
         $this.data('local_bx_name', componentText);
         }

         if ( componentTemp ) {
         $this.data('local_bx_temp', componentTemp);
         }

         return false;
         }
         }
         }
         }
         }
         }*/

        function parseIncludeAreas(object) {
            var myTrueDiv;

            function returnTrueParentDiv (myObject) {
                function strpos( haystack, needle, offset ) {
                    var i = haystack.indexOf( needle, offset );

                    return i >= 0 ? i : false;
                }

                if( $(myObject).attr('id') ) {
                    if( strpos($(myObject).attr('id'),'bx_incl_area') !== false ) {
                        myTrueDiv = $(myObject);

                        return true;
                    }
                }

                if( !$(myObject).parents("div:first").get(0) ) return false;

                returnTrueParentDiv( $(myObject).parents("div:first") );
            }

            returnTrueParentDiv(object);

            var htmlToParse = $(myTrueDiv).find('script').last().html();

            if( !htmlToParse ) return false;

            var arTemp1 = htmlToParse.split("&"),
                arTemp2;

            for( var val in arTemp1 ) {
                arTemp2 = arTemp1[val].split("=");

                for( var trueVal in arTemp2 ) {
                    if( arTemp2[trueVal] == "path" ) {
                        trueVal++;

                        return decodeURIComponent(arTemp2[trueVal]);
                    }
                }
            }
        }

        function pushStaticElementsMenu(items){
            items.push({
                TEXT:arLocaleParams.lang.marketplace_page,
                GLOBAL_ICON:'loc-visit-marketplace',
                ONCLICK: function(event){
                    var href = 'http://marketplace.1c-bitrix.ru/solutions/accorsys.localization';
                    window.open(
                        href, '_blank'
                    );
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
            var supSale = (arLocaleParams.lang.isSaleExists != 'N' ? '<sup class="sup-sale">'+arLocaleParams.lang.isSaleExists+'</sup>':'');
            items.push({
                TEXT:arLocaleParams.lang.inapp_purschase + '&nbsp;' + supSale,
                GLOBAL_ICON:'loc-inapp-purschases',
                ONCLICK: function(event){
                    var href = '/bitrix/admin/lc_inapp_purchases.php';
                    window.open(
                        href, '_blank'
                    );
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
            items.push({
                SEPARATOR:true
            });
            //��������� ����� ���� "��������� ������"
            items.push({
                TEXT:arLocaleParams.lang.settings_menu,
                GLOBAL_ICON:'loc-settings',
                ONCLICK: function(event){
                    window.open('/bitrix/admin/settings.php?mid=accorsys.localization&mid_menu=1');
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
            //��������� ����� ���� "� ������ *"
            items.push({
                TEXT:arLocaleParams.lang.about_menu,
                GLOBAL_ICON:'loc-about',
                ONCLICK: function(event){
                    var $PCPopuup = $(".PCPopup.popupLNMenu"),
                        $popupOverlay = $("#loc_menu_dp_bg"),
                        killLoader = pcLoaderStart($(this)),
                        $lcOverlays = $('<div class="lc_overlay"></div>'),
                        $closeText = $('<a class="lc_about_close_text" href="#">' + arLocaleParams.lang.closeWin + '</a>').hide();

                    $('body').append($closeText);
                    $PCPopuup.remove();
                    $popupOverlay.remove();

                    if(!$PCPopuup.is(":visible")) {
                        //$lcOverlays.appendTo('body').css('height',$(document).height());
                    }
                    var html = '<p>'+arLocaleParams.lang.about_text + '</p>' +
                        '<a target="_blank" href="' + arLocaleParams.lang.logo_link + '"><img src="/bitrix/images/accorsys.localization/accorsys_localization_240x240.png"/></a>' +
                        '<h2>' + arLocaleParams.lang.localization + '</h2>' +
                        '<div class="text-wrapper company-popup">' +
                        '<p class="version">' + arLocaleParams.lang.about_version + '<br />'+arLocaleParams.lang.about_date_update+'</p>' +

                        '<p class="readmore">' + arLocaleParams.lang.about_link + '</p>' +
                        '<p class="licence_agreement"><span class="eula">' + arLocaleParams.lang.about_licence_agreement + '</span></p>' +
                        '</div>';
                    var $popup = $(loc_getCenterPopupTemplate(html));
                    $popup.appendTo('body').bind('clickoutside',function() {
                        //$(this).remove();
                        //$('.lc_overlay').remove();
                        //$("#about_loc_dp_bg").remove();
                    });
                    var $PCLesBody = $('<div id="pcles_body"></div>'),
                        $PCLesBodyBG = $('<div id="pcles_body_bg"></div>'),
                        loadL = function( $popupPC ) {
                            $popupPC.find('.eula').click(function(event){
                                var killLoader = pcLoaderStart($(this).closest('.PCPopup.popupLNMenu'));

                                toMoreTimeSending = sendLocaleData({},function(data){
                                    $('#about_loc_dp_bg').remove();
                                    killLoader();

                                    if(!$popupPC.is(":visible")) return false;

                                    var windowWidth = $(window).width(),
                                        $PCPopuupInner = $('<div class="search-popup-block" style="padding:15px 35px; margin: 0 0 15px 0;">'+data.HTML+'</div>');

                                    $('body').css({
                                        'overflow': 'hidden'
                                    });

                                    $PCLesBody.css({
                                        'position': 'fixed',
                                        'height': $(window).height(),
                                        'width': $(window).width(),
                                        'top': 0,
                                        'left': 0,
                                        'overflow-y': 'auto',
                                        'overflow-x': 'hidden',
                                        'z-index': '10000'
                                    });

                                    $PCLesBodyBG.css({
                                        'position': 'inherit',
                                        'height': $(window).height(),
                                        'width': $(window).width(),
                                        'top': 0,
                                        'left': 0,
                                        'z-index': '999'
                                    });

                                    $popupPC.html($PCPopuupInner);

                                    $popupPC.css({
                                        'position': 'relative',
                                        'width': '1000px',
                                        'left': 'auto',
                                        'top': 0,
                                        'margin': '30px auto'
                                    });

                                    $popupPC.wrapAll($PCLesBody);
                                    $popupPC.after($PCLesBodyBG);

                                    $closeText.show().click(function(){
                                        $PCLesBodyBG.click();
                                        $closeText.remove();

                                        return false;
                                    });
                                },'getEula');

                                event.preventDefault();
                                event.stopPropagation();
                            });

                            killLoader();
                        },
                        killPCLesBody = function(){
                            $("#pcles_body").remove();

                            $('body').css({
                                'overflow': 'auto'
                            });

                            $closeText.remove(); // ������� ������ "�������", ����� �������� �����
                        };

                    var $parentPopup = $(this).closest('.PCPopup.popupLNMenu'),
                        isMobilePopup = '';

                    /*if(isMobileOrNot()) isMobilePopup = ' mobile_pc_popup ';*/

                    $(this).PCPopup($popup, {
                        inside: $('body'),
                        classes: 'PCPopup popupLNMenu new_locale_menu bx-core-popup-menu '+isMobilePopup,
                        ides: $parentPopup.attr('id'),
                        popupWidth: 'auto',
                        position: 'fixed',
                        ZPosition: 1500,
                        close: $PCLesBodyBG,
                        bg: true,
                        bgId : 'about_loc_dp_bg',
                        bgZPosition: 1400,
                        closeFuncs: [
                            [killPCLesBody, ''],
                            [pcLoaderStop, ''],
                            [killJsToPopupOpen, ''],
                            [removeBxAdminPrefix, '']
                        ],
                        after: [
                            [loadL, 'popup']
                        ]
                    });

                    function removeBxAdminPrefix() {
                        if($('#bx-admin-prefix').length) {
                            $('#bx-admin-prefix').remove();
                            removeBxAdminPrefix();
                        }
                    }

                    event.preventDefault();
                    event.stopPropagation();
                }
            });


            return items;
        }

        /**
         * ������� ��������� ���� � ������������ � ������� PCPopup
         * @param: node = ������� ��� �������� ����������� Popup
         * @param: items = ���������, �� ���� ������ ����
         * */
        function showLocaleMenu(node, items){
            //��������� �����������
            items.push({
                SEPARATOR:true
            });

            //��������� � ����� ���� ��������
            items = pushStaticElementsMenu(items);

            //������� �����
            $('#bx-admin-prefix.new_locale_menu').remove();

            //������� ����
            MENU = new BX.CMenu({
                ITEMS: items,
                SET_ID: 'bx-admin-prefix',
                CLOSE_ON_CLICK: true,
                ADJUST_ON_CLICK: true,
                ADDITIONAL_CLASS:'new_locale_menu',
                LEVEL: 0,
                parent: BX($(node).get(0))
            });

            var $jObjMenu = $(MENU.DIV), // ���� �������� ��� ������ jQuery
                isMobilePopup = '';

            /*if(isMobileOrNot()) isMobilePopup = ' mobile_pc_popup';*/

            // �� ���� ������� �������
            $jObjMenu.find('span.bx-core-popup-menu-angle, span.bx-core-popup-menu-angle-bottom').remove();

            $actElOnPopup = $(node);
            // ������� Popup ��� ����������� ����
            popupReturnObject = $(node).PCPopup($jObjMenu, {
                inside: $('body'),
                classes: 'popupLNMenu '+$jObjMenu.attr('class')+isMobilePopup,
                ides: $jObjMenu.attr('id'),
                bgId : 'loc_menu_dp_bg',
                after: [
                    [changePopupOnMousePos, 'popup'],
                    [wrapAllContnatPopup, 'popup'],
                    [setMenuPopupBackFunc, 'popup'],
                    [addLeftLocalCoolText, 'popup'],
                    [backToWindowVisiblePopup, 'popup']
                ],
                closeFuncs: [
                    [killPopupOfterClose, $jObjMenu],
                    [pcLoaderStop, ''],
                    [killJsToPopupOpen, '']
                ]
            });

            function addLeftLocalCoolText($popup) {
                var $coolText = $('<div class="side_label js-side_label">'+
                '<div class="side_label-title">' + arLocaleParams.lang.localization + '</div>'+
                '<div style="width: 30px;"></div>'+
                '</div>');

                $popup.prepend($coolText);

                changePCPopupPosition($popup);
            }

            //��������� ������� ��� �������� ������ � �������� ���������
            function setMenuPopupBackFunc($popup) {
                localMainObject.backToMenuPopup = (function(){
                    return function back(){
                        $popup.css({
                            'width': 'auto',
                            'height': 'auto'
                        });
                    }
                }());
            }

            // ����������� ������� �� ������� ���� ��������� .popup_menu
            function wrapAllContnatPopup($popup) {
                $popup.find(">*:not(.arrow)").wrapAll('<div class="popup_menu"></div>');
                notReload = true;
                changeGlobalText = '';
                whoNotReloaded = '';
            }

            //������ ������� �� ���������� ����
            function changePopupOnMousePos($popup){
                var mouseX = $.relativeX,
                    mouseY = $.relativeY,
                    popupPosition = posElOnWindow.get($popup),
                    nodePosition = posElOnWindow.get($(node)),
                    $spanVis = $popup.find("span.arrow"),
                    spanVisHeight = $spanVis.height(),
                    spanVisWidth = $spanVis.width(),
                    topPopupAngleCSSLeft = parseInt($spanVis.css('left')),
                    setLeft = 0, setTop = 0, spotY = 0, spotX = 0,
                    pX = nodePosition.left+mouseX,
                    pY = nodePosition.top+mouseY;

                /*if(isMobileOrNot() && $.tapX && $.tapY ) {
                 pX = $.tapX;
                 pY = $.tapY;

                 $.tapX = NaN;
                 $.tapY = NaN;
                 }*/

                if($actElOnPopup) {
                    var elTop = $actElOnPopup.offset().top,
                        elLeft = $actElOnPopup.offset().left,
                        elRight = elLeft + $actElOnPopup.outerWidth(false),
                        elBottom = elTop + $actElOnPopup.outerHeight(false);
                }

                if($popup.find("span.bx-core-popup-menu-angle").length) {
                    setLeft = pX-topPopupAngleCSSLeft-(spanVisWidth/2);
                    setTop = pY+spanVisHeight;

                    spotX = setLeft + topPopupAngleCSSLeft+10;
                    spotY = setTop;
                }

                if($popup.find("span.bx-core-popup-menu-angle-bottom").length) {
                    setLeft = pX-topPopupAngleCSSLeft-(spanVisWidth/2);
                    setTop = pY-popupPosition.height-spanVisHeight-20;

                    spotX = setLeft + topPopupAngleCSSLeft+10;
                    spotY = setTop+popupPosition.height+spanVisHeight;
                }

                //if(!isMobileOrNot())
                if(mouseDownX && mouseDownY && mouseUpX && mouseUpY && (mouseDownX!=mouseUpX || mouseDownY!=mouseUpY)) {
                    if($actElOnPopup) {
                        if(!(mouseDownX>elLeft && mouseDownX<elRight)) mouseDownX = elLeft;
                        if(!(mouseUpX>elLeft && mouseUpX<elRight)) mouseUpX = elRight;
                        if(!(mouseDownY>elTop && mouseDownY<elBottom)) mouseDownY = elTop;
                        if(!(mouseUpY>elTop && mouseUpY<elBottom)) mouseUpY = elBottom;
                    }

                    setLeft = mouseDownX > mouseUpX?mouseUpX + (mouseDownX-mouseUpX)/2:mouseDownX + (mouseUpX-mouseDownX)/2;
                    setTop = mouseDownY > mouseUpY?mouseUpY + (mouseDownY-mouseUpY)/2:mouseDownY + (mouseUpY-mouseDownY)/2;
                    spotX = setLeft;
                    spotY = setTop;
                    setLeft = setLeft - topPopupAngleCSSLeft-(spanVisWidth/2);
                    setTop = setTop + spanVisHeight;

                    if($popup.find("span.bx-core-popup-menu-angle-bottom").length) {
                        setTop = setTop - $popup.outerHeight(false)-spanVisHeight-10;
                    }
                }

                setTop = setTop<0?20:setTop;
                setLeft = setLeft<0?10:setLeft;

                spotX = spotX<0?20:spotX;
                spotY = spotY<0?20:spotY;

                //�������� ����� popup, ��� �� �� �������� �� �������
                if(setTop>0 && setLeft>0) {
                    if(setLeft==20) topPopupAngleCSSLeft = 40;

                    $popup
                        .css({
                            'left': setLeft,
                            'top': setTop
                        })
                        .attr('data-y', setTop)
                        .attr('data-x', setLeft)
                        .attr('data-height', $popup.outerHeight())
                        .attr('data-width', $popup.outerWidth());

                    cpCoolSpot(spotX, spotY);
                    $spanVis.css('left', topPopupAngleCSSLeft);
                }
            }

            // ������� ��������� ����
            function killPopupOfterClose($popup){
                if($popup.length && $popup.is(":hidden")){
                    $popup.remove();
                }

                $('.bx-core-popup-menu.bx-core-popup-menu-right').hide();
            }
        }

        function submitNewLocaleFormHandler(form,action,elem) {
            var $searchPopupBlock = $(form).closest('.search-popup-block');

            $(form).find('input.adm-btn-save').click(function(event) {

                pcLoaderStartButton($(this).closest('.PCPopup.popupLNMenu'), $(this).closest('.adm-workarea'));

                var $popup = $(form).closest('.PCPopup.popupLNMenu'),
                    saveTagText = $('.locale-block textarea:first').val(),
                    $searchPopupBlock = $(form).closest('.search-popup-block'),
                    $changeTextAreas = $(form).find('.js-clearOrNotTextareaLang.js-changing'),
                    thisLangChange = false,
                    pushText = '';

                $changeTextAreas.each(function() {
                    if($(this).data('lang') == langPlace) thisLangChange = true;
                });

                isCanCloseAccorsysLocaleWindow = true;
                $('.accorsys-locale-background-shadow').hide();
                var dataForm = formToObject(form,{ajax:'Y'});
                dataForm.text = saveTagText;

                //������ ���� � �������� �� ����� :)
                $(form).find('.locale-block .locale-select textarea').each(function(){
                    if($(this).attr('data-lang-title'))
                        dataForm['artext['+$(this).data('lang-count-file')+']['+$(this).data('real-lang')+']'] = '<loc class="locale-title-tag" title="'+ $(this).attr('data-lang-title') +'" data-mark="end-of-locale-title-tag">'+ dataForm['artext['+$(this).data('lang-count-file')+']['+$(this).data('real-lang')+']'] +'</loc>';
                });

                if($popup.find('.error_not_find_in_default_files').length) notReload = true;

                if(whoNotReloaded == 'changeOnlyText') {
                    dataForm['actionType'] = 'changeText';
                }

                toMoreTimeSending = sendLocaleData(dataForm,function(data) {
                    if(data.error) {
                        var $error = $('<div class="error_on_top_popup"></div>');

                        pcLoaderStop();
                        $(form)
                            .find('.adm-workarea')
                            .find('input')
                            .show();

                        if($searchPopupBlock.length) {
                            $searchPopupBlock.prepend($error);
                        }

                        return false;
                    }

                    // #notReload
                    if(notReload) {
                        document.location.reload();
                    } else {
                        var $changeElement = $(popupReturnObject.actEl);

                        if( whoNotReloaded == 'loc-modifyTranslate' ) {
                            pushText = $(form).find('textarea[name="artext[0]['+langPlace+']"]').val();

                            if( $changeElement.find('.locale-title-tag').length ) {
                                $changeElement.find('.locale-title-tag').html(pushText);
                            } else {
                                $changeElement.html(pushText);
                            }
                        } else if( whoNotReloaded == 'loc-addTitle') {
                            pushText = $(form).find('textarea[name="artext[0]['+langPlace+']"]').val();
                            $changeElement.wrapInner('<loc data-mark="end-of-locale-title-tag" title="' + pushText + '" class="locale-title-tag"></loc>');
                        } else if( whoNotReloaded == 'loc-modifyTitle' ) {
                            pushText = $(form).find('textarea[name="artext[0]['+langPlace+']"]').val();
                            $changeElement.find('.locale-title-tag').attr('title', pushText);
                        }

                        if(typeof popupReturnObject.closeFunc == "function") popupReturnObject.closeFunc();
                    }
                }, action);

                event.preventDefault();
                event.stopPropagation();
            });

            $(form).find('input.adm-btn-cancel').click(function(event) {
                var $this = $(this),
                    $PCPopup = $this.closest('.PCPopup.popupLNMenu'),
                    $PCPopupInnerBlock = $PCPopup.find('.search-popup-block'),
                    $PCPopupMenu = $PCPopup.find('.popup_menu');

                /*if(isMobileOrNot()) { backToMinPopup($PCPopup); }*/

                if($PCPopupInnerBlock.length && $PCPopupMenu.length) {
                    $PCPopupMenu.show();
                    $PCPopup.find('.js-side_label').show().end().removeClass('not_menu');
                    $PCPopupInnerBlock.remove();

                    localMainObject.backToMenuPopup();
                    changePCPopupPosition($PCPopup);
                }

                event.preventDefault();
                event.stopPropagation();
            });
        }

        $.fn.isNotLocaleTag = function(){
            return !$(this).is('script') && !$(this).is('head') && !$(this).is('body');
        };
        $(document).on('mousedown.locale', 'p, div, span, td, input, img, a, select > option', function(e) {
            mouseDownX = e.pageX;
            mouseDownY = e.pageY;
        });

        $(document).on('mouseup.locale', 'p, div, span, td, input, img, a, select, select > option', function(e) {

            mouseUpX = e.pageX;
            mouseUpY = e.pageY;

            // ��������� �������� BX

            /*if($(this).closest(".bx-component-opener").length) return false;
             if ($(this).closest('.js-localization-exclude').get(0)) return false;
             if ($(this).closest('#accorsys-switch-lang .AccorsyslanguageContainer').get(0)) return false;
             if ($(this).closest('#BX_file_dialog').get(0)) return false;
             if ($(this).closest('#admin-informer').get(0)) return false;
             if ($(this).closest('.pc-popup-overlay').get(0)) return false;
             if ($(this).closest('.pc_loader').get(0)) return false;
             if ($(this).closest('#pcles_body').get(0)) return false;
             if ($(this).closest('#pcles_body_bg').get(0)) return false;
             if ($(this).closest('.bx-panel-tooltip').get(0)) return false; //��������� Bitrix
             if ($(this).closest('#bx-admin-prefix.bx-core-adm-dialog').get(0)) return false; //���������� ���� Bitrix
             if ($(this).closest('.bx-core-dialog-overlay').get(0)) return false; //��� ��� ����������� ���� Bitrix
             if ($(this).closest('#lang.sticky').get(0)) return false; //���� ������������� ������
             if ($(this).closest('#bx-admin-prefix').get(0) || jqLoc(this).closest('#bx-panel').get(0)) return false;*/

            if(!exclusionElementsOnAction($(this))) return false;

            //if(!isMobileOrNot())
            if(e.pageX && e.pageY) {
                $.relativeX = Math.round($.mouseDocX - $(this).offset().left);
                $.relativeY = Math.round($.mouseDocY - $(this).offset().top);
            }

            if (arLocaleParams.userAccessLevel != 'A') return true;
            e = loc_fixEvent(e);

            var $this = $(this),
                t = this,
                text, objTextType,
                positionY = e.pageY ? e.pageY : $(this).offset().top,
                closestCArea = false,
                parse = {},
                tObj = $(this),
                obj = $(this).clone().find('script').remove().end(),
                $objclone = $(obj).clone(),
                objToParse = $(this),
                pathToParse = "";

            pathToParse = parseIncludeAreas(objToParse);

            if ( !pathToParse ) {
                var objToParseBXAreaParent = objToParse.closest($('[id ^= "bx_incl_area"]')),
                    objToParseDataUrl = objToParseBXAreaParent.data('local_pathsave');

                if ( !objToParseDataUrl ) {
                    setDataUrlBXComponents();

                    objToParseDataUrl = decodeURIComponent(objToParseBXAreaParent.data('local_pathsave'));
                }

                if ( objToParseDataUrl ) {
                    pathToParse = decodeURIComponent(objToParseDataUrl);
                }

            }

            // ���� �� ������������� �������� ����� ��������� ������ �������
            if (!((($(obj).getSelectionText() && obj.text()!="" &&
                (obj.html() == obj.text() ||
                obj.text()==obj.find('*').remove().end().text() ||
                obj.find('*').remove().end().html())) ||
                (!obj.find('*').get(1) && obj.find('*').eq(0).is('img')) ||
                (!obj.html() && obj.attr('title')!=""))
                && !obj.hasClass('locale_mes') && obj.isNotLocaleTag()
                || $(obj).val())) return false;

            //���� ������ � ����� ����, ����� � �����, ����� � ���������
            /*closestCArea = false;
             if($(this).attr('id'))
             if($(this).attr('id').indexOf('bx_incl_area_')>-1)
             closestCArea = this;
             if(!closestCArea){
             $(this).find('div').each(function(){
             if($(this).attr('id'))
             if ($(this).attr('id').indexOf('bx_incl_area_')>-1)
             if(!closestCArea)
             closestCArea = this;
             });
             }
             if(!closestCArea){
             $(this).parents('div').each(function(){
             if($(this).attr('id'))
             if ($(this).attr('id').indexOf('bx_incl_area_')>-1)
             if(!closestCArea)
             closestCArea = this;
             });
             }
             $(closestCArea).children('script:last').each(function(){
             if ($(this).is('script') && $(this).text().indexOf('component_name=')>-1){
             parse = parseTemplateScript($(this).text());
             }
             });*/

            var $bxFather = $this.closest($('[id ^= "bx_incl_area"]'));

            if ( !$bxFather.data('local_bx_name') ) {
                setDataUrlBXComponents();
            }

            if ( $bxFather.data('local_bx_name') ) {
                parse['component'] = decodeURIComponent($bxFather.data('local_bx_name'));
                parse['template'] = decodeURIComponent($bxFather.data('local_bx_temp'));
            }

            tagNameToPost = false;
            //��������� �������
            if ($objclone.is('input')) {
                objTextType = 'value';
                text = $objclone.val();
                /*} else if($(obj).is('select') && isMobileOrNot()) {
                 objTextType = 'value';
                 text = $objclone.val();*/
            } else if($(obj).is('option')) {
                $('body')
                    .append('<input type="text" value="" name="focus_loc_inp" id="focus_loc_inp">');

                $('#focus_loc_inp').css({
                    'position': 'absolute',
                    'top': $(t).offset().top,
                    'left': 0
                });

                objTextType = 'value';
                text = $(t).text();

                $(t).siblings('option').each(function(){
                    $(this).prop('checked', false).removeAttr('selected');
                });

                $(t).prop('checked', true).attr('selected', 'selected');

                $('#focus_loc_inp').focus().remove();
            } else if($objclone.is('img')){
                tagNameToPost = 'img';
                text = $(obj).get(0).outerHTML;
            } else if(!$objclone.getSelectionText() && $objclone.find('*').is('img')) {
                text = $objclone.html();
            } else if($objclone.is('a')) {
                tagNameToPost = 'a';
                text = $objclone.get(0).outerHTML;
            } else {
                text = $objclone.getSelectionText();
                objTextType = 'text';
                if (!text) {
                    text = $objclone.attr('title');
                }
            }

            // ��������� ���� �� � ������ ������� � ������� .locale_mes
            var textParseHTMLArea = $.parseHTML(text),
                hasLocalMes = false,
                localMesTitle = '',
                localMesRel = '',
                tagAmount = 0;

            if(textParseHTMLArea) {
                for(var ar = 0; ar<textParseHTMLArea.length; ar++) {
                    if($(textParseHTMLArea[ar]).prop("tagName")) tagAmount++;
                    if($(textParseHTMLArea[ar]).children().length) tagAmount += $(textParseHTMLArea[ar]).children().length;

                    if($(textParseHTMLArea[ar]).hasClass('locale_mes') || $(textParseHTMLArea[ar]).find('i.locale_mes').length){
                        if($(textParseHTMLArea[ar]).hasClass('locale_mes')) {
                            localMesTitle = $(textParseHTMLArea[ar]).attr('title');
                            localMesRel = $(textParseHTMLArea[ar]).attr('rel');
                        } else {
                            localMesTitle = $(textParseHTMLArea[ar]).find('i.locale_mes').attr('title');
                            localMesRel = $(textParseHTMLArea[ar]).find('i.locale_mes').attr('rel');
                        }

                        hasLocalMes = true;
                        break;
                    }
                }

                if(hasLocalMes) {
                    var $localeMesClick;

                    $('i.locale_mes[title="'+localMesTitle+'"]').each(function(){
                        if($(this).attr('rel').replace('\\', '')==localMesRel.replace('\\', '')) $localeMesClick = $(this);
                    });

                    showPopupTimeSet = 0;
                    localeMesTimeOver = 0;
                    $localeMesClick.eq(0).mouseover();
                    return false;
                } else {
                    showPopupTimeSet = 1000;
                    localeMesTimeOver = 300;
                }
            }

            /*if(isMobileOrNot()) {
             showPopupTimeSet = 0;
             localeMesTimeOver = 0;
             }*/

            if(text === undefined || !text.removeSpacesLocal()) return false;

            var arMenu = [],
                saveMenuText = escapeHtml(arLocaleParams.lang.addTag.replace('#TEXT#',text)),
                $bxAreaInFirstParent = $(this).closest($('[id ^= "bx_incl_area"]')),
                needSaveMenu = false;

            if( $bxAreaInFirstParent.length ) {
                var $scriptsOnFirstParen = $bxAreaInFirstParent.find('>script'),
                    scriptText = '';

                if( $scriptsOnFirstParen.length ) {
                    $scriptsOnFirstParen.each(function() {
                        scriptText = $(this).html();

                        if(
                            scriptText && (scriptText.indexOf('if(window.BX)BX.ready(function()') != -1) &&
                            (scriptText.indexOf('component_name=bitrix%3Amenu') != -1)
                        ) {
                            needSaveMenu = true;
                            saveMenuText = arLocaleParams.lang.translate_menu_links;
                        }
                    });
                } else {
                    if ( !$bxAreaInFirstParent.data('local_pathsave') ) {
                        setDataUrlBXComponents();
                    }

                    if ( $bxAreaInFirstParent.data('local_pathsave') && $bxAreaInFirstParent.data('local_bx_menu') ) {
                        needSaveMenu = true;
                        saveMenuText = arLocaleParams.lang.translate_menu_links;
                    }
                }

            }

            if(needSaveMenu) {
                // ��������� ����� ���� "��������� ������ ����"
                arMenu.push({
                    TEXT: saveMenuText,
                    GLOBAL_ICON: 'loc-menu-edit',
                    ONCLICK: function() {
                        if($bxAreaInFirstParent.get(0).OPENER) {
                            $bxAreaInFirstParent.get(0).OPENER.executeDefaultAction();
                        } else {
                            $bxAreaInFirstParent.children().each(function(){
                                if(this.OPENER){
                                    this.OPENER.executeDefaultAction();
                                    return false;
                                }
                            });
                        }
                    }
                });
            } else {
                // ��������� ����� ���� "��������� � ������ ���������"
                arMenu.push({
                    TEXT: saveMenuText,
                    GLOBAL_ICON: 'loc-newTag',
                    ONCLICK: function(event) {
                        var killLoader = pcInLoaderStart($(this).closest('.PCPopup.popupLNMenu'), $(this));

                        openNewTagWin({
                            'object':t,
                            'text':text,
                            'component':parse.component,
                            'template':parse.template,
                            'objectType':objTextType,
                            'left':e.pageX
                        }, false, false, false, false, false, false, false, pathToParse);

                        event.preventDefault();
                        event.stopPropagation();
                    }
                });
            }

            // ��������� �����������
            arMenu.push({
                SEPARATOR:true
            });

            // ��������� ����� ���� "�������� �����"
            arMenu.push({
                TEXT: escapeHtml(arLocaleParams.lang.modify.replace('#TEXT#',text)),
                GLOBAL_ICON: 'loc-modifyText',
                ONCLICK: function(event) {
                    var killLoader = pcInLoaderStart($(this).closest('.PCPopup.popupLNMenu'), $(this));

                    whoNotReloaded = 'changeOnlyText';

                    openNewTagWin({
                        'object':t,
                        'text':text,
                        'component':parse.component,
                        'template':parse.template,
                        'objectType':objTextType,
                        'hideTagInput':'Y',
                        'left':e.pageX
                    },false,false,false,false,false,false,false,pathToParse);

                    event.preventDefault();
                    event.stopPropagation();
                }
            });

            // ��������� ����� ���� "����� ��������/��������"
            arMenu.push({
                TEXT:arLocaleParams.lang.searchTranslate,
                GLOBAL_ICON:'loc-searchTranslate',
                ONCLICK: function(event){
                    event.preventDefault();
                    event.stopPropagation();
                },
                MENU: [
                    {
                        TEXT:arLocaleParams.lang.stGoogle,
                        GLOBAL_ICON:'loc-searchTranslateGoogle',
                        ONCLICK: function(event) {
                            if (!arLocaleParams.gtranslate_key) {
                                localeGoToBadLangSettings();
                                return false;
                            }

                            var $popup = $(this).closest('.PCPopup.popupLNMenu'),
                                killLoader = false;

                            if(!$popup.length) $popup = $('.PCPopup.popupLNMenu');
                            killLoader = pcLoaderStart($popup);

                            openTranslateWindow(t,text);
                            //window.open(arLocaleParams.gtranslate_url.replace('#TEXT#',encodeURIComponent(text)));
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    },
                    {
                        TEXT:arLocaleParams.lang.stMicrosoft,
                        GLOBAL_ICON:'loc-searchTranslateMicrosoft',
                        ONCLICK: function(event){
                            if (!arLocaleParams.microsofttranslate_key || erorrMicrosoftKeyRequest){
                                localeGoToBadLangSettings();
                                return false;
                            }

                            var $popup = $(this).closest('.PCPopup.popupLNMenu'),
                                killLoader = false;

                            if(!$popup.length) $popup = $('.PCPopup.popupLNMenu');

                            killLoader = pcLoaderStart($popup);

                            openTranslateWindow(t,text);
                            //window.open(arLocaleParams.ytranslate_url.replace('#TEXT#',encodeURIComponent(text)));
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    },
                    {
                        TEXT:arLocaleParams.lang.stYandex,
                        GLOBAL_ICON:'loc-searchTranslateYandex',
                        ONCLICK: function(event) {
                            if(!arLocaleParams.ytranslate_key){
                                localeGoToBadLangSettings();
                                return false;
                            }

                            var $popup = $(this).closest('.PCPopup.popupLNMenu'),
                                killLoader = false;

                            if(!$popup.length) $popup = $('.PCPopup.popupLNMenu');
                            killLoader = pcLoaderStart($popup);
                            openTranslateWindow(t,text);
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    },
                    {
                        SEPARATOR:true
                    },
                    {
                        TEXT:arLocaleParams.lang.sWiki,
                        GLOBAL_ICON:'loc-searchWiki',
                        ONCLICK: function(event) {
                            var $popup = $(this).closest('.PCPopup.popupLNMenu'),
                                killLoader = false;

                            if(!$popup.length) $popup = $('.PCPopup.popupLNMenu');

                            killLoader = pcLoaderStart($popup);

                            window.open(arLocaleParams.wiki_url.replace('#TEXT#',encodeURIComponent(text)));

                            pcLoaderStop();
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    },
                    {
                        TEXT:arLocaleParams.lang.sYouTube,
                        GLOBAL_ICON:'loc-searchYouTube',
                        ONCLICK: function(event){
                            var killLoader = pcLoaderStart($(this).closest('.PCPopup.popupLNMenu'));

                            window.open(arLocaleParams.ytube_url.replace('#TEXT#',encodeURIComponent(text)));

                            pcLoaderStop();
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                ]
            });

            // ��������� ����� ���� "* �����������"
            if (tObj.is('a') && !needSaveMenu) {
                arMenu.push({
                    TEXT:arLocaleParams.lang.selectPart,
                    GLOBAL_ICON:'loc-selectPart',
                    ONCLICK: function(event){
                        var killLoader = pcInLoaderStart($(this).closest('.PCPopup.popupLNMenu'), $(this));

                        var span = $('<span></span>').addClass(tObj.get(0).className).attr('href',tObj.attr('href')).html(tObj.html());
                        tObj.replaceWith(span);

                        setTimeout(function(){
                            killLoader();
                            $('.pc-popup-overlay').click();
                        }, 1000);

                        event.preventDefault();
                        event.stopPropagation();
                    }
                });
            }

            // ��������� �����������
            arMenu.push({
                SEPARATOR:true
            });

            // ��������� ����� ���� "�������� ���������"
            arMenu.push({
                TEXT:'<span style="color: #999;" title="'+escapeHtml(arLocaleParams.lang.addTitleTitle)+'">'+escapeHtml(arLocaleParams.lang.addTitle)+'</span>',
                GLOBAL_ICON:'loc-addTitleDisabled',
                ONCLICK: function(event) {
                    alert(clearHtmlTags(arLocaleParams.lang.hintDisabled));

                    event.preventDefault();
                    event.stopPropagation();
                }
            });

            if($(obj).is('option')) {
                showLocaleMenu($(t).parent('select'), arMenu);
            } else {
                showLocaleMenu(this, arMenu);
            }

            e.preventDefault();
            e.stopPropagation();
        });

        var selectTimeout = false,
            stayMouseOn = false,
            aSetTimeOutMouseOver;

        //if(!isMobileOrNot())
        $(document)
            .on('mouseover','img, a, input, select > option, a > *', function(e) {
                var $objEl = $(this),
                    offset = $objEl.offset();

                if('mouseoverHasImg' in localMainObject && $objEl.is('a')) {
                    return false;
                }

                if(aSetTimeOutMouseOver) clearTimeout(aSetTimeOutMouseOver);

                if($objEl.is('img'))
                    localMainObject['mouseoverHasImg'] = $objEl.get(0).outerHTML;

                aSetTimeOutMouseOver = setTimeout(function() {
                    if(!isCanCloseAccorsysLocaleWindow)
                        return false;
                    if ($objEl.is('#bx-admin-prefix *') || $objEl.closest('#bx-panel').get(0)) return false;
                    stayMouseOn = true;

                    if (selectTimeout) clearTimeout(selectTimeout);
                    if (!$objEl.find('.locale_mes').get(0)) {
                        selectTimeout = setTimeout(function() {
                            //if(!isMobileOrNot()) {
                            $.relativeX = Math.round($.mouseDocX - offset.left);
                            $.relativeY = Math.round($.mouseDocY - offset.top);
                            //}

                            if (stayMouseOn){
                                $objEl.selectText().trigger('mouseup.locale');
                            }
                        }, 500);
                    } else {
                        alert(clearHtmlTags(arLocaleParams.lang.tooManyElementsError));
                    }
                    e.stopPropagation();
                }, showPopupTimeSet);
            }).on('mouseout','img, a, input, select > option, a > *',function(){
                if(
                    'mouseoverHasImg' in localMainObject && $(this).is('img') &&
                    (localMainObject.mouseoverHasImg == $(this).get(0).outerHTML)
                ){
                    delete localMainObject.mouseoverHasImg;
                }

                if(aSetTimeOutMouseOver) clearTimeout(aSetTimeOutMouseOver);
                if ($(this).is('#bx-admin-prefix *')) return false;
                stayMouseOn = false;
            });

        var addTitleWin = function(obj,text,comp,tpl,file,left) {
            toMoreTimeSending = sendLocaleData({
                    files:[$(obj).attr('rel')],
                    tag_name:$(obj).attr('title')
                },
                function(data){
                    pcLoaderStop();

                    var $visiblePopup = $(".PCPopup.popupLNMenu"),
                        $innerBlock = $('<div class="search-popup-block" style="display: none"></div>');

                    if (data.FORM){
                        $innerBlock.html($(data.FORM));
                        if(!$visiblePopup.is(":visible")) $visiblePopup = false;

                        /*if(isMobileOrNot()) {
                         var $resizeEl = $innerBlock.find('span.resize'),
                         $buttonBlock = $innerBlock.find('.adm-workarea');

                         if($buttonBlock.length && $resizeEl.length) $buttonBlock.append($resizeEl.attr('title', arLocaleParams.lang.rollUpToWholeArea));
                         }*/

                        if($visiblePopup){
                            $visiblePopup.append($innerBlock); // ��������� ����� � �����
                            $visiblePopup.find('.popup_menu, .js-side_label').hide().end().addClass('not_menu');
                            $visiblePopup.append($innerBlock.show()); // ���������� ����
                            changePCPopupPosition($visiblePopup); // ����������� �����
                        }

                        submitNewLocaleFormHandler($innerBlock.find('form'),'addTitle',obj);
                        searchPopupBlockHeightChange($visiblePopup);

                        $innerBlock.addKeyupLocaleHandler().addLocaleFormHandlers();

                        $innerBlock.on('click','.lang-trigger',function() {
                            var rel = $(this).attr('rel'),
                                curBlockFile = $(this).closest('.block-lang-file');

                            if( curBlockFile.get(0) ) {
                                $(this).closest('p').before(curBlockFile.find('.locale-block.block-'+rel).show());
                            } else {
                                $(this).closest('p').before($('.locale-block.block-'+rel).show());
                            }

                            if( !$(this).siblings('.lang-trigger').get(0) ) {
                                $(this).parents('p:first').remove();
                            } else {
                                $(this).next('span').remove().end().remove();
                            }

                            $innerBlock.find('.locale-block:visible').removeClass('last').last().addClass('last');

                            searchPopupBlockHeightChange($visiblePopup);

                            if(!$innerBlock.closest('.PCPopup.popupLNMenu').hasClass('screen_max')) {
                                changePCPopupPosition($visiblePopup);
                            }

                            if($innerBlock.hasClass('big')){
                                $innerBlock.find('.locale-block:visible').removeClass('last');
                            }

                            admWorkareaShadow($visiblePopup);

                            return false;
                        }).on('click','ul',function(e) {
                            e.stopPropagation();
                        });
                    }

                },'addTitleForm');
        };

        function openNewTagWin(obj,text,comp,tpl,hideTagInput,objTextType,file,left,fileIncPath){
            text = text || false;
            comp = comp || false;
            tpl = tpl || false;
            hideTagInput = hideTagInput || false;
            objTextType = objTextType || false;
            file = file || false;
            left = left || false;
            fileIncPath = fileIncPath || false;

            if (obj && obj['object']){
                text = obj['text'];
                comp = obj['component'];
                tpl = obj['template'];
                hideTagInput = obj['hideTagInput'];
                objTextType = obj['objectType'];
                left = obj['left'];
                obj = obj['object'];
            }

            var $visiblePopup = $(".PCPopup.popupLNMenu"),
                $innerBlock = $('<div class="search-popup-block" style="display: none"></div>');

            if(!$visiblePopup.is(":visible")) $visiblePopup = false;

            if($visiblePopup){
                $visiblePopup.append($innerBlock);
            }

            if (!comp) comp="";
            if (!tpl) tpl="";

            var selectedText = text;
            if (typeof selectedText != 'string'){
                selectedText = "";
            }
            var objSelector;

            if (obj.id){
                objSelector = obj.id;
            }else if (obj.className){
                objSelector = obj.className;
            }else if ($(obj).parent().get(0).id){
                objSelector = $(obj).parent().get(0).id;
            }else if ($(obj).parent().get(0).className){
                objSelector = $(obj).parent().get(0).className;
            }

            var settingsSendLocale = {
                comp: comp,
                tpl: tpl,
                file: file,
                text: selectedText?selectedText:$(obj).clone().find('*').remove().end().text(),
                hideTagInput: hideTagInput,
                objType: obj.tagName,
                objTextType: objTextType,
                objSelector: objSelector
            };

            if(whoNotReloaded =='changeOnlyText') {
                settingsSendLocale['actionType'] = 'changeText';
            }

            if(fileIncPath && fileIncPath != undefined && fileIncPath != false && fileIncPath != 'undefined'){
                settingsSendLocale.includeAreas = fileIncPath;
            }
            toMoreTimeSending = sendLocaleData(settingsSendLocale,
                function(data) {
                    pcLoaderStop();
                    if (data.FORM) {
                        $(data.FORM).appendTo($innerBlock);
                        $innerBlock.find('.hidden-text').click(function(){
                            $(this).before(document.createTextNode($(this).find('span').text()));
                            $(this).remove();
                        });

                        /*if(isMobileOrNot()) {
                         var $resizeEl = $innerBlock.find('span.resize'),
                         $buttonBlock = $innerBlock.find('.adm-workarea');

                         if($buttonBlock.length && $resizeEl.length) $buttonBlock.append($resizeEl.attr('title', arLocaleParams.lang.rollUpToWholeArea));
                         }*/

                        $innerBlock.addKeyupLocaleHandler().addLocaleFormHandlers();
                        submitNewLocaleFormHandler($innerBlock.find('form'),'newTag',obj);
                        $innerBlock.on('click','.lang-trigger',function() {
                            var rel = $(this).attr('rel'),
                                curBlockFile = $(this).closest('.block-lang-file');

                            if( curBlockFile.get(0) ) {
                                $(this).closest('p').before(curBlockFile.find('.locale-block.block-'+rel).show());
                            } else {
                                $(this).closest('p').before($('.locale-block.block-'+rel).show());
                            }

                            if( !$(this).siblings('.lang-trigger').get(0) ) {
                                $(this).parents('p:first').remove();
                            } else {
                                $(this).next('span').remove().end().remove();
                            }

                            $innerBlock.find('.locale-block:visible').removeClass('last').last().addClass('last');

                            searchPopupBlockHeightChange($visiblePopup);

                            if(!$innerBlock.closest('.PCPopup.popupLNMenu').hasClass('screen_max'))
                                changePCPopupPosition($visiblePopup);

                            if($innerBlock.hasClass('big')) $innerBlock.find('.locale-block:visible').removeClass('last');

                            admWorkareaShadow($visiblePopup);

                            return false;
                        }).on('click','ul',function(e) {
                            e.stopPropagation();
                        });
                    }else{
                        if(data.MESSAGE){
                            $innerBlock.append(data.MESSAGE)
                                .append('<div class="adm-workarea" style="text-align:center"><input class="adm-btn-cancel close-this-form" type="button" value="' + arLocaleParams.lang.closeWin + '" name="cancel" /></div>')
                                .css('width','350px');
                        } else if(data.error){
                            $innerBlock
                                .append(data.error)
                                .append('<div class="adm-workarea" style="text-align:center"><input class="adm-btn-cancel close-this-form" type="button" value="' + arLocaleParams.lang.closeWin + '" name="cancel" /></div>')
                                .css('width','350px');
                        }
                    }
                    if($visiblePopup){
                        if(data.error && (data.errorType == 'inside')) {
                            var $error = $('<div class="error_on_top_popup"></div>');

                            $visiblePopup
                                .find('.adm-workarea')
                                .find('button')
                                .show()
                            //.end()
                            //.prepend($error.html(data.error));

                            if($innerBlock.length) {
                                $innerBlock.prepend($error);
                            }
                        } else {
                            $visiblePopup.find('.popup_menu, .js-side_label').hide().end().addClass('not_menu');
                            $visiblePopup.append($innerBlock.show());

                            // ��������� ���������� ���������
                            var textParseHTMLArea = $.parseHTML(text),
                                tagAmount = 0;
                            if(textParseHTMLArea && (data.FOUND != 'NOT_FOUND')){
                                for(var ar = 0; ar<textParseHTMLArea.length; ar++){
                                    if($(textParseHTMLArea[ar]).prop("tagName")) tagAmount++;
                                    if($(textParseHTMLArea[ar]).children().length) tagAmount += $(textParseHTMLArea[ar]).children().length;
                                }

                                if(tagAmount > 1) {
                                    $innerBlock.prepend('<div class="error_on_top_popup">'+arLocaleParams.lang.tooManyElementsError+'</div>');
                                }
                            }
                        }
                        changePCPopupPosition($visiblePopup);
                    }

                    searchPopupBlockHeightChange($visiblePopup);
                    admWorkareaShadow($visiblePopup);

                },'find');
        }
        function openTranslateWindow(obj, text) {
            var translator_name = '',
                classNameTranslator = '',
                $popup = $(".PCPopup.popupLNMenu"),
                $popupInner = $('<div class="search-popup-block" style="width:465px;"></div>');
            toMoreTimeSending = sendLocaleData({'text':text,'translator_name':translator_name.name},function(data){
                pcLoaderStop();

                $(data.HTML).appendTo($popupInner);

                /*if(isMobileOrNot()) {
                 var $resizeEl = $popupInner.find('span.resize'),
                 $buttonBlock = $popupInner.find('.adm-workarea');

                 if($buttonBlock.length && $resizeEl.length) $buttonBlock.append($resizeEl.attr('title', arLocaleParams.lang.rollUpToWholeArea));
                 }*/

                var lang = $popupInner.find('input[name=lang]').val(),
                    textarea = $popup.find('textarea#translation');
                $popupInner.find('select.change-langs').change(function() {
                    textarea = $popup.find('textarea#translation');
                    text = $popup.find('textarea#translation').val();

                    $(this).parents('.select-wrap:first').find('.flag-container-default-lang > span:first').attr("class",'ico-flag-' + $(this).val().toUpperCase());
                    switch ($popup.find('.translation-service').val()) {
                        case 'loc_googleTranslate':
                            translator_name = loc_googleTranslate;
                            break;
                        case 'loc_microsoftTranslate':
                            translator_name = loc_microsoftTranslate;
                            break;
                        case 'loc_translate_ya':
                            translator_name = loc_translate_ya;
                            break;
                    }
                    var lang_to = $(this).val();
                    translator_name(text, lang, lang_to,textarea);
                });
                $popupInner.find('select.translation-service').change(function() {
                    var lang_to = $popup.find('.change-langs').val();
                    textarea = $popup.find('textarea#translation');
                    text = $popup.find('textarea#translation').val();

                    switch ($popup.find('.translation-service').val()){
                        case 'loc_googleTranslate':
                            classNameTranslator = 'loc-searchTranslateGoogle';
                            break;
                        case 'loc_microsoftTranslate':
                            classNameTranslator = 'loc-searchTranslateMicrosoft';
                            break;
                        case 'loc_translate_ya':
                            classNameTranslator = 'loc-searchTranslateYandex';
                            break;
                    }
                    $(this).closest('.search-popup-block-wrapper')
                        .find('.bx-core-popup-menu-item-icon')
                        .attr('class','bx-core-popup-menu-item-icon '+classNameTranslator);

                    switch ($popup.find('.translation-service').val()) {
                        case 'loc_googleTranslate':
                            translator_name = loc_googleTranslate;
                            break;
                        case 'loc_microsoftTranslate':
                            translator_name = loc_microsoftTranslate;
                            break;
                        case 'loc_translate_ya':
                            translator_name = loc_translate_ya;
                            break;
                    }

                    translator_name(text, '', lang_to,textarea);
                });

                $popupInner.find('.adm-btn-cancel').click(function(event) {
                    $popupInner.remove();
                    $popup.find('.popup_menu, .js-side_label').show().end().removeClass('not_menu');

                    localMainObject.backToMenuPopup();
                    changePCPopupPosition($popup);

                    event.preventDefault();
                    event.stopPropagation();
                });

                $popupInner.find('.local-textarea-copytext').click(function(event){
                    event.preventDefault();
                    event.stopPropagation();
                });

                $popupInner.find('.js-replace-by-translated').click(function(event) {
                    var $textarea = $(this).closest(".PCPopup.popupLNMenu").find('textarea#translation');

                    $(obj).html($(obj).html().replace(text, $textarea.val()));
                    $(obj).trigger('localizationChange');
                    $popupInner.remove();

                    $popup
                        .find('.popup_menu, .js-side_label')
                        .show().end()
                        .removeClass('not_menu');

                    changePCPopupPosition($popup);

                    event.preventDefault();
                    event.stopPropagation();
                });

                $popup.find('.popup_menu, .js-side_label').hide().end().addClass('not_menu');
                $popup.append($popupInner);

                changePCPopupPosition($popup);

            },'getTranslateTemplate');
        };

        /**
         * ������� ��������� ����� ����������� � Popup
         * @param: obj = ������ ���������
         * @param: left = ������� Popup ����� ���������
         * @param: positionY = ������� Popup ������ ���������
         */
        function openLocaleWin(obj, loader, pushClass, text) {
            text = text || '';
            loader = loader || false;
            pushClass = pushClass || '';

            var $PCPopup = $(".PCPopup.popupLNMenu");

            if($PCPopup.is(":visible")) {
                var $PCPopupMenu = $PCPopup.find('.popup_menu'),
                    $PCPopupInnerBlock = $('<div class="search-popup-block '+pushClass+'"></div>'),
                    systemText = '';

                if($(obj).hasClass('system')){
                    systemText += '<div class="error_on_top_popup">'+arLocaleParams.lang.systemTeplateModify+'</div>';
                }
                if($(obj).hasClass('workflow')){
                    systemText += '<div class="error_on_top_popup">'+arLocaleParams.lang.workflowMode+'</div>';
                }

                // ������� ������ ����� ��� ����������� � �����
                toMoreTimeSending = sendLocaleData(
                    {
                        files:[$(obj).attr('rel')],
                        tag_name:$(obj).attr('title'),
                        text: text
                    },
                    function(data){
                        if(loader) loader();

                        if (data.FORM){
                            if(systemText) $PCPopupInnerBlock.append(systemText);
                            $PCPopupInnerBlock.append($(data.FORM));

                            /*if(isMobileOrNot()) {
                             var $resizeEl = $PCPopupInnerBlock.find('span.resize'),
                             $buttonBlock = $PCPopupInnerBlock.find('.adm-workarea');

                             if($buttonBlock.length && $resizeEl.length) $buttonBlock.append($resizeEl.attr('title', arLocaleParams.lang.rollUpToWholeArea));
                             }*/

                            $PCPopupMenu.hide();
                            $PCPopup.find('.js-side_label').hide().end().addClass('not_menu');
                            submitNewLocaleFormHandler($PCPopupInnerBlock.find('form:first'),'saveTag',obj);
                            $PCPopupInnerBlock.addKeyupLocaleHandler().addLocaleFormHandlers();
                            if($(obj).hasClass('system'))
                                $PCPopupInnerBlock.find('form:first').prepend("<input type='hidden' name='is_system' value='Y'>");

                            $PCPopup.append($PCPopupInnerBlock);

                            changePCPopupPosition($PCPopup);
                            searchPopupBlockHeightChange($PCPopup);
                            admWorkareaShadow($PCPopup);

                            $PCPopupInnerBlock.find(".adm-btn-cancel").click(function(event) {
                                $PCPopupMenu.show();
                                $PCPopup.find('.js-side_label').show().end().removeClass('not_menu');
                                $PCPopupInnerBlock.remove();

                                changePCPopupPosition($PCPopup);

                                event.preventDefault();
                                event.stopPropagation();
                            });
                            $PCPopupInnerBlock.on('click','.lang-trigger',function() {
                                var rel = $(this).attr('rel'),
                                    curBlockFile = $(this).closest('.block-lang-file');

                                if( curBlockFile.get(0) ) {
                                    $(this).closest('p').before(curBlockFile.find('.locale-block.block-'+rel).show());
                                } else {
                                    $(this).closest('p').before($('.locale-block.block-'+rel).show());
                                }

                                if( !$(this).siblings('.lang-trigger').get(0) ) {
                                    $(this).parents('p:first').remove();
                                } else {
                                    $(this).next('span').remove().end().remove();
                                }

                                $PCPopupInnerBlock.find('.locale-block:visible').removeClass('last').last().addClass('last');

                                searchPopupBlockHeightChange($PCPopup);

                                if(!$PCPopupInnerBlock.closest('.PCPopup.popupLNMenu').hasClass('screen_max'))
                                    changePCPopupPosition($PCPopup);

                                if($PCPopupInnerBlock.hasClass('big')) $PCPopupInnerBlock.find('.locale-block:visible').removeClass('last');

                                admWorkareaShadow($PCPopup);

                                return false;
                            }).on('click','ul',function(e) {
                                e.stopPropagation();
                            });

                        }
                    },
                    'getTagValues'
                );
            }
        };

        $('input').each(function(){
            if ($(this).val().indexOf('<i class=locale_mes') > -1){
                var obj = $($(this).val());
                $(this).addClass('locale_mes').attr({
                    'title':obj.attr('title'),
                    'rel':obj.attr('rel')
                }).val(obj.text());
            }
            if ($(this).attr('placeholder') && $(this).attr('placeholder').indexOf('<i class=locale_mes') > -1){
                var obj = $($(this).attr('placeholder'));
                $(this).addClass('locale_mes').attr({
                    'title':obj.attr('title'),
                    'rel':obj.attr('rel')
                }).attr('placeholder',obj.text());
            }
        });
        $('a[title]').each(function(){
            if ($(this).attr('title').indexOf('<i class=locale_mes') > -1){
                var obj = $($(this).attr('title')).css({
                    'background':'url("/bitrix/images/accorsys.localization/title_edit.png") no-repeat scroll center center transparent',
                    'width':'16px',
                    'height':'16px',
                    'display':'block',
                    'margin-left': '8px',
                    'margin-top': '-16px'
                });
                var new_title = obj.text();
                obj.html('<loc title="'+obj.text()+'"></loc>').addClass('locale_title_translated');
                $(this).append(obj).attr('title',new_title);
            }
        });
        $('option').each(function(){
            if ($(this).html().indexOf('<i class=locale_mes') > -1){
                var obj = $($(this).html());
                $(this).addClass('locale_mes').attr({
                    'title':obj.attr('title'),
                    'rel':obj.attr('rel')
                }).html(obj.text());
            }
        });

        var localeMesSetTimeOut;
        //if(!isMobileOrNot())
        $(document).on('mouseover', '.locale_mes', function(e) {
            var $objEl = $(this),
                offset = $objEl.offset();

            if ($(this).closest('.bx-core-popup-menu-item').get(0)) return false;
            if(!isCanCloseAccorsysLocaleWindow) return false;

            var t = this,
                tObj = $objEl.parent(),
                text;

            if(localeMesSetTimeOut) clearTimeout(localeMesSetTimeOut);

            localeMesSetTimeOut = setTimeout(function() {
                e = loc_fixEvent(e);

                if($(t).is('input')) {
                    text = $(t).val();
                } else {
                    text = $(t).html();
                }
                stayMouseOn = true;
                if (selectTimeout) clearTimeout(selectTimeout);

                selectTimeout = setTimeout(function() {
                    $(t).selectText();

                    //if(!isMobileOrNot()) {
                    $.relativeX = Math.round($.mouseDocX - offset.left);
                    $.relativeY = Math.round($.mouseDocY - offset.top);
                    //}

                    if (!stayMouseOn) return false;

                    var menuItems = [
                        {
                            TEXT:$(t).hasClass('locale_title_translated')?($(t).find('loc').get(0)?arLocaleParams.lang.modifyTitle:arLocaleParams.lang.addTitle):escapeHtml(arLocaleParams.lang.menuModifyTranslate.replace('#TEXT#',text)),
                            GLOBAL_ICON:'loc-modifyTranslate',
                            ONCLICK: function() {
                                var killLoader = pcInLoaderStart($(this).closest('.PCPopup.popupLNMenu'), $(this));

                                whoNotReloaded = 'loc-modifyTranslate';
                                notReload = false;
                                changeGlobalText = $(t);

                                openLocaleWin(t, killLoader, 'text_change_popup', text);
                            }
                        }
                    ];
                    if ( !$(t).hasClass('locale_title_translated') ) {
                        if ( $(t).find('loc').attr('title') ) {
                            menuItems.push({
                                TEXT:escapeHtml(arLocaleParams.lang.modifyTitle.replace('#TEXT#',$(t).find('loc').attr('title'))),
                                GLOBAL_ICON:'loc-modifyTitle',
                                ONCLICK: function(event){
                                    var killLoader = pcInLoaderStart($(this).closest('.PCPopup.popupLNMenu'), $(this));

                                    whoNotReloaded = 'loc-modifyTitle';
                                    notReload = false;
                                    changeGlobalText = $(t);

                                    addTitleWin(
                                        t,false,false,false,false,e.pageX
                                    );

                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            });
                        } else if( !$(t).is('input') && !$(t).is('select') ) {
                            menuItems.push({
                                TEXT:escapeHtml(arLocaleParams.lang.addTitle),
                                GLOBAL_ICON:'loc-addTitle',
                                ONCLICK: function(event){
                                    var killLoader = pcInLoaderStart($(this).closest('.PCPopup.popupLNMenu'), $(this));

                                    whoNotReloaded = 'loc-addTitle';
                                    notReload = false;
                                    changeGlobalText = $(t);

                                    addTitleWin(
                                        t,false,false,false,false,e.pageX
                                    );

                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            });
                        }
                        menuItems.push({
                            SEPARATOR:true
                        });
                    }


                    if ( $(t).find('loc').attr('title') != 'EMPTY_VALUE' ) {
                        var delTagText = '', delTagIcon = '';

                        if ( $(t).hasClass('system') ) {
                            delTagIcon = 'loc-delTagDisabled';
                            delTagText = $(t).hasClass('locale_title_translated')?arLocaleParams.lang.delTitle:'<span style="color: #6e6e6e;">'+escapeHtml(arLocaleParams.lang.delTag)+'</span>';
                        } else {
                            delTagIcon = 'loc-delTag';
                            delTagText = $(t).hasClass('locale_title_translated')?arLocaleParams.lang.delTitle:arLocaleParams.lang.delTag;
                        }

                        menuItems.push({
                            TEXT: delTagText,
                            GLOBAL_ICON: delTagIcon,
                            ONCLICK: function() {
                                var textToSend = '';

                                if ( $(t).find('.locale-title-tag').length ) {
                                    textToSend = $(t).find('.locale-title-tag').html();
                                } else {
                                    textToSend = $(t).html();
                                }

                                if ( $(t).hasClass('system') ) {
                                    alert(clearHtmlTags(arLocaleParams.lang.deleteTagDisabled));

                                    return false;
                                } else if ( confirm(arLocaleParams.lang.tagDeleteAlert) ) {
                                    var killLoader = pcInLoaderStart($(this).closest('.PCPopup.popupLNMenu'), $(this));

                                    toMoreTimeSending = sendLocaleData({
                                        'text': textToSend,
                                        'file': $(t).attr('rel'),
                                        'tag': $(t).attr('title'),
                                        'onlyLangFile': $(t).hasClass('locale_title_translated')?1:0
                                    }, function(data) {
                                        if ( data['MESSAGE'] ) {
                                            document.location.reload();
                                        }
                                    },'deleteTag');
                                }
                            }
                        });
                    }

                    if ( $(t).find('loc').attr('title') ) {
                        menuItems.push({
                            TEXT: arLocaleParams.lang.delTitle,
                            GLOBAL_ICON: 'loc-delTagHint',
                            ONCLICK: function() {
                                if ( confirm(arLocaleParams.lang.hintDeleteAlert) ) {
                                    var killLoader = pcInLoaderStart($(this).closest('.PCPopup.popupLNMenu'), $(this)),
                                        $locHTML = $(t).find('.locale-title-tag').html();

                                    toMoreTimeSending = sendLocaleData({
                                        'file': $(t).attr('rel'),
                                        'tag': $(t).attr('title'),
                                        'onlyLangFile': $(t).hasClass('locale_title_translated')?1:0
                                    }, function(data) {
                                        pcLoaderStop();
                                        if ( data['MESSAGE'] ) {
                                            $(t).html($locHTML);

                                            if ( typeof popupReturnObject.closeFunc == 'function' ) {
                                                popupReturnObject.closeFunc();
                                            }
                                        }
                                    },'deleteHint');
                                }
                            }
                        });
                    }

                    showLocaleMenu(t,menuItems);
                    localeMesTimeOver = 300;
                },localeMesTimeOver);
                showPopupTimeSet = 1000;
            }, showPopupTimeSet);

            e.preventDefault();
            e.stopPropagation();
        }).on('mouseout','.locale_mes',function() {
            if(localeMesSetTimeOut) clearTimeout(localeMesSetTimeOut);
            stayMouseOn = false;
        });

        $(document).on('click', 'a', function(event) {
            if( exclusionElementsOnAction($(this)) ) {
                var promptResulte = confirm(arLocaleParams.lang.linkFollow);

                if(!promptResulte) {
                    var $objEl = $(this),
                        offset = $objEl.offset();

                    //if( !isMobileOrNot() ) {
                    $.relativeX = Math.round($.mouseDocX - offset.left);
                    $.relativeY = Math.round($.mouseDocY - offset.top);
                    //}

                    $(this).selectText().trigger('mouseup.locale');

                    return false;
                }
            }

            var url = $(this).attr('href').split('#')[0];

            if($(this).attr('target') != "_blank") {
                if (url) {
                    if (url.indexOf("?") > -1) {
                        if (url.indexOf('clear_cache=') > -1)
                            url = url.replace('clear_cache=N', 'clear_cache=Y');
                        else
                            url = url + "&clear_cache=Y";
                    } else {
                        url = url + "?clear_cache=Y";
                    }
                    document.location.href = url;
                    return false;
                }

                event.preventDefault();
                event.stopPropagation();
            }
        });

        $(document).click(function(){
            $('ul.selectblock').hide();
        });

        $('#bx-panel-toggle-caption:first').text(arLocaleParams.lang.mode);
    });

    /*
     * ������� ��������� �������� ��� ������� �� ���� ��������� popup
     * */
    function exclusionElementsOnAction($this) {
        if (
            $this.closest(".bx-component-opener").length ||
            $this.closest('.js-localization-exclude').get(0) ||
            $this.closest('#accorsys-switch-lang .AccorsyslanguageContainer').get(0) ||
            $this.closest('#BX_file_dialog').get(0) ||
            $this.closest('#admin-informer').get(0) ||
            $this.closest('.pc-popup-overlay').get(0) ||
            $this.closest('.pc_loader').get(0) ||
            $this.closest('#pcles_body').get(0) ||
            $this.closest('#pcles_body_bg').get(0) ||
            $this.closest('.bx-panel-tooltip').get(0) || //��������� Bitrix
            $this.closest('#bx-admin-prefix.bx-core-adm-dialog').get(0) || //���������� ���� Bitrix
            $this.closest('.bx-core-dialog-overlay').get(0) || //��� ��� ����������� ���� Bitrix
            $this.closest('#lang.sticky').get(0) || //���� ������������� ������
            $this.closest('#bx-admin-prefix').get(0) ||
            $this.closest('#bx-panel').get(0)
        ) return false;

        return true;
    }

    // ��������� ������ Popup
    // ������� resizer ������� ����� ������
    $(document).on('mousedown', '.PCPopup.popupLNMenu .resize', function(c) {
        if( $(this).hasClass('top-right') ) return false;

        var $this = $(this),
            $popup = $this.closest('.PCPopup.popupLNMenu'),
            $searchPopup = $popup.find('.search-popup-block'),
            $admWorkarea = $searchPopup.find('.adm-workarea'),
            searchPopupFormHeight = parseInt($searchPopup.find('form[name="new_locale_tag"]').height())-20,
            searchPopupHeight = $searchPopup.data('height') || $searchPopup.outerHeight()-30,
            $popupTextAreas = $popup.find('div.locale-block textarea:visible'),
            popupTextAreasHeight = $popupTextAreas.data('height') || $popupTextAreas.eq(0).outerHeight(),
            hasTextarea = $popupTextAreas.length,
            popupInfo = elementInfo.profile($popup),
            dataX = $popup.data('width'),
            dataY = $popup.data('height'),
            cX = dataX+popupInfo.left-10,
            cY = dataY+popupInfo.top-10,
            pushX = 0, pushY = 0,
            rezX = 0, rezY = 0,
            textareaY = 0, searchY = 0;

        if( !$popupTextAreas.data('height') ) $popupTextAreas.data('height', popupTextAreasHeight);
        if( !$searchPopup.data('height') ) $searchPopup.data('height', searchPopupHeight);

        $(document).bind('mousemove.rez', function(e) {
            rezX = e.pageX - cX;
            rezY = e.pageY - cY;
            pushX = rezX>0?dataX+rezX:dataX;
            pushY = rezY>0?dataY+rezY:dataY;
            $popup.css('width', pushX).css('height', pushY);

            if( hasTextarea && !$searchPopup.hasClass('big') ) {
                textareaY = rezY>0?popupTextAreasHeight+(rezY/hasTextarea):popupTextAreasHeight;
                textareaY = textareaY<popupTextAreasHeight?popupTextAreasHeight:textareaY;
                $popupTextAreas.css('height', textareaY);
            } if( $searchPopup.hasClass('big') ) {
                searchY = (searchPopupHeight+rezY)>searchPopupHeight?searchPopupHeight+rezY:searchPopupHeight; //searchY += 12;
                $searchPopup.css('height', searchY);

                if( $searchPopup.get(0).scrollHeight>$searchPopup.get(0).clientHeight ) {
                    $admWorkarea.addClass('shadow');
                } else {
                    $admWorkarea.removeClass('shadow');
                }
            }

            return false;
        });

        $this.on('mouseup', function() {
            $(document).unbind('mousemove.rez');
            admWorkareaShadow($popup);
        });

        $popup.on('click mouseup', function() {
            $(document).unbind('mousemove.rez');
        });

        $(document).on('mouseleave', function() {
            $(document).unbind('mousemove.rez');
        });

        $(document).one('mouseup', function() {
            $(document).unbind('mousemove.rez');
        });

        return false;
    });

    // ������� resizer ������� ������ ������
    $(document).on('mousedown', '.PCPopup.popupLNMenu .resize.top-right', function(c) {
        var $this = $(this),
            $popup = $this.closest('.PCPopup.popupLNMenu'),
            $searchPopup = $popup.find('.search-popup-block'),
            $admWorkarea = $searchPopup.find('.adm-workarea'),
            searchPopupFormHeight = parseInt($searchPopup.find('form[name="new_locale_tag"]').height())-20,
            searchPopupHeight = $searchPopup.data('height') || $searchPopup.outerHeight()-30,
            $popupTextAreas = $popup.find('div.locale-block textarea:visible'),
            popupTextAreasHeight = $popupTextAreas.data('height') || $popupTextAreas.eq(0).outerHeight(),
            hasTextarea = $popupTextAreas.length,
            popupInfo = elementInfo.profile($popup),
            popupTopCord = popupInfo.top,
            dataX = $popup.data('width'),
            dataY = $popup.data('height'),
            cX = dataX+popupInfo.left-10,
            maxY = popupTopCord, rezX = 0, rezY = 0, textareaY = 0,
            pushWidth = 0, pushHeight = 0, pushTop = 0, searchY = 0;

        if(!$popupTextAreas.data('height')) $popupTextAreas.data('height', popupTextAreasHeight);
        if(!$searchPopup.data('height')) $searchPopup.data('height', searchPopupHeight);

        if($this.hasClass('changing')){
            maxY = $popup.data('t');
        } else {
            $popup.attr('data-t', maxY);
            $this.addClass('changing');
        }

        $(document).bind('mousemove.rez', function(e){
            rezX = e.pageX - cX;
            rezY = maxY - e.pageY;

            pushWidth = rezX>0?dataX+rezX:dataX;
            if(rezY>0){
                pushHeight = dataY+rezY;
                pushTop = maxY-rezY;
            } else {
                pushHeight = dataY;
                pushTop = maxY;
            }

            $popup.css({
                'width': pushWidth,
                'height': pushHeight,
                'top': pushTop
            });

            if(hasTextarea && !$searchPopup.hasClass('big')) {
                textareaY = rezY>0?popupTextAreasHeight+(rezY/hasTextarea):popupTextAreasHeight;
                textareaY = textareaY<popupTextAreasHeight?popupTextAreasHeight:textareaY;
                $popupTextAreas.css('height', textareaY);
            } if($searchPopup.hasClass('big')) {
                searchY = (searchPopupHeight+rezY)>searchPopupHeight?searchPopupHeight+rezY:searchPopupHeight;
                $searchPopup.css('height', searchY);

                if(searchPopupFormHeight>searchY) {
                    $admWorkarea.addClass('shadow');
                } else {
                    $admWorkarea.removeClass('shadow');
                }
            }

            return false;
        });

        $this.on('mouseup', function(){
            $(document).unbind('mousemove.rez');
            admWorkareaShadow($popup);
        });

        $popup.on('click mouseup', function(){
            $(document).unbind('mousemove.rez');
        });

        $(document).on('mouseleave', function(){
            $(document).unbind('mousemove.rez');
        });

        $(document).one('mouseup', function(){
            $(document).unbind('mousemove.rez');
        });

        return false;
    });

    //��������� ������ ������ �� ���� �������
    $(document).on('click', '.close-this-form', function(event){
        var $this = $(this),
            $popup = $this.closest('.PCPopup.popupLNMenu'),
            $popupMenu = $popup.find('.popup_menu'),
            $popupInner = $popup.find('.search-popup-block');

        $popupMenu.show();
        $popup.find('.js-side_label').show().end().removeClass('not_menu');
        $popupInner.remove();

        changePCPopupPosition($popup);

        event.preventDefault();
        event.stopPropagation();
    });
    $('.licence_agreement .eula').click(function(e){
        if(e.which==2){
            $(this).click();
            e.stopPropagation();
        }
    });

    getMicrosoftTranslatorKey();
    setInterval(getMicrosoftTranslatorKey,1000*60*9);

    $(document).on('blur keyup', '.js-clearOrNotTextareaLang', function() {
        var $this = $(this),
            thisVal = $this.val().removeSpacesLocal(),
            $thisLocaleClickWrapper = $this.siblings('.locale-click-wrapper').find('.locale-click-arrow');

        if(thisVal === ''){
            $thisLocaleClickWrapper.addClass('disabled');
        } else {
            $thisLocaleClickWrapper.removeClass('disabled');
        }

        $this.addClass('js-changing');
    });

    //#heightPopup
    //�������� ������ �����
    function searchPopupBlockHeightChange($popup) {
        var popupHeight = $popup.outerHeight(false),
            popupWidth = $popup.outerWidth(false),
            windowHeight = $(window).height(),
            $searchBlock = $popup.find('.search-popup-block'),
            searchBlockMrgetBottom = parseInt($searchBlock.css('margin-bottom')),
            $arrow = $popup.find('.arrow'),
            arrowTop = $arrow.offset().top,
            $adm = $searchBlock.find('.adm-workarea'),
            $errorBlock = $popup.find('.error_on_buttons'),
            tb = 150, raz = 0;

        if( popupHeight>windowHeight ) {
            var searchBlockHeight = windowHeight-tb-$adm.outerHeight(false)-searchBlockMrgetBottom+30;

            searchBlockHeight += 1;

            $searchBlock
                .css('height', searchBlockHeight)
                .data('height', searchBlockHeight);

            //if(!isMobileOrNot())
            $searchBlock.addClass('big');

            //if(!isMobileOrNot())
            $popup
                .css({ 'width': popupWidth+20, 'height': windowHeight-tb })
                .data('width', popupWidth+20)
                .data('height', windowHeight-tb);

            if( $arrow.hasClass('bx-core-popup-menu-angle-bottom') ) {
                raz = arrowTop+$arrow.height()-(windowHeight-tb);

                //if(!isMobileOrNot())
                $popup
                    .css('top', raz)
                    .data('y', raz);
            }

            if( $searchBlock.get(0).scrollHeight>$searchBlock.get(0).clientHeight ) $adm.addClass('shadow');
        }
    }

    $(document).on('change', '.find-text-in-file input[type="checkbox"]', function() {
        var $this = $(this),
            $searchPopupBlockResults = $this.closest('.search-popup-block-results'),
            $allCheckbox = $searchPopupBlockResults.find('input[type="checkbox"]'),
            $saveButton = $searchPopupBlockResults.closest('.PCPopup.popupLNMenu').find('.adm-workarea .adm-btn-save'),
            checkeding = false;

        $allCheckbox.each(function(){
            if($(this).is(':checked')) checkeding = true;
        });

        if(checkeding) {
            $saveButton.removeAttr('disabled');
        } else {
            $saveButton.attr('disabled', 'disable');
        }
    });

    /**
     * ������� ��������� ����, �������� ����� ������ ���� ������ � ���������� Loader
     * @param: {jQuery object} ����� ��������
     * @param: {jQuery object} ����� ����
     * */
    function pcInLoaderStart($block, $el) {

        var $loader = jqLoc('<div class="pc_loader"></div>'),
            $elLoader = jqLoc('<div class="pc_el_loader"></div>');

        if(!$block.length) return false;

        var blockInfProf = elementInfo.profile($block), // ��������� � ��������� �����
            blockInfPos = elementInfo.position($block), // ��������� � ������� �����
            elProf = elementInfo.profile($el),
            elPos = elementInfo.position($el),
            $popup = $block.closest('.PCPopup.popupLNMenu');

        $loader.css({
            'width': blockInfProf.width,
            'height': blockInfProf.height,
            'top': blockInfPos.doc.top,
            'left': blockInfPos.doc.left
        });

        $el.addClass('pc_loader_set_in_this_element');
        $elLoader.css({
            'width': elProf.width,
            'height': elProf.height,
            'top': elPos.doc.top,
            'left': elPos.doc.left
        });

        //$loader.html($gif);
        jqLoc('body').append($loader);
        jqLoc('body').append($elLoader);

        if($popup.length) $popup.addClass('nonClose');

        localMainObject.killInLoader = function(){
            $loader.remove();
            $elLoader.remove();
            $el.removeClass('pc_loader_set_in_this_element');
            if($popup.length) $popup.removeClass('nonClose');
        };

        return localMainObject.killInLoader;
    }

    function pcLoaderStop(){
        jqLoc('.pc_loader').remove();
        jqLoc('.pc_el_loader_block').remove();

        if('killInLoader' in localMainObject)
            localMainObject.killInLoader();
    }

    //���������� ����� ���� �� ��������� ���������
    function backToWindowVisiblePopup($popup) {
        var $popupArrow = $popup.find('.arrow'),
            popupPosition = posElOnWindow.get($popup),
            arrowLeft = parseInt($popupArrow.css('left')),
            windowWidth = $(window).width(),
            documentHeight = $(document).height(),
            popupLeft, moveArrowLeft,
            min = 5, out;

        if((popupPosition.left+popupPosition.width) > windowWidth) {
            out = parseInt((popupPosition.left+popupPosition.width) - windowWidth);
            popupLeft = parseInt(popupPosition.left) - out - min;
            moveArrowLeft = arrowLeft + out + min;
        }

        if(popupPosition.left<0) {
            popupLeft = min;
            moveArrowLeft = arrowLeft - Math.abs(popupPosition.left) - min;
        }

        if(moveArrowLeft<30) moveArrowLeft = 30;
        if(moveArrowLeft>popupPosition.width) moveArrowLeft = popupPosition.width-5;

        if(popupLeft) $popup.css('left', popupLeft).data('x', popupLeft);
        if(moveArrowLeft) $popupArrow.css('left', moveArrowLeft);
    }

    /**
     * ������� ������ ������� ������ ������������ ��������� �� �����
     * @param: {jQuery object} ����� ��� �������� ��������� �������
     * */
    function changePCPopupPosition($popup) { // #11
        $popup = $popup || false;
        if(!$popup) return false;

        var $arrow = $popup.find(".arrow"),
            arrowWidth = parseInt($arrow.width()),
            arrowWidthMove = (arrowWidth/2)+2,
            $resize = $popup.find('.resize'),
            arrowCssLeft = parseFloat($arrow.css('left')),
            popupLeft = parseFloat($popup.css('left')),
            popupTop = parseFloat($popup.css('top')),
            popupWidth = $popup.outerWidth(),
            popupHeight = $popup.outerHeight(),
            popupDataY = parseInt($popup.data('y')),
            popupDataHeight = parseInt($popup.data('height')),
            popupY = parseInt($popup.offset().top),
            moveLeft = 0, moveTop = 0, setLeft = 0, arrLeft = 0;

        if((popupWidth/2)>arrowCssLeft){
            moveLeft = (popupWidth/2)-arrowCssLeft;
        } else if(arrowCssLeft>(popupWidth/2)){
            moveLeft = arrowCssLeft-(popupWidth/2);
        }

        if(moveLeft && (popupWidth/2)>arrowCssLeft){
            setLeft = popupLeft-moveLeft+arrowWidthMove;
            arrLeft = arrowCssLeft+moveLeft-arrowWidthMove;
        } else if(moveLeft && arrowCssLeft>(popupWidth/2)){
            setLeft = popupLeft+moveLeft-arrowWidthMove;
            arrLeft = arrowCssLeft-moveLeft+arrowWidthMove;
        }

        $popup.css('left', setLeft);
        $arrow.css('left', arrLeft);

        if($arrow.hasClass('bx-core-popup-menu-angle-bottom')) {
            if (popupHeight > popupDataHeight) {
                moveTop = popupTop - (popupHeight - popupDataHeight);
            } else if(popupHeight<popupDataHeight){
                moveTop = popupTop + (popupDataHeight-popupHeight);
            } else if(popupHeight == popupDataHeight){
                moveTop = popupDataY;
            }

            if(moveTop){
                $popup.css({
                    'top': moveTop
                });
            }

            $resize.addClass('top-right');
        }

        $popup
            .data('width', parseInt($popup.outerWidth(false)))
            .data('height', parseInt($popup.outerHeight(false)))
            .data('x', parseInt($popup.css('left')))
            .data('y', parseInt($popup.css('top')));

        backToWindowVisiblePopup($popup);
    }

    function localeGoToBadLangSettings(){
        if (confirm(arLocaleParams.lang.error_not_configured_lang)){
            window.open('/bitrix/admin/settings.php?lang=ru&mid=accorsys.localization&mid_menu=1');
        }
    }

    /**
     * ������� ���������� ������ ��� ��������� ������ �� ������� � ����������
     * @JSON data - ������ ��� ��������
     * @function func - ��� ������� ����� ��������� ������
     * */
    function sendLocaleData(data,func,action) {
        var good = true;
        if(action == 'find') saveFindedText = data.text;
        data.action = action;
        data.sessid = arLocaleParams.sessid;
        data.siteTemplate = arLocaleParams.siteTemplate;
        data['LANGUAGE_ID'] = langPlace;

        if(saveFindedTextChanged == "accorsys_not_changed") {
            data["oldFindedText"] = saveFindedText; // �����, ������� �������� � ��������
        } else {
            data["oldFindedText"] = saveFindedTextChanged;
            saveFindedTextChanged = '';
        }

        if(tagNameToPost) data['htmlTag'] = tagNameToPost;

        setTimeout(function() {
            if(good) {
                toMoreTimeSending.abort();
                pcLoaderStop();
                funcCallback();
            }
        }, 60000);

        var funcCallback = function(data) {
            good = false;
            if(data){
                try
                {
                    data = jqLoc.parseJSON(data);
                    if(data['CHANGED'] != 'accorsys_not_changed')
                        saveFindedTextChanged = data['CHANGED'];
                }
                catch(e)
                {
                    data = {};
                    data.error = '<div class="error_on_new">'+arLocaleParams.lang.unregistredError+'</div>';
                    data.errorType = "new";
                }
            } else {
                data = {};
                data.error = '<div class="error_on_new">'+arLocaleParams.lang.timeoutError+'</div>';
                data.errorType = "new";
            }
            if(data && data.MESSAGE == 'redirect'){
                document.location.reload();
                return false;
            } else {
                if(data['CHANGED']) saveFindedTextChanged = data['CHANGED'];
                return func(data);
            }
        };

        return jqLoc.post(
            "/ajax/accorsys.localization/locale_handler.php",
            data,
            funcCallback
        );
    }

    function loc_htmlspecialchars_decode(string, quote_style) {
        var optTemp = 0,
            i = 0,
            noquotes = false;
        if (typeof quote_style === 'undefined') {
            quote_style = 2;
        }
        string = string.toString()
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
        var OPTS = {
            'ENT_NOQUOTES': 0,
            'ENT_HTML_QUOTE_SINGLE': 1,
            'ENT_HTML_QUOTE_DOUBLE': 2,
            'ENT_COMPAT': 2,
            'ENT_QUOTES': 3,
            'ENT_IGNORE': 4
        };
        if (quote_style === 0) {
            noquotes = true;
        }
        if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
            quote_style = [].concat(quote_style);
            for (i = 0; i < quote_style.length; i++) {
                // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
                if (OPTS[quote_style[i]] === 0) {
                    noquotes = true;
                } else if (OPTS[quote_style[i]]) {
                    optTemp = optTemp | OPTS[quote_style[i]];
                }
            }
            quote_style = optTemp;
        }
        if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
            string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
            // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
        }
        if (!noquotes) {
            string = string.replace(/&quot;/g, '"');
        }
        // Put this in last place to avoid escape being double-decoded
        string = string.replace(/&amp;/g, '&');
        string = string.replace(/&#39;/g, "'");

        return string;
    }

    function emptyObject(obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    }


    /**
     * FAILS:
     * data['error']['code'] = 400 , data['error']['errors'][0]['reason'] = keyInvalid
     * data['error']['code'] = 400 , data['error']['errors'][0]['reason'] = invalid - ������������ ��� �� ������������ LID
     */
    function loc_googleTranslate(text,lang_from,lang,obj){
        if (!arLocaleParams.gtranslate_key){
            localeGoToBadLangSettings();
            return false;
        }
        if (text){
            pcLoaderStart(obj);
            var url = 'https://www.googleapis.com/language/translate/v2?key='+arLocaleParams.gtranslate_key+'&q=#TEXT#&target=#LANG#';
            url = url.replace('#LANG#',encodeURIComponent(lang));
            url = url.replace('#TEXT#',encodeURIComponent(text));
            jqLoc.post(url,{},false,'jsonp').done(function(data){
                if(data['error']){
                    if(data['error']['errors'][0]['reason'] == 'invalid')
                        alert(clearHtmlTags(arLocaleParams.lang.error_not_supported_lang));
                    if(data['error']['errors'][0]['reason'] == 'keyInvalid')
                        localeGoToBadLangSettings()
                }else{
                    undoData[obj.attr('name')] = obj.val();
                    obj.val(loc_htmlspecialchars_decode(data['data']['translations'][0]['translatedText']));
                }
                pcLoaderStop();
            })
        }
    }

    function loc_microsoftTranslate(text,lang_from,lang,obj){
        if (!arLocaleParams.microsofttranslate_key || erorrMicrosoftKeyRequest){
            localeGoToBadLangSettings();
            return false;
        }
        if (text){
            pcLoaderStart(obj);
            var url = 'http://api.microsofttranslator.com/V2/Ajax.svc/Translate';
            var data = {
                appId: 'Bearer ' + arLocaleParams.microsofttranslate_key,
                to: lang,
                contentType: 'text/plain',
                text: text
            };
            var isCanTranslate = false;
            for(var i in arLocaleParams.microsofttranslate_sup_langs){
                if(arLocaleParams.microsofttranslate_sup_langs[i] == lang){
                    isCanTranslate = true;
                    break;
                }
            }
            if(!isCanTranslate){
                alert(clearHtmlTags(arLocaleParams.lang.error_not_supported_lang));
                pcLoaderStop();
                return false;
            }
            jqLoc.ajax({
                'url':url,
                'data':data,
                'dataType':'jsonp',
                'jsonp':'oncomplete',
                'jsonpCallback':'mycallBack'
            }).done(function(jqXHR){
                pcLoaderStop();
                undoData[obj.attr('name')] = obj.val();
                $(obj).val(jqXHR);
            }).fail(function(jqXHR, textStatus, errorThrow){
                localeGoToBadLangSettings();
                pcLoaderStop();
            });
        }
    }

    function loc_translate_ya(text, sl, tl, obj){
        if(!arLocaleParams.ytranslate_key){
            localeGoToBadLangSettings();
            return false;
        }
        pcLoaderStart(obj);

        /**
         * FAILS:
         * status - 403, responseText - "{"code":401,"message":"API key is invalid"}" - ���� ���� �� ����������
         * status - 400, responseText - "{"code":501,"message":"The specified translation direction is not supported"}" - ���� �� ����� ���� �� ���������
         */
        jqLoc.post('https://translate.yandex.net/api/v1.5/tr.json/translate?'+
            'key=' + arLocaleParams.ytranslate_key +
            '&text=' + encodeURIComponent(text.substr(0, 5000)) +
            '&lang=' + encodeURIComponent(tl)
        ).done(function(data){
                undoData[obj.attr('name')] = obj.val();
                obj.val(data.text[0]);
                pcLoaderStop();
            }).fail(function(data){
                var decodedResponse = JSON.parse(data.responseText);
                if(decodedResponse.code == 501)
                    alert(clearHtmlTags(arLocaleParams.lang.error_not_supported_lang));
                if(decodedResponse.code == 401)
                    localeGoToBadLangSettings();
                pcLoaderStop();
            });
    }

    function loc_fixEvent(e) {
        e = e || window.event;

        if ( e.pageX == null && e.clientX != null ){
            var html = document.documentElement,
                body = document.body;
            e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
            e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
        }

        if (!e.which && e.button){
            e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
        }

        return e;
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    //
    function loc_getCenterPopupTemplate(html){
        return '<div id="bx-admin-prefix" class="bx-core-popup-menu bx-core-popup-menu-bottom bx-core-popup-menu-level0" style="z-index: 1000; position: fixed; display: block; top: 206px; left: 45%; height: auto; width: auto;">' +
            '<div class="search-popup-block company-popup">' +
            html +
            '</div>' +
            '</div>';
    }

    function killJsToPopupOpen(){
        mouseDownX = mouseDownY = mouseUpX = mouseUpY = 0;
    }

    /**
     * PC Loaders
     * */
    function pcLoaderStart($block, size, position) {
        var $loader = jqLoc('<div class="pc_el_loader_block"></div>');

        if(!$block.length) return false;

        var blockInfProf = elementInfo.profile($block), // ��������� � ��������� �����
            blockInfPos = elementInfo.position($block), // ��������� � ������� �����
            $popup = $block.closest('.PCPopup.popupLNMenu');

        $loader.css({
            'width': blockInfProf.width,
            'height': blockInfProf.height,
            'top': blockInfPos.doc.top,
            'left': blockInfPos.doc.left
        });

        //$loader.html($gif);
        jqLoc('body').append($loader);
        if($popup.length) $popup.addClass('nonClose');

        localMainObject.killInLoader = function(){
            $loader.remove();
            if($popup.length) $popup.removeClass('nonClose');
        };

        return localMainObject.killInLoader;
    }

    function pcLoaderStartButton($block, $buttonsBlock) {
        var $loader = $('<div class="pc_el_loader_block_onbuttons"></div>'),
            $stopClick = $('<div class="pc_el_loader_block_notClick"></div>'),
            $popup = $block.closest('.PCPopup.popupLNMenu');

        if(!$block.length) return false;
        if(!$buttonsBlock.length) return false;

        var blockInfProf = elementInfo.profile($buttonsBlock), // ��������� � ��������� �����
            blockInfPos = elementInfo.position($buttonsBlock), // ��������� � ������� �����
            stopClickInfProf = elementInfo.profile($block),
            stopClickInfPos = elementInfo.position($block);

        $loader.css({
            'width': blockInfProf.width,
            'height': blockInfProf.height,
            'top': blockInfPos.doc.top,
            'left': blockInfPos.doc.left
        });

        $stopClick.css({
            'width': stopClickInfProf.width,
            'height': stopClickInfProf.height,
            'top': stopClickInfPos.doc.top,
            'left': stopClickInfPos.doc.left
        });

        //$loader.html($gif);
        jqLoc('body').append($loader).append($stopClick);
        if($popup.length) $popup.addClass('nonClose');

        $buttonsBlock.find('input').hide();

        localMainObject.killInLoader = function(){
            $loader.remove();
            $stopClick.remove();
            if($popup.length) $popup.removeClass('nonClose');
        };

        return localMainObject.killInLoader;
    }

    var posElOnWindow = {
        get: function($el){
            var returnObj = {};

            returnObj.top = $el.offset().top;
            returnObj.left = $el.offset().left;
            returnObj.width = $el.outerWidth(false);
            returnObj.height = $el.outerHeight(false);
            returnObj.visible = $el.is(":visible");

            return returnObj;
        },
        set: function(){

        }
    };

    /**
     * � ���� ������� ������ ��� ��������
     * xEls.xspot, xEls.xspot_t, xEls.xspot_b, xEls.xspot_l, xEls.xspot_r
     * */
    function cpCoolSpot(x, y) {
        var xspot = $(document).find('#xspot'),
            xspot_t = $(document).find('#xspot_t'),
            xspot_b = $(document).find('#xspot_b'),
            xspot_l = $(document).find('#xspot_l'),
            xspot_r = $(document).find('#xspot_r');

        var clamp = function(x) {
            return x>=0 ? x : 0;
        };

        var gx = 0;
        var gy = 0;

        if (parseInt(x)>=0 || parseInt(y)>=0) {
            gx = x;
            gy = y;
        }

        xspot.css('left', (gx-125)+"px");
        xspot.css('top', (gy-125)+"px");

        xspot_t.css('height', clamp(gy-125)+"px");
        xspot_b.css('top', (gy+125)+"px");

        xspot_r.css('left', (gx+125)+"px");
        xspot_r.css('top', (gy-125)+"px");

        xspot_l.css('top', (gy-125)+"px");
        xspot_l.css('width', clamp(gx-125)+"px");
    }

    /**
     * PCPopup - ���������� ��� jQuery >=1.7
     * */
    //region ��������� ���������� DOM ��������
    var elementInfo = {
        // ������� �������� �� ��������� � �� ������
        position: function($jObj){
            var returnObj, winTop, winBottom, elTBH,
                objInfo = this.profile($jObj),
                windowHeight = $(window).height(),
                windowWidth = $(window).width(),
                docScroll = $(document).scrollTop(),
                docHeight = $(document).height(),
                docWidth = $(document).width();

            if((windowHeight+docScroll)>objInfo.top){
                winTop = objInfo.top-docScroll;
                winBottom = (windowHeight+docScroll)-(objInfo.top+objInfo.height);
            }

            if(winTop && winTop>0){
                if((windowHeight/2)>winTop){
                    elTBH = 'winTop';
                } else {
                    elTBH = 'winBottom';
                }
            } else if(winTop && winTop<0) {
                elTBH = 'topHide';
            } else {
                elTBH = 'bottomHide';
            }

            returnObj = {
                doc: {
                    top: objInfo.top,
                    bottom: objInfo.top+objInfo.height,
                    left: objInfo.left,
                    right: docWidth-(objInfo.left+objInfo.width)
                },
                win: {
                    top: winTop,
                    bottom: winBottom,
                    left: objInfo.left,
                    right: windowWidth-(objInfo.left+objInfo.width),
                    location: elTBH
                },
                visible: objInfo.visible
            }

            return returnObj;
        },
        profile: function($jObj, bool){
            bool = bool || false;

            var returnObj;

            returnObj = {
                width: $jObj.outerWidth(false),
                height: $jObj.outerHeight(false),
                top: false,
                left: false,
                visible: $jObj.is(":visible")
            };

            if(bool){
                returnObj.width = $jObj.outerWidth(true);
                returnObj.height = $jObj.outerHeight(true);
            }

            if($jObj.is(":visible")){
                returnObj.top = $jObj.offset().top;
                returnObj.left = $jObj.offset().left;
            }

            return returnObj;
        }
    };
    //endregion


    function elementPositionJS( el ) {
        var winWidth = document.documentElement.clientWidth,
            winHeight = document.documentElement.clientHeight,
            params = {
                'width': 0,
                'height': 0,
                'left': 0,
                'top': 0,
                'right': 0,
                'bottom': 0,
                'scrollTop': 0,
                'hide': '',
                'place': '',
                'bodyTopHide': 0,
                'bodyBottomHide': 0,
                'body': 'small'
            };

        if ( !el ) return pos;

        var bound = el.getBoundingClientRect(),
            body = document.body,
            docElem = document.documentElement,
            scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;


        params['left'] = bound['left'];
        params['top'] = bound['top'];
        params['right'] = bound['right'];
        params['bottom'] = bound['bottom'];
        params['width'] = bound['width'];
        params['height'] = bound['height'];
        params['scrollTop'] = scrollTop+bound['top'];

        if ( bound['height'] > winHeight ) {
            params['body'] = 'big';
        }

        if ( bound['top'] < 0 ) {
            params['hide'] = 'top';

            if ( bound['bottom'] > 0 ) {
                // ���� ����� �������� ������ ������ ������
                params['bodyTopHide'] = bound['height'] - bound['bottom'];
            }
        } else if ( bound['top'] > winHeight ) {
            params['hide'] = 'bottom';
        } else if ( bound['top'] < winHeight && bound['bottom'] > winHeight ) {
            // ���� ����� �������� ������ ����� ������
            params['bodyBottomHide'] = bound['bottom'] - winHeight;
        }

        if ( !params['hide'] ) {
            if ( bound['top'] < winHeight/2 ) {
                params['place'] = 'top'
            } else if ( bound['top'] > winHeight/2 ) {
                params['place'] = 'bottom'
            }
        }

        return params;
    }

    //region ����� Popup 'PCPopup' ���������� ��� jQuery
    /**
     * wtf: PopUp �������� ��������������� �� �������� ������������ ��������
     * */
    $.fn.PCPopup = function($formObj, options) {
        // ������ ��������� ��-���������, �������� �� � ������� ����������, ������� ���� ��������
        var settings = $.extend({
            inside: false, // Popup ������ ������ ������� �������� (������ jQuery)
            position: false, // ���� fixed, ����� ����� � ������ ������
            before: false, // ����������� ���������� ������� �� �������� popup'�
            after: false, // ����������� ���������� ������� ����� �������� popup'�
            classes: '', // ����������� �����
            ides: '', // ����������� id
            HTML: '',
            ZPosition: 1000,
            bg: true,
            bgId: '',
            bgZPosition: 990,
            close: false, // ����������� ������� ��� �������� ������� popup (������ jQuery),
            closeFuncs: false, // ������� ����������� ����� �������� Popup
            popupWidth: false // ������� ����������� ����� �������� Popup
        }, options);

        var $this = this,
            $inside = false,
            docScrollTop = $(document).scrollTop(),
            elPos = elementInfo.position($this),
            elInfo = elementInfo.profile($this),
            elParams = elementPositionJS($this[0]),
            $htmlPopup = $('<div class="PCPopup"></div>'),
            $CPPopupOverlay = $('<div id="'+settings.bgId+'" class="pc-popup-overlay">' +
            '<div id="xspot_t"></div>'+
            '<div id="xspot_b"></div>'+
            '<div id="xspot_l"></div>'+
            '<div id="xspot_r"></div>'+
            '<div id="xspot"></div>' +
            '</div>'),
            $popupArrow = $('<span class="arrow"></span>');

        if(settings.inside) $inside = $(settings.inside);

        $htmlPopup
            .css({
                'display':'block',
                'z-index': settings.ZPosition,
                'position':'absolute',
                'top': '-10000px',
                'left': '-10000px'
            });

        if(settings.popupWidth && parseInt(settings.popupWidth)>0){$htmlPopup.css('width',settings.popupWidth)}
        if(settings.classes) $htmlPopup.addClass(settings.classes);
        if(settings.ides) $htmlPopup.attr('id', settings.ides);

        $CPPopupOverlay
            .css({
                'display': 'none',
                'left': 0,
                'position': 'absolute',
                'top': 0,
                'z-index': settings.bgZPosition,
                'opacity': 0,
                'overflow': 'hidden',
                'width': '100%'
            });

        if($formObj.length){
            var $clone = $formObj.find("> *").show(),
                $formObjParent = $formObj.parent();

            if(settings.HTML) $clone = $(settings.HTML);

            $('body').append($htmlPopup.append($clone));

            if(settings.bg){
                $('body').append($CPPopupOverlay.show().css({'opacity':1}));
            }

            // ���������� CoolSpot
            var xEls = {
                    width: $(document).width(),
                    height: $(document).height()
                },
                xX = elPos.doc.left+(elParams['width']/2),
                xY = elPos.doc.top+(elParams['height']/2);
            $CPPopupOverlay.css('height', xEls.height);
            cpCoolSpot(xX, xY); // ��� �������� ������ ������ ������ ������

            // ���������� ������� ����������� �� ����������� Popup
            var beforeFunctions = settings.before;
            if(beforeFunctions.length){
                for(var i=0; i<beforeFunctions.length; i++){
                    if(beforeFunctions[i] instanceof Array){
                        var mas = beforeFunctions[i];

                        if(mas[1]=='popup'){
                            mas[1] = $htmlPopup;
                        }
                        if(typeof(mas[0])=='function'){
                            mas[0](mas[1]);
                        }
                    } else {
                        if(typeof(beforeFunctions[i])=='function'){
                            beforeFunctions[i]();
                        }
                    }
                }
            }

            // �������� ���������� �� ���� Popup
            var popupInfProf = elementInfo.profile($htmlPopup);

            // ���� Popup ���� ��� ������������ �������� $this � ��������� ������
            if( ($htmlPopup.outerHeight(true)+100>elParams['scrollTop']) && !settings.position ) {
                settings.position='top';
            }

            //������� ������� ������� winTop, winBottom
            $htmlPopup.removeClass('winTop, winBottom');

            //������������� Popup
            if( !settings.position ) {
                settings.position = 'top';

                if(
                    (elParams['place'] == 'bottom') ||
                    (!elParams['place'] && elParams['hide'] == 'bottom')
                ) {
                    settings.position = 'bottom';
                }
            }

            if (
                settings.position != 'fixed' &&
                (elParams['scrollTop']+elParams['height']+$htmlPopup.outerHeight(true)) > $(document).height()
            ) {
                settings.position = 'bottom';
            }

            // ���� Popup �������� �� ��������� ��������� ����
            if( (elPos.doc.top+elInfo.height+$htmlPopup.outerHeight(true)) > xEls.height ) settings.position='bottom';

            if( (elParams['place'] == 'bottom' && !settings.position) || settings.position=='bottom' ) {
                var bPopupLeft = (elPos.doc.left+(elInfo.width/2))-(popupInfProf.width/2),
                    bPopupTop = elPos.doc.top-popupInfProf.height-15,
                    bpopupArrowLeft = (popupInfProf.width/2)-10;

                if($inside){
                    var insideInfo = elementInfo.profile($inside);
                    if(insideInfo.left>bPopupLeft){
                        bpopupArrowLeft = bpopupArrowLeft - (insideInfo.left-bPopupLeft);
                        bPopupLeft = insideInfo.left;
                    } if((insideInfo.left+insideInfo.width)<(bPopupLeft+popupInfProf.width)){
                        bpopupArrowLeft = bpopupArrowLeft + ((bPopupLeft+popupInfProf.width)-(insideInfo.left+insideInfo.width));
                        bPopupLeft = insideInfo.left+insideInfo.width-popupInfProf.width;
                    }
                }

                $popupArrow.addClass('bx-core-popup-menu-angle-bottom').css({'left':bpopupArrowLeft});
                $htmlPopup
                    .addClass('winBottom')
                    .css({
                        'left': bPopupLeft,
                        'top': bPopupTop
                    });
            }

            if( (elParams['place'] == 'top' && !settings.position) || settings.position=='top' ) {
                var tPopupLeft = (elPos.doc.left+(elInfo.width/2))-(popupInfProf.width/2),
                    tPopupTop = elPos.doc.top+elInfo.height+15,
                    tpopupArrowLeft = (popupInfProf.width/2)-10;

                if($inside){
                    var insideInfo = elementInfo.profile($inside);
                    if(insideInfo.left>tPopupLeft){
                        tpopupArrowLeft = tpopupArrowLeft - (insideInfo.left-tPopupLeft);
                        tPopupLeft = insideInfo.left;
                    } if((insideInfo.left+insideInfo.width)<(tPopupLeft+popupInfProf.width)){
                        tpopupArrowLeft = tpopupArrowLeft + ((tPopupLeft+popupInfProf.width)-(insideInfo.left+insideInfo.width));
                        tPopupLeft = insideInfo.left+insideInfo.width-popupInfProf.width;
                    }
                }

                $popupArrow.addClass('bx-core-popup-menu-angle').css({'left':tpopupArrowLeft});
                $htmlPopup
                    .addClass('winTop')
                    .css({
                        'left': tPopupLeft,
                        'top': tPopupTop
                    });
            }

            if(settings.position == 'fixed'){
                var fixedTop = (window.innerHeight/2)-(popupInfProf.height/2),
                    fixedLeft = ($(window).width()/2)-(popupInfProf.width/2);

                $popupArrow.hide();
                $htmlPopup
                    .css({
                        'left': fixedLeft,
                        'top': fixedTop,
                        'position': 'fixed'
                    });
            }

            $popupArrow.appendTo($htmlPopup);


            var closePopupFunc = function(){
                $formObj.html($clone.hide());
                $htmlPopup.remove();
                $CPPopupOverlay.remove();
                var closeFunctions = settings.closeFuncs;
                if(closeFunctions.length){
                    for(var i=0; i<closeFunctions.length; i++){
                        if(closeFunctions[i] instanceof Array){
                            var mas = closeFunctions[i];

                            if(mas[1]=='popup'){
                                mas[1] = $htmlPopup;
                            }
                            if(typeof(mas[0])=='function'){
                                mas[0](mas[1]);
                            }
                        } else {
                            if(typeof(closeFunctions[i])=='function'){
                                closeFunctions[i]();
                            }
                        }
                    }
                }
            };

            // ������������ PopUp
            $htmlPopup
                .show('fast', function(){
                    var afterFunctions = settings.after;
                    if(afterFunctions.length){
                        for(var i=0; i<afterFunctions.length; i++){
                            if(afterFunctions[i] instanceof Array){
                                var mas = afterFunctions[i];

                                if(mas[1]=='popup'){
                                    mas[1] = $htmlPopup;
                                }
                                if(typeof(mas[0])=='function'){
                                    mas[0](mas[1]);
                                }
                            } else {
                                if(typeof(afterFunctions[i])=='function'){
                                    afterFunctions[i]();
                                }
                            }
                        }
                    }
                });

            // ���������� jQuery ������� ��� �������� PopUp
            if(settings.close){
                var $closeObj = $(settings.close);
                $closeObj.on('click', function(event) {
                    if($htmlPopup.hasClass('nonClose')) return false;
                    closePopupFunc();
                    $CPPopupOverlay.remove();
                    $(window).unbind('resize');
                    event.stopPropagation();
                });
            }

            // ����������� ������ ��� PopUp �� �����
            $CPPopupOverlay.on('click', function(event){
                if($htmlPopup.hasClass('nonClose')) return false;
                closePopupFunc();
                $CPPopupOverlay.remove();
                $(window).unbind('resize');
                event.stopPropagation();
            });

            $(window).bind('resize', function() { //#22
                elPos = elementInfo.position($this);
                elInfo = elementInfo.profile($this);
                xX = elPos.doc.left+(elInfo.width/2);
                xY = elPos.doc.top+(elInfo.height/2);

                $CPPopupOverlay.css('height', $(document).height());
                cpCoolSpot(xX, xY); // ��� �������� ������ ������ ������ ������
            });

            return {
                popup: $htmlPopup,
                closeFunc: closePopupFunc,
                actEl: $this
            };
        }
    };
    //endregion

    function admWorkareaShadow($popup) {
        var $sBlock = $popup.find('.search-popup-block'),
            blHeight = $sBlock.outerHeight(false),
            $form = $sBlock.find('form[name="new_locale_tag"]'),
            formHeight = $form.outerHeight(false),
            $admWorkarea = $sBlock.find('.adm-workarea'),
            scrollStatus;

        if($sBlock.hasClass('big') && (formHeight>blHeight)) {
            $sBlock.scroll(function(e) {
                scrollStatus = $sBlock.scrollTop();
                if(scrollStatus > (formHeight-blHeight)) {
                    $admWorkarea.removeClass('shadow');
                } else {
                    $admWorkarea.addClass('shadow');
                }
            });
        }
    }

    $.fn.scrollStoppedPopup = function(callback, time) {
        time = time || 1000;
        $(this).scroll(function(){
            var self = this, $this = $(self);
            if ($this.data('scrollTimeout')) clearTimeout($this.data('scrollTimeout'));
            $this.data('scrollTimeout', setTimeout(callback, time, self));
        });
    };

    (function($,window,document){
        $.selection = function (w){
            var wind = w || window,
                selectionInfo = false,
                ie = false,
                get = function (){
                    selectionInfo = getSelectionFragment();
                    return selectionInfo;
                },
                set = function (text,callback){
                    this.get();
                    if( (callback && $.isFunction(callback))||( $.isFunction(text) && (callback=text) ))
                        text = callback(text,selectionInfo,replaceSelection);
                    text!==false && replaceSelection(text);
                },
                replaceSelection = function (text){
                    if(!selectionInfo.ie){
                        selectionInfo.rang.deleteContents();
                        var documentFragment = toDOM(text);
                        selectionInfo.rang.collapse(false);
                        selectionInfo.rang.insertNode(documentFragment);
                    }else{
                        selectionInfo.selectedText.pasteHTML(text);
                    }
                },
                getSelectionFragment = function(){
                    if ( wind.getSelection ) {
                        var selectedText = wind.getSelection();
                    } else if ( wind.document.getSelection ) {
                        var selectedText = wind.document.getSelection();
                    } else if ( wind.document.selection ) {
                        ie = true;
                        var selectedText = wind.document.selection.createRange();
                    }
                    if(!ie){
                        var rang = selectedText.getRangeAt(0),
                            theParent = rang.cloneContents();

                        return {'ie':false,'texts':selectedText,'htmls':toHTML(theParent),'rang':rang};
                    }else{
                        return {'ie':true,'texts':selectedText.text,'htmls':selectedText.htmlText,'selectedText':selectedText};
                    }
                },
                toHTML = function (docFragment){
                    var d = wind.document.createElement('div');
                    d.appendChild(docFragment);
                    return d.innerHTML;
                },
                toDOM = function(HTMLstring){
                    var d = wind.document.createElement('div');
                    d.innerHTML = HTMLstring;
                    var docFrag = wind.document.createDocumentFragment();  // ��� ���� ������ ������, � � ���� ��� ��� ����������
                    while (d.firstChild) {
                        docFrag.appendChild(d.firstChild) ;
                    };
                    return docFrag;
                };
            return {'get':get,'set':set}
        }
    })(jQuery,window,document);


    /**
     * Cookies read, create and erase
     * */
    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";

        var fixedName = '<%= Request["formName"] %>';
        name = fixedName + name;

        document.cookie = name + "=" + value + expires + "; path=/";
    }
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    function eraseCookie(name) {
        createCookie(name, "", -1);
    }

    /**
     * ������� ���������� ��������� �������
     * */
    function isMobileOrNot() {
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };

        return isMobile.any()?true:false;
    }

    // ������� �������� target="_blank" ��� ��� ��������� �� admin bitrix
    function aHaveTargetBlank() {
        var $a = $('a:not(.js-thisAncherLocHack)');

        $a.each(function(){
            var href=$(this).attr('href');

            if(href && href.indexOf(location.hostname+'/bitrix/admin') != -1){
                $(this).attr('target', '_blank').addClass('js-thisAncherLocHack');
            }
        });
    }

    // ������� ��������� input ����� ����� .local_mes ������� � value
    function inputValLocalMes() {
        var $inputs = $('input:not(.js-thisInputLocHack)');

        $inputs.each(function(){
            var $this = $(this),
                inputVal = $(this).val(),
                $inpurValObj = $.parseHTML(inputVal),
                $wrap;

            if($($inpurValObj).eq(0).hasClass('locale_mes')) {
                $wrap = inputVal.replace($($inpurValObj).eq(0).text(), '');
                $this
                    .val($($inpurValObj).eq(0).text())
                    .wrap($($wrap));

                $this.addClass('js-thisInputLocHack');
            }
        });
    }

    /**
     * ������� ����������� ����� �������� ������� DOM Document
     * */
    function observeMutations(mutations) {
        if(observeMutationsTimerFl) return false;

        setTimeout(function(){
            aHaveTargetBlank();
            inputValLocalMes();

            observeMutationsTimerFl = false;
        }, 1000);

        observeMutationsTimerFl = true;
    }
    (function() { //��������� �������, ������� ������������� ��������� � DOM Document
        var observer,
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        function setupWatch() {
            observer = new MutationObserver(observeMutations);
            observer.observe(document, {childList: true, subtree: true});
        }

        window.addEventListener('DOMContentLoaded', setupWatch);
    })();

    // #mobile
    /*if(isMobileOrNot()) {
     $(document).bind('mobileinit', function(){
     //$.extend($.mobile.zoom, {locked: false, enabled: true});
     $.mobile.metaViewportContent = 'width=device-width, minimum-scale=1, maximum-scale=2, user-scalable=yes';
     });

     $(document).ready(function() {
     $('meta[name=viewport]').remove();
     $('head').prepend('<meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=2, width=device-width">');

     $('img, a > *, a, input, select').hammer().on("press", function(e) {
     var $objEl = $(this),
     tapPositionObj = e.gesture.changedPointers[0];

     if ($objEl.is('#bx-admin-prefix *') || $objEl.closest('#bx-panel').get(0)) return false;

     if($objEl[0].tagName == 'A' && $objEl.find('img').length) {
     return false;
     }

     if (!$objEl.find('.locale_mes').get(0)) {
     $.relativeX = Math.round(tapPositionObj.pageX-$objEl[0].offsetLeft);
     $.relativeY = Math.round(tapPositionObj.pageY-$objEl[0].offsetTop);
     $.tapX = tapPositionObj.pageX;
     $.tapY = tapPositionObj.pageY;

     $objEl.selectText().trigger('mouseup.locale');
     } else {
     alert($(arLocaleParams.lang.tooManyElementsError).text());
     }

     e.preventDefault();
     e.stopPropagation();
     });

     $('.locale_mes').hammer().on("press", function (e) {
     var $objEl = $(this),
     tapPositionObj = e.gesture.changedPointers[0];

     $.relativeX = Math.round(tapPositionObj.pageX-$objEl[0].offsetLeft);
     $.relativeY = Math.round(tapPositionObj.pageY-$objEl[0].offsetTop);
     $.tapX = tapPositionObj.pageX;
     $.tapY = tapPositionObj.pageY;

     localeMesTimeOver = 0;
     showPopupTimeSet = 0;

     $objEl.selectText().trigger('mouseover');

     e.preventDefault();
     e.stopPropagation();
     });

     // ���������� ������ �� ��� �����
     $(document).on('click', '.search-popup-block span.resize', function() {
     var $this = $(this),
     $popup = $this.closest('.PCPopup.popupLNMenu') // ������� ��������, �� ���� popup
     ;

     //�������� �������, ���������� ��� ��������
     if($popup.hasClass('screen_max')) {
     backToMinPopup($popup);
     } else {
     fullScreenPopup($popup);
     }
     });
     });

     function getSelectedText(){
     var text = "";
     if (window.getSelection) {
     text = window.getSelection();
     }else if (document.getSelection) {
     text = document.getSelection();
     }else if (document.selection) {
     text = document.selection.createRange().text;
     }
     return text.toString();
     }
     }*/

    /**
     * ������� ����������� ����� �� ��� �����
     * @param {jQuery} $popup �������� popup � jQuery ������
     * */
    function fullScreenPopup($popup) {
        var windowWidth = $(window).width(), // ������ ������
            windowHeight = $(window).height(), // ������ ������
            $searchPopupBlock = $popup.find('.search-popup-block'),
            spBlockData = $searchPopupBlock.data('height'),
            spBlockMargPadd = parseInt($searchPopupBlock.outerHeight(true)) - parseInt($searchPopupBlock.height());

        if(!spBlockData) $searchPopupBlock.data('height', $searchPopupBlock.height());

        $popup.css('position', 'fixed').animate({
            'top': 0,
            'left': 0,
            'width': windowWidth,
            'height': windowHeight
        }, 200).addClass('screen_max');
        $searchPopupBlock.css('height', windowHeight-spBlockMargPadd);
        admWorkareaShadow($popup);
        $popup.find('span.resize').attr('title', arLocaleParams.lang.rollDownToOriginalSize);
    }

    function clearHtmlTags(text) {
        if( !text.removeSpacesLocal() ) return '';

        return text.replace(/<(?:.|\n)*?>/gm, ' ');
    }

    /**
     * ������� ���������� popup � �������� ��������� ����� ������������
     * @param {jQuery} $popup �������� popup � jQuery ������
     * */
    function backToMinPopup($popup) { //# back
        var $searchPopupBlock = $popup.find('.search-popup-block'),
        //spBlockData = $searchPopupBlock.data('height'),
            popupX = $popup.data('x'), // �������� ������ data ������ �������� data-x
            popupY = $popup.data('y'), // �������� ������ data ������ �������� data-y
        //popupWidth = $popup.data('width'), // �������� ������ data ������ �������� data-width
        //popupHeight = $popup.data('height'), // �������� ������ data ������ �������� data-height
            popupPos
            ;

        $popup.css({
            'position': 'absolute',
            'top': popupY,
            'left': popupX,
            'width': 'auto',
            'height': 'auto'
        }).removeClass('screen_max');

        $searchPopupBlock.css('height', 'auto');

        if($popup.height() > $(window).height()) {
            searchPopupBlockHeightChange($popup);
        } else {
            admWorkareaShadow($popup);
        }

        // ���������� ����� ������, ����� ����������
        popupPos = elementInfo.position($popup);

        // ���� �� �������� �� ������������, ����� ������� �� ������
        if(popupPos.win.location == 'topHide' || popupPos.win.location == 'bottomHide') {
            $('html,body').animate({
                'scrollTop':  popupY-100
            }, 200, function() {});
        }

        $popup.find('span.resize').attr('title', arLocaleParams.lang.rollUpToWholeArea);
    }

    /*! Hammer.JS - v2.0.4 - 2014-09-28
     * http://hammerjs.github.io/
     * Copyright (c) 2014 Jorik Tangelder;
     * Licensed under the MIT license */
})(jqLoc);

/*========= Functions begin ==========*/
String.prototype.removeSpacesLocal = function () {
    return this.replace(/\s+/g," ").replace(/^\s*/,'').replace(/\s*$/,'');
};
/*========= Functions end ==========*/
