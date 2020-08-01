<?
$isAjax = $_REQUEST["method"] == "ajax";
if($isAjax)
    require_once $_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php';

CModule::IncludeModule('accorsys.localization');
global $USER;
$localeObj = new CLocale();
if($USER->isAuthorized()){
    $obUser = new CAccorsysExtensionsUser("accorsys.localization");
    $obUser->addUser($USER->getID());
}elseif(isset($_COOKIE['BITRIX_SM_LOGIN']) && isset($_COOKIE['OLD_USER_SESSION']) && trim($_COOKIE['OLD_USER_SESSION']) != ''){
    $dbUserID = CUser::GetList($by,$order,array('email' => $_COOKIE['BITRIX_SM_LOGIN']))->getNext();
    $userID = $dbUserID['ID'];
    $obUser->addUser($userID,$_COOKIE['OLD_USER_SESSION']);
}
if($localeObj->userHasAccess()){
    include($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/classes/general/CALTranslate.php');
    $tokenString = CALTranslate::getMicrosoftToken();
}

if($isAjax)
    echo $tokenString;