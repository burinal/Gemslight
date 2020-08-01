<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/update_client.php");
$arUpdates = CUpdateClient::GetUpdatesList($errorMessage, 'ru', 'Y');

switch($_REQUEST['needRequest']){
    case 'redaction':
        echo $arUpdates["CLIENT"][0]["@"]["LICENSE"];
    break;
}
