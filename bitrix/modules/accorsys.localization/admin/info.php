<?php

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/include.php");
CLocale::includeLocaleLangFiles();

include($_SERVER['DOCUMENT_ROOT'].'/bitrix/gadgets/bitrix/admin_info/lang/'.LANGUAGE_ID.'/index.php');
CJSCore::Init(array("jquery"));
$isBackTry = $_REQUEST['isBackSlide'] == "on";
$isWorkFlow = CModule::IncludeModule("workflow");

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/update_client.php");
$stableVersionsOnly = COption::GetOptionString("main", "stable_versions_only", "Y");
$arUpdateList = CUpdateClient::GetUpdatesList($errorMessage, LANG, $stableVersionsOnly);

$tempMess = $MESS;
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/lang/en/interface/epilog_main_admin.php');
$isIntranet = strpos($MESS["EPILOG_ADMIN_SM_".$vendor],'Intranet') !== false || strpos($MESS["EPILOG_ADMIN_SM_".$vendor],'Bitrix24') !== false;
$MESS = $tempMess;

$isCorrectVersion = $isIntranet || strtoupper($arUpdateList["CLIENT"][0]["@"]["LICENSE"]) != strtoupper(GetMessage("LC_BITRIX_EDITION_FIRST_SITE")) && strtoupper($arUpdateList["CLIENT"][0]["@"]["LICENSE"]) != "FIRST SITE" && strtoupper($arUpdateList["CLIENT"][0]["@"]["LICENSE"]) != "";
$isCorrectLocaleSettings = (strtoupper(LANG_CHARSET) == 'UTF-8' ? (ini_get('mbstring.func_overload') == 2 && strtoupper(ini_get('mbstring.internal_encoding')) == 'UTF-8'):(ini_get('mbstring.func_overload') == 0 && strtoupper(ini_get('mbstring.internal_encoding')) != 'UTF-8'));
$isAllOk =
    $isCorrectVersion &&
    $isWorkFlow &&
    count($notWritable) == 0 &&
    (int)SM_VERSION > 13 && version_compare(phpversion(), '5.3') >= 0 &&
    function_exists(json_decode) && function_exists(curl_init) &&
    $isCorrectLocaleSettings
;

$siteStep = 2;

$saleModulePermissions = $APPLICATION->GetGroupRight("sale");
if($saleModulePermissions == "D")
    $APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));

$manager = new CLocale();
$APPLICATION->SetTitle(GetMessage('LC_ADMIN_ABOUT').' '.$manager->getVersion());
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_after.php");
CModule::IncludeModule('accorsys.localization');

$sProduct = GetMessage("GD_INFO_product").' &quot;'.GetMessage("GD_INFO_product_name_".COption::GetOptionString("main", "vendor", "1c_bitrix")).'#VERSION#&quot;';
$sVer = ($GLOBALS['USER']->CanDoOperation('view_other_settings') ? " ".SM_VERSION : "");
$sProduct = str_replace("#VERSION#", $sVer, $sProduct);

CJSCore::Init(array("jquery"));

if(!file_exists($_SERVER["DOCUMENT_ROOT"].'/bitrix/images/accorsys.localization/banners/localization_bitrix_extension_banner_'.LANGUAGE_ID.'_1920x300.png')){
    $urlBanner = "..//images/accorsys.localization/banners/localization_bitrix_extension_banner_en_1920x300.png";
}else{
    $urlBanner = "..//images/accorsys.localization/banners/localization_bitrix_extension_banner_".LANGUAGE_ID."_1920x300.png";
}

$filename = $_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/install/version.php';
$lastDateUpdate = date("Y-m-d H:i:s", filemtime($filename));

?>
    <div id="resized_elem">
        <p><?=str_replace('#DATE#', $lastDateUpdate, GetMessage('LC_LAST_UPDATE_DATE'))?></p>
        <p><?=GetMessage('LC_COPYRIGHT')?></p>
        <div class="banner-container">
            <a target="_blank" href="<?=GetMessage("LC_PRODUCT_PAGE_URL")?>">
                <div class="banner"></div>
            </a>
        </div>
        <input type="button" class="show_requirements" value="<?=GetMessage("LC_CHECK_TECHNICAL_REQUIREMENTS")?>">
        <div style="height:20px;width:100%;clear:both;"><!-- --></div>
        <div class="requirementsContainer" style="display:none;">
            <div id="installContent">
                <div class="adm-detail-block">
                    <div id="localization_check_demands">
                        <div id="demands">
                            <form id="formstep" method="post" action="<?=$APPLICATION->GetCurPage()?>" name="form1" enctype="multipart/form-data">
                                <div class="adm-list-table-wrap">
                                    <div class="table-borders">
                                        <table class="internal" style="width:100%;">
                                            <thead>
                                                <tr class="heading">
                                                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner"><?=GetMessage("LC_REQUIREMENTS")?></div></td>
                                                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner center"><?=GetMessage("LC_CHECK_STATUS")?></div></td>
                                                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner"><?=GetMessage("LC_COMMENTS")?></div></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="adm-list-table-row">
                                                    <td class="adm-list-table-cell"><?=GetMessage("LC_PHP_VERSION_REQ")?></td>
                                                    <td class="adm-list-table-cell center"><?=version_compare(phpversion(), '5.3') >= 0 ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                                    <td class="adm-list-table-cell <?=version_compare(phpversion(), '5.3') >= 0 ? ' ok-text ':' red-text '?>"><?=GetMessage("LC_PHP_VERSION_CUR")?> <?=phpversion()?></td>
                                                </tr>
                                                <tr class="adm-list-table-row">
                                                    <td class="adm-list-table-cell"><?=GetMessage('LC_PHP_ENCODING_REQ')?></td>
                                                    <td class="adm-list-table-cell center"><?=$isCorrectLocaleSettings ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                                    <td class="adm-list-table-cell <?=$isCorrectLocaleSettings ? ' ok-text ':' red-text '?>"> <?=$isCorrectLocaleSettings ? 'mbstring.func_overload = '.ini_get('mbstring.func_overload').'<br>'.(trim(ini_get('mbstring.internal_encoding')) == '' ? '':'mbstring.internal_encoding = '.ini_get('mbstring.internal_encoding')) : 'mbstring.func_overload = '.ini_get('mbstring.func_overload').'<br>'.(trim(ini_get('mbstring.internal_encoding')) == '' ? '':'mbstring.internal_encoding = '.ini_get('mbstring.internal_encoding')).'<br>'.(strtoupper(LANG_CHARSET) == 'UTF-8' ? GetMessage('LC_PHP_ENCODING_REQ_HINT_UTF8') : GetMessage('LC_PHP_ENCODING_REQ_HINT_CP1251'))?></td>
                                                </tr>
                                                <tr class="adm-list-table-row">
                                                    <td class="adm-list-table-cell"><?=GetMessage("LC_CURL_SUPPORT_REQ")?></td>
                                                    <td class="adm-list-table-cell center "><?=function_exists(curl_init) ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                                    <td class="adm-list-table-cell <?=function_exists(curl_init) ?' ok-text ':' red-text '?>"><?=function_exists(curl_init) ? GetMessage("LC_CURL_SUPPORT_CUR") : GetMessage("LC_NO_UP")?></td>
                                                </tr>
                                                <tr class="adm-list-table-row">
                                                    <td class="adm-list-table-cell"><?=GetMessage("LC_JSON_SUPPORT_REQ")?></td>
                                                    <td class="adm-list-table-cell center "><?=function_exists(json_decode) ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                                    <td class="adm-list-table-cell <?=function_exists(json_decode) ? ' ok-text ':' red-text '?>"><?=function_exists(json_decode) ? GetMessage("LC_JSON_SUPPORT_CUR").' '.phpversion('json') : GetMessage("LC_NO_UP")?></td>
                                                </tr>
                                                <tr class="adm-list-table-row">
                                                    <td class="adm-list-table-cell"><?=GetMessage("LC_BITRIX_VERSION_REQ")?></td>
                                                    <td class="adm-list-table-cell center " ><?=(int)SM_VERSION > 13 ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                                    <td class="adm-list-table-cell <?=(int)SM_VERSION > 13 ?' ok-text ':' red-text '?>"><?=$sProduct?></td>
                                                </tr>
                                                <?if(!$isIntranet){?>
                                                    <tr class="adm-list-table-row">
                                                        <td class="adm-list-table-cell"><?=GetMessage("LC_BITRIX_EDITION_REQ")?></td>
                                                        <td class="adm-list-table-cell center "><?=$isCorrectVersion ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                                        <td class="adm-list-table-cell <?=$isCorrectVersion ?' ok-text ':' red-text '?>"><?=GetMessage("LC_BITRIX_EDITION_CUR")?> <?=$arUpdateList["CLIENT"][0]["@"]["LICENSE"]?></td>
                                                    </tr>
                                                <?}?>
                                                <tr class="adm-list-table-row">
                                                    <td class="adm-list-table-cell"><?=GetMessage("LC_BITRIX_WORKFLOW_RECOMMENDED")?></td>
                                                    <td class="adm-list-table-cell center "><?=$isWorkFlow ? "<div class='ok-module'></div>":"<div class='warning-module'></div>"?></td>
                                                    <td class="adm-list-table-cell <?=$isWorkFlow ? ' ok-text ':' warning-text '?>"><?=$isWorkFlow ? GetMessage("LC_YES"):GetMessage("LC_NO_UP")?></td>
                                                </tr>
                                                <tr class="adm-list-table-row">
                                                    <td class="adm-list-table-cell"><?=GetMessage("LC_TRANSLATION_FILES_WRITABLE")?></td>
                                                    <td class="adm-list-table-cell center status-module">
                                                        <div class=''>
                                                            <div class="preloader-table" style=""></div>
                                                        </div>
                                                    </td>
                                                    <td class="adm-list-table-cell comment-module">
                                                        &#133;
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="adm-list-table-footer">
                                        <div class="table-footer-link">
                                        </div>
                                    </div>
                                </div>
                                <div style="height:20px;clear:both;width:100%"><!-- --></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="resize_line" >
        <span id="tag"></span>
        <hr />
    </div>
    <p>
        <div class="eula_parent" >
            <div class="eula_container" >
                <?=file_get_contents($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/accorsys.localization/lang/".LANGUAGE_ID."/eula.html");?>
            </div>
        </div>
    </p>
    <style>
        .internal .adm-list-table-cell a {
            color: #2675d7;
            text-decoration: underline;
        }
        .preloader-table {
            background: url("../images/accorsys.localization/preloader.gif") no-repeat scroll center center rgba(0, 0, 0, 0);
            height: 15px;
            width: 100%;
        }

        #localization_check_demands .table-borders {
            min-width: 536px;
        }

        #localization_check_demands .ok-module {
            background: transparent url("/bitrix/themes/.default/icons/status_icons.png") no-repeat scroll -14px -19px;
            height: 22px;
            margin: 0 auto;
            width: 25px;
        }

        #localization_check_demands .fail-module {
            background: transparent url("/bitrix/themes/.default/icons/status_icons.png") no-repeat scroll -12px -73px;
            height: 22px;
            margin: 0 auto;
            width: 25px;
        }

        #localization_check_demands .warning-module {
            background: transparent url("/bitrix/themes/.default/icons/status_icons.png") no-repeat scroll -12px -212px;
            height: 22px;
            margin: 0 auto;
            width: 25px;
        }

        #localization_check_demands .img-loader {
            background: url("/bitrix/panel/main/images/waiter-white.gif") no-repeat scroll center center white;
            border-radius: 3px;
            height: 30px;
            margin-left: 455px;
            opacity: 0.5;
            position: absolute;
            width: 145px;
            z-index: 9999;
        }
        /*------------------------------*/
        .modul_info-item {
            display: inline-block;
            margin: 0;
            position: relative;
            bottom: 33px;
            left: 377px;
        }

        .adm-list-table-cell-inner.center {
            text-align: center;
        }

        .adm-list-table-cell.center {
            padding-left: 0;
        }

        label[for="continue"] {
            margin-left: 3px;
        }

        .refresh-list {
            margin-bottom: 12px;
        }

        .table-footer-link {
            display: inline-block;
            position: relative;
            top: 8px;
            left: 16px;
        }
        .consent {

        }
        .consent-adm-checkbox {
            width: 300px !important;
            padding: 0 20px;
        }
        .button {
            margin: 0px 12px 0px 0px;
        }

        .button input {
            padding: 0 25px 0px !important;
        }

        .buttons {
            margin: 20px 0 14px 0px;
        }

        /*-----------helper classes-----*/

        .inline_block {
            display: inline-block;
        }

        #popup-window-content-BXpopUpBlockedFiles{
            padding: 20px 10px;
        }
        #popup-window-content-BXpopUpBlockedDirectories{
            padding: 20px 10px;
        }

        .module_image {
            padding:25px;
        }
        .eula_parent {
            width: calc(100% - 15px);
            padding: 9px 0 9px 15px;
            border-radius: 5px;
            overflow: hidden;
            background: white;
        }
        .eula_container {
            padding: 14px 30px 0 30px;
            height: 360px;
            /*height: 571px;*/
            overflow-y: scroll;
            text-align: justify;
        }
        #resize_line {
            position: relative;
            cursor: n-resize;
        }
        #resize_line hr{
            padding: 2px 0;
            border-bottom: 0;
            border-left: 0;
            border-right: 0;
        }
        #resized_elem {
            overflow:hidden;
        }
        #tag {
            background: url("/bitrix/images/accorsys.localization/tag.png") no-repeat scroll 50% 50% rgba(0, 0, 0, 0);
            height: 16px;
            left: 50%;
            margin: -7px 0 0 -28px;
            position: absolute;
            width: 57px;
        }
        #resized_elem p:first-of-type {
            margin-top: 0;
        }

        h1.adm-title  {
            margin-bottom: 5px;
        }

        .version {
            display: inline-block;
            position: relative;
            left: 290px;
            bottom: 23px;
            margin: 0;
        }
        .banner-container {
            margin: 25px 0 25px;
        }
        .banner {
            height: 297px;
            background: url('<?=$urlBanner?>') 90% 40%  no-repeat;
        }
        #bx-admin-prefix .internal td.red-text {
            color: red !important;
        }
        #bx-admin-prefix .internal td.ok-text, #bx-admin-prefix .internal span.ok-text {
            color: #408218 !important;
        }
        #bx-admin-prefix .internal td.warning-text {
            color: #000000 !important;
        }
        _:-ms-input-placeholder, :root .show_requirements {
            box-shadow: 0px 0px 1px rgba(0,0,0,0.3),
            1px 1px 1px rgba(0,0,0,0.3),
            inset 0px 1px 0px #fff,
            inset 0px 0px 1px rgba(255,255,255,0.5),
            -1px 1px 1px rgba(0,0,0,0.2) !important;
        } /*Hack for ie=>10*/

        .show_requirements {
            left: 1px;
        }

    </style>


    <script type="text/javascript">
        $(function(){
            var r_clicked = false;
            var height, heightT;
            var $objTop = $('#resized_elem'),$objBot = $('.eula_container'),$objbanner = $('#resized_elem .banner');
            var startHeightBot = $objBot.height();
            var startHeightTop = $objTop.height();
            var startHeightBanner = $objTop.find('.banner').height();
            var bannerHeight = $objbanner.height();
            $('#resize_line').dblclick(function(){
                $objBot.css('height',startHeightBot);
                $objTop.css('height',startHeightTop);
                $objTop.find('.banner').css('height',startHeightBanner);
            });
            $('.show_requirements').click(function(){
                $objBot.parents('div:first').hide();
                $('#resized_elem').css('height','auto');
                $('#resize_line').hide();
                $('.requirementsContainer').slideDown(500, function(){
                    /*$objBot.css('min-height',startHeightBot);
                    $objTop.css('min-height',(parseInt(startHeightTop) + parseInt($('.requirementsContainer').height())) + 'px');
                    $objbanner.css('height',bannerHeight);*/
                });
                $.get('/ajax/accorsys.localization/accorsys_localization_check_files.php',{
                    'system_requirements_ajax_request':'Y',
                    'lang':'<?=LANGUAGE_ID?>'
                },function(objData){
                    var objData = JSON.parse(objData);

                    $('#formstep .status-module > div').empty();
                    $('#formstep .status-module > div').addClass(objData.isAllOk == 'true' ? 'ok-module' : 'fail-module');
                    $('#formstep .comment-module').html(objData.commentText);

                    window.BXDEBUG = true;
                    BX.ready(function(){
                        var oPopup = new BX.PopupWindow('BXpopUpBlockedDirectories', window.body, {
                            autoHide : true,
                            offsetTop : 1,
                            offsetLeft : 0,
                            lightShadow : true,
                            closeIcon : true,
                            closeByEsc : true,
                            overlay: {
                                backgroundColor: 'gray', opacity: '80'
                            }
                        });
                        oPopup.setContent(BX('BXpopUpBlockedDirectories').innerHTML);
                        BX.bindDelegate(
                            document.body, 'click', {className: 'blockedDirectories' },
                            BX.proxy(function(e){
                                if(!e)
                                    e = window.event;
                                oPopup.show();
                                return BX.PreventDefault(e);
                            }, oPopup)
                        );


                    });
                    BX.ready(function(){
                        var oPopup = new BX.PopupWindow('BXpopUpBlockedFiles', window.body, {
                            autoHide : true,
                            offsetTop : 1,
                            offsetLeft : 0,
                            lightShadow : true,
                            closeIcon : true,
                            closeByEsc : true,
                            overlay: {
                                backgroundColor: 'gray', opacity: '80'
                            }
                        });
                        oPopup.setContent(BX('BXpopUpBlockedFiles').innerHTML);
                        BX.bindDelegate(
                            document.body, 'click', {className: 'blockedFiles'},
                            BX.proxy(function(e){
                                if(!e)
                                    e = window.event;
                                oPopup.show();
                                return BX.PreventDefault(e);
                            }, oPopup)
                        );
                    });

                });
            });
            $('#resize_line').mousedown(function(e){
                e = fixEvent(e);
                r_clicked = e.pageY;
                height = $objTop.height();
                heightT = $objBot.height();
                return false;
            });
            $(document).mouseup(function(){
                r_clicked = false;
            })
            $('body').mousemove(function(e){
                if (r_clicked){
                    var new_height = height+e.pageY-r_clicked;
                    var new_heightT = heightT-e.pageY+r_clicked;
                    if (new_height > 0 && new_heightT > 360){
                        var intNewHeight = parseInt(new_height);
                        if((intNewHeight-67) <= bannerHeight && (intNewHeight-67) >= 190)
                            $objbanner.css('height',(intNewHeight-67)+'px');
                        $objTop.css('height',new_height);
                        $objBot.css('height',new_heightT);
                    }
                }
            });
        });
        function fixEvent(e) {
            e = e || window.event;
            if ( e.pageX == null && e.clientX != null ){
                var html = document.documentElement;
                var body = document.body;
                e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
                e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
            }
            if (!e.which && e.button) {
                e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
            }
            return e
        }
    </script>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin.php");