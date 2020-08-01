<?if(!check_bitrix_sessid()) return;?>
<?php
CJSCore::Init(array("jquery"));

$multiLangSite = array();
$stepPlus = 0;
if(isset($_REQUEST['plusInstall']))
    $stepPlus = (int)$_REQUEST['plusInstall'];

$siteCount = 0;
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
$arLangsFile = $arAccorsysLocaleLangs;

$dbSites = CSite::GetList($by = "id", $order = "asc");
while($arSite = $dbSites->fetch()){
    $arSites[$arSite["LID"]] = $arSite;
}

$rsGroups = CGroup::GetList($by = "c_sort", $order = "asc", array());
$siteStep = 5;
if(intval($rsGroups->SelectedRowsCount()) > 0)
{
    while($arGroup = $rsGroups->Fetch())
    {
        $arGroups[$arGroup["ID"]] = $arGroup;
    }
}

$lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini"));
if(isset($_REQUEST['arGroupValues']))
    $lcTempSettings['arGroupValues'] = $_REQUEST['arGroupValues'];
$countUsers = 0;
$arCountUsers = array();
foreach($lcTempSettings['arGroupValues'] as $groupID => $isDoc){
    foreach(CGroup::GetGroupUser($groupID) as $user){
        $arCountUsers[$user] = $user;
    }
}
$countUsers = count($arCountUsers);
if($countUsers > 1){
    $lcTempSettings['recomendations'][5]['needMoreUserLisence'] = str_replace("#USER_COUNT#","<span>".$countUsers."</span>",GetMessage("LC_GROUP_USERS_COUNT"));
}else{
    unset($lcTempSettings['recomendations'][5]);
}
if(is_array($_REQUEST['defaultIntefaceLanguage']))
    $lcTempSettings['defaultIntefaceLanguage'] = $_REQUEST['defaultIntefaceLanguage'];
file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini", serialize($lcTempSettings));

?>
<div id="installContent">
    <?
    ?>
    <div class="adm-detail-block">
        <form id="formstep" method="post" action="<?=$APPLICATION->GetCurPage()?>" name="form1" enctype="multipart/form-data">
            <div class="adm-detail-title"><?=GetMessage("LC_INSTALL_STEP_TITLE_SUMMARY")?></div>

            <!--new start -->

            <div class="settings">
                <div class="settings-item">
                    <div class="settings-item-title"><?=GetMessage("LC_LANGUAGE_SETTINGS")?></div>
                    <div class="settings-item-value">
                        <table>
                            <?foreach($lcTempSettings["accorsysSiteLang"] as $siteID => $langs){
                                $arSiteParams = CSite::GetByID($siteID)->Fetch();
                                ?>
                                <tr>
                                    <td class="group-name" style="vertical-align: top;padding-top: 9px;">
                                        <?=$siteID.' - '.$arSites[$siteID]["NAME"].": "?>
                                    </td>

                                    <td class="gruop-access">
                                        <div style="float:left;">
                                            <?
                                            $curSiteLangs = array();
                                            foreach($langs as $lang){
                                                $curSiteLangs[$lang] = $arLangsFile[$lang];
                                            }
                                            asort($curSiteLangs);
                                            foreach($curSiteLangs as $code => $name){
                                                if(trim($code) == "")
                                                    continue;
                                                if($arSiteParams['LANGUAGE_ID'] == $code){
                                                    ?>
                                                    <div class="lang-container" style="float: left;padding:5px;min-width: 90px;">
                                                        <span class="flag-container-default-lang">
                                                            <span class="ico-flag-<?=strtoupper($arSiteParams["LANGUAGE_ID"])?>"></span>
                                                        </span>
                                                        &nbsp;
                                                        <span class="default_language">
                                                            <b>
                                                                <?=$arLangsFile[$arSiteParams["LANGUAGE_ID"]].' ('.strtoupper($arSiteParams["LANGUAGE_ID"]).') - '.GetMessage("LC_BY_DEFAULT")?>
                                                            </b>
                                                        </span>
                                                    </div>
                                                <?
                                                }else{
                                                    ?>
                                                    <div class="lang-container" style="float: left;padding:5px;min-width: 90px;">
                                                    <span class="flag-container-default-lang">
                                                        <span class="ico-flag-<?=strtoupper($code)?>"></span>
                                                    </span>
                                                        &nbsp;
                                                        <span class="default_language"><?=$arLangsFile[$code].' ('.strtoupper($code).')'?></span>
                                                    </div>
                                                    <?
                                                }
                                            }?>
                                        </div>
                                    </td>
                                </tr>
                            <?}?>
                        </table>
                    </div>
                </div>
                <div class="settings-item">
                    <div class="settings-item-title"><?=GetMessage("LC_ACCESS_SETTINGS")?></div>
                    <div class="settings-item-value">
                        <table class="groups-table">
                           <?foreach($lcTempSettings['arGroupValues'] as $groupID => $isDoc){?>
                               <tr>
                                   <td class="group-name"><?=$arGroups[$groupID]["NAME"].':'?></td>
                                   <td class="gruop-access">
                                       <div class="interface-langs">
                                           <div style="float:left;">
                                                <?=GetMessage('LC_INTERFACE_LANGUAGE').'&nbsp;&nbsp;- '?>
                                           </div>
                                           <?if($lcTempSettings['defaultIntefaceLanguage'][$groupID] == 'curLang'){?>
                                                <?='&nbsp;&nbsp;'.GetMessage('LC_INTERFACE_LANGUAGE_VARIABLE')?>
                                           <?}else{?>
                                               <div class="lang-container" style="float: left;margin-left: 3px;margin-top: -4px;min-width: 90px;padding: 5px;">
                                                   <span class="flag-container-default-lang">
                                                       <span class="ico-flag-<?=strtoupper($lcTempSettings['defaultIntefaceLanguage'][$groupID])?>"></span>
                                                   </span>
                                                   &nbsp;
                                                   <span class="default_language"><?=$arLangsFile[$lcTempSettings['defaultIntefaceLanguage'][$groupID]].' ('.strtoupper($lcTempSettings['defaultIntefaceLanguage'][$groupID]).')'?></span>
                                               </div>
                                           <?}?>
                                       </div>
                                       <div class="spacer"><!-- --></div>
                                       <?=(is_array($isDoc) ? GetMessage("LC_EDITING_CHANGE_CONTROL"):GetMessage("LC_EDIT_IN_REAL_TIME"))?>
                                       <?=is_array($isDoc) ? '<a target="_blank" class="adm-input-help-icon-locale" href="'.GetMessage("LC_ALERT_CHANGE_CONTROL_EXPLAINED_URL").'" title="'.GetMessage("LC_CONTROL_CHANGES").'"></a>':''?>
                                   </td>
                               </tr>
                            <?}?>
                        </table>
                    </div>
                </div>

                <div class="settings-item additional-setting">
                    <div class="settings-item-title"><?=GetMessage("LC_ADDITIONAL_ACTIONS")?></div>
                    <div class="settings-item-value">
                        <table>
                            <tr>
                                <td class="group-name">
                                </td>
                                <td class="gruop-access">
                                    <input id="isNeedReindex" checked="true" name="isIndexFiles"  type="checkbox" title="<?=GetMessage("LC_CHECK_UNCHECK")?>" class="adm-checkbox adm-designed-checkbox">
                                    <label for="isNeedReindex" class="adm-designed-checkbox-label adm-checkbox"><?=GetMessage("LC_INDEX_TRANSLATION_FILES")?></label>
                                </td>
                            </tr>
                            <tr>
                                <td class="group-name">
                                </td>
                                <td class="gruop-access">
                                    <input id="isNeedAddToFav" checked="true" name="isNeedAddToFav"  type="checkbox" title="<?=GetMessage("LC_CHECK_UNCHECK")?>" class="adm-checkbox adm-designed-checkbox">
                                    <label for="isNeedAddToFav" class="adm-designed-checkbox-label adm-checkbox"><?=GetMessage("LC_INAPP_PURCHASES_ADD_TO_FAVORITES")?></label>
                                </td>
                            </tr>
                        </table>
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

            <!--new end -->

            <?=bitrix_sessid_post()?>
            <input type="hidden" name="lang" value="<?=LANGUAGE_ID?>">
            <input type="hidden" name="id" value="accorsys.localization">
            <input type="hidden" name="install" value="Y">
            <input type="hidden" name="step" value="finalStep">
            <input type="hidden" class="step" value="6">
            <input type="hidden" class="siteStep" value="<?=$siteStep?>">
            <input type="hidden" class="toLastStep" value="true">
            <div class="buttons">
                <div class="button inline_block">
                    <input type="button" name="noinst" class="backForm" value="<?='&#706;&nbsp;&nbsp;&nbsp;&nbsp;'.GetMessage("LC_BACK")?>" />
                </div>
                <div class="button inline_block">
                    <input type="submit" class="adm-btn-save" name="inst" value="<?=GetMessage("LC_START_INSTALL")?>" />
                    <div class="preload inline_block">
                        <div class="preloader" style="display:none;"></div>
                    </div>
                </div>
            </div>
        </form>
    </div>


    <style>
        .interface-langs {
            min-height: 23px;
        }
        .additional-setting .settings-item-value table td.gruop-access {
            padding-top:10px;
            padding-bottom:10px;
        }
        #bx-admin-prefix label[for="isNeedAddToFav"].adm-designed-checkbox-label {
            background-position: left -983px;
            margin-left: -40px;
            padding-left: 40px;
            width: auto;
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
        .lang-container {
            margin-right:10px;
        }
        .groups-table tr td {
            padding-bottom: 10px;
            padding-top: 4px;
        }
        .groups-table .group-name {
            vertical-align: top;
        }
        #bx-admin-prefix label[for="isNeedReindex"].adm-designed-checkbox-label {
            background-position: left -983px;
            margin-left: -40px;
            padding-left: 40px;
            width: auto;
        }
        #bx-admin-prefix .adm-designed-checkbox:checked + label[for="isNeedReindex"].adm-designed-checkbox-label {
            background-position: left -1006px;
        }
        .settings-item-value table {
            width: 100%;
        }
        .settings-item-value table td {
            width:35%;
        }
        .detail-block.requires .table-borders {
            border: 1px solid #ccc;
            float: left;
        }
        .detail-block.requires .ok-module {
            background: url("/bitrix/panel/main/images/bx-admin-sprite-small.png") no-repeat scroll 0 -2874px rgba(0, 0, 0, 0);
            width:18px;
            height:18px;
        }

        .detail-block.requires .fail-module {
            background: url("/bitrix/panel/main/images/bx-admin-sprite-small.png") no-repeat scroll 0 -2903px rgba(0, 0, 0, 0);
            width:18px;
            height:18px;
        }

        .detail-block.requires .img-loader {
            background: url("/bitrix/panel/main/images/waiter-white.gif") no-repeat scroll center center white;
            border-radius: 3px;
            height: 30px;
            margin-left: 455px;
            opacity: 0.5;
            position: absolute;
            width: 145px;
            z-index: 9999;
        }
        .detail-block {
            margin-bottom: 30px;
        }

        .detail-block.langs .lang-container {
            float:left;
            margin-right:30px;
        }

        .detail-block.langs .site-block {
            margin-bottom:40px;
        }

        .adm-detail-title.detail-lang {
            font-size: 14px;
        }

        /*---------------------------*/

        .settings {

        }
        .settings-item {
            margin: 16px 0;
        }
        .settings-item-title {
            padding: 0 16px;
            font-size: 14px;
            font-weight: bold;
            text-shadow: 0 1px #fff;
            height: 41px;
            line-height: 41px;
            border-top-right-radius: 4px;
            border-top-left-radius: 4px;
            border-bottom: 1px solid #E5E5E5;
            border-left: 1px solid #CFD8DA;
            border-right: 1px solid #CFD8DA;
            box-shadow: 0 -1px 0 #a9a9a9 inset, 0 1px 0 #fff inset, 0 -2px 0 rgba(255, 255, 255, 0.3) inset;
            color: #3f4b54;
            background: #E2EBED;
        }
        .settings-item-value {
            padding: 14px 16px 14px;
            border-right: 1px solid #CFD8DA;
            border-left: 1px solid #CFD8DA;
            border-bottom: 1px solid #CFD8DA;
            color: #3f4b54;
            background: #FAFCFC;
            text-align: center;
        }
        .group-name {
            padding: 5px 0px;
            text-align: right;
            width: auto;
            vertical-align: middle;
        }
        .settings-item-value table td.gruop-access {
            padding: 5px 0 5px 20px;
            text-align: left;
            vertical-align: middle;
            width:65%;
        }

        .settings-item-value table.groups-table td.gruop-access {
            padding: 5px 0 16px 20px;
        }

        .settings-item-value table.groups-table tr:last-of-type td.gruop-access {
            padding: 5px 0 9px 20px;
        }

        .options {
            /*margin: 16px 0 0;*/
        }
        .options-list {
            /*margin-top: 30px;*/
        }
        .options-list ul {
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .options-list-item {
            margin-top:7px;
            margin-bottom:11px;
        }
        .options-list-item label {
            min-width: 320px !important;
            padding: 0 25px;
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

        .flag-container-default-lang > span {
            margin-top: -2px;
        }

        .flag-container-default-lang {
            display: inline-block;
            vertical-align: middle;
            margin-right: -4px;
        }

        .default_language {
            display: inline-block;
            vertical-align: middle;
        }

        /*----------------------------*/

        .inline_block {
            display: inline-block;
        }
        .right {
            text-align: right;
        }
        .left {
            text-align: left;
        }
        #installContent .adm-workarea input.adm-btn-green:active, .adm-workarea input.adm-btn-save:active {
            padding: 0 25px !important;
        }

    </style>

</div>