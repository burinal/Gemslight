<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

if(count($arResult["ITEMS"])>0){ $kolvo = count($arResult["ITEMS"]); }
else if(count($arResult["ITEMS"]) == 0){$kolvo = 0;}
else {	echo '<p class="error">'.GetMessage("EBS_EMPTY").'</p>'; }
?>
<div class="emarket-basket-small">
	<a href="<?=$arParams["PATH_TO_BASKET"]?>" class="ico basket-ico">
        <img src="<? echo SITE_TEMPLATE_PATH; ?>/images/icons/cart_icon.png"/>
    </a>
	<div class="kolvo_items"><?php echo $kolvo; ?></div>
</div>