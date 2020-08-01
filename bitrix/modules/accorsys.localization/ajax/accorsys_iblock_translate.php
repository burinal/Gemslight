<?php

define("NO_KEEP_STATISTIC", true);
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/classes/general/CALIBlock.php");
$arFields = array();
global $USER;
if(!$USER->IsAuthorized()) die();

foreach($_REQUEST['arFields'] as $key => $val){
    if($val == 'Y')
        $arFields[] = $key;
}
$arProperties = array();
foreach($_REQUEST['arProperties'] as $key => $val){
    if($val == 'Y')
        $arProperties[] = $key;
}

if(isset($_REQUEST['translate_element']) && trim($_REQUEST['translate_element']) == 'Y'){
    $r = CLEIBlock::translateIBlockElement(
        array(
            "ID" => $_REQUEST['id'],
            "IBLOCK_ID" => $_REQUEST['iblock_id'],
            "LANG" => $_REQUEST['LANG'],
            "TRANSLATE_SYSTEM_CODE" => $_REQUEST['TRANSLATE_SYSTEM_CODE'],
            "FIELD_CODE_LIST" => $arFields,
            "PROPERTY_CODE_LIST" => $arProperties,
            "nPageSize" => $_REQUEST['by_items']
        )
    );
}elseif(isset($_REQUEST['translate_sections']) && trim($_REQUEST['translate_sections']) == 'Y'){
    CLEIBlock::translateIBlockSections(
        array(
            "ID" => $_REQUEST['id'],
            "IBLOCK_ID" => $_REQUEST['iblock_id'],
            "LANG" => $_REQUEST['LANG'],
            "TRANSLATE_SYSTEM_CODE" => $_REQUEST['TRANSLATE_SYSTEM_CODE']
        )
    );
    $r = array(
        'success' => 'Y'
    );
}else{
    if($_REQUEST['AL_IBLOCK_COPY_IS_FIRST_PAGE'] == 'Y'){
        CLEIBlock::translateIBlockSections(
            array(
                "IBLOCK_ID" => $_REQUEST['iblock_id'],
                "LANG" => $_REQUEST['LANG'],
                "TRANSLATE_SYSTEM_CODE" => $_REQUEST['TRANSLATE_SYSTEM_CODE']
            )
        );
        define('AL_IBLOCK_COPY_IS_FIRST_PAGE','Y');
    }

    $r = CLEIBlock::translateIBlockElement(
        array(
            "IBLOCK_ID" => $_REQUEST['iblock_id'],
            "LANG" => $_REQUEST['LANG'],
            "TRANSLATE_SYSTEM_CODE" => $_REQUEST['TRANSLATE_SYSTEM_CODE'],
            "FIELD_CODE_LIST" => $arFields,
            "PROPERTY_CODE_LIST" => $arProperties,
            "nPageSize" => $_REQUEST['by_items']
        )
    );
}


echo json_encode($r);
//p($r);/var/www/modules.dev/bitrix/modules/accorsys.localization/ajax/accorsys.localization/accorsys_iblock_copy.php
/*
if(isset($r['PAGE_NUMBER'])){
    LocalRedirect('/ajax/accorsys.localization/accorsys_iblock_copy.php?'.$r['PAGE_NAME'].'='.$r['PAGE_NUMBER']);
}*/
