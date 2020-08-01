<?if(!check_bitrix_sessid()) return;?>
<?php
CopyDirFiles($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/images", $_SERVER["DOCUMENT_ROOT"]."/bitrix/images", false, true);
IncludeModuleLangFile(__FILE__);
CJSCore::Init(array("jquery"));

$rsGroups = CGroup::GetList($by = "c_sort", $order = "asc", array());

if(intval($rsGroups->SelectedRowsCount()) > 0)
{
    while($arGroup = $rsGroups->Fetch())
    {
        $arGroups[$arGroup["ID"]] = $arGroup;
    }
}
$stepPlus = 0;
if(isset($_REQUEST['plusInstall']))
    $stepPlus = (int)$_REQUEST['plusInstall'];

$lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini"));
if(isset($_REQUEST['accorsysSiteLang'])){
    foreach($_REQUEST['accorsysSiteLang'] as $siteID => $arLangs){
        foreach($arLangs as $lang){
            $arTempLangsSite[$siteID][$lang] = $lang;
        }
    }
    $lcTempSettings['accorsysSiteLang'] = $arTempLangsSite;
}

$isMultilangSite = false;
foreach($lcTempSettings['accorsysSiteLang'] as $siteID => $langs){
    if(count($langs) > 2){
        $isMultilangSite = true;
        break;
    }
}

$dbSites = CSite::GetList($by = "sort", $order = "asc");
while($arSite = $dbSites->fetch()){
    $arSites[$arSite["LID"]] = $arSite;
}
foreach($arSites as $siteLID => $site){
    $lcTempSettings['isNeedLangSwitcher'][$siteLID] = (isset($_REQUEST['isNeedLangSwitcher'][$siteLID]) || $lcTempSettings['isNeedLangSwitcher'][$siteLID] == 'on') ? "on":"off";
}

unset($lcTempSettings['recomendations'][4]);
if($isMultilangSite === true){
    $lcTempSettings['recomendations'][4]['multiLangs'] = GetMessage("LC_LINK_TO_CONSTANT_MANAGEMENT");
}

if(isset($_REQUEST['arAdditionalLangsChanger'])){
    $lcTempSettings["arAdditionalLangsChanger"] = $_REQUEST['arAdditionalLangsChanger'];
}

file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini", serialize($lcTempSettings));

$siteStep = 4;
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
$lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini"));
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs_title.php');
$arLangsTitle = $arAccorsysLocaleLangsTitle;
$arLangs = $arAccorsysLocaleLangs;
$arLangsForInterface = array();
$moduleLangDir = opendir($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/lang/');
while(($langDir=readdir($moduleLangDir)) !== false){
    $arAccorsysInterfaceLangs[$langDir] = $langDir;
}
foreach($arAccorsysInterfaceLangs as $lang){
    if(isset($arAccorsysLocaleLangs[$lang]))
        $arLangsForInterface[$lang] = $arAccorsysLocaleLangs[$lang];
}
asort($arLangsForInterface);
?>
<div id="installContent">
    <div class="adm-detail-block group-access">
        <form id="formstep" method="post" action="<?=$APPLICATION->GetCurPage()?>" name="form1" enctype="multipart/form-data">
                <div class="adm-detail-title"><?=GetMessage("LC_INSTALL_STEP_TITLE_ACCESS")?></div>
                <div class="adm-list-table-wrap">
                    <div class="adm-list-table-top">
                        <div class="adm-small-button adm-table-refresh refreshform" title="<?=GetMessage("LC_REFRESH")?>"></div>
                    </div>
                    <div class="table-borders">
                        <table class="adm-list-table data-group">
                            <thead>
                                <tr class="adm-list-table-header">
                                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner left"><?=GetMessage("LC_USER_GROUP")?></div></td>
                                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner left"><?=GetMessage("LC_GROUPS_ID")?></div></td>
                                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner left"><?=GetMessage("LC_CHANGE_DATE")?></div></td>
                                    <td class="adm-list-table-cell only-in-workflow">
                                        <div class="adm-list-table-cell-inner left">
                                            <span><?=GetMessage("LC_CHANGE_CONTROL")?></span>
                                            <a target="_blank" class="adm-input-help-icon-locale" href="<?=GetMessage("LC_ALERT_CHANGE_CONTROL_EXPLAINED_URL")?>" title="<?=GetMessage('LC_CONTROL_CHANGES')?>"></a>
                                        </div>
                                    </td>
                                    <td class="adm-list-table-cell">
                                        <div class="adm-list-table-cell-inner left"><?=GetMessage("LC_INTERFACE_LANGUAGE")?></div>
                                    </td>
                                    <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner left"><?=GetMessage("LC_USERS_COUNT")?></div></td>
                                </tr>
                            </thead>
                            <tbody>
                            <?if(count($lcTempSettings['arGroupValues']) > 0){
                                foreach($lcTempSettings['arGroupValues'] as $groupID => $value){
                                    ?>
                                    <tr class="adm-list-table-row">
                                        <td class="adm-list-table-cell">
                                            <div class="select-group-wrap">
                                                <select class="select-group used" name="arGroupValues[<?=$groupID?>]">
                                                    <option value="delete">(<?=GetMessage("LC_NO")?></option>
                                                    <?foreach($arGroups as $idgr => $arGroup){?>
                                                        <option <?=$groupID == $idgr ? " selected ":""?> value="<?=$idgr?>"><?=$arGroup["NAME"]?></option>
                                                    <?}?>
                                                </select>
                                            </div>
                                        </td>
                                        <td class="adm-list-table-cell">
                                            <div class="table-cell-wrap center"><a target="_blank" href="/bitrix/admin/group_edit.php?lang=ru&ID=1"><?=$groupID?></a></div>
                                        </td>
                                        <td class="adm-list-table-cell">
                                            <div class="table-cell-wrap center"><?=$arGroups[$groupID]["TIMESTAMP_X"]?></div>
                                        </td>
                                        <td class="adm-list-table-cell">
                                            <div class="table-cell-wrap center">
                                                <input <?=is_array($value) ? ' checked="true"':''?> name="arGroupValues[<?=$groupID?>][isDocs]" id="arGroupValues<?=$groupID?>" type="checkbox" title="<?=GetMessage("LC_CHECK_UNCHECK")?>" class="adm-checkbox adm-designed-checkbox">
                                                <label for="arGroupValues<?=$groupID?>" class="adm-designed-checkbox-label adm-checkbox consent-adm-checkbox"></label>
                                            </div>
                                        </td>
                                        <td class="adm-list-table-cell user-interface-lang">
                                            <div class="select-wrap">
                                                <span style="float:left;" class="flag-container-default-lang">
                                                   <span class="ico-flag-<?=isset($lcTempSettings['defaultIntefaceLanguage'][$groupID]) ? strtoupper($lcTempSettings['defaultIntefaceLanguage'][$groupID]):"curLang"?>" style="margin-top:7px;"></span>
                                                </span>
                                                <select name="defaultIntefaceLanguage[<?=$groupID?>]">
                                                    <option <?$lcTempSettings['defaultIntefaceLanguage'][$groupID] == 'curLang' ? ' selected="true" ':''?> value="curLang"><?=GetMessage("LC_INTERFACE_LANGUAGE_VARIABLE")?></option>
                                                    <?
                                                    foreach($arLangsForInterface as $idLang => $nameLang){
                                                        if(!$wasSelected && isset($lcTempSettings['defaultIntefaceLanguage'][$groupID])){
                                                            $wasSelected = true;
                                                        }
                                                        $selectedText = ($lcTempSettings['defaultIntefaceLanguage'][$groupID] == $idLang ? true:(LANGUAGE_ID == $idLang && $idLang != 'curLang' && !$wasSelected)) ? ' selected="true" ':"";
                                                        ?>
                                                        <option <?=$selectedText?> value="<?=$idLang?>"><?=$arAccorsysLocaleLangs[$idLang].' ('.strtoupper($idLang).')'?></option>
                                                    <?
                                                    }
                                                    ?>
                                                </select>
                                            </div>
                                        </td>
                                        <td class="adm-list-table-cell count-users">
                                            <div class="table-cell-wrap center">
                                                <?
                                                $countUsers = count(CGroup::GetGroupUser($groupID));
                                                ?>
                                                <a target="_blank" href="/bitrix/admin/user_admin.php?lang=ru&find_group_id[]=1&set_filter=Y"><?=$countUsers?></a>
                                            </div>
                                        </td>
                                    </tr>
                                    <?
                                }
                            }else{?>
                                <tr class="adm-list-table-row">
                                    <td class="adm-list-table-cell">
                                        <div class="select-group-wrap">
                                            <select class="select-group used" name="arGroupValues[1]">
                                                <option value="delete">(<?=GetMEssage("LC_NO")?>)</option>
                                                <?foreach($arGroups as $idgr => $arGroup){?>
                                                    <option <?=$idgr ==  1 ? " selected ":""?> value="<?=$idgr?>"><?=$arGroup["NAME"]?></option>
                                                <?}?>
                                            </select>
                                        </div>
                                    </td>
                                    <td class="adm-list-table-cell ">
                                        <div class="table-cell-wrap center">
                                            <a target="_blank" href="/bitrix/admin/group_edit.php?lang=ru&ID=1">1</a>
                                        </div>
                                    </td>
                                    <td class="adm-list-table-cell">
                                        <div class="table-cell-wrap center"><?=$arGroups[1]["TIMESTAMP_X"]?></div>
                                    </td>
                                    <td class="adm-list-table-cell">
                                        <div class="table-cell-wrap center">
                                            <input name="arGroupValues[1][isDocs]" id="arGroupValues1" type="checkbox" title="<?=GetMEssage("LC_CHECK_UNCHECK")?>" class="adm-checkbox adm-designed-checkbox">
                                            <label for="arGroupValues1" class="adm-designed-checkbox-label adm-checkbox consent-adm-checkbox"></label>
                                        </div>
                                    </td>
                                    <td class="adm-list-table-cell user-interface-lang">
                                        <div class="select-wrap">
                                            <span style="float:left;" class="flag-container-default-lang">
                                               <span class="ico-flag-<?=isset($lcTempSettings['defaultIntefaceLanguage'][1]) ? strtoupper($lcTempSettings['defaultIntefaceLanguage'][1]):"curLang"?>" style="margin-top:7px;"></span>
                                            </span>
                                            <select name="defaultIntefaceLanguage[<?=1?>]">
                                                <option <?$lcTempSettings['defaultIntefaceLanguage'][1] == 'curLang' ? ' selected="true" ':''?> value="curLang"><?=GetMessage("LC_INTERFACE_LANGUAGE_VARIABLE")?></option>
                                                <?
                                                foreach($arLangsForInterface as $idLang => $nameLang){
                                                    if(!$wasSelected && isset($lcTempSettings['defaultIntefaceLanguage'][1])){
                                                        $wasSelected = true;
                                                    }
                                                    $selectedText = ($lcTempSettings['defaultIntefaceLanguage'][1] == $idLang ? true:(LANGUAGE_ID == $idLang && $idLang != 'curLang' && !$wasSelected)) ? ' selected="true" ':"";
                                                    ?>
                                                    <option <?=$selectedText?> value="<?=$idLang?>"><?=$arAccorsysLocaleLangs[$idLang].' ('.strtoupper($idLang).')'?></option>
                                                <?
                                                }
                                                ?>
                                            </select>
                                        </div>
                                    </td>
                                    <td class="adm-list-table-cell count-users">
                                        <div class="table-cell-wrap center">
                                            <?
                                            $countUsers = count(CGroup::GetGroupUser(1));
                                            ?>
                                            <a target="_blank" href="/bitrix/admin/user_admin.php?lang=ru&find_group_id[]=1&set_filter=Y"><?=$countUsers?></a>
                                        </div>
                                    </td>
                                </tr>
                            <?}?>
                            <tr class="adm-list-table-row">
                                <td class="adm-list-table-cell">
                                    <div class="select-group-wrap">
                                        <select class="select-group default-select">
                                            <option value="default">(<?=GetMEssage("LC_NO")?>)</option>
                                            <?foreach($arGroups as $idgr => $arGroup){?>
                                                <option value="<?=$idgr?>"><?=$arGroup["NAME"]?></option>
                                            <?}?>
                                        </select>
                                    </div>
                                </td>
                                <td class="adm-list-table-cell">
                                    <div class="table-cell-wrap center">&ndash; &ndash;</div>
                                </td>
                                <td class="adm-list-table-cell">
                                    <div class="table-cell-wrap center">&ndash; &ndash;</div>
                                </td>
                                <td class="adm-list-table-cell">
                                    <div class="table-cell-wrap center">&ndash; &ndash;</div>
                                </td>
                                <td class="adm-list-table-cell">
                                    <div class="table-cell-wrap center">
                                        &ndash; &ndash;
                                    </div>
                                </td>
                                <td class="adm-list-table-cell">
                                    <div class="table-cell-wrap center">
                                        &ndash; &ndash;
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="adm-list-table-footer">
                        <div class="table-footer-link">
                            <a target="_blank" href="/bitrix/admin/group_admin.php"><?=GetMessage('LC_LINK_TO_USER_GROUP_MANAGEMENT')?></a>
                        </div>
                    </div>
                </div>
                <?
                $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini"));
                $countUsers = 0;
                $arCountUsers = array();
                foreach($lcTempSettings['arGroupValues'] as $groupID => $isDoc){
                    foreach(CGroup::GetGroupUser($groupID) as $user){
                        $arCountUsers[$user] = $user;
                    }
                }
                $countUsers = count($arCountUsers);
                if($countUsers == 0){
                    $countUsers = count(CGroup::GetGroupUser(1));
                }
                if($countUsers > 1){
                    $lcTempSettings['recomendations'][5]['needMoreUserLisence'] = str_replace("#USER_COUNT#","<span>".$countUsers."</span>",GetMessage("LC_GROUP_USERS_COUNT"));
                }else{
                    unset($lcTempSettings['recomendations'][5]);
                }
                file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini", serialize($lcTempSettings));

                if(count($lcTempSettings['recomendations']) > 0){?>
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

                    <?=bitrix_sessid_post()?>
                    <input type="hidden" name="lang" value="<?=LANGUAGE_ID?>">
                    <input type="hidden" name="id" value="accorsys.localization">
                    <input type="hidden" name="install" value="Y">
                    <input type="hidden" class="step" name="step" value="5">
                    <input type="hidden" class="siteStep" value="<?=$siteStep?>">

            <div class="buttons">
                <div class="button inline_block">
                    <input type="button" name="noinst" class="backForm" value="<?='&#706;&nbsp;&nbsp;&nbsp;&nbsp;'.GetMEssage("LC_BACK")?>" />
                </div>
                <div class="button inline_block">
                    <input type="submit" name="inst" value="<?=GetMessage('LC_INSTALL_MESS_NEXT').'&nbsp;&nbsp;&nbsp;&nbsp;&#707;'?>" />
                    <div class="preload inline_block">
                        <div class="preloader" style="display:none;"></div>
                    </div>
                </div>
            </div>
        </form>
        <?

        ?>
        <div style="display:none" class="tempGroups">
            <table>
            <?foreach($arGroups as $grid => $arGroup){
                $countUsers = count(CGroup::GetGroupUser($grid));
                ?>
                <tr class="adm-list-table-row locale-group-tr-id-<?=$grid?>">
                    <td class="adm-list-table-cell">
                        <div class="select-group-wrap">
                            <select class="select-group" name="arGroupValues[<?=$grid?>]">
                                <option value="delete">(<?=GetMEssage("LC_NO")?>)</option>
                                <?foreach($arGroups as $idgr => $group){?>
                                    <option <?=$idgr ==  $grid ? " selected ":""?> value="<?=$idgr?>"><?=$group["NAME"]?></option>
                                <?}?>
                            </select>
                        </div>
                    </td>
                    <td class="adm-list-table-cell">
                        <div class="table-cell-wrap center"><a target="_blank" href="/bitrix/admin/group_edit.php?lang=ru&ID=<?=$arGroup["ID"]?>"><?=$arGroup["ID"]?></a></div>
                    </td>
                    <td class="adm-list-table-cell">
                        <div class="table-cell-wrap center"><?=$arGroup["TIMESTAMP_X"]?></div>
                    </td>
                    <td class="adm-list-table-cell">
                        <div class="table-cell-wrap center">
                            <input name="arGroupValues[<?=$grid?>][isDocs]" id="arGroupValues<?=$grid?>" type="checkbox" title="<?=GetMEssage("LC_CHECK_UNCHECK")?>" class="adm-checkbox adm-designed-checkbox">
                            <label for="arGroupValues<?=$grid?>" class="adm-designed-checkbox-label adm-checkbox consent-adm-checkbox"></label>
                        </div>
                    </td>
                    <td class="adm-list-table-cell user-interface-lang">
                        <div class="select-wrap">
                            <span style="float:left;" class="flag-container-default-lang">
                               <span class="ico-flag-<?=isset($lcTempSettings['defaultIntefaceLanguage'][$grid]) ? strtoupper($lcTempSettings['defaultIntefaceLanguage'][$grid]):"curLang"?>" style="margin-top:7px;"></span>
                            </span>
                            <select name="defaultIntefaceLanguage[<?=$grid?>]">
                                <option <?$lcTempSettings['defaultIntefaceLanguage'][$grid] == 'curLang' ? ' selected="true" ':''?> value="curLang"><?=GetMessage("LC_INTERFACE_LANGUAGE_VARIABLE")?></option>
                                <?
                                foreach($arLangsForInterface as $idLang => $nameLang){
                                    if(!$wasSelected && isset($lcTempSettings['defaultIntefaceLanguage'][$grid])){
                                        $wasSelected = true;
                                    }
                                    $selectedText = ($lcTempSettings['defaultIntefaceLanguage'][$grid] == $idLang ? true:(LANGUAGE_ID == $idLang && $idLang != 'curLang' && !$wasSelected)) ? ' selected="true" ':"";
                                    ?>
                                    <option <?=($lcTempSettings['defaultIntefaceLanguage'][$grid] == $idLang ? true:(LANGUAGE_ID == $idLang && $idLang != 'curLang')) ? ' selected="true" ':""?> value="<?=$idLang?>"><?=$arAccorsysLocaleLangs[$idLang].' ('.strtoupper($idLang).')'?></option>
                                <?
                                }
                                ?>
                            </select>
                        </div>
                    </td>
                    <td class="adm-list-table-cell count-users">
                        <div class="table-cell-wrap center">
                            <a target="_blank" href="/bitrix/admin/user_admin.php?lang=ru&find_group_id[]=<?=$grid?>&set_filter=Y"><?=$countUsers?></a>
                        </div>
                    </td>
                </tr>
            <?}?>
            </table>
        </div>
    </div>
    <style>
        .select-wrap {
            float: left;
            margin-bottom: 5px;
            margin-top: 5px;
            margin-right: 20px;
            margin-left: 20px;
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
        .user-interface-lang select {
            width: 220px;
        }
        .user-interface-lang .ico-flag-curLang, .user-interface-lang .ico-flag-CURLANG {
            background:transparent!important;
            border:0px;
        }
        #formstep table td {
            padding-bottom: 20px;
            padding-top: 20px;
        }
        td.only-in-workflow {
            min-width: 220px;
        }
        .adm-input-help-icon-locale:hover {
            background-position: 4px -384px;
        }
        .adm-input-help-icon-locale {
            background: url("/bitrix/panel/main/images/bx-admin-sprite.png") no-repeat scroll 4px -414px rgba(0, 0, 0, 0);
            height: 30px;
            margin-left: 3px;
            margin-top: -4px;
            position: absolute;
            text-decoration: none;
            width: 30px;
        }
        #formstep .adm-list-table-row:hover .adm-list-table-cell {
            position:initial;
        }
        .modul_info-item {
            bottom: 33px;
            display: inline-block;
            left: 377px;
            margin: 0;
            position: relative;
        }
        .adm-list-table-cell {
            vertical-align: middle;
        }
        .adm-table-refresh {
            position: absolute;
            right: 8px;
            top: 9px;
        }
        .adm-table-refresh:before {
           /*background: url("../images/accorsys.localization/le_tb_icons.png") no-repeat 10px -10px;
            background-size: 0.1;*/
            content: "";
            height: 18px;
            left: 13px;
            position: absolute;
            top: 7px;
            width: 19px;
        }
        .adm-list-table-cell-inner.center {
            text-align: center;
        }
        .table-cell-wrap {
            margin-right: 16px;
        }
        .table-cell-wrap.right {
            text-align: right;
            /*padding-right: 65px;*/
        }
        .select-group {
            display: inline-block;
            position: relative;
            width: 375px;
        }
        .modul_info-item {
            bottom: 33px;
            display: inline-block;
            left: 377px;
            margin: 0;
            position: relative;
        }
        .select-group-wrap {
            display: inline-block;
            margin: 5px 10px 5px 0;
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

        /*------------------------------*/
        .inline_block {
            display: inline-block;
        }
        .table-cell-wrap.center {
            text-align: center;
        }

    </style>
</div>

