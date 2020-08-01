<div class="adm-detail-title"><?=GetMessage("LC_GROUP_RIGHTS")?></div>
<div class="adm-detail-content-item-block group-access">
<?
$rsGroups = CGroup::GetList($by = "c_sort", $order = "asc", array());
if(intval($rsGroups->SelectedRowsCount()) > 0)
{
    while($arGroup = $rsGroups->Fetch())
    {
        $arGroups[$arGroup["ID"]] = $arGroup;
    }
}

$lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));

$isMultilangSite = false;
foreach($lcTempSettings['accorsysSiteLang'] as $siteID => $langs){
    if(count($langs) > 1){
        $isMultilangSite = true;
        break;
    }
}
unset($lcTempSettings['recomendations'][4]);
if($isMultilangSite === true){
    $lcTempSettings['recomendations'][4]['multiLangs'] = GetMessage("LC_LINK_TO_CONSTANT_MANAGEMENT");
}
file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini", serialize($lcTempSettings));

$lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
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
<div class="adm-detail-block">
<div class="users-block-settings">

</div>
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
                        <?=GetMessage("LC_CHANGE_CONTROL")?>
                        <a class="adm-input-help-icon-locale" target="_blank" href="<?=GetMessage('LC_ALERT_CHANGE_CONTROL_EXPLAINED_URL')?>" title="<?=GetMessage('LC_CONTROL_CHANGES')?>"></a>
                    </div>
                </td>
                <td class="adm-list-table-cell">
                    <div class="adm-list-table-cell-inner left"><?=GetMessage("LC_INTERFACE_LANGUAGE")?></div>
                </td>
                <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner left"><?=GetMessage("LC_USERS_COUNT")?></div></td>
            </tr>
            </thead>
            <tbody>
            <?
            if(count($lcTempSettings['arGroupValues']) > 0){
                foreach($lcTempSettings['arGroupValues'] as $groupID => $value){
                    ?>
                    <tr class="adm-list-table-row">
                        <td class="adm-list-table-cell">
                            <div class="select-group-wrap">
                                <select class="select-group used" name="arGroupValues[<?=$groupID?>]">
                                    <option value="delete">(<?=GetMessage("LC_NO")?>)</option>
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
                                    <option value="curLang"><?=GetMessage("LC_INTERFACE_LANGUAGE_VARIABLE")?></option>
                                    <?
                                    foreach($arLangsForInterface as $idLang => $nameLang){
                                        ?>
                                        <option <?=$lcTempSettings['defaultIntefaceLanguage'][$groupID] == $idLang ? ' selected ':""?> value="<?=$idLang?>"><?=$nameLang.' ('.strtoupper($idLang).')'?></option>
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
                                <a class="user-count-show" target="_blank" href="/bitrix/admin/user_admin.php?lang=ru&find_group_id[]=1&set_filter=Y"><?=$countUsers?></a>
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
                                <option value="delete">(<?=GetMessage("LC_NO")?>)</option>
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
                            <input name="arGroupValues[1][isDocs]" id="arGroupValues1" type="checkbox" title="<?=GetMessage("LC_CHECK_UNCHECK")?>" class="adm-checkbox adm-designed-checkbox">
                            <label for="arGroupValues1" class="adm-designed-checkbox-label adm-checkbox consent-adm-checkbox"></label>
                        </div>
                    </td>
                    <td class="adm-list-table-cell user-interface-lang">
                        <div class="select-wrap">
                                                       <span style="float:left;" class="flag-container-default-lang">
                                                           <span class="ico-flag-<?=isset($lcTempSettings['defaultIntefaceLanguage'][$groupID]) ? strtoupper($lcTempSettings['defaultIntefaceLanguage'][$groupID]):"curLang"?>" style="margin-top:7px;"></span>
                                                       </span>
                            <select name="defaultIntefaceLanguage[1]">
                                <option value="curLang"><?=GetMessage("LC_INTERFACE_LANGUAGE_VARIABLE")?></option>
                                <?
                                foreach($arLangsForInterface as $idLang => $nameLang){
                                    ?>
                                    <option <?=$lcTempSettings['defaultIntefaceLanguage'][1] == $idLang ? ' selected ':""?> value="<?=$idLang?>"><?=$nameLang.' ('.strtoupper($idLang).')'?></option>
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
                            <a class="user-count-show" target="_blank" href="/bitrix/admin/user_admin.php?lang=ru&find_group_id[]=1&set_filter=Y"><?=$countUsers?></a>
                        </div>
                    </td>
                </tr>
            <?}?>
            <tr class="adm-list-table-row">
                <td class="adm-list-table-cell">
                    <div class="select-group-wrap">
                        <select class="select-group default-select">
                            <option value="default">(<?=GetMessage("LC_NO")?>)</option>
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
            <a href="/bitrix/admin/group_admin.php" target="_blank"><?=getMessage('LC_LINK_TO_USER_GROUP_MANAGEMENT')?></a>
        </div>
    </div>
</div>
<div style="display:none" class="tempGroups">
    <table>
        <?foreach($arGroups as $grid => $arGroup){
            $countUsers = count(CGroup::GetGroupUser($grid));
            ?>
            <tr class="adm-list-table-row locale-group-tr-id-<?=$grid?>">
                <td class="adm-list-table-cell">
                    <div class="select-group-wrap">
                        <select class="select-group" name="arGroupValues[<?=$grid?>]">
                            <option value="delete">(<?=GetMessage("LC_NO")?>)</option>
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
                        <input name="arGroupValues[<?=$grid?>][isDocs]" id="arGroupValues<?=$grid?>" type="checkbox" title="<?=GetMessage("LC_CHECK_UNCHECK")?>" class="adm-checkbox adm-designed-checkbox">
                        <label for="arGroupValues<?=$grid?>" class="adm-designed-checkbox-label adm-checkbox consent-adm-checkbox"></label>
                    </div>
                </td>
                <td class="adm-list-table-cell user-interface-lang">
                    <div class="select-wrap">
                                                   <span style="float:left;" class="flag-container-default-lang">
                                                       <span class="ico-flag-<?=strtoupper(LANGUAGE_ID)?>" style="margin-top:7px;"></span>
                                                   </span>
                        <select name="defaultIntefaceLanguage[<?=$grid?>]">
                            <option value="curLang"><?=GetMessage("LC_INTERFACE_LANGUAGE_VARIABLE")?></option>
                            <?
                            foreach($arLangsForInterface as $idLang => $nameLang){
                                ?>
                                <option <?=$idLang == LANGUAGE_ID ? ' selected ':''?> value="<?=$idLang?>"><?=$nameLang.' ('.strtoupper($idLang).')'?></option>
                            <?
                            }
                            ?>
                        </select>
                    </div>
                </td>
                <td class="adm-list-table-cell count-users">
                    <div class="table-cell-wrap center">
                        <a class="user-count-show" target="_blank" href="/bitrix/admin/user_admin.php?lang=ru&find_group_id[]=<?=$grid?>&set_filter=Y"><?=$countUsers?></a>
                    </div>
                </td>
            </tr>
        <?}?>
    </table>
</div>
</div>
</div>