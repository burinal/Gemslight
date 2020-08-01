<div class="adm-detail-title"><?=GetMessage("LC_INDEXING_SETTINGS")?></div>
<div class="adm-detail-content-item-block indexes-params">
    <?
    $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
    include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
    include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs_title.php');
    $arLangsTitle = $arAccorsysLocaleLangsTitle;
    $arLangs = $arAccorsysLocaleLangs;
    $arLangsForIndexes = array();
    foreach($lcTempSettings['accorsysSiteLang'] as $indexSiteID => $arIndexLangs){
        foreach($arIndexLangs as $lang){
            if(trim($lang) != "")
                $arLangsForIndexes[$lang] = $arAccorsysLocaleLangs[$lang];
        }
    }
    asort($arLangsForIndexes);
    ?>
    <table style="border-spacing: 0;">
        <tr class="heading">
            <td colspan="2"><?=GetMessage('LC_OPTIONS_INDEX_LANGUAGES')?></td>
        </tr>
        <!--new start-->
        <?foreach($arLangsForIndexes as $indexLang => $nameLang){
            ?>
            <tr>
                <td colspan="2" class="adm-detail-content-cell-c" style="white-space: nowrap;padding: 10px 0;">
                    <input id="index_lang_<?=$indexLang?>" type="checkbox" <?=trim(COption::GetOptionString($module_id,'index_lang_'.$indexLang)) == "" ? "":' checked="checked" '?> value="Y" name="index_lang_<?=$indexLang?>" class="adm-checkbox adm-designed-checkbox additional-langs">
                    <label for="index_lang_<?=$indexLang?>" class="adm-designed-checkbox-label adm-checkbox" ><?=$arAccorsysLocaleLangs[$indexLang].' ('.strtoupper($indexLang).') - '.$arLangsTitle[$indexLang]?></label>
                    <span class="flag-container">
                        <span class="ico-flag-<?=strtoupper($indexLang)?>"></span>
                    </span>
                </td>
            </tr>
        <?
        }
        ?>
        <tr class="heading">
            <td colspan="2"><?=GetMessage('LC_OPTIONS_INDEX_INCLUDE')?></td>
        </tr>
        <?$count = 0;
        foreach($lcTempSettings['idexesIncludePath'] as $val){
            $count++;
            ?>
            <tr>
                <td width="50%" class="adm-detail-content-cell-l"><?=GetMessage("LC_PATH")?> <?=$count?></td>
                <td width="50%" class="adm-detail-content-cell-r"><input type="text" name="idexesIncludePath[]" value="<?=$val?>" maxlength="255" size="" style="width: 400px;"></td>
            </tr>
        <?
        }?>
        <tr>
            <td width="50%" class="adm-detail-content-cell-l"><?=GetMessage("LC_PATH")?> <?=++$count?></td>
            <td width="50%" class="adm-detail-content-cell-r"><input type="text" name="idexesIncludePath[]" value="" maxlength="255" size="" style="width: 400px;"></td>
        </tr>
        <tr class="before-tr">
            <td class="adm-detail-content-cell-l"></td>
            <td class="adm-detail-content-cell-r" style="text-align: left">
                <input align="left" id="LC_addIndexPath" type="button" value="<?=GetMessage("LC_ADD_ROW")?>">
            </td>
        </tr>
        <script>
            $(function(){
                var indexesTable = $('#LC_addIndexPath').parents('table:first');
                var indexInt = parseInt("<?=$count?>");
                indexesTable.find('input[type="text"]').css({
                    'width':'400px'
                });
                indexesTable.css({'width':'500px'});
                $('#LC_addIndexPath').click(function(){
                    var copyTR = indexesTable.find('input[name="idexesIncludePath[]"]:first').parents('tr:first').clone(true);
                    indexInt++;
                    $(copyTR).find('.adm-detail-content-cell-l').html("<?=GetMessage('LC_PATH')?>" + " " + indexInt);
                    $(copyTR).find('input[name="idexesIncludePath[]"]:first').attr("value","");
                    indexesTable.find('.before-tr').before(copyTR);
                });
            });
        </script>
        <tr class="heading">
            <td colspan="2"><?=GetMessage('LC_OPTIONS_INDEX_EXCLUDE')?></td>
        </tr>
        <?$count = 0;
        foreach($lcTempSettings['idexesExcludePath'] as $val){
            $count++;
            ?>
            <tr>
                <td width="50%" class="adm-detail-content-cell-l"><?=GetMessage("LC_PATH")?> <?=$count?></td>
                <td width="50%" class="adm-detail-content-cell-r"><input type="text" name="idexesExcludePath[]" value="<?=$val?>" maxlength="255" size="" style="/*width: 400px;*/"></td>
            </tr>
        <?
        }?>
        <tr>
            <td width="50%" class="adm-detail-content-cell-l"><?=GetMessage("LC_PATH")?> <?=++$count?></td>
            <td width="50%" class="adm-detail-content-cell-r"><input type="text" name="idexesExcludePath[]" value="" maxlength="255" size="" style="/*width: 400px;*/"></td>
        </tr>
        <tr class="before-tr-exclude">
            <td class="adm-detail-content-cell-l"></td>
            <td class="adm-detail-content-cell-r" style="text-align: left">
                <input  align="left" id="LC_addIndexPathexclude" type="button" value="<?=GetMessage("LC_ADD_ROW")?>">
            </td>
        </tr>
        <script>
            $(function(){
                var indexesTable = $('#LC_addIndexPathexclude').parents('table:first');
                var indexInt = parseInt("<?=$count?>");
                indexesTable.find('input[type="text"]').css({
                    'width':''
                });
                indexesTable.css({'width':'100%'})
                $('#LC_addIndexPathexclude').click(function(){
                    var copyTR = indexesTable.find('input[name="idexesExcludePath[]"]:first').parents('tr:first').clone(true);
                    indexInt++;
                    $(copyTR).find('.adm-detail-content-cell-l').html("<?=GetMessage('LC_PATH')?>" + " " + indexInt);
                    $(copyTR).find('input[name="idexesExcludePath[]"]:first').attr("value","");
                    indexesTable.find('.before-tr-exclude').before(copyTR);
                });
            });
        </script>
        <tr>
            <td colspan="2" style="">
                <div class="adm-info-message">
                    <h4><?=GetMessage("LC_DEFAULT_EXCLUDE_PATHS")?></h4>
                    <ul>
                        <li>
                            /bitrix/components/bitrix/
                        </li>
                        <li>
                            /bitrix/images/
                        </li>
                        <li>
                            /bitrix/js/
                        </li>
                        <li>
                            /bitrix/modules/
                        </li>
                        <li>
                            /upload/
                        </li>
                    </ul>
                </div>
                <br />
                <?
                $arIblock = CIBlock::GetList(array(),array("CODE"=>"ALOCALE_IBLOCK"))->GetNext();
                $iblockID = $arIblock['ID'];
                ?>
                <a target="_blank"  href="/bitrix/admin/iblock_list_admin.php?IBLOCK_ID=<?=$iblockID?>&type=alocale&lang=<?=LANGUAGE_ID?>&find_section_section=0">
                    <?=GetMessage("LC_TRANSLATION_FILES_INDEX")?>
                </a>
            </td>
        </tr>
    </table>
</div>