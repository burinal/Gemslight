<?
header('Content-Type: application/x-javascript');
$content = file_get_contents($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/js/inapp_store.js');
echo $content;
die();