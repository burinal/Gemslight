<?php
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/gadgets/bitrix/admin_info/lang/'.LANGUAGE_ID.'/index.php');
CJSCore::Init(array("jquery"));
$isBackTry = $_REQUEST['isBackSlide'] == "on";
$isWorkFlow = CModule::IncludeModule("workflow");

$url = 'http://'.$_SERVER['SERVER_NAME'].'/ajax/accorsys.localization/accorsys_get_cur_cms_data.php?needRequest=redaction';

if(ini_get('allow_url_fopen') == 1){
    $curRedaction = @file_get_contents($url);
}elseif(function_exists('curl_init')){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
    curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
    ob_start();
    curl_exec($ch);
    curl_close($ch);
    $curRedaction = ob_get_contents();
    ob_end_clean();
}else{
    $ht = new CHTTP();

    if($res = $ht->Get($url))
    {
        if(in_array($ht->status, array("200")))
        {
            $curRedaction = $res;
        }
    }
}

global $MESS;
$vendor = COption::GetOptionString("main", "vendor", "1c_bitrix");
$tempMess = $MESS;
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/lang/en/interface/epilog_main_admin.php');
$isIntranet = strpos($MESS["EPILOG_ADMIN_SM_".$vendor],'Intranet') !== false || strpos($MESS["EPILOG_ADMIN_SM_".$vendor],'Bitrix24') !== false;
$MESS = $tempMess;

$isCorrectVersion = $isIntranet || strtoupper($curRedaction) != strtoupper(GetMessage('LC_BITRIX_EDITION_FIRST_SITE')) && strtoupper($curRedaction) != "";
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

$lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini"));

file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini", serialize($lcTempSettings));

$sProduct = GetMessage("GD_INFO_product").' &quot;'.GetMessage("GD_INFO_product_name_".COption::GetOptionString("main", "vendor", "1c_bitrix")).'#VERSION#&quot;';
$sVer = ($GLOBALS['USER']->CanDoOperation('view_other_settings') ? " ".SM_VERSION : "");
$sProduct = str_replace("#VERSION#", $sVer, $sProduct);
$pNumber = 0;
?>
<div id="installContent">
<div class="adm-detail-block">
    <div id="localization_check_demands">
        <div id="demands">
            <form id="formstep" method="post" action="<?=$APPLICATION->GetCurPage()?>" name="form1" enctype="multipart/form-data">
                <div class="adm-detail-title"><?=GetMessage("LC_INSTALL_STEP_TITLE_REQUIREMENTS")?></div>
                <div class="adm-list-table-wrap">
                    <div class="adm-list-table-top">
                        <div class="adm-small-button adm-table-refresh refreshform" title="<?=GetMessage("LC_REFRESH")?>"></div>
                    </div>
                    <div class="table-borders">
                        <table class="adm-list-table ">
                            <thead>
                                <tr class="adm-list-table-header">
                                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner"><?=GetMessage("LC_REQUIREMENTS")?></div></td>
                                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner center"><?=GetMessage("LC_CHECK_STATUS")?></div></td>
                                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner"><?=GetMessage("LC_COMMENTS")?></div></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="adm-list-table-row">
                                    <td class="adm-list-table-cell"><?=++$pNumber?>. <?=GetMessage("LC_PHP_VERSION_REQ")?></td>
                                    <td class="adm-list-table-cell center"><?=version_compare(phpversion(), '5.3') >= 0 ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                    <td class="adm-list-table-cell <?=version_compare(phpversion(), '5.3') >= 0 ? '':' red-text '?>"><?=GetMessage("LC_PHP_VERSION_CUR")?> <?=phpversion()?></td>
                                </tr>
                                <tr class="adm-list-table-row">
                                    <td class="adm-list-table-cell"><?=++$pNumber?>. <?=GetMessage('LC_PHP_ENCODING_REQ')?></td>
                                    <td class="adm-list-table-cell center"><?=$isCorrectLocaleSettings ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                    <td class="adm-list-table-cell <?=$isCorrectLocaleSettings ? '':' red-text '?>"> <?=$isCorrectLocaleSettings ? 'mbstring.func_overload = '.ini_get('mbstring.func_overload').'<br>'.(trim(ini_get('mbstring.internal_encoding')) == '' ? '':'mbstring.internal_encoding = '.ini_get('mbstring.internal_encoding')) : 'mbstring.func_overload = '.ini_get('mbstring.func_overload').'<br>'.(trim(ini_get('mbstring.internal_encoding')) == '' ? '':'mbstring.internal_encoding = '.ini_get('mbstring.internal_encoding')).'<br>'.(strtoupper(LANG_CHARSET) == 'UTF-8' ? GetMessage('LC_PHP_ENCODING_REQ_HINT_UTF8') : GetMessage('LC_PHP_ENCODING_REQ_HINT_CP1251'))?></td>
                                </tr>
                                <tr class="adm-list-table-row">
                                    <td class="adm-list-table-cell"><?=++$pNumber?>. <?=GetMessage("LC_CURL_SUPPORT_REQ")?></td>
                                    <td class="adm-list-table-cell center "><?=function_exists(curl_init) ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                    <td class="adm-list-table-cell <?=function_exists(curl_init) ?'':' red-text '?>"><?=function_exists(curl_init) ? GetMessage("LC_CURL_SUPPORT_CUR") : GetMessage("LC_NO_UP")?></td>
                                </tr>
                                <tr class="adm-list-table-row">
                                    <td class="adm-list-table-cell"><?=++$pNumber?>. <?=GetMessage("LC_JSON_SUPPORT_REQ")?></td>
                                    <td class="adm-list-table-cell center "><?=function_exists(json_decode) ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                    <td class="adm-list-table-cell <?=function_exists(json_decode) ? '':' red-text '?>"><?=function_exists(json_decode) ? GetMessage("LC_JSON_SUPPORT_CUR").' '.phpversion('json') : GetMessage("LC_NO_UP")?></td>
                                </tr>
                                <tr class="adm-list-table-row">
                                    <td class="adm-list-table-cell"><?=++$pNumber?>. <?=GetMessage("LC_BITRIX_VERSION_REQ")?></td>
                                    <td class="adm-list-table-cell center " ><?=(int)SM_VERSION > 13 ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                    <td class="adm-list-table-cell <?=(int)SM_VERSION > 13 ?'':' red-text '?>"><?=$sProduct?></td>
                                </tr>
                                <?if(!$isIntranet){?>
                                    <tr class="adm-list-table-row">
                                        <td class="adm-list-table-cell"><?=++$pNumber?>. <?=GetMessage("LC_BITRIX_EDITION_REQ")?></td>
                                        <td class="adm-list-table-cell center "><?=$isCorrectVersion ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                        <td class="adm-list-table-cell <?=$isCorrectVersion ?'':' red-text '?>"><?=GetMessage("LC_BITRIX_EDITION_CUR")?> <?=$curRedaction?></td>
                                    </tr>
                                <?}?>
                                <tr class="adm-list-table-row">
                                    <td class="adm-list-table-cell"><?=++$pNumber?>. <?=GetMessage("LC_BITRIX_WORKFLOW_RECOMMENDED")?></td>
                                    <td class="adm-list-table-cell center "><?=$isWorkFlow ? "<div class='ok-module'></div>":"<div class='fail-module'></div>"?></td>
                                    <td class="adm-list-table-cell <?$isWorkFlow ? '':' red-text '?>"><?=$isWorkFlow ? GetMessage("LC_YES"):GetMessage("LC_NO_UP")?></td>
                                </tr>
                                <tr class="adm-list-table-row">
                                    <td class="adm-list-table-cell"><?=++$pNumber?>. <?=GetMessage("LC_TRANSLATION_FILES_WRITABLE")?></td>
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
                <?if(isset($lcTempSettings['recomendations'])){?>
                    <div class="adm-info-message">
                        <h4>
                            <?=GetMessage("LC_RECOMMENDED_ACTIONS")?>
                        </h4>
                        <ul <?=count($arRecomendations['recomendations'],true) == 2 ? 'class="non-bullit"':''?>>
                            <?foreach($lcTempSettings['recomendations'] as $arReccomend){
                                foreach($arReccomend as $key => $rec){
                                    ?>
                                    <li class="accorsys-rec-<?=$key?>">
                                        <?=$rec?>
                                    </li>
                                <?
                                }
                            }?>
                        </ul>
                    </div>
                <?}?>

                <div style="height:1px;clear:both;width:100%"><!-- --></div>

                <div class="consent" style="<?=$isAllOk ? "display:none;":""?>">
                    <!--new-->
                    <br />
                    <input id="continue" <?=$isAllOk ? ' checked="true" ':''?> type="checkbox" title="<?=GetMessage("LC_CHECK_UNCHECK")?>" class="adm-checkbox adm-designed-checkbox anyway">
                    <label for="continue" style="color:red;padding: 0 25px;" class="adm-designed-checkbox-label adm-checkbox consent-adm-checkbox"><?=GetMessage("LC_CONTINUE_ANYWAY")?></label>
                    <!--new-->
                </div>
                <?=bitrix_sessid_post()?>
                <input type="hidden" name="lang" value="<?=LANGUAGE_ID?>">
                <input type="hidden" name="id" value="accorsys.localization">
                <input type="hidden" name="install" value="Y">
                <input type="hidden" class="step" name="step" value="3">
                <input type="hidden" class="siteStep" value="<?=$siteStep?>">
                <div class="buttons">
                    <div class="button inline_block">
                        <input type="button" name="noinst" class="backForm" value="<?='&#706;&nbsp;&nbsp;&nbsp;&nbsp;'.GetMessage("LC_BACK")?>" />
                    </div>
                    <div class="button inline_block">
                        <input type="submit" <?=$isAllOk ? "":'disabled="true"'?> name="inst" value="<?=GetMessage('LC_INSTALL_MESS_NEXT').'&nbsp;&nbsp;&nbsp;&nbsp;&#707;'?>" />
                        <div class="preload inline_block">
                            <div class="preloader" style="display:none;"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<style>
    .red-text {
        color:red;
    }
    #installContent table a {
        text-decoration: underline;
    }
    .choise-langs-table tbody td.adm-list-table-cell {
        vertical-align: top;
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
        background: url("/bitrix/panel/main/images/bx-admin-sprite-small.png") no-repeat scroll 0 -2874px rgba(0, 0, 0, 0);
        width:18px;
        height:18px;
        margin: 0 auto;
    }

    #localization_check_demands .fail-module {
        background: url("/bitrix/panel/main/images/bx-admin-sprite-small.png") no-repeat scroll 0 -2903px rgba(0, 0, 0, 0);
        width:18px;
        height:18px;
        margin: 0 auto;
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

</style>
</div>
