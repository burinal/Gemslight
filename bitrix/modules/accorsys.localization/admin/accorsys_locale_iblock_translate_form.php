<?php
define("NO_KEEP_STATISTIC", true);
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/fileman/prolog.php");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_popup_admin.php");
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs_title.php');

CModule::IncludeModule('iblock');
CLocale::includeLocaleLangFiles();
CJSCore::init(array('jquery'));
global $APPLICATION;

$APPLICATION->AddHeadString("<link href='/bitrix/js/accorsys.localization/flags.css.php' rel='stylesheet' type='text/css' />");
$iblockID = $_REQUEST['iblockId'];
$arIblock = CIBlock::GetByID($iblockID)->fetch();
$rsIBlockSites = CIBlock::GetSite($iblockID);
while ($arIBlockSite = $rsIBlockSites->Fetch())
{
    $arLIDList[$arIBlockSite['LID']] = $arIBlockSite['LID'];
}
$rsSites = CSite::GetList($by,$order,array());
while ($arSite = $rsSites->Fetch())
{
    $arSites[] = $arSite;
}



$arAdditionalProps = array();
$arDefaultProps = array();
if(!isset($_REQUEST['indexiblockid'])){
    $rsObject = CIBlockElement::GetList(array(),array('IBLOCK_ID'=>$iblockID));
    $oObject = $rsObject->GetNextElement();
    // Ñגמיסעגא
    if(is_object($oObject))
        $arProps = $oObject->GetProperties();

    foreach($arProps as $key => $prop){
        if($prop['PROPERTY_TYPE'] != 'S')
            continue;
        if($prop['USER_TYPE'] == "" || $prop['USER_TYPE'] == "HTML"){
            $arDefaultProps[$key] = $prop;
        }elseif($prop['USER_TYPE'] != "UserID" &&
            $prop['USER_TYPE'] != "DateTime" &&
            $prop['USER_TYPE'] != "map_yandex" &&
            $prop['USER_TYPE'] != "FileMan" &&
            $prop['USER_TYPE'] != "TopicID" &&
            $prop['USER_TYPE'] != "ElementXmlID" &&
            $prop['USER_TYPE'] != "map_google"
        ){
            $arAdditionalProps[$key] = $prop;
        }
    }

    $arSites = CIBlock::GetSite($_REQUEST['iblockId']);
}else{
    $arElementsID = array();
    foreach($_REQUEST['ID'] as $idElement){
        if(($idElement[0] == 'E' || $idElement[0] > 0) && !isset($_REQUEST['action_target'])){
            $arElementsID[] =ltrim($idElement,'E');
        }
    }
    $arLangsFrom = array();
    $dbIblockElements = CIBlockElement::GetList(array(),array("IBLOCK_ID"=>$iblockID,'ID' => $arElementsID),array('PROPERTY_lang'),false,array('PROPERTY_lang'));
    while($arIblockElements = $dbIblockElements->getNext()){
        $arLangsFrom[$arAccorsysLocaleLangs[$arIblockElements['PROPERTY_LANG_VALUE']]] = array(
            'lang' => $arIblockElements['PROPERTY_LANG_VALUE'],
            'count' => $arIblockElements['CNT'],
            'name' => $arAccorsysLocaleLangs[$arIblockElements['PROPERTY_LANG_VALUE']]
        );
    }
    ksort($arLangsFrom);
    $arSites = CSite::GetList($by,$order,array());
}

$arLocObj = new CLocale();

while($arSite = $arSites->fetch()){
    $notSortedCurSiteLangs = $arLocObj->GetSiteLangs($arSite['LID']);
    foreach($notSortedCurSiteLangs as $code => $lang){
        $curSiteLangs[$code] = $arAccorsysLocaleLangs[$code].' ('.strtoupper($code).')';
    }
}
asort($curSiteLangs);

if(isset($_REQUEST['indexiblockid'])){
    $title = GetMessage("LC_ONLINE_TRANSLATION");
}elseif(isset($_REQUEST['translate_sections'])){
    $dbSection = CIBlockSection::getByID($_REQUEST['id']);
    $arSection = $dbSection->getNext();
    $title = GetMessage('LC_IBLOCK_TRANSLATE_SECTION').' - '.$arSection["NAME"].' [<a target="_blank" href="http://modules.accorsys.dev/bitrix/admin/iblock_section_edit.php?IBLOCK_ID='.$iblockID.'&type='.$arIblock['IBLOCK_TYPE_ID'].'&ID='.$_REQUEST['id'].'&find_section_section=0">'.$_REQUEST['id'].'</a>]';
}elseif(isset($_REQUEST['translate_element'])){
    $dbElement = CIBlockElement::getByID($_REQUEST['id']);
    $arElement = $dbElement->getNext();
    $title = GetMessage('LC_IBLOCK_TRANSLATE_ELEMENT').' - '.$arElement["NAME"].' [<a target="_blank" href="http://modules.accorsys.dev/bitrix/admin/iblock_element_edit.php?IBLOCK_ID='.$iblockID.'&type='.$arIblock['IBLOCK_TYPE_ID'].'&ID='.$_REQUEST['id'].'">'.$_REQUEST['id'].'</a>]';
}else{
    $title = GetMessage('LC_IBLOCK_TRANSLATE_ALL').' - '.$arIblock["NAME"].' [<a target="_blank" href="http://modules.accorsys.dev/bitrix/admin/iblock_edit.php?IBLOCK_ID='.$iblockID.'&type='.$arIblock['IBLOCK_TYPE_ID'].'">'.$iblockID.'</a>]';
}
?>

<div id="bx-admin-prefix" class="adm-detail-block iblock-translate-page">
    <div class="adm-detail-content-wrap">
        <div class="form-wrapper">
            <form target="/ajax/accorsys.localization/accorsys_iblock_translate.php" name="translateIblockForm">
                <input type="hidden" name="by_items" value="10">
                <input type="hidden" name="iblock_id" value="<?=$iblockID?>">
                <?if(isset($_REQUEST['translate_sections']) || isset($_REQUEST['translate_element'])){?>
                    <input type="hidden" name="<?=isset($_REQUEST['translate_sections']) ? 'translate_sections':'translate_element'?>" value="Y">
                    <input type="hidden" name="id[]" value="<?=$_REQUEST['id']?>">
                <?}
                if(isset($_REQUEST['indexiblockid'])){
                    ?>
                    <input type="hidden" name="arProperties[text]" value="Y">
                    <input type="hidden" name="translate_element" value="Y">
                    <?
                    foreach($arElementsID as $idElement){
                        ?>
                        <input type="hidden" name="id[]" value="<?=$idElement?>">
                    <?
                    }
                }
                ?>
                <div id="edit1" class="adm-detail-content">
                    <div class="adm-detail-title"><?=$title?></div>
                    <div class="spacer"><!-- --></div>
                    <div class="adm-detail-content-item-block">
                        <table class="adm-detail-content-table edit-table">
                            <tbody>
                            <?
                            if(isset($_REQUEST['indexiblockid'])){
                                ?>
                                <tr>
                                    <td class="adm-detail-content-cell-l valign-top"><?=GetMessage("LC_TRANSLATIONS_SELECT_ALL")?>:</td>
                                    <td class="adm-detail-content-cell-r adm-workarea ">
                                        <div class="select-wrap">
                                            <span class="flag-container-default-lang" style="float:left;">
                                                <span style="margin-top:7px;" class="ico-flag-<?=strtoupper($arLangsFrom[0]['lang'])?>"></span>
                                            </span>
                                            <select class="select-language" name="fromLangCopySelect">
                                                <?foreach($arLangsFrom as $arLang){?>
                                                    <option class="<?=$arLang['lang']?>"  value="<?=$arLang['lang']?>"><?=$arLang['name'].' ('.strtoupper($arLang['lang']).') - '.$arLang['count'].' רע.'?></option>
                                                <?}?>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <?
                            }

                            if(!isset($_REQUEST['translate_sections']) && !isset($_REQUEST['indexiblockid'])){?>
                                <tr>
                                    <td class="adm-detail-content-cell-l"><?=GetMessage("LC_FIELDS")?>:</td>
                                    <td class="adm-detail-content-cell-r">
                                        <div class="adm-list">
                                            <div class="adm-list-item">
                                                <div class="adm-list-control">
                                                    <input type="checkbox" checked="" class="typecheckbox adm-designed-checkbox" id="fieldNAME" value="Y" name="arFields[NAME]">
                                                    <label class="adm-designed-checkbox-label typecheckbox" for="fieldNAME" title=""></label>
                                                </div>
                                                <div class="adm-list-label">
                                                    <label for="fieldNAME"><?=GetMessage('LC_NAME')?></label>
                                                </div>
                                            </div>
                                            <div class="adm-list-item">
                                                <div class="adm-list-control">
                                                    <input type="checkbox" checked="" class="typecheckbox adm-designed-checkbox" id="fieldPREVIEWTEXT" value="Y" name="arFields[PREVIEW_TEXT]">
                                                    <label class="adm-designed-checkbox-label typecheckbox" for="fieldPREVIEWTEXT" title=""></label>
                                                </div>
                                                <div class="adm-list-label">
                                                    <label for="fieldPREVIEWTEXT"><?=GetMessage('LC_TEXT_PREVIEW')?></label>
                                                </div>
                                            </div>
                                            <div class="adm-list-item">
                                                <div class="adm-list-control">
                                                    <input type="checkbox" checked="" class="typecheckbox adm-designed-checkbox" id="fieldDETAILTEXT" value="Y" name="arFields[DETAIL_TEXT]">
                                                    <label class="adm-designed-checkbox-label typecheckbox" for="fieldDETAILTEXT" title=""></label>
                                                </div>
                                                <div class="adm-list-label">
                                                    <label for="fieldDETAILTEXT"><?=GetMessage('LC_TEXT_DETAIL')?></label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <?if(is_object($oObject)){?>
                                    <?if(!empty($arDefaultProps)){?>
                                        <tr>
                                            <td class="adm-detail-content-cell-l"><?=GetMessage('LC_PROPERTIES')?> (<?=GetMessage('LC_MNEMONIC_CODE')?>):</td>
                                            <td class="adm-detail-content-cell-r">
                                                <div class="adm-list">
                                                    <?foreach($arDefaultProps as $key => $prop){?>
                                                        <div class="adm-list-item">
                                                            <div class="adm-list-control">
                                                                <input type="checkbox" checked="" class="typecheckbox adm-designed-checkbox" id="prop<?=$key?>" value="Y" name="arProperties[<?=$key?>]">
                                                                <label class="adm-designed-checkbox-label typecheckbox" for="prop<?=$key?>" title=""></label>
                                                            </div>
                                                            <div class="adm-list-label">
                                                                <label for="prop<?=$key?>"><?=$prop['NAME'].' ('.$prop['CODE'].')'?></label>
                                                            </div>
                                                        </div>
                                                    <?}?>
                                                </div>
                                            </td>
                                        </tr>
                                    <?}?>
                                    <?if(!empty($arAdditionalProps)){?>
                                        <tr>
                                            <td class="adm-detail-content-cell-l"><?=GetMessage('LC_CUSTOM_PROPERTIES')?> (<?=GetMessage('LC_MNEMONIC_CODE')?>):</td>
                                            <td class="adm-detail-content-cell-r">
                                                <div class="adm-list">
                                                    <?foreach($arAdditionalProps as $key => $prop){?>
                                                        <div class="adm-list-item">
                                                            <div class="adm-list-control">
                                                                <input type="checkbox" checked="" class="typecheckbox adm-designed-checkbox" id="prop<?=$key?>" value="Y" name="arProperties[<?=$key?>]">
                                                                <label class="adm-designed-checkbox-label typecheckbox" for="prop<?=$key?>" title=""></label>
                                                            </div>
                                                            <div class="adm-list-label">
                                                                <label for="prop<?=$key?>"><?=$prop['NAME'].' ('.$prop['CODE'].')'?></label>
                                                            </div>
                                                        </div>
                                                    <?}?>
                                                </div>
                                            </td>
                                        </tr>
                                    <?}?>
                                <?}
                            }
                            require_once($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/classes/general/CALTranslate.php');
                            $objTranslator = new CALTranslate();
                            $gTranslate = !is_array($objTranslator::translateGoogle('hello','ru'));
                            $yTranslate = !is_array($objTranslator::translateYandex('hello','ru'));
                            $msTranslate = !is_array($objTranslator::translateMicrosoft('hello','ru'));
                            ?>
                            <tr>
                                <td class="adm-detail-content-cell-l valign-top"><?=GetMessage('LC_ONLINE_TRANSLATION_SERVICE_SELECT')?>:</td>
                                <td class="adm-detail-content-cell-r languages-selection">
                                    <input <?=$gTranslate?'checked="true"':'disabled="true"'?> id="goTr" type="radio" value="go" name="TRANSLATE_SYSTEM_CODE">
                                    <label class="span-icon icon-google" for="goTr"><?=GetMessage('LC_GOOGLE_TRANSLATE_API_SETTINGS_TITLE')?></label>
                                    <input <?=$msTranslate? ($gTranslate ? '':'checked="true"'):'disabled="true"'?> id="msTr" type="radio" value="ms" name="TRANSLATE_SYSTEM_CODE">
                                    <label class="span-icon icon-microsoft" for="msTr"><?=GetMessage('LC_MICROSOFT_TRANSLATOR_API_SETTINGS_TITLE')?></label>
                                    <input <?=$yTranslate? ($gTranslate || $msTranslate ? '':'checked="true"'):'disabled="true"'?> id="yaTr" type="radio" value="ya" name="TRANSLATE_SYSTEM_CODE">
                                    <label class="span-icon icon-ya" for="yaTr"><?=GetMessage('LC_YANDEX_TRANSLATE_API_SETTINGS_TITLE')?></label><br />
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="adm-detail-content-cell-l"></td>
                                <td width="50%" class="adm-detail-content-cell-r">
                                <a target="_blank" href="/bitrix/admin/settings.php?mid=accorsys.localization&mid_menu=1&open_tab=general"><?=GetMessage('LC_SETTINGS')?></a>                                   </td>
                            </tr>
                            <tr>
                                <td class="adm-detail-content-cell-l valign-top"><?=GetMessage('LC_TRANSLATE_WINDOW_LANG_TITLE')?>:</td>
                                <td class="adm-detail-content-cell-r adm-workarea ">
                                    <div class="select-wrap">
                                        <span style="float:left;" class="flag-container-default-lang">
                                           <span class="ico-flag-<?=strtoupper($code)?>" style="margin-top:7px;"></span>
                                        </span>
                                        <select name="LANG" class="select-language">
                                            <?foreach($curSiteLangs as $code => $lang){
                                                ?>
                                                <option value="<?=$code?>" class="<?=$code?>">
                                                    <?=$lang?>
                                                </option>
                                            <?
                                            }?>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="adm-detail-content-btns">
                    <span class="warning-text"><?=GetMessage('LC_CAUTION_IBLOCK_TRANSLATIONS')?></span>
                    <input class="adm-btn-save" type="submit" title="" value="<?=GetMessage('LC_TRANSLATE')?>" name="copy">
                    <?=bitrix_sessid_post()?>
                </div>
            </form>
        </div>
        <div class="progress-bar-wrapper" style="display: none;">
            <div class="adm-detail-content-item-block">
                <h2 class="titleProcessing" style="font-weight: normal;font-size:18px;"><?=GetMessage('LC_TRANSLATION_WAIT')?></h2>
                <div class="adm-progress-bar-outer" style="width: 500px;">
                    <div class="adm-progress-bar-inner" style="width: <?=intval($percentage*497)?>px;">
                        <div class="adm-progress-bar-inner-text middlevalue" style="width: 500px;">0%</div>
                    </div>
                    <span class="whitevalue">0%</span>
                </div>
                <br />
                <?if(isset($_REQUEST['translate_element'])){
                    ?><a href="/bitrix/admin/iblock_element_edit.php?IBLOCK_ID=<?=$arIblock["ID"]?>&type=<?=$arIblock["IBLOCK_TYPE_ID"]?>&ID=<?=$_REQUEST['id']?>" type="button" style="display: none;" class="adm-btn show-results"><?=GetMessage('LC_SHOW_RESULTS')?></a><?
                }elseif(!isset($_REQUEST['translate_sections'])){
                    ?><a href="/bitrix/admin/iblock_list_admin.php?IBLOCK_ID=<?=$arIblock["ID"]?>&type=<?=$arIblock["IBLOCK_TYPE_ID"]?>" type="button" style="display: none;" class="adm-btn show-results"><?=GetMessage('LC_SHOW_RESULTS')?></a><?
                }?>
                <input type="button" style="display: none;" class="adm-btn close-window" value="<?=GetMessage('LC_CLOSE')?>">
            </div>
        </div>
    </div>
</div>
<style>
    #goTr:disabled ~ .icon-google {
        opacity: 0.5;
    }
    #msTr:disabled ~ .icon-microsoft {
        opacity: 0.5;
    }
    #yaTr:disabled ~ .icon-ya {
        opacity: 0.5;
    }
    .languages-selection .span-icon {
        cursor: pointer;
    }
    #goTr:checked ~ label.span-icon.icon-google {
        font-weight: bold;
    }
    #msTr:checked ~ label.span-icon.icon-microsoft {
        font-weight: bold;
        cursor: pointer;
    }
    #yaTr:checked ~ label.span-icon.icon-ya {
        font-weight: bold;
        cursor: pointer;
    }
    .warning-text {
        color: red;
        display: block;
        padding: 0 9px 14px;
    }
    .iblock-translate-page .adm-detail-content-wrap {
        border-radius: 4px;
        border-top: 1px solid #ced7d8;
    }
    .iblock-translate-page .adm-list .adm-list-item:first-child {
        margin: 0;
    }
    .iblock-translate-page .adm-list .adm-list-item {
        margin: 10px 0 0;
    }
    .iblock-translate-page .flag-container-default-lang > span {
        margin-left: -22px;
        width: 16px;
        height: 11px;
        vertical-align: middle;
        float:inherit;
        margin-top: -2px;
        margin-right: 3px;
    }
    .iblock-translate-page .select-wrap {
        float: left;
        margin-bottom: 5px;
        margin-top: 5px;
        margin-right: 20px;
        margin-left: 20px;
    }
    .iblock-translate-page .span-icon {
        background: url("/bitrix/images/accorsys.localization/icons/translate_icons.png") no-repeat scroll 0 0 rgba(0, 0, 0, 0);
        display: inline-block;
        height: 16px;
        line-height: 16px;
        margin-top: 6px;
        padding-left: 24px;
        padding-top: 0;
        vertical-align: top;
    }
    .iblock-translate-page .span-icon.icon-ya {background-position:0px 0px;}
    .iblock-translate-page .span-icon.icon-microsoft {background-position:0px -16px;}
    .iblock-translate-page .span-icon.icon-google {background-position:0px -32px;}

    .iblock-translate-page .valign-top.adm-detail-content-cell-l {
        vertical-align: middle;
    }
    #bx-admin-prefix .adm-designed-checkbox-label.typecheckbox {
        margin-left: 4px;
    }
    .adm-detail-content-cell-r > input {
        margin-left: 3px;
    }
    .adm-detail-content-cell-r > label {
        margin-right: 14px;
    }
    .iblock-translate-page .adm-detail-content-cell-l {
        vertical-align: top;
    }
    .iblock-translate-page .go-to-lang-settings {
        line-height: 24px;
        padding-left: 8px;
    }
    .iblock-translate-page .adm-detail-content-cell-l {
        width: 25%;
    }
    .iblock-translate-page .bx-gadgets-border-top::after {
        background: none repeat scroll 0 0 #e9f0f1;
        border-bottom: 1px solid #959a9c;
        border-top: 1px solid #fff;
        content: "";
        display: block;
        height: 5px;
        position: relative;
    }
    .iblock-translate-page .bx-gadgets-border-top {
        border-color: #d5ddde #c6cfd1 #ccd4d5;
        border-style: solid;
        border-width: 1px;
        height: 6px;
        margin: 0 -1px;
    }
    .iblock-translate-page .bx-gadgets-border-top {
        display: block;
    }
    .iblock-translate-page #bx-admin-prefix .adm-progress-bar-outer .middlevalue {
        color:white;
        line-height:31px;
    }
    .iblock-translate-page .adm-detail-content-item-block {
        text-align: center;
    }
    .iblock-translate-page .adm-progress-bar-outer {
        margin: auto;
    }
    .iblock-translate-page .adm-detail-content-cell-r {
        text-align: left;
    }
</style>
<script>
    $(function(){
        if(!$('input[name="TRANSLATE_SYSTEM_CODE"]:checked').get(0)){
            $('input[type="submit"]').attr('disabled',true);
        }
        $('.select-language').change(function(){
            onChangeSelectLang(this);
        });
        onChangeSelectLang($('.select-language'));
        function onChangeSelectLang(changedselect){
            $(changedselect).parents('.select-wrap:first').find('.flag-container-default-lang > span:first').attr("class",'ico-flag-' + $(changedselect).val().toUpperCase());
        }
        $('.select-language').change();
        var percentage = 1;
        $('form[name="translateIblockForm"]').submit(function(){
            if(!$('input[name="TRANSLATE_SYSTEM_CODE"]:checked').get(0)){
                return false;
            }
            $('.form-wrapper').hide();
            $('.progress-bar-wrapper').show();
            ajaxRequest({form:$(this), isFirstRequest:true});
            changePercentProgress(1);
            return false;
        });
        $('.close-window').click(function(){
            window.close()
        });
        function ajaxRequest(objParams){
            var dataForm = $(objParams.form).serialize();
            var url = $(objParams.form).attr('target');
            dataForm += objParams.PAGE_NAME ? ('&'+ objParams.PAGE_NAME +'=' + objParams.PAGE_NUMBER) : '';
            dataForm += objParams.PAGE_NAME ? '&NEXT_PAGE=Y' : '';
            dataForm += objParams.isFirstRequest ? '&AL_IBLOCK_COPY_IS_FIRST_PAGE=Y' : '';
            $.ajax({
                'type': "POST",
                'url': url,
                'data': dataForm ,
                success: function(data)
                {
                    var data = JSON.parse(data);
                    if(data.success == 'Y'){
                        var maxPersentage = 100;
                        var finishInterval = setInterval(function(){
                            percentage++;
                            changePercentProgress(percentage);
                            if(percentage >= maxPersentage){
                                clearInterval(finishInterval);
                                $('.titleProcessing').html('<?=GetMessage('LC_TRANSLATION_CONGRATS')?>');
                                $('.adm-progress-bar-outer').hide();
                                $('.close-window').show();
                            }
                        },
                        25);
                    }else{
                        var curPersentage = data.MAKE / data.ALL;
                        ajaxRequest({'form':objParams.form, 'PAGE_NAME':data.PAGE_NAME, 'PAGE_NUMBER':data.PAGE_NUMBER});
                        changePercentProgress(parseInt(curPersentage*100));
                        percentage = curPersentage*100;
                    }
                },
                error: function (){
                    $('.titleProcessing').html('<?=GetMessage('LC_ERROR_TIMEOUT')?>');
                    $('.adm-progress-bar-outer').hide();
                    $('.close-window').show();
                }
            });
        }

        function changePercentProgress(currentPercentage){
            if(currentPercentage > 100)
                currentPercentage = 100;

            var persantage= currentPercentage/100 * 497;
            $('.iblock-translate-page .adm-progress-bar-inner').css('width',persantage+'px');
            $('.iblock-translate-page .middlevalue').html(currentPercentage + '%');
            $('.iblock-translate-page .whitevalue').html(currentPercentage + '%');
        }
    });
</script>