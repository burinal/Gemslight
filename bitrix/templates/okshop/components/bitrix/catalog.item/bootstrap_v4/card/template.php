<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Main\Localization\Loc;
?>
<?if($item['LABEL']) {?>
    <div class="label">
        <? echo $item['LABEL_VALUE']; ?>
    </div>
<?}?>
<div class="image_block">
    <a class="product-item-image-wrapper image_content" href="<?=$item['DETAIL_PAGE_URL']?>" title="<?=$imgTitle?>"
       data-entity="image-wrapper">
		<span class="product-item-image-slider-slide-container slide" id="<?=$itemIds['PICT_SLIDER']?>"
            <?=($showSlider ? '' : 'style="display: none;"')?>
              data-slider-interval="<?=$arParams['SLIDER_INTERVAL']?>" data-slider-wrap="true">
			<?
            if ($showSlider)
            {
                foreach ($morePhoto as $key => $photo)
                {
                    ?>
                    <span class="product-item-image-slide item <?=($key == 0 ? 'active' : '')?>"
                          style="background-image: url('<?=$photo['SRC']?>');">
					</span>
                    <?
                }
            }
            ?>
		</span>
        <span class="product-item-image-original" id="<?=$itemIds['PICT']?>"
              style="background-image: url('<?=$item['PREVIEW_PICTURE']['SRC']?>'); <?=($showSlider ? 'display: none;' : '')?>">
		</span>
        <?
        if ($item['SECOND_PICT'])
        {
            $bgImage = !empty($item['PREVIEW_PICTURE_SECOND']) ? $item['PREVIEW_PICTURE_SECOND']['SRC'] : $item['PREVIEW_PICTURE']['SRC'];
            ?>
            <span class="product-item-image-alternative" id="<?=$itemIds['SECOND_PICT']?>"
                  style="background-image: url('<?=$bgImage?>'); <?=($showSlider ? 'display: none;' : '')?>">
			</span>
            <?
        }

        if ($arParams['SHOW_DISCOUNT_PERCENT'] === 'Y')
        {
            ?>
            <div class="product-item-label-ring <?=$discountPositionClass?>" id="<?=$itemIds['DSC_PERC']?>"
                <?=($price['PERCENT'] > 0 ? '' : 'style="display: none;"')?>>
                <span><?=-$price['PERCENT']?>%</span>
            </div>
            <?
        }

        if ($item['LABEL'])
        {
            ?>
            <div class="product-item-label-text <?=$labelPositionClass?>" id="<?=$itemIds['STICKER_ID']?>">
                <?
                if (!empty($item['LABEL_ARRAY_VALUE']))
                {
                    foreach ($item['LABEL_ARRAY_VALUE'] as $code => $value)
                    {
                        ?>
                        <div<?=(!isset($item['LABEL_PROP_MOBILE'][$code]) ? ' class="hidden-xs"' : '')?>>
                            <span title="<?=$value?>"><?=$value?></span>
                        </div>
                        <?
                    }
                }
                ?>
            </div>
            <?
        }
        ?>
        <div class="product-item-image-slider-control-container" id="<?=$itemIds['PICT_SLIDER']?>_indicator"
            <?=($showSlider ? '' : 'style="display: none;"')?>>
            <?
            if ($showSlider)
            {
                foreach ($morePhoto as $key => $photo)
                {
                    ?>
                    <div class="product-item-image-slider-control<?=($key == 0 ? ' active' : '')?>" data-go-to="<?=$key?>"></div>
                    <?
                }
            }
            ?>
        </div>
        <?
        if ($arParams['SLIDER_PROGRESS'] === 'Y')
        {
            ?>
            <div class="product-item-image-slider-progress-bar-container">
                <div class="product-item-image-slider-progress-bar" id="<?=$itemIds['PICT_SLIDER']?>_progress_bar" style="width: 0;"></div>
            </div>
            <?
        }
        ?>
    </a>
<div class="params_block">
    <?if($item['PREVIEW_TEXT']) {?>
        <div class="text">
            <? echo $item['PREVIEW_TEXT']; ?>
        </div>
    <?}?>
        <?if (isset($item['DISPLAY_PROPERTIES']) && !empty($item['DISPLAY_PROPERTIES'])){?>
            <div class="options">
                <?
                foreach ($item['DISPLAY_PROPERTIES'] as $arOneProp)
                {
                    if('EMARKET_NEW' == $arOneProp['CODE']) continue;
                    if('EMARKET_BRAND' == $arOneProp['CODE']) continue;
                    if('EMARKET_TOP_TYPE' == $arOneProp['CODE']) continue;
                    ?>
                    <div class="option_item">
                        <div class="title"><? echo $arOneProp['NAME']; ?></div>
                        <div class="content">
                            <?
                            echo (
                            is_array($arOneProp['DISPLAY_VALUE'])
                                ? implode(', ', $arOneProp['DISPLAY_VALUE'])
                                : $arOneProp['DISPLAY_VALUE']
                            );
                            ?>
                        </div>
                    </div>
                    <?php
                }
                ?>
            </div>
        <?}?>
    <div class="product-item-info-container product-item-hidden" data-entity="buttons-block">
        <?
        if (!$haveOffers)
        {
            if ($actualItem['CAN_BUY'])
            {
                ?>
                <div class="product-item-button-container button_block" id="<?=$itemIds['BASKET_ACTIONS']?>">
                    <a class="click_button" id="<?=$itemIds['BUY_LINK']?>"
                       href="javascript:void(0)" rel="nofollow">
                        <?=($arParams['ADD_TO_BASKET_ACTION'] === 'BUY' ? $arParams['MESS_BTN_BUY'] : $arParams['MESS_BTN_ADD_TO_BASKET'])?>
                    </a>
                </div>
                <?
            }
            else
            {
                ?>
                <div class="product-item-button-container">
                    <?
                    if ($showSubscribe)
                    {
                        $APPLICATION->IncludeComponent(
                            'bitrix:catalog.product.subscribe',
                            '',
                            array(
                                'PRODUCT_ID' => $actualItem['ID'],
                                'BUTTON_ID' => $itemIds['SUBSCRIBE_LINK'],
                                'BUTTON_CLASS' => 'btn btn-primary '.$buttonSizeClass,
                                'DEFAULT_DISPLAY' => true,
                                'MESS_BTN_SUBSCRIBE' => $arParams['~MESS_BTN_SUBSCRIBE'],
                            ),
                            $component,
                            array('HIDE_ICONS' => 'Y')
                        );
                    }
                    ?>
                    <a class="btn btn-link <?=$buttonSizeClass?>"
                       id="<?=$itemIds['NOT_AVAILABLE_MESS']?>" href="javascript:void(0)" rel="nofollow">
                        <?=$arParams['MESS_NOT_AVAILABLE']?>
                    </a>
                </div>
                <?
            }
        }
        else
        {
            if ($arParams['PRODUCT_DISPLAY_MODE'] === 'Y')
            {
                ?>
                <div class="product-item-button-container">
                    <?
                    if ($showSubscribe)
                    {
                        $APPLICATION->IncludeComponent(
                            'bitrix:catalog.product.subscribe',
                            '',
                            array(
                                'PRODUCT_ID' => $item['ID'],
                                'BUTTON_ID' => $itemIds['SUBSCRIBE_LINK'],
                                'BUTTON_CLASS' => 'btn btn-primary '.$buttonSizeClass,
                                'DEFAULT_DISPLAY' => !$actualItem['CAN_BUY'],
                                'MESS_BTN_SUBSCRIBE' => $arParams['~MESS_BTN_SUBSCRIBE'],
                            ),
                            $component,
                            array('HIDE_ICONS' => 'Y')
                        );
                    }
                    ?>
                    <a class="btn btn-link <?=$buttonSizeClass?>"
                       id="<?=$itemIds['NOT_AVAILABLE_MESS']?>" href="javascript:void(0)" rel="nofollow"
                        <?=($actualItem['CAN_BUY'] ? 'style="display: none;"' : '')?>>
                        <?=$arParams['MESS_NOT_AVAILABLE']?>
                    </a>
                    <div id="<?=$itemIds['BASKET_ACTIONS']?>" <?=($actualItem['CAN_BUY'] ? '' : 'style="display: none;"')?>>
                        <a class="btn btn-primary <?=$buttonSizeClass?>" id="<?=$itemIds['BUY_LINK']?>"
                           href="javascript:void(0)" rel="nofollow">
                            <?=($arParams['ADD_TO_BASKET_ACTION'] === 'BUY' ? $arParams['MESS_BTN_BUY'] : $arParams['MESS_BTN_ADD_TO_BASKET'])?>
                        </a>
                    </div>
                </div>
                <?
            }
            else
            {
                ?>
                <div class="product-item-button-container">
                    <a class="btn btn-primary <?=$buttonSizeClass?>" href="<?=$item['DETAIL_PAGE_URL']?>">
                        <?=$arParams['MESS_BTN_DETAIL']?>
                    </a>
                </div>
                <?
            }
        }
        ?>
    </div>
</div>
</div>
<div class="info_block">
   <div class="item_title">
      <a href="<? echo $item['DETAIL_PAGE_URL']; ?>" title="<?=$productTitle?>"><?=$productTitle?></a>
   </div>
   <div class="item_price">
           <?
           if ($arParams['SHOW_OLD_PRICE'] === 'Y')
           {
               ?>
               <span class="price-old" id="<?=$itemIds['PRICE_OLD']?>"
                   <?=($price['RATIO_PRICE'] >= $price['RATIO_BASE_PRICE'] ? 'style="display: none;"' : '')?>>
								<?=$price['PRINT_RATIO_BASE_PRICE']?>
							</span>&nbsp;
               <?
           }
           ?>
           <span class="price-current" id="<?=$itemIds['PRICE']?>">
							<?
                            if (!empty($price))
                            {
                                if ($arParams['PRODUCT_DISPLAY_MODE'] === 'N' && $haveOffers)
                                {
                                    echo Loc::getMessage(
                                        'CT_BCI_TPL_MESS_PRICE_SIMPLE_MODE',
                                        array(
                                            '#PRICE#' => $price['PRINT_RATIO_PRICE'],
                                            '#VALUE#' => $measureRatio,
                                            '#UNIT#' => $minOffer['ITEM_MEASURE']['TITLE']
                                        )
                                    );
                                }
                                else
                                {
                                    echo $price['PRINT_RATIO_PRICE'];
                                }
                            }
                            ?>
						</span>
    </div>
</div>