<?php
define("NO_KEEP_STATISTIC", true);
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/fileman/prolog.php");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_popup_admin.php");
$iblockID = $_REQUEST['iblockId'];
CModule::IncludeModule('iblock');
CLocale::includeLocaleLangFiles();
CJSCore::init(array('jquery'));

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
?>

<div id="bx-admin-prefix" class="adm-detail-block iblock-copy-page">
    <div class="adm-detail-content-wrap">
        <div class="form-wrapper">
            <form target="/ajax/accorsys.localization/accorsys_iblock_copy.php" name="copyIblockForm">
                <input type="hidden" name="by_items" value="50">
                <div id="general" class="adm-detail-content">
                    <div class="adm-detail-title"><?=GetMessage('LC_IBLOCK_COPY')?></div>
                    <div class="adm-detail-content-item-block">
                        <input type="hidden" name="iblock_id" value="<?=$iblockID?>">
                        <table class="adm-detail-content-table edit-table">
                            <tbody>
                                <tr>
                                    <td class="adm-detail-content-cell-l" width="50%"><label for="ACTIVE"><?=GetMessage('LC_ACTIVE')?>:</label></td>
                                    <td class="adm-detail-content-cell-r" width="50%">
                                        <input type="hidden" value="N" name="ACTIVE">
                                        <input type="checkbox" <?=$arIblock['ACTIVE'] == 'Y'?'checked="true"':''?> value="Y" name="ACTIVE" id="ACTIVE" class="adm-designed-checkbox">
                                        <label class="adm-designed-checkbox-label" for="ACTIVE" title=""></label>
                                        <span style="display:none;"><input type="submit" style="width:0px;height:0px" value="Y" name="save"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" class="adm-detail-content-cell-l"><?=GetMessage('LC_MNEMONIC_CODE')?>:</td>
                                    <td width="50%" class="adm-detail-content-cell-r">
                                        <input type="text" value="<?=$arIblock["CODE"]?>" maxlength="50" size="20" name="CODE">
                                    </td>
                                </tr>
                                <tr class="adm-detail-required-field">
                                    <td class="adm-detail-valign-top adm-detail-content-cell-l"><?=GetMessage('LC_SITES')?></td>
                                    <td class="adm-detail-content-cell-r">
                                        <div class="adm-list">
                                            <?
                                            foreach($arSites as $site){
                                                ?>
                                                <div class="adm-list-item">
                                                    <div class="adm-list-control">
                                                        <input type="checkbox" <?=isset($arLIDList[$site['LID']]) ? 'checked="true"':''?> class="typecheckbox adm-designed-checkbox" id="<?=$site['LID']?>" value="<?=$site['LID']?>" name="LID[]">
                                                        <label class="adm-designed-checkbox-label typecheckbox" for="<?=$site['LID']?>" title=""></label>
                                                    </div>
                                                    <div class="adm-list-label">
                                                        <label for="s1"><?=$site['NAME']?></label>
                                                    </div>
                                                </div>
                                            <?
                                            }
                                            ?>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="adm-detail-required-field">
                                    <td class="adm-detail-content-cell-l"><?=GetMessage('LC_NAME')?>:</td>
                                    <td class="adm-detail-content-cell-r">
                                        <input type="text" value="<?=$arIblock["NAME"].' ('.strtoupper(GetMessage('LC_COPY')).')'?>" maxlength="255" size="40" name="NAME">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="adm-detail-content-cell-l"><?=GetMessage('LC_SORT')?>:</td>
                                    <td class="adm-detail-content-cell-r">
                                        <input type="text" value="<?=$arIblock['SORT']?>" maxlength="10" size="10" name="SORT">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="adm-detail-content-cell-l"><?=GetMessage('LC_IBLOCK_COPY_KEEP')?>:</td>
                                    <td class="adm-detail-content-cell-r select-mode">
                                        <input id="fullblock" checked="true" type="radio" name="includeElements" value="Y">
                                        <label for="fullblock"><?=GetMessage('LC_IBLOCK_COPY_KEEP_SECTIONS_ELEMENTS')?></label>
                                        <input id="emptyblock"  type="radio" name="includeElements" value="N">
                                        <label for="emptyblock"><?=GetMessage('LC_IBLOCK_COPY_KEEP_ELEMENT_STRUCTURE')?></label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="adm-detail-content-btns">
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
                <div class="errors-container" style="display: none;">
                    <ul class="list-errors">
                        <?=GetMessage('LC_ERROR_IBLOCK_CHECK_REQUIRED_FIELDS')?><br><br>
                    </ul>
                </div>
                <br />
                <input type="button" style="display: none;" class="adm-btn close-window" value="<?=GetMessage('LC_CLOSE')?>">
            </div>
        </div>
    </div>
</div>
<style>
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
        width: 25%;
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
        var percentage = 1;
        $('form[name="copyIblockForm"]').submit(function(){
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
            dataForm += objParams.PAGE_NAME ? ('&'+ objParams.PAGE_NAME +'=' + objParams.PAGE_NUMBER) : '';
            dataForm += objParams.PAGE_NAME ? '&NEXT_PAGE=Y' : '';
            dataForm += objParams.newIblockID ? ('&NEW_IBLOCK_ID=' + objParams.newIblockID) : '';
            $.ajax({
                'type': "POST",
                'url': url,
                'data': dataForm ,
                success: function(data)
                {
                    var data = JSON.parse(data);
                    if(objParams.includeElements == 'Y'){
                        if(data.SUCCESS == 'Y'){
                            var maxPersentage = 100;
                            var finishInterval = setInterval(function(){
                                percentage++;
                                changePercentProgress(percentage);
                                if(percentage >= maxPersentage){
                                    clearInterval(finishInterval);
                                    $('.titleProcessing').html('<?=GetMessage('LC_IBLOCK_COPY_CONGRATS')?>');
                                    $('.adm-progress-bar-outer').hide();
                                    if(data.ERROR != 'N'){
                                        $('.list-errors').append(data.ERROR);
                                        $('.errors-container').show();
                                    }

                                    $('.close-window').show();
                                }
                            },
                            25);
                        }else{
                            var curPersentage = data.MAKE / data.ALL;
                            ajaxRequest({'form':objParams.form, 'includeElements':'Y', 'PAGE_NAME':data.PAGE_NAME, 'PAGE_NUMBER':data.PAGE_NUMBER, 'newIblockID':data.NEW_IBLOCK_ID});
                            changePercentProgress(parseInt(curPersentage*100));
                            percentage = curPersentage*100;
                        }
                    }else{
                        percentage = 1;
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