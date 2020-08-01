<?php
define("NO_KEEP_STATISTIC", true);
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/admin/update_system_partner_act.php',LANGUAGE_ID);
IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/admin/update_system.php',LANGUAGE_ID);
$action = $_REQUEST['action'];
$module_id = 'accorsys.localization';
$stableVersionsOnly = COption::GetOptionString("main", "stable_versions_only", "Y");

if(strlen($action)>0){
    switch($action){
        case 'restorePurchase':
            $SL = new CAccorsysLS('accorsys.localization');
            $ob = $SL->getBuyLS();
            $obBuy = $SL->getBuy();

            if(!is_object($ob) && isset($ob['code']) && $ob['code'] == 502){
                $arRest = array('restore' => 'serviceError');
            }else{
                $arProducts = CLocale::getAccorsysProductsXML('byLicenseType');
                foreach($arProducts as $module){
                    foreach($module[strtoupper(LANGUAGE_ID)]['items'] as $licenseID => $license){
                        $arLicenses[$licenseID] = array(
                            'module_name' => $module[strtoupper(LANGUAGE_ID)]['name'],
                            'license_name' => $license['name']
                        );
                    }
                }
                $strBuy = '';
                while($arBuy = $obBuy->getNext()){
                    if($arBuy['QTY'] > 1){
                        $arStr[] = '<li>'.$arLicenses[$arBuy['~LICENSE_TYPE_ID']]['module_name'].' - '.$arLicenses[$arBuy['~LICENSE_TYPE_ID']]['license_name'].', <span class="count">'.str_replace("#PRODUCT_QTY#",'<span class="count">'.$arBuy['QTY'].'</span>', GetMessage("LC_PRODUCT_QTY_POINT")).'</span>';
                    }else{
                        $arStr[] = '<li>'.$arLicenses[$arBuy['~LICENSE_TYPE_ID']]['module_name'].' - '.$arLicenses[$arBuy['~LICENSE_TYPE_ID']]['license_name'].', <span class="count">'.str_replace("#PRODUCT_QTY#",'<span class="count">'.$arBuy['QTY'].'</span>', GetMessage("LC_PRODUCT_QTY_SINGLE")).'</span>';
                    }
                }
                natsort($arStr);
                foreach($arStr as $str){
                    $strBuy .= $str;
                }
                $strBuy = iconv(LANG_CHARSET,'UTF-8', $strBuy);
                $arRest = array('restore' => 'ok', 'restList' => $strBuy);
                if(trim($strBuy) == ""){
                    $arRest = array('restore' => 'notFound');
                }

            }
            echo json_encode($arRest);
            die();
        break;

        case 'activate':
            if(isset($_REQUEST['key']) && strlen($_REQUEST['key'])>0){
                $obCache = new CPHPCache();
                $cachePath = '/ProgramCatalogSCisExpireModulePeriod/ProgramCatalogSC'.md5('ProgramCatalogSCisExpireModulePeriod');
                $obCache->CleanDir($cachePath);

                $sl = new CAccorsysLS($module_id);
                $resActivate = $sl->activate($_REQUEST['key']);
                $resActivate['typeActive'] = 'accorsysLicenseServiceKey';
               // $resActivate['activate'] = '1';

                if($resActivate['activate'] == 0){
                    $errorMessage = '';
                    $coupon = $APPLICATION->UnJSEscape($_REQUEST["key"]);

                    if (StrLen($coupon) <= 0)
                        $errorMessage .= GetMessage("SUPA_ACE_CPN").". ";

                    if (StrLen($errorMessage) <= 0)
                    {
                        if (!CUpdateClientPartner::ActivateCoupon($coupon, $errorMessage, LANG, $stableVersionsOnly))
                            $errorMessage .= GetMessage("SUPA_ACE_ACT").". ";
                    }
                    if (StrLen($errorMessage) <= 0)
                    {
                        CUpdateClientPartner::AddMessage2Log("Coupon activated", "UPD_SUCCESS");
                        $resActivate['activate'] = '1';
                        $resActivate['typeActive'] = 'marketplaceLicenseKey';
                        $resActivate['message'] = iconv(LANG_CHARSET,'UTF-8', GetMessage("SUP_SUAC_SUCCESS"));
                        echo json_encode($resActivate);
                        die();
                    }
                    else
                    {
                        CUpdateClientPartner::AddMessage2Log("Error: ".$errorMessage, "UPD_ERROR");
                        echo json_encode($resActivate);
                        die();
                    }
                }
                echo json_encode($resActivate);
            }
        break;
    }
}
die();