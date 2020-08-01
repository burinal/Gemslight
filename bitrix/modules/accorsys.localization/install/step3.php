<?if(!check_bitrix_sessid()) return;?>
<?
CopyDirFiles($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/images", $_SERVER["DOCUMENT_ROOT"]."/bitrix/images", false, true);
IncludeModuleLangFile(__FILE__);
CJSCore::Init(array("jquery"));
$dbSites = CSite::GetList($by = "id", $order = "asc");
while($arSite = $dbSites->fetch()){
    $arSites[$arSite["LID"]] = $arSite;
}
$lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini"));

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
        if(trim($lang) != "")
            $arSavedLangs[$lang] = $arAccorsysLocaleLangs[$lang];

        if(trim($lang) == "" || !isset($arAdditionalLangs[$lang]))
            continue;

        unset($arAdditionalLangs[$lang]);
    }
}
foreach($lcTempSettings['arAdditionalLangsChanger'] as $lang){
    if(trim($lang) != "")
        $arSavedLangs[$lang] = $arAccorsysLocaleLangs[$lang];

    if(trim($lang) == "" || !isset($arAdditionalLangs[$lang]))
        continue;

    unset($arAdditionalLangs[$lang]);
}

while($lang = $rsLangs->getNext()){
    $arSystemLangs[$lang["LID"]] = $arAccorsysLocaleLangs[$lang["LID"]];
    unset($arAdditionalLangs[$lang["LID"]]);
    unset($arSavedLangs[$lang["LID"]]);
}
asort($arSystemLangs);
asort($arSavedLangs);
$siteStep = 3;

?>

<div id="installContent">
    <?

    ?>
    <div class="adm-detail-block">
            <form id="formstep" method="post" action="<?=$APPLICATION->GetCurPage()?>" name="form1" enctype="multipart/form-data">
                    <div class="adm-detail-title"><?=GetMessage("LC_INSTALL_STEP_TITLE_LANGUAGES")?></div>
                    <!---new start--->
                    <div class="addlang">
                        <!--<div class="addlang-title">����� ������ ��� �����</div>-->
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
                                            <label for="<?=$code?>-inactive" class="adm-designed-checkbox-label adm-checkbox"><?=$lang.' ('.strtoupper($code).')'.' - '.$arLangsTitle[$code]?></label>
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
                                            <label for="<?=$code?>-inactive" class="adm-designed-checkbox-label adm-checkbox lang-lable-disabled"><?=$lang.' ('.strtoupper($code).')'.' - '.$arLangsTitle[$code]?></label>
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
                                            <label for="<?=$code?>-inactive" class="adm-designed-checkbox-label adm-checkbox"><?=$lang.' ('.strtoupper($code).')'.' - '.$arLangsTitle[$code]?></label>
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
                                            <label for="<?=$code?>-inactive" class="adm-designed-checkbox-label adm-checkbox"><?=$lang.' ('.strtoupper($code).')'.' - '.$arLangsTitle[$code]?></label>
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
                                            <td class="adm-list-table-cell"><div class="table-cell-wrap"><?=$siteID?></div></td>

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
                                                            <?=$arAccorsysLocaleLangs[$arParams["LANGUAGE_ID"]].' ('.strtoupper($arParams["LANGUAGE_ID"]).')'?>
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td class="adm-list-table-cell langs-cell" style="width:50%;">
                                                <div class="table-cell-wrap">
                                                    <div class="select-language-wrap site-lang-select-block">
                                                        <?foreach($lcTempSettings['accorsysSiteLang'][$siteID] as $langSaved){
                                                            if(trim($langSaved) == "" || $langSaved == $arParams["LANGUAGE_ID"])
                                                                continue;
                                                            ?>
                                                        <div class="select-wrap">
                                                            <span class="flag-container-default-lang" style="float:left;">
                                                                <span style="margin-top:7px;" class="ico-flag-<?=strtoupper($langSaved)?>"></span>
                                                            </span>
                                                            <select class="select-language used" name="accorsysSiteLang[<?=$siteID?>][]">
                                                                <option value=""><?=GetMessage("LC_T_TYPE_GROUP_NONE")?></option>
                                                                <?foreach($arSystemLangs as $code => $lang){
                                                                    if($code == $arParams["LANGUAGE_ID"])
                                                                        continue;
                                                                    ?>
                                                                    <option <?=$langSaved == $code ? " selected ":""?>  value="<?=$code?>" class="<?=$code?>"><?=$lang.' ('.strtoupper($code).')'?></option>
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
                                                                <option value=""><?=GetMessage("LC_T_TYPE_GROUP_NONE")?></option>
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
                                                <input <?=$lcTempSettings["isNeedLangSwitcher"][$siteID] == "off"?'':' checked="checked" '?> name="isNeedLangSwitcher[<?=$siteID?>]" type="checkbox" class="adm-checkbox adm-designed-checkbox lang-switcher-checkbox" id="switcher-<?=$siteID?>-inactive">
                                                <label class="adm-designed-checkbox-label adm-checkbox" for="switcher-<?=$siteID?>-inactive"></label>
                                            </td>
                                        </tr>
                                        <?
                                    }
                                    ?>
                                </tbody>
                            </table>
                        </div>
                        <div class="adm-list-table-footer">
                            <div class="table-footer-link">
                                <a href="/bitrix/admin/site_admin.php" target="_blank"><?=GetMessage("LC_LINK_TO_SITE_MANAGEMENT")?></a>
                            </div>
                        </div>
                    </div>
                    <?if(count($lcTempSettings['recomendations']) > 0){
                        ?>
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
                        <!---new end--->
                        <?=bitrix_sessid_post()?>
                        <input type="hidden" name="lang" value="<?=LANGUAGE_ID?>">
                        <input type="hidden" name="id" value="accorsys.localization">
                        <input type="hidden" name="install" value="Y">
                        <input type="hidden" class="step" name="step" value="4">
                        <input type="hidden" class="siteStep" value="<?=$siteStep?>">
                        <div class="inputs-additional-langs-changer">
                            <?
                            if(isset($lcTempSettings['arAdditionalLangsChanger'])){
                                foreach($lcTempSettings['arAdditionalLangsChanger'] as $langID){
                                    ?>
                                    <input type="hidden" name="arAdditionalLangsChanger[<?=$langID?>]" value="<?=$langID?>">
                                    <?
                                }
                            }
                            ?>
                        </div>
                <div class="buttons">
                    <div class="button inline_block">
                        <input type="button" name="noinst" class="backForm" value="<?='&#706;&nbsp;&nbsp;&nbsp;&nbsp;'.GetMessage("LC_BACK")?>" />
                    </div>
                    <div class="button inline_block">
                        <input type="submit" name="inst" value="<?=GetMessage('LC_INSTALL_MESS_NEXT').'&nbsp;&nbsp;&nbsp;&nbsp;&#707;'?>" />
                        <div class="preload inline_block">
                            <div class="preloader" style="display:none;"></div>
                        </div>
                    </div>
                </div>
            </form>
    </div>
    <style>
        .table-lang-wrap {
            white-space: nowrap;
        }
        .adm-workarea a.adm-btn, .adm-workarea span.adm-btn.switch-button {
            height:23px;
            margin-bottom:20px;
            line-height: 22px;
        }
        .adm-workarea a.adm-btn:active, .adm-workarea span.adm-btn.switch-button:active {
            height:23px!important;
            margin-bottom:20px!important;
            line-height: 22px!important;
        }
        #formstep3 .site-block .adm-detail-title {
            font-size: 16px;
        }

        /*---------------------*/
        .table-borders {
            min-width: 885px;
        }
        .adm-list-table-header .adm-list-table-cell{
            padding-top: 0px;
        }
        .adm-list-table-cell {
            padding-top: 29px;
            vertical-align: top;
        }
        .adm-list-table-cell.langs-cell {
            padding-top: 11px;
        }
        .table-cell-wrap {
            margin-right: 16px;
        }
        /*.adm-list-table-cell-inner.center {
            text-align: center;
        }*/
        .select-language {
            display: inline-block;
            position: relative;
            width:220px;
        }
        .modul_info-item {
            bottom: 33px;
            display: inline-block;
            left: 377px;
            margin: 0;
            position: relative;
        }
        .select-language-wrap {
            display: inline-block;
            margin: 10px 10px 5px 0;
        }

        .lang-lable-disabled {
            color: #636c6e;
        }

        .flag-container > span{
            margin-left: -43px;
            width: 16px;
            height: 11px;
            vertical-align: middle;
            float:inherit;
            margin-top: -2px;
        }

        .flag-container-default-lang > span {
            margin-left: -22px;
            width: 16px;
            height: 11px;
            vertical-align: middle;
            float:inherit;
            margin-top: -2px;
            margin-right: 5px;
        }

        .flag.english {
            background: url("../images/accorsys.localization/flags.png") 16px 0 ;
        }
        .flag.french {
            background: url("../images/accorsys.localization/flags.png") 32px 0 ;
        }
        .flag.azerbaijani {
            background: url("../images/accorsys.localization/flags.png") 48px 0 ;
        }
        .addlang {
            margin: 15px 0 30px;
        }
        .addlang-title {
            color: #000;
            font-size: 18px;
            margin: 12px 0;

            padding: 0px 0px 0px;

        }
        .addlang-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .addlang-container-active, .addlang-container-inactive {
            width: calc((100% - 80px) / 2);
        }
        .container-active-title, .container-inactive-title {
            color: #000;
            font-size: 16px;
            padding: 5px 0px 3px 6px;
            vertical-align: middle;
            padding-left: 16px;
        }
        .checkbox-wrap-top {
            vertical-align: middle;
           /* padding-left: 5px;*/
            padding-left: 19px;
        }
        .container-checkbox {
            height: 180px;
            overflow-y: auto;
            background: #fff;
        }
        .checkbox-wrap {
            /*padding: 10px 7px;*/
            padding: 10px 21px;
        }
        .checkbox-wrap:hover, .checkbox-wrap:nth-of-type(odd):hover {
            background: #E0E9EC;
        }
        .checkbox-wrap:nth-of-type(odd) {
            background: #F5F9F9;
        }
        .container-checkbox label {
            margin-left: 6px;
            /*padding-left: 46px;*/
            padding-left: 60px;
            padding-top 1px;
            position: relative;
            white-space: nowrap;
        }
        label:before {
            content: "";
            position: absolute;
            display: block;
            top: 2px;
            left: 26px;
            width: 16px;
            height: 11px;
        }
        .checkbox-wrap .flag {
            position: relative;
            right: 41px;
            bottom: 1px;
            vertical-align: middle;
        }

        .container-checkbox input {
            margin: 6px 3px;
        }
        .addlang-container-switch {
            display: inline-block;
            margin: 0 5px;
            vertical-align: middle;
        }
        .switch-button {
            display: block !important;

            width: 30px;
            height: 30px;
            margin: 10px 0px;
            cursor: pointer;
        }

        .switch-button-add {
            position: relative;
        }
        .switch-button-add:after {
            content: "";
            position: absolute;
            top: 7px;
            left: 22px;
            display: block;
            width: 15px;
            height: 15px;
            background: url("/bitrix/panel/main/images/bx-admin-sprite-small-1.png")no-repeat center -303px;
        }
        .switch-button-withdraw {
            position: relative;
        }

        .switch-button-withdraw:after {
            content: "";
            position: absolute;
            top: 7px;
            left: 22px;
            display: block;
            width: 15px;
            height: 15px;
            background: url("/bitrix/panel/main/images/bx-admin-sprite-small-1.png")no-repeat center -324px;
        }

        .addlang-container .switch-button.switch-button-add.adm-btn.disabled {
            background-image: none !important;
            border: 1px solid #ccc;
            box-shadow: none;
        }
        .addlang-container .switch-button.switch-button-add.adm-btn.disabled:hover {
            background-image: none !important;
            background: #e0e9ec!important;
            border: 1px solid #ccc;
            box-shadow: none;
            cursor:default;
        }
        .addlang-container .switch-button.switch-button-add.adm-btn.disabled:active {
            background-image: none !important;
            border: 1px solid #ccc;
            box-shadow: none;
        }
        .addlang-container .switch-button.switch-button-withdraw.adm-btn.disabled {
            background-image: none !important;
            border: 1px solid #ccc;
            box-shadow: none;
        }
        .addlang-container .switch-button.switch-button-withdraw.adm-btn.disabled:hover {
            background-image: none !important;
            background: #e0e9ec!important;
            border: 1px solid #ccc;
            box-shadow: none;
            cursor:default;
        }
        .addlang-container .switch-button.switch-button-withdraw.adm-btn.disabled:active {
            background-image: none !important;
            border: 1px solid #ccc;
            box-shadow: none;
        }
        .table-footer-link {
            display: inline-block;
            position: relative;
            top: 8px;
            left: 16px;
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
        .default_language {
            vertical-align: middle;
        }
        /*------------------------*/

        .inline_block {
            display: inline-block;
        }
        .center {
            text-align: center;
        }
        .select-wrap {
            float: left;
            margin-bottom: 5px;
            /*margin-left: 30px;*/
            margin-top: 5px;
            margin-right: 20px;
            margin-left: 20px;
        }
        .table-lang-wrap {
            margin-left: 20px;
        }
        #formstep .adm-list-table-row:hover .adm-list-table-cell {
            position:initial;
        }
    </style>
</div>