<?php
define("NO_KEEP_STATISTIC", true);
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/fileman/prolog.php");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_popup_admin.php");
$iblockID = $_REQUEST['iblockId'];
CModule::IncludeModule('iblock');
CLocale::includeLocaleLangFiles();
CJSCore::init(array('jquery'));
$_SESSION['AL_COPY_INFO']['LOCALE_IBLOCK_LEMENTS']['ADD_ELEMENT_COUNT'] = 0;

$APPLICATION->AddHeadString('<link rel="stylesheet" type="text/css" href="/bitrix/js/accorsys.localization/flags.css.php">');
$arIblock = CIBlock::GetByID($iblockID)->fetch();

$rsIBlockSites = CIBlock::GetSite($iblockID);
while($arIBlockSite = $rsIBlockSites->Fetch())
{
    $arLIDList[$arIBlockSite['LID']] = $arIBlockSite['LID'];
}
$rsSites = CSite::GetList($by,$order,array());
while ($arSite = $rsSites->Fetch())
{
    $arSites[] = $arSite;
}
$arElementsID = array();
foreach($_REQUEST['ID'] as $idElement){
    if(($idElement[0] == 'E' || $idElement[0] > 0) && !isset($_REQUEST['action_target'])){
        $arElementsID[] = ltrim($idElement,'E');
    }
}

$lcSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
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
foreach($lcSettings['accorsysSiteLang'] as $SITE_ID => $arAllLang){
    foreach($arAllLang as $lang){
        if(trim($lang) != "")
            $arAllLangs[$arAccorsysLocaleLangs[$lang]] = array(
                'lang' => $lang,
                'name' => $arAccorsysLocaleLangs[$lang]
            );
    }
}
ksort($arAllLangs);

function accorsys_localization_plural($n, $arEnds = array())
{
    if ( $n % 10 == 1 && $n % 100 != 11 )
    {
        return $arEnds[0];
    }

    if ( $n % 10 >= 2 && $n % 10 <= 4 && ( $n % 100 < 10 || $n % 100 >= 20 ) )
    {
        return $arEnds[1];
    }

    return $arEnds[2];
}
?>
<div id="bx-admin-prefix" class="adm-detail-block iblock-copy-page">
    <div class="adm-detail-content-wrap">
        <div class="form-wrapper">
            <form target="/ajax/accorsys.localization/accorsys_copy_all_as_new_lang.php" name="copyIblockForm">
                <input type="hidden" name="by_items" value="50">
                <?
                foreach($arElementsID as $idElement){
                    ?>
                    <input type="hidden" value="<?=$idElement?>" name="elementsID[]">
                    <?
                }
                if(empty($arElementsID)){
                    foreach($arLangsFrom as $arLang){
                        ?>
                        <input type="hidden" value="<?=$arLang['count']?>" name="arLangsPhrazesCount[<?=$arLang['lang']?>]">
                        <?
                    }
                }else{
                    ?>
                    <input type="hidden" value="<?=count($arElementsID)?>" name="arLangsPhrazesCount[allLangs]">
                    <?
                }
                ?>
                <div id="general" class="adm-detail-content">
                    <div class="adm-detail-title"><?=GetMessage("LC_TRANSLATIONS_COPYING")?></div>
                    <div class="adm-detail-content-item-block">
                        <input type="hidden" name="iblock_id" value="<?=$iblockID?>">
                        <table class="adm-detail-content-table edit-table">
                            <tbody>
                                <?if(empty($arElementsID)){?>
                                    <tr>
                                        <td class="adm-detail-content-cell-l" width="50%"><label for="ACTIVE"><?=GetMessage("LC_TRANSLATIONS_SELECT_ALL")?>:</label></td>
                                        <td class="adm-detail-content-cell-r radio-langs-from" width="50%">
                                            <?
                                            $isFirst = true;
                                            foreach($arLangsFrom as $arLang){?>
                                                <div class="select-wrap">
                                                    <input <?=$isFirst?' checked="true" ':''?> type="radio" name="fromLangCopySelect" id="radio-<?=$arLang['lang']?>"  value="<?=$arLang['lang']?>">
                                                    <span style="margin-top: 2px; margin-left: 13px;" class="ico-flag-<?=strtoupper($arLang['lang'])?>"></span>
                                                    <label for="radio-<?=$arLang['lang']?>">
                                                        <?=$arLang['name'].' ('.strtoupper($arLang['lang']).') – '.$arLang['count'].' '.($arLang['count'] > 1 ? GetMessage("LC_ELEMENTS"):GetMessage("LC_ELEMENT"))?>
                                                    </label>
                                                </div>
                                            <?
                                                $isFirst = false;
                                            }?>
                                        </td>
                                    </tr>
                                <?}?>
                                <tr>
                                    <td class="adm-detail-content-cell-l" width="50%"><label for="ACTIVE"><?=GetMessage("LC_TRANSLATIONS_COPY_SELECTED")?>:</label></td>
                                    <td class="adm-detail-content-cell-r not-content-radio" width="50%">
                                        <div class="select-wrap">
                                            <span class="flag-container-default-lang" style="float:left;">
                                                <span style="margin-top:7px;" class="ico-flag-<?=strtoupper($arLangsFrom[0]['lang'])?>"></span>
                                            </span>
                                            <select class="select-language toLangSelect" name="toLangCopySelect">
                                                <?
                                                foreach($arAllLangs as $arLang){?>
                                                    <option class="<?=$arLang['lang']?>"  value="<?=$arLang['lang']?>"><?=$arLang['name'].' ('.strtoupper($arLang['lang']).')'?></option>
                                                <?}?>
                                            </select>
                                        </div>
                                        <div class="toLangSelectContainer" style="display: none;">
                                            <select>
                                                <?
                                                foreach($arAllLangs as $arLang){?>
                                                    <option class="<?=$arLang['lang']?>"  value="<?=$arLang['lang']?>"><?=$arLang['name'].' ('.strtoupper($arLang['lang']).')'?></option>
                                                <?}?>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="adm-detail-content-cell-l" width="50%"><label for="ACTIVE"><?=GetMessage("LC_TRANSLATIONS_EXISTING")?>:</label></td>
                                    <td class="adm-detail-content-cell-r" width="50%">
                                        <input id="existsSkip" checked="true" type="radio" name="actionOnExistsElements" value="skip">
                                        <label for="existsSkip"><?=GetMessage("LC_SKIP")?></label>
                                        <br>
                                        <input id="existsOverwrite" type="radio" name="actionOnExistsElements" value="overwrite">
                                        <label for="existsOverwrite"><?=GetMessage("LC_REPLACE")?></label>
                                        <br>
                                        <br>
                                        <div class="spacer"><!-- --></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="adm-detail-content-btns">
                    <span class="warning-text warning not-content-radio" style="display: none;">
                        <?=GetMessage("LC_CAUTION_TRANSLATIONS_COPY")?>
                    </span>
                    <input class="adm-btn-save" type="submit" title="" value="<?=GetMessage('LC_COPY_ACTION')?>" name="copy">
                    <?=bitrix_sessid_post()?>
                </div>
            </form>
        </div>
        <div class="progress-bar-wrapper" style="display: none;">
            <div class="adm-detail-content-item-block">
                <h2 class="titleProcessing" style="font-weight: normal;font-size:18px;"><?=GetMessage('LC_IBLOCK_COPY_WAIT')?></h2>
                <div class="adm-progress-bar-outer" style="width: 500px;">
                    <div class="adm-progress-bar-inner" style="width: <?=intval($percentage*497)?>px;">
                        <div class="adm-progress-bar-inner-text middlevalue" style="width: 500px;">0%</div>
                    </div>
                    <span class="whitevalue">0%</span>
                </div>
                <br />
                <input type="button" style="display: none;" class="adm-btn close-window" value="<?=GetMessage('LC_CLOSE')?>">
            </div>
        </div>
    </div>
</div>
<style>
    .radio-langs-from .select-wrap {
        margin-left: 0;
    }
    .select-wrap > input {
        float: left;
        margin-top: -2px;
    }
    .select-wrap > label {
        padding-left: 7px;
    }
    .not-content-radio {
        padding-left: 13px;
    }
    .warning {
        color:red;
    }
    .warning-text {
        color: red;
        display: block;
        padding: 0 9px 14px;
    }
    div.spacer {
        clear: both;
        height: 1px;
        width: 100%;
    }
    .select-wrap {
        height: 27px;
        float: left;
        margin: 5px 20px;
        min-width: 300px;
    }
    .flag-container-default-lang > span {
        margin-left: -22px;
        width: 16px;
        height: 11px;
        vertical-align: middle;
        float:inherit;
        margin-top: -2px;
        margin-right: 3px;
    }
    .flag-container-default-lang .ico-flag-NOFLAG {
        border:0px;
        margin-top:8px !important;
    }
    .select-mode label {
        cursor: pointer;
    }
    #fullblock:checked ~ label[for="fullblock"] {
        font-weight: bold;
    }
    #emptyblock:checked ~ label[for="emptyblock"] {
        font-weight: bold;
    }
    .adm-detail-content-cell-l:first-letter {
        text-transform:uppercase;
    }
    .adm-detail-content-cell-l {
        padding-top: 13px;
        vertical-align: top;
        width: 30%;
    }
    .bx-gadgets-border-top::after {
        background: none repeat scroll 0 0 #e9f0f1;
        border-bottom: 1px solid #959a9c;
        border-top: 1px solid #fff;
        content: "";
        display: block;
        height: 5px;
        position: relative;
    }
    .bx-gadgets-border-top {
        border-color: #d5ddde #c6cfd1 #ccd4d5;
        border-style: solid;
        border-width: 1px;
        height: 6px;
        margin: 0 -1px;
    }
    .bx-gadgets-border-top {
        display: block;
    }
    .iblock-copy-page .adm-detail-content-wrap {
        border-radius: 4px;
        border-top: 1px solid #ced7d8;
    }
    #bx-admin-prefix .adm-progress-bar-outer .middlevalue {
        color:white;
        line-height:31px;
    }
    #installContent .adm-detail-title {
        padding:3px 53px 12px 0;
    }
    #installContent .adm-info-message {
        margin-top: 27px;
        margin-bottom: 27px;
    }
    .adm-detail-content-item-block {
        text-align: center;
    }
    .adm-progress-bar-outer {
        margin: auto;
    }
    .adm-detail-content-cell-r {
        text-align: left;
    }
</style>
<script>
    $(function(){
        function onChangeSelectRadio(curSelect){
            var curToLang = $('.toLangSelect').val();
            $('.toLangSelect option').remove();
            $('.toLangSelectContainer option').each(function(){
                if(!$(this).hasClass($(curSelect).val())){
                    $('.toLangSelect').append($(this).clone(true,true));
                }
            });
            $('.toLangSelect').val(curToLang);
            $('.toLangSelect').parents('.select-wrap:first').find('.flag-container-default-lang > span:first').attr("class",'ico-flag-' + $('.toLangSelect').val().toUpperCase());
        }
        $('input[name="fromLangCopySelect"]').change(function(){
            onChangeSelectRadio($(this));
        });
        onChangeSelectRadio($('input[name="fromLangCopySelect"]'));

        function onChangeSelectLang(changedselect){
            if($(changedselect).val())
                $(changedselect).parents('.select-wrap:first').find('.flag-container-default-lang > span:first').attr("class",'ico-flag-' + $(changedselect).val().toUpperCase());
        }
        $('form[name="copyIblockForm"] .select-wrap select').change(function(){
            onChangeSelectLang(this);
        });
        $('form[name="copyIblockForm"] .select-wrap select').change();
        $('form[name="copyIblockForm"] input[name="actionOnExistsElements"]').change(function(){
            if($(this).val() == 'overwrite'){
                $('.warning').show();
            }else{
                $('.warning').hide();
            }
        });
        var percentage = 1;
        $('form[name="copyIblockForm"]').submit(function(){
            if(
                $('form[name="copyIblockForm"] input[name="actionOnExistsElements"]:checked').val() == 'overwrite' &&
                !confirm("<?=GetMessage("LC_TRANSLATIONS_COPY_ALERT")?>")
                ) return false;

            $('.form-wrapper').hide();
            $('.progress-bar-wrapper').show();
            if($('input[name="includeElements"]:checked').val() == 'N'){
                ajaxRequest({form:$(this)});
            }else{
                ajaxRequest({form:$(this), includeElements:'Y'});
            }
            changePercentProgress(1);
            return false;
        });

        $('.close-window').click(function(){
            window.close()
        });

        function ajaxRequest(objParams){
            var dataForm = $(objParams.form).serialize();
            var url = $(objParams.form).attr('target');
            dataForm += objParams.NEXT_PAGE ? '&NEXT_PAGE=' + objParams.NEXT_PAGE : '&NEXT_PAGE=1';
            $.ajax({
                'type': "POST",
                'url': url,
                'data': dataForm ,
                success: function(data)
                {
                    var data = JSON.parse(data);
                    if(data.SUCCESS == 'Y'){
                        var maxPersentage = 100;
                        var finishInterval = setInterval(function(){
                                percentage++;
                                changePercentProgress(percentage);
                                if(percentage >= maxPersentage){
                                    clearInterval(finishInterval);
                                    $('.titleProcessing').html('<?=GetMessage('LC_IBLOCK_COPY_CONGRATS')?>');
                                    $('.adm-progress-bar-outer').hide();
                                    $('.close-window').show();
                                }
                            },
                            25);
                    }else{
                        var curPersentage = data.MAKE / data.ALL;
                        ajaxRequest({'form':objParams.form, 'NEXT_PAGE':data.NEXT_PAGE});
                        changePercentProgress(parseInt(curPersentage*100));
                        percentage = curPersentage*100;
                    }
                }
            });
        }

        function changePercentProgress(currentPercentage){
            if(currentPercentage > 100)
                currentPercentage = 100;

            var persantage= currentPercentage/100 * 497;
            $('.iblock-copy-page .adm-progress-bar-inner').css('width',persantage+'px');
            $('.iblock-copy-page .middlevalue').html(currentPercentage + '%');
            $('.iblock-copy-page .whitevalue').html(currentPercentage + '%');
        }
    });
</script>