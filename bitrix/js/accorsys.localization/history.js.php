<?
header('Content-Type: application/x-javascript');
$content = file_get_contents($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/js/history.js');
echo $content;
die();