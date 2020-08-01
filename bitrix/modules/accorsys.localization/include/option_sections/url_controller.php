<div class="adm-detail-title"><?=GetMessage("LC_LANGUAGE_SWITCHING")?></div>
<div class="adm-detail-content-item-block standart-options">
    <?
    $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
    include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
    $arLangsFile = $arAccorsysLocaleLangs;
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
    foreach($lcTempSettings['alias_langs'] as $aliasSite => $aliasLangs){
        foreach($aliasLangs as $aliasKey => $aliasValues){
            foreach($aliasValues['subURL'] as $urlKey => $urlValue){
                $lcTempSettings['alias_langs'][$aliasSite][$aliasKey]['subURL'][$urlKey] = str_replace('#ACCORSYS_QUOTE#','"',$urlValue);
            }
        }
    }

    $siteCount = 0;
    foreach($multiLangSite as $siteLID => $siteLangs){
        $arSite = CSite::GetList($by = "sort", $order = "asc",array("LID"=>$siteLID))->fetch();
        $title = ++$siteCount.". ".GetMessage("LC_SITE")." -  ".$arSite["LID"]." ".$arSite["NAME"].":";
        $arConstLangs = array();
        $defaultLang = array(
            "NAME" => $arLangsFile[$arSite["LANGUAGE_ID"]],
            "LID" => $arSite["LANGUAGE_ID"]
        );
        foreach($siteLangs as $lang){
            if(trim($lang)=="")
                continue;
            $arConstLangs[] = array(
                "NAME" => $arLangsFile[$lang],
                "LID" => $lang
            );
        }
        ?>
        <div style="" class="adm-detail-block">
            <div class="site_name"><?=$title?></div>
            <div class="adm-list-table-wrap">
                <div class="adm-list-table-top">
                    <div class="adm-small-button adm-table-refresh refreshform" title="<?=GetMessage("LC_REFRESH")?>"></div>
                </div>
                <div class="table-borders">
                    <table id="url_controller_edit_table" class="adm-list-table table-site-<?=$siteLID?>" data-site-id="<?=$siteLID?>">
                        <thead>
                            <tr class="adm-list-table-header">
                                <td class="adm-list-table-cell const-url-main-header">
                                    <div class="adm-list-table-cell-inner" style="width: 165px;">
                                        <?=GetMessage("LC_SITE_URL")?>
                                    </div>
                                </td>
                                <td class="adm-list-table-cell lang-main-header">
                                    <div class="adm-list-table-cell-inner" style="width: 165px;">
                                        <?=GetMessage("LC_DEFAULT_LANG")?>
                                    </div>
                                </td>
                                <td class="adm-list-table-cell">
                                    <div class="adm-list-table-cell-inner" style="width: 165px;">
                                        <?=GetMessage("LC_SITE_URL_FORWARD")?>
                                        <a title="<?=GetMessage("LC_SITE_URL_FORWARD_TITLE")?>" href="<?=GetMessage("LC_SITE_URL_FORWARD_URL")?>" class="adm-input-help-icon-locale" target="_blank"></a>
                                    </div>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <?
                            $arSortedUrlLangs = array();
                            foreach($arConstLangs as $arLang){
                                if($arLang["LID"] == $defaultLang["LID"]){
                                    $arLang["DEFAULT"] = true;
                                }
                                $arSortedUrlLangs[$arAccorsysLocaleLangs[$arLang["LID"]]] = $arLang;
                            }
                            $defaultArLang = $arSortedUrlLangs[$arAccorsysLocaleLangs[$defaultLang["LID"]]];
                            unset($arSortedUrlLangs[$arAccorsysLocaleLangs[$defaultLang["LID"]]]);
                            ksort($arSortedUrlLangs);
                            array_unshift($arSortedUrlLangs,$defaultArLang);

                            $countAliases = 0;
                            foreach($lcTempSettings['alias_langs'][$siteLID] as $langTR){
                                ?>
                                <tr class="adm-list-table-row">
                                    <td class="adm-list-table-cell adm-detail-content-cell-r">
                                        <div class="cell-data-wrapper lang-inputs">
                                            <input type="text" value="<?=$langTR['mainURL']?>" name="alias_langs[<?=$siteLID?>][<?=$countAliases?>][mainURL]" class="langs-aliases">
                                        </div>
                                    </td>
                                    <td class="adm-list-table-cell adm-detail-content-cell-r lang-main-header-td">
                                        <div class="select-wrap">
                                        <span class="flag-container-default-lang" style="float:left;">
                                            <span style="margin-top:7px;" class="ico-flag-NOFLAG"></span>
                                        </span>
                                            <select class="select-language main-lang" name="alias_langs[<?=$siteLID?>][<?=$countAliases?>][mainLANG]">
                                                <option value="">(<?=GetMessage("LC_NO")?>)</option>
                                                <?foreach($arSortedUrlLangs as $arLang){?>
                                                    <option <?=$arLang['LID'] == $langTR['mainLANG'] ? ' selected ':''?> class="<?=$arLang['LID']?>"  value="<?=$arLang['LID']?>"><?=$arLang['NAME'].' ('.strtoupper($arLang['LID']).')'?></option>
                                                <?}?>
                                            </select>
                                        </div>
                                    </td>
                                    <td class="adm-list-table-cell adm-detail-content-cell-r">
                                        <div class="langs-container">
                                            <?
                                            foreach($langTR['subLANG'] as $key=>$subLang){
                                                if(trim($subLang) == "")
                                                    continue;
                                                ?>
                                                <div class="lang-alias-container">
                                                    <div class="select-wrap">
                                                        <span class="flag-container-default-lang" style="float:left;">
                                                            <span style="margin-top:7px;" class="ico-flag-NOFLAG"></span>
                                                        </span>
                                                        <select class="select-language sub-lang" name="alias_langs[<?=$siteLID?>][<?=$countAliases?>][subLANG][]">
                                                            <option value="">(<?=GetMessage("LC_NO")?>)</option>
                                                            <?foreach($arSortedUrlLangs as $arLang){?>
                                                                <option <?=$arLang['LID'] == $subLang ? ' selected ':''?> class="<?=$arLang['LID']?>"  value="<?=$arLang['LID']?>"><?=$arLang['NAME'].' ('.strtoupper($arLang['LID']).')'?></option>
                                                            <?}?>
                                                        </select>
                                                    </div>
                                                    <input class="sub-aliases" type="text" value='<?=$langTR['subURL'][$key]?>' name="alias_langs[<?=$siteLID?>][<?=$countAliases?>][subURL][]" style="margin-top: 5px;">
                                                </div>
                                            <?}?>
                                            <div class="lang-alias-container">
                                                <div class="select-wrap">
                                                    <span class="flag-container-default-lang" style="float:left;">
                                                        <span style="margin-top:7px;" class="ico-flag-NOFLAG"></span>
                                                    </span>
                                                    <select class="select-language sub-lang" name="alias_langs[<?=$siteLID?>][<?=$countAliases?>][subLANG][]">
                                                        <option value="">(<?=GetMessage("LC_NO")?>)</option>
                                                        <?foreach($arSortedUrlLangs as $arLang){?>
                                                            <option class="<?=$arLang['LID']?>"  value="<?=$arLang['LID']?>"><?=$arLang['NAME'].' ('.strtoupper($arLang['LID']).')'?></option>
                                                        <?}?>
                                                    </select>
                                                </div>
                                                <input class="sub-aliases" type="text" value="" name="alias_langs[<?=$siteLID?>][<?=$countAliases?>][subURL][]" style="margin-top: 5px;">
                                            </div>
                                        </div>
                                        <div class="used-langs-container" style="display: none;">
                                            <select class="select-language sub-lang">
                                                <option value="">(<?=GetMessage("LC_NO")?>)</option>
                                                <?foreach($arSortedUrlLangs as $arLang){?>
                                                    <option class="<?=$arLang['LID']?>" type="option" value="<?=$arLang["LID"]?>"><?=$arLang['NAME'].' ('.strtoupper($arLang['LID']).')'?></option>
                                                <?}?>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <?
                                $countAliases++;
                            }
                            ?>
                            <tr class="adm-list-table-row not-open">
                                <td class="adm-list-table-cell adm-detail-content-cell-r">
                                    <div class="cell-data-wrapper lang-inputs">
                                        <input type="text" value="<?=$lcTempSettings['alias_langs'][$siteLID][$countAliases]['mainURL'][$arLang['LID']]?>" name="alias_langs[<?=$siteLID?>][<?=$countAliases?>][mainURL]" class="langs-aliases">
                                    </div>
                                </td>
                                <td class="adm-list-table-cell adm-detail-content-cell-r lang-main-header-td">
                                    <div class="select-wrap">
                                        <span class="flag-container-default-lang" style="float:left;">
                                            <span style="margin-top:7px;" class="ico-flag-NOFLAG"></span>
                                        </span>
                                        <select class="select-language main-lang" name="alias_langs[<?=$siteLID?>][<?=$countAliases?>][mainLANG]">
                                            <option value="">(<?=GetMessage("LC_NO")?>)</option>
                                            <?foreach($arSortedUrlLangs as $arLang){?>
                                                <option class="<?=$arLang['LID']?>"  value="<?=$arLang['LID']?>"><?=$arLang['NAME'].' ('.strtoupper($arLang['LID']).')'?></option>
                                            <?}?>
                                        </select>
                                    </div>
                                </td>
                                <td class="adm-list-table-cell adm-detail-content-cell-r">
                                    <div class="langs-container">
                                        <div class="lang-alias-container">
                                            <div class="select-wrap">
                                            <span class="flag-container-default-lang" style="float:left;">
                                                <span style="margin-top:7px;" class="ico-flag-NOFLAG"></span>
                                            </span>
                                                <select class="select-language sub-lang" name="alias_langs[<?=$siteLID?>][<?=$countAliases?>][subLANG][]">
                                                    <option value="">(<?=GetMessage("LC_NO")?>)</option>
                                                    <?foreach($arSortedUrlLangs as $arLang){?>
                                                        <option class="<?=$arLang['LID']?>"  value="<?=$arLang['LID']?>"><?=$arLang['NAME'].' ('.strtoupper($arLang['LID']).')'?></option>
                                                    <?}?>
                                                </select>
                                            </div>
                                            <input class="sub-aliases" type="text" name="alias_langs[<?=$siteLID?>][<?=$countAliases?>][subURL][]" style="margin-top: 5px;">
                                        </div>
                                    </div>
                                    <div class="used-langs-container" style="display: none;">
                                        <select class="select-language sub-lang">
                                            <option value="">(<?=GetMessage("LC_NO")?>)</option>
                                            <?foreach($arSortedUrlLangs as $arLang){?>
                                                <option class="<?=$arLang['LID']?>" type="option" value="<?=$arLang["LID"]?>"><?=$arLang['NAME'].' ('.strtoupper($arLang['LID']).')'?></option>
                                            <?}?>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="adm-list-table-footer">
                    <div class="table-footer-link">
                        <a class="select-lang-tab" href="javascript:void(0)"><?=GetMessage("LC_LANGS")?></a>
                    </div>
                </div>
            </div>
            <!--new end-->
        </div>
    <?}?>
    <script>
        $(function(){
            $('#url_controller_edit_table .langs-aliases').change(function(){
                onMainURLChange(this);
            });
            $('#url_controller_edit_table .langs-aliases').on('blur',function(){
                onMainURLChange(this);
            });
            $('#url_controller_edit_table .langs-aliases').on('keyup',function(){
                onMainURLChange(this);
            });

            $('tr.not-open .lang-main-header-td select, tr.not-open .lang-main-header-td input, tr.not-open .langs-container select, tr.not-open .langs-container input').attr('disabled',true);

            function onMainURLChange(curInput){
                var curTr = $(curInput).closest('tr');
                if($.trim($(curInput).val()) == ""){
                    curTr.find('.lang-main-header-td select, .lang-main-header-td input, .langs-container select, .langs-container input').attr('disabled',true);
                }else{
                    if(curTr.hasClass('not-open')){
                        curTr.find('.lang-main-header-td select, .lang-main-header-td input').attr('disabled',false);
                    }else{
                        curTr.find('.lang-main-header-td select, .lang-main-header-td input, .langs-container select, .langs-container input').attr('disabled',false);
                    }
                }
            }
            function onMainLangChange(select){
                var curLang = $(select).val();
                var curContainerTr = $(select).closest('tr');

                if(!$(select).hasClass('used')){
                    var curCloneContainer = curContainerTr.clone(true,true);
                    curCloneContainer.find('.lang-alias-container').last().addClass('not-delete');
                    curCloneContainer.find('.lang-alias-container').each(function(){
                        if(!$(this).hasClass('not-delete'))
                            $(this).remove();
                    });
                    hideSelectedLanguages(curCloneContainer);

                    var arReplace = [];
                    arReplace.push(curCloneContainer.find('.langs-aliases'));
                    arReplace.push(curCloneContainer.find('.main-lang'));
                    arReplace.push(curCloneContainer.find('.sub-lang'));
                    arReplace.push(curCloneContainer.find('.sub-aliases'));

                    for(var i in arReplace){
                        var arSplit = arReplace[i].attr('name').split('][');
                        arSplit[1]++;
                        arReplace[i].attr('name', arSplit.join(']['));
                    }
                    curCloneContainer.find('.lang-alias-container').removeClass('not-delete');
                    curCloneContainer.find('.langs-aliases').val('');
                    curCloneContainer.find('.lang-main-header-td select, .lang-main-header-td input, .langs-container select, .langs-container input').attr('disabled',true);
                    curContainerTr.after(curCloneContainer);
                    curContainerTr.find('.langs-container select, .langs-container input').attr('disabled',false);
                    curContainerTr.removeClass('not-open');
                    $(select).addClass('used');
                }
                $(select).parents('.select-wrap:first').find('.flag-container-default-lang > span:first').attr("class",'ico-flag-' + $(select).val().toUpperCase());
                curContainerTr.find('.lang-alias-container .sub-lang').each(function(){
                    if($(this).val() == curLang && curLang != ""){
                        $(this).closest('.lang-alias-container').remove();
                    }
                });

                if(curLang != "")
                    curContainerTr.find('.lang-alias-container option.'+curLang).remove();

                hideSelectedLanguages(curContainerTr);
            }
            function onSubLangChange(select){
                var curTr = $(select).closest('tr');
                if($(select).val() == ""){
                    $(select).closest('.lang-alias-container').remove();
                }
                if(!$(select).hasClass('used')){
                    var curCloned = $(select).closest('.lang-alias-container').clone(true,true);
                    curCloned.find('select').val("");
                    curCloned.find('input').val("");
                    $(select).closest('.lang-alias-container').after(curCloned);
                    $(select).addClass('used');
                }
                $(select).parents('.select-wrap:first').find('.flag-container-default-lang > span:first').attr("class",'ico-flag-' + $(select).val().toUpperCase());
                hideSelectedLanguages(curTr);
            }
            $('#url_controller_edit_table tr').each(function(){
                hideSelectedLanguages($(this));
                if($(this).find('.main-lang').val() != "")
                    $(this).find('.lang-alias-container option.'+$(this).find('.main-lang').val()).remove();
            });
            function hideSelectedLanguages(curTr){
                var curContainerTr = curTr;

                var availableLangs = {};
                var selectedLangs = {};
                curContainerTr.find('.used-langs-container option').each(function(){
                    if($(this).val() != "")
                        availableLangs[$(this).val()] = $(this).text();
                });
                curContainerTr.find('select').each(function(){
                    if($(this).val() != ""){
                        selectedLangs[$(this).val()] = 'Y';
                    }
                });
                curContainerTr.find('.langs-container select').each(function(){
                    var curSelect = $(this);
                    $(curSelect).closest('.langs-container').find('select').each(function(){
                        if(curSelect.get(0) !== this && curSelect.val() != ""){
                            $(this).find('option.' + curSelect.val()).remove();
                        }
                    });
                });
                for(var lang in availableLangs){
                    if(!selectedLangs[lang]){
                        curContainerTr.find('.langs-container').find('select').each(function(){
                            if(!$(this).find('option.'+lang).get(0))
                                $(this).append('<option class="'+lang+'" value="'+lang+'">'+availableLangs[lang]+'</option>');
                        });
                    }
                }
                if(Object.keys(selectedLangs).length >= Object.keys(availableLangs).length){
                    curContainerTr.find('.langs-container').find('select').last().closest('.lang-alias-container').hide();
                }else{
                    curContainerTr.find('.langs-container').find('select').last().closest('.lang-alias-container').show();
                }
            }
            $('.select-language.main-lang').change(function(){
                onMainLangChange($(this));
            });
            $('.select-language.sub-lang').change(function(){
                onSubLangChange($(this));
            });
            $('#url_controller_edit_table select').each(function(){
                $(this).closest('.select-wrap').find('.flag-container-default-lang > span:first').attr("class",'ico-flag-' + $(this).val().toUpperCase());
            });
        });
    </script>
</div>