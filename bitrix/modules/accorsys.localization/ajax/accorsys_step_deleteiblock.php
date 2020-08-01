<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
if(!$USER->IsAuthorized()) die();
if($_REQUEST['action'] == 'deleteiblock' && $USER->isAdmin()){
    $isDeletedElements = false;
    CModule::IncludeModule('iblock');
    $objElements = CIBlockElement::GetList(array(),array("IBLOCK_ID"=>$_REQUEST['iblockID']),false,array("nTopCount" => (int)$_REQUEST['elementsCount']));
    while($arElement = $objElements->fetch()){
        $isDeletedElements = true;
        CIBlockElement::Delete($arElement['ID']);
    }

    if(!$isDeletedElements && $objElements->selectedRowsCount() == 0){
        echo 'COMPLETE';
        die();
    }

    if((int)$objElements->selectedRowsCount() < (int)$_REQUEST['elementsCount']){
        CIBlock::Delete($_REQUEST['iblockID']);
        echo 'COMPLETE';
    }else{
        echo 'GONEXT';
    }
}