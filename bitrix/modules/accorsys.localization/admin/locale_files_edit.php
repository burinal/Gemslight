<?

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_js.php");

if(!CModule::IncludeModule('fileman'))
    die();

if(!$USER->CanDoOperation('fileman_edit_menu_elements'))
    $APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));



$APPLICATION->RestartBuffer();

CUtil::JSPostUnescape();
CLocale::includeLocaleLangFiles();

/* ��� ��������� ���� � �������� ������������ ������ ��� �������� �������� - $arAliasLangsForTranslate */
include($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/include/array_aliases_for_translate.php');

$site = CFileMan::__CheckSite($site);
$DOC_ROOT = CSite::GetSiteDocRoot($site);

$io = CBXVirtualIo::GetInstance();

$path = $io->CombinePath("/", $path);

$arParsedPath = CFileMan::ParsePath(Array($site, $path), true, false, "", $logical == "Y");
$menufilename = $path;

$name = preg_replace("/[^a-z0-9_]/i", "", $_REQUEST["name"]);
$menufilename = $io->CombinePath($path, ".".$name.".menu.php");
$arPath_m = array($site, $menufilename);
$abs_path = $io->CombinePath($DOC_ROOT, $menufilename);
$strWarning = "";
$module_id = "fileman";
$arDefLangSite = CSite::GetList($by = "sort", $order = "asc",array("ID"=>SITE_ID))->getNext();
$defLangSite = $arDefLangSite["LANGUAGE_ID"];
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
//delete menu file
if($_REQUEST["action"] == "delete" && check_bitrix_sessid())
{
    $success = false;
    if($io->FileExists($abs_path) && $USER->CanDoFileOperation('fm_delete_file', $arPath_m))
    {
        $f = $io->GetFile($abs_path);
        $arUndoParams = array(
            'module' => 'fileman',
            'undoType' => 'delete_menu',
            'undoHandler' => 'CFileman::UndoFileDelete',
            'arContent' => array(
                'site' => $site,
                'path' => $menufilename,
                'content' => $f->GetContents(),
                'perm' => CFileMan::FetchFileAccessPerm($arPath_m, true),
            )
        );

        if (COption::GetOptionInt("main", "disk_space") > 0)
        {
            $quota = new CDiskQuota();
            $quota->UpdateDiskQuota("file", $f->GetFileSize(), "delete");
        }

        $f->MarkWritable();
        $success = $io->Delete($abs_path);

        if(COption::GetOptionString($module_id, "log_menu", "Y")=="Y")
        {
            $mt = COption::GetOptionString("fileman", "menutypes", $default_value, $site);
            $mt = unserialize(str_replace("\\", "", $mt));
            $res_log['menu_name'] = $mt[$name];
            $res_log['path'] = substr($path, 1);
            CEventLog::Log(
                "content",
                "MENU_DELETE",
                "main",
                "",
                serialize($res_log)
            );
        }
        if($success)
        {
            $GLOBALS["APPLICATION"]->RemoveFileAccessPermission($arPath_m);

            CUndo::ShowUndoMessage(CUndo::Add($arUndoParams));
        }
    }
    ?>
    <script bxrunfirst="true">
        <?if($success):?>
        top.BX.reload('<?=CUtil::JSEscape($back_url);?>', true);
        <?else:?>
        top.BX.closeWait();
        alert('<?=CUtil::JSEscape(GetMessage("LC_PUB_MENU_EDIT_ERR_DEL").' '.$menufilename);?>');
        <?endif;?>
    </script>
    <?
    die();
}

if($io->FileExists($abs_path) && strlen($new)<=0)
    $bEdit = true;
else
    $bEdit = false;

$only_edit = !$USER->CanDoOperation('fileman_add_element_to_menu') || !$USER->CanDoFileOperation('fm_create_new_file', $arPath_m);
$templateId = $_REQUEST['templateId'];
/******* POST **********/
//???????? ????? ?? ?????? ? ??? ?????
if(!$USER->CanDoOperation('fileman_edit_existent_files') || !$USER->CanDoFileOperation('fm_edit_existent_file', $arPath_m) || (!$bEdit && $only_edit))
{
    $strWarning = GetMessage("ACCESS_DENIED");
}
else
{
    if($REQUEST_METHOD=="POST" && $_REQUEST['save'] == 'Y')
    {
        if (!is_array($ids)) $ids = array();

        $arValues = $_REQUEST;

        $res = CFileMan::GetMenuArray($abs_path);

        $aMenuLinksTmp = $res["aMenuLinks"];
        $aMenuLinksTmp_ = Array();

        $CAccorsysLocalization = new CLocale();

        //������� ������ ���� �� ����������
        $aMenuSort = Array();
        for($i=0; $i<count($ids); $i++)
        {
            $num = $ids[$i];
            //���������� ���������
            if(isset($arValues['titles_'.$num])){
                foreach($arValues["text_".$num] as $lang => $text){
                    $arValues["text_".$num][$lang] = '<loc class="locale-title-tag" title="'.$_REQUEST['titles_'.$num][$lang].'" data-mark="end-of-locale-title-tag">'.$arValues["text_".$num][$lang].'</loc>';
                }
            }

            if (!isset($aMenuLinksTmp[$num-1]) && $only_edit)
                continue;

            if(${"del_".$num}=="Y" && !$only_edit)
                continue;

            //������� ��������� �������� � ���� ��� ������ � ��� � ���� ������ �� �������
            $languageNameItem = $arValues["text_".$num][LANGUAGE_ID];
            $arItemName = changeLangItem($templateId,$arValues,$arValues["text_".$num],$num,$languageNameItem,"text_".$num,$CAccorsysLocalization);
            if($arItemName == '' || $arItemName == ' ')
                continue;
            $arItemLink = changeLangItem($templateId,$arValues,$arValues["link_".$num],$num,$languageNameItem,"link_".$num,$CAccorsysLocalization);

            $aMenuItem = Array(
                $arItemName,
                $arItemLink
            );

            if ($arValues['additional_params_'.$num])
                $arAdditionalParams = @unserialize($arValues['additional_params_'.$num]);
            else
                $arAdditionalParams = array(array(), array());

            $aMenuItem = array_merge($aMenuItem, $arAdditionalParams);

            $aMenuLinksTmp_[] = $aMenuItem;
            $aMenuSort[] = IntVal(${"sort_".$num});

        }

        $aMenuLinksTmp = $aMenuLinksTmp_;

        for($i=0; $i<count($aMenuSort)-1; $i++)
            for($j=$i+1; $j<count($aMenuSort); $j++)
                if($aMenuSort[$i]>$aMenuSort[$j])
                {
                    $tmpSort = $aMenuLinksTmp[$i];
                    $aMenuLinksTmp[$i] = $aMenuLinksTmp[$j];
                    $aMenuLinksTmp[$j] = $tmpSort;

                    $tmpSort = $aMenuSort[$i];
                    $aMenuSort[$i] = $aMenuSort[$j];
                    $aMenuSort[$j] = $tmpSort;
                }

        //?????? $aMenuLinksTmp ????? ? ????? ??????? ????, ??? ???? ???? ????? :-)
        if (!check_bitrix_sessid())
        {
            $strWarning = GetMessage('LC_MENU_EDIT_SESSION_EXPIRED');
        }
        else
        {
            $f = $io->GetFile($abs_path);

            if ($io->FileExists($abs_path))
                $arUndoParams = array(
                    'module' => 'fileman',
                    'undoType' => 'edit_menu',
                    'undoHandler' => 'CFileman::UndoEditFile',
                    'arContent' => array(
                        'absPath' => $abs_path,
                        'content' => $f->GetContents()
                    )
                );
            else
                $arUndoParams = array(
                    'module' => 'fileman',
                    'undoType' => 'edit_menu',
                    'undoHandler' => 'CFileman::UndoNewFile',
                    'arContent' => array(
                        'absPath' => $abs_path,
                        'path' => $menufilename,
                        'site' => $site
                    )
                );

            CFileMan::SaveMenu(Array($site, $menufilename), $aMenuLinksTmp, $sMenuTemplateTmp);
            //������� ���� ����� �� getMessage
            $fileMenu = file_get_contents($abs_path);
            $fileMenu = replaceAccorsysLClang($fileMenu);
            $file = fopen ($abs_path,"w");
            if ( !$file )
            {
                echo GetMessage("LC_FILE_OPEN_FAIL");
            }
            else
            {
                fwrite ( $file, $fileMenu);
            }
            fclose ($file);
            if(COption::GetOptionString($module_id, "log_menu", "Y")=="Y")
            {
                $mt = COption::GetOptionString("fileman", "menutypes", false, $site);
                $mt = unserialize(str_replace("\\", "", $mt));
                $res_log['menu_name'] = $mt[$name];
                $res_log['path'] = substr($path, 1);
                if ($bEdit)
                    CEventLog::Log(
                        "content",
                        "MENU_EDIT",
                        "main",
                        "",
                        serialize($res_log)
                    );
                else
                    CEventLog::Log(
                        "content",
                        "MENU_ADD",
                        "main",
                        "",
                        serialize($res_log)
                    );
            }
            if($e = $APPLICATION->GetException())
                $strWarning = $e->GetString();

            if($strWarning == '')
            {
                CUndo::ShowUndoMessage(CUndo::Add($arUndoParams));
                $bEdit = true;
                ?>
                <script bxrunfirst="true">
                    top.BX.WindowManager.Get().Close();
                    top.BX.showWait();
                    top.BX.reload('<?=CUtil::JSEscape($back_url);?>', true);
                </script>
                <?
                die();
            }
        }
    }
}
/******* /POST **********/

$arMenuTypes = GetMenuTypes($site);

$TITLE = GetMessage("LC_MENU_EDIT_TITLE_".($bEdit ? "EDIT" : "ADD"));
$DESCRIPTION = str_replace(
    array("#TYPE#", "#DIR#"),
    array(strlen($arMenuTypes[$name]) > 0 ? $arMenuTypes[$name] : $name, $path),
    GetMessage("MENU_EDIT_DESCRIPTION_".($bEdit ? "EDIT" : "ADD"))
);

$obJSPopup = new CJSPopup('',
    array(
        'TITLE' => GetMessage('LC_MENU_EDIT_TITLE'),
        'ARGS' => "lang=".urlencode($_GET["lang"])."&site=".urlencode($_GET["site"])."&back_url=".urlencode($_GET["back_url"])."&path=".urlencode($_GET["path"])."&name=".urlencode($_GET["name"])
    )
);

// ======================== Show titlebar ============================= //
$obJSPopup->ShowTitlebar();
?>
<script src="/bitrix/js/main/dd.js" type="text/javascript"></script>

<?
// ======================== Show description ============================= //
$obJSPopup->StartDescription('bx-core-edit-menu');
?>
<p class="title" id="ACCORSYS_LC_MENU_POPUP"><?=$TITLE?></p>
<p class="note"><?=$DESCRIPTION?>
</p><p>
</p>
<?
if($strWarning <> "")
    $obJSPopup->ShowValidationError($strWarning);

?>

<?
// ======================== Show content ============================= //
$obJSPopup->StartContent();

if($bEdit && strlen($strWarning)<=0)
{

    //�������� ������� GetMessage � ����� ����
    $fileMenu = file_get_contents($abs_path);
    if(LC_searchArrayMenu($fileMenu)!= false){
        //������� ���� php ��� ����
        $fileMenu = str_replace('<?','',$fileMenu);
        $fileMenu = str_replace('<?php','',$fileMenu);
        $fileMenu = str_replace('?>','',$fileMenu);
        eval($fileMenu);
        $aMenuLinksTmp = $aMenuLinks;
    }else{
        $res = CFileMan::GetMenuArray($abs_path);
        $aMenuLinksTmp = $res["aMenuLinks"];
    }
}
?>

<?

if(!is_array($aMenuLinksTmp))
    $aMenuLinksTmp = Array();
?>
<input type="hidden" name="save" value="Y" />
<table border="0" cellpadding="0" cellspacing="0" class="bx-width100" class="menu-table ">
    <thead>
    <tr class="section">
        <td width="0"></td>
        <td width="50%"><b><?echo GetMessage("LC_NAME")?></b></td>
        <td width="50%"><b><?echo GetMessage("LC_MENU_EDIT_LINK")?></b></td>
        <td width="0"></td>
    </tr>
    </thead>
</table><div id="bx_menu_layout" class="bx-menu-layout locale-form-menu"><?
    $itemcnt = 0;
    $additionalInputsForTitle = "";
    for($i=1; $i<=count($aMenuLinksTmp); $i++):
        $itemcnt++;
        $aMenuLinksItem = $aMenuLinksTmp[$i-1];
        ?><div class="bx-menu-placement" id="bx_menu_placement_<?=$i?>"><div class="" id="bx_menu_row_<?=$i?>"><table border="0" cellpadding="0" cellspacing="0" class="bx-width100 internal">
                <tbody>
                <tr>
                    <td valign="top" class="number">
                        <span><?=$i?>.</span>
                    </td>
                    <td valign="top" class="menu-control">
                        <span title="���������� ����� ���� �����" class="rowcontrol drag"></span>
                        <input type="hidden" name="sort_<?=$i?>" value="<?echo $i*10?>" />
                        <input type="hidden" name="ids[]" value="<?=$i?>" />
                        <input type="hidden" name="del_<?=$i?>" value="N" />
                        <input type="hidden" name="additional_params_<?=$i?>" value="<?=htmlspecialcharsex(serialize(array($aMenuLinksItem[2], $aMenuLinksItem[3], $aMenuLinksItem[4])))?>" />
                    </td>
                    <td>
                        <?
                        //��������� ���� ����� ������� templateId

                        $TempMess = $MESS;
                        IncludeTemplateLangFile('/bitrix/templates/'.$templateId.'/header.php');
                        $arLanguageMessage = array();
                        $arLanguage = array();
                        $dbLang = CLanguage::GetList($by,$order);

                        $arLanguage = array();
                        $arSettingsLangs = CLocale::GetSiteLangs($_REQUEST['site']);

                        while($arLang = $dbLang->GetNext()){
                            if(!isset($arSettingsLangs[$arLang["LANGUAGE_ID"]]))
                                continue;

                            $MESS = array();
                            $arLanguage[] = $arLang;
                            $filePath = $_SERVER['DOCUMENT_ROOT'].'/bitrix/templates/'.$templateId.'/lang/'.$arLang['LANGUAGE_ID'].'/header.php';
                            if(file_exists($filePath)){
                                include($filePath);
                                $arLanguageMessage[$arLang['LANGUAGE_ID']] = $MESS;
                            }
                        }


                        $MESS = $TempMess;
                        //������� ������ ���� ���� �� ������
                        $itemText = '';
                        $bLCmenu = false;
                        $langKey = false;
                        if(strpos($aMenuLinksItem[0],'ACCORSYS_LC_GETMESSAGE_')  !== false){
                            $langKey = str_replace('ACCORSYS_LC_GETMESSAGE_','',$aMenuLinksItem[0]);
                            $itemText = GetMessage($langKey);
                            $bLCmenu = true;
                            ?>
                            <input type="hidden" name="lc_menu_lang[<?echo $i?>]" value="text_<?echo $i?>">
                            <input type="hidden" name="lc_menu_lang_key[<?echo $i?>]" value="<?=$langKey?>">
                        <?
                        }elseif(strlen($aMenuLinksItem[0]) > 0){
                            $itemText = htmlspecialcharsbx($aMenuLinksItem[0]);
                        }else{
                            $itemText = GetMessage('MENU_EDIT_JS_NONAME');
                        }
                        ?><div style="margin-top:12px;" class="locale-menu-edit edit-area" id="view_area_text_<?=$i?>" title="<?=GetMessage('LC_MENU_EDIT_TOOLTIP_TEXT_EDIT')?>">
                            <?
                            foreach($arLanguage as $lang){
                                $arSortedLangs[$lang["LANGUAGE_ID"]] = $lang;
                            }
                            ksort($arSortedLangs);
                            foreach($arSortedLangs as $k=>$v){
                                if($langKey!= false && isset($arLanguageMessage[$v['LANGUAGE_ID']][$langKey]) && $arLanguageMessage[$v['LANGUAGE_ID']] != LANGUAGE_ID){
                                    $itemText = $arLanguageMessage[$v['LANGUAGE_ID']][$langKey];
                                }

                                $isNeedSaveTitle = false;
                                $matches = array();
                                if (CLocale::preg_match("'class=\"locale-title-tag\" title=\\\"(.+?)\\\" data-mark=\"end-of-locale-title-tag\"'",$itemText,$matches)){
                                    $isNeedSaveTitle = true;
                                    $textTitle = $matches[1];
                                    $matches = array();
                                    CLocale::preg_match("'data-mark=\"end-of-locale-title-tag\">(.+?)</loc>'",$itemText,$matches);
                                    $itemText = $matches[1];
                                    $additionalInputsForTitle .= '<input type="hidden" name="titles_'.$i.'['.$v['LANGUAGE_ID'].']" value="'.$textTitle.'">';
                                }
                                ?>
                                <span class="locale-block block-<?=$v["LANGUAGE_ID"]?>">
                                        <span class="locale-select">
                                            <div class="locale-select-wrapp-em">
                                                <span title="<?=$arAccorsysLocaleLangs[$v["LANGUAGE_ID"]].($defLangSite == $v["LANGUAGE_ID"] ? ' - '.GetMessage("LC_BY_DEFAULT"):"").'"' . strtoupper($v["LANGUAGE_ID"])?>">
                                                    <span class="lang-span-text"><?=strtoupper($v["LANGUAGE_ID"])?></span>
                                                    <i style="margin-right:8px;margin-top:7px;" class="ico-flag-<?=strtoupper($v['LANGUAGE_ID'])?>"></i>
                                                </span>
                                                <textarea  <?=($isNeedSaveTitle ? ' data-lang-title="'.$textTitle.'" ':'')?> data-lang="<?=$arAliasLangsForTranslate[$v["LANGUAGE_ID"]]?>" name="text_<?echo $i?>[<?=$v['LANGUAGE_ID']?>]"><?=htmlspecialcharsbx($itemText)?></textarea>
                                                <ul class="selectblock" style="display: none;"></ul>
                                                <div class="locale-click-wrapper">
                                                    <a class="locale-click-arrow" href="#"></a> <!--���� ������ �� ������� - �������� ����� "disabled"-->
                                                    <div class="locale_popup">
                                                        <span class="locale_popup_angle"></span>
                                                        <ul>
                                                            <li><a class="g_translate" href="#"><span class="span-icon icon-google"><?=GetMessage("LC_USE_GOOGLE_TRANSLATE")?></span></a></li>
                                                            <li><a class="microsoft_translate" href="#"><span class="span-icon icon-microsoft"><?=GetMessage("LC_USE_MICROSOFT_TRANSLATOR")?></span></a></li>
                                                            <li><a class="y_translate" href="#"><span class="span-icon icon-ya"><?=GetMessage("LC_USE_YANDEX_TRANSLATE")?></span></a></li>
                                                            <li class="locale_popup_separator" style="display:block;"><!-- --></li>
                                                            <li><a class="wiki" href="#"><span class="span-icon icon-wiki"><?=GetMessage("LC_FIND_IN_WIKI")?></span></a></li>
                                                            <li><a class="youtube" href="#"><span class="span-icon icon-youtube"><?=GetMessage("LC_FIND_IN_YOUTUBE")?></span></a></li>
                                                            <li class="locale_popup_separator" style="display: none;"></li>
                                                            <li style="display: none;"><a class="undo" href="#"><span class="span-icon icon-undo"><?=GetMessage("LC_CANCEL")?></span></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </span>
                            <?
                            }
                            ?>
                        </div>
                    </td>
                    <td class="width420">
                        <div class="edit-area" id="edit_area_link_<?=$i?>">
                            <?
                            foreach($arLanguage as $k=>$v){
                                ?>
                                <div class="div-to-translate"  id="edit_area_link_<?=$i?>[<?=$v['LANGUAGE_ID']?>]">
                                    <textarea class="path" name="link_<?echo $i?>[<?=$v['LANGUAGE_ID']?>]"><?=htmlspecialcharsbx($aMenuLinksItem[1])?></textarea>
                                    <?
                                    CAdminFileDialog::ShowScript(
                                        Array
                                        (
                                            "event" => "OpenFileBrowserWindFile_".$i.$v['LANGUAGE_ID'],
                                            "arResultDest" => Array("FUNCTION_NAME" => 'setLink'),
                                            "arPath" => Array("SITE" => $site, 'PATH' => $aMenuLinksItem[1]),
                                            "select" => 'F',// F - file only, D - folder only, DF - files & dirs
                                            "operation" => 'O',// O - open, S - save
                                            "showUploadTab" => false,
                                            "showAddToMenuTab" => false,
                                            "fileFilter" => 'php, html',
                                            "allowAllFiles" => true,
                                            "SaveConfig" => true
                                        )
                                    );
                                    ?>
                                    <span style="margin-top:0px;height: 20px !important;background-position: center 6px;" onclick="if (!GLOBAL_bDisableActions) {currentLink = '<?=$i?>[<?=$v['LANGUAGE_ID']?>]';OpenFileBrowserWindFile_<?=$i.$v['LANGUAGE_ID']?>();}" class="rowcontrol folder" title="<?=GetMessage('LC_MENU_EDIT_TOOLTIP_FD')?>"></span>
                                </div>
                            <?
                            }
                            ?>
                        </div>
                    </td>
                    <td class="cell-control">
                        <span onclick="menuDelete(<?=$i?>)" class="rowcontrol delete" style="margin-top: 5px;" title="<?=GetMessage('LC_MENU_EDIT_TOOLTIP_DELETE')?>"></span>
                        <span onclick="menuMoveUp(<?=$i?>)" class="rowcontrol up" style="margin-top: 20px;visibility: <?=($i == 1 ? 'hidden' : 'visible')?>" title="<?=GetMessage('LC_MENU_EDIT_TOOLTIP_UP')?>"></span>
                        <span onclick="menuMoveDown(<?=$i?>)" class="rowcontrol down" style="margin-top:20px;visibility: <?=($i == count($aMenuLinksTmp) ? 'hidden' : 'visible')?>" title="<?=GetMessage('LC_MENU_EDIT_TOOLTIP_DOWN')?>"></span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div></div><?endfor?>
    <?=$additionalInputsForTitle?>
</div>
<?if(!$only_edit):?><br /><input type="button" onClick="menuAdd()" value="<?echo GetMessage("LC_MENU_EDIT_ADD_ITEM")?>" /><?endif;?>
<input type="hidden" name="itemcnt" value="<?echo $itemcnt?>" />
<style>
    .locale-block .locale-select .locale-click-wrapper a.locale-click-arrow.active{
        background-position: left -31px;
    }
</style>
<script type="text/javascript">
jqLoc('.locale-form-menu .locale-block').each(function(){
    jqLoc(jqLoc(this).get(0)).addLocaleFormHandlers();
});
var currentLink = -1;
var currentRow = null;

var GLOBAL_bDisableActions = false;
var GLOBAL_bDisableDD = false;

var jsMenuMess = {
    noname: '<?=CUtil::JSEscape(GetMessage('MENU_EDIT_JS_NONAME'))?>'
}

jqLoc('table').click(function(){menuCheckIcons()});

jqLoc(function(){
    jqLoc('.locale-form-menu').parents('form[name="bx_popup_form"]:first').submit(function(){
        jqLoc('.locale-form-menu').find('.locale-block .locale-select textarea').each(function(){
            if(jqLoc(this).attr('data-lang-title'))
                jqLoc(this).val('<loc class="locale-title-tag" title="'+ jqLoc(this).attr('data-lang-title') +'" data-mark="end-of-locale-title-tag">'+ jqLoc(this).val() +'</loc>');
        });
        return false;
    });
});

function setLink(filename, path, site)
{
    <?echo $obJSPopup->jsPopup?>.GetForm()['link_' + currentLink].value = ((path == '' || path == '/') ? '/' : path + '/') + filename;
    editArea('link_' + currentLink, true);
}

function menuCheckIcons()
{
    jqLoc('.locale-form-menu tr .rowcontrol').css('visibility','visible');
    jqLoc('.locale-form-menu .bx-menu-placement').first().find('.up').css('visibility','hidden');
    jqLoc('.locale-form-menu .bx-menu-placement').last().find('.down').css('visibility','hidden');
}

function menuMoveUp(i)
{
    if (GLOBAL_bDisableActions)
        return;

    var obRow = BX('bx_menu_row_' + i);
    var obPlacement = obRow.parentNode;

    var index = obPlacement.id.substring(18);
    if (1 >= index)
        return;

    var obNewPlacement = obPlacement.previousSibling;
    var obSwap = obNewPlacement.firstChild;


    obPlacement.removeChild(obRow);
    obNewPlacement.removeChild(obSwap);
    obPlacement.appendChild(obSwap);
    obNewPlacement.appendChild(obRow);
    switchMenuNumbers(jqLoc(obPlacement).parents('#bx_menu_layout:first'));
    setCurrentRow(obRow);
    menuCheckIcons();
}

function menuMoveDown(i)
{
    if (GLOBAL_bDisableActions)
        return;

    var obRow = BX('bx_menu_row_' + i);
    var obPlacement = obRow.parentNode;
    var obNewPlacement = obPlacement.nextSibling;
    if (null == obNewPlacement)
        return;

    var obSwap = obNewPlacement.firstChild;


    obPlacement.removeChild(obRow);
    obNewPlacement.removeChild(obSwap);
    obPlacement.appendChild(obSwap);
    obNewPlacement.appendChild(obRow);
    switchMenuNumbers(jqLoc(obPlacement).parents('#bx_menu_layout:first'));
    setCurrentRow(obRow);
    menuCheckIcons();
}

function menuDelete(i)
{
    if (GLOBAL_bDisableActions)
        return;

    var obInput = <?echo $obJSPopup->jsPopup?>.GetForm()['del_' + i];
    var obPlacement = BX('bx_menu_row_' + i).parentNode;

    obInput.value = 'Y';

    if (obPlacement.firstChild == currentRow) currentRow = null;
    var layout = jqLoc(obPlacement).parents('#bx_menu_layout:first');
    obPlacement = BX.remove(obPlacement);
    menuCheckIcons();
    switchMenuNumbers(layout);
}

function switchMenuNumbers(layout){
    var menuLayout = jqLoc(layout)
    menuLayout.find('.bx-menu-placement').each(function(){
        jqLoc(this).find('.number').html('<span>' + (jqLoc(this).index()+1) + '.</span>');
    })
}

function menuAdd()
{
    var obCounter = <?echo $obJSPopup->jsPopup?>.GetForm().itemcnt;
    var nums = parseInt(obCounter.value);
    obCounter.value = ++nums;

    var obPlacement = BX.create('DIV', {props: {className: 'bx-menu-placement', id: 'bx_menu_placement_' + nums}});

    document.getElementById('bx_menu_layout').appendChild(obPlacement);

    var obRow = BX.create('DIV', {props: {className: 'bx-edit-menu-item', id: 'bx_menu_row_' + nums}});
    obPlacement.appendChild(obRow);

    <?
    ob_start();

   foreach($arLanguage as $k=>$v){
        CAdminFileDialog::ShowScript(
            Array
            (
                "event" => "OpenFileBrowserWindFile____NUMS___".$v['LANGUAGE_ID'],
                "arResultDest" => Array("FUNCTION_NAME" => 'setLink'),
                "arPath" => Array("SITE" => $site, 'PATH' => $path),
                "select" => 'F',// F - file only, D - folder only, DF - files & dirs
                "operation" => 'O',// O - open, S - save
                "showUploadTab" => false,
                "showAddToMenuTab" => false,
                "fileFilter" => 'php, html',
                "allowAllFiles" => true,
                "SaveConfig" => true
            )
        );
    }
    $out = ob_get_contents();
    ob_end_clean();
    $out = trim($out);
    $unscript_pos = strpos($out, '</script>');
    $out = substr($out, 8, $unscript_pos-8);
    $out = trim($out);

    $out = CUtil::JSEscape($out);
    $out = str_replace('___NUMS___', "' + nums + '", $out);
    echo 'eval(\''.$out.'\');';
?>

    var arCellsHTML = [
        '',
        getAreaHTML('text','text_' + nums, '', '<?=CUtil::JSEscape(GetMessage('LC_MENU_EDIT_TOOLTIP_TEXT_EDIT'))?>',nums),
        getAreaHTML('link','link_' + nums, '', '<?=CUtil::JSEscape(GetMessage('LC_MENU_EDIT_TOOLTIP_LINK_EDIT'))?>',nums),
        '<td class="cell-control">' +
            '<span onclick="menuDelete(' + nums + ')" class="rowcontrol delete" style="margin-top: 5px;" title="<?=CUtil::JSEscape(GetMessage('LC_MENU_EDIT_TOOLTIP_DELETE'))?>"></span>'+
            '<span onclick="menuMoveUp(' + nums + ')" class="rowcontrol up" style="margin-top: 20px;visibility: ' + (nums == 1 ? 'hidden' : 'visible') + ';" title="<?=CUtil::JSEscape(GetMessage('LC_MENU_EDIT_TOOLTIP_UP'))?>"></span>'+
            '<span onclick="menuMoveDown(' + nums + ')" class="rowcontrol down" style="margin-top:20px;visibility: hidden;" title="<?=CUtil::JSEscape(GetMessage('LC_MENU_EDIT_TOOLTIP_DOWN'))?>"></span>' +
            '</td>'
    ];


    var row_content = '<table border="0" cellpadding="0" cellspacing="0" class="bx-width100 internal" class="menu-table"><tbody><tr>';
    row_content +='<td valign="top" class="number">#</td>';
    row_content +=
        '<td valign="top" class="menu-control">'+
            '<span class="rowcontrol drag" title="���������� ����� ���� �����" style="visibility: visible;"></span><input type="hidden" value="'+nums+'0" name="sort_'+nums+'">' +
            '<input type="hidden" value="'+nums+'" name="ids[]">' +
            '<input type="hidden" value="N" name="del_'+nums+'">' +
            '<input type="hidden" value="a:3:{i:0;a:0:{}i:1;a:0:{}i:2;s:21:&quot;CUser::IsAuthorized()&quot;;}" name="additional_params_'+nums+'">' +
            '</td>';
    //(jqLoc('.locale-form-menu .bx-menu-placement').size())
    for (var i = 0; i < arCellsHTML.length; i++)
        row_content += arCellsHTML[i];

    row_content += '</tr></tbody></table>';

    obRow.innerHTML = row_content;

    jqLoc(obRow).find('.locale-block').each(function(){
        jqLoc(jqLoc(this).get(0)).addLocaleFormHandlers();
    });
    switchMenuNumbers(jqLoc(obRow).parents('#bx_menu_layout:first'));

    var arInputs = [
        ['ids[]', nums],
        ['del_' + nums, 'N'],
        ['sort_' + nums, 2 * nums * 10]
    ];

    for (var i = 0; i<arInputs.length; i++)
    {
        var obInput = BX.create('INPUT', {
            props: {type: 'hidden', name: arInputs[i][0], value: arInputs[i][1]}
        });

        obInput.value = arInputs[i][1];
        var obFirstCell = obRow.firstChild.tBodies[0].rows[0].cells[0];
        obFirstCell.insertBefore(obInput, obFirstCell.firstChild);
    }

    /*jsDD.registerDest(obPlacement);

     obRow.onbxdragstart = BXDD_DragStart;
     obRow.onbxdragstop = BXDD_DragStop;
     obRow.onbxdraghover = BXDD_DragHover;

     jsDD.registerObject(obRow);*/

    setCurrentRow(nums);
    menuCheckIcons();
}

function getAreaHTML(type, area, value, title,nums)
{
    if (null === value) value = '';
    var html = '';

    if(type == 'text'){
        html+= '<td><div class="edit-area locale-menu-edit" id="edit_area_' + area + '" style="margin-top:12px;">';
        <?
        foreach($arSortedLangs as $k=>$v){
            ?>
        html+='<span class="locale-block block-<?=$v["LANGUAGE_ID"]?>">';
        html+='    <span class="locale-select">';
        html+='    <div class="locale-select-wrapp-em">';
        html+='    <span title="<?=$arAccorsysLocaleLangs[$v['LANGUAGE_ID']].($defLangSite == $v['LANGUAGE_ID'] ? ' - '.GetMessage("LC_BY_DEFAULT"):"").'"' . strtoupper($v['LANGUAGE_ID'])?>">';
        html+='    <span class="lang-span-text"><?=strtoupper($v["LANGUAGE_ID"])?></span>';
        html+='    <i style="margin-right:8px;margin-top:7px;" class="ico-flag-<?=strtoupper($v['LANGUAGE_ID'])?>"></i>';
        html+='</span>';
        html+='<textarea data-lang="<?=$arAliasLangsForTranslate[$v["LANGUAGE_ID"]]?>" name="text_' + area + '>[<?=$v['LANGUAGE_ID']?>]"></textarea>';
        html+='<ul class="selectblock" style="display: none;"></ul>';
        html+=' <div class="locale-click-wrapper">';
        html+='   <a class="locale-click-arrow" href="#"></a>';
        html+='<div class="locale_popup">';
        html+='  <span class="locale_popup_angle"></span>';
        html+='    <ul>';
        html+='     <li><a class="g_translate" href="#"><span class="span-icon icon-google"><?=GetMessage("LC_USE_GOOGLE_TRANSLATE")?></span></a></li>';
        html+='    <li><a class="microsoft_translate" href="#"><span class="span-icon icon-microsoft"><?=GetMessage("LC_USE_MICROSOFT_TRANSLATOR")?></span></a></li>';
        html+='    <li><a class="y_translate" href="#"><span class="span-icon icon-ya"><?=GetMessage("LC_USE_YANDEX_TRANSLATE")?></span></a></li>';
        html+='    <li class="locale_popup_separator" style="display:block;"><!-- --></li>';
        html+='    <li><a class="wiki" href="#"><span class="span-icon icon-wiki"><?=GetMessage("LC_FIND_IN_WIKI")?></span></a></li>';
        html+='    <li><a class="youtube" href="#"><span class="span-icon icon-youtube"><?=GetMessage("LC_FIND_IN_YOUTUBE")?></span></a></li>';
        html+=' <li class="locale_popup_separator" style="/*display: none;*/"></li>';
        html+='<li style="display: none;"><a class="undo" href="#"><span class="span-icon icon-undo"><?=GetMessage("LC_CANCEL")?></span></a></li>';
        html+=' </ul>';
        html+=' </div>';
        html+='</div>';
        html+='</div>';
        html+=' </span>';
        html+='</span>';

        <?
        }
       ?>
        html+= '</div></td>';
    }else{
        html+= '<td class="width420"><div class="edit-area" id="edit_area_' + area + '">';
        <?
      foreach($arLanguage as $k=>$v){
          ?>
        html+= '<div id="edit_area_link_<?=$i?>[<?=$v['LANGUAGE_ID']?>]" class="div-to-translate">';
        html+= '<textarea class="path" name="' + area + '[<?=$v['LANGUAGE_ID']?>]">' + value + '</textarea>';
        html+= '<span style="margin-top:0px;height: 20px !important;background-position: center 6px;" onclick="if (!GLOBAL_bDisableActions) {currentLink = \'' + nums + '[<?=$v['LANGUAGE_ID']?>]\'; OpenFileBrowserWindFile_' + nums + '<?=$v['LANGUAGE_ID']?>();}" class="rowcontrol folder" title="<?=CUtil::JSEscape(GetMessage('LC_MENU_EDIT_TOOLTIP_FD'))?>"></span>';
        html+= '</div>';
        <?
    }
   ?>
        html+= '</div></td>';
    }

    return html;
}

var currentEditingRow = null;

function editArea(area, bSilent)
{
    if (GLOBAL_bDisableActions)
        return;

    jsDD.Disable();
    GLOBAL_bDisableDD = true;
    jsDD.allowSelection();
    l = BX('bx_menu_layout');
    l.ondrag = l.onselectstart = null;
    l.style.MozUserSelect = '';
    var obEditArea = BX('edit_area_' + area);
    obEditArea.style.display = 'block';
    return obEditArea;
}



function setCurrentRow(i)
{
    i = BX(i);

    if (null != currentRow) BX.removeClass(currentRow, 'bx-menu-current-row')

    BX.addClass(i, 'bx-menu-current-row');
    currentRow = i;
}

function rowMouseOut(obArea)
{
    obArea.className = 'edit-field view-area';
    obArea.style.backgroundColor = '';
}

function rowMouseOver (obArea)
{
    if (GLOBAL_bDisableActions || jsDD.bPreStarted)
        return;

    //obArea.className = 'edit-field-active view-area';
    //obArea.style.backgroundColor = 'white';
}

/* DD handlers */
function BXDD_DragStart()
{
    if (GLOBAL_bDisableDD)
        return false;

    this.BXOldPlacement = this.parentNode;

    var id = this.id.substring(12);

    GLOBAL_bDisableActions = true;

    return true;
}

function BXDD_DragStop()
{
    this.BXOldPlacement = false;

    setTimeout('GLOBAL_bDisableActions = false', 50);

    return true;
}

function BXDD_DragHover(obPlacement, x, y)
{
    if (GLOBAL_bDisableDD)
        return false;

    if (obPlacement == this.BXOldPlacement)
        return false;


    var obSwap = obPlacement.firstChild;

    this.BXOldPlacement.removeChild(this);
    obPlacement.removeChild(obSwap);
    this.BXOldPlacement.appendChild(obSwap);
    obPlacement.appendChild(this);

    this.BXOldPlacement = obPlacement;

    menuCheckIcons();

    return true;
}

BX.ready(function ()
{
    jsDD.Reset();

    jsDD.registerContainer(BX.WindowManager.Get().GetContent());
    l = BX('bx_menu_layout');
    l.ondrag = l.onselectstart = BX.False;
    l.style.MozUserSelect = 'none';
});
</script>
<style>
    div.locale-menu-edit .locale-flag.ru {
        background: url(/bitrix/images/accorsys.localization/flags.png) no-repeat scroll left -5px transparent;
    }
    div.locale-menu-edit .locale-flag.it {
        background: url(/bitrix/images/accorsys.localization/flags.png) no-repeat scroll left -38px transparent;
    }
    div.locale-menu-edit .locale-flag.br {
        background: url(/bitrix/images/accorsys.localization/flags.png) no-repeat scroll left -71px transparent;
    }
    div.locale-menu-edit .locale-flag.de {
        background: url(/bitrix/images/accorsys.localization/flags.png) no-repeat scroll left -104px transparent;
    }
    div.locale-menu-edit .locale-flag.en {
        background: url(/bitrix/images/accorsys.localization/flags.png) no-repeat scroll left -137px transparent;
    }
    div.locale-menu-edit .locale-flag.cn {
        background: url(/bitrix/images/accorsys.localization/flags.png) no-repeat scroll left -170px transparent;
    }
    div.locale-menu-edit .locale-flag.fr {
        background: url(/bitrix/images/accorsys.localization/flags.png) no-repeat scroll left -203px transparent;
    }
    div.locale-menu-edit .locale-flag.es {
        background: url(/bitrix/images/accorsys.localization/flags.png) no-repeat scroll left -236px transparent;
    }
    div.locale-menu-edit .locale-flag.ua {
        background: url(/bitrix/images/accorsys.localization/flags.png) no-repeat scroll left -269px transparent;
    }
    div.locale-menu-edit .locale-flag {
        width: 14px;
        height: 17px;
        display: inline-block;
        margin-right: 10px;
    }
</style>
<?
// ======================== Show buttons ============================= //
$obJSPopup->ShowStandardButtons();

function LC_searchArrayMenu(&$text){
    $matches = array();
    $pattern = "/GetMessage[\s]{0,}\([\s]{0,}(\'|\")([^\s]{0,})(\'|\")[\s]{0,}\)/";
    $flag = CLocale::preg_match_all($pattern, $text, $matches,PREG_OFFSET_CAPTURE);
    if($flag){
        $arReplace = array();
        foreach($matches[0] as $key => $arGetMessageText){
            $arReplace[] = array(
                "SEARCH"=>$arGetMessageText[0],
                "REPLACE"=>"'ACCORSYS_LC_GETMESSAGE_".$matches[2][$key][0]."'",
            );
        }
        if(count($arReplace)>0){
            foreach($arReplace as $val){
                $text = str_replace($val['SEARCH'],$val['REPLACE'],$text);
            }
        }
        return true;
    }else{
        return false;
    }
}
function changeLangItem($templateId,$arValues,$arItemName,$num,$nameItem = false,$addPrefix,$localeObject){

    $arTempName = array();
    $fileLang = '/bitrix/templates/'.$templateId.'/lang/#LANG#/header.php';
    foreach($arItemName as $lang=>$name){
        $arTempName[$name] = $name;
    }
    if(count($arTempName)>1 && isset($arValues['lc_menu_lang'][$num])){//������ �������� ������
        $key = $arValues['lc_menu_lang_key'][$num];
        $langKey = 'ACCORSYS_LC_GETMESSAGE_'.$arValues['lc_menu_lang_key'][$num];
        foreach($arItemName as $lang=>$name){
            $filePath = str_replace('#LANG#',$lang,$fileLang);
            /*
             * $filePath <- ���� �� �����
             * $key <- ����� ���� �����
             * $name <- �����
             */
            $localeObject->setTagInFile($key, $name, $filePath);
        }
        $val = $langKey;
    }elseif(count($arTempName)>1){
        $arParams = array("change_case"=>"U");
        $key = 'LC_MENU_' . Cutil::translit($nameItem,LANGUAGE_ID,$arParams).'_'.strtoupper($addPrefix);

        $langKey = 'ACCORSYS_LC_GETMESSAGE_'.$key;
        foreach($arItemName as $lang=>$name){
            $filePath = str_replace('#LANG#',$lang,$fileLang);
            /*
             * $filePath <- ���� �� �����
             * $key <- ����� ���� �����
             * $name <- �����
             */
            $localeObject->setTagInFile($key, $name, $filePath);
        }
        $val = $langKey;
    }else{
        $val = current($arItemName);
    }
    return $val;
}
function replaceAccorsysLClang($fileMenu){
    $text = $fileMenu;

    $pattern = "/(\'|\")(ACCORSYS_LC_GETMESSAGE_[^\s]{0,})(\'|\")/";
    $flag = CLocale::preg_match_all($pattern, $text, $matches,PREG_OFFSET_CAPTURE);

    if($flag){
        $arReplace = array();
        foreach($matches[0] as $arGetMessageText){
            $arReplace[] = array(
                "SEARCH"=>$arGetMessageText[0],
                "REPLACE"=>"GetMessage(".str_replace('ACCORSYS_LC_GETMESSAGE_','',$arGetMessageText[0]).")",
            );
        }
        if(count($arReplace)>0){
            foreach($arReplace as $val){
                $text = str_replace($val['SEARCH'],$val['REPLACE'],$text);
            }
        }
    }

    return $text;
}
?>
<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin_js.php");
?>
