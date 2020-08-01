<?
require_once $_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php';
IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/translations.php',LANGUAGE_ID);
IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/additionaltranslations.php',LANGUAGE_ID);

if(isset($_REQUEST['arGroupValues'])){
    $countUsers = 0;
    $arCountUsers = array();
    foreach($_REQUEST['arGroupValues'] as $groupID => $isDoc){
        foreach(CGroup::GetGroupUser($groupID) as $user){
            $arCountUsers[$user] = $user;
        }
    }
    $countUsers = count($arCountUsers);
    if($countUsers > 1){
        echo str_replace("#USER_COUNT#","<span>".$countUsers."</span>",GetMessage("LC_GROUP_USERS_COUNT"));
    }
}
?>