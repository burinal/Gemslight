<div class="adm-detail-title"><?=GetMessage("LC_SELECT_SITE_LANGUAGES")?></div>
<div class="adm-detail-content-item-block langs-choise">
<?
$lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
$arSiteTest = CSite::GetById(SITE_ID)->Fetch();
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs_title.php');
$arLangsTitle = $arAccorsysLocaleLangsTitle;
asort($arAccorsysLocaleLangs);
$arLangs = $arAccorsysLocaleLangs;
$arAdditionalLangs = $arAccorsysLocaleLangs;
$rsLangs = CLanguage::getList($by,$order);
$arSavedLangs = array();
foreach($lcTempSettings['accorsysSiteLang'] as $arSitelang){
    foreach($arSitelang as $lang){
        if(trim($lang) == "" || !isset($arAdditionalLangs[$lang]))
            continue;
        $arSavedLangs[$lang] = $arAdditionalLangs[$lang];
        unset($arAdditionalLangs[$lang]);
    }
}
while($lang = $rsLangs->getNext()){
    $arSystemLangs[$lang["LID"]] = $arAccorsysLocaleLangs[$lang["LID"]];
    unset($arAdditionalLangs[$lang["LID"]]);
    unset($arSavedLangs[$lang["LID"]]);
}
asort($arSystemLangs);
?>
<div class="adm-detail-block">
    <div class="addlang">
        <div class="addlang-container">
            <div class="addlang-container-inactive adm-list-table-wrap">
                <div class="adm-list-table-top">
                    <div class="checkbox-wrap-top inline_block">
                        <input id="select_all_extend"  type="checkbox" class="adm-checkbox adm-designed-checkbox">
                        <label for="select_all_extend" class="adm-designed-checkbox-label adm-checkbox" title="<?=GetMessage("LC_SELECT_ALL")?>"></label>
                    </div>
                    <div class="container-inactive-title inline_block"><?=GetMessage("LC_AVAILABLE_LANGS")?>&nbsp;<span class="countlangs"></span></div>
                </div>
                <div class="container-checkbox">
                    <?
                    $arDisabledLangs = array();
                    foreach($arAdditionalLangs as $code => $lang){
                        $disabledText = false;
                        if(strpos($arLangsTitle[$code],'UTF-8') !== false){
                            $disabledText = $arLangsTitle[$code];
                            $arDisabledLangs[$code] = $lang;
                            continue;
                        }
                        ?>
                        <div class="checkbox-wrap">
                            <input langtext="<?=$lang.' ('.strtoupper($code).')'?>" langid="<?=$code?>" id="<?=$code?>-inactive" type="checkbox" class="adm-checkbox adm-designed-checkbox additional-langs">
                            <label for="<?=$code?>-inactive" class="adm-designed-checkbox-label adm-checkbox"><?=$lang.' ('.strtoupper($code).') - '.$arLangsTitle[$code]?></label>
                            <span class="flag-container">
                               <span class="ico-flag-<?=strtoupper($code)?>"></span>
                            </span>
                        </div>
                    <?
                    }
                    foreach($arDisabledLangs as $code => $lang){
                        ?>
                        <div class="checkbox-wrap">
                            <input disabled="true" langtext="<?=$lang.' ('.strtoupper($code).')'?>" langid="<?=$code?>" id="<?=$code?>-inactive" type="checkbox" class="adm-checkbox adm-designed-checkbox additional-langs">
                            <label for="<?=$code?>-inactive" class="adm-designed-checkbox-label adm-checkbox lang-lable-disabled"><?=$lang.' ('.strtoupper($code).') - '.$arLangsTitle[$code]?></label>
                            <span class="flag-container">
                               <span class="ico-flag-<?=strtoupper($code)?>"></span>
                            </span>
                        </div>
                    <?
                    }
                    ?>
                </div>
                <div class="adm-list-table-footer"></div>
            </div>
            <div class="addlang-container-switch">
                <span id="button-withdraw" class="switch-button switch-button-withdraw adm-btn"></span>
                <span id="button-add" class="switch-button switch-button-add adm-btn"></span>
            </div>
            <div class="addlang-container-active adm-list-table-wrap">
                <div class="adm-list-table-top">
                    <div class="checkbox-wrap-top inline_block">
                        <input id="select_all_defaults"  type="checkbox" class="adm-checkbox adm-designed-checkbox">
                        <label for="select_all_defaults" class="adm-designed-checkbox-label adm-checkbox" title="<?=GetMessage("LC_SELECT_ALL")?>"></label>
                    </div>
                    <div class="container-active-title inline_block"><?=GetMessage("LC_SELECTED_LANGS")?>&nbsp;<span class="countlangs"></span></div>
                </div>
                <div class="container-checkbox">
                    <?
                    foreach($arSystemLangs as $code => $lang){?>
                        <div class="checkbox-wrap">
                            <input langtext="<?=$lang.' ('.strtoupper($code).')'?>" langid="<?=$code?>" disabled="true" id="<?=$code?>-inactive" issystem="system" type="checkbox" class="adm-checkbox adm-designed-checkbox">
                            <label for="<?=$code?>-inactive" class="adm-designed-checkbox-label adm-checkbox"><?=$lang.' ('.strtoupper($code).') - '.$arLangsTitle[$code]?></label>
                            <span class="flag-container">
                                <span class="ico-flag-<?=strtoupper($code)?>"></span>
                            </span>
                        </div>
                    <?
                    }
                    ?>
                    <?
                    foreach($arSavedLangs as $code => $lang){
                        ?>
                        <div class="checkbox-wrap">
                            <input langtext="<?=$lang.' ('.strtoupper($code).')'?>" langid="<?=$code?>" id="<?=$code?>-inactive" type="checkbox" class="adm-checkbox adm-designed-checkbox additional-langs">
                            <label for="<?=$code?>-inactive" class="adm-designed-checkbox-label adm-checkbox"><?=$lang.' ('.strtoupper($code).') - '.$arLangsTitle[$code]?></label>
                            <span class="flag-container">
                                <span class="ico-flag-<?=strtoupper($code)?>"></span>
                            </span>
                        </div>
                    <?
                    }
                    ?>
                </div>
                <div class="adm-list-table-footer">
                </div>
            </div>
        </div>
    </div>
    <div class="adm-list-table-wrap">
        <div class="adm-list-table-top">
            <div class="adm-small-button adm-table-refresh refreshform" title="<?=GetMessage("LC_REFRESH")?>"></div>
        </div>
        <div class="table-borders">
            <table class="adm-list-table choise-langs-table">
                <thead>
                <tr class="adm-list-table-header">
                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner"><?=GetMessage("LC_SITE")?></div></td>
                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner"><?=GetMessage("LC_SITE_NAME")?></div></td>
                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner"><?=GetMessage("LC_SITE_FOLDER")?></div></td>
                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner"><?=GetMessage("LC_DEFAULT_LANG")?></div></td>
                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner"><?=GetMessage("LC_ADDITIONAL_LANGS")?></div></td>
                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner"><?=GetMessage("LC_DISPLAY_LANG_SELECTOR")?></div></td>
                </tr>
                </thead>
                <tbody>
                <?
                foreach($arSites as $siteID => $arParams){
                    ?>
                    <tr class="adm-list-table-row">
                        <td class="adm-list-table-cell"><div class="table-cell-wrap"><a target="_blank" href="/bitrix/admin/site_edit.php?LID=<?=$siteID?>"><?=$siteID?></a></div></td>
                        <td class="adm-list-table-cell"><div class="table-cell-wrap"><?=$arParams["NAME"]?></div></td>
                        <td class="adm-list-table-cell"><div class="table-cell-wrap"><?=$arParams["DIR"]?></div></td>
                        <td class="adm-list-table-cell">
                            <div class="table-cell-wrap">
                                <div class="table-lang-wrap">
                                   <span class="flag-container-default-lang">
                                       <span class="ico-flag-<?=strtoupper($arParams["LANGUAGE_ID"])?>"></span>
                                   </span>
                                   <span class="default_language">
                                       <input type="hidden" name="accorsysSiteLang[<?=$siteID?>][]" value="<?=$arParams["LANGUAGE_ID"]?>">
                                       <?=$arAccorsysLocaleLangs[$arParams["LANGUAGE_ID"]].' ('.strtoupper($arParams["LANGUAGE_ID"]).') '?>
                                   </span>
                                </div>
                            </div>
                        </td>
                        <td class="adm-list-table-cell langs-cell" style="width:50%;">
                            <div class="table-cell-wrap">
                                <div class="select-language-wrap site-lang-select-block">
                                    <?
                                    $arSortedSavedLangs = array();
                                    foreach($lcTempSettings['accorsysSiteLang'][$siteID] as $arLang){
                                        $arSortedSavedLangs[$arAccorsysLocaleLangs[$arLang]] = $arLang;
                                    }
                                    ksort($arSortedSavedLangs);
                                    foreach($arSortedSavedLangs as $langSaved){
                                        if(trim($langSaved) == "" || $langSaved == $arParams["LANGUAGE_ID"])
                                            continue;
                                        ?>
                                        <div class="select-wrap">
                                            <span class="flag-container-default-lang" style="float:left;">
                                                <span style="margin-top:7px;" class="ico-flag-<?=strtoupper($langSaved)?>"></span>
                                            </span>
                                            <select class="select-language used" name="accorsysSiteLang[<?=$siteID?>][]">
                                                <option value="">(<?=GetMessage("LC_NO")?>)</option>
                                                <?foreach($arSystemLangs as $code => $lang){
                                                    if($code == $arParams["LANGUAGE_ID"])
                                                        continue;
                                                    ?>
                                                    <option class="<?=$code?>" <?=$langSaved == $code ? " selected ":""?>  value="<?=$code?>"><?=$lang.' ('.strtoupper($code).')'?></option>
                                                <?}?>
                                                <?foreach($arSavedLangs as $code => $lang){?>
                                                    <option class="<?=$code?>" <?=$langSaved == $code ? " selected ":""?> value="<?=$code?>"><?=$lang.' ('.strtoupper($code).')'?></option>
                                                <?}?>
                                            </select>
                                        </div>
                                    <?
                                    }?>
                                    <div class="select-wrap">
                                                               <span class="flag-container-default-lang" style="float:left;">
                                                                   <span style="margin-top:7px;" class="ico-flag-NOFLAG"></span>
                                                               </span>
                                        <select class="select-language" name="accorsysSiteLang[<?=$siteID?>][]">
                                            <option value="">(<?=GetMessage("LC_NO")?>)</option>
                                            <?foreach($arSystemLangs as $code => $lang){
                                                if($code == $arParams["LANGUAGE_ID"])
                                                    continue;
                                                ?>
                                                <option class="<?=$code?>" value="<?=$code?>"><?=$lang.' ('.strtoupper($code).')'?></option>
                                            <?}?>
                                            <?foreach($arSavedLangs as $code => $lang){?>
                                                <option class="<?=$code?>" value="<?=$code?>"><?=$lang.' ('.strtoupper($code).')'?></option>
                                            <?}?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="adm-list-table-cell center">
                            <input <?=$lcTempSettings["isNeedLangSwitcher"][$siteID] == "on"?' checked="checked" ':""?> name="isNeedLangSwitcher[<?=$siteID?>]" type="checkbox" class="adm-checkbox adm-designed-checkbox lang-switcher-checkbox" id="switcher-<?=$siteID?>-inactive">
                            <label class="adm-designed-checkbox-label adm-checkbox" for="switcher-<?=$siteID?>-inactive"></label>
                        </td>
                    </tr>
                <?
                }
                ?>
                </tbody>
            </table>
        </div>
        <div class="inputs-additional-langs-changer"></div>
        <div class="adm-list-table-footer">
            <div class="table-footer-link">
                <a href="/bitrix/admin/site_admin.php" target="_blank"><?=GetMessage("LC_LINK_TO_SITE_MANAGEMENT")?></a>
            </div>
        </div>
    </div>
</div>
</div>