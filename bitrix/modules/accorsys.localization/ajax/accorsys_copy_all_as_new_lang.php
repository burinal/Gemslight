<?php
if($_REQUEST['toLangCopySelect'] == $_REQUEST['fromLangCopySelect'] && isset($_REQUEST['iblock_id']))
    die();
define("NO_KEEP_STATISTIC", true);
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/classes/general/CALIBlock.php");
global $USER;
if(!$USER->IsAuthorized()) die();

$arParams = array();
if(isset($_REQUEST['fromLangCopySelect'])){
    $arParams['arFilter']['PROPERTY_lang'] = $_REQUEST['fromLangCopySelect'];
    $arParams['fromLangCopySelect'] = 'allLang';
}

$arParams['arFilter']['IBLOCK_ID'] = (int)$_REQUEST['iblock_id'];
$arParams['arFilter']['ID'] = $_REQUEST['elementsID'];
$arParams['toLangCopySelect'] = $_REQUEST['toLangCopySelect'];
$arParams['fromLangCopySelect'] = $_REQUEST['fromLangCopySelect'];
$arParams['iBlockCopyCount'] = (int)$_REQUEST['by_items'];
$arParams['nextPage'] = (int)$_REQUEST['NEXT_PAGE'] == 0 ? 1:(int)$_REQUEST['NEXT_PAGE'];
$arParams['allPhrazesCount'] = $_REQUEST['arLangsPhrazesCount'][$_REQUEST['fromLangCopySelect']];
$arParams['actionOnExistsElements'] = $_REQUEST['actionOnExistsElements'];

$return = CLEIBlock::CopyTranslateIBlockElement($arParams);

if(isset($return['NEXT_PAGE'])){
    echo json_encode($return);
}else{
    $return['SUCCESS'] = 'Y';
    echo json_encode($return);
}
die();
