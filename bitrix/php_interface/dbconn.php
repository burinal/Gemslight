<?
define("BX_USE_MYSQLI", true);
define("DBPersistent", false);
$DBType = "mysql";
$DBHost = "localhost";
$DBLogin = "admin";
$DBPassword = "admin";
$DBName = "gem_new";
$DBDebug = false;
$DBDebugToFile = false;

define("DELAY_DB_CONNECT", true);
define("CACHED_b_file", 3600);
define("CACHED_b_file_bucket_size", 10);
define("CACHED_b_lang", 3600);
define("CACHED_b_option", 3600);
define("CACHED_b_lang_domain", 3600);
define("CACHED_b_site_template", 3600);
define("CACHED_b_event", 3600);
define("CACHED_b_agent", 3660);
define("CACHED_menu", 3600);

define("BX_UTF", true);
define("BX_FILE_PERMISSIONS", 0644);
define("BX_DIR_PERMISSIONS", 0755);
@umask(~(BX_FILE_PERMISSIONS|BX_DIR_PERMISSIONS)&0777);
define("BX_DISABLE_INDEX_PAGE", true);

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
/**DONT_TOUCHendcreatedbylocalization**/