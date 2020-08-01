<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
CLocale::includeLocaleLangFiles();
if(isset($_REQUEST['LICENSE_ID']) && isset($_REQUEST['COUNT'])){
    $arSendCounts = array();
    $arSendLicense = array();
    foreach(json_decode($_REQUEST["COUNT"]) as $arCounts){
        if(trim($arCounts[0]) == "" && trim($arCounts[1]) == "")
            continue;
        $arSendCounts[$arCounts[0]] += (int)$arCounts[1];
    }
    foreach(json_decode($_REQUEST["LICENSE_ID"]) as $licenseID){
        if(trim($licenseID) == "")
            continue;
        $arSendLicense[$licenseID] = $licenseID;
    }

    $dbmarket = new CProgramCatalogSC();
    /*
     * Получаем список цен
     */
    $arThisPrice = $dbmarket->getProductsPrice('getProductCartList',$arSendLicense,$arSendCounts);
    if($arThisPrice!=false){
        foreach($arThisPrice['items'] as $price){
            if($price['qty'] == 1){
                $price['name'] = $price['name'].', <span class="count">'.str_replace("#PRODUCT_QTY#",$price['qty'], GetMessage("LC_PRODUCT_QTY_SINGLE")).'</span>';
            }elseif($price['qty'] > 1){
                $price['name'] = $price['name'].', <span class="count">'.str_replace("#PRODUCT_QTY#",$price['qty'], GetMessage("LC_PRODUCT_QTY_POINT")).'</span>';
            }
            $arItems[$price["product_name"].$price['name']] = $price;
            $arToSortItems[$price["product_name"].$price['name']] = $price["product_name"].$price['name'];
        }
        natsort($arToSortItems);
        foreach($arToSortItems as $key => $item){
            $arSortedItems[$key] = $arItems[$key];
        }
        $sortCount = 0;
        foreach($arSortedItems as $price){
            $sortCount++;
            ?>
            <tr class="adm-list-table-row data tr_product_id<?=$price['id']?>">

                <td class="adm-list-table-cell adm-list-table-checkbox adm-list-table-checkbox-hover">
                    <input id="" class="adm-checkbox adm-designed-checkbox" type="button" value="" name="">
                    <label title="<?=GetMessage("LC_MENU_EDIT_DEL")?>" class="adm-designed-button-label adm-checkbox item" for=""></label>
                </td>

                <td class="adm-list-table-cell module-name">
                    <?=$price["vendor"].' '.$price['product_name'].(trim($price['redaction_name']) != '' ? ' - '.$price['redaction_name'] : '')?>
                </td>

                <td class="adm-list-table-cell license-name">
                    <?='<b>'.$price['name'].'</b>'?>
                    <?
                    if(isset($price['item_code']))
                        echo '<br /><span style="color:#6a7c8a;font-size:11px;">'.$price['item_code'].'</span>';
                    ?>
                </td>

                <td class="adm-list-table-cell align-right price">
                    <div class="container-discount">
                    <?if(trim($price['discount']) != ""){
                        ?>
                        <div class="discount-wrapper">
                            <span class="icon-discount <?=$price['sale'] == 'Y' ? '':'saving'?>">-<?=$price['discount']?>%</span>
                        </div>
                        <div class="container-price">
                            <div class=" price-crossed"><s><?=$price['old_price']?></s></div>
                            <div class=" mp-price price-discount"><?=$price['price']?></div>
                        </div>
                        <?
                    }else{?>
                        <div class="discount-wrapper">

                        </div>
                        <div class="container-price-normal">
                            <?=$price["price"];?>
                        </div>
                    <?}?>
                    </div>
                </td>

                <td class="adm-list-table-cell align-center price-count">
                    <input class="licenseId"  type="hidden" name="ids[<?=$price['id']?>]" value="<?=$price['id']?>" />
                    <input
                        class="licenseCount"
                        data-sort="<?=$sortCount?>"
                        data-count-package="<?=$price['price_type'] == 'point' ? $price['qty']:'1'?>"
                        data-min-count-element-buy="<?=$price['min_count_element_buy']?>"
                        type="text"
                        value="<?=$price['count']?>"
                        name="qtys[<?=$price['id']?>][]"
                        size="2"
                    >
                    <div class="price-count-quantity_control">
                        <a class="quantity_control-plus"></a>
                        <a class="quantity_control-minus"></a>
                    </div>
                </td>
                <td class="adm-list-table-cell align-right total-price price-right-align" data-sum-price-not-format="<?=$price['sum_price_not_format']?>"><?=$price['sum_price']?></td>
            </tr>
            <?
        }
        ?>
        <tr class="adm-list-table-row">
            <td class="adm-list-table-cell sum_cart_price" colspan="4">
                <?=GetMessage("LC_INAPP_CART_TOTAL")?>
            </td>
            <td class="adm-list-table-cell sum_cart_price price-right-align" colspan="2">
                <span class="cost" data-format-string="<?=$arThisPrice['format_currency']['format_string']?>" data-dec-point="<?=$arThisPrice['format_currency']['dec_point']?>" data-thousands-sep="<?=$arThisPrice['format_currency']['thousands_sep']?>" data-decimals="<?=$arThisPrice['format_currency']['decimals']?>"> <?=$arThisPrice['sum_cart_price']?> </span>
            </td>
        </tr>
        <?
    }
}
?>