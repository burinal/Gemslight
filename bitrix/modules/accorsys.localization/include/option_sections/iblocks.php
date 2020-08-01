<div class="adm-detail-title"><?=GetMessage("LC_CONSTANTS")?></div>
<div class="adm-detail-content-item-block lang-constants">
<?
$lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
$multiLangSite = array();
foreach($lcTempSettings['accorsysSiteLang'] as $siteName => $siteLangs){
    foreach($siteLangs as $lang){
        if(trim($lang) != '')
            $multiLangSites[$siteName][] = $lang;
    }
}
foreach($multiLangSites as $siteLID => $siteLangs){
    if(count($siteLangs) > 1)
        $multiLangSite[$siteLID] = $siteLangs;
}
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
$arLangsFile = $arAccorsysLocaleLangs;
$siteCount = 0;

$dbSystemSites = CSite::GetList($by = "sort", $order = "asc",array());

while($arSystemSites = $dbSystemSites->fetch()){
    if(!isset($multiLangSite[$arSystemSites['LID']])){
        $multiLangSite[$arSystemSites['LID']][] = $arSystemSites['LANGUAGE_ID'];
    }
}

foreach($multiLangSite as $siteLID => $siteLangs){
    $arSite = CSite::GetList($by = "sort", $order = "asc",array("LID"=>$siteLID))->fetch();
    $title = ++$siteCount.". ".GetMessage("LC_SITE")." -  ".$arSite["LID"]." ".$arSite["NAME"].":";
    $arConstLangs = array();
    $defaultLang = array(
        "NAME" => $arLangsFile[$arSite["LANGUAGE_ID"]],
        "LID" => $arSite["LANGUAGE_ID"]
    );
    foreach($siteLangs as $lang){
        if($lang == $defaultLang["LID"] || trim($lang)=="")
            continue;
        $arConstLangs[] = array(
            "NAME" => $arLangsFile[$lang],
            "LID" => $lang
        );
    }

    $arlocaleIblockID = CIBLock::getList(array(),array('CODE'=>"ALOCALE_IBLOCK"))->fetch();
    $localeIblockID = $arlocaleIblockID['ID'];

    $rsIblocks = CIblock::GetList(array("NAME"=>"ASC"),array("SITE_ID"=>$siteLID));
    $arSiteIblocks = array();
    $arSiteIblocksForInputs = array();
    while($arIblock = $rsIblocks->getNext()){
        if($arIblock['ID'] == $localeIblockID)
            continue;
        $arSiteIblocksForInputs[$arIblock["ID"]] = $arIblock;
        $arSiteIblocks[$arIblock["ID"]] = $arIblock;
    }

    ?>
    <div style="" class="adm-detail-block site-block<?=$siteLID?>">

        <div class="site_name"><?=$title?></div>

        <div class="adm-list-table-wrap">
            <div class="adm-list-table-top">
                <div class="adm-small-button adm-table-refresh refreshform" title="<?=GetMessage("LC_REFRESH")?>"></div>
            </div>
            <div class="table-borders">
                <table class="adm-list-table table-site-<?=$siteLID?>" data-site-id="<?=$siteLID?>">
                    <thead>
                    <tr class="adm-list-table-header">
                        <td class="adm-list-table-cell">
                            <div style="width: 165px;" class="adm-list-table-cell-inner">
                                <?=GetMessage("LC_CONSTANT_NAME")?>
                                <a target="_blank" class="adm-input-help-icon-locale" href="<?=GetMessage("LC_LANGUAGE_CONSTANT_HINT_URL")?>" title="<?=GetMessage("LC_LANGUAGE_CONSTANT_HINT")?>"></a>
                            </div>
                        </td>
                        <td class="adm-list-table-cell action">

                        </td>
                        <td class="adm-list-table-cell">
                            <div class="adm-list-table-cell-inner">
                                <div class="table-cell-wrap center">
                                    <div class="table-lang-wrap">
                                        <span class="flag-container-default-lang">
                                            <span class="ico-flag-<?=strtoupper($defaultLang["LID"])?>"></span>
                                        </span>
                                        <span class="default_language">
                                            <?=$arAccorsysLocaleLangs[$defaultLang["LID"]].' ('.strtoupper($defaultLang["LID"]).') - '?> <?=GetMessage("LC_BY_DEFAULT")?>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <?
                        $arSortedConstLangs = array();
                        foreach($arConstLangs as $arLang){
                            $arSortedConstLangs[$arAccorsysLocaleLangs[$arLang["LID"]]] = $arLang;
                        }
                        ksort($arSortedConstLangs);
                        foreach($arSortedConstLangs as $arLang){?>
                            <td class="adm-list-table-cell">
                                <div class="adm-list-table-cell-inner center">
                                    <div class="table-cell-wrap center">
                                        <div class="table-cell-wrap center">
                                            <div class="table-lang-wrap">
                                                <span class="flag-container-default-lang">
                                                    <span class="ico-flag-<?=strtoupper($arLang["LID"])?>"></span>
                                                </span>
                                                <span class="default_language">
                                                    <input type="hidden" value="ru" name="accorsysSiteLang[<?=$siteLID?>][]">
                                                    <?=$arAccorsysLocaleLangs[$arLang["LID"]].' ('.strtoupper($arLang["LID"]).')'?>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        <?}?>
                    </tr>
                    </thead>
                    <tbody>
                    <?$arConstantArray = array();
                    //TODO:??? ????? ????? ????? ?????????????? ???? ????? ????? ??? ????????? ????????? ????????? ?????? ? ????????? ?????
                    /*foreach($lcTempSettings['arConstants'][$siteLID] as $constName => $arLangsConsts){
                        $iblockID = str_replace('LC_'.strtoupper($siteLID)."_","",$constName);
                        $iblockName = $arSiteIblocks[$iblockID]["NAME"];
                        unset($arSiteIblocks[$iblockID]);

                        $iblockConstName = "LC_".strtoupper($siteLID)."_".$iblockID;
                        //Cutil::translit($arIblock["NAME"],'ru',array("max_len"=> 7, "change_case"=>"U"));
                        ?>
                        <tr data-iblock-name="<?=$iblockName." (".$iblockID.")"?>" data-iblock-id="<?=$iblockID?>" class="adm-list-table-row tr-iblockid-<?=$iblockID?>">
                             <td class="adm-list-table-cell"><div class="table-cell-wrap"><?=$iblockConstName?></div></td>
                             <td class="adm-list-table-cell">
                                <div class="table-cell-wrap center">
                                    <input type="hidden" value="<?=$iblockID?>" name="arConstants[<?=$siteLID?>][<?=$iblockConstName?>][<?=$defaultLang["LID"]?>]">
                                    <span class=""><?=$iblockName." (ID: ".$iblockID.")"?></span>
                                </div>
                            </td>
                            <?foreach($arConstLangs as $arLang){?>
                                <td class="adm-list-table-cell">
                                    <div class="table-cell-wrap">
                                        <div class="select-infoblock-wrap">
                                            <select name="arConstants[<?=$siteLID?>][<?=$iblockConstName?>][<?=$arLang["LID"]?>]" style="width:130px;" class="select-infoblock loaded-select-from-settings-const">
                                                <option value="0">(<?=GetMessage("LC_NO")?>)</option>
                                                <?foreach($arSiteIblocksForInputs as $iblock){
                                                    ?>
                                                    <option <?=$arLangsConsts[$arLang["LID"]]==$iblock["ID"] ? " selected ":""?> value="<?=$iblock["ID"]?>"><?=$iblock["NAME"]." (".$iblock["ID"].")"?></option>
                                                <?
                                                }?>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            <?}?>
                        </tr>
                    <?}*/
                    foreach($arSiteIblocks as $arIblock){
                        $iblockConstName = "LC_".strtoupper($siteLID)."_".$arIblock["ID"];
                        //Cutil::translit($arIblock["NAME"],'ru',array("max_len"=> 7, "change_case"=>"U"));

                        ?>
                        <tr data-iblock-name="<?=$arIblock["NAME"]." [".$arIblock["ID"]."]"?>" data-iblock-id="<?=$arIblock["ID"]?>" class="adm-list-table-row tr-iblockid-<?=$arIblock["ID"]?>">
                            <td class="adm-list-table-cell">
                                <div class="table-cell-wrap">
                                    <?=$iblockConstName?>
                                </div>
                            </td>
                            <td style="width: 30px;padding-left: 1px;" data-iblock-type="<?=$arIblock['IBLOCK_TYPE_ID']?>" data-iblock-id="<?=$arIblock['ID']?>" class="adm-list-table-cell">
                                <div title="<?=GetMessage('LC_ACTIONS')?>" class="actions-constants-cell adm-list-table-popup"></div>
                            </td>
                            <td class="adm-list-table-cell">
                                <div class="table-cell-wrap center">
                                    <input type="hidden" value="<?=$arIblock["ID"]?>" name="arConstants[<?=$siteLID?>][<?=$iblockConstName?>][<?=$defaultLang["LID"]?>]">
                                    <span class=""><?="".$arIblock["NAME"]." [<a target='_blank' href='/bitrix/admin/iblock_list_admin.php?IBLOCK_ID=".$arIblock["ID"]."&type=".$arIblock["IBLOCK_TYPE_ID"]."&lang=".LANGUAGE_ID."&find_section_section=0'>".$arIblock["ID"]."</a>]"?></span>
                                </div>
                            </td>
                            <?foreach($arSortedConstLangs as $arLang){
                                $isUsedInConsts = isset($lcTempSettings['arConstants'][$siteLID][$iblockConstName]);
                                $isUsedInConstsConst = (int)$lcTempSettings['arConstants'][$siteLID][$iblockConstName][$arLang["LID"]] == 0 ? false:true;
                                ?>
                                <td class="adm-list-table-cell">
                                    <div class="table-cell-wrap">
                                        <div class="select-infoblock-wrap">
                                            <select style="<?=$isUsedInConstsConst?"background-color:lightgreen;":""?> width: 225px;" name="arConstants[<?=$siteLID?>][<?=$iblockConstName?>][<?=$arLang["LID"]?>]" class="select-infoblock <?=$isUsedInConsts ? " loaded-select-from-settings-const ":""?>">
                                                <option value="0">(<?=GetMessage("LC_NO")?>)</option>
                                                <?foreach($arSiteIblocksForInputs as $iblock){
                                                    ?>
                                                    <option <?=$lcTempSettings['arConstants'][$siteLID][$iblockConstName][$arLang["LID"]] == $iblock["ID"] ? " selected ":""?> value="<?=$iblock["ID"]?>"><?=$iblock["NAME"]." [".$iblock["ID"]."]"?></option>
                                                <?
                                                }?>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            <?}?>
                        </tr>
                    <?}?>
                    </tbody>
                </table>
                <div style="display:none; z-index: 1000; position: absolute; margin-left: -2px; margin-top: 28px; height: auto; width: auto;" class="bx-core-popup-menu bx-core-popup-menu-bottom constants-popup">
                    <span style="left: 11px;" class="bx-core-popup-menu-angle"></span>
                                           <span class="bx-core-popup-menu-item bx-core-popup-menu-item-default  adm-menu-copy" title="">
                                               <span class="bx-core-popup-menu-item-icon"></span>
                                               <span class="bx-core-popup-menu-item-text"><?=GetMessage('LC_COPY_ACTION')?></span>
                                           </span>
                                           <span class="bx-core-popup-menu-item bx-core-popup-menu-item-default  adm-menu-translate" title="">
                                               <span class="bx-core-popup-menu-item-icon"></span>
                                               <span class="bx-core-popup-menu-item-text"><?=GetMessage('LC_TRANSLATE')?></span>
                                           </span>
                                           <span class="bx-core-popup-menu-item adm-menu-change" title="">
                                               <span class="bx-core-popup-menu-item-icon"></span>
                                               <span class="bx-core-popup-menu-item-text"><?=GetMessage('LC_EDIT')?></span>
                                           </span>
                                           <span class="bx-core-popup-menu-item  adm-menu-delete" title="">
                                               <span class="bx-core-popup-menu-item-icon"></span>
                                               <span class="bx-core-popup-menu-item-text"><?=GetMessage('LC_MENU_EDIT_DEL')?></span>
                                           </span>
                </div>
            </div>
            <div class="adm-list-table-footer">
                <div class="table-footer-link">
                    <a target="_blank" href="/bitrix/admin/iblock_type_admin.php"><?=GetMessage("LC_LINK_TO_IBLOCK_MANAGEMENT")?></a>
                </div>
            </div>
        </div>
        <!--new end-->
    </div>
<?}?>
<script>
$(function(){

    function stepDeleteIblock(iblockID, elementsCount, tr, curThis){
        $.post('/ajax/accorsys.localization/accorsys_step_deleteIblock.php', {
            'iblockID': iblockID,
            'elementsCount':elementsCount,
            'action':'deleteiblock'
        },function(data){
            if($.trim(data) == 'GONEXT'){
                stepDeleteIblock(iblockID, elementsCount, tr, curThis);
            }else if($.trim(data) == 'COMPLETE'){
                $.ajax({
                    'type': "POST",
                    'url': '/ajax/accorsys.localization/accorsys_iblock_copy.php?action=deleteiblock&iblockid='+ $(this).closest('td').attr('data-iblock-id'),
                    success: function(data)
                    {
                        $(tr).closest('table').find('select option[value="'+$(curThis).closest('td').attr('data-iblock-id')+'"]').remove();
                        $('.constants-popup').appendTo($('.lang-constants'));
                        $(tr).remove();
                        $('.constants-popup').hide();
                    }
                });
            }
        });
    }

    $('body').click(function(){
        $('.constants-popup').hide();
        $('.adm-list-row-active').removeClass('adm-list-row-active');
    });
    $('.constants-popup  .adm-menu-copy').click(function(e){
        jsUtils.OpenWindow('/bitrix/admin/accorsys_locale_iblock_copy_form.php?iblockId='+$(this).closest('td').attr('data-iblock-id'), 800, 450);
        e.stopPropagation();
        return false;
    });
    $('.constants-popup  .adm-menu-translate').click(function(e){
        jsUtils.OpenWindow('/bitrix/admin/accorsys_locale_iblock_translate_form.php?iblockId='+$(this).closest('td').attr('data-iblock-id'), 1100, 550);
        e.stopPropagation();
        return false;
    });
    $('.constants-popup  .adm-menu-change').click(function(e){
        var myIblockWin = window.open('/bitrix/admin/iblock_edit.php?ID='+ $(this).closest('td').attr('data-iblock-id') +'&type='+ $(this).closest('td').attr('data-iblock-type') +'&lang=<?=LANGUAGE_ID?>&admin=Y');
        e.stopPropagation();
        return false;
    });
    $('.constants-popup  .adm-menu-delete').click(function(e){
        var tr = $(this).closest('tr');
        var curThis = $(this);
        if(confirm('<?=GetMEssage('LC_IBLOCK_DELETE_CONFIRM')?>')){
            stepDeleteIblock($(this).closest('td').attr('data-iblock-id'), 300, tr, curThis);
        }

        e.stopPropagation();
        return false;
    });
    $('.actions-constants-cell').click(function(e){
        $('.adm-list-row-active').removeClass('adm-list-row-active');
        $(this).closest('tr').addClass('adm-list-row-active');
        $('.constants-popup').appendTo($(this));
        $('.constants-popup').show();
        e.stopPropagation();
        return false;
    });
    $('#option-form').submit(function(){
        $('.lang-constants table tr').each(function(){
            if($(this).find('.select-infoblock').length == $(this).find('option[value="0"]:selected').length){
                $(this).find('input').val("");
                $(this).find('select').find('option[value="0"]').val("");
            }
        });
    });
    $('body').append('<div style="display:none;" id="save-container-for-langs"></div>');
    $('.lang-constants table').each(function(){
        $('#save-container-for-langs').append('<div data-site-id="'+$(this).attr('data-site-id')+'" class="locale-save-constant-table-'+$(this).attr('data-site-id')+'"></div>');
    });
    $('.loaded-select-from-settings-const').each(function(){
        checkSelectChoiseAndSwitch($(this),true);
    });
    $('.select-infoblock').change(function(){
        if($(this).val() == 0){
            $(this).css({'background-color':'white'});
        }else{
            $(this).css({'background-color':'lightgreen'});
        }
        checkSelectChoiseAndSwitch($(this));
    });
    function checkSelectChoiseAndSwitch(select,isForLoaded){
        if(isForLoaded && parseInt($(select).val()) == 0)
            return;

        var parentTable =$(select).parents('table:first');
        var parentTr =$(select).parents('tr:first');
        var curSaveBlock = $('#save-container-for-langs .locale-save-constant-table-'+parentTable.attr('data-site-id'))

        if(parentTr.find('.select-infoblock').length == parentTr.find('option[value="0"]:selected').length){
            parentTr.siblings().find('select').each(function(){
                var isOff = true;
                var neededOption = false;
                var curIblockID = parentTr.attr('data-iblock-id');
                while(isOff && curIblockID > 0){
                    curIblockID--;
                    if(parseInt($(this).find('option[value="'+curIblockID+'"]').length) > 0){
                        neededOption = $(this).find('option[value="'+curIblockID+'"]');
                        isOff = false;
                    }
                }
                if(neededOption){
                    neededOption.after('<option value="'+parentTr.attr('data-iblock-id')+'">'+parentTr.attr('data-iblock-name')+'</option>');
                }else{
                    $(this).find('option[value="0"]').after('<option value="'+parentTr.attr('data-iblock-id')+'">'+parentTr.attr('data-iblock-name')+'</option>');
                }
            });
            curSaveBlock.find('select').each(function(){
                var isOff = true;
                var neededOption = false;
                var curIblockID = parentTr.attr('data-iblock-id');
                while(isOff && curIblockID > 0){
                    curIblockID--;
                    if(parseInt($(this).find('option[value="'+curIblockID+'"]').length) > 0){
                        neededOption = $(this).find('option[value="'+curIblockID+'"]');
                        isOff = false;
                    }
                }
                if(neededOption){
                    neededOption.after('<option value="'+parentTr.attr('data-iblock-id')+'">'+parentTr.attr('data-iblock-name')+'</option>');
                }else{
                    $(this).find('option[value="0"]').after('<option value="'+parentTr.attr('data-iblock-id')+'">'+parentTr.attr('data-iblock-name')+'</option>');
                }
            });
        }

        curSaveBlock.find('tr').each(function(){
            var iblockID = parseInt($(this).attr('data-iblock-id'));
            var siteID = $(this).parents('div:first').attr('data-site-id');
            var tableForUse = $('.table-site-'+siteID);

            if(tableForUse.find('.select-infoblock option[value="'+iblockID+'"]:selected').length == 0){
                var isOff = true;
                var neededTr = false;
                while(isOff && iblockID > 0){
                    iblockID--;
                    if(parseInt(parentTable.find('.tr-iblockid-'+iblockID).length) > 0){
                        neededTr = parentTable.find('.tr-iblockid-'+iblockID);
                        isOff = false;
                    }
                }
                if(neededTr){
                    neededTr.after($(this));
                }else{
                    parentTable.find('tbody').prepend($(this));
                }
                var curThis = $(this);
                parentTr.siblings().find('select').each(function(){
                    var isOff = true;
                    var neededOption = false;
                    var curIblockID = curThis.attr('data-iblock-id');
                    while(isOff && curIblockID > 0){
                        curIblockID--;
                        if(parseInt($(this).find('option[value="'+curIblockID+'"]').length) > 0){
                            neededOption = $(this).find('option[value="'+curIblockID+'"]');
                            isOff = false;
                        }
                    }
                    if(neededOption){
                        neededOption.after('<option value="'+curThis.attr('data-iblock-id')+'">'+curThis.attr('data-iblock-name')+'</option>');
                    }else{
                        $(this).find('option[value="0"]').after('<option value="'+curThis.attr('data-iblock-id')+'">'+curThis.attr('data-iblock-name')+'</option>');
                    }
                });
                curSaveBlock.find('select').each(function(){
                    var isOff = true;
                    var neededOption = false;
                    var curIblockID = curThis.attr('data-iblock-id');
                    while(isOff && curIblockID > 0){
                        curIblockID--;
                        if(parseInt($(this).find('option[value="'+curIblockID+'"]').length) > 0){
                            neededOption = $(this).find('option[value="'+curIblockID+'"]');
                            isOff = false;
                        }
                    }
                    if(neededOption){
                        neededOption.after('<option value="'+parentTr.attr('data-iblock-id')+'">'+parentTr.attr('data-iblock-name')+'</option>');
                    }else{
                        $(this).find('option[value="0"]').after('<option value="'+parentTr.attr('data-iblock-id')+'">'+parentTr.attr('data-iblock-name')+'</option>');
                    }
                });
            }
        });

        if(parseInt($(select).val()) == 0)
            return;

        var iblockID = $(select).val();

        if(parentTr.hasClass('tr-iblockid-'+iblockID) == false){
            parentTable.find('.tr-iblockid-'+iblockID).appendTo(curSaveBlock);

            parentTr.siblings().find('select option[value="'+iblockID+'"]').remove();
            curSaveBlock.find('select option[value="'+iblockID+'"]').remove();

            parentTr.siblings().find('select option[value="'+parentTr.attr('data-iblock-id')+'"]').remove();
            curSaveBlock.find('select option[value="'+parentTr.attr('data-iblock-id')+'"]').remove();
        }
        else if(parentTr.find('.select-infoblock').length != parentTr.find('option[value="0"]:selected').length && parentTr.hasClass('tr-iblockid-'+iblockID)){
            parentTr.siblings().find('select option[value="'+iblockID+'"]').remove();
            curSaveBlock.find('select option[value="'+iblockID+'"]').remove();
        }
    }
});
</script>
</div>