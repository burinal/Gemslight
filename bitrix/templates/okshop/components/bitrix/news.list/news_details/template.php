<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?php foreach($arResult["ITEMS"] as $arItem){
    $type_item = $arItem["PROPERTIES"]["NEWS_EVENT"]["VALUE"];
    $img_item1 = CFile::GetPath($arItem["PROPERTIES"]["NEWS_IMAGE"]["VALUE"]);
    ?>
    <div class="news_item">
        <div class="accommodation-bg" style="background-image: url(<?php echo $img_item1; ?>)">
            <div class="label_<?php echo $type_item; ?>"></div>
            <?php if($type_item == 'yes'){ ?>
                <div class="date_block"><?php echo date("d F", strtotime($arItem["PROPERTIES"]["NEWS_EVENT_DATE"]["VALUE"]));  ?></div>
            <?php }else{?>
                <div class="date_block"><?php echo date("d F", strtotime($arItem["DATE_ACTIVE_FROM"]));  ?></div>
            <?php } ?>
            <h3 class="title_block" ><?=$arItem["NAME"]?></h3>
            <div class="news-bg-change">
                <?if($arParams["DISPLAY_PREVIEW_TEXT"]!="N" && $arItem["PREVIEW_TEXT"]):?>
                    <div class="content_block">
                        <p><? echo substr($arItem["PREVIEW_TEXT"], 0, 400) . '...';?></p>
                    </div>
                <?endif?>
                <?php if($type_item == 'yes'){?>
                    <div class="button_block">
                        <a href="<?echo $arItem["DETAIL_PAGE_URL"]?>" class="">join event</a>
                    </div>
                <?}else{?>
                    <div class="button_block">
                        <a href="<?echo $arItem["DETAIL_PAGE_URL"]?>" class="">details</a>
                    </div>
                <?php }?>
            </div>
        </div>
    </div>
<?php }?>

<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
    <div class="pagination_page"><?=$arResult["NAV_STRING"]?></div>
<?endif;?>