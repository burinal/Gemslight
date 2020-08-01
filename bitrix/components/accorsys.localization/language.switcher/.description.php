<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
$arComponentDescription = array(
    "NAME" => GetMessage("LC_ACCORSYS_NAME_SWITCHER"),
    "DESCRIPTION" => GetMessage("LC_ACCORSYS_NAME_SWITCHER"),
    "ICON" => "/images/sections_list.gif",
    "CACHE_PATH" => "Y",
    "PATH" => array(
        "ID" => "accorsys",
        "NAME" => GetMessage("LC_ACCORSYS"),
        "CHILD" => array(
            "ID" => "accorsys.localization",
            "NAME" => GetMessage("LC_ACCORSYS_LOCALIZATION"),
            "SORT" => 10,
        ),
    ),
);
?>
