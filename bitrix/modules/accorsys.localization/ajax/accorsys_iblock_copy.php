<?php
define("NO_KEEP_STATISTIC", true);
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/classes/general/CALIBlock.php");
global $USER;
if(!$USER->IsAuthorized()) die();
if($_REQUEST['action'] == 'deleteiblock'){
    if($USER->isAdmin()){
        CModule::IncludeModule('iblock');
        CIBlock::Delete($_REQUEST['iblockid']);
    }
    die();
}

$arFields['ACTIVE'] = $_REQUEST['ACTIVE'];
$arFields['CODE'] = $_REQUEST['CODE'];
$arFields['SITE_ID'] = $_REQUEST['LID'];
$arFields['NAME'] = strtoupper(mb_internal_encoding()) != 'UTF-8' ? iconv('UTF8',LANG_CHARSET, $_REQUEST['NAME']) : $_REQUEST['NAME'];
$arFields['SORT'] = $_REQUEST['SORT'];

if(isset($_REQUEST['iblock_id'])){
    define('AL_IBLOCK_COPY_COUNT', $_REQUEST['by_items']);
    $firstStep = false;
    $iblockId = intval($_REQUEST['iblock_id']);

    //$arFields NAME, CODE, LID, SORT, ACTIVE

    if($_REQUEST['NEXT_PAGE'] != '' && $_REQUEST['NEW_IBLOCK_ID'] != ""){
        $return = CLEIBlock::CopyIBlockElement($iblockId, $_REQUEST['NEW_IBLOCK_ID']);
        $return['NEW_IBLOCK_ID'] = $_REQUEST['NEW_IBLOCK_ID'];
    }else{
        define('AL_IBLOCK_COPY_IS_FIRST_PAGE', 'Y');
        $nIblock = CLEIBlock::CopyIBlock($iblockId, true, $arFields);
        $firstStep = true;
        if($_REQUEST['includeElements'] == "Y"){
            CLEIBlock::CopyIBlockSection($iblockId, $nIblock, true);
            $return = CLEIBlock::CopyIBlockElement($iblockId, $nIblock);
            $return['NEW_IBLOCK_ID'] = $nIblock;
        }
    }
}

if(isset($return['PAGE_NUMBER'])){
    echo json_encode($return);
}else{
    $return['SUCCESS'] = 'Y';
    if($return['ERROR'] != 'N'){
        $strError = '';
        foreach($return['ERROR'] as $elemID => $error){
            $curError = '';
            foreach($error as $er){
                switch($er['ERROR']){
                    case 1:
                        $errorType = '';
                    break;
                }
                $curError .= $er['NAME'].$errorType.',';
            }
            $curError = rtrim($curError,',').'.';
            $strError .= '<a target="_blank" href="/bitrix/admin/iblock_element_edit.php?IBLOCK_ID='.$return['IBLOCK_ID'].'&type='.$return['IBLOCK_TYPE'].'&ID='.$elemID.'&find_section_section=0">'.$elemID.'</a>, ';
        }
        $strError = rtrim(trim($strError),',').'.';
        if(strtoupper(mb_internal_encoding()) != 'UTF-8')
            $strError = iconv(LANG_CHARSET, 'UTF-8', $strError);
        $return['ERROR'] = $strError;
    }
    echo json_encode($return);
}
die();
