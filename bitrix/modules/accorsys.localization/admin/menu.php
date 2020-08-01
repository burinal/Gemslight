<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Gvammer
 * Date: 16.07.12
 * Time: 13:11
 * menu.php -
 */
if(!$USER->IsAuthorized())
    return false;
$SUP_RIGHT = $APPLICATION->GetGroupRight("accorsys.localization");

if($SUP_RIGHT>"D")
{
    $aMenu = array(
        "parent_menu" => "global_menu_services",
        "section" => "accorsyslocalization",
        "sort" => 10000,
        "text" => GetMessage("LC_EXTENSION_NAME"),
        "title" => GetMessage("LC_EXTENSION_NAME"),
        "icon" => "accorsyslocalization_menu_icon",
        "page_icon" => "accorsyslocalization_page_icon",
        "items_id" => "menu_support",
//        "url" => "lc_lang_index.php?lang=".LANGUAGE_ID,
        "items" => array()
    );
    $aMenu["items"][] =  array(
        "text" =>  GetMessage('LC_INAPP_PURCHASES'),
        "url"  => "lc_inapp_purchases.php?lang=".LANGUAGE_ID,
        "more_url" => array(
            "lc_inapp_purchases.php"
        ),
        //"icon" => "form_menu_icon",
        "items_id" => "accorsys_market",
        "title" => GetMessage('LC_INAPP_PURCHASES')
    );
    $aMenu["items"][] = array(
        "text" => GetMessage("LC_MENU_ITEM_INDEX"),
        "url" => "lc_lang_index.php?lang=".LANGUAGE_ID,
        "more_url" => Array(
            "lc_lang_index.php?lang=".LANGUAGE_ID,
            'lc_lang_index.php'
        ),
        "title" => GetMessage("LC_MENU_ITEM_INDEX")
    );
    $aMenu["items"][] = array(
        "text" => GetMessage("LC_EXTENSION_SETTINGS"),
        "url" => "settings.php?lang=".LANGUAGE_ID."&mid=accorsys.localization&mid_menu=1",
        "more_url" => Array(
            "settings.php?lang=".LANGUAGE_ID."&mid=accorsys.localization&mid_menu=1",
            "settings.php?mid=accorsys.localization&mid_menu=1&open_tab=iblocks",
            "/bitrix/admin/settings.php?mid=accorsys.localization&mid_menu=1"
        ),
        "title" => GetMessage("LC_EXTENSION_SETTINGS")
    );
    $aMenu["items"][] = array(
        "text" => GetMessage("LC_MENU_ITEM_INFO"),
        "url" => "lc_about.php?lang=".LANGUAGE_ID."&set_default=Y&mid_menu=1",
        "more_url" => Array(
            "lc_about.php?lang=".LANGUAGE_ID."&set_default=Y&mid_menu=1",
            "/bitrix/admin/lc_about.php?lang=".LANGUAGE_ID."&mid=accorsys.localization&mid_menu=1"
        ),
        "title" => GetMessage("LC_MENU_ITEM_INFO")
    );
    return $aMenu;
}
return false;