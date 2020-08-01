<?php
use Accorsys;

require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/accorsys.localization/classes/general/locale.php");

/*
$strGetMessage = file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/accorsys.localization/admin/getmessages.php");

$matches = array();

CLocale::preg_match_all("/GetMessage\(.*\)/",$strGetMessage,$matches);

$arGetMessages = "";
foreach($matches[0] as $match){
    $match = str_replace('GetMessage("',"#",$match);
    $match = str_replace("GetMessage('","#",$match);
    $match = str_replace('")',"#\n",$match);
    $match = str_replace("')","#\n",$match);
    $arGetMessages .= $match;
}
$matches = array();
CLocale::preg_match_all("/#.*#/",$arGetMessages,$matches);
foreach($matches[0] as $match){
    $arFullGetMessages[$match] = $match;
}
foreach($arFullGetMessages as $getMessage){
    $getMessage = str_replace("#"," ",$getMessage);
    $strNewGetmessages .=  $getMessage.'<br>';
}
//file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/accorsys.localization/admin/getmessages.php",$strNewGetmessages);
die();
*/

define('MAX_USER_QTY', 5);
global $LOCALE_ENGINE;
global $UPDATE_FROM_INDEX;

function localizationGetMessage($name, $aReplace=false, $backtrace){
    //function of localization module
    //if (CModule::IncludeModule('accorsys.localization'))
    global $LOCALE_ENGINE;
    $arFilesForTranslate = Array(
        "component.php",
        "template.php",
        "header.php",
        "footer.php",
        "index.php"
    );

    $docroot = str_replace("/","\\",$_SERVER["DOCUMENT_ROOT"]);
    global $MESS;
    $s = $MESS[$name];

    if($aReplace!==false && is_array($aReplace))
        foreach($aReplace as $search=>$replace)
            $s = str_replace($search, $replace, $s);
    
    if(trim($s) == "")
        $s = \Bitrix\Main\Localization\Loc::getMessage($name, $aReplace);

    if ($LOCALE_ENGINE && $LOCALE_ENGINE->Enabled()){

        $arTrace = $backtrace;

        if ($arTrace[0]["function"]=="GetMessage"){

            if (strpos($arTrace[0]["file"],"/") !== false){
                $filename = explode("/",$arTrace[0]["file"]);
                $filename_pred = explode("/",$arTrace[1]["file"]);
            }else{
                $filename = explode("\\",$arTrace[0]["file"]);
                $filename_pred = explode("\\",$arTrace[1]["file"]);
            }
            $filename = $filename[count($filename)-1];
            $filename_pred = $filename_pred[count($filename_pred)-1];

            if (!strpos($arTrace[0]["file"],"bitrix/components/bitrix")
                && !strpos($arTrace[0]["file"],"bitrix/components/bitrix")
                && !strpos($arTrace[0]["file"],'bitrix\\components\\bitrix')
                && !strpos($arTrace[0]["file"],'bitrix\modules')
                && !strpos($arTrace[0]["file"],'bitrix/modules')
                && !strpos($arTrace[0]["file"],'bitrix\components\bitrix')
                && !strpos($arTrace[0]["file"],'bitrix\components\bitrix')
            ){
                if (true || in_array($filename,$arFilesForTranslate) || in_array($filename_pred,$arFilesForTranslate)){
                    $arfunc = Array(
                        "file"=>str_replace($docroot, "", $arTrace[0]["file"]),
                        "line"=>$arTrace[0]["line"],
                        "key"=>$name,
                        "user_rights" => CLocale::userHasAccess()
                    );
                }
            }elseif(
                !strpos($arTrace[0]["file"],"bitrix/components/bitrix/menu/component")
                && !strpos($arTrace[0]["file"],"bitrix\components\bitrix\menu\component")
                && !strpos($arTrace[0]["file"],"bitrix/components/bitrix/main.include/component")
                && !strpos($arTrace[0]["file"],"bitrix\components\bitrix\main.include\component")
                && !strpos($arTrace[0]["file"],"bitrix/modules/main")
                && !strpos($arTrace[0]["file"],"bitrix\modules\main")
                && !strpos($arTrace[0]["file"],'bitrix\modules')
                && !strpos($arTrace[0]["file"],'bitrix/modules')){

                //? ?????? ?????? ???????? ????????? ??? ???? ??????
                if (true || in_array($filename,$arFilesForTranslate) || in_array($filename_pred,$arFilesForTranslate)){
                    $arfunc = Array(
                        "file"=>str_replace($docroot, "", $arTrace[0]["file"]),
                        "line"=>$arTrace[0]["line"],
                        "key"=>$name,
                        "system" => "Y",
                        "user_rights" => CLocale::userHasAccess()
                    );
                }
            }
        }
    }

    if (!$arfunc){
        return $s;
    }
    else{
        if (strlen($s) <= 0){

            $s = "EMPTY_VALUE";
        }
        return htmlspecialchars_decode('<i class=\'locale_mes'.($arfunc['system']=="Y"? " system":"").($arfunc['user_rights']=="W"?" workflow":"").'\' rel=\''.$arfunc["file"].'\' title=\''.$arfunc["key"].'\'>'.$s.'</i>');
    }

}

function LOC_htmlentities_all($dat)
{
    if (is_string($dat)) return htmlentities(str_replace("\"", "'", $dat));
    if (!is_array($dat)) return $dat;
    $ret = array();
    foreach ($dat as $i => $d) $ret[$i] = LOC_htmlentities_all($d);
    return $ret;
}

function LOC_json_safe_encode($var)
{
    if (defined('LANG_CHARSET') && strtoupper(LANG_CHARSET) != "UTF8" && strtoupper(LANG_CHARSET) != "UTF-8"){

        $var = array_map(function($el){
            return str_replace(Array('{','}'), Array('\{','\}'), $el);
        },$var);

        $var = CUtil::PhpToJSObject($var);
        $var = str_replace("\\'",'#AAAmpAAA#',$var);
        $var = str_replace('"',"'",$var);
        $var = str_replace(
            Array("'",'\{','\}','\/','/'),
            Array('"','{','}','/','\/'),
            $var
        );

        $var = str_replace(Array('\}', '\{'), Array('}', '{'),$var);
        $var = preg_replace("/[\t\r\n]+/",' ',$var);
        $var = str_replace('#AAAmpAAA#',"'",$var);
        $var = str_replace(chr(13),'',$var);
        $var = str_replace(chr(10),'',$var);

        return $var;
    } else {
        return json_encode($var);
    }
}

//function json_fix_cyr($var)
//{
//    if (is_array($var)) {
//        $new = array();
//        foreach ($var as $k => $v) {
//            $new[json_fix_cyr($k)] = json_fix_cyr($v);
//        }
//        $var = $new;
//    } elseif (is_object($var)) {
//        $vars = get_object_vars($var);
//        foreach ($vars as $m => $v) {
//            $var->$m = json_fix_cyr($v);
//        }
//    } elseif (is_string($var)) {
//        $var = iconv('cp1251', 'utf-8', $var);
//    }
//    return $var;
//}
function is_code_file($file)
{
    /*****TEMP****/
    $file = str_replace("\\", "/", $file);
    if (strpos($file, "/") !== false) {
        $file = explode("/", $file);
        $file = $file[count($file) - 1];
    }
    /*if (in_array($file, Array("template.php", "component.php"))) return true;
    return false;
    /*************/
    if (strpos($file, ".")) {
        $file = explode(".", $file);
        $file = $file[count($file) - 1];
        if (in_array($file, Array("php"))) {
            return true;
        }
    }
    return false;
}

function is_lang_file($file, $check_langs = Array())
{
    if (!is_code_file($file)) return false;

    $file = str_replace("\\", "/", $file);

    if (strpos($file, "/") !== false) {
        $file = explode("/", $file);
        foreach ($file as $k => $dir) {
            if ($dir == 'lang') {
                if (!empty($check_langs)) {
                    if ($file[$k + 1]) {
                        if (in_array($file[$k + 1], $check_langs)) {
                            return true;
                        }
                    }
                } else {
                    return true;
                }
            }
        }
//        $dir = $file[count($file)-3];

        if ($dir == 'lang') {
            return true;
        }
    }
    return false;
}
function get_lang_of_file($file)
{
    $file = str_replace("\\", "/", $file);
    if (strpos($file, "/") !== false) {
        $file = explode("/lang/", $file);
        $lang = explode("/",$file[1]);
        if(strlen($lang[0]) <= 2){
            return $lang[0];
        }
    }
}
class CAccorsysCMain extends CMain {
    function GetShowIncludeAreas(){
        return true;
    }
}
class CAccorsysCUser extends CUser {
    function CanDoFileOperation(){
        return true;
    }
}
class CLocale extends CAllLocale
{
    static $IBLOCK_CODE = "ALOCALE_IBLOCK";
    var $DATABASE;
    private $enabled = false;
    private $iblock_id = 0;
    private $arLangFiles;
    private $savedItems;
    private $realUserCount;
    public $isNeedCheckDisabledInputs = false;
    var $arIndexDirectories = Array(
        "/bitrix/templates/",
        "/bitrix/components/"
    );
    var $arDopIndexDirectoriesExclude = array();
    var $arExcludeIndexDirs = Array(
        "/bitrix/components/bitrix/",
        "/bitrix/modules/",
        "/bitrix/images/",
        "/bitrix/js/",
        "/upload/"
    );
    private $index_step;
    private $index_step_size = false;
    public $currentTemplate = '';
    var $index_files_count = 0;
    public static $localeIblockID = 0;

    function __construct($wo_enable = false)
    {
        self::includeLocaleLangFiles();
        $dopIndexes = unserialize(COption::GetOptionString('accorsys.localization','idexesIncludePath'));
        if($dopIndexes)
            $this->arIndexDirectories = array_merge($this->arIndexDirectories,$dopIndexes);

        $this->arDopIndexDirectoriesExclude = unserialize(COption::GetOptionString('accorsys.localization','idexesIncludePath'));
        if($this->arDopIndexDirectoriesExclude)
            $this->arExcludeIndexDirs = array_merge($this->arExcludeIndexDirs, $this->arDopIndexDirectoriesExclude);

        global $DB;
        global $USER;
        $this->DATABASE = & $DB;
        $obUser = new CAccorsysExtensionsUser("accorsys.localization");

        if($_COOKIE['BITRIX_SM_LC_ENABLE'] == "Y" && trim($_COOKIE['BITRIX_SM_LC_ENABLE']) != ""){
            if($USER->GetID()){
                if(isset($_COOKIE['OLD_USER_SESSION'])){
                    $obUser->deleteUserBySession($_COOKIE['OLD_USER_SESSION']);
                    setcookie('OLD_USER_SESSION',null,-1);
                    setcookie('OLD_USER_ID',null,-1);
                }
                if(self::ReplaceGetMessage() && $obUser->addUser($USER->GetID())){
                    $userHasAccess = true;
                }else{
                    $userHasAccess = false;
                }
            }elseif(isset($_COOKIE['OLD_USER_ID']) && isset($_COOKIE['OLD_USER_SESSION']) && trim($_COOKIE['OLD_USER_SESSION']) != ''){
                $dbUserID = CUser::GetByID($_COOKIE['OLD_USER_ID'])->getNext();
                $userID = $dbUserID['ID'];
                if(self::ReplaceGetMessage() && $obUser->addUser($userID,$_COOKIE['OLD_USER_SESSION'])){
                    $userHasAccess = true;
                    if(function_exists('BXClearCache'))
                        BXClearCache(true, "");
                }else{
                    $userHasAccess = false;
                }
            }
        }else{
            $userHasAccess = false;
        }
        if($_COOKIE['BITRIX_SM_LC_ENABLE'] == "N" && isset($_COOKIE['OLD_USER_SESSION']) && trim($_COOKIE['OLD_USER_SESSION']) != ''){
            if(function_exists('BXClearCache'))
                BXClearCache(true, "");
            $dbUserID = CUser::GetByID($_COOKIE['OLD_USER_ID'])->getNext();
            $userID = $dbUserID['ID'];
            $obUser->deleteUserBySession($_COOKIE['OLD_USER_SESSION']);
            setcookie('OLD_USER_SESSION',null,-1);
            setcookie('OLD_USER_ID',null,-1);
        }
        if($_COOKIE['BITRIX_SM_LC_ENABLE'] == "N"){
            if(function_exists('BXClearCache'))
                BXClearCache(true, "");
            $dbUserID = CUser::GetByID($_COOKIE['OLD_USER_ID'])->getNext();
            $userID = $dbUserID['ID'];
            $obUser->deleteUser($USER->GetID());
            setcookie('BITRIX_SM_LC_ENABLE',null,-1);
        }
        if ($userHasAccess){
            setcookie('current_language', LANGUAGE_ID, time() + 3600*24*30,"/");
            $_SESSION["LOCALE_MODE_ENABLED"] = "Y";
            global $APPLICATION;
            $APPLICATION->SetShowIncludeAreas($_REQUEST['inc_areas_remains'] != 'N');
            $localeSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
            if(trim($localeSettings['last_index_date']) == ""){
                $ar = array(
                    "ID"=>"accorsys.localization_module_reindex",
                    "SORT"=>"3",
                    "TITLE"=>GetMessage('LC_ALERT_INDEX_UPDATE_RECOMMENDED_TITLE'),
                    "HTML"=>GetMessage('LC_ALERT_INDEX_UPDATE_RECOMMENDED_MESSAGE'),
                    "COLOR"=>"red alert-reindex-class a-locale",
                    "FOOTER"=>'<a target="_blank" href="/bitrix/admin/lc_lang_index.php" >'.GetMessage("LC_ALERT_INDEX_UPDATE_RECOMMENDED_LINK").'</a>'
                );
                $ObError = new CAccorsysError($ar);
                if($ObError)
                    $ObError->show();
            }
        }else{
            $_SESSION["LOCALE_MODE_ENABLED"] = "N";
        }

        if (CModule::IncludeModule("iblock")){
            $rsIBlock = CIBlock::GetList(false, Array("CODE" => self::$IBLOCK_CODE));
            if ($arIblock = $rsIBlock->GetNext()){
                $this->iblock_id = $arIblock["ID"];
            } else {
                $this->CreateIBlock();
            }
            if($_SESSION["LOCALE_MODE_ENABLED"] == "Y" && !$_REQUEST['add_new_site_sol'] && !$wo_enable) {
                $this->enable();
            } else {
                $this->disable();
            }
        } else {
            return false;
        }
    }

    public static function getTemplateLangFiles($filePath,$tagName){
        $filePath = str_replace('\\','/',$filePath);
        $arPath = explode('/',$filePath);

        for($i = count($arPath); $i > 0; $i--){
            $key = $i - 1;
            unset($arPath[$key]);
            $curPath = implode('/',$arPath);

            if(is_dir($curPath.'/')){
                $f=opendir($curPath.'/');
                while(($name=readdir($f)) !== false){
                    if(is_dir($curPath.'/'.$name.'/') && $name!="." && $name!=".." && $name == 'lang'){
                        $arFiles = array();
                        CLocale::getLangFiles($curPath.'/'.$name.'/','',$arFiles,$tagName);

                        if(count($arFiles) > 0)
                            return $arFiles;
                    }
                }
            }
        }
    }

    public static function getLangFiles($pathToTemplateLangs,$nameLang = '', &$arFiles = array(),$tagName){
        $f=opendir($pathToTemplateLangs);

        while(($name=readdir($f)) !== false){
            if(is_file($pathToTemplateLangs.$name) && strpos(file_get_contents($pathToTemplateLangs.$name),$tagName) !== false){
                $inDir = $nameLang != '' ? $nameLang : 'otherFiles';
                $arFiles[$inDir][] = $pathToTemplateLangs.$name;
            }
            elseif(is_dir($pathToTemplateLangs.$name.'/') && $name!="." && $name!=".."){
                $handle = opendir($pathToTemplateLangs.$name.'/');
                if (!$handle){
                    continue;
                }
                $newDirName = $nameLang == '' ? $name:$nameLang;
                CLocale::getLangFiles($pathToTemplateLangs.$name.'/',$newDirName,$arFiles,$tagName);
                closedir($handle);
            }
        }
    }

    public static function preg_match_all($pattern,$haystack, &$matches = array(), $flag = false){
        $matches = array();
        preg_match_all($pattern, $haystack, $matches, $flag);
        if(strtoupper(mb_internal_encoding()) == 'UTF-8' && $flag == PREG_OFFSET_CAPTURE){
            $oldMatchOffset = 0;
            foreach($matches[0] as $key => $match){
                $matches[0][$key][1] = strpos($haystack, $match[0], $oldMatchOffset);
                $oldMatchOffset = $matches[0][$key][1] + strlen($match[0]);
            }
            return $matches;
        }else{
            return $matches;
        }
    }

    public static function preg_match($pattern, $haystack, &$matches = array(), $flag = false){
        $matches = array();
        preg_match($pattern,$haystack, $matches, $flag);
        if(strtoupper(mb_internal_encoding()) == 'UTF-8' && $flag == PREG_OFFSET_CAPTURE){
            $oldMatchOffset = 0;
            foreach($matches as $key => $match){
                $matches[0][$key][1] = strpos($haystack, $match[0], $oldMatchOffset);
                $oldMatchOffset = $matches[0][$key][1];
            }
            return $matches;
        }else{
            return $matches;
        }
    }

    public static function getAccorsysProductsXML () {
        $obCache = new CPHPCache();
        $arCount = array();
        $cache_time = 3600*24;
        $cache_id = md5('accorsys_live_editor_products_xml_data_save_md5');
        $cache_path = '/'.$cache_id;
        if(!$obCache->StartDataCache($cache_time, $cache_id, $cache_path))
        {
            $res = $obCache->GetVars();
            $arProducts = $res['accorsys_live_editor_products_xml_data'];
        }else{

            $arResult = CProgramCatalogSC::Query('http://www.accorsys.ru/upload/products.xml');

            if($arResult){
                foreach($arResult['products']['#']['site'] as $arSite){
                    foreach($arSite['#']['product'] as $fields){
                        foreach($fields['#'] as $code => $field){
                            if($code == 'items'){
                                $arItems = array();
                                foreach($field[0]['#'] as $sku){
                                    $arSkuFields = array();
                                    foreach($sku[0]['#'] as $codeSku => $valueSku){
                                        $arSkuFields[$codeSku] = $valueSku[0]['#'];
                                    }
                                    $arItems[$sku[0]['@']['code']] = $arSkuFields;
                                }
                                $arProducts[$fields['@']['code']][$arSite['@']['language']][$code] = $arItems;
                                continue;
                            }
                            $arProducts[$fields['@']['code']][$arSite['@']['language']][$code] = $field[0]['#'];
                        }
                    }
                }
            }
            $obCache->EndDataCache(array("accorsys_live_editor_products_xml_data"=>$arProducts));
        }
        return $arProducts;
    }

    public static function getPCImagePathFromCDN($imagePath, $width = 3000, $height = 3000, $needCrop = false){

        $cdnPath = 'http://www.programcatalog.ru.images.1c-bitrix-cdn.ru';

        $imgServerPath = "/upload/resize_showcase_image/".$width."x".$height.($needCrop ? md5('crop=Y'):'')."_".basename($imagePath);

        $file = $cdnPath.$imgServerPath;
        $file_headers = @get_headers($file);
        if($file_headers[0] != 'HTTP/1.1 404 Not Found'){
            return $cdnPath.$imgServerPath;
        }

        return '//www.programcatalog.ru/ajax/getresizeimage.php?src=' . $imagePath . '&width=' . $width . '&height=' . $height . ''.($needCrop ? '&crop=Y':'');
    }

    public static function isSalesInAppStore(){
        //???????? ?????? ? ????????
        $obCache = new CPHPCache();
        $cacheTime = 3600*24;
        $cacheID = 'ProgramCatalogSC'.md5('ProgramCatalogSCisSales');
        $cachePath = '/ProgramCatalogSCisSales/'.$cacheID;

        if ($obCache->InitCache($cacheTime, $cacheID, $cachePath))
        {
            $vars = $obCache->GetVars();
            $isSale = $vars['result'];
        }else{
            $arParams = array(
                'showcase_id'=> 'inapp_sale',
                'main_product_code'=> 'accorsys_localizatsiya',
                'exclude_products_code' => 'accorsys_localizatsiya'
            );
            $dbmarket = new CProgramCatalogSC($arParams);
            $arModules = $dbmarket->getProducts();
            $obCache->StartDataCache(intval($cacheTime), $cacheID, $cachePath);
            $obCache->EndDataCache(array('result' => $arModules ? 'true':'false'));
        }
        return $isSale == 'true';
    }
    public static function isExpiredUpdatePeriod(){
        //???????? ?????? ? ????????
        $obCache = new CPHPCache();
        $cacheTime = 3600;
        $cacheID = 'ProgramCatalogSC'.md5('ProgramCatalogSCisExpireModulePeriod');
        $cachePath = '/ProgramCatalogSCisExpireModulePeriod/'.$cacheID;

        if ($obCache->InitCache($cacheTime, $cacheID, $cachePath))
        {
            $vars = $obCache->GetVars();
            $isExpired = $vars['result'];
        }else{
            $isExpired = 'false';
            $obAccess = new CAccorsysExtensionsAccess("accorsys.localization");
            $arDaysToLeft = $obAccess->daysToLeftModule("accorsys.localization");
            if($arDaysToLeft['IS_EXPIRE'] || $arDaysToLeft['DAYS_LEFT'] <= 0){
                $isExpired = 'true';
            }
            $obCache->StartDataCache(intval($cacheTime), $cacheID, $cachePath);
            $obCache->EndDataCache(array('result' => $isExpired ? 'true':'false'));
        }
        return $isExpired == 'true';
    }


    public static function findLocaleText ($arParams){
        $found = array();
        $newTagDefaultName = "";
        $arParams['filesAreas'] = strpos($_SERVER["DOCUMENT_ROOT"],$arParams['filesAreas']) !== false ? $arParams['filesAreas']:$_SERVER["DOCUMENT_ROOT"].$arParams['filesAreas'];
        if($arParams['filesAreas']){
            $found = CLocale::FindTextInFile($arParams['text'], $arParams['filesAreas']);
            $newTagDefaultName = strtoupper(substr(localeCropLatin(Cutil::translit(strip_tags($arParams['text']), "ru")),0,10));
        }
        if(empty($found)){
            if ($arParams['component_name']){
                $to_find = $arParams['component_name'];
                $found = CLocale::FindTextInComponent($arParams['text'], $arParams['component_name'], $arParams['template_name'], false, $arParams['siteTemplate']);
                $newTagDefaultName .= strtoupper(localeCropLatin($arParams['component_name']))."_".strtoupper(localeCropLatin($arParams['template_name']));
            } else {
                if ($arParams['siteTemplate']){
                    $to_find = $arParams['siteTemplate'];
                } else {
                    $to_find = SITE_TEMPLATE_ID;
                }
                $found = CLocale::FindTextInTemplate($arParams['text'], $to_find);
                $newTagDefaultName .= strtoupper(SITE_TEMPLATE_ID);
            }
        }
        return array('found'=>$found,'newTagDefaultName'=>$newTagDefaultName);
    }

    public static function localizationSetConstant(){
        if($_COOKIE['BITRIX_SM_LC_ENABLE'] == "Y" || $_COOKIE['BITRIX_SM_LC_ENABLE'] == "N")
            define('BX_SESSION_ID_CHANGE','N');

        $lcSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
        $arConstLanguages = $lcSettings["arConstants"];
        if(!isset($arConstLanguages)){
            $dbSites = CSite::getList($by,$order,array());
            while($arSite = $dbSites->getNext()){
                $arSites[$arSite['LID']] = $arSite['LID'];
            }
        }else{
            foreach($arConstLanguages as $siteID => $constants){
                $arSites[$siteID] = $siteID;
            }
        }
        foreach($arConstLanguages as $siteID => $constants){
            foreach($constants as $constName => $arLangs){
                $arConstants[$constName] = $constName;
                define($constName,$arLangs[LANGUAGE_ID],true);
            }
        }
        if($lcSettings['notUsedIBlocksConstants'] == 'reWrite' || !isset($lcSettings['notUsedIBlocksConstants'])){
            CModule::IncludeModule('iblock');
            $lcSettings['notUsedIBlocksConstants'] = array();
            $dbIblocks = CIBlock::getList(array(), array());
            while($arIBlock = $dbIblocks->fetch()){
                foreach($arSites as $siteID){
                    if(!isset($arConstants['LC_'.strtoupper($siteID).'_'.$arIBlock['ID']])){
                        $arConstForAdditionalDefine['LC_'.strtoupper($siteID).'_'.$arIBlock['ID']] = $arIBlock['ID'];
                    }
                }
            }
            $lcSettings['notUsedIBlocksConstants'] = $arConstForAdditionalDefine;
            file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini",serialize($lcSettings));
        }
        foreach($lcSettings['notUsedIBlocksConstants'] as $constKey => $constValue){
            define($constKey,$constValue,true);
        }
    }

    function enable()
    {
        global $USER;
        $this->enabled = $this->getSwitchAccessForCurrentUser();
        if (function_exists('apc_clear_cache')){
            apc_clear_cache();
        }
    }

    function disable()
    {
        $this->enabled = false;
        if (function_exists('apc_clear_cache')){
            apc_clear_cache();
        }
    }

    function Enabled()
    {
        return $this->enabled;
    }

    function getSwitchAccessForCurrentUser()
    {
        global $USER;
        $userGroups = $USER->GetUserGroupArray();
        $rsGroups = CGroup::GetList($by = "c_sort", $order = "asc", array());
        $workflow = false;

        $groupAccessValue = unserialize(COption::GetOptionString("accorsys.localization", "arGroupValues"));

        while($arGroup = $rsGroups->getNext()){
            if(isset($groupAccessValue[$arGroup["ID"]])){
                if(in_array($arGroup['ID'], $userGroups))
                    return true;
            }
        }
        return false;


        /*$g_id = intval(COption::GetOptionInt("accorsys.localization", "user_group", 0));
        $aGroups = Array($g_id);

        if (CModule::IncludeModule('workflow')) {
            $g_id = intval(COption::GetOptionInt("accorsys.localization", "user_group_wf", 0));
            $aGroups[] = $g_id;
        }

        if ($this->userHasAccess()) {
            $this->realUserCount = CUser::GetList(($a = 'id'), ($b = 'desc'), Array("GROUPS_ID" => $aGroups))->SelectedRowsCount();

            if ($this->realUserCount > MAX_USER_QTY) {
                $u_count_before = CUser::GetList(($a = 'id'), ($b = 'desc'), Array("GROUPS_ID" => $aGroups, "<ID" => $USER->GetId()))->SelectedRowsCount();
                if ($u_count_before <= MAX_USER_QTY) {
                    return true;
                }
            } else {
                return true;
            }
        }*/
    }

    public static function includeLocaleLangFiles($LANGUAGE = false){
        global $USER;

        if($LANGUAGE){
            IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/translations.php',$LANGUAGE);
            IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/additionaltranslations.php',$LANGUAGE);
            return false;
        }
        if(!is_object($USER)){
            IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/translations.php',LANGUAGE_ID);
            IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/additionaltranslations.php',LANGUAGE_ID);
            return false;
        }

        $arUserGroups = $USER->GetUserGroupArray();
        $arCurInterfaceLang = unserialize(COption::GetOptionString("accorsys.localization","defaultIntefaceLanguage"));
        $countGroups = 0;
        $isNeedToCurLang = false;
        foreach($arUserGroups as $groupID){
            if(isset($arCurInterfaceLang[$groupID])){
                if(isset($curInterfaceLang) && $curInterfaceLang != ($arCurInterfaceLang[$groupID] == "curLang" ? LANGUAGE_ID:$arCurInterfaceLang[$groupID])){
                    $isNeedToCurLang = true;
                    break;
                }
                $curInterfaceLang = $arCurInterfaceLang[$groupID] == "curLang" ? LANGUAGE_ID:$arCurInterfaceLang[$groupID];
            }
        }
        if($isNeedToCurLang){
            $curInterfaceLang = LANGUAGE_ID;
        }
        IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/translations.php',$curInterfaceLang);
        IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/additionaltranslations.php',$curInterfaceLang);
    }

    public static function userHasAccess($bShowError = true)
    {
        global $USER;
        $userGroups = $USER->GetUserGroupArray();
        $rsGroups = CGroup::GetList($by = "c_sort", $order = "asc", array());
        $workflow = false;

        $groupAccessValue = unserialize(COption::GetOptionString("accorsys.localization", "arGroupValues"));

        while($arGroup = $rsGroups->getNext()){
            if(isset($groupAccessValue[$arGroup["ID"]])){
                if(!is_array($groupAccessValue[$arGroup["ID"]])){
                    if(in_array($arGroup['ID'], $userGroups))
                        return "A";
                }elseif(is_array($groupAccessValue[$arGroup["ID"]])){
                    if(in_array($arGroup['ID'], $userGroups))
                        $workflow = true;
                }
            }
        }
        if($workflow){
            if($bShowError){
                $ar = array(
                    "ID"=>"accorsys.localization_module_workflow",
                    "SORT"=>"1",
                    "TITLE"=>GetMessage('LC_ALERT_CHANGE_CONTROL_TITLE'),
                    "HTML"=>GetMessage('LC_ALERT_CHANGE_CONTROL_MESSAGE'),
                    "COLOR"=>"blue alert-workflow-class a-locale",
                    "FOOTER"=> GetMessage('LC_ALERT_CHANGE_CONTROL_LINK')
                );
                $ObError = new CAccorsysError($ar);
                if($ObError)
                    $ObError->show();
            }
            return "W";
        }
        return false;
    }


    #region ??????? ???????? ?? ?????????? ??????
        function OnModuleUpdate($arParams){
            if (class_exists('CAccorsysLS')) {
                $SL = new CAccorsysLS('accorsys.localization');
                $SL->getBuyLS();
            }
        }
    #endregion

    function getVersion()
    {
        include $_SERVER['DOCUMENT_ROOT'] . "/bitrix/modules/accorsys.localization/install/version.php";
        return $arModuleVersion['VERSION'];
    }

    function getDateLastUpdate()
    {
        include($_SERVER['DOCUMENT_ROOT'] . "/bitrix/modules/accorsys.localization/install/version.php");
        return $arModuleVersion['VERSION_DATE'];
    }

    function getRealUserCount()
    {
        return $this->realUserCount;
    }

    public static function CreateIBlock()
    {
        global $DB;
        $ib = new CIBlock;
        $arSites = Array();
        $rs = CSite::GetList($b = "id", $o = "desc");
        while ($ar = $rs->GetNext()) {
            $arSites[] = $ar["ID"];
        }
        $arFields = Array(
            'ID' => 'alocale',
            'SECTIONS' => 'Y',
            'IN_RSS' => 'N',
            'SORT' => 100,
            'LANG' => Array(
                'ru' => Array(
                    'NAME' => GetMessage('LC_EXTENSION_NAME'),
                    'SECTION_NAME' => GetMessage('LC_IBLOCK_SECTIONS_TITLE'),
                    'ELEMENT_NAME' => GetMessage('LC_IBLOCK_ELEMENTS_TITLE')
                )
            )
        );
        $DB->StartTransaction();
        $obBlocktype = new CIBlockType;
        $res = $obBlocktype->Add($arFields);

        $arFields = Array(
            "NAME" => GetMessage('LC_TRANSLATION_FILES_INDEX'),
            "CODE" => self::$IBLOCK_CODE,
            "SITE_ID" => $arSites,
            "ACTIVE" => "Y",
            "VERSION" => 2,
            "IBLOCK_TYPE_ID" => $res,
            "ELEMENT_NAME" => GetMessage('LC_INDEX_ADMIN_ELEMENT_TITLE'),
            "ELEMENTS_NAME" => GetMessage('LC_INDEX_ADMIN_ELEMENTS_TITLE'),
            "ELEMENT_ADD" => GetMessage('LC_INDEX_ADMIN_NEW_ELEMENT_TITLE'),
            "ELEMENT_EDIT" => GetMessage('LC_INDEX_ADMIN_EDIT_ELEMENT_TITLE'),
            "ELEMENT_DELETE" => GetMessage('LC_INDEX_ADMIN_DELETE_ELEMENT_TITLE')
        );
        $ibid = $ib->Add($arFields);

        if ($ibid) {
            $ibp = new CIBlockProperty;
            $arFields = Array(
                "NAME" => GetMessage('LC_IBLOCK_PROPERTY_LANGUAGE'),
                "ACTIVE" => "Y",
                "SORT" => "100",
                "CODE" => "lang",
                "PROPERTY_TYPE" => "S",
                "IBLOCK_ID" => $ibid,
                "FILTRABLE" => "Y",
                "USER_TYPE" => "locale_lang"
            );
            $lang_prop = $ibp->Add($arFields);
            $arFields = Array(
                "NAME" => GetMessage('LC_TRANSLATION_FILE'),
                "ACTIVE" => "Y",
                "SORT" => "300",
                "CODE" => "lang_file",
                "PROPERTY_TYPE" => "S",
                "IBLOCK_ID" => $ibid,
                "FILTRABLE" => "Y",
                "USER_TYPE" => "locale_path"
            );
            $lang_file_prop = $ibp->Add($arFields);
            $arFields = Array(
                "NAME" => GetMessage('LC_IBLOCK_PROPERTY_TRANSLATION'),
                "ACTIVE" => "Y",
                "SORT" => "200",
                "CODE" => "text",
                "PROPERTY_TYPE" => "S",
                "IBLOCK_ID" => $ibid,
                "FILTRABLE" => "Y",
                "USER_TYPE" => "locale_text"
            );
            $text_file_prop = $ibp->Add($arFields);
            $arFields = Array(
                "NAME" => GetMessage('LC_IBLOCK_PROPERTY_IS_REPLACE'),
                "ACTIVE" => "Y",
                "SORT" => "450",
                "CODE" => "is_replace",
                "PROPERTY_TYPE" => "L",
                "LIST_TYPE" => "C",
                "IBLOCK_ID" => $ibid,
                "VALUES" => array(0 => array(
                    "VALUE" => "Y",
                    "DEF" => "Y",
                    "SORT" => "100",
                    "EXTERNAL_ID" => "is_replace_value"))
            );
            $replace_files_prop = $ibp->Add($arFields);
        }

        $sTableID = "tbl_iblock_list_" . md5("alocale." . $ibid);
        $columns = 'NAME,PROPERTY_' . $lang_file_prop . ',PROPERTY_' . $text_file_prop . ',PROPERTY_' . $lang_prop . ',TIMESTAMP_X';
        if (CModule::IncludeModule('iblock')) {
            $columns .= ",WF_STATUS_ID";
        }
        $arOptions = Array(
            Array(
                "c" => "list",
                "n" => $sTableID,
                "d" => "Y",
                "v" => Array(
                    "by" => "timestamp_x",
                    "columns" => $columns,
                    "order" => "desc",
                    "page_size" => 20,
                ),
            )
        );
        CUserOptions::SetOptionsFromArray($arOptions); //????? ?????????? ?? ???????? ?????????

        if ($ibid && $lang_prop && $lang_file_prop /*&& $lang_files_prop*/) {
            $DB->Commit();
            return $ibid;
        } else {
            $DB->Rollback();
            return false;
        }
    }

    public static function ClearIndex($step_time = 10)
    {
        CModule::IncludeModule('iblock');
        $rsIBlock = CIBlock::GetList(false, Array("CODE" => 'ALOCALE_IBLOCK'));
        if ($arIblock = $rsIBlock->GetNext())
            $iblock_id = $arIblock["ID"];
        $time_start = microtime(1);

        $rsElem = CIBlockElement::GetList(array(), array("IBLOCK_CODE"=>'ALOCALE_IBLOCK',"ACTIVE"=> "Y","IBLOCK_ID" => $iblock_id), false, false, array("ID", "NAME"));
        if(!isset($_SESSION['ACCORSYS_LOCALIZATION_TOTAL_COUNT_FROM_DELETE_ELEMENTS'])){
            $_SESSION['ACCORSYS_LOCALIZATION_TOTAL_COUNT_FROM_DELETE_ELEMENTS'] = $rsElem->SelectedRowsCount();
        }
        $curDeletedElements = $_SESSION['ACCORSYS_LOCALIZATION_TOTAL_COUNT_FROM_DELETE_ELEMENTS'] - $rsElem->SelectedRowsCount();
        while ($ar = $rsElem->GetNext()) {
            $curDeletedElements++;
            CIBlockElement::Delete($ar["ID"]);
            $time_end = microtime(1);
            if ($time_end - $time_start > $step_time){
                return $curDeletedElements;
            }
        }
        unset($_SESSION['ACCORSYS_LOCALIZATION_TOTAL_COUNT_FROM_DELETE_ELEMENTS']);
        return true;
    }

    function setFilesCountToSession($dir_path)
    {
        $arLangs = Array('for_success_not_empty_check');
        $rs = CLanguage::GetList($by = "lid", $order = "desc");
        while ($ar = $rs->GetNext()){
            if (COption::GetOptionString('accorsys.localization', "index_lang_" . $ar['LID']) == 'Y') {
                $arLangs[] = $ar['LID'];
            }
        }

        if ($dir_path{strlen($dir_path) - 1} != "/"){
            $dir_path .= "/";
        }
        foreach($this->arExcludeIndexDirs as $excludeDir){
            if(strpos($dir_path,$excludeDir) === 0){
                $needReturn = true;
            }
        }
        foreach($this->arIndexDirectories as $includeDir){
            if(strpos($dir_path,$includeDir) === 0){
                foreach($this->arExcludeIndexDirs as $excludeNewDir){
                    if(strpos($dir_path,$excludeNewDir) === 0 && strlen($includeDir) >= strlen($excludeNewDir)){
                        $needReturn = false;
                    }
                }
            }
        }
        if($needReturn)
            return true;

        $dir = opendir($_SERVER["DOCUMENT_ROOT"] . $dir_path);
        while ($file = readdir($dir)){
            if (!in_array($file, Array(".", ".."))){
                if (is_dir($_SERVER["DOCUMENT_ROOT"] . $dir_path . $file)){
                    $this->setFilesCountToSession($dir_path . $file);
                } elseif (is_file($_SERVER["DOCUMENT_ROOT"] . $dir_path . $file)) {
                    if (is_lang_file($dir_path . $file, $arLangs)) {
                        $_SESSION['ACCORSYS_LOCALIZATION_ALL_FILES_PATH'][] = $dir_path . $file;
                    }
                }
            }
        }
    }

    function saveMessFile($filepath, $el)
    {
        global $UPDATE_FROM_INDEX,$APPLICATION,$DB;

        $MESS = Array();
        include($_SERVER["DOCUMENT_ROOT"] . $filepath);

        $arMessages = $MESS;
        foreach ($arMessages as $key => $mess) {
            if (strlen($key) > 0) {
                $arProps = Array(
                    "lang" => get_lang_of_file($filepath),
                    "lang_file" => $filepath,
                    "text" => $mess
                );
                $arFields = Array(
                    "NAME" => $key,
                    "ACTIVE" => "Y",
                    "IBLOCK_ID" => $this->iblock_id,
                    "PROPERTY_VALUES" => $arProps
                );
                $UPDATE_FROM_INDEX = true;
                $rs = CIBlockElement::GetList(false, Array("NAME" => $key, "PROPERTY_lang_file" => $arProps["lang_file"]), false, false, Array("ID", "NAME","PROPERTY_text"));
                if ($ar = $rs->GetNext()) {
                    if ($ar["~PROPERTY_TEXT_VALUE"] != $arFields["PROPERTY_VALUES"]['text']){
                        $el->Update($ar["ID"], $arFields);
                    }
                } else {
                    $el->Add($arFields);
                }
            }
            $this->savedItems++;
        }
    }

    function IndexScanDir($dir_path)
    {
        $el = new CIBlockElement;
        global $MESS, $UPDATE_FROM_INDEX;
        $needReturn = false;

        if($dir_path{strlen($dir_path) - 1} != "/"){
            $dir_path .= "/";
        }

        foreach($this->arExcludeIndexDirs as $excludeDir){
            if(strpos($dir_path,$excludeDir) === 0){
                $needReturn = true;
            }
        }
        foreach($this->arIndexDirectories as $includeDir){
            if(strpos($dir_path,$includeDir) === 0){
                foreach($this->arExcludeIndexDirs as $excludeNewDir){
                    if(strpos($dir_path,$excludeNewDir) === 0 && strlen($includeDir) >= strlen($excludeNewDir)){
                        $needReturn = false;
                    }
                }
            }
        }

        if($needReturn){
            return true;
        }

        $arLangs = Array('for_not_empty');
        $rs = CLanguage::GetList($by = "lid", $order = "desc");
        while ($ar = $rs->GetNext()){
            if (COption::GetOptionString('accorsys.localization', "index_lang_" . $ar['LID']) == 'Y') {
                $arLangs[] = $ar['LID'];
            }
        }

        if (is_dir($_SERVER["DOCUMENT_ROOT"] . $dir_path)){
            $dir = opendir($_SERVER["DOCUMENT_ROOT"] . $dir_path);
            while ($file = readdir($dir)) {
                if (!in_array($file, Array(".", ".."))) {
                    if (is_dir($_SERVER["DOCUMENT_ROOT"] . $dir_path . $file)){
                        if (!$this->IndexScanDir($dir_path . $file)){
                            closedir($dir);
                            return false;
                        }
                    } elseif (is_file($_SERVER["DOCUMENT_ROOT"] . $dir_path . $file)){
                        if (is_lang_file($dir_path . $file, $arLangs)) {
                            $this->index_files_count++;
                            if ($this->index_step) {
                                if ($this->index_files_count < (($this->index_step - 1) * $this->index_step_size)) {
                                    continue;
                                }
                                if ($this->index_files_count >= ($this->index_step * $this->index_step_size)) {
                                    closedir($dir);
                                    return false;
                                }
                            }
                            $this->saveMessFile(($dir_path . $file), $el);
                        }
                    }
                }
            }
            closedir($dir);
        } elseif (is_lang_file($_SERVER["DOCUMENT_ROOT"] . $dir_path)) {
            $this->index_files_count++;
            $this->saveMessFile($dir_path, $el);
        }

        return true;
    }

    function InitIndexStep($step)
    {
        if ($step) {
            $_SESSION["LOCALE_INDEX_STEP"] = $step;
            $this->index_step = $step;
        }
    }

    function IncreaseIndexStep()
    {
        if (intval($_SESSION["LOCALE_INDEX_STEP"]))
            $_SESSION["LOCALE_INDEX_STEP"]++;
        else
            $_SESSION["LOCALE_INDEX_STEP"] = 2;
    }

    function Reindex($stepsize = false, $step = 0)
    {
        $arDirs = $this->arIndexDirectories;
        $el = new CIBlockElement();

        $localSteps = $_SESSION['ACCORSYS_LOCALIZATION_FILES_SAVED'];
        for ($curSteps = $_SESSION['ACCORSYS_LOCALIZATION_FILES_SAVED']; ($curSteps-$localSteps) <= $stepsize;$curSteps++){
            if(!$_SESSION['ACCORSYS_LOCALIZATION_ALL_FILES_PATH'][$curSteps])
                break;
            $_SESSION['ACCORSYS_LOCALIZATION_FILES_SAVED']++;
            $this->savedItems++;
            echo "<pre>";print_r($_SESSION['ACCORSYS_LOCALIZATION_ALL_FILES_PATH'][$curSteps]);echo "</pre>";
            $this->saveMessFile($_SESSION['ACCORSYS_LOCALIZATION_ALL_FILES_PATH'][$curSteps], $el);
        }
        if(($curSteps - $_SESSION['ACCORSYS_LOCALIZATION_FILES_SAVED']) >= $stepsize){
            return $_SESSION['ACCORSYS_LOCALIZATION_FILES_SAVED'];
        }elseif($_SESSION['ACCORSYS_LOCALIZATION_FILES_SAVED'] >= count($_SESSION['ACCORSYS_LOCALIZATION_ALL_FILES_PATH'])){
            return 'COMPLETE';
        }

        return false;
    }

    public function getCroppedText($text, $full_text, $pos)
    {
        if(strlen($text) > 50){
            $start = substr($text,0,25);
            $content = substr($text,25, (strlen($text) - 50));
            $end = substr($text, strlen($text) - 25);
            $cutText =  htmlspecialchars($start, null, '').'<span style="cursor:pointer;text-decoration:underline;font-size:15px;" class="hidden-text">&nbsp;&hellip;&nbsp;<span style="display:none;">'.htmlspecialchars($content, null, '').'</span></span>'.htmlspecialchars($end, null, '');
        }else{
            $cutText = htmlspecialchars($text, null, '');
        }
        $textBefore = substr($full_text, (($pos - 50) > 0 ? ($pos - 50) : 0), (($pos - 50) > 0 ? 50: (50 + $pos - 50)));
        $textAfter = substr($full_text, ($pos + strlen($text)), 50);
        $textBefore = htmlspecialchars($textBefore,null,'');
        $textAfter = htmlspecialchars($textAfter,null,'');
        $croppedText = $textBefore.'<b>'.$cutText.'</b>'.$textAfter;
        return ' &quot;&hellip; '.trim($croppedText).' &hellip;&quot; ';
    }

    function findTags($arExtFlter)
    {
        return CIBlockElement::GetList(Array("NAME" => "DESC"), array_merge(Array("IBLOCK_ID" => $this->iblock_id, "PROPERTY_lang" => LANGUAGE_ID), $arExtFlter), false, false, Array("ID", "NAME", "PROPERTY_text"));
    }

    public static function file_get_contents($path){
        $opts = array('http' =>
            array(
                'method'  => 'POST',
                'header'  => "Content-Type: text"
            )
        );
        $context  = stream_context_create($opts);
        return file_get_contents($path,false,$context);
    }

    public static function ReplaceGetMessage($back = false)
    {
        global $APPLICATION;
        $f_tools_path = $_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/tools.php";

        $fCont = self::file_get_contents($f_tools_path);

        $getMessageFunction = '/**startfuncgetmessage**/
        global $USER;
        global $APPLICATION;
        if($_COOKIE["BITRIX_SM_LC_ENABLE"] == "Y" && is_object($USER)){
            if(class_exists("CLocale")){
              $GLOBALS["ACCORSYS_LOCALIZATION_USER_HAS_ACCESS"] = isset($GLOBALS["ACCORSYS_LOCALIZATION_USER_HAS_ACCESS"]) ? $GLOBALS["ACCORSYS_LOCALIZATION_USER_HAS_ACCESS"] : CLocale::userHasAccess(false);
            }
            if($GLOBALS["ACCORSYS_LOCALIZATION_USER_HAS_ACCESS"] && strpos($APPLICATION->GetCurDir(),"/bitrix/admin/") === false)
                if(function_exists("localizationGetMessage") && $_SESSION["LOCALE_MODE_ENABLED"] == "Y" && !$_REQUEST["add_new_site_sol"]){
                    return localizationGetMessage($name,$aReplace,debug_backtrace());
                }
        }
        /**endfuncgetmessage**/';

        if ($back){
            $fCont = self::file_get_contents($f_tools_path);
            if (strpos($fCont, 'localizationGetMessage') !== false){
                if(strtoupper(mb_internal_encoding()) == 'UTF-8'){
                    $newFCont = iconv('cp1251','UTF-8', $fCont);
                    if(trim($newFCont) != ""){
                        $fCont = $newFCont;
                        file_put_contents($f_tools_path,$fCont);
                    }
                }
                $fCont = preg_replace("/\/\*\*startfuncgetmessage\*\*\/(.*)\/\*\*endfuncgetmessage\*\*\//msU", "", $fCont);
                if(strpos($fCont, 'GetMessage')){
                    file_put_contents($f_tools_path,$fCont);
                }
            }
        } else {
            if (strpos($fCont, "localizationGetMessage") !== false){
                return true;
            } else {
                if(strtoupper(mb_internal_encoding()) == 'UTF-8' && ini_get('mbstring.func_overload') == 2){
                    $newFCont = iconv('cp1251','UTF-8', $fCont);
                    if(trim($newFCont) != ""){
                        $fCont = $newFCont;
                        file_put_contents($f_tools_path,$fCont);
                    }
                }
                $matches = array();
                CLocale::preg_match_all("/function GetMessage\s*\((.*)\{/msU",$fCont, $matches, PREG_OFFSET_CAPTURE);
                $lenToFunct = (int)$matches[0][0][1] + (int)strlen($matches[0][0][0]);
                $strToFunct = substr($fCont,0,$lenToFunct);
                $strOverFunct = substr($fCont,$lenToFunct);
                $newFileStr = $strToFunct.$getMessageFunction.$strOverFunct;

                if(self::check_syntax($newFileStr)){
                    file_put_contents($f_tools_path,$newFileStr);
                    return true;
                }else{
                    return false;
                }
            }
        }
    }

    function check_syntax($text) {
        return @eval('namespace accorsys_localozation_check_syntax; return true; ?> ' . rtrim(rtrim(trim($text),'?>'),'php?>'));
    }

    public static function OnPrologHandler($isNotProlog = false)
    {
        global $APPLICATION, $USER, $LOCALE_ENGINE;

        if(SITE_TEMPLATE_ID == "SITE_TEMPLATE_ID" && strpos($APPLICATION->GetCurDir(),"/bitrix/admin/") === false)
            return false;

        if(strpos($APPLICATION->GetCurDir(),"/bitrix/admin/") === false && COption::GetOptionString("accorsys.localization","isNeedLangSwitcher[".SITE_ID."]") == "on"){
            ob_start();
            $APPLICATION->IncludeComponent(
                "accorsys.localization:language.switcher",
                "light",
                Array(
                    "CACHE_TYPE" => "N",
                    "CACHE_TIME" => "0",
                    "CACHE_NOTES" => ""
                ),
                false
            );
            $GLOBALS["accorsys_localization_lang_switcher"] = ob_get_clean();
        }
        if((strpos($APPLICATION->GetCurDir(),"/bitrix/admin/") === 0 || strpos($APPLICATION->GetCurDir(),"/ajax/accorsys.localization/") === 0) && !$isNotProlog){
            return true;
        }elseif(!$USER->isAuthorized() && $_COOKIE['BITRIX_SM_LC_ENABLE'] == "Y" && trim($_COOKIE['BITRIX_SM_LC_ENABLE']) != "" && $_SESSION["LOCALE_MODE_ENABLED"] == "Y" && isset($_COOKIE['OLD_USER_SESSION'])){
            $LOCALE_ENGINE = new CLocale();
            $GLOBALS['APPLICATION'] = new CAccorsysCMain();
            $GLOBALS['USER'] = new CAccorsysCUser();
            $APPLICATION->ShowPanel = true;
            CUtil::InitJSCore();
            CJSCore::Init(array('core'));
            $_SESSION["SESS_OPERATIONS"]['edit_php'] = 'Y';
            $_SESSION["SESS_INCLUDE_AREAS"] = 'Y';
            $GLOBALS['ACCORSYS_SHOW_PANEL_MODE'] = true;
        }elseif(self::userHasAccess()){
            $LOCALE_ENGINE = new CLocale();
        }elseif(!$USER->isAuthorized()){
            return true;
        }

        if(CLocale::isSalesInAppStore()){
            $ar = array(
                "ID"=>"accorsys.localization_module_sale",
                "SORT"=>"2",
                "TITLE"=>GetMessage('LC_ALERT_INAPP_SALE_TITLE'),
                "HTML"=>GetMessage('LC_ALERT_INAPP_SALE_MESSAGE'),
                "COLOR"=>"green alert-sale-class a-locale",
                "FOOTER"=>'<a target="_blank" href="/bitrix/admin/lc_inapp_purchases.php#idForScrollDetailItem_inapp_sale" >'.GetMessage("LC_ALERT_INAPP_SALE_LINK").'</a>'
            );
            $ObError = new CAccorsysError($ar);
            if($ObError)
                $ObError->show();
        }
        $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
        $obUser = new CAccorsysExtensionsUser("accorsys.localization");
        foreach($lcTempSettings['arGroupValues'] as $groupID => $isDoc){
            foreach(CGroup::GetGroupUser($groupID) as $user){
                $arCountUsers[$user] = $user;
            }
        }
        $countUsers = count($arCountUsers);

        if((int)$countUsers > (int)$obUser->userCount){
            $ar = array(
                "ID"=>"accorsys.localization_module_extend_user",
                "SORT"=>"1",
                "TITLE"=>GetMessage('LC_ALERT_LICENSING_EXTEND_USER_LIMIT_TITLE'),
                "HTML"=>str_replace("#USER_COUNT_BUY#", $obUser->userCount, GetMessage('LC_ALERT_LICENSING_EXTEND_USER_LIMIT_MESSAGE')),
                "COLOR"=>"blue alert-extend-user-class a-locale",
                "FOOTER"=>'<a target="_blank" href="/bitrix/admin/lc_inapp_purchases.php" >'.GetMessage("LC_ALERT_LICENSING_EXTEND_USER_LIMIT_LINK").'</a>'
            );
            $ObError = new CAccorsysError($ar);
            if($ObError)
                $ObError->show();

            $messageError = str_replace('#USER_COUNT_BUY#',$obUser->userCount,GetMessage('LC_ALERT_LICENSING_USER_LIMIT_EXCEEDED_MESSAGE'));
            $messageError = str_replace('#USER_COUNT_ONLINE#',$countUsers,$messageError);
            $ar = array(
                "ID"=>"accorsys.localization_sl_error_user",
                "SORT"=>"1",
                "TITLE"=>GetMessage('LC_ALERT_LICENSING_USER_LIMIT_EXCEEDED_TITLE'),
                "HTML"=>$messageError,
                "COLOR"=>"red alert-user-limit-exceeded-class a-locale",
                "FOOTER"=>'<a href="/bitrix/admin/dump.php?lang='.LANGUAGE_ID.'" >'.GetMessage("LC_ALERT_LICENSING_USER_LIMIT_EXCEEDED_LINK").'</a>'
            );
            $ObError = new CAccorsysError($ar);
            if($ObError)
                $ObError->show();
        }

        if(CLocale::isExpiredUpdatePeriod()){
            $ar = array(
                "ID"=>"accorsys.localization_module_update_period_expired",
                "SORT"=>"1",
                "TITLE"=>GetMessage('LC_ALERT_UPDATE_PERIOD_EXPIRED_TITLE'),
                "HTML"=>str_replace("#USER_COUNT_BUY#", $obUser->userCount, GetMessage('LC_ALERT_UPDATE_PERIOD_EXPIRED_MESSAGE')),
                "COLOR"=>"red alert-update-period-expired a-locale",
                "FOOTER"=>'<a target="_blank" href="/bitrix/admin/lc_inapp_purchases.php" >'.GetMessage("LC_ALERT_UPDATE_PERIOD_EXPIRED_LINK").'</a>'
            );
            $ObError = new CAccorsysError($ar);
            if($ObError)
                $ObError->show();
        }

        $isNotProlog = $isNotProlog && !isset($GLOBALS['accorsys_localization_handler_was_called']);
        if (strpos($APPLICATION->GetCurDir(),"/bitrix/admin/") !== false  && !$isNotProlog){
            $APPLICATION->AddHeadString('<link rel="stylesheet" type="text/css" href="/bitrix/js/accorsys.localization/locale.css.php">');
            return false;
        }

        if($GLOBALS['accorsys_localization_handler_was_called'] === 1)
            return false;

        $GLOBALS['accorsys_localization_handler_was_called'] = 1;
        if (self::userHasAccess()) {
            CLocale::includeLocaleLangFiles();
            $APPLICATION->AddHeadString('<link rel="stylesheet" type="text/css" href="/bitrix/js/accorsys.localization/locale.css.php">');
            $hideLine = isset($GLOBALS['ACCORSYS_SHOW_PANEL_MODE']) && $GLOBALS['ACCORSYS_SHOW_PANEL_MODE'] ? true : false;
            $text = $LOCALE_ENGINE->Enabled() ? GetMessage('LC_TOP_BUTTON_MAIN_DISABLE') : GetMessage('LC_TOP_BUTTON_MAIN_ENABLE');

            $arMenuTypes = GetMenuTypes(SITE_ID);

            $arMenuEditSubMenu = Array();

            foreach($arMenuTypes as $keyMenu=>$nameMenu){
                $bFileMenuThisDir = false;
                $bFileMenuCreate = false;
                $CurDir = isset($_SERVER["REAL_FILE_PATH"])  &&  $_SERVER["REAL_FILE_PATH"] != "" ? GetDirPath($_SERVER['REAL_FILE_PATH']) : $APPLICATION->GetCurDir(false);

                $filePath = $_SERVER['DOCUMENT_ROOT'].$CurDir.'.'.$keyMenu.'.menu.php';
                    if(file_exists($filePath)){
                        $bFileMenuCreate = true;
                        $bFileMenuThisDir = true;
                        $filePathMenu = $CurDir;
                    }
                    $filePath = $_SERVER['DOCUMENT_ROOT'].'/'.'.'.$keyMenu.'.menu.php';
                    if(!$bFileMenuThisDir && file_exists($filePath)){
                        $bFileMenuCreate = true;
                        $filePathMenu = '/';
                    }
                if($bFileMenuCreate){
                    $menuAction = $APPLICATION->GetPopupLink(array(
                            "URL"=> "/bitrix/admin/locale_files_edit.php?lang=".LANGUAGE_ID.
                                "&site=".SITE_ID."&back_url=".urlencode($_SERVER["REQUEST_URI"]).
                                "&path=".urlencode($filePathMenu)."&name=".$keyMenu."&templateId=".SITE_TEMPLATE_ID,
                            "PARAMS" =>array(
                                'width'=>900,
                                'height'=>500
                            )
                        )
                    );
                    $arMenuEditSubMenu[] = Array(
                        "TEXT" => ($hideLine || !($USER->isAuthorized() && $LOCALE_ENGINE->Enabled())?'<span class="hide-admin-menu-line">':'').GetMessage('LC_EDIT').' "'.$nameMenu.'"'.($hideLine?'</span>':''),
                        "TITLE" => str_replace('#MENU#',$nameMenu,GetMessage('LC_MENU_EDIT_TOP_MENU_CHILD_TITLE')),
                        "ICON" => "",
                        "ACTION" => $hideLine || !($USER->isAuthorized() && $LOCALE_ENGINE->Enabled()) ? 'alert("'.($hideLine?GetMessage("LC_MENU_ITEM_LOGIN_REQUIRED_ALERT"):GetMessage("LC_MENU_ITEM_LOCALIZATION_MODE_REQUIRED_ALERT")).'")':$menuAction,
                        "DEFAULT" => 0,
                        "HK_ID" => "LC_EDIT".$keyMenu,
                    );
                }
            }
            if(!$LOCALE_ENGINE->Enabled()){
                $isOffAreasMod = isset($_SESSION["SESS_INCLUDE_AREAS"]) && $_SESSION["SESS_INCLUDE_AREAS"] ? 'Y':'N';
                setcookie('ACCORSYS_NEED_TO_SWITCH_EDIT_MODE', $isOffAreasMod,time() + 3600*24*30,'/');
                $onOffURL = $APPLICATION->GetCurPageParam('bitrix_include_areas=Y',array('bitrix_include_areas',));
            }else{
                if(isset($_COOKIE['ACCORSYS_NEED_TO_SWITCH_EDIT_MODE'])){
                    global $APPLICATION;
                    $onOffURL = $APPLICATION->GetCurPageParam('bitrix_include_areas='.$_COOKIE['ACCORSYS_NEED_TO_SWITCH_EDIT_MODE'],array('bitrix_include_areas'));
                }else{
                    $onOffURL = $APPLICATION->GetCurUri();
                }
            }
            $arMenuLC = array(
                "ALT" => $text,
                "HINT" => array("TITLE"=> GetMessage("LC_LOCALIZATION"), "TEXT"=>GetMessage("LC_TURN_EXTENSION_ON"), "TARGET"=>"PARENT"),
                "TEXT" => GetMessage('LC_LOCALIZATION'),
                "MAIN_SORT" => 1400,
                "SORT" => 1100,
                "ID" => ($LOCALE_ENGINE->Enabled() ? "loc_switch_enabled" : "loc_switch"),
                "HREF" => $onOffURL,
                "MENU" => Array()
            );


            $arMenuLC['MENU'][] = array(
                    "ALT" => ($LOCALE_ENGINE->Enabled() ? GetMessage('LC_TOP_BUTTON_MAIN_DISABLE') : GetMessage('LC_TOP_BUTTON_MAIN_ENABLE')),
                    "TEXT" => ($LOCALE_ENGINE->Enabled() ? GetMessage('LC_TOP_BUTTON_MAIN_DISABLE') : GetMessage('LC_TOP_BUTTON_MAIN_ENABLE')),
                    "SORT" => 1100,
                    "ONCLICK" => "setAccorsysLocalizationCookie('BITRIX_SM_LC_ENABLE','".($LOCALE_ENGINE->Enabled() ? "N" : "Y")."');document.location.href=window.location.href;"
            );
            $arMenuLC['MENU'][] = array(
                "ALT" => GetMessage('LC_MENU_ITEM_WORK_LOGGED_OUT'),
                "TEXT" => ($hideLine || !($USER->isAuthorized() && $LOCALE_ENGINE->Enabled())?'<span class="hide-admin-menu-line">':'').GetMessage('LC_MENU_ITEM_WORK_LOGGED_OUT').($hideLine?'</span>':''),
                "SORT" => 1100,
                "ONCLICK" => $hideLine || !($USER->isAuthorized() && $LOCALE_ENGINE->Enabled()) ? 'alert("'.($hideLine?GetMessage("LC_MENU_ITEM_LOGIN_REQUIRED_ALERT"):GetMessage("LC_MENU_ITEM_LOCALIZATION_MODE_REQUIRED_ALERT")).'")':"setAccorsysLocalizationCookie('OLD_USER_SESSION','".session_id()."');setAccorsysLocalizationCookie('OLD_USER_ID','".$USER->GetID()."');document.location.href=window.location.href+'&logout=yes';"
            );
            $arMenuLC['MENU'][] = Array(
                "SEPARATOR" => true
            );
            $arMenuLC['MENU'][] = Array(
                "TEXT" => ($hideLine || !($USER->isAuthorized() && $LOCALE_ENGINE->Enabled())?'<span class="hide-admin-menu-line">':'').GetMessage('LC_TOP_BUTTON_PAGE_TITLE_AND_FIELDS').($hideLine?'</span>':''),
                "TITLE" => GetMessage('LC_DOM_MENU_PAGE_AND_FIELDS_TITLE'),
                "ICON" => "",
                "ACTION" => $hideLine || !($USER->isAuthorized() && $LOCALE_ENGINE->Enabled()) ? 'alert("'.($hideLine?GetMessage("LC_MENU_ITEM_LOGIN_REQUIRED_ALERT"):GetMessage("LC_MENU_ITEM_LOCALIZATION_MODE_REQUIRED_ALERT")).'")':$APPLICATION->GetPopupLink(array(
                            "URL"=> "/bitrix/admin/locale_file_property.php?lang=".LANGUAGE_ID.
                                "&site=".SITE_ID."&back_url=".urlencode($_SERVER["REQUEST_URI"]).
                                "&path=".urlencode($_SERVER["PHP_SELF"])."&templateId=".SITE_TEMPLATE_ID,
                            "PARAMS" =>array(
                                'width'=>900,
                                'height'=>500
                            )
                        )
                    ),
                "DEFAULT" => 0,
                "HK_ID" => "LOCALE_PANEL_TITLE_AND_FIELDS"
            );
            if(count($arMenuEditSubMenu)>0){
                $arMenuLC['MENU'][]= Array(
                    "TEXT" => ($hideLine || !($USER->isAuthorized() && $LOCALE_ENGINE->Enabled())?'<span class="hide-admin-menu-line">':'').GetMessage('LC_MENU_EDIT_TOP_MENU').($hideLine?'</span>':''),
                    "TITLE" => GetMessage('LC_MENU_EDIT_TOP_MENU_TITLE'),
                    "ICON" => "",
                    "MENU" => $arMenuEditSubMenu
                );

            }
            $arMenuLC['MENU'][] = Array(
                "SEPARATOR" => true
            );
            $arMenuLC['MENU'][] = Array(
                "TEXT" => GetMessage('LC_TRANSLATION_FILES_INDEX'),
                "TITLE" => GetMessage('LC_TOP_BUTTON_GO_TO_INDEX_TITLE'),
                "ICON" => "",
                "ACTION" => "window.open('/bitrix/admin/iblock_list_admin.php?IBLOCK_ID=" . $LOCALE_ENGINE->iblock_id . "&type=alocale&lang=" . LANGUAGE_ID . "')",
                "DEFAULT" => 0,
                "HK_ID" => "LOCALE_PANEL_LIST"
            );
            $arMenuLC['MENU'][] = Array(
                "TEXT" => GetMessage('LC_TOP_BUTTON_INDEX'),
                "TITLE" => GetMessage('LC_TOP_BUTTON_INDEX_TITLE'),
                "ICON" => "",
                "ACTION" => "window.open('/bitrix/admin/lc_lang_index.php?lang=ru&set_default=Y')",
                "DEFAULT" => 0,
                "HK_ID" => "LOCALE_PANEL_REINDEX"
            );
            $arMenuLC['MENU'][]= Array(
                "SEPARATOR" => true
            );
            $arMenuLC['MENU'][] = Array(
                "TEXT" => GetMessage('LC_MARKETPLACE_PAGE'),
                "TITLE" => GetMessage('LC_MARKETPLACE_PAGE_DOM_MENU_TITLE'),
                "TARGET" => '_blank',
                "ICON" => "",
                "ACTION" => "window.open('".GetMessage("LC_MARKETPLACE_PAGE_URL")."')",
                "DEFAULT" => 0,
                "HK_ID" => "LOCALE_PANEL_MARKETPLACE"
            );
            $arMenuLC['MENU'][] = Array(
                "TEXT" => GetMessage('LC_INAPP_PURCHASES'),
                "TITLE" => GetMessage('LC_INAPP_PURCHASES_DOM_MENU_TITLE'),
                "ICON" => "",
                "ACTION" => "window.open('/bitrix/admin/lc_inapp_purchases.php')",
                "DEFAULT" => 0,
                "HK_ID" => "LOCALE_PANEL_MARKETPLACE"
            );
            $arMenuLC['MENU'][] = Array(
                "SEPARATOR" => true
            );
            $arMenuLC['MENU'][] = Array(
                "TEXT" => GetMessage('LC_EXTENSION_SETTINGS'),
                "TITLE" => GetMessage('LC_TOP_BUTTON_SETTINGS_TITLE'),
                "ICON" => "",
                "ACTION" => "window.open('/bitrix/admin/settings.php?lang=" . LANGUAGE_ID . "&mid=accorsys.localization&mid_menu=1')",
                "DEFAULT" => 0,
                "HK_ID" => "LOCALE_PANEL_SETTINGS"
            );
            $arMenuLC['MENU'][]= Array(
                "TEXT" => GetMessage('LC_DOM_MENU_ABOUT'),
                "TITLE" => GetMessage('LC_DOM_MENU_ABOUT_TITLE'),
                "ICON" => "",
                "ACTION" => "window.open('/bitrix/admin/lc_about.php?lang=" . LANGUAGE_ID . "&mid=accorsys.localization&mid_menu=1')",
                "DEFAULT" => 0,
                "HK_ID" => "LOCALE_PANEL_ABOUT"
            );

            $APPLICATION->AddPanelButton($arMenuLC);

//            CUtil::InitJSCore();
            $APPLICATION->AddHeadString("<link href='/bitrix/js/accorsys.localization/icon.css.php' rel='stylesheet' type='text/css' />");
           // $APPLICATION->AddHeadString('<script type="text/javascript" src="/bitrix/js/accorsys.localization/jquery.cookie.js"></script>');

            $APPLICATION->AddHeadString('<script type=\'text/javascript\' src="/bitrix/js/accorsys.localization/jquery.min.js" /></script>');

            $APPLICATION->AddHeadString("<script>
                function setAccorsysLocalizationCookie(name, value, options) {
                  options = options || {};

                  var expires = options.expires;

                  if (typeof expires == 'number' && expires) {
                    var d = new Date();
                    d.setTime(d.getTime() + expires*1000);
                    expires = options.expires = d;
                  }
                  if (expires && expires.toUTCString) {
                    options.expires = expires.toUTCString();
                  }

                  value = encodeURIComponent(value);

                  var updatedCookie = name + '=' + value;

                  for(var propName in options) {
                    updatedCookie += '; ' + propName;
                    var propValue = options[propName];
                    if (propValue !== true) {
                      updatedCookie += '=' + propValue;
                     }
                  }

                  document.cookie = updatedCookie;
                }
                
                function readAccorsysLocalizationCookie(name) {
                    var nameEQ = name + '=';
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                    }
                    return null;
                }

                document.addEventListener('DOMContentLoaded', function(){
                    if(readAccorsysLocalizationCookie('ACCORSYS_LOCALIZATION_NEED_MORE_LICENSE')){
                        var needMoreLicenseValue = readAccorsysLocalizationCookie('ACCORSYS_LOCALIZATION_NEED_MORE_LICENSE').split('Y');
                        alert('".GetMessage('LC_ALERT_LICENSING_USER_LIMIT_EXCEEDED')."');
                        setAccorsysLocalizationCookie('ACCORSYS_LOCALIZATION_NEED_MORE_LICENSE',null,{'expires':-1});
                        setAccorsysLocalizationCookie('BITRIX_SM_LC_ENABLE',null,{'expires':-1});
                    }
                    jqLoc('#bx_topmenu_btn_loc_switch_enabled').click(function(){
                        setAccorsysLocalizationCookie('BITRIX_SM_LC_ENABLE','N',{'path':'/'});
                    });
                    jqLoc('#bx_topmenu_btn_loc_switch').click(function(){
                        setAccorsysLocalizationCookie('BITRIX_SM_LC_ENABLE','Y',{'path':'/'});
                    });
                });

                </script>");

            if ($LOCALE_ENGINE->Enabled() || $isNotProlog){

                $APPLICATION->AddHeadString("<link href='/bitrix/js/accorsys.localization/locale.css.php' rel='stylesheet' type='text/css' />");
                $APPLICATION->AddHeadString("<link href='/bitrix/js/accorsys.localization/flags.css.php' rel='stylesheet' type='text/css' />");
//                $APPLICATION->AddHeadScript("/bitrix/js/accorsys.localization/main.js.php");
                $APPLICATION->AddHeadScript("/bitrix/js/accorsys.localization/apng-canvas.js");
                $APPLICATION->AddHeadString('<script type=\'text/javascript\'>var jquery_last; if (typeof(jQuery) != \'undefined\') jquery_last = jQuery;</script>');
                //$APPLICATION->AddHeadString('<script type=\'text/javascript\' src="/bitrix/js/accorsys.localization/jquery.min.js" /></script>');
                $APPLICATION->AddHeadString('<script type=\'text/javascript\' src="/bitrix/js/accorsys.localization/jquery.cookie.js" /></script>');

                global $MESS;
                $APPLICATION->AddHeadString('<script>var arLocaleLangs = ' . LOC_json_safe_encode($MESS) . '</script>');
                $APPLICATION->AddHeadString('<script type=\'text/javascript\'>var jqLoc = jQuery; document.onload = function(){if (jquery_last) { $ = jQuery = jquery_last; }}</script>');

                $APPLICATION->AddHeadString('<script type="text/javascript" src="/bitrix/js/accorsys.localization/main.js.php"></script>',false);

                if($isNotProlog){
                    $APPLICATION->AddHeadString(<<<HEREDOC
                    <script>
                        jqLoc(function(){
                            clickOnActionButton();
                            function clickOnActionButton () {
                                var actionInterval = setInterval(function(){
                                    if(jqLoc(".adm-table-item-edit-wrap #action_edit_button").get(0) && !jqLoc(jqLoc(".adm-table-item-edit-wrap #action_edit_button").get(0)).hasClass('adm-edit-disable')){
                                        clearInterval(actionInterval);
                                        console.log(jqLoc(".adm-table-item-edit-wrap #action_edit_button").get(0));
                                        jqLoc(".adm-table-item-edit-wrap #action_edit_button").click(function(){
                                            var editInterval = setInterval(function(){
                                                if(jqLoc(".locale-select").get(0)){
                                                    setTimeout(function(){
                                                        jqLoc('input[name="save"].adm-btn-save, input[name="cancel"]').click(function(){
                                                            clickOnActionButton();
                                                        });
                                                        jqLoc(".locale-select").each(function(){
                                                            var parentRow = jqLoc(this).closest(".adm-list-table-row");
                                                            jqLoc(this).find("textarea").attr("data-lang", jqLoc(parentRow).find(".change-lang-select option:selected").attr("data-lang"));
                                                            jqLoc(parentRow).find(".show_lang_file").click(function(){
                                                                var name = "";
                                                                jqLoc(parentRow).find("input").each(function(){
                                                                    if(jqLoc(this).attr("type") == "text"){
                                                                        var arName = jqLoc(this).attr("name").split("[");
                                                                        if(arName[0] == "FIELDS" && arName[2] == "NAME]")
                                                                            name = jqLoc(this).val();
                                                                    }
                                                                })
                                                                jsUtils.OpenWindow(this.href+"#"+name, 800, 600);
                                                                return false;
                                                            });
                                                            jqLoc(parentRow).find(".change-lang-select").change(function(){
                                                                var arHrefText = jqLoc(parentRow).find(".show_lang_file").siblings("input:first").val().split("/");
                                                                for(var i = 0;i < arHrefText.length;i++){
                                                                    if(arHrefText[i].length == 4 && arHrefText[i] == "lang"){
                                                                        arHrefText[i+1] = jqLoc(this).val();
                                                                        var hrefText = arHrefText.join("/");
                                                                        jqLoc(parentRow).find(".show_lang_file").attr("href",hrefText);
                                                                        jqLoc(parentRow).find(".show_lang_file").html(hrefText);
                                                                        jqLoc(parentRow).find(".show_lang_file").siblings("input:first").val(hrefText);
                                                                    }
                                                                }
                                                                jqLoc(parentRow).find(".locale-block .locale-select textarea").attr("data-lang", jqLoc(parentRow).find(".change-lang-select option:selected").attr("data-lang"));
                                                            });
                                                            if(!jqLoc(this).hasClass("script-added")){
                                                                jqLoc(this).addKeyupLocaleHandler().addLocaleFormHandlers();
                                                                jqLoc(this).addClass("script-added");
                                                            }
                                                        });
                                                    },350);
                                                    clearInterval(editInterval);
                                                }
                                            },1000);
                                        });
                                    }
                                },1000);
                            }
                        })
                    </script>
HEREDOC
                    );
                }
                $arLocaleParams = Array(
                    'sessid' => bitrix_sessid(),
                    'microsofttranslate_key' => COption::GetOptionString("accorsys.localization", 'gtranslate_api_key', ''),
                    'gtranslate_key' => COption::GetOptionString("accorsys.localization", 'gtranslate_api_key', ''),
                    'ytranslate_key' => COption::GetOptionString("accorsys.localization", 'ytranslate_api_key', ''),
                    'wiki_url' => COption::GetOptionString("accorsys.localization", 'wiki_url_tpl', 'http://ru.wikipedia.org/wiki/#TEXT#'),
                    'ytube_url' => COption::GetOptionString("accorsys.localization", 'ytube_url_tpl', 'https://www.youtube.com/results?q=#TEXT#'),
                    'gtranslate_url' => COption::GetOptionString("accorsys.localization", 'gtranslate_url_tpl', ''),
                    'ytranslate_url' => COption::GetOptionString("accorsys.localization", 'ytranslate_url_tpl', ''),
                    'google_url' => COption::GetOptionString("accorsys.localization", 'google_url_tpl', 'https://www.google.ru/search?q=#TEXT#'),
                    'currentPage' => $APPLICATION->GetCurPageParam('clear_cache=Y', Array('clear_cache')),
                    'userAccessLevel' => $LOCALE_ENGINE->userHasAccess(),
                    'siteTemplate' => SITE_TEMPLATE_ID,
                    'lang' => Array(
                        'linkFollow' => GetMessage('LC_ALERT_LINK_FOLLOW'),
                        'rollUpToWholeArea' => GetMessage('LC_RESIZE_WHOLE_VISIBLE_AREA'),
                        'rollDownToOriginalSize' => GetMessage('LC_RESIZE_ORIGINAL_SIZE'),
                        'hintDisabled' => GetMessage('LC_DOM_MENU_HINT_ADD_DISABLED'),
                        'tagDeleteAlert' => GetMessage('LC_DOM_MENU_TAG_DELETE_ALERT'),
                        'hintDeleteAlert' => GetMessage('LC_DOM_MENU_HINT_DELETE_ALERT'),
                        'deleteTagDisabled' => GetMessage('LC_DOM_MENU_SYSTEM_DELETE_DISABLED'),
                        'unregistredError' => GetMessage('LC_ERROR_UNKNOWN_ISSUE'),
                        'timeoutError' => GetMessage('LC_ERROR_TIMEOUT'),
                        'tooManyElementsError' => GetMessage('LC_MENU_EDIT_SAVE_TOO_MANY_ELEMENTS'),
                        'isSaleExists' => CLocale::isSalesInAppStore() ? GetMessage('LC_INAPP_SALE'):'N',
                        'inapp_purschase' => GetMessage('LC_INAPP_PURCHASES'),
                        'systemTeplateModify' => GetMessage('LC_WRITE_SYSTEM_TEMPLATE'),
                        'workflowMode' => GetMessage('LC_EDIT_WINDOW_CHANGE_CONTROL'),
                        'localization' => GetMessage('LC_LOCALIZATION'),
                        'marketplace_page' => GetMessage('LC_MARKETPLACE_PAGE'),
                        'activate' => GetMessage('LC_ACTIVATE'),
                        'deactivate' => GetMessage('LC_DOM_MENU_DEACTIVATE'),
                        'translate_menu_links' => GetMessage('LC_DOM_MENU_EDIT_MENU_TRANSLATIONS'),
                        'mode' => GetMessage('LC_LOCALIZATION_MODE'),
                        'delTag' => GetMessage('LC_DOM_MENU_TAG_DELETE'),
                        'addTag' => GetMessage('LC_DOM_MENU_TAG_SAVE'),
                        'modify' => GetMessage('LC_DOM_MENU_MODIFY_TEXT'),
                        'selectPart' => GetMessage('LC_DOM_MENU_LINK_BREAK'),
                        'searchTranslate' => GetMessage('LC_DOM_MENU_SEARCH_TRANSLATE'),
                        'modifyTitle' => GetMessage('LC_DOM_MENU_HINT_EDIT'),
                        'addTitle' => GetMessage('LC_DOM_MENU_HINT_ADD'),
                        'delTitle' => GetMessage('LC_DOM_MENU_HINT_DELETE'),
                        'addTitleTitle' => GetMessage('LC_DOM_MENU_HINT_ADD_DISABLED'),
                        'loading' => GetMessage('LC_DATA_LOADING'),
                        'menuUndo' => GetMessage('LC_CANCEL'),
                        'about_menu' => GetMessage('LC_DOM_MENU_ABOUT'),
                        'settings_menu' => GetMessage('LC_EXTENSION_SETTINGS'),
                        'about_text' => GetMessage('LC_ABOUT_TEXT'),
                        'about_link' => GetMessage('LC_COPYRIGHT'),
                        'about_version' => str_replace('#VERSION#', $LOCALE_ENGINE->getVersion(), GetMessage('LC_ABOUT_VERSION')),
                        'about_date_update' => str_replace('#DATE#', date("Y-m-d H:i:s", filemtime($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/install/version.php')), GetMessage('LC_LAST_UPDATE_DATE')),
                        'error_same_lang' => GetMessage('LC_ERROR_SAME_LANGUAGE'),
                        'error_not_supported_lang' => GetMessage('LC_ALERT_LANG_AUTO_TRANSLATION_NOT_SUPPORTED'),
                        'error_not_configured_lang' => GetMessage('LC_ALERT_LANG_AUTO_TRANSLATION_NOT_CONFIGURED'),
                        'menuModifyTranslate' => GetMessage('LC_DOM_MENU_MODIFY_TRANSLATIONS'),
                        'closeWin' => GetMessage('LC_CLOSE'),
                        'agreement_info' => GetMessage('LC_AGREEMENT_INFO'),
                        'about_licence_agreement' => GetMessage('LC_EULA'),
                        'stGoogle' => GetMessage('LC_USE_GOOGLE_TRANSLATE'),
                        'stYandex' => GetMessage('LC_USE_YANDEX_TRANSLATE'),
                        'stMicrosoft' => GetMessage('LC_USE_MICROSOFT_TRANSLATOR'),
                        'sWiki' => GetMessage('LC_FIND_IN_WIKI'),
                        'sYouTube' => GetMessage('LC_FIND_IN_YOUTUBE'),
                        'logo_link' => GetMessage('LC_PRODUCT_PAGE_URL')
//                      'about_menu' => GetMessage(''),
                    )
                );
                $APPLICATION->AddHeadString('<script>var arLocaleParams = ' . LOC_json_safe_encode($arLocaleParams) . '</script>');
                $APPLICATION->AddHeadString('<style>.locale_mes {color:' . COption::GetOptionString("accorsys.localization", 'translated_text_color', 'red') . '!important;}</style>');
                $APPLICATION->AddHeadString('<script>(function($){$(function(){$(\'a[href="/?add_new_site_sol=sol&sessid=' . bitrix_sessid() . '"]\').attr("href","/?locale=off&add_new_site_sol=1");});})(jqLoc)</script>');
//                $need_jquery = COption::GetOptionString("accorsys.localization", 'need_jquery_library', 'N');
//                if ($need_jquery == 'Y'){
//                    $APPLICATION->AddHeadScript("/bitrix/js/accorsys.localization/jquery.min.js");
//                }
            }
        }
    }

    public function recursiveSearchInComponents($text, $file_content, $recursion_limit, $parent_component = false)
    {
        $file_content = preg_replace("'([^A-z0-9\'\\\"\(\)\:\.\,\ ])'", "", $file_content);
        $file_content = str_replace(Array('""', "''"), Array('" "', "' '"), $file_content);
        $file_include_component_patterns = Array(
            "'IncludeComponent\((.?)([\'\\\"]{1})([^\:]+)\:([^\'\\\"]+)([\'\\\"]{1})\,([^\'\\\"\,]*?)([\'\\\"]{1})([^\'\\\"]*?)([\'\\\"]{1})'im"
        );
        $k = count($file_include_component_patterns);
        $arFound = Array();
        for ($i = 0; $i < $k; $i++) {
            $pattern = $file_include_component_patterns[$i];
            if (CLocale::preg_match_all($pattern, $file_content, $matches)){

                if ($matches[0]){
                    $k_matches = count($matches[0]);
                    for ($match_key = 0; $match_key < $k_matches; $match_key++){
                        $match_val = $matches[0][$match_key];
                        if ($matches[8][$match_key] == ' ' || CLocale::preg_match("'([^\.\A-z0-9\_])'", $matches[8])) {
                            $matches[8][$match_key] = ".default";
                        } elseif ($matches[8][$match_key] !== ".default" && $parent_component){
                            $matches[8][$k_matches] = ".default";
                            $matches[3][$k_matches] = $matches[3][$match_key];
                            $matches[4][$k_matches] = $matches[4][$match_key];
                            $k_matches++;
                        }
                        $arComponent = Array(
                            "component" => $matches[3][$match_key] . ":" . $matches[4][$match_key],
                            "template" => $matches[8][$match_key]
                        );

                        if ($arComponent["component"]){
                            $arFoundInComponent = self::FindTextInComponent($text, $arComponent["component"], $arComponent["template"], $parent_component);
                            foreach ($arFoundInComponent as $found){
                                $arFound[] = $found;
                            }
                        }
                    }
                }
            }
        }

        if (strpos($file_content, "NAV_RESULT") || strpos($file_content, "NavNext")) {

            $navDirTemplate = Array(
                $_SERVER['DOCUMENT_ROOT'] . "/bitrix/templates/" . SITE_TEMPLATE_ID . "/components/bitrix/system.pagenavigation",
                $_SERVER['DOCUMENT_ROOT'] . "/bitrix/templates/.default/components/bitrix/system.pagenavigation"
            );

            foreach ($navDirTemplate as $navDirCurrentTemplate) {
                if (is_dir($navDirCurrentTemplate)) {
                    $dir = opendir($navDirCurrentTemplate);
                    while ($navTplDir = readdir($dir)) {
                        if (in_array($navTplDir, Array('.', '..'))) continue;
                        $currentNavTpl = $navDirCurrentTemplate . "/" . $navTplDir . "/template.php";
                        if (file_exists($currentNavTpl)) {
                            $arFoundTmp = self::findTextInFile($text, $currentNavTpl);
                            foreach ($arFoundTmp as $found) {
                                $arFound[] = $found;
                            }
                        }
                    }
                    closedir($dir);
                }
            }
        }

        return $arFound;
    }

    public function FindTextInComponent($text, $comp, $template = ".default", $parentComponent = false, $siteTemplate)
    {
        $found = Array();
        if ($comp) {
            $component = new CBitrixComponent();
            $component->InitComponent($comp, $template);

            $tpl = new CBitrixComponentTemplate();

//            if ($file_dir) {
//                $file_dir = str_replace($_SERVER['DOCUMENT_ROOT'], '', $file_dir);
//                $file_dir .= DIRECTORY_SEPARATOR.str_replace(":",DIRECTORY_SEPARATOR,$comp);
//                $new_tpl = explode(str_replace(":",DIRECTORY_SEPARATOR,$comp), $template);
//                $file_dir .= $new_tpl[1];
//            }

            if (is_object($parentComponent) && ($parentComponent instanceof cbitrixcomponent)){
                $component->__parent = $parentComponent;
            }
            $tpl->Init($component, $siteTemplate);

            if (!$tpl->__file) {
                $component->__templatePage = "section";
                $tpl->Init($component, $siteTemplate);
                if (!$tpl->__file) {
                    $component->__templatePage = "detail";
                    $tpl->Init($component, $siteTemplate);
                    if (!$tpl->__file) {
                        $component->__templatePage = "element";
                        $tpl->Init($component, $siteTemplate);
                        if (!$tpl->__file) {
                            $component->__templatePage = "sections";
                            $tpl->Init($component, $siteTemplate);
                        }
                    }
                }
            }
            $component->initComponentTemplate($component->__templatePage);

            $fcomponent = $_SERVER["DOCUMENT_ROOT"] . $tpl->__component->__path . "/component.php";
            $ftemplate = $_SERVER["DOCUMENT_ROOT"] . $tpl->__file;

            $found = Array();

            if ($tpl->__file && file_exists($ftemplate)) {
                $found = self::findTextInFile($text, $ftemplate);
            } else if ($tpl->__component->__path && file_exists($fcomponent)) {
                $found = self::findTextInFile($text, $fcomponent);
            }

            $arFound = self::FindInIncludes(
                Array(
                    $fcomponent,
                    $ftemplate
                ),
                $text,
                $component
            );

            foreach ($arFound as $found_el) {
                $found[] = $found_el;
            }

            $tpl_dir = explode("/", $tpl->__file);
            unset($tpl_dir[count($tpl_dir) - 1]);
            $tpl_dir = implode("/", $tpl_dir);
            $arFound = CLocale::FindTextInFullDir($text, ($_SERVER["DOCUMENT_ROOT"] . $tpl_dir), Array("component.php", "template.php", "script.js"));

            foreach ($arFound as $found_el) {
                $found[] = $found_el;
            }

            $arFound = CLocale::FindTextInFullDir($text, ($_SERVER["DOCUMENT_ROOT"] . $tpl->__component->__path), Array("component.php", "template.php"));

            foreach ($arFound as $found_el) {
                $found[] = $found_el;
            }
        }

        if (!$found)
            return false;
        else
            return self::DeleteDuplicates($found);
    }

    public function FindInInclude($text_of_file, $text, $parent_component = false)
    {
        $found = Array();
        $file_include_patterns = Array(
            "'(include|require|include_once|require_once).?\(([^\)]+?)\)'i",
            "'(include|require|include_once|require_once).?\"([^\"]+?)\"'i",
            "'(include|require|include_once|require_once).?\'([^\']+?)\''i",
        );
        $arMatch = Array();
        $k = count($file_include_patterns);
        for ($i = 0; $i < $k; $i++) {
            $pattern = $file_include_patterns[$i];
            if (CLocale::preg_match_all($pattern, $text_of_file, $matches)) {
                $arMatch[] = $matches;
            }
        }
        $found = Array();
        if (!empty($arMatch))
            foreach ($arMatch as $matches) {
                if (!empty($matches[2]))
                    foreach ($matches[2] as $match) {
                        $match = trim($match);
                        $first_symbol = substr($match, 0, 1);
                        if (in_array($first_symbol, Array('$', '"', "'"))) {
                            eval("\$match = " . $match . ";");
                        }

                        if (file_exists($match)) {
                            $found = array_merge($found, self::findTextInFile($text, $match));
                        }
                    }
            }

        $arFound = self::recursiveSearchInComponents($text, $text_of_file, 1000, $parent_component);
        foreach ($arFound as $foundTmp) {
            $found[] = $foundTmp;
        }
        return self::DeleteDuplicates($found);
    }

    public function DeleteDuplicates($array)
    {
        $arExt = Array();
        foreach ($array as $key => $val) {
            if (in_array($val['FILE'], array_keys($arExt)) && in_array($val['POS'], $arExt[$val['FILE']])) {
                unset($array[$key]);
            } else {
                $arExt[$val['FILE']][] = $val['POS'];
            }
        }
        //sorting
        foreach ($array as $key => $val) {
            if (strpos($val['CROP_TEXT'], '"' . $val['TEXT'] . '"')
                || strpos($val['CROP_TEXT'], "'" . $val['TEXT'] . "'")
                || strpos($val['CROP_TEXT'], ">" . $val['TEXT'] . "<")
            ) {
                $array[$key]['SORT'] = 1;
            } elseif (strpos($val['CROP_TEXT'], ' ' . $val['TEXT'] . ' ')) {
                $array[$key]['SORT'] = 2;
            } else {
                $array[$key]['SORT'] = 3;
            }
        }
        usort($array, 'localeResultsSort');
        return $array;
    }

    public function FindInIncludes($arfiles, $text, $parent_component = false)
    {
        $found = Array();
        $k = count($arfiles);
        for ($i = 0; $i < $k; $i++) {
            $ftext = self::file_get_contents($arfiles[$i]);
            $arFound = self::FindInInclude($ftext, $text, $parent_component);
            foreach ($arFound as $found_el){
                $found[] = $found_el;
            }
        }
        return $found;
    }

    public function countPhpTags($text){
        $tagPos = -2;
        $countPhpTags = 0;
        while(($tagPos = strpos($text,'?>', $tagPos + 2)) !== false){
            $countPhpTags++;
        }
        $tagPos = -2;
        while(($tagPos = strpos($text,'<?', $tagPos + 2)) !== false){
            $countPhpTags++;
        }
        return $countPhpTags;
    }

    public function forPregHtmlEntitiesReplace($text, &$regularForReplace){
        $matches = array();
        CLocale::preg_match_all("/&[\w\#]{1,}\;/U",$text,$matches);
        foreach($matches[0] as $match){
            $arEntities[$match] = $match;
        }
        unset($arEntities['&nbsp;']);
        unset($arEntities['&NonBreakingSpace;']);
        unset($arEntities['&#160;']);
        foreach($arEntities as $entity){
            $decodedEntity = html_entity_decode($entity);
            if($entity != $decodedEntity){
                $regularForReplace = str_replace($entity,$decodedEntity,$regularForReplace);
                $regularForReplace = str_replace('#REPLACE#',$decodedEntity,str_replace($decodedEntity,"([\#REPLACE#]{1}|[$entity]{".strlen($entity)."})",$regularForReplace));
            }
        }
    }

    public static function forSaveHtmlEntitiesReplaceEncode($textForFind, &$textForReplace){
        $matches = array();
        CLocale::preg_match_all("/&[\w\#]{1,}\;/U",$textForFind,$matches);
        foreach($matches[0] as $match){
            $arEntities[$match] = $match;
        }
        unset($arEntities['&nbsp;']);
        unset($arEntities['&NonBreakingSpace;']);
        unset($arEntities['&#160;']);
        unset($arEntities['&gt;']);
        unset($arEntities['&#62;']);
        unset($arEntities['&lt;']);
        unset($arEntities['&#60;']);
        foreach($arEntities as $entity){
            $decodedEntity = html_entity_decode($entity);
            if($entity != $decodedEntity){
                $textForReplace = str_replace($decodedEntity,$entity,$textForReplace);
            }
        }
    }

    public function findTextInFile($text, $file)
    {
        if(file_exists($file)){
            $offset = null;
            $ftext = self::file_get_contents(trim($file));
            $regularText = $text;
            $regularText = preg_quote($text, '/');
            $regularText = str_replace(array(chr(160),'&nbsp;','&NonBreakingSpace;','\n','\r',chr(10),chr(9),chr(13)),' ',$regularText);
            $regularText = preg_replace('/[\s]{1,}/isU', ' ', $regularText);
            $regularText = preg_replace('/[\s]{1,}/isU', '([\s\W]+|&nbsp;|&NonBreakingSpace;|&#160;)', $regularText);
            $regularText = str_replace('\<\/', '[\s\W]{0,}\<\/', $regularText);
            $regularText = str_replace('\>', '[\s\W]{0,}\>[\s\W]{0,}', $regularText);
            $regularText = str_replace(array('<br>','<br />','<br/>'), '(\<br\>|\<br \/\>|\<br\/\>)', $regularText);
            self::forPregHtmlEntitiesReplace($ftext,$regularText);
            $originalCountPhpTags = self::countPhpTags($text);
            $return = Array();
            $matches = array();
            CLocale::preg_match_all('/'.$regularText.'/isU', $ftext ,$matches, PREG_OFFSET_CAPTURE);
            foreach($matches[0] as $match){
                if(trim($match[0]) != ''){
                    $findedCountPhpTags = self::countPhpTags($match[0]);
                    if($findedCountPhpTags != $originalCountPhpTags)
                        continue;

                    $return[] = Array(
                        "FILE" => str_replace($_SERVER["DOCUMENT_ROOT"], "", $file),
                        "POS" => $match[1],
                        "CROP_TEXT" => self::getCroppedText($match[0], $ftext, $match[1]),
                        "TEXT" => $match[0],
                        "TEXT_LEN" => strlen($match[0])
                    );
                }
            }
        }
        return $return;
    }

    public function FindTextInFullDir($text, $dir, $exclude = Array())
    {
        $return = Array();
        $diropen = opendir($dir);
        while (false !== ($f = readdir($diropen))) {
            $ext = explode(".", $f);
            $ext = $ext[count($ext) - 1];
            if (is_file($dir . "/" . $f) && in_array($ext, Array("php", "js"))) {
                $return_tmp = self::findTextInFile($text, ($dir . "/" . $f));
                $k = count($return_tmp);
                for ($i = 0; $i < $k; $i++) {
                    if ($return_tmp[$i])
                        $return[] = $return_tmp[$i];
                }
            }
        }
        closedir($diropen);
        return $return;
    }

    public function FindTextInTemplate($text, $template = ".default")
    {
        $found = Array();
        $fheader = $_SERVER["DOCUMENT_ROOT"] . "/bitrix/templates/" . $template . "/header.php";
        $ffooter = $_SERVER["DOCUMENT_ROOT"] . "/bitrix/templates/" . $template . "/footer.php";
        $return_tmp = self::findTextInFile($text, $fheader);
        $k = count($return_tmp);
        for ($i = 0; $i < $k; $i++) {
            if ($return_tmp[$i])
                $found[] = $return_tmp[$i];
        }
        $return_tmp = self::findTextInFile($text, $ffooter);
        $k = count($return_tmp);
        for ($i = 0; $i < $k; $i++) {
            if ($return_tmp[$i])
                $found[] = $return_tmp[$i];
        }
        $arFound = self::FindInIncludes(Array($fheader, $ffooter), $text);
        foreach ($arFound as $found_el) {
            $found[] = $found_el;
        }
        return $found;
    }

    public function findTextInJSTemplate($text, $path_to_template)
    {
        $file = explode("/", $path_to_template);
        $file[count($file) - 1] = 'script.js';
        $file = implode("/", $file);
        if (file_exists($file)){
            $found = self::findTextInFile($text, $file);
            return $found;
        }
    }

    /*function CreateElement($path_to_file,$tag_name,$text){
        global $APPLICATION;
        $message = "";
        if (file_exists($path_to_file)){
            $text_file = file_get_contents($path_to_file);
            $lang_file = CLocale::GetLangFile($path_to_file);
            $MESS = Array();
            include($lang_file);
            if (!$MESS[$tag_name]) {
                if (CLocale::preg_match_all("'([\'\"]{1})'".$text."'([\'\"]{1})'",$text_file,$matches)){
                    $message = "Found in string variable ".$lang_file."<br />";
                }else{
                    $new_text = '<?=GetMessage("'.$tag_name.'")?>';
                    $text_file = str_replace($text,$new_text,$text_file);
                    $MESS[$tag_name] = str_replace("\"","'",$text);
                    $text_lang = CLocale::CreateMessageFileContent($MESS);
                    $f = fopen($lang_file,"w");
                    fwrite($f,$text_lang);
                    fclose($f);
                    $f = fopen($path_to_file,"w");
                    fwrite($f,$text_file);
                    fclose($f);
                    $message = $text." saved in ".$lang_file."<br />";
                }
            }else{
                $APPLICATION->ThowException("Tag already exist");
            }
        }
        return $message;
    }*/

    public function getRealFile($file)
    {
        if(strpos('#LANG_TAG_REPLACE#',$file)!== false){
            $file = str_replace('#LANG_TAG_REPLACE#','',$file);
        } elseif (!file_exists($file)) {
            if (strpos($file, $_SERVER['DOCUMENT_ROOT']) === false) {
                $file = $_SERVER['DOCUMENT_ROOT'] . $file;
            } else {
                $file = str_replace($_SERVER['DOCUMENT_ROOT'], '', $file);
                if (!file_exists($file)) {
                    $file = $_SERVER['DOCUMENT_ROOT'] . $file;
                }
            }
        }
        return $file;
    }

    public function isTemplateFile ($path){
        $cutPath = str_replace($_SERVER["DOCUMENT_ROOT"],"",$path);
        if(strpos($cutPath,'/bitrix/components/') === 0 || strpos($cutPath,'/bitrix/templates/'.$this->currentTemplate.'/components/') === 0 || strpos($cutPath,'/bitrix/templates/.default/components/') === 0){
            return true;
        }
        return false;
    }

    public function GetLangFile($file, $lid = false, $isRealFile = false)
    {
        if (!$lid) $lid = LANGUAGE_ID;
        $this->currentTemplate = trim($_REQUEST['siteTemplate']);
        $file = self::getRealFile($file);

        $file = str_replace("\\\\", "/", $file);
        $file = str_replace("\\", "/", $file);

        if (file_exists($file)) {
            $filename = explode("/", $file);
            $filename = $filename[count($filename) - 1];
            $lang_file = explode("/", $file);
            unset($lang_file[count($lang_file) - 1]);
            $lang_file = implode("/", $lang_file);
            $lang_file .= "/lang/" . $lid . "/" . $filename;

            if (file_exists($lang_file)){
                return $lang_file;
            } elseif($this->isTemplateFile($lang_file)){
                $langsDirPath = str_replace("/".$lid."/".$filename,"",$lang_file);
                $langDirPath = str_replace("/".$filename,"",$lang_file);
                self::makeDirsAndFiles($langsDirPath,$langDirPath,$lang_file);
            } elseif (file_exists(str_replace($filename, "template.php", $lang_file))) {
                return str_replace($filename, "template.php", $lang_file);
            } elseif (file_exists(str_replace($filename, "component.php", $lang_file))) {
                return str_replace($filename, "component.php", $lang_file);
            } elseif ($this->currentTemplate) {
                $lang_file = $_SERVER['DOCUMENT_ROOT'] . '/bitrix/templates/' . $this->currentTemplate . '/lang/' . $lid . '/header.php';
                $langsDirPath = str_replace("/".$lid."/header.php","",$lang_file);
                $langDirPath = str_replace("/header.php","",$lang_file);
                self::makeDirsAndFiles($langsDirPath,$langDirPath,$lang_file);
                return $lang_file;
            } else {
                touch($lang_file);
                return $lang_file;
            }
        }elseif(strpos($file,'#LANG_TAG_REPLACE#') !== false){
            $filename = explode("/", str_replace('#LANG_TAG_REPLACE#', '', $file));
            $filename = $filename[count($filename) - 1];
            $lang_file = str_replace('#LANG_TAG_REPLACE#', '/lang/'.$lid, $file);

            $langsDirPath = str_replace("/".$lid."/".$filename,"",$lang_file);
            $langDirPath = str_replace("/".$filename,"",$lang_file);

            self::makeDirsAndFiles($langsDirPath,$langDirPath,$lang_file);

            return str_replace('#LANG_TAG_REPLACE#', '/lang/'.$lid, $file);
        }
        return false;
    }
    private function makeDirsAndFiles($langsDirPath,$langDirPath,$lang_file){
        if(!is_dir($langsDirPath)){
            mkdir($langsDirPath);
            chmod($langsDirPath,0755);
        }
        if(!is_dir($langDirPath)){
            mkdir($langDirPath);
            chmod($langDirPath,0755);
        }
        if(!file_exists($lang_file)){
            file_put_contents($lang_file,"<?");
            chmod($lang_file,0755);
        }
    }

    public function CreateMessageFileContent($mess)
    {
        $content = "<? /*FILE CREATED BY A.LOCALE*/\r\n";
        foreach ($mess as $key => $val) {
            $val = str_replace("\\", '', $val);
            $content .= "\$MESS['" . $key . "'] = '" . str_replace("'","\'", $val) . "';\r\n";
        }
        $content .= "?>";
        return $content;
    }

    public function GetSiteLangs($siteID = false)
    {
        $curSiteID = CSite::GetByID(SITE_ID)->selectedRowsCount() > 0 ? SITE_ID : $siteID;
        include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
        $arDefLangs = $arAccorsysLocaleLangs;
        $arLangs = unserialize(COption::GetOptionString("accorsys.localization","accorsysSiteLang"));
        $arNeededLangs = array();
        foreach($arLangs as $indexSiteID => $arIndexLangs){
            foreach($arIndexLangs as $lang){
                if(trim($lang) != "" && $indexSiteID == $curSiteID)
                    $arNeededLangs[$lang] = array("LID"=>$lang,
                                             "NAME"=>$arDefLangs[$lang]);
            }
        }
        return $arNeededLangs;
    }

    public function putInFile($file, $text)
    {
        if ($f = @fopen($file, "w")) {
            fwrite($f, $text);
            fclose($f);
            return true;
        }
        return false;
    }

    public function setTagInFile($tag, $text, $file, $lid = null)
    {
        ini_set('opcache.enable', 0);
        global $MESS;
        $file = self::getRealFile($file);
        $file = str_replace("\\", "/", $file);
        if($lid)
            $langFile = $this->GetLangFile($file,$lid); // ??? ?????????? ???? ????? ???? ?? ??????????
        if (file_exists($file)) {
            $MESS = Array();
            include($file);
            if ($text)
                $MESS[$tag] = $text;
            else
                unset($MESS[$tag]);

            $content = CLocale::CreateMessageFileContent($MESS);
            return CLocale::putInFile($file, $content);
        }
    }

    public static function getRealValue($val)
    {
        if (is_array($val) && !array_key_exists("VALUE", $val)) {
            $val = array_pop($val);
        }
        if (is_array($val) && $val["VALUE"]) {
            $val = $val["VALUE"];
        }
        return $val;
    }

    public static function OnBeforeIblockElementAddHandler (&$arFields){
        if($_REQUEST["accorsysLocAjaxReindex"] != 'Y'){
            if(CLocale::$localeIblockID == 0){
                $arIblockID = CIBlock::GetList(false, Array("CODE" => self::$IBLOCK_CODE))->getNext();
                $iblockID = $arIblockID["ID"];
                CLocale::$localeIblockID = $iblockID;
            }
            else {
                $iblockID = CLocale::$localeIblockID;
            }

            if ($arFields["IBLOCK_ID"] != $iblockID || trim($arFields['MODIFIED_BY']) == "" || isset($arFields['WF_PARENT_ELEMENT_ID'])){
                return true;
            }

            $res = CIBlock::GetProperties($iblockID, Array("PROPERTY_TYPE"=>"S"));
            while($arRes  = $res->fetch()){
                if($arRes['CODE'] == 'lang')
                    $idLangName = $arRes['ID'];
                if($arRes['CODE'] == 'lang_file')
                    $idLangFile = $arRes['ID'];
                if($arRes['CODE'] == 'text')
                    $idLangText = $arRes['ID'];
            }
            $lid = trim($arFields["PROPERTY_VALUES"][$idLangName]['n0']["VALUE"]) == "" ? $arFields["PROPERTY_VALUES"]['lang']:$arFields["PROPERTY_VALUES"][$idLangName]['n0']["VALUE"];
            $lang_file = $arFields["PROPERTY_VALUES"][$idLangFile]['n0']["VALUE"]  == "" ? $arFields["PROPERTY_VALUES"]['lang_file']:$arFields["PROPERTY_VALUES"][$idLangFile]['n0']["VALUE"];

            if($arElement = CIBlockElement::getList(array(),array(
                "NAME"=> $arFields["NAME"],
                "PROPERTY_lang"=> $lid,
                "PROPERTY_lang_file"=> $lang_file,
            ))->getNext()){
                global $APPLICATION;
                $APPLICATION->throwException(GetMessage("LC_ERROR_LANGUAGE_PHRASE_ALREADY_EXISTS"));
                return false;
            }else{
                $file = $_SERVER["DOCUMENT_ROOT"].$lang_file;
                $filename = explode("/", $file);
                $filename = $filename[count($filename) - 1];

                $aLocale = new CLocale();
                if(!file_exists($file)){
                    $langsDirPath = str_replace("/".$lid."/".$filename,"",$file);
                    $langDirPath = str_replace("/".$filename,"",$file);
                    if(!is_dir($langsDirPath)){
                        mkdir($langsDirPath);
                        chmod($langsDirPath,0755);
                    }
                    if(!is_dir($langDirPath)){
                        mkdir($langDirPath);
                        chmod($langDirPath,0755);
                    }
                    if(!file_exists($file)){
                        file_put_contents($file,"<?");
                        chmod($file,0755);
                    }
                }
                $aLocale->setTagInFile($arFields["NAME"], $arFields["PROPERTY_VALUES"][$idLangText]['n0']["VALUE"], $_SERVER["DOCUMENT_ROOT"].$arFields["PROPERTY_VALUES"][$idLangFile]['n0']["VALUE"],$arFields["PROPERTY_VALUES"][$idLangName]['n0']["VALUE"]);
            }
        }
    }

    public static function onIBElementUpdateHandler(&$ar)
    {
        $arFields = $ar;
        global $UPDATE_FROM_INDEX;
        //$this->iblock_id
        if ($UPDATE_FROM_INDEX) {
            $UPDATE_FROM_INDEX = false;
            return true;
        }

        if ($arFields["IBLOCK_CODE"] && $arFields["IBLOCK_CODE"] != 'ALOCALE_IBLOCK') {
            return true;
        }

        if (CModule::IncludeModule('workflow') && $arFields["WF_STATUS_ID"] && $arFields["WF_STATUS_ID"] != 1) {
            return true;
        }

        if (!$arFields["IBLOCK_CODE"] || !$arFields["NAME"]) {
            $rsEl = CIBlockElement::GetList(false, Array("ID" => $arFields["ID"]), false, false, Array("ID", "IBLOCK_ID", "IBLOCK_CODE", "NAME", "PROPERTY_text"));
            if ($arEl = $rsEl->GetNext()) {
                $arFields["IBLOCK_CODE"] = $arEl["IBLOCK_CODE"];
                $arFields["IBLOCK_ID"] = $arEl["IBLOCK_ID"];
                $arFields["NAME"] = $arEl["NAME"];
            }
        }

        $arProps = Array();

        $rsProp = CIBlockProperty::GetList(false, Array("IBLOCK_CODE" => $arFields["IBLOCK_CODE"]));
        while ($arProp = $rsProp->GetNext()) {
            $arProps[$arProp["CODE"]] = $arProp["ID"];
        }

        if (!$arFields["PROPERTY_VALUES"][$arProps["text"]]) {
            $rsEl = CIBlockElement::GetList(false, Array("ID" => $arFields["ID"], "IBLOCK_ID" => $arFields["IBLOCK_ID"]), false, false, Array("PROPERTY_text"));
            if ($arElProp = $rsEl->GetNext()) {
                $arFields["PROPERTY_VALUES"][$arProps["text"]] = Array(
                    "VALUE" => $arElProp['PROPERTY_TEXT_VALUE']
                );
            }
        }

        if ($arFields["IBLOCK_CODE"] == 'ALOCALE_IBLOCK') {
            $tag_name = $arFields["NAME"];

            if ($arFields["ACTIVE"] != "N") {
                $text = $arFields["PROPERTY_VALUES"][$arProps["text"]];
//                if (!$text){
//                    $text = $arFields["PREVIEW_TEXT"];
//                }
            }

            $lang_file = self::getRealValue($arFields["PROPERTY_VALUES"][$arProps["lang_file"]]);
            $text = self::getRealValue($text);

            $new_text = $text;

            if (!$lang_file) {
                $db_props = CIBlockElement::GetProperty($arFields["IBLOCK_ID"], $arFields["ID"], array("sort" => "asc"), Array("CODE" => "lang_file"));
                if ($ar_props = $db_props->Fetch()) $lang_file = $ar_props["VALUE"];
            }

            if ($lang_file) {
                if (is_array($lang_file) && !array_key_exists("VALUE", $lang_file)) {
                    $lang_file = array_pop($lang_file);
                    $lang_file = $lang_file["VALUE"];
                } elseif (is_array($lang_file) && $lang_file["VALUE"]) {
                    $lang_file = $lang_file["VALUE"];
                }
            }
            if($ar["ACTIVE"] != 'N')
                self::setTagInFile($tag_name, $new_text, ($_SERVER["DOCUMENT_ROOT"] . $lang_file));
        }
    }
    function handlerForOnAfterIBlockAdd(){
        $lcSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
        $lcSettings['notUsedIBlocksConstants'] = 'reWrite';
        file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini",serialize($lcSettings));
    }
    function handlerForOnIBlockDelete(){
        $lcSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
        $lcSettings['notUsedIBlocksConstants'] = 'reWrite';
        file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini",serialize($lcSettings));
    }
    function onIblockElementDelete($ID)
    {

        return true;

//        if ($GLOBALS["LOCALE_DELETE_BLOCKER"]) return true;
//
//        global $APPLICATION;
//        $arFields = Array();
//        $rsEl = CIBlockElement::GetList(false,Array("ID"=>$ID),false,false,Array("ID","IBLOCK_CODE"));
//        if ($arEl = $rsEl->GetNext()){
//            $arFields["IBLOCK_CODE"] = $arEl["IBLOCK_CODE"];
//        }
//        if ($arFields["IBLOCK_CODE"] && $arFields["IBLOCK_CODE"]!='ALOCALE_IBLOCK' || !$arFields["IBLOCK_CODE"]){
//            return true;
//        }
//        $rsEl = CIBlockElement::GetList(false,Array("ID"=>$ID,"IBLOCK_CODE"=>$arFields["IBLOCK_CODE"]),false,false,Array("ID","NAME","PROPERTY_lang_file"));
//        if ($arEl = $rsEl->GetNext()){
//            $tag_name = $arEl["NAME"];
//            $lang_file = $arEl["PROPERTY_LANG_FILE_VALUE"];
//
//            if (!self::setTagInFile($tag_name,'',($_SERVER["DOCUMENT_ROOT"].$lang_file))){
//                $APPLICATION->ThrowException('Not found in file');
//                return false;
//            }
//            return true;
//        }
//        $APPLICATION->ThrowException('Not found in file');
//        return false;
    }

    public function OnBitrixUpdatesInstalled($successModules, $loadModules, $errorModules, $modulesUpdates)
    {
        CModule::IncludeModule('iblock');
        $arPropertyIsReplace = CIBlockProperty::GetPropertyEnum("is_replace")->getNext();
        $propertyIsReplace = $arPropertyIsReplace["ID"];
        $dbSystemElements = CIBlockElement::getList(array(),array("PROPERTY_IS_REPLACE" => $propertyIsReplace),false,false,array("IBLOCK_ID","NAME","PROPERTY_IS_REPLACE","PROPERTY_LANG","PROPERTY_LANG_FILE","PROPERTY_TEXT"));
        if((int)$dbSystemElements->selectedRowsCount() > 0){
            while($arSystemEl = $dbSystemElements->getNext()){
                self::setTagInFile($arSystemEl["NAME"], $arSystemEl["PROPERTY_TEXT_VALUE"], ($_SERVER["DOCUMENT_ROOT"] . $arSystemEl["PROPERTY_LANG_FILE_VALUE"]));
            }
        }
    }

    function localeOnAdminListDisplay(&$list)
    {
        global $APPLICATION;
        CModule::IncludeModule("iblock");
        $ariblockID = CIblock::getList(array(),array("CODE"=>'ALOCALE_IBLOCK'))->getNext();
        $iblockID = $ariblockID["ID"];
        if($list->aRows[0]->arRes["IBLOCK_ID"] == $iblockID && trim($iblockID) != ""){
            CJSCore::Init(array("jquery"));
            $list->context->items[] = array("TEXT" => GetMessage("LC_TOP_BUTTON_INDEX"), "LINK" => "/bitrix/admin/lc_lang_index.php");
            $arAdditionalActions = array(
                "copy_all_as_new_lang" => GetMessage("LC_TRANSLATIONS_COPY"),
                "translate_all_langs" => GetMessage("LC_ONLINE_TRANSLATE")
            );
            if(isset($list->arActions['lock'])){
                $locale = new CLocale();
                $GLOBALS['isAddedAccorsysLineScript'] = true;
                $locale->OnPrologHandler(true);
                $list->arActions = $arAdditionalActions + $list->arActions;
                $list->arActionsParams['select_onchange'] .= "
                if(this.value == 'copy_all_as_new_lang')
                {
                    jsUtils.OpenWindow('/bitrix/admin/accorsys_locale_copy_all_as_new_lang.php?iblockId=$iblockID&'+$(this).closest('form').serialize(), 1100, 550);
                    $(this).val('');
                }else if(this.value == 'translate_all_langs'){
                    jsUtils.OpenWindow('/bitrix/admin/accorsys_locale_iblock_translate_form.php?indexiblockid=Y&iblockId=$iblockID&'+$(this).closest('form').serialize(), 1100, 550);
                    $(this).val('');
                }";
            }
        }elseif(isset($list->aRows[0]->arRes["IBLOCK_ID"])){
            foreach($list->aRows as $k=>$item){
                if($item->arRes['TYPE'] == 'S'){
                    $iblockId = $item->arRes["IBLOCK_ID"];
                    $id = $item->arRes["ID"];

                    $script = <<<SCRIPT
                 jsUtils.OpenWindow('/bitrix/admin/accorsys_locale_iblock_translate_form.php?iblockId=$iblockId&id=$id&translate_sections=Y', 1100, 550);
SCRIPT;

                    /*$list->aRows[$k]->aActions[] = array(
                        "TEXT" => GetMessage('LC_TRANSLATE'),
                        "ACTION" => $script
                    );*/

                    #region ??????? ?????? ???????
                        array_unshift($list->aRows[$k]->aActions,array(
                            "TEXT" => GetMessage('LC_TRANSLATE'),
                            "ACTION" => $script
                        ),array(
                            "SEPARATOR" => true
                        ));
                    #endregion

                }elseif($item->arRes['TYPE'] == 'E'){

                    $iblockId = $item->arRes["IBLOCK_ID"];
                    $id = $item->arRes["ID"];

                    $script = <<<SCRIPT
                 jsUtils.OpenWindow('/bitrix/admin/accorsys_locale_iblock_translate_form.php?iblockId=$iblockId&id=$id&translate_element=Y', 1100, 550);
SCRIPT;
                    /*$list->aRows[$k]->aActions[] = array(
                        "TEXT" => GetMessage('LC_TRANSLATE').' ???????1',
                        "ACTION" => $script
                    );*/
                    #region ??????? ?????? ???????
                        array_unshift($list->aRows[$k]->aActions,array(
                            "TEXT" => GetMessage('LC_TRANSLATE'),
                            "ACTION" => $script
                        ),array(
                            "SEPARATOR" => true
                        ));
                    #endregion
                }
            }
        }elseif(isset($list->aRows[0]->arRes['LID'])
            && isset($list->aRows[0]->arRes['CODE'])
            && isset($list->aRows[0]->arRes['IBLOCK_TYPE_ID'])
        ){
            $count = CIblock::getList(array(),array("ID"=>$list->aRows[0]->arRes['ID']))->SelectedRowsCount();
            if($count > 0){

                foreach($list->aRows as $k=>$item){
                    if($item->arRes["ID"] == $iblockID)
                        continue;

                    $iblockId = $item->arRes["ID"];
                    $script = <<<SCRIPT
                     jsUtils.OpenWindow('/bitrix/admin/accorsys_locale_iblock_translate_form.php?iblockId=$iblockId', 1100, 550);
SCRIPT;
                    $list->aRows[$k]->aActions[] = array(
                        "TEXT" => GetMessage("LC_TRANSLATE"),
                        "ACTION" => $script
                    );

                    $script = <<<SCRIPT
                     jsUtils.OpenWindow('/bitrix/admin/accorsys_locale_iblock_copy_form.php?iblockId=$iblockId', 1100, 550);
SCRIPT;
                    $list->aRows[$k]->aActions[] = array(
                        "TEXT" => GetMessage("LC_COPY_ACTION"),
                        "ACTION" => $script
                    );

                    #region ??????? ????????? ???????
                        $basketorder = 1;
                        $GLOBALS['plusOrder'] = $basketorder;
                        $GLOBALS['minusOrder'] = -$basketorder;
                        usort($list->aRows[$k]->aActions,'CLocale::sortKeyText');
                    #endregion
                }


                // usort($arResult['ITEMS']['AnDelCanBuy'], 'basketsort' . $by);
            }
        }
    }

    public function OnBufferContent (&$buffer){
        global $APPLICATION;
        if(isset($GLOBALS["accorsys_localization_lang_switcher"])){
            $buffer = preg_replace("/\<[\s]{0,}\/body[\s]{0,}\>/isU",$GLOBALS["accorsys_localization_lang_switcher"].'</body>',$buffer);
        }
        if(isset($GLOBALS["ACCORSYS_SHOW_PANEL_MODE"]) && $GLOBALS["ACCORSYS_SHOW_PANEL_MODE"]){
            $matchesBody = array();
            self::preg_match("/\<[\s]{0,}body(.*)\>/isU",$buffer,$matchesBody);
            $originalBody = $matchesBody[1];
            $buffer = preg_replace("/\<[\s]{0,}body.*\>/isU",'<body '.$originalBody.'>'.CTopPanel::GetPanelHtml(),$buffer);
        }
        if($_SESSION["LOCALE_MODE_ENABLED"] == "Y" && $APPLICATION->GetCurDir() != "/bitrix/admin/" && strpos($APPLICATION->GetCurDir(),"/ajax/accorsys.localization/") !== 0){
            $matches = array();
            CLocale::preg_match_all("/\>(.*)i class='locale_mes'(.*)\</U",$buffer,$matches);
            foreach($matches[0] as $key => $match){
                $savedMatch = $match;
                $match  = str_replace("&lt;","<",$match);
                $match  = str_replace("&gt;",">",$match);
                if($match != $savedMatch){
                    $arSavedMatches[] = $savedMatch;
                    $arMatches[] = $match;
                }
            }

            $buffer = str_replace($arSavedMatches,$arMatches,$buffer);
            $buffer = str_replace('/bitrix/admin/public_menu_edit.php?','/bitrix/admin/locale_files_edit.php?templateId='.SITE_TEMPLATE_ID.'&', $buffer);
            $buffer = str_replace('/bitrix/admin/public_file_property.php?','/bitrix/admin/locale_file_property.php?templateId='.SITE_TEMPLATE_ID.'&', $buffer);

            $matches = array();
            CLocale::preg_match_all("/\<option[^\<]{0,}<i class='locale_mes'.*\>.*option\>/isU",$buffer,$matches);
            foreach($matches[0] as $match){
                $subMatch = array();
                CLocale::preg_match("/<i class=\'.*\'\>/isU",$match,$subMatch);
                if(trim($subMatch[0]) == "")
                    continue;

                $forReplaceProps = str_replace(array('<option',$subMatch[0],'</i>'),array('<option'.str_replace('<i',' ',rtrim($subMatch[0], '>')),'',''),$match);
                $buffer = str_replace($match, $forReplaceProps, $buffer);
            }
        }
    }

    function sortKeyText($a, $b)
    {
        global $plusOrder, $minusOrder;

        if ($a['TEXT'] == $b['TEXT']) {
            return 0;
        }

        return ($a['TEXT'] < $b['TEXT']) ? $minusOrder : $plusOrder;
    }
}

class CLocaleElement extends CLocale
{
    private $text; //only for new tag
    private $tagname;
    private $_component;
    private $_template;
    private $message;
    private $error;
    private $arTexts; //for existing tags
    private $iblock_id;
    private $is_js = false;
    private $is_php = false;
    private $is_html = false;
    private $isSystemLocale;

    var $_path_to_file;
    var $_path_to_php_for_js;
    var $_path_to_lang;

    var $langs;

    function __construct($text = "", $component = false, $template = false, $isSystemLocale = false)
    {
        $this->isSystemLocale = $isSystemLocale;
        $this->text = $text;
        $this->_component = $component;
        $this->_template = $template;
        $this->message = "";
        $this->error = "";
        $arLangs = self::GetSiteLangs();
        $this->langs = Array();

        foreach ($arLangs as $lang){
            $this->langs[] = $lang["LID"];
        }
        if (CModule::IncludeModule("iblock")){
            $rsIBlock = CIBlock::GetList(false, Array("CODE" => self::$IBLOCK_CODE));
            if ($arIblock = $rsIBlock->GetNext()){
                $this->iblock_id = $arIblock["ID"];
            }
        } else {
            return false;
        }
    }

    function SetTagName($tag)
    {
        $this->tagname = $tag;
    }

    function GetTag()
    {
        return $this->tagname;
    }

    function GetMessage()
    {
        return $this->message;
    }

    function GetError()
    {
        return $this->error;
    }

    function GetLangPath($lid = false)
    {
        if ($lid && !in_array($lid, $this->langs)) {
            $this->error = "Language not exist";
            return false;
        }
        $this->_path_to_lang = self::GetLangFile($this->_path_to_file, $lid);
        return $this->_path_to_lang;
    }

    function GetText()
    {
        return $this->text;
    }

    function SetTextForLid($lid, $text)
    {
        $this->arText[$lid] = $text;
    }

    /**
     * @return $arLang['langKey'] = $disabledText;
     */
    function checkLangStatus(){
        $arDisabledLangs = array();
        $ariblockID = CIBlock::Getlist(array(),array("CODE"=>"ALOCALE_IBLOCK"))->getNext();
        $iblockID = $ariblockID["ID"];
        foreach ($this->langs as $lang){
            $arFilter = array(
                "IBLOCK_ID" => $iblockID,
                "PROPERTY_lang" => $lang,
                "PROPERTY_lang_file" => str_replace($_SERVER["DOCUMENT_ROOT"],"",$this->GetLangPath($lang)),
                "NAME" => $this->getTag()
            );
            $dbLang = CIBlockElement::GetList(array(),$arFilter,false,false,array("PROPERTY_text","ACTIVE"));

            if($dbLang->SelectedRowsCount() > 0){
                while($arLang = $dbLang->GetNext()){
                    if($arLang["ACTIVE"] == "N"){
                        $arDisabledLangs[$lang] = $arLang["PROPERTY_TEXT_VALUE"];
                    }
                }
            }
        }
        return $arDisabledLangs;
    }

    public static function checkTitle($text){
        $isNeedSaveTitle = false;
        $matches = array();
        $arCheckTitle = array();
        if (CLocale::preg_match("'class=\"locale-title-tag\" title=\\\"(.+?)\\\" data-mark=\"end-of-locale-title-tag\"'",$text,$matches)){
            $isNeedSaveTitle = true;
            $arCheckTitle['textTitle'] = $matches[1];
            $matches = array();
            CLocale::preg_match("'data-mark=\"end-of-locale-title-tag\">(.+?)</loc>'",$text,$matches);
            $arCheckTitle['text'] = $matches[1];
        }
        $arCheckTitle['isNeedSaveTitle'] = $isNeedSaveTitle;
        return $arCheckTitle;
    }

    function GetLangInputs($lang_id = false, $withoutCurrent = false, $arTexts = Array(), $forHINT = false, $filepath = false,$arTextID = 0)
    {
        include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
        $ardefLangSite = CSite::GetList($by = "sort", $order = "asc",array("ID"=>SITE_ID))->getNext();
        $defLangSite = $ardefLangSite["LANGUAGE_ID"];
        $width = "261px";
        $height = "55px";
        $str_input = '<div class="js-block-lang">';
        $str_input .= $withoutCurrent || $forHINT ? '' : '<span class="padding-left-26 name-bold">
        ' . GetMessage('LC_MESSAGE_TRANSLATIONS') . '
        <a target="_blank" class="adm-input-help-icon-locale" href="javascript::void(0)" title="'.GetMessage("LC_MESSAGE_TRANSLATIONS_TITLE").'"></a>
        </span>';
        
        if($this->isNeedCheckDisabledInputs){
            $arDisabledLangs = array();
            $arDisabledLangs = $this->checkLangStatus();
        }
        foreach($this->langs as $lang){
            $arSortedLangs[$arAccorsysLocaleLangs[$lang]] = $lang;
        }
        asort($arSortedLangs);

        foreach ($arSortedLangs as $lang){
            if ($withoutCurrent && $lang == LANGUAGE_ID) continue;
            if ($lang_id && $lang != $lang_id) continue;

            if ($arTexts)
                $text = $arTexts[$lang];
            else
                $text = $this->GetTextForLid($lang);

            $arCheckTitle = array();
            $arCheckTitle = CLocaleElement::checkTitle($text);
            $isNeedSaveTitle = $arCheckTitle['isNeedSaveTitle'];
            if($forHINT){
                $text = isset($arCheckTitle['textTitle']) ? $arCheckTitle['textTitle']:'';
            }elseif($isNeedSaveTitle){
                $textTitle = $arCheckTitle['textTitle'];
                $text = $arCheckTitle['text'];
            }


            $inputSize = strlen($text);
            if($inputSize > 70 && $inputSize <= 200){
                $width = "280px";
                $height = "140px";
            }elseif($inputSize > 200){
                $width = "330px";
                $height = "200px";
            }

            include($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/include/array_aliases_for_translate.php');

            $isDisabled = isset($arDisabledLangs[$lang]);

            $text = isset($arDisabledLangs[$lang]) ? $arDisabledLangs[$lang]:$text;

            $str_input .=
                '<div class="locale-block block-' . $lang . '" ' . (($withoutCurrent || trim($text) == '') && $lang != LANGUAGE_ID ? 'style="display:none"' : '') . '>' .
                '<div class="locale-select">'.
                '<span title="'.$arAccorsysLocaleLangs[$lang].($defLangSite == $lang ? ' - '.GetMessage("LC_BY_DEFAULT"):"").'"' . strtoupper($lang) . '">'.
                '<a class="ico-flag-' . strtoupper($lang) . '"></a>' .
                '<span class="lang-span-text">' . strtoupper($lang) . '</span>'.
                '</span>' .
                '<textarea data-lang-count-file="'.$arTextID.'" '.($isNeedSaveTitle ? ' data-lang-title="'.$textTitle.'" ':'').'class="js-clearOrNotTextareaLang '.($defLangSite == $lang ? 'js-defaultFromCopyText ':'').($isDisabled ? ' textarea-disabled ':"").'" style="height:'.$height.';width:'.$width.';" data-real-lang="'.$lang.'" data-lang="' . $arAliasLangsForTranslate[$lang] . '" name="artext['.$arTextID.'][' . $lang . ']">' . $text . '</textarea>' .
                '<ul class="selectblock" style="display: none;">' .
                '</ul>' .
                '<div class="locale-click-wrapper" style="position:relative;">' .
                '<a title="'.GetMessage("LC_ADDITIONAL_ACTIONS").'" href="#" class="locale-click-arrow '.($text == ''?'disabled':'').'"></a>' .
                '<div class="locale_popup">' .

                '<span class="locale_popup_angle" style="/*right: 10px;*/"></span>' .

                '<ul>' .
                '<li><a href="#" class="g_translate"><span class="span-icon icon-google">' . GetMessage('LC_USE_GOOGLE_TRANSLATE') . '</span></a></li>' .
                '<li><a href="#" class="microsoft_translate"><span class="span-icon icon-microsoft">' . GetMessage('LC_USE_MICROSOFT_TRANSLATOR') . '</span></a></li>' .
                '<li><a href="#" class="y_translate"><span class="span-icon icon-ya">' . GetMessage('LC_USE_YANDEX_TRANSLATE') . '</span></a></li>' .
                '<li class="locale_popup_separator" style="display:block;"><!-- --></li>' .
                '<li><a href="#" class="wiki"><span class="span-icon icon-wiki">' . GetMessage('LC_FIND_IN_WIKI') . '</span></a></li>' .
                '<li><a href="#" class="youtube"><span class="span-icon icon-youtube">' . GetMessage('LC_FIND_IN_YOUTUBE') . '</span></a></li>' .
                '<li class="locale_popup_separator" style="display:block;"><!-- --></li>' .
                '<li><a href="#" class="undo"><span class="span-icon icon-undo">' . GetMessage('LC_CANCEL') . '</span></a></li>';

                if(trim($text) != ""){
                    if($isDisabled && $this->isNeedCheckDisabledInputs){
                        $str_input .= '<li><a href="#" class="activate" data-text="EMPTY_VALUE" data-tag="'.$this->getTag().'" data-file="'. $this->GetLangPath($lang).'"><span class="span-icon icon-activate">'. GetMessage('LC_ACTIVATE')  .'</span></a></li>';
                    }elseif($this->isNeedCheckDisabledInputs){
                        $str_input .= '<li><a href="#" class="deactivate" data-text="'.strip_tags($text).'" data-tag="'.$this->getTag().'" data-file="'. $this->GetLangPath($lang).'"><span class="span-icon icon-deactivate">'. GetMessage('LC_DOM_MENU_DEACTIVATE')  .'</span></a></li>';
                    }
                }
                $str_input .= '</ul>' .
                '</div>' . //locale-popup
                '</div>' . //locale-click-wrapper
                '<div class="clr"></div>' .
                '</div>' . //locale-select
                '</div>';
        }
        $str_input .= '</div>';
//        $str_input .= "<img src='/bitrix/images/accorsys.localization/loader.png' class='loader' />";
//        $str_input .= '<script>jqLoc(function(){ APNG.ifNeeded(function() {jqLoc("img.loader").each(function() { APNG.createAPNGCanvas(this,function(){jqLoc(".loader").hide();}); });}); jqLoc(".loader").hide().appendTo("body");});</script>';
        return $str_input;
    }

    /**
     * ????????? ??? ? ??????
     * @param $files ????? ?????????????
     * @param $arOffset ???????????? ??????? ?????? ??? ??????? ?????
     * @param $arExtLang ?????? ?? ?????? ??????
     * @return bool
     */
    function SaveToFiles($files, $arOffset, $arExtLang = Array())
    {
        if(!($this->text || $this->tagname) || empty($files)) return false;

        if(isset($_REQUEST['oldFindedText'])){
            foreach($files as $nubmer => $file){
                $file = strpos($_SERVER["DOCUMENT_ROOT"],$file) !== false ? $file:$_SERVER["DOCUMENT_ROOT"].$file;
                $arFiles[$file][] = isset($arOffset[$nubmer]) ? $arOffset[$nubmer] : false;
            }
            foreach($arFiles as $filePath => $file){
                $found = CLocale::FindTextInFile($_REQUEST['oldFindedText'], $filePath);
                if(count($found) == count($file)){
                    foreach($file as $key => $positions){
                        if($positions === false){
                            $found[$key] = false;
                        }
                    }
                    $arFiles[$filePath]['found'] = $found;
                }else{
                    echo json_encode(array("error"=> GetMessage('LC_PHRASE_CHANGED_UNEXPECTEDLY'),'errorType'=>'inside'));
                    die();
                }
            }


            foreach($arFiles as $file => $data){
                $file_path = self::getRealFile($file);
                foreach($data['found'] as $inFilePos => $data){
                    if($data === false)
                        continue;
                    $this->CreateTag($file_path, $data['POS'], $arExtLang, array('realText' => $data['TEXT'], 'inFilePos' => $inFilePos));
                }
            }
        }
    }
    function isHereDoc($code,$text,$pos){
        $count = 0;
        $tokens = token_get_all($code);
        $textLen = strlen($text);
        foreach($tokens as $key => $ar){
            $tokenpos = 0 - $textLen;
            while(($tokenpos = strpos($ar[1],$text,($tokenpos + $textLen))) !== false){
                if($tokens[$key-1][0] == T_START_HEREDOC && $count == $pos){
                    return true;
                }
                $count++;
            }
        }
        return false;
    }
    function getQuoteByPhpCode($code,$text,$pos){
        $count = 0;
        $tokens = token_get_all($code);
        $textLen = strlen($text);
        foreach($tokens as $ar){
            $tokenpos = 0 - $textLen;
            while(($tokenpos = strpos($ar[1],$text,($tokenpos + $textLen))) !== false){
                if($ar[0] == T_CONSTANT_ENCAPSED_STRING && $count == $pos){
                    $text = trim($ar[1]);
                    $q = $text[0];
                    return $q;
                }
                $count++;
            }
        }
        return false;
    }
    function CreateTag($path = false, $offset = null, $arExtLang = Array(), $arParams = array())
    {
        if ($offset === null || trim($offset) == "") return false;
        if ($this->userHasAccess() != 'A') return false;
        if (!(($this->_path_to_file || $path) && ($this->tagname || $this->text))) return false;

        $this->_path_to_file = $path ? $path : $this->_path_to_file;
        $ext = explode(".", $this->_path_to_file);
        $ext = $ext[count($ext) - 1];
        $realText = isset($arParams['realText']) ? $arParams['realText'] : $this->text;

        $textLen = isset($arParams['realText']) ? strlen($arParams['realText']) : 0;

        //????????? ?????????? ?????
        if ($ext == 'js'){
            //??? JS ????? ??????? ???? ?? "??????????" php
            $this->is_js = true;
            $file = explode("/", $this->_path_to_file);
            $file[count($file) - 1] = 'template.php';
            $file = implode("/", $file);
            if (file_exists($file)) {
                $this->_path_to_php_for_js = $file;
            } else {
                $this->_path_to_php_for_js = null;
                return false;
            }
        }

        if (file_exists($this->_path_to_file)) {

            $text_file = self::file_get_contents($this->_path_to_file);
            $savedTextFile = $text_file;
            $pos = $offset;

            if ($this->is_js){
                $text_php = self::file_get_contents($this->_path_to_php_for_js);
                $js_tag_name = 'langGenerate_' . md5($this->_path_to_file . $pos);
                $text_php = '<script>var ' . $js_tag_name . '=\'<?=GetMessage("' . $this->tagname . '")?>\';</script>' . $text_php;
                $this->putInFile($this->_path_to_php_for_js, $text_php);
                $new_text = $js_tag_name;
            }else{
                //???????? ? ????? ???? ????????? ?????????? ???????? php/script/html

                //??????? ??????????? ??? php ??? script/html
                $posOpenPhpTag = strrpos(substr($text_file,0,$pos), '<?');
                $posClosePhpTag = strrpos(substr($text_file,0,$pos), '?>');
                //???? ??????? ?????????????? ???? ?????? ?????????????? ???? ????????????? false ????? ??? php ????
                if($posOpenPhpTag !== false && ($posOpenPhpTag > $posClosePhpTag || $posClosePhpTag === false)){
                    //php area
                    $this->is_php = true;
                }else{
                    //??? ?? php ???????? ??????????? srcipt ??? html
                    $posOpenScriptTag = strrpos(substr($text_file,0,$pos), '<script');
                    $posCloseScriptTag = strrpos(substr($text_file,0,$pos), '</script>');
                    if($posOpenScriptTag !== false && ($posOpenScriptTag > $posCloseScriptTag || $posCloseScriptTag === false)){
                        //js area
                        $this->is_js = true;
                    }else{
                        //html area
                        $this->is_html = true;
                    }
                }
                $new_text = 'GetMessage("' . $this->tagname . '")';
            }

            $text_before = substr($text_file, 0, $offset);

            $text_after = substr($text_file, $offset + $textLen);

            if (!$this->tagname) {
                //??????? ?????? ?????? ??? ????
                $text_file = $text_before.$arExtLang[LANGUAGE_ID].$text_after;
                $this->message .= "\"" . $arExtLang[LANGUAGE_ID] . "\" saved in " . $this->_path_to_file . "<br />";
            } elseif ($this->is_php || $this->is_js){
                if ($this->is_php ) $delimeter = ".";
                if ($this->is_js) $delimeter = "+";
                $goNext = true;
                //1? ??????? ?????????? ????? ????????? ?????? ?????? ? ???????? ?????????
                if($goNext && strpos($text_file, '"'.$realText.'"') !== false){
                    $goNext = false;
                    $text_file = substr($text_before, 0, -1).$new_text.substr($text_after, 1);
                }
                //2? ??????? ?????????? ????? ????????? ?????? ?????? ? ?????????? ?????????
                if($goNext && strpos($text_file, "'".$realText."'") !== false){
                    $goNext = false;
                    $text_file = substr($text_before, 0, -1).$new_text.substr($text_after, 1);
                }
                //3? ??????? ?????????? ???????????? ? ?????? ?????? ? ???????? ?????????
                if($goNext && strpos($text_file, '"'.$realText) !== false){
                    $goNext = false;
                    $text_file = $text_before.$new_text.$delimeter.'"'.$text_after;
                }
                //4? ??????? ?????????? ???????????? ? ????? ?????? ? ???????? ?????????
                if($goNext && strpos($text_file, $realText.'"') !== false){
                    $goNext = false;
                    $text_file = $text_before.'"'.$delimeter.$new_text.$text_after;
                }
                //5? ??????? ?????????? ???????????? ? ?????? ?????? ? ?????????? ?????????
                if($goNext && strpos($text_file, "'".$realText) !== false){
                    $goNext = false;
                    $text_file = $text_before.$new_text.$delimeter."'".$text_after;
                }
                //6? ??????? ?????????? ???????????? ? ????? ?????? ? ?????????? ?????????
                if($goNext && strpos($text_file, $realText."'") !== false){
                    $goNext = false;
                    $text_file = $text_before."'".$delimeter.$new_text.$text_after;
                }
                //7? ??????? ?????????? ???????????? ?????? ?????? ? ?????? ????????? ??? ??? ??? ????????? ?????? ??? ?????????
                if($goNext && ($quot = self::getQuoteByPhpCode($text_file,$realText,$arParams['inFilePos'])) !== false){
                    $goNext = false;
                    $text_file = $text_before.$quot.$delimeter.$new_text.$delimeter.$quot.$text_after;
                }
                //8? ??????? ?????????? ??? HEREDOC ?????????
                if($goNext && self::isHereDoc($text_file,$realText,$arParams['inFilePos'])){
                    $goNext = false;
                    $text_file = $text_before.str_replace('GetMessage','{$GLOBALS["accorsys_localization_getmessage_heredoc"]',$new_text).'}'.$text_after;
                }
            } else {
                //???? html
                $text_file = $text_before. "<?=".$new_text."?>" .$text_after;
            }

            $this->putInFile($this->_path_to_file, $text_file);
        }

        self::forSaveHtmlEntitiesReplaceEncode($savedTextFile,$this->text);
        foreach($arExtLang as $key=>$Lang){
            self::forSaveHtmlEntitiesReplaceEncode($savedTextFile,$arExtLang[$key]);
        }
        if ($this->tagname)
            $this->setTag($this->text, false, null, $arExtLang); //???????? ???? ? ?????????? ??? ? ???????? ?????

        return $this->message;
    }

    function deleteTag($onlyLangFile = false, $onlyOriginalText = false, $originalText = '')
    {
        if (!$onlyLangFile) {
            $text_php = self::file_get_contents($this->_path_to_file);
            $tag = $this->GetTag();

            $arTagReplacement = Array(
                '/\<\?[\s]{0,}=[\s]{0,}GetMessage[\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)[\s]{0,}\?\>/isU' => "#TEXT#",
                '/\<\?[\s]{0,}=[\s]{0,}GetMessage[\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)[\s]{0,}\?\>/isU' => "#TEXT#",

                '/\'[\s]{0,}\.[\s]{0,}GetMessage[\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)[\s]{0,}\.[\s]{0,}\'/isU' => "#TEXT#",
                '/\'[\s]{0,}\.[\s]{0,}GetMessage[\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)[\s]{0,}\.[\s]{0,}\'/isU' => "#TEXT#",

                '/\"[\s]{0,}\.[\s]{0,}GetMessage[\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)[\s]{0,}\.[\s]{0,}\"/isU' => "#TEXT#",
                '/\"[\s]{0,}\.[\s]{0,}GetMessage[\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)[\s]{0,}\.[\s]{0,}\"/isU' => "#TEXT#",

                '/\'[\s]{0,}\.[\s]{0,}GetMessage[\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)/isU' => "#TEXT#'",
                '/\'[\s]{0,}\.[\s]{0,}GetMessage[\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)/isU' => "#TEXT#'",

                '/\"[\s]{0,}\.[\s]{0,}GetMessage[\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)/isU' => "#TEXT#\"",
                '/\"[\s]{0,}\.[\s]{0,}GetMessage[\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)/isU' => "#TEXT#\"",

                '/GetMessage[\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)[\s]{0,}\.[\s]{0,}\'/isU' => "'#TEXT#",
                '/GetMessage[\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)[\s]{0,}\.[\s]{0,}\'/isU' => "'#TEXT#",

                '/GetMessage[\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)[\s]{0,}\.[\s]{0,}\"/isU' => "\"#TEXT#",
                '/GetMessage[\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)[\s]{0,}\.[\s]{0,}\"/isU' => "\"#TEXT#",

                '/GetMessage[\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)/isU' => "'#TEXT#'",
                '/GetMessage[\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)/isU' => "'#TEXT#'",

                '/\{[\s]{0,}\$GLOBALS[\s]{0,}\[[\s]{0,}\"accorsys_localization_getmessage_heredoc\"[\s]{0,}\][\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)[\s]{0,}\}/isU' => "#TEXT#",
                '/\{[\s]{0,}\$GLOBALS[\s]{0,}\[[\s]{0,}\"accorsys_localization_getmessage_heredoc\"[\s]{0,}\][\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)[\s]{0,}\}/isU' => "#TEXT#"
            );

            $condition_found = 0;
            $k = count($arTagReplacement);
            $text = $this->GetTextForLid(LANGUAGE_ID);

            if($onlyOriginalText)
                $text = $originalText;

            if ($text)
                foreach($arTagReplacement as $from => $to){
                    if (CLocale::preg_match($from, $text_php)){
                        $text_php = preg_replace($from, str_replace('#TEXT#', $text, $to), $text_php);
                        $condition_found++;
                    }
                }
            if ($condition_found) {
                $this->putInFile($this->_path_to_file, $text_php);
            }
        }

        if(!$onlyOriginalText)
            $this->setTag('');

        return $condition_found;
    }

    function changeTagInFile($new_tag_name)
    {
        $text_php = self::file_get_contents($this->_path_to_file);
        $tag = $this->GetTag();
        $arTagReplacement = Array(
            '/GetMessage[\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)/isU' => 'GetMessage('.$new_tag_name.')',
            '/GetMessage[\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)/isU' => 'GetMessage('.$new_tag_name.')',
            '/\{[\s]{0,}\$GLOBALS[\s]{0,}\[[\s]{0,}\"accorsys_localization_getmessage_heredoc\"[\s]{0,}\][\s]{0,}\([\s]{0,}\"' . $tag . '\"[\s]{0,}\)[\s]{0,}\}/isU' => '{$GLOBALS["accorsys_localization_getmessage_heredoc"]("'.$new_tag_name.'")}',
            '/\{[\s]{0,}\$GLOBALS[\s]{0,}\[[\s]{0,}\"accorsys_localization_getmessage_heredoc\"[\s]{0,}\][\s]{0,}\([\s]{0,}\'' . $tag . '\'[\s]{0,}\)[\s]{0,}\}/isU' => '{$GLOBALS["accorsys_localization_getmessage_heredoc"]("'.$new_tag_name.'")}',
        );
        foreach($arTagReplacement as $from => $to){
            if (CLocale::preg_match($from, $text_php)){
                $text_php = preg_replace($from, $to, $text_php);
            }
        }
        return $this->putInFile($this->_path_to_file, $text_php);
    }

    function setTag($text,
                    $lid = false,
                    $new_tag_name = null,
                    $arExtLang = Array()
    )
    {
        if (!$lid) $lid = LANGUAGE_ID;
        if (empty($arExtLang)) {
            $arExtLang = Array($lid => $text);
        }
        //$arExtLang[$lid] = $text;
        $this->text = $text;
        $this->_path_to_lang = self::getRealFile($this->_path_to_file);

        if ($new_tag_name && $new_tag_name != $this->tagname){
            $this->changeTagInFile($new_tag_name);
        }

        $allTexts = '';
        foreach ($arExtLang as $l => $ltext) {
            if ($l && in_array($l, $this->langs)) {
                $this->GetLangPath($l);
                $allTexts .= self::file_get_contents($this->_path_to_lang);
            }
        }
        foreach ($arExtLang as $l => $ltext) {
            if($l && in_array($l, $this->langs)){
                $this->GetLangPath($l);
            }

            if($this->_path_to_lang && file_exists($this->_path_to_lang)){
                self::forSaveHtmlEntitiesReplaceEncode($allTexts,$ltext);
                $MESS = Array();
                if ($this->_path_to_lang && file_exists($this->_path_to_lang))
                    include($this->_path_to_lang);

                if ($new_tag_name && $new_tag_name != $this->tagname) {
                    unset($MESS[$this->tagname]);
                    $MESS[$new_tag_name] = $ltext; //str_replace("\"", "'", $ltext);
                } else {
                    $MESS[$this->tagname] = $ltext; //str_replace("\"", "'", $ltext);
                }

                $text_lang = CLocale::CreateMessageFileContent($MESS);

                if ($this->userHasAccess() == 'A')
                    $this->putInFile($this->_path_to_lang, $text_lang);


                $this->saveToDB($new_tag_name, true); //?????????? ?????? ???? ? ????
                $this->message .= "\"" . $ltext . "\" " . GetMessage('SAVED_TO') . " " . $this->_path_to_lang . "<br />";
            }
        }
    }

    function getNewIBlockElementFields($name = '')
    {
        $lang_path = str_replace($_SERVER['DOCUMENT_ROOT'], '', $this->_path_to_lang);
        return Array(
            "NAME" => ($name ? $name : $this->tagname),
            "ACTIVE" => "Y",
            "IBLOCK_ID" => $this->iblock_id,
            'IBLOCK_CODE' => self::$IBLOCK_CODE,
            "PROPERTY_VALUES" => Array(
                "lang_file" => $lang_path,
                "lang" => get_lang_of_file($lang_path),
                "text" => $this->text
                //,"files" => Array(str_replace($_SERVER['DOCUMENT_ROOT'], '', $this->_path_to_file))
            ),
            "PREVIEW_TEXT_TYPE" => "html"
        );
    }

    /**
     * ???????? ??? ? ????? ????? ???????? ?? ???? ?????? ?? ??????????? ???? ???????? ????????
     * @param $new_tag
     * @param $text
     */
//    function replaceOtherTagNameInAllFiles($new_tag,$text){
//        $lang_path = str_replace($_SERVER['DOCUMENT_ROOT'],'',$this->_path_to_lang);
//        $el = new CIBlockElement;
//        $rs = CIBlockElement::GetList(false,Array("NAME"=>$this->tagname,"!PROPERTY_lang_file"=>$lang_path),false,false,Array("ID","NAME","PREVIEW_TEXT","PROPERTY_lang_file","PROPERTY_lang"));
//        while ($ar = $rs->Fetch()){
//            $elLang = new CLocaleElement($ar['PREVIEW_TEXT']);
//            $elLang->SetTagName($this->GetTag());
//            $elLang->SetTag($elLang->text,$ar['PROPERTY_LANG_VALUE'],$new_tag);
//        }
//    }

    function GetTextForLid($lid)
    {
        if ($lid && in_array($lid, $this->langs)){

            $this->GetLangPath($lid);
            $MESS = Array();

            if($this->_path_to_lang && file_exists($this->_path_to_lang))
                include($this->_path_to_lang);

            if(trim($MESS[$this->tagname]) == "" && strpos($this->_path_to_file,'#LANG_TAG_REPLACE#') !== false){
                include(str_replace('#LANG_TAG_REPLACE#', '/lang/'.$lid,$this->_path_to_file));
                return $MESS[$this->tagname];
            }

            return $MESS[$this->tagname];
        }
    }

    function saveToDB($new_tag_name = null, $skip_file_handler = false)
    {
        global $UPDATE_FROM_INDEX;
        $UPDATE_FROM_INDEX = $skip_file_handler;
        $el = new CIBlockElement;
        $lang_path = str_replace($_SERVER['DOCUMENT_ROOT'], '', $this->_path_to_lang);

        $arFields = $this->getNewIBlockElementFields($new_tag_name);
        if($this->isSystemLocale){
            $arisreplace = CIBlockProperty::GetPropertyEnum("is_replace")->getNext();
            $arFields['PROPERTY_VALUES']['is_replace'] = $arisreplace["ID"];
        }else{
            $arFields['PROPERTY_VALUES']['is_replace'] = "";
        }

        $bWF = false;
        if ($this->userHasAccess() == 'W') {
            if (CModule::IncludeModule('workflow')) {
                $arFields["WF_STATUS_ID"] = 2;
                $bWF = true;
            } else {
                return;
            }
        }

        $rs = CIBlockElement::GetList(false, Array("IBLOCK_ID" => $this->iblock_id, "NAME" => $this->tagname, "PROPERTY_lang_file" => $lang_path), false, false, Array("ID", "NAME","PROPERTY_text","ACTIVE"));
        if ($ar = $rs->GetNext()) {
            if ($ar["~PROPERTY_TEXT_VALUE"] != $arFields["PROPERTY_VALUES"]["text"] || $new_tag_name) {
                if($ar["ACTIVE"] == "N")
                    $arFields["ACTIVE"] = 'N';
                $el->Update($ar["ID"], $arFields, $bWF);
            }
        } else {
            $el->Add($arFields, $bWF);
        }
    }

    function deactivateTag()
    {
        if ($this->userHasAccess() == 'A'){
            $el = new CIBlockElement;
            $lang_path = str_replace($_SERVER['DOCUMENT_ROOT'], '', $this->_path_to_lang);
            $rs = CIBlockElement::GetList(false, Array("IBLOCK_ID" => $this->iblock_id, "NAME" => $this->tagname, "PROPERTY_lang_file" => $lang_path), false, false, Array("ID"));
            if ($ar = $rs->GetNext()) {
                $el->Update($ar["ID"], Array('ACTIVE' => 'N'));
            } else {
                $arFields = $this->getNewIBlockElementFields();
                $id = $el->Add($arFields);
                $el->Update($id, Array('ACTIVE' => 'N', 'IBLOCK_CODE' => self::$IBLOCK_CODE));
            }
        }
    }

    function activateTag()
    {
        if ($this->userHasAccess() == 'A'){
            $el = new CIBlockElement;
            $lang_path = str_replace($_SERVER['DOCUMENT_ROOT'], '', $this->_path_to_lang);
            $rs = CIBlockElement::GetList(
                false,
                Array(
                    "IBLOCK_ID" => $this->iblock_id,
                    "NAME" => $this->tagname,
                    "PROPERTY_lang_file" => $lang_path
                ), false, false, Array("ID")
            );
            if ($ar = $rs->GetNext()) {
                $el->Update($ar["ID"], Array('ACTIVE' => 'Y'));
            } else {
                $arFields = $this->getNewIBlockElementFields();
                $arFields['ACTIVE'] = 'N';
                $id = $el->Add($arFields);
                $el->Update($id, Array('ACTIVE' => 'Y', 'IBLOCK_CODE' => self::$IBLOCK_CODE));
            }
        }
    }
}

function localeResultsSort($a, $b)
{
    if ($a['SORT'] == $b['SORT']) return 0;
    else return ($a['SORT'] > $b['SORT']) ? -1 : 1;
}
?>