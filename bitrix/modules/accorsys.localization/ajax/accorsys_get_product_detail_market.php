<?php
define("NO_KEEP_STATISTIC", true);
define("PRODUCT_ID_VARIABLE",'id');
define("ACTION_VARIABLE",'act');
define("COUNT_VARIABLE",'count');
define("PACK_VARIABLE",'pack');
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
if(isset($_REQUEST['product_id']) && isset($_REQUEST['showcase_id'])){
    CModule::IncludeModule("accorsys.localization");
    CLocale::includeLocaleLangFiles();
    $accorsysSL = new CAccorsysLS();
    $rsBuy = $accorsysSL->getBuy();

    while($arBuy = $rsBuy->getNext()){
        $arAccorsysLicenses[$arBuy["LICENSE_TYPE_ID"]] = $arBuy;
    }

    $dbmarket = new CProgramCatalogSC();
    /*
     * �������� ������� ������
     */
    $arLicenseGroup = $dbmarket->getLicenseByProductIdQuery(intval($_REQUEST['product_id']),$_REQUEST['showcase_id']);
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

    $arThisModule = $dbmarket->getProductById(intval($_REQUEST['product_id']));
    if($arThisModule!=false){
        $feedback = (int)$arThisModule["count_comments"] ? GetMessage("LC_REVIEWS").$arThisModule["count_comments"] : GetMessage("LC_ADD_REVIEW");
        ?>
    <div class="adm-detail-content full-content">
        <div class="adm-detail-content-background">
            <div class="adm-detail-title title-other_products" style="padding-right: 3px;">
                <div class="all_offers all_offers-top js-slide-up-offers" title="<?=GetMessage("LC_ROLL_UP")?>"></div>
                <div class="title-other_products-table">
                    <div class="title-other_products-icon_cell">
                        <a href="<?=$arThisModule['url']?>" target="_blank">
                            <div class="title-other_products-icon_wrapper">
                                <img class="title-other_products-icon" src="<?=CLocale::getPCImagePathFromCDN($arThisModule['img'],125)?>">
                            </div>
                        </a>
                    </div>
                    <div class="title-other_products-title">
                        <span class="vendor-name"><?=$arThisModule["vendor"]?></span><br />
                        <span class="name_solutions"><?=$arThisModule["name"]?></span>
                        <div id="description" class="adm-detail-content-description description-preview">
                            <?=$arThisModule['preview_text']?>
                        </div>
                    </div>
                </div>
                <div class="adm-detail-title-rev">
                    <?/*<a class="rating" target="_blank" href="<?=$arThisModule["url"].'#rating'?>" >�������: <?=$arThisModule["rating"]?>%</a>
                    <a class="reviews" target="_blank" href="<?=$arThisModule["url"].'#comments'?>" ><?=$feedback?></a>
                    */?>
                </div>
            </div>
            <div class="information-wrap">
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
            </div>
            <div class="adm-detail-content-item-block" style="padding-bottom: 0px; padding-right: 19px;">
                <?
                //������� �������� ��������
                if($arLicenseGroup != false){
                    $isNeedOpenedRedaction = true;
                    foreach($arLicenseGroup as $key =>$licenseGroup){
                        foreach($licenseGroup['ITEMS'] as $item){
                            if(trim($item["sale"]) == 'Y'){
                                $isNeedOpenedRedaction = true;
                                break;
                            }
                        }
                        if(count($arLicenseGroup) < 2){
                            ?>
                            <label style="<?=strtoupper($licenseGroup['name_section']) == strtoupper($arThisModule["name"]) ? ' display:none; ':''?>" class="accordion-group-label opened-accordion"><?=$licenseGroup['group_name'].$licenseGroup['name_section']?></label>
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
                        foreach($licenseGroup['ITEMS'] as $license){
                            if(trim($license['discount']) == "" && $_REQUEST['showcase_id'] == 'inapp_sale')
                                continue;

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
                            ?>
                            <div class="box">
                                <div class="box-heading">
                                    <div class="box-heading-table">
                                        <?if(isset($license['license_img']) && trim($license['main_license_img']) != ""){?>
                                            <div class="box-heading-wrapper_icon">
                                                <div class="box-heading-icon">
                                                    <img src="<?='http://www.programcatalog.ru/ajax/getresizeimage.php?src='.$license['license_img'].'&width=28'?>">
                                                </div>
                                            </div>
                                        <?}?>
                                        <?
                                        if(isset($arAccorsysLicenses[$license["article"]])){?>
                                            <div class="box-heading-bought" style="">
                                                <span class="box-heading-bought-checkmark">&#10003;</span>
                                                <span class="box-heading-bought-amount"><?=$arAccorsysLicenses[$license["article"]]["QTY"]?></span>
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
                                            <input class="licenseId" type="hidden" name="ids[<?=$license['id']?>]" value="<?=$license['id']?>" />
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
                                    <input class="addToCart"  type="button" onclick="" value="<?=Getmessage("LC_TO_CART")?>" name="" id="" style="padding: 0 13px 0 37px;">
                                    <?if(intval($license['buy_qty'])>0){?>
                                        <span id="global_menu_store"  class="adm-default  adm-store checkmark" >
                                            <div class="adm-main-menu-item-icon" style="background-position: 1px -1181px; background-size: 100%"></div>
                                        </span>
                                    <?}?>
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

                <div class="all_offers all_offers-bottom">
                    <a class="js-slide-up-offers"><?=GetMessage("LC_ROLL_UP")?></a>
                </div>
            </div>
        </div>
    </div>
    <?
    }
}
?>