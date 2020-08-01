<?
set_time_limit(120);
define("STOP_STATISTICS", true);
define("NO_KEEP_STATISTIC", true);
define("NOT_NEED_PROFILES", true);
define("NOT_NEED_BACKUPS",true);
define('LOCALE_MAX_CHECKED_CHECKBOX',2);
require_once $_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php';
global $USER;
if(!$USER->IsAdmin())
    die();
if(isset($_REQUEST["install_now"])){
    require_once $_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include.php';
    CModule::IncludeModule('accorsys.localization');
    $SL = new CAccorsysLS('accorsys.localization');
    $SL->getBuyLS();
    CAccorsysSettingsSL::write("accorsys.localization");
    if(CModule::IncludeModule("accorsys.localization")){
        CLocale::includeLocaleLangFiles();
        $LOCALE_ENGINE = new CLocale(true);
        if (CModule::IncludeModule("iblock")){
            $rsIBlock = CIBlock::GetList(false,Array("CODE" => $LOCALE_ENGINE->IBLOCK_CODE));
            if ($arIblock = $rsIBlock->GetNext()){

            }else{
                $LOCALE_ENGINE->CreateIBlock();
            }
        }
    }
    $dbConnPath = $_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/dbconn.php";
    $f = file_get_contents($dbConnPath);

    $dbConnString = '
/**DONT_TOUCHstartcreatedbylocalization**/
$GLOBALS["accorsys_localization_getmessage_heredoc"] = "GetMessage";
if (strpos($_SERVER["REQUEST_URI"],"/bitrix/admin/") !== 0) {
    $lcSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
    $curAliasURL = false;
    $arCurLang = array();
    $serverCurUrl = $_SERVER["REQUEST_SCHEME"]."://".$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
    foreach($lcSettings["alias_langs"] as $aliasSite => $aliasLangs){
        foreach($aliasLangs as $aliasValue){
            if(trim($aliasValue["mainURL"]) != ""){
                if(strpos($serverCurUrl,$aliasValue["mainURL"]) !== false){
                    $curAliasURL[] = array(
                        "url" => $aliasValue["mainURL"],
                        "lang" => $aliasValue["mainLANG"],
                        "subLANG" => $aliasValue["subLANG"]
                    );
                }
            }
        }
    }

    if($curAliasURL !== false){
        $longestUrl = "";
        $arCurLang = array();
        foreach($curAliasURL as $arVal){
            if(strlen($arVal["url"]) > strlen($longestUrl)){
                $longestUrl = $arVal["url"];
                $arCurLang = $arVal;
            }
        }
    }
    $currentLanguage = false;
    if(isset($_REQUEST["lang"])){
        $currentLanguage = $_REQUEST["lang"];
    }elseif(isset($_COOKIE["current_language"]) && (array_search($_COOKIE["current_language"],$arCurLang["subLANG"]) === false || array_search($_COOKIE["current_language"],$arCurLang["subLANG"]) === NULL)){
        $currentLanguage = $_COOKIE["current_language"];
    }elseif(!empty($arCurLang)){
        $currentLanguage = $arCurLang["lang"];
    }
    if($currentLanguage){
        SetCookie("current_language", trim($currentLanguage), time() + 3600*24*30*12,"/");
        define("LANGUAGE_ID", $currentLanguage);
    }
}
/**DONT_TOUCHendcreatedbylocalization**/';

    if(!strpos($f, '/**DONT_TOUCHstartcreatedbylocalization**/')){
        $f = rtrim(trim($f),'?>');
        file_put_contents($dbConnPath,$f.$dbConnString);
    }

    $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini"));
    include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
    $arLangs = $arAccorsysLocaleLangs;
    $rsLangs = CLanguage::getList($by,$order);
    while($lang = $rsLangs->getNext()){
        $arSystemLangs[$lang["LID"]] = $lang["NAME"];
    }
    $objLang = new CLanguage;

    foreach($lcTempSettings['accorsysSiteLang'] as $siteLangID => $arSiteLangs){
        foreach($arSiteLangs as $siteLangs){
            $arLangsToAdd[$siteLangs] = $arLangs[$siteLangs];
        }
    }
    foreach($lcTempSettings['arAdditionalLangsChanger'] as $lang){
        if(trim($lang) != "")
            $arLangsToAdd[$lang] = $arLangs[$lang];
    }
    CLocale::includeLocaleLangFiles('en');
    $GLOBALS['accorsysLocalizationNeedCustomLang'] = true;
    include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
    $forSystemLangs = $arAccorsysLocaleLangs;
    $GLOBALS['accorsysLocalizationNeedCustomLang'] = false;
    CLocale::includeLocaleLangFiles();
    $dbSite = CSite::GetList($by,$order,array());
    $arSite = $dbSite->fetch();
    foreach($arLangsToAdd as $langID =>  $langName){
        if(trim($langID) != "" && !isset($arSystemLangs[$langID])){
            $arLangFields = array(
                "LID" => $langID,
                "ACTIVE" => "Y",
                "SORT" => "100",
                "DEF" => "N",
                "NAME" => $forSystemLangs[$langID],
                "FORMAT_DATE" => $arSite["FORMAT_DATE"],
                "FORMAT_DATETIME" => $arSite["FORMAT_DATETIME"],
                "CHARSET" => $arSite["CHARSET"],
                "CULTURE_ID" => $arSite["CULTURE_ID"]
            );
            $objLang->Add($arLangFields);
            if (strlen($objLang->LAST_ERROR)>0)
                $strError .= $objLang->LAST_ERROR;
        }
    }
    $dbSites = CSite::GetList($by = "sort", $order = "asc");
    $arSites = array();
    while($arSite = $dbSites->fetch()){
        $arSites[$arSite["LID"]] = $arSite;
    }
    foreach($arSites as $siteLID => $site){
        COption::SetOptionString("accorsys.localization","isNeedLangSwitcher[".$siteLID."]", $lcTempSettings['isNeedLangSwitcher'][$siteLID]);
    }

    foreach($lcTempSettings['accorsysSiteLang'] as $arSiteLangs){
        foreach($arSiteLangs as $lang){
            COption::SetOptionString("accorsys.localization",'index_lang_'.$lang,'Y');
        }
    }

    $lcTempSettings['wiki_url_tpl'] = trim($lcTempSettings['wiki_url_tpl']) != ""?$lcTempSettings['wiki_url_tpl']:'http://ru.wikipedia.org/w/index.php?search=#TEXT#';
    COption::SetOptionString("accorsys.localization","wiki_url_tpl", $lcTempSettings['wiki_url_tpl']);

    $lcTempSettings['ytube_url_tpl'] = trim($lcTempSettings['ytube_url_tpl']) != ""?$lcTempSettings['ytube_url_tpl']:'https://www.youtube.com/results?q=#TEXT#';
    COption::SetOptionString("accorsys.localization","ytube_url_tpl", $lcTempSettings['ytube_url_tpl']);

    COption::SetOptionString("accorsys.localization","defaultIntefaceLanguage", serialize($lcTempSettings['defaultIntefaceLanguage']));

    $oldSettings = file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini");

    if(trim($oldSettings) == ""){
        $lcTempSettings['idexesIncludePath'] = array();
        $lcTempSettings['idexesIncludePath'][] = '/bitrix/modules/main/lang/en/tools.php';
        $lcTempSettings['idexesIncludePath'][] = '/bitrix/modules/main/lang/ru/tools.php';
        COption::SetOptionString("accorsys.localization","idexesIncludePath",serialize($lcTempSettings['idexesIncludePath']));
        COption::SetOptionString("accorsys.localization","translated_text_color", 'red');
        COption::SetOptionString("accorsys.localization","idexesIncludePath",serialize($lcTempSettings['idexesIncludePath']));

        $lcTempSettings['wiki_url_tpl'] = "http://ru.wikipedia.org/w/index.php?search=#TEXT#";
        COption::SetOptionString("accorsys.localization","wiki_url_tpl", $lcTempSettings['wiki_url_tpl']);
        $lcTempSettings['ytube_url_tpl'] = 'https://www.youtube.com/results?q=#TEXT#';
        COption::SetOptionString("accorsys.localization","ytube_url_tpl", $lcTempSettings['ytube_url_tpl']);
    }else{
        $oldSettings = unserialize($oldSettings);

        if(!isset($oldSettings['idexesIncludePath'])){
            $lcTempSettings['idexesIncludePath'] = array();
            $lcTempSettings['idexesIncludePath'][] = '/bitrix/modules/main/lang/en/tools.php';
            $lcTempSettings['idexesIncludePath'][] = '/bitrix/modules/main/lang/ru/tools.php';
            COption::SetOptionString("accorsys.localization","idexesIncludePath",serialize($lcTempSettings['idexesIncludePath']));
        }

        $lcTempSettings['gtranslate_api_key'] = trim($oldSettings['gtranslate_api_key']);
        COption::SetOptionString("accorsys.localization","gtranslate_api_key", $lcTempSettings['gtranslate_api_key']);

        $lcTempSettings['ytranslate_api_key'] = trim($oldSettings['ytranslate_api_key']);
        COption::SetOptionString("accorsys.localization","ytranslate_api_key", $lcTempSettings['ytranslate_api_key']);

        $lcTempSettings['microsoftTranslatorCliendID'] = trim($oldSettings['microsoftTranslatorCliendID']);
        COption::SetOptionString("accorsys.localization","microsoftTranslatorCliendID", $lcTempSettings['microsoftTranslatorCliendID']);

        $lcTempSettings['microsoftTranslatorCliendSecret'] = trim($oldSettings['microsoftTranslatorCliendSecret']);
        COption::SetOptionString("accorsys.localization","microsoftTranslatorCliendSecret", $lcTempSettings['microsoftTranslatorCliendSecret']);

        $lcTempSettings['wiki_url_tpl'] = "http://ru.wikipedia.org/w/index.php?search=#TEXT#";
        COption::SetOptionString("accorsys.localization","wiki_url_tpl", $lcTempSettings['wiki_url_tpl']);

        $lcTempSettings['ytube_url_tpl'] = 'https://www.youtube.com/results?q=#TEXT#';
        COption::SetOptionString("accorsys.localization","ytube_url_tpl", $lcTempSettings['ytube_url_tpl']);
    }

    COption::SetOptionString("accorsys.localization","accorsysSiteLang",serialize($lcTempSettings['accorsysSiteLang']));
    COption::SetOptionString("accorsys.localization","arGroupValues",serialize($lcTempSettings['arGroupValues']));

    file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini", serialize($lcTempSettings));
    file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini",'');
    CLocale::ReplaceGetMessage();
}