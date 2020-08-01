<div class="adm-detail-title"><?=GetMessage("LC_EXTENSION_SETTINGS")?></div>
<div class="adm-detail-content-item-block standart-options">
    <table id="general_edit_table" class="adm-detail-content-table edit-table" style="opacity: 1;">
        <?
        $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
        ?>
        <tbody>
        <tr class="heading">
            <td colspan="2"><?=GetMessage("LC_GOOGLE_TRANSLATE_API_SETTINGS_TITLE")?></td>
        </tr>
        <tr>
            <td width="50%" class="adm-detail-content-cell-l">
                <?=GetMessage("LC_GOOGLE_TRANSLATE_API_KEY")?>
            </td>
            <td width="50%" class="adm-detail-content-cell-r"><input type="text" name="gtranslate_api_key" value="<?=COption::GetOptionString($module_id,'gtranslate_api_key')?>" maxlength="255" size=""></td>
        </tr>
        <tr class="heading">
            <td colspan="2"><?=GetMessage("LC_MICROSOFT_TRANSLATOR_API_SETTINGS_TITLE")?></td>
        </tr>
        <tr>
            <td width="50%" class="adm-detail-content-cell-l"><?=GetMessage("LC_MICROSOFT_TRANSLATOR_API_CLIENT_ID")?></td>
            <td width="50%" class="adm-detail-content-cell-r">
                <input type="text" name="microsoftTranslatorCliendID" value="<?=COption::GetOptionString($module_id,'microsoftTranslatorCliendID')?>" maxlength="255" size="">
            </td>
        </tr>
        <tr>
            <td width="50%" class="adm-detail-content-cell-l">
                <?=GetMessage("LC_MICROSOFT_TRANSLATOR_API_CLIENT_SECRET")?></td>
            <td width="50%" class="adm-detail-content-cell-r">
                <input type="text" name="microsoftTranslatorCliendSecret" value="<?=COption::GetOptionString($module_id,'microsoftTranslatorCliendSecret')?>" maxlength="255" size="">
            </td>
        </tr>
        <tr>
            <td width="50%" class="adm-detail-content-cell-l"></td>
            <td width="50%" class="adm-detail-content-cell-r">
                <?=GetMessage("LC_MICROSOFT_TRANSLATOR_API_SIGN_UP")?>
            </td>
        </tr>
        <tr class="heading">
            <td colspan="2"><?=GetMessage("LC_YANDEX_TRANSLATE_API_SETTINGS_TITLE")?></td>
        </tr>
        <tr>
            <td width="50%" class="adm-detail-content-cell-l">
                <?=GetMessage("LC_YANDEX_TRANSLATE_API_KEY")?>
            </td>
            <td width="50%" class="adm-detail-content-cell-r"><input type="text" name="ytranslate_api_key" value="<?=COption::GetOptionString($module_id,'ytranslate_api_key')?>" maxlength="255" size=""></td>
        </tr>

        <tr class="heading">
            <td colspan="2"><?=GetMessage("LC_ADDITIONAL_SERVICES")?></td>
        </tr>
        <tr>
            <td width="50%" class="adm-detail-content-cell-l"><?=GetMessage("LC_LINK_TEMPLATE_FOR_WIKIPEDIA")?></td>
            <td width="50%" class="adm-detail-content-cell-r"><input type="text" name="wiki_url_tpl" value="<?=trim(COption::GetOptionString($module_id,'wiki_url_tpl')) =="" ? "" : COption::GetOptionString($module_id,'wiki_url_tpl')?>" maxlength="255" size=""></td>
        </tr>
        <tr>
            <td width="50%" class="adm-detail-content-cell-l"><?=GetMessage("LC_LINK_TEMPLATE_FOR_YOUTUBE")?></td>
            <td width="50%" class="adm-detail-content-cell-r"><input type="text" name="ytube_url_tpl" value="<?=trim(COption::GetOptionString($module_id,'ytube_url_tpl')) =="" ? "" : COption::GetOptionString($module_id,'ytube_url_tpl')?>" maxlength="255" size=""></td>
        </tr>
        <tr class="heading">
            <td colspan="2"><?=GetMessage("LC_LANG_PHRASE_STORED_IN_FILES")?></td>
        </tr>
        <tr>
            <td width="50%" class="adm-detail-content-cell-l"><?=GetMessage("LC_TRANSLATED_COLOR")?></td>
            <td width="50%" class="adm-detail-content-cell-r"><input type="text" name="translated_text_color" value="<?=trim(COption::GetOptionString($module_id,'translated_text_color')) == "" ? "red" : COption::GetOptionString($module_id,'translated_text_color') ?>" maxlength="255" size=""></td>
        </tr>
        </tbody>
    </table>
</div>