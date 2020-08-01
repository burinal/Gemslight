<?
require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_admin_before.php"); // ?????? ????? ??????
// ????????? ???????? ????
CLocale::includeLocaleLangFiles();
CModule::IncludeModule("accorsys.mail_templates");
// ??????? ????? ??????? ???????? ???????????? ?? ??????
$POST_RIGHT = $APPLICATION->GetGroupRight("accorsys.mail_templates");
// ???? ??? ???? - ???????? ? ????? ??????????? ? ?????????? ?? ??????
if ($POST_RIGHT == "D")
    $APPLICATION->AuthForm(GetMessage("ACCESS_DENIED"));
// ????????? ????????? ????????
$APPLICATION->SetTitle(GetMessage("LC_INAPP_PURCHASES"));
// ?? ??????? ????????? ?????????? ?????? ? ?????
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_after.php");
CJSCore::Init(array("jquery"));
$accorsys_module_code = 'accorsys_localizatsiya';
$accorsys_showcase_id = 'inapp_sale';

$arAccorsysShowcaseId  = array(
    'inapp_sale',
    'inapp_extensions',
    'inapp_other',
);

$arJsParams = array(
    "userId" => $USER->getID(),
    "currentModule" => $accorsys_module_code,
    "emptyPrice" => GetMessage("LC_0_PRICE"),
    //"showCaseId" => $accorsys_showcase_id,
    "langs" => array(
        "checkUncheck" => GetMessage("LC_CHECK_UNCHECK"),
        "menuEditDel" => GetMessage("LC_MENU_EDIT_DEL"),
        "sumPrice" => GetMessage("LC_INAPP_CART_TOTAL"),
        "confirmDeleteAll" => GetMessage("LC_INAPP_CART_CONFIRM_DELETE_ALL"),
        "curLang" => LANGUAGE_ID,
        "noInternetConnection" => GetMessage('LC_ERROR_NO_INTERNET_CONNECTION')
    )
);

$isRussianLang = LANGUAGE_ID == 'ru' ? 'ru' : 'en';
$APPLICATION->AddHeadString('<script>var arInAppStoreParams = ' . LOC_json_safe_encode($arJsParams) . '</script>');

$obAccess = new CAccorsysExtensionsAccess("accorsys.localization");
$arDaysToLeft = $obAccess->daysToLeftModule("accorsys.localization");

$SL = new CAccorsysLS('accorsys.localization');

$obBuy = $SL->getBuy();

$isNeedShowFormRequest = false;
while($arBuy = $obBuy->getNext()){
    if($arDaysToLeft["IS_TRIAL"] && $arBuy['MODULE_ID'] == 'accorsys.localization'){
        $isNeedShowFormRequest = true;
    }
}
?>
    <link rel="stylesheet" type="text/css" href="/bitrix/js/accorsys.localization/jcarousel.responsive.css">
    <script type="text/javascript" src="/bitrix/js/accorsys.localization/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
    <script type="text/javascript" src="/bitrix/js/accorsys.localization/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="/bitrix/js/accorsys.localization/fancybox/jquery.easing-1.3.pack.js"></script>
    <script type="text/javascript" src="/bitrix/js/accorsys.localization/inapp_store.js.php"></script>
    <link rel="stylesheet" href="/bitrix/js/accorsys.localization/fancybox/jquery.fancybox-1.3.4.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="/bitrix/js/accorsys.localization/inapp_store.css.php" type="text/css" media="screen" />
    <script type="text/javascript" src="/bitrix/js/accorsys.localization/jquery.jcarousel.min.js"></script>


    <div id="accorsysAdditionalBasket">
    <div class="adm-detail-block activation-keys-wrap">
        <div class="adm-detail-content-wrap" style="border-radius: 4px; border-top: 1px solid #ced7d8;">
            <div class="adm-detail-content">
                <div class="adm-detail-content-item-block">
                    <div class="accordion-group">
                        <input type="checkbox" <?=$isNeedShowFormRequest ? ' checked="true" ':''?> name="accordion" id="accordion-activation-keys" class="accordion-group-checkbox">
                        <label for="accordion-activation-keys" class="accordion-group-label">
                            <?=GetMessage('LC_ONLINE_ACTIVATION')?>
                            <span class="accordion-group-arrow-icon"></span>
                        </label>
                        <div class="activation-keys accordion-group-content">
                            <div class="activation-keys-key-entry">
                                <div class="activation-keys-key-entry-field">
                                    <label for="id_coupon"><?=GetMessage('LC_ENTER_LICENSE_KEY')?></label>
                                    <div class="group-input">
                                        <input id="id_coupon" type="text" name="COUPON" value="" size="35">
                                        <div class="coupon-button-wrapper">
                                            <input id="id_coupon_btn" type="button" name="coupon_btn" value="<?=GetMessage('LC_ACTIVATE')?>">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="activate-messages-wrapper">
                                <div class="activation-keys-info-message success-license display-none">
                                    <div class="adm-info-message-wrap adm-info-message-green">
                                        <div class="adm-info-message">
                                            <div class="adm-info-message-title"><?=GetMessage('LC_LICENSING_KEY_ACTIVATION_SUCCESS')?></div>
                                            <div class="adm-info-message-content <?=$isNeedShowFormRequest ? '':' display-none '?>">
                                                <?=GetMessage('LC_LICENSING_COUPON_CODE_NEEDED')?>
                                            </div>
                                            <div class="adm-info-message-icon"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="activation-keys-info-message marketplace-success display-none">
                                    <div class="adm-info-message-wrap adm-info-message-green">
                                        <div class="adm-info-message">
                                            <div class="adm-info-message-title text"><?=GetMessage('LC_LICENSING_BITRIX_COUPON_ACTIVATION_SUCCESS')?></div>
                                            <div class="adm-info-message-icon"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="activation-keys-info-message coupon-form-success display-none">
                                    <div class="adm-info-message-wrap adm-info-message-green">
                                        <div class="adm-info-message">
                                            <div class="adm-info-message-title text"><?=GetMessage('LC_LICENSING_BITRIX_COUPON_REQUEST_SUCCESS')?></div>
                                            <div class="adm-info-message-icon"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="activation-keys-info-message activation-keys-req_coupon_activation <?=$isNeedShowFormRequest ? '':' display-none '?>">
                                    <div class="adm-info-message-wrap adm-info-message-green">
                                        <div class="adm-info-message">
                                            <form name="request_coupon_activation" class="activation-keys-req_coupon_activation-form" action="" method="">
                                                <div class="form-header"><?=GetMessage('LC_REQUEST_COUPON_TEXT')?></div>
                                                <div class="form_fields">
                                                    <label for="input-1"><?=GetMessage('LC_YOUR_NAME')?></label>
                                                    <input id="input-1" type="text" size="42">
                                                </div>
                                                <div class="form_fields">
                                                    <label for="input-2"><?=GetMessage('LC_YOUR_EMAIL')?></label>
                                                    <input id="input-2" type="text" size="42">
                                                </div>
                                                <div class="submit-wrap">
                                                    <input class="send-data adm-btn-save" type="submit" class="adm-btn-save" value="<?=GetMessage('LC_SUBMIT')?>">
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="activation-keys-info-message adm-info-message-wrap adm-info-message-red display-none">
                                    <div class="adm-info-message">
                                        <div class="adm-info-message-title"></div>
                                        <div class="adm-info-message-icon"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-group">
                        <input type="checkbox" name="accordion" id="accordion-restore-purchase" class="accordion-group-checkbox">
                        <label for="accordion-restore-purchase" class="accordion-group-label">
                            <?=GetMessage('LC_RESTORE_PURCHASES')?>
                            <span class="accordion-group-arrow-icon"></span>
                        </label>
                        <div class="restore-purchase accordion-group-content">
                            <div class="restore-purchase-comment">
                                <p style="text-align:center;"><?=GetMessage('LC_RESTORE_PURCHASES_TEXT')?></p>
                            </div>
                            <div class="restore-purchase-button">
                                <input id="resote-purchase-button" class="adm-btn-save" type="button" value="<?=GetMessage('LC_RESTORE_PURCHASES_BUTTON')?>">
                            </div>
                            <div class="restore-message-wrapper">
                                <div class="activation-keys-info-message success display-none">
                                    <div class="adm-info-message-wrap adm-info-message-green">
                                        <div class="adm-info-message">
                                            <div class="adm-info-message-title text"><?=GetMessage('LC_LICENSING_RESTORE_PURCHASES_FOUND')?></div>
                                            <ul>

                                            </ul>
                                            <a href="javascript:void(0)" class="show-more-licenses">...</a>
                                            <div class="adm-info-message-icon"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="activation-keys-info-message not-found display-none">
                                    <div class="adm-info-message-wrap adm-info-message-red">
                                        <div class="adm-info-message">
                                            <div class="adm-info-message-title text"><?=GetMessage('LC_LICENSING_RESTORE_PURCHASES_NOT_FOUND')?></div>
                                            <div class="adm-info-message-icon"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="activation-keys-info-message service-error adm-info-message-wrap adm-info-message-red display-none">
                                    <div class="adm-info-message">
                                        <div class="adm-info-message-title"><?=GetMessage('LC_ERROR_NO_INTERNET_CONNECTION')?></div>
                                        <div class="adm-info-message-icon"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="basket-container">
        <div class="adm-list-table-top">
            <div class="adm-list-table-top-logo">
                <a href="http://www.programcatalog.ru/" target="_blank">
                    <img src="/bitrix/images/accorsys.localization/programcatalog_seal_<?=$isRussianLang?>.png">
                </a>
            </div>
            <div class="adm-list-table-top-title"><?=GetMessage("LC_INAPP_PURCHASES_CART")?></div>
        </div>
        <table id="" class="adm-list-table basket-table">
            <thead>
            <tr class="adm-list-table-header">
                <td  class="adm-list-table-cell" style="width:38px;">
                    <div class="adm-list-table-cell-inner">
                        <input id="" type="button" class="adm-checkbox adm-designed-checkbox" >
                        <label for="" class="adm-designed-button-label adm-checkbox all" title="<?=GetMessage("LC_DELETE_ALL")?>"></label>
                    </div>
                </td>
                <td  class="adm-list-table-cell align-center">
                    <div class="adm-list-table-cell-inner">
                        <?=GetMessage("LC_INAPP_CART_PRODUCT")?>
                    </div>
                </td>
                <td  class="adm-list-table-cell align-center">
                    <div class="adm-list-table-cell-inner">
                        <?=GetMessage("LC_INAPP_CART_PURCHASE_ITEM")?>
                    </div>
                </td>
                <td  class="adm-list-table-cell align-center head-price">
                    <div class="adm-list-table-cell-inner">
                        <?=GetMessage("LC_PRICE")?>
                    </div>
                </td>
                <td  class="adm-list-table-cell align-center">
                    <div class="adm-list-table-cell-inner">
                        <?=GetMessage("LC_QTY")?>
                    </div>
                </td>
                <td  class="adm-list-table-cell align-center">
                    <div class="adm-list-table-cell-inner">
                        <?=GetMessage("LC_SUMM")?>
                    </div>
                </td>
            </tr>
            </thead>
            <tbody><!-- --></tbody>
        </table>
    </div>
    <div id="offsetTopBasketPostition">
        <form id="" name="" target="_blank" action="http://www.programcatalog.ru/">
            <input type="hidden" name="action" value="ADD2BASKETP">
            <input type="hidden" name="backurl" value="/cart/">
            <div class="additional-parameters"></div>
            <div id="stick_toolbar"  class="adm-detail-toolbar">
                <div class="adm-list-table-top-logo-bottom">
                    <a href="http://www.programcatalog.ru/" target="_blank">
                        <img src="/bitrix/images/accorsys.localization/programcatalog_seal_<?=$isRussianLang?>.png">
                    </a>
                </div>
                <div class="adm-detail-toolbar-right button-create-order">
                    <input type="submit" value="<?=GetMessage("LC_CHECKOUT")?>" class="adm-btn-save" style="padding-left: 37px !important;">
                </div>
                <span id="global_menu_store"  class="adm-default  adm-store icon-cart">
                    <div class="adm-main-menu-item-icon" style="background-position: center -189px; background-size: 20px"></div>
                </span>
                <div class="total-cost-wrap">
                    <span class="sum_cart_price"><?=GetMessage('LC_INAPP_CART_TOTAL')?></span>
                    <span class="cost"></span>
                </div>
            </div>
        </form>
    </div>

    <div style="height:1px;width:100%;clear:both;"><!-- --></div>

    <div id="after-loaded-content">
        <div id="content-loaded" style="min-width: 400px;">
            <?
            if(!isset($_REQUEST['load_full_content'])){
                ?>
                <div style="float:left;height:50px;line-height: 50px;font-weight: bold;margin-left: 13px;margin-top: -19px;">
                    <?=GetMessage('LC_INAPP_PURCHASES_LOADING_WAIT')?>
                </div>
                    <div class="img-loader-store" style="margin-left: 18px;margin-top: -19px;float:left;position:static;width:70px;height:50px;background-position: right center;">
                </div>
                <div class="spacer"><!-- --></div>
                <?
            }else{
                ?>
                <?
                $arParams = array(
                    'showcase_id'=> false,
                    'main_product_code'=>$accorsys_module_code,
                    'is_point_rait'=> 'Y'
                );

                $dbmarket = new CProgramCatalogSC($arParams);
                //$arThisModule = $dbmarket->getProductByCode($accorsys_module_code);
                $arThisModule = $dbmarket->getMainProductByCode($accorsys_module_code);
                $pageNavigation = $dbmarket->getNavigationArray();

                
                $accorsysSL = new CAccorsysLS();
                $rsBuy = $accorsysSL->getBuy();
                while($arBuy = $rsBuy->getNext()){
                    $arAccorsysLicenses[$arBuy["LICENSE_TYPE_ID"].'-'.$arBuy["QTY"]] += 1;
                }
                if($arThisModule!=false){
                    $feedback = (int)$arThisModule["count_comments"] ? GetMessage("LC_REVIEWS")." ".$arThisModule["count_comments"] : GetMessage("LC_ADD_REVIEW");
                    ?>
                    <div class="adm-detail-block" id="default-item">
                        <div class="adm-detail-content-wrap" style="border-radius: 4px; border-top: 1px solid #ced7d8;">
                            <div class="bx-gadgets-top-wrap hide"> <!--if there is a title (remove or add a class "hide")-->
                                <div class="bx-gadgets-top-center">
                                    <div class="bx-gadgets-top-title"><?=GetMessage("LC_OTHER_PRODUCTS")?></div>
                                    <div class="bx-gadgets-top-button"></div>
                                </div>
                            </div>
                            <?
                            $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
                            $countUsers = 0;
                            $arCountUsers = array();
                            $obUser = new CAccorsysExtensionsUser("accorsys.localization");
                            foreach($lcTempSettings['arGroupValues'] as $groupID => $isDoc){
                                foreach(CGroup::GetGroupUser($groupID) as $user){
                                    $arCountUsers[$user] = $user;
                                }
                            }
                            $countUsers = count($arCountUsers);
                            if((int)$countUsers > (int)$obUser->userCount){
                                $arRecomendations['recomendations'][5]['needMoreUserLisence'] = str_replace(array("#USER_COUNT#",'#USER_COUNT_BUY#','#USER_COUNT_DIFF#'),array("<span>".$countUsers."</span>","<span>".$obUser->userCount."</span>","<span>".($countUsers - $obUser->userCount)."</span>"),GetMessage("LC_INAPP_PURCHASES_REMINDER"));
                            }
                            ?>
                            <?if(isset($arRecomendations['recomendations'])){?>
                                <div class="adm-info-message">
                                    <h4>
                                        <?=GetMessage("LC_RECOMMENDED_ACTIONS")?>
                                    </h4>
                                    <ul <?=count($arRecomendations['recomendations'],true) == 2 ? 'class="non-bullit"':''?>>
                                        <?foreach($arRecomendations['recomendations'] as $arReccomend){
                                            foreach($arReccomend as $key => $rec){
                                                ?>
                                                <li class="accorsys-rec-<?=$key?>">
                                                    <?=$rec?>
                                                </li>
                                            <?
                                            }
                                        }?>
                                    </ul>
                                </div>
                            <?}?>
                            <div class="adm-detail-content">
                                <div class="adm-detail-content-item-block" style="padding-bottom: 0px; padding-right: 19px;">
                                    <div class="adm-detail-title adm-detail-title-product">
                                        <div class="title-products-table">
                                            <div class="adm-detail-title-icon_cell">
                                                <a target="_blank" href="<?=$arThisModule['url']?>">
                                                    <div class="title-other_products-icon_wrapper">
                                                        <img class="adm-detail-title-icon" src='<?=CLocale::getPCImagePathFromCDN($arThisModule["img"],125)?>'>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="title-text">
                                                <span class="vendor-name"><?=$arThisModule['vendor']?></span><br />
                                                <span class="name_solutions"><?=$arThisModule["name"]?> </span>
                                                <div id="description" class="adm-detail-content-description description-preview">
                                                    <?=$arThisModule['preview_text']?>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="adm-detail-title-rev">
                                            <?/*<a class="rating" target="_blank" href="<?=$arThisModule["url"].'#rating'?>" >???????: <?=$arThisModule["rating"]?>%</a>
                                                <a class="reviews" target="_blank" href="<?=$arThisModule["url"].'#comments'?>" ><?=$feedback?></a>
                                            */?>
                                        </div>
                                    </div>
                                    <?if(count($arThisModule['screenshot_list'])>0){?>
                                        <div class="information-wrap-margin"></div>
                                        <div class="screenshot-block product-screenshot-block">
                                            <ul class="elastislide-list screenshot_carousel_elastislide">
                                            <?foreach($arThisModule['screenshot_list'] as $screenShot){?>
                                                <li><a class="screenshot-image" rel="group<?=md5(serialize($arThisModule['screenshot_list']))?>" href="<?=$screenShot?>" ><img src="<?=CLocale::getPCImagePathFromCDN($screenShot,175, 140, true)?>" alt=""></a></li>
                                            <?}?>
                                            </ul>
                                        </div>
                                    <?}?>
                                    <?
                                    define('MODULE_ID','accorsys.localization');

                                    //$b = new CProgramcatalogRestrictive(array("COUNT_USER_GROUP"=>$arThisModule['qty']));

                                    $arLicenseGroup = $dbmarket->getLicenseByProductId($arThisModule['id']);
                                    $arNotSectionsItems = array();
                                    foreach($arLicenseGroup as $key => $licenseGroup){
                                        if(trim($licenseGroup['group_name']) != ""){
                                            $arLicenseGroup[$key]['group_name'] .= ', ';
                                        }
                                        foreach($licenseGroup['ITEMS'] as $license){
                                            if(trim($licenseGroup['name_section']) == "")
                                                $arNotSectionsItems['ITEMS'] = $license;
                                        }
                                        if(trim($licenseGroup['name_section']) == ""){
                                            unset($arLicenseGroup[$key]);
                                        }
                                    }
                                    if(!empty($arNotSectionsItems)){
                                        $arNotSectionsItems['name_section'] = false;
                                        $arLicenseGroup[0] = $arNotSectionsItems;
                                    }
                                    if($arLicenseGroup != false){
                                        $isNeedOpenedRedaction = true;
                                        foreach($arLicenseGroup as $key => $licenseGroup){
                                            foreach($licenseGroup['ITEMS'] as $item){
                                                if(trim($item["sale"]) == 'Y'){
                                                    $isNeedOpenedRedaction = true;
                                                    break;
                                                }
                                            }
                                            if(count($arLicenseGroup) < 2){
                                                ?>
                                                <label style="<?=strtoupper($licenseGroup['name_section']) == strtoupper($arThisModule["name"]) ? ' display:none; ':''?>" class="accordion-group-label opened-accordion" for="group-<?=$key?>"><?=$licenseGroup['group_name'].$licenseGroup['name_section']?></label>
                                                <div class="spacer"><!-- --></div>
                                            <?
                                            }
                                            if($licenseGroup['name_section'] && count($arLicenseGroup) > 1){?>
                                            <!--accordion begin-->
                                            <div class="accordion">
                                                <div class="accordion-group">
                                                    <input <?=$isNeedOpenedRedaction ? ' checked="true" ':''?> class="accordion-group-checkbox" id="group-<?=$key?>" name="accordion" type="checkbox"/>
                                                    <label class="accordion-group-label" for="group-<?=$key?>"><?=$licenseGroup['group_name'].$licenseGroup['name_section']?><span class="count-accordeon">(<?=count($licenseGroup['ITEMS'])?>)</span><span class="accordion-group-arrow-icon"></span></label>
                                                    <div class="accordion-group-content">
                                            <?
                                                $isNeedOpenedRedaction = false;
                                            }
                                            foreach($licenseGroup['ITEMS'] as $key => $license){
                                                if($license['price_type'] == 'point'){
                                                    if($license['qty_in_pack'] > 1){
                                                        $license['name'] = $license['name'].', <span class="count">'.str_replace("#PRODUCT_QTY#",'<span class="count">'.$license['qty_in_pack'].'</span>', GetMessage("LC_PRODUCT_QTY_POINT")).'</span>';
                                                    }else{
                                                        $license['name'] = $license['name'].', <span class="count">'.str_replace("#PRODUCT_QTY#",'<span class="count">'.$license['qty_in_pack'].'</span>', GetMessage("LC_PRODUCT_QTY_SINGLE")).'</span>';
                                                    }
                                                }
                                                if(count($licenseGroup['ITEMS']<=1)){
                                                    $license['url_buy'] = $arThisModule['url_buy'];
                                                }
                                                if($key > 1 && $licenseGroup['ITEMS'][$key]['id'] != $licenseGroup['ITEMS'][$key-1]['id'] && $licenseGroup['ITEMS'][$key-2]['id'] == $licenseGroup['ITEMS'][$key-1]['id']){
                                                    ?>
                                                    <hr>
                                                    <?
                                                }
                                                ?>
                                                <div class="box">
                                                    <div class="box-heading">
                                                        <div class="box-heading-table">
                                                            <?if(trim($license['license_img']) != ""){?>
                                                                <div class="box-heading-wrapper_icon">
                                                                    <div class="box-heading-icon">
                                                                        <img src="<?=CLocale::getPCImagePathFromCDN($license['license_img'],28)?>">
                                                                    </div>
                                                                </div>
                                                            <?}?>
                                                            <?
                                                            if(isset($arAccorsysLicenses[$license["article"]])){
                                                                ?>
                                                                <div class="box-heading-bought">
                                                                    <span class="box-heading-bought-checkmark">&#10003;</span>
                                                                    <span class="box-heading-bought-amount"><?=$arAccorsysLicenses[$license["article"]]?></span>
                                                                </div>
                                                            <?}?>
                                                            <div class="box-heading-title">
                                                                <div class="box-heading-title-wrapp">
                                                                    <b><?=$license['name']?></b>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="box-content">
                                                        <div class="box-content-options">
                                                            <?if(trim($license["discount"]) != ''){?>
                                                                <div class="container-discount">
                                                                    <span class="icon-discount <?=$license['sale'] == 'Y' ? '':'saving'?>">-<?=$license["discount"]?>%</span>
                                                                    <div class="container-price">
                                                                        <div class="box-content-options-price price-crossed"><s><?=$license['price_type'] == 'point' ? $license['sum_old_price']:$license['old_price']?></s></div>
                                                                        <div class="box-content-options-price mp-price price-discount"><?=$license['price_type'] == 'point' ? $license['sum_price']:$license['price']?></div>
                                                                    </div>
                                                                </div>
                                                            <?}else{?>
                                                                <div class="box-content-options-price mp-price price-regular"><?=$license['price_type'] == 'point' || $license['price_type'] == 'rate' ? $license['sum_price']:$license['price']?></div>
                                                            <?}?>
                                                            <div class="box-content-options-number">
                                                                <input class="licenseId"  type="hidden" name="ids[<?=$license['id']?>]" value="<?=$license['id']?>" />
                                                                <input
                                                                    class="licenseCount"
                                                                    <?=trim($license["discount"]) != '' ? ' data-price-by-one-discount="'.($license['price_type'] == 'point'?$license["sum_price_not_format"]:$license['price_not_format']).'" data-price-by-one-crossed="'.($license['price_type'] == 'point'?$license["sum_old_price_not_format"]:$license['old_price_not_format']).'" ':' data-price-by-one="'.($license['price_type'] == 'point'?$license['sum_price_not_format']:$license['price_not_format']).'" '?>
                                                                    data-count-package="<?=$license['price_type'] == 'point' ? $license["qty_in_pack"]:'1'?>"
                                                                    data-min-count-element-buy="<?=$license["min_count_element_buy"]?>"
                                                                    type="text"
                                                                    value="<?=$license["min_count_element_buy"]?>"
                                                                    name="qtys[<?=$license['id']?>]"
                                                                    size="3"
                                                                >
                                                                <input class="urlProduct" type="hidden" value="<?=$arThisModule['url']?>" size="3">
                                                                <div class="price-count-quantity_control">
                                                                    <a class="quantity_control-plus"></a>
                                                                    <a class="quantity_control-minus inactive"></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div data-count-package="<?=$license['price_type'] == 'point' ? $license['qty_in_pack']:1?>" class="add_to_cart<?=$license['id']?> box-footer-cart not-added"></div>
                                                        <input class="addToCart"  type="button" onclick="" value="<?=GetMessage("LC_TO_CART")?>" name="" id="" style="padding: 0 13px 0 37px;">
                                                    </div>
                                                </div>
                                            <?
                                            }
                                            if($licenseGroup['name_section'] && count($arLicenseGroup) > 1){?>
                                                </div>
                                                </div>
                                                </div>
                                                <!--accordion end-->
                                            <?}
                                        }
                                    }
                                    ?>
                                    <div style="height:1px;width:100%;clear:both;"><!-- --></div>
                                </div>
                            </div>
                        </div>
                    </div>
                <?
                }else{?>
                    <div class="error-message">
                        <?=GetMessage("LC_ERROR_NO_INTERNET_CONNECTION")?>
                    </div>
                <?}
                foreach($arAccorsysShowcaseId as $id){
                    $arExcludeProducts = array($accorsys_module_code);

                    if($id == 'inapp_other'){
                        $arExcludeProducts[] = 'accorsys_zhivoy_redaktor';
                    }
                    $arParams = array(
                        'showcase_id'=> $id,
                        'main_product_code'=>$accorsys_module_code,
                        'exclude_products_code' => $arExcludeProducts
                    );

                    if(isset($_REQUEST["PAGE_" . $id])){
                        $arParams["NAVIGATION"] = array("PAGE_1"=>$_REQUEST["PAGE_" . $id],"COUNT"=>$_REQUEST["COUNT_" . $id]);
                    }

                    $dbmarket = new CProgramCatalogSC($arParams);
                    //$arThisModule = $dbmarket->getProductByCode($accorsys_module_code);
                    $arThisModule = $dbmarket->getMainProductByCode($accorsys_module_code);
                    $pageNavigation = $dbmarket->getNavigationArray();

                    if((int)$pageNavigation['this_page'] == 0)
                        $pageNavigation['this_page']++;
                    $pagesCountSelect = (int)(isset($_REQUEST["COUNT_" . $id]) ? $_REQUEST["COUNT_" . $id] : $pageNavigation['default_element_count']);
                    $arPagesCountSelect = array(10,20,40);
                    if(array_search($pagesCountSelect,$arPagesCountSelect) === false){
                        $arPagesCountSelect[] = $pagesCountSelect;
                        asort($arPagesCountSelect);
                    }
                    $accorsysSL = new CAccorsysLS();
                    $rsBuy = $accorsysSL->getBuy();
                    while($arBuy = $rsBuy->getNext()){
                        $arAccorsysLicenses[$arBuy["LICENSE_TYPE_ID"].'-'.$arBuy["QTY"]] += 1;
                    }
                    $arModules = $dbmarket->getProducts();
                    $showcaseName = $arModules['showcase_name'];
                    ?>
                    <?if(count($arModules['ITEMS'])>0){
                        $needOpenItem = count($arModules['ITEMS']) == 1 && !isset($_REQUEST["PAGE_" . $id]);
                    ?>
                    <div id="idForScrollDetailItem_<?=$id?>" class="js-accorsys-showcase-box bx-gadgets bx-gadgets-no-padding" data-showcaseid="<?=$id?>">
                        <input type="hidden" class="current-currency-format" data-format-string="<?=$arModules['format_currency']['format_string']?>" data-dec-point="<?=$arModules['format_currency']['dec_point']?>" data-thousands-sep="<?=$arModules['format_currency']['thousands_sep']?>" data-decimals="<?=$arModules['format_currency']['decimals']?>">
                        <div id="ajaxRequestID_<?=$id?>">
                            <div class="bx-gadgets-top-wrap"><!--if there is a title (remove or add a class "hide")-->
                                <div class="bx-gadgets-top-center">
                                    <div class="bx-gadgets-top-title"><?=$showcaseName.' ('.$arModules['show_case_product_count'].')'?></div>
                                    <div class="bx-gadgets-top-button"></div>
                                </div>
                            </div>
                            <div class="bx-gadgets-content">
                                <?foreach($arModules['ITEMS'] as $module){
                                    $title_name = $module['name'];

                                    if($module['price_type'] == 'point'){
                                        if($module['qty_in_pack'] > 1){
                                            $title_name = $module['name'] . ', '
                                                .str_replace("#PRODUCT_QTY#",$module['qty_in_pack'], GetMessage("LC_PRODUCT_QTY_PACK"));

                                            $module['main_license_name'] = $module['main_license_name'].
                                                ', <span class="count">'
                                                    .str_replace("#PRODUCT_QTY#",'<span class="count">'.$module['qty_in_pack'].'</span>', GetMessage("LC_PRODUCT_QTY_PACK"))
                                                .'</span>';
                                        }else{
                                            $title_name = $module['name']. ', '
                                                . str_replace("#PRODUCT_QTY#",$module['qty_in_pack'], GetMessage("LC_PRODUCT_QTY_SINGLE"));

                                            $module['main_license_name'] = $module['main_license_name']
                                                . ', <span class="count">'
                                                    . str_replace("#PRODUCT_QTY#",'<span class="count">'.$module['qty_in_pack'].'</span>', GetMessage("LC_PRODUCT_QTY_SINGLE"))
                                                . '</span>';
                                        }
                                    }
                                    $license_count = $module['edition_element_count'];
                                    if($license_count > 1 ){
                                        $showMore = '<a href="'.($module['code'] != $accorsys_module_code ? 'javascript:void(0)':'#default-item').'">'.GetMessage("LC_ALL_PURCHASE_OPTIONS").' ('.$license_count.')</a>';
                                        $showMoreTitle = '<a href="'.($module['code'] != $accorsys_module_code ? 'javascript:void(0)':'#default-item').'">'.GetMessage("LC_ALL_PURCHASE_OPTIONS").' ('.$license_count.')</a>';
                                    }else{
                                        $showMore = '<a href="'.($module['code'] != $accorsys_module_code ? 'javascript:void(0)':'#default-item').'">'.GetMessage("LC_SHOW_DETAILS").'</a>';
                                        $showMoreTitle = '<a href="'.($module['code'] != $accorsys_module_code ? 'javascript:void(0)':'#default-item').'">'.GetMessage("LC_SHOW_DETAILS").'</a>';
                                    }
                                    ?>
                                    <div class="adm-detail-block inline-block <?=$needOpenItem ? ' loaded-content full_width ' : ' min_width '?>" >
                                        <div class="adm-detail-content-wrap" style="border-style: none">
                                            <div class="adm-detail-content min-content">
                                                <div class="adm-detail-content-background"> <!--if this last open to add class "last_open"-->
                                                    <div class="adm-detail-title title-other_products" style="padding-right: 3px;" title="<?=htmlspecialcharsbx($title_name, ENT_QUOTES, '')?>">
                                                        <div id="<?=$module['id']?>" title="<?=strip_tags($showMoreTitle)?>" class="show-product js-acorsys-module-item"></div>
                                                        <div class="title-other_products-table">
                                                            <div class="title-other_products-icon_cell">
                                                                <div class="title-other_products-icon_wrapper">
                                                                    <a target="_blank" href="<?=$module['url']?>">
                                                                        <?if(trim($module['img']) != ""){?>
                                                                            <img class="title-other_products-icon" src="<?=CLocale::getPCImagePathFromCDN($module['img'],125)?>">
                                                                        <?}?>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="title-other_products-title">
                                                                <span class="vendor-name"><?=$module['vendor']?></span><br />
                                                                <span class="name_solutions"><?=$module['name']?></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="adm-detail-content-item-block" style="padding-bottom: 0px; padding-right: 4px; border-top-width: 0;">
                                                        <div class="box">
                                                            <div class="box-heading">
                                                                <div class="box-heading-table">
                                                                    <?if(trim($module['main_license_img']) != ""){?>
                                                                        <div class="box-heading-wrapper_icon">
                                                                            <div class="box-heading-icon">
                                                                                <img src="<?=CLocale::getPCImagePathFromCDN($module['main_license_img'],28)?>">
                                                                            </div>
                                                                        </div>
                                                                    <?}?>
                                                                    <?if(isset($arAccorsysLicenses[$module["article"]])){?>
                                                                        <div class="box-heading-bought" style="">
                                                                            <span class="box-heading-bought-checkmark">&#10003;</span>
                                                                            <span class="box-heading-bought-amount"><?=$arAccorsysLicenses[$module["article"]]?></span>
                                                                        </div>
                                                                    <?}?>
                                                                    <div class="box-heading-title">
                                                                        <div class="box-heading-title-wrapp">
                                                                            <b><?=$module['main_license_name']?></b>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="box-content">
                                                                <div class="box-content-options">
                                                                    <?if(trim($module["discount"]) != ''){?>
                                                                        <div class="container-discount">
                                                                            <span class="icon-discount <?=$module['sale'] == 'Y' ? '':'saving'?>">-<?=$module["discount"]?>%</span>
                                                                            <div class="container-price">
                                                                                <div class="box-content-options-price price-crossed"><s><?=$module['price_type'] == 'point' ? $module['sum_old_price']:$module['old_price']?></s></div>
                                                                                <div class="box-content-options-price mp-price price-discount"><?=$module['price_type'] == 'point' ? $module['sum_price']:$module['price']?></div>
                                                                            </div>
                                                                        </div>
                                                                    <?}else{?>
                                                                        <div class="box-content-options-price mp-price price-regular"><?=$module['price_type'] == 'point' || $module['price_type'] == 'rate' ? $module['sum_price']:$module['price']?></div>
                                                                    <?}?>
                                                                    <div class="box-content-options-number">
                                                                        <input class="licenseId" type="hidden" name="ids[<?=$module['main_license_id']?>]" value="<?=$module['main_license_id']?>" />
                                                                        <input
                                                                            class="licenseCount"
                                                                            <?=trim($module["discount"]) != '' ? ' data-price-by-one-discount="'.($module['price_type'] == 'point'?$module["sum_price_not_format"]:$module['price_not_format']).'" data-price-by-one-crossed="'.($module['price_type'] == 'point'?$module["sum_old_price_not_format"]:$module['old_price_not_format']).'" ':' data-price-by-one="'.($module['price_type'] == 'point'?$module['sum_price_not_format']:$module['price_not_format']).'" '?>
                                                                            data-count-package="<?=$module['price_type'] == 'point' ? $module["qty_in_pack"]:'1'?>"
                                                                            data-min-count-element-buy="<?=$module["min_count_element_buy"]?>"
                                                                            type="text"
                                                                            value="<?=$module["min_count_element_buy"]?>"
                                                                            name="qtys[<?=$module['main_license_id']?>]"
                                                                            size="3"
                                                                        >
                                                                        <input class="urlProduct" type="hidden" value="<?=$module['url']?>" size="3">
                                                                        <div class="price-count-quantity_control">
                                                                            <a class="quantity_control-plus"></a>
                                                                            <a class="quantity_control-minus inactive"></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="box-footer">
                                                                <div data-count-package="<?=$module['price_type'] == 'point' ? $module['qty_in_pack']:1?>" class="add_to_cart<?=$module['main_license_id']?> box-footer-cart not-added"></div>
                                                                <input class="addToCart"  type="button" onclick="" value="<?=GetMessage("LC_TO_CART")?>" name="" id="" style="padding: 0 13px 0 37px;">
                                                            </div>
                                                        </div>
                                                        <div class="all_offers visible">
                                                            <?if($module['code'] != $accorsys_module_code){?>
                                                                <span  href="#" class="js-acorsys-module-item" id="<?=$module['id']?>"><?=$showMore?></span>
                                                            <?}else{?>
                                                                <span class="js-acorsys-module-jump-to-default" id="<?=$module['id']?>">
                                                                    <?=$showMore?>
                                                                </span>
                                                            <?}?>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <?if($needOpenItem){
                                                $_REQUEST['product_id'] = $module['id'];
                                                $_REQUEST['showcase_id'] = $id;
                                                include($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/ajax/accorsys_get_product_detail_market.php');
                                            }?>
                                        </div>
                                    </div>
                                <?}?>
                            </div>
                            <!--pagination start--->
                            <?if($pageNavigation['all_element_count'] > $pageNavigation['default_element_count']):?>
                                <div class="adm-navigation adm-list-table-footer">
                                    <div class="adm-nav-pages-block">
                                        <span class="adm-nav-page adm-nav-page-prev <?=$pageNavigation["this_page"] == 1 ? "default-cursor":""?>"></span>
                                        <?for($i = 1;$i <= (int)$pageNavigation["count_page"];$i++){?>
                                            <span class="adm-nav-page<?=$pageNavigation['this_page'] == $i ? "-active default-cursor":""?> adm-nav-page"><?=$i?></span>
                                        <?}?>
                                        <span class="adm-nav-page adm-nav-page-next <?=$pageNavigation["this_page"] == $pageNavigation["count_page"] ? "default-cursor":""?>"></span>
                                    </div>
                                    <?
                                    $startItem = ((int)($pageNavigation["this_page"] -1 )*$pagesCountSelect + 1);
                                    if($pageNavigation["this_page"] == $pageNavigation["count_page"]){
                                        $endItem = ((int)($pageNavigation["this_page"] -1 )*$pagesCountSelect + $pageNavigation["element_count"]);
                                    }else{
                                        $endItem = ((int)$pageNavigation["this_page"]*$pagesCountSelect);
                                    }

                                    ?>
                                    <div class="adm-nav-pages-total-block"><?=GetMessage("LC_PRODUCTS")?> <?=$startItem?> &ndash; <?=$endItem?> <?=GetMessage("LC_AND")?> <?=$pageNavigation["all_element_count"]?></div>
                                    <div class="adm-nav-pages-number-block">
                                        <span class="adm-nav-pages-number">
                                            <span class="adm-nav-pages-number-text"><?=GetMessage("LC_ON_PAGE")?></span>
                                            <span class="adm-select-wrap">
                                                <select class="adm-select count-pages" name="">
                                                    <?foreach($arPagesCountSelect as $value){?>
                                                        <option <?echo $value == $pagesCountSelect ? " selected='selected' " : ""?> value="<?=$value?>"><?=$value?></option>
                                                    <?}?>
                                                </select>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            <?endif;?>
                            <!--pagination end--->
                        </div>
                    </div>
                <?}?>
                <?}?>
            <?}?>
        </div>
    </div>
</div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin.php");?>