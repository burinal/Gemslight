<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
CJSCore::Init(array("jquery"));
$arDefLangSite = CSite::GetList($by = "sort", $order = "asc",array("ID"=>SITE_ID))->getNext();
$defLangSite = $arDefLangSite["LANGUAGE_ID"];
include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');

function SetPrologPropertyLocalization($prolog, $property_key, $property_val)
{
    if (CLocale::preg_match("'(\\\$APPLICATION->SetPageProperty\\(\"".preg_quote(EscapePHPString($property_key), "'")."\" *, *)(.*?)(?<!\\\\)(\\);[\r\n]*)'i", $prolog, $regs))
    {
        if (strlen($property_val)<=0)
            $prolog = str_replace($regs[1].$regs[2].$regs[3], "", $prolog);
        else
            $prolog = str_replace($regs[1].$regs[2].$regs[3], $regs[1].$property_val.$regs[3], $prolog);
    }
    else
    {
        if (strlen($property_val)>0)
        {
            $p = strpos($prolog, "prolog_before");
            if($p===false)
                $p = strpos($prolog, "prolog.php");
            if($p===false)
                $p = strpos($prolog, "header.php");
            if($p!==false)
            {
                $p = strpos(substr($prolog, $p), ")") + $p;
                $prolog = substr($prolog, 0, $p+1).";\n\$APPLICATION->SetPageProperty(\"".EscapePHPString($property_key)."\", ".$property_val.")".substr($prolog, $p+1);
            }
        }
    }
    return $prolog;
}

function SetPrologTitleLocalization($prolog, $title)
{
    if(CLocale::preg_match('/
		(\$APPLICATION->SetTitle\()
		((.*))
		(\);)
		/ix', $prolog, $regs)
    )
    {
        $prolog = str_replace($regs[0], $regs[1]."".$title.");", $prolog);
    }
    else
    {
        $p = strpos($prolog, "prolog_before");
        if($p===false)
            $p = strpos($prolog, "prolog.php");
        if($p===false)
            $p = strpos($prolog, "header.php");

        if($p===false)
        {
            if(strlen($title)<=0)
                $prolog = preg_replace("#<title>[^<]*</title>#i", "", $prolog);
            elseif(CLocale::preg_match("#<title>[^<]*</title>#i", $prolog))
                $prolog = preg_replace("#<title>[^<]*</title>#i", "<title><?=".$title."?></title>", $prolog);
            else
                $prolog = $prolog."\n<title><?".$title."?></title>\n";
        }
        else
        {
            $p = strpos(substr($prolog, $p), ")") + $p;
            $prolog = substr($prolog, 0, $p+1).";\n\$APPLICATION->SetTitle(".$title.")".substr($prolog, $p+1);
        }
    }
    return $prolog;
}

function getPageTitleLocalization($filesrc, $prolog = false)
{

    if ($prolog === false)
    {
        $chunks = PHPParser::getPhpChunks($filesrc, 1);
        if (!empty($chunks))
            $prolog = &$chunks[0];
        else
            $prolog = '';
    }

    $title = false;
    if ($prolog != '')
    {
        if(CLocale::preg_match("/\\\$APPLICATION->SetTitle\\s*\\(\\s*(.*?)(?<!\\\\)\\s*\\);/is", $prolog, $regs))
            $title = UnEscapePHPString($regs[1]);
        elseif(CLocale::preg_match("/\\\$APPLICATION->SetTitle\\s*\\(\\s*(.*?)(?<!\\\\)\\s*\\);/is", $prolog, $regs))
            $title = UnEscapePHPString($regs[1]);
        elseif(CLocale::preg_match("'<title[^>]*>([^>]+)</title[^>]*>'i", $prolog, $regs))
            $title = $regs[1];
    }

    if(!$title && CLocale::preg_match("'<title[^>]*>([^>]+)</title[^>]*>'i", $filesrc, $regs))
        $title = $regs[1];

    $prop_string = $title;
    if($prop_string[0] == '"' || $prop_string[0] == "'"){
        $prop_string = substr($prop_string,1);
        $prop_string = substr($prop_string,0,strlen($prop_string)-1);
    }

    return $prop_string;
}

function ParseFileContentLocalization($filesrc, $params = array())
{
    /////////////////////////////////////
    // Parse prolog, epilog, title
    /////////////////////////////////////
    $filesrc = trim($filesrc);
    $prolog = $epilog = '';

    $php_doubleq = false;
    $php_singleq = false;
    $php_comment = false;
    $php_star_comment = false;
    $php_line_comment = false;

    $php_st = "<"."?";
    $php_ed = "?".">";
    if($params["use_php_parser"] && substr($filesrc, 0, 2) == $php_st)
    {
        $phpChunks = PHPParser::getPhpChunks($filesrc);
        if (!empty($phpChunks))
        {
            $prolog = $phpChunks[0];
            $filesrc = substr($filesrc, strlen($prolog));
        }
    }
    elseif(substr($filesrc, 0, 2)==$php_st)
    {
        $fl = strlen($filesrc);
        $p = 2;
        while($p < $fl)
        {
            $ch2 = substr($filesrc, $p, 2);
            $ch1 = substr($ch2, 0, 1);

            if($ch2==$php_ed && !$php_doubleq && !$php_singleq && !$php_star_comment)
            {
                $p+=2;
                break;
            }
            elseif(!$php_comment && $ch2=="//" && !$php_doubleq && !$php_singleq)
            {
                $php_comment = $php_line_comment = true;
                $p++;
            }
            elseif($php_line_comment && ($ch1=="\n" || $ch1=="\r" || $ch2=="?>"))
            {
                $php_comment = $php_line_comment = false;
            }
            elseif(!$php_comment && $ch2=="/*" && !$php_doubleq && !$php_singleq)
            {
                $php_comment = $php_star_comment = true;
                $p++;
            }
            elseif($php_star_comment && $ch2=="*/")
            {
                $php_comment = $php_star_comment = false;
                $p++;
            }
            elseif(!$php_comment)
            {
                if(($php_doubleq || $php_singleq) && $ch2=="\\\\")
                {
                    $p++;
                }
                elseif(!$php_doubleq && $ch1=='"')
                {
                    $php_doubleq=true;
                }
                elseif($php_doubleq && $ch1=='"' && substr($filesrc, $p-1, 1)!='\\')
                {
                    $php_doubleq=false;
                }
                elseif(!$php_doubleq)
                {
                    if(!$php_singleq && $ch1=="'")
                    {
                        $php_singleq=true;
                    }
                    elseif($php_singleq && $ch1=="'" && substr($filesrc, $p-1, 1)!='\\')
                    {
                        $php_singleq=false;
                    }
                }
            }

            $p++;
        }

        $prolog = substr($filesrc, 0, $p);
        $filesrc = substr($filesrc, $p);
    }
    elseif(CLocale::preg_match("'(.*?<title>.*?</title>)(.*)$'is", $filesrc, $reg))
    {
        $prolog = $reg[1];
        $filesrc= $reg[2];
    }

    $title = getPageTitleLocalization($filesrc, $prolog);

    $arPageProps = array();
    if(strlen($prolog))
    {
        if (CLocale::preg_match_all("'\\\$APPLICATION->SetPageProperty\\(\"(.*?)(?<!\\\\)\" *, *(.*?)(?<!\\\\)\\);'i", $prolog, $out))
        {
            foreach ($out[1] as $i => $m1){
                $prop_string = trim(UnEscapePHPString($out[2][$i]));
                if($prop_string[0] == '"' || $prop_string[0] == "'"){
                    $prop_string = substr($prop_string,1);
                    $prop_string = substr($prop_string,0,strlen($prop_string)-1);
                }
                $arPageProps[UnEscapePHPString($m1)] = $prop_string;
            }
        }
    }

    if(substr($filesrc, -2) == "?".">")
    {
        if (isset($phpChunks) && count($phpChunks) > 1)
        {
            $epilog = $phpChunks[count($phpChunks)-1];
            $filesrc = substr($filesrc, 0, -strlen($epilog));
        }
        else
        {
            $p = strlen($filesrc) - 2;
            $php_start = "<"."?";
            while(($p > 0) && (substr($filesrc, $p, 2) != $php_start))
                $p--;
            $epilog = substr($filesrc, $p);
            $filesrc = substr($filesrc, 0, $p);
        }
    }

    return array(
        "PROLOG" => $prolog,
        "TITLE" => $title,
        "PROPERTIES" => $arPageProps,
        "CONTENT" => $filesrc,
        "EPILOG" => $epilog,
    );
}

CLocale::includeLocaleLangFiles();

/* ��� ��������� ���� � �������� ������������ ������ ��� �������� �������� - $arAliasLangsForTranslate */
include($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/include/array_aliases_for_translate.php');

$popupWindow = new CJSPopup(GetMessage("LC_PAGE_PROP_WINDOW_TITLE"), array("SUFFIX"=>($_GET['subdialog'] == 'Y'? 'subdialog':'')));
if(IsModuleInstalled("fileman"))
{
	if (!$USER->CanDoOperation('fileman_admin_files') && !$USER->CanDoOperation('fileman_edit_existent_files'))
		$popupWindow->ShowError(GetMessage("LC_PAGE_PROP_ACCESS_DENIED"));
}

$io = CBXVirtualIo::GetInstance();

//Page path
$path = "/";
if (isset($_REQUEST["path"]) && strlen($_REQUEST["path"]) > 0)
	$path = $io->CombinePath("/", $_REQUEST["path"]);

//Lang
if (!isset($_REQUEST["lang"]) || strlen($_REQUEST["lang"]) <= 0)
	$lang = LANGUAGE_ID;

//BackUrl
$back_url = (isset($_REQUEST["back_url"]) ? $_REQUEST["back_url"] : "");

//Site ID
$site = SITE_ID;
if (isset($_REQUEST["site"]) && strlen($_REQUEST["site"]) > 0)
{
	$obSite = CSite::GetByID($_REQUEST["site"]);
	if ($arSite = $obSite->Fetch())
		$site = $_REQUEST["site"];
}

$documentRoot = CSite::GetSiteDocRoot($site);
$absoluteFilePath = $documentRoot.$path;
$filePathToPageLocale = $path;

//Check permissions
if (!$io->FileExists($absoluteFilePath) && !$io->DirectoryExists($absoluteFilePath))
	$popupWindow->ShowError(GetMessage("LC_PAGE_PROP_FILE_NOT_FOUND")." (".htmlspecialcharsbx($path).")");
elseif (!$USER->CanDoFileOperation('fm_edit_existent_file',Array($site, $path)))
	$popupWindow->ShowError(GetMessage("LC_PAGE_PROP_ACCESS_DENIED"));

$f = $io->GetFile($absoluteFilePath);
$fileContent = $f->GetContents();

$strWarning = "";
$arLangs = CLocale::GetSiteLangs($_REQUEST['site']);
ksort($arLangs);

//Save page settings
if ($_SERVER["REQUEST_METHOD"] == "POST" && !check_bitrix_sessid())
{
	CUtil::JSPostUnescape();
	$strWarning = GetMessage("MAIN_SESSION_EXPIRED");
}
elseif($_SERVER["REQUEST_METHOD"] == "POST" && isset($_REQUEST["save"]))
{
	CUtil::JSPostUnescape();
    $localeObject = new CLocale();
    $templateID = $_REQUEST["templateId"];
    $pathToPage = $_REQUEST["pathtopage"];

	//Title
    if(isset($_REQUEST["pageTitle"])){
        $isNeedLang = false;
        $isFirst = true;
        foreach($arLangs as $lang){
            if($isFirst)
                $anylang = $_REQUEST["pageTitle"][$lang["LID"]];
            if(!$isFirst){
                if(trim($_REQUEST["pageTitle"][$lang["LID"]]) == "")
                    continue;
                if(trim($anylang) == trim($_REQUEST["pageTitle"][$lang["LID"]])){
                    $anylang = $_REQUEST["pageTitle"][$lang["LID"]];
                }else{
                    $isNeedLang = true;
                    break;
                }
            }
            $isFirst = false;
        }

        if($isNeedLang){
            if(!isset($_REQUEST['pageTitleLangKey'])){
                $_REQUEST['pageTitleLangKey'] =
                    "ACCORSYS_HEAD_LOCALE_TITLE".strtoupper(str_replace('/', '_', $filePathToPageLocale));
            }
            $fileContent = SetPrologTitleLocalization($fileContent, 'GetMessage("'.$_REQUEST['pageTitleLangKey'].'")');
            foreach($arLangs as $lang){
                $name = $_REQUEST["pageTitle"][$lang["LID"]];
                $filePath = $_SERVER['DOCUMENT_ROOT'].'/bitrix/templates/'.$templateID.'/lang/'.$lang['LID'].'/header.php';
                $localeObject->setTagInFile($_REQUEST['pageTitleLangKey'], $name, $filePath);
            }
        }elseif(isset($_REQUEST["pageTitle"]) && strlen($anylang) > 0){
            $fileContent = SetPrologTitleLocalization($fileContent, '"'.trim(str_replace(array('"',"'",),array('\"',"\'"),$anylang)).'"');
        }else{
            $fileContent = SetPrologTitleLocalization($fileContent, '""');
        }
    }


	//Properties
	if (isset($_REQUEST["PROPERTY"]) && is_array($_REQUEST["PROPERTY"]))
	{
		foreach ($_REQUEST["PROPERTY"] as $arProperty)
		{
			$arProperty["CODE"] = (isset($arProperty["CODE"]) ? trim($arProperty["CODE"]) : "");

            $isNeedLang = false;
            $isFirst = true;
            foreach($arLangs as $lang){
                if($isFirst)
                    $crossLang = $arProperty["VALUE"][$lang["LID"]];
                if(!$isFirst){
                    if(trim($arProperty["VALUE"][$lang["LID"]]) == "")
                        continue;
                    if(trim($crossLang) == trim($arProperty["VALUE"][$lang["LID"]])){
                        $crossLang = $arProperty["VALUE"][$lang["LID"]];
                    }else{
                        $isNeedLang = true;
                        break;
                    }
                }
                $isFirst = false;
            }

            if($isNeedLang){
                if(!isset($arProperty["LANG_KEY"])){
                    $arProperty["LANG_KEY"] = "ACCORSYS_PROPS_LOCALE_".strtoupper($arProperty["CODE"]).strtoupper(str_replace('/', '_', $filePathToPageLocale));
                }
                if(CLocale::preg_match("/[a-zA-Z_-~]+/i", $arProperty["CODE"])){
                    foreach($arLangs as $lang){
                        $name = (isset($arProperty["VALUE"][$lang["LID"]]) ? trim($arProperty["VALUE"][$lang["LID"]]) : "");
                        $filePath = $_SERVER['DOCUMENT_ROOT'].'/bitrix/templates/'.$templateID.'/lang/'.$lang['LID'].'/header.php';
                        $localeObject->setTagInFile($arProperty["LANG_KEY"], $name, $filePath);
                    }
                }
                $fileContent = SetPrologPropertyLocalization($fileContent, $arProperty["CODE"], 'GetMessage("'.$arProperty["LANG_KEY"].'")');
            }elseif(CLocale::preg_match("/[a-zA-Z_-~]+/i", $arProperty["CODE"]) ){
                $fileContent = SetPrologPropertyLocalization($fileContent, $arProperty["CODE"], '"'.str_replace(array('"',"'",),array('\"',"\'"),$crossLang).'"');
            }
		}
	}

	//Tags
	if (isset($_REQUEST["TAGS"]) && IsModuleInstalled("search"))
		$fileContent = SetPrologProperty($fileContent, COption::GetOptionString("search", "page_tag_property","tags"), $_REQUEST["TAGS"]);

    if(isset($_REQUEST["TAGS"]) && IsModuleInstalled("search")){
        $isNeedLang = false;
        $isFirst = true;
        foreach($arLangs as $lang){
            if($isFirst)
                $crossLang = $_REQUEST["TAGS"][$lang["LID"]];
            if(!$isFirst){
                if(trim($_REQUEST["TAGS"][$lang["LID"]]) == "")
                    continue;
                if(trim($crossLang) == trim($_REQUEST["TAGS"][$lang["LID"]])){
                    $crossLang = $_REQUEST["TAGS"][$lang["LID"]];
                }else{
                    $isNeedLang = true;
                    break;
                }
            }
            $isFirst = false;
        }
        if($isNeedLang){
            if(!isset($_REQUEST['TAGS']["LANG_KEY"])){
                $_REQUEST['TAGS']["LANG_KEY"] = "ACCORSYS_PROPS_LOCALE_TAGS".strtoupper(str_replace('/', '_', $filePathToPageLocale));
            }
            $fileContent = SetPrologPropertyLocalization($fileContent, COption::GetOptionString("search", "page_tag_property","tags"), 'GetMessage("'.$_REQUEST["TAGS"]["LANG_KEY"].'")');
            foreach($arLangs as $lang){
                $name = $_REQUEST["TAGS"][$lang["LID"]];
                $filePath = $_SERVER['DOCUMENT_ROOT'].'/bitrix/templates/'.$templateID.'/lang/'.$lang['LID'].'/header.php';
                $localeObject->setTagInFile($_REQUEST['TAGS']["LANG_KEY"], $name, $filePath);
            }
        }else{
            $fileContent = SetPrologPropertyLocalization($fileContent, COption::GetOptionString("search", "page_tag_property","tags"), '"'.str_replace(array('"',"'",),array('\"',"\'"),$crossLang).'"');
        }
    }

	$f = $io->GetFile($absoluteFilePath);
	$arUndoParams = array(
		'module' => 'fileman',
		'undoType' => 'edit_file',
		'undoHandler' => 'CFileman::UndoEditFile',
		'arContent' => array(
			'absPath' => $absoluteFilePath,
			'content' => $f->GetContents()
		)
	);
	$success = $APPLICATION->SaveFileContent($absoluteFilePath, $fileContent);

	if ($success === false && ($exception = $APPLICATION->GetException()))
		$strWarning = $exception->msg;
	else
	{
		CUndo::ShowUndoMessage(CUndo::Add($arUndoParams));

		if($_GET['subdialog'] == 'Y')
			echo "<script>structReload('".urlencode($_REQUEST["path"])."');</script>";
		$popupWindow->Close($bReload=($_GET['subdialog'] <> 'Y'), $back_url);
		die();
	}
}

//Properties from fileman settings
$arFilemanProperties = Array();
if (CModule::IncludeModule("fileman") && is_callable(Array("CFileMan", "GetPropstypes")))
	$arFilemanProperties = CFileMan::GetPropstypes($site);

//Properties from page
$arDirProperties = Array();
if ($strWarning != "")
{
	//Restore post values if error occured
	$pageTitle = (isset($_REQUEST["pageTitle"]) && strlen($_REQUEST["pageTitle"]) > 0 ? $_REQUEST["pageTitle"] : "");

	if (isset($_REQUEST["PROPERTY"]) && is_array($_REQUEST["PROPERTY"]))
	{
		foreach ($_REQUEST["PROPERTY"] as $arProperty)
		{
			if (isset($arProperty["VALUE"]) && strlen($arProperty["VALUE"]) > 0)
				$arDirProperties[$arProperty["CODE"]] = $arProperty["VALUE"];
		}
	}
}
else
{
	$arPageSlice = ParseFileContentLocalization($fileContent);
    $arPageSlice["PROPERTIES"]["TITLE_MAIN"] = $arPageSlice["TITLE"];
    foreach($arPageSlice["PROPERTIES"] as $key => $pageSlice){
        if(stripos($pageSlice,"getmessage") !== false){
            $propMatches = array();
            CLocale::preg_match("/\(\"(.*)\"/msU",$pageSlice,$propMatches);
            $prop_string = $propMatches[0];
            if($prop_string[0] == '(' || $prop_string[0] == "("){
                $prop_string = substr($propMatches[0],2);
                $prop_string = substr($prop_string,0,strlen($prop_string)-1);
            }
            $arPageSlice["PROPERTIES"][$key] = "ACCORSYS_LANG_KEY_".$prop_string;
        }
    }

    $pageTitle = $arPageSlice["PROPERTIES"]["TITLE_MAIN"];
    unset($arPageSlice["PROPERTIES"]["TITLE_MAIN"]);
	$arDirProperties = $arPageSlice["PROPERTIES"];
}


//All properties for file. Includes properties from root folders
$arInheritProperties = $APPLICATION->GetDirPropertyList(Array($site, $path));

if ($arInheritProperties === false)
	$arInheritProperties = Array();

//Tags
if (IsModuleInstalled("search"))
{
	$tagPropertyCode = COption::GetOptionString("search", "page_tag_property","tags");
	$tagPropertyValue = "";

	if ($strWarning != "" && isset($_REQUEST["TAGS"]) && strlen($_REQUEST["TAGS"]) > 0) //Restore post value if error occured
		$tagPropertyValue = $_REQUEST["TAGS"];
	elseif (array_key_exists($tagPropertyCode, $arDirProperties))
		$tagPropertyValue = $arDirProperties[$tagPropertyCode];

	unset($arFilemanProperties[$tagPropertyCode]);
	unset($arDirProperties[$tagPropertyCode]);
	unset($arInheritProperties[strtoupper($tagPropertyCode)]);
}

//Delete equal properties
$arGlobalProperties = Array();
foreach ($arFilemanProperties as $propertyCode => $propertyDesc)
{
	if (array_key_exists($propertyCode, $arDirProperties))
		$arGlobalProperties[$propertyCode] = $arDirProperties[$propertyCode];
	else
		$arGlobalProperties[$propertyCode] = "";

	unset($arDirProperties[$propertyCode]);
	unset($arInheritProperties[strtoupper($propertyCode)]);
}
foreach ($arDirProperties as $propertyCode => $propertyValue)
	unset($arInheritProperties[strtoupper($propertyCode)]);
?>


<?
//HTML Output
$popupWindow->ShowTitlebar(GetMessage("LC_PAGE_PROP_WINDOW_TITLE"));
$popupWindow->StartDescription("bx-property-page");

if ($strWarning != "")
	$popupWindow->ShowValidationError($strWarning);
?>

<p><?=GetMessage("LC_PAGE_PROP_WINDOW_TITLE")?> <b><?=htmlspecialcharsbx($path)?></b></p>

<?if (IsModuleInstalled("fileman")):?>
	<p><a href="/bitrix/admin/fileman_html_edit.php?lang=<?=urlencode($lang)?>&site=<?=urlencode($site)?>&path=<?=urlencode($path)?>&back_url=<?=urlencode($back_url)?>"><?=GetMessage("LC_PAGE_PROP_EDIT_IN_ADMIN")?></a></p>
<?endif?>

<?
$popupWindow->EndDescription();
$popupWindow->StartContent();

$templateID = $_REQUEST["templateId"];

?>
<style>
    .myLocalePropsTable .locale-spacer > td {
        border-top: 1px solid #ccc;
        padding-top: 10px;
        padding-bottom:0px;
    }
    .bx-width30 {
      padding: 24px 0 0 10px;
    }
    .bx-width30 + td {
        padding: 20px 0 19px;
    }

</style>
<script type="text/javascript" src="/bitrix/js/main/hot_keys.js"></script>
<table class="bx-width100 myLocalePropsTable" id="bx_page_properties" cellspacing="0" cellpadding="0">

	<tr class="section">
		<td colspan="2"><?=GetMessage("LC_PAGE_PROP_FOLDER_NAME")?></td>
	</tr>

	<tr style="height:214px; padding-top: 12px;">
		<td valign="top" class=" bx-width30"><?=GetMessage("LC_PAGE_PROP_NAME")?>:</td>
		<td>
            <?
            $isToLang = false;
            foreach($arLangs as $lang){
                $langPageTitle = $pageTitle;
                if(stripos($pageTitle,"ACCORSYS_LANG_KEY_") !== false){
                    $tempMessage = $MESS;
                    $MESS = array();
                    $filePath = $_SERVER['DOCUMENT_ROOT'].'/bitrix/templates/'.$templateID.'/lang/'.$lang['LID'].'/header.php';
                    if(file_exists($filePath)){
                        include($filePath);
                    }
                    $langPageTitle = $MESS[str_replace("ACCORSYS_LANG_KEY_","",$pageTitle)];
                    $isToLang = true;
                    $MESS = array();
                    $MESS = $tempMessage;
                }
                ?>

                <span class="locale-block block-<?=$lang["LID"]?>">
                    <span class="locale-select">
                        <div class="locale-select-wrapp-pp">
                            <span title="<?=$arAccorsysLocaleLangs[$lang['LID']].($defLangSite == $lang['LID'] ? ' - '.GetMessage("LC_BY_DEFAULT"):"").'"' . strtoupper($lang['LID'])?>">
                                <span class="lang-span-text"><?=strtoupper($lang['LID'])?></span>
                                <i style="margin-right:8px;margin-top:7px;" class="ico-flag-<?=strtoupper($lang['LID'])?>"></i>
                            </span>
                            <textarea  data-lang="<?=$arAliasLangsForTranslate[$lang["LID"]]?>" name="pageTitle[<?=$lang["LID"]?>]"><?=htmlspecialcharsEx($langPageTitle)?></textarea>
                            <ul class="selectblock" style="display: none;"></ul>
                            <div class="locale-click-wrapper">
                                <a class="locale-click-arrow" href="#"></a> <!--если кнопка не активна - добавить класс "disabled"-->
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
            <?}
            if($isToLang){?>
                <input type="hidden" value="<?=str_replace("ACCORSYS_LANG_KEY_","",$pageTitle)?>" name="pageTitleLangKey">
            <?}?>
        </td>
	</tr>

	<tr class="empty">
		<td colspan="2"><div class="empty"></div></td>
	</tr>

<?if (!empty($arGlobalProperties) || !empty($arDirProperties) || !empty($arInheritProperties)):?>

	<tr class="section">
		<td colspan="2">
			<table cellspacing="0">
				<tr>
					<td><?=GetMessage("LC_PAGE_PROP_WINDOW_TITLE")?></td>
					<td id="bx_page_prop_name">&nbsp;</td>
				</tr>
			</table>
		</td>
	</tr>

<?endif?>

<?
$propertyIndex = 0;
$jsInheritPropIds = "var jsInheritProps = [";

foreach ($arGlobalProperties as $propertyCode => $propertyValue):?>
	<tr style="height:214px;">
		<td valign="top" class="bx-width30"><?=(
			strlen($arFilemanProperties[$propertyCode]) > 0 ? 
				htmlspecialcharsEx($arFilemanProperties[$propertyCode]) : 
				htmlspecialcharsEx($propertyCode))
		?>:</td>
		<td>
            <?$inheritValue = $APPLICATION->GetDirProperty($propertyCode, Array($site, $path));?>

            <?/*if (strlen($inheritValue) > 0 && strlen($propertyValue) <= 0):
                $jsInheritPropIds .= ",".$propertyIndex;
            ?>

                <input type="hidden" name="PROPERTY[<?=$propertyIndex?>][CODE]" value="<?=htmlspecialcharsEx($propertyCode)?>" />

                <div id="bx_view_property_<?=$propertyIndex?>" style="overflow:hidden;padding:2px 12px 2px 2px; border:1px solid white; width:90%; cursor:text; box-sizing:border-box; -moz-box-sizing:border-box;background-color:transparent; background-position:right; background-repeat:no-repeat;" onclick="BXEditProperty(<?=$propertyIndex?>)" onmouseover="this.style.borderColor = '#434B50 #ADC0CF #ADC0CF #434B50';" onmouseout="this.style.borderColor = 'white'" class="edit-field"><?=htmlspecialcharsEx($inheritValue)?></div>

                <div id="bx_edit_property_<?=$propertyIndex?>" style="display:none;"></div>

            <?else:*/?>

                <?
                $isToLang = false;
                foreach($arLangs as $lang){
                    $langPropertyValue = $propertyValue;

                    if(stripos($propertyValue,"ACCORSYS_LANG_KEY_") !== false){
                        $tempMessage = $MESS;
                        $MESS = array();

                        $filePath = $_SERVER['DOCUMENT_ROOT'].'/bitrix/templates/'.$templateID.'/lang/'.$lang['LID'].'/header.php';
                        if(file_exists($filePath)){
                            include($filePath);
                        }
                        $langPropertyValue = $MESS[str_replace("ACCORSYS_LANG_KEY_","",$propertyValue)];
                        $isToLang = true;
                        $MESS = array();
                        $MESS = $tempMessage;
                    }
                    ?>
                    <span class="locale-block block-<?=$lang["LID"]?>">
                        <span class="locale-select">
                            <div class="locale-select-wrapp-pp">
                                <span title="<?=$arAccorsysLocaleLangs[$lang['LID']].($defLangSite == $lang['LID'] ? ' - '.GetMessage("LC_BY_DEFAULT"):"").'"' . strtoupper($lang['LID'])?>">
                                    <span class="lang-span-text"><?=strtoupper($lang['LID'])?></span>
                                    <i style="margin-right:8px;margin-top:7px;" class="ico-flag-<?=strtoupper($lang['LID'])?>"></i>
                                </span>
                                <textarea  data-lang="<?=$arAliasLangsForTranslate[$lang["LID"]]?>"name="PROPERTY[<?=$propertyIndex?>][VALUE][<?=$lang["LID"]?>]"><?=htmlspecialcharsEx($langPropertyValue)?></textarea>
                                <ul class="selectblock" style="display: none;"></ul>
                                <div class="locale-click-wrapper">
                                    <a class="locale-click-arrow" href="#"></a> <!--если кнопка не активна - добавить класс "disabled"-->
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
                <?}
                if($isToLang){
                    ?><input type="hidden" value="<?=str_replace("ACCORSYS_LANG_KEY_","",$propertyValue)?>" name="PROPERTY[<?=$propertyIndex?>][LANG_KEY]"><?
                }
                ?>
                <input type="hidden" name="PROPERTY[<?=$propertyIndex?>][CODE]" value="<?=htmlspecialcharsEx($propertyCode)?>" />
            <?/*endif*/?>
		</td>
	</tr>
    <tr class="locale-spacer"><td colspan="2"></td></tr>

<?$propertyIndex++; endforeach;?>

<?/*foreach ($arInheritProperties as $propertyCode => $propertyValue): $jsInheritPropIds .= ",".$propertyIndex;?>

	<tr style="height:30px;">
		<td class="bx-popup-label bx-width30"><?=htmlspecialcharsEx($propertyCode)?>:</td>
		<td>

			<input type="hidden" name="PROPERTY[<?=$propertyIndex?>][CODE]" value="<?=htmlspecialcharsEx($propertyCode)?>" />

			<div id="bx_view_property_<?=$propertyIndex?>" style="overflow:hidden;padding:2px 12px 2px 2px; border:1px solid white; width:90%; cursor:text; box-sizing:border-box; -moz-box-sizing:border-box;background-color:transparent; background-position:right; background-repeat:no-repeat;" onclick="BXEditProperty(<?=$propertyIndex?>)" onmouseover="this.style.borderColor = '#434B50 #ADC0CF #ADC0CF #434B50'" onmouseout="this.style.borderColor = 'white'" class="edit-field"><?=htmlspecialcharsEx($propertyValue)?></div>

			<div id="bx_edit_property_<?=$propertyIndex?>" style="display:none;"></div>

		</td>
	</tr>
    <tr class="locale-spacer"><td colspan="2"></td></tr>

<?$propertyIndex++; endforeach; */?>

<?foreach ($arDirProperties as $propertyCode => $propertyValue):?>

		<tr id="bx_user_property_<?=$propertyIndex?>">
			<td class="bx-width30"><?=htmlspecialcharsEx(ToUpper($propertyCode))?><input type="hidden" name="PROPERTY[<?=$propertyIndex?>][CODE]" value="<?=htmlspecialcharsEx(ToUpper($propertyCode))?>" />:</td>
			<td>
                <?
                $isToLang = false;
                foreach($arLangs as $lang){
                    $langPropertyValue = $propertyValue;
                    if(stripos($propertyValue,"ACCORSYS_LANG_KEY_") !== false){
                        $tempMessage = $MESS;
                        $MESS = array();
                        $filePath = $_SERVER['DOCUMENT_ROOT'].'/bitrix/templates/'.$templateID.'/lang/'.$lang['LID'].'/header.php';
                        if(file_exists($filePath)){
                            include($filePath);
                        }
                        $langPropertyValue = $MESS[str_replace("ACCORSYS_LANG_KEY_","",$propertyValue)];
                        $isToLang = true;
                        $MESS = array();
                        $MESS = $tempMessage;
                    }?>
                    <span class="locale-block block-<?=$lang["LID"]?>">
                        <span class="locale-select">
                            <div class="locale-select-wrapp-pp">
                                <span title="<?=$arAccorsysLocaleLangs[$lang['LID']].($defLangSite == $lang['LID'] ? ' - '.GetMessage("LC_BY_DEFAULT"):"").'"' . strtoupper($lang['LID'])?>">
                                    <span class="lang-span-text"><?=strtoupper($lang['LID'])?></span>
                                    <i style="margin-right:8px;margin-top:7px;" class="ico-flag-<?=strtoupper($lang['LID'])?>"></i>
                                </span>
                                <textarea  data-lang="<?=$arAliasLangsForTranslate[$lang["LID"]]?>" name="PROPERTY[<?=$propertyIndex?>][VALUE][<?=$lang["LID"]?>]"><?=htmlspecialcharsEx($langPropertyValue)?></textarea>
                                <ul class="selectblock" style="display: none;"></ul>
                                <div style="float:none;margin-top: -100px;margin-left: 488px;width: 13px;position:relative;" class="locale-click-wrapper">
                                    <a style='background-size:13px auto;height:29px;' class="locale-click-arrow" href="#"></a> <!--если кнопка не активна - добавить класс "disabled"-->
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
                <?}
                if($isToLang){
                    ?><input type="hidden" value="<?=str_replace("ACCORSYS_LANG_KEY_","",$propertyValue)?>" name="PROPERTY[<?=$propertyIndex?>][LANG_KEY]"><?
                }
                ?>
            </td>
		</tr>
        <tr class="locale-spacer"><td colspan="2"></td></tr>

<?
$propertyIndex++; 
endforeach;
$jsInheritPropIds .= "];"
?>

<?if (CModule::IncludeModule("search") && isset($tagPropertyCode)):?>
	<tr class="empty">
		<td colspan="2"><div class="empty"></div></td>
	</tr>
	<tr class="section">
		<td colspan="2">
			<table cellspacing="0">
				<tr>
					<td><?=GetMessage("LC_PAGE_PROP_TAGS_NAME")?></td>
					<td id="bx_page_tags">&nbsp;</td>
				</tr>
			</table>
		</td>
	</tr>

		<tr>
			<td valign="top" class="bx-width30"><?=GetMessage("LC_PAGE_PROP_TAGS")?>:</td>
			<td>
                <?
                $isToLang = false;
                foreach($arLangs as $lang){
                    $langPropertyValue = $tagPropertyValue;
                    if(stripos($tagPropertyValue,"ACCORSYS_LANG_KEY_") !== false){
                        $tempMessage = $MESS;
                        $MESS = array();
                        $filePath = $_SERVER['DOCUMENT_ROOT'].'/bitrix/templates/'.$templateID.'/lang/'.$lang['LID'].'/header.php';
                        if(file_exists($filePath)){
                            include($filePath);
                        }
                        $langPropertyValue = $MESS[str_replace("ACCORSYS_LANG_KEY_","",$tagPropertyValue)];
                        $isToLang = true;
                        $MESS = array();
                        $MESS = $tempMessage;
                    }?>
                    <span class="locale-block block-<?=$lang["LID"]?>">
                        <span class="locale-select">
                            <div class="locale-select-wrapp-pp">
                                <span title="<?=$arAccorsysLocaleLangs[$lang['LID']].($defLangSite == $lang['LID'] ? ' - '.GetMessage("LC_BY_DEFAULT"):"").'"' . strtoupper($lang['LID'])?>">
                                    <span class="lang-span-text"><?=strtoupper($lang['LID'])?></span>
                                    <i style="margin-right:8px;margin-top:7px;" class="ico-flag-<?=strtoupper($lang['LID'])?>"></i>
                                </span>
                                <textarea  data-lang="<?=$arAliasLangsForTranslate[$lang["LID"]]?>" name="TAGS[<?=$lang["LID"]?>]"><?=htmlspecialcharsEx($langPropertyValue)?></textarea>
                                <ul class="selectblock" style="display: none;"></ul>
                                <div  class="locale-click-wrapper">
                                    <a class="locale-click-arrow" href="#"></a> <!--если кнопка не активна - добавить класс "disabled"-->
                                    <div class="locale_popup">
                                        <span  class="locale_popup_angle"></span>
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
                <?}
                if($isToLang){
                    ?><input type="hidden" value="<?=str_replace("ACCORSYS_LANG_KEY_","",$tagPropertyValue)?>" name="TAGS[LANG_KEY]"><?
                }
                ?>
            </td>
		</tr> 
<?endif?>

</table>
<input type="hidden" name="save" value="Y" />
<input type="hidden" name="templateId" value="<?=$templateID?>" />
<input type="hidden" name="pathtopage" value="<?=$pathToPage?>" />
<?
$popupWindow->EndContent();
$popupWindow->ShowStandardButtons();

?>
<script type="text/javascript">
    $('.myLocalePropsTable .locale-block').each(function(){
        if($(this).get(0))
            jqLoc($(this).get(0)).addLocaleFormHandlers();
    });

    window.BXBlurProperty = function(element, propertyIndex)
    {
        var viewProperty = document.getElementById("bx_view_property_" + propertyIndex);

        if (element.value == "" || element.value == viewProperty.innerHTML)
        {
            var editProperty = document.getElementById("bx_edit_property_" + propertyIndex);

            viewProperty.style.display = "block";
            editProperty.style.display = "none";

            while (editProperty.firstChild)
                editProperty.removeChild(editProperty.firstChild);
        }
    }

    window.BXEditProperty = function(propertyIndex)
    {
        if (document.getElementById("bx_property_input_" + propertyIndex))
            return;

        var editProperty = document.getElementById("bx_edit_property_" + propertyIndex);
        var viewProperty = document.getElementById("bx_view_property_" + propertyIndex);

        viewProperty.style.display = "none";
        editProperty.style.display = "block";

        var input = document.createElement("INPUT");

        input.type = "text";
        input.name = "PROPERTY["+propertyIndex+"][VALUE]";
        input.style.width = "90%";
        input.style.padding = "2px";
        input.id = "bx_property_input_" + propertyIndex;
        input.onblur = function () {BXBlurProperty(input,propertyIndex)};
        input.value = viewProperty.innerHTML;

        editProperty.appendChild(input);
        input.focus();
        input.select();

    }

    window.BXFolderEditHint = function()
    {
        var td = document.getElementById("bx_page_prop_name");
        if (td)
        {
            oBXHint = new BXHint("<?=GetMessage("PAGE_PROP_DESCIPTION")?>");
            td.appendChild(oBXHint.oIcon);
        }

        var td = document.getElementById("bx_page_tags");
        if (td)
        {
            oBXHint = new BXHint("<?=GetMessage("PAGE_PROP_TAGS_DESCIPTION")?>");
            td.appendChild(oBXHint.oIcon);
        }

        <?=$jsInheritPropIds?>

        for (var index = 0; index < jsInheritProps.length; index++)
            oBXHint = new BXHint("<?=GetMessage("PAGE_PROP_INHERIT_TITLE")?>", document.getElementById("bx_view_property_"+ jsInheritProps[index]), {"width":200});
    }

    window.BXFolderEditHint();

</script>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin_js.php");?>