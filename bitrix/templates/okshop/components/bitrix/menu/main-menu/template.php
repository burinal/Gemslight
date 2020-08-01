<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?php
$this->setFrameMode(true);
if (LANGUAGE_ID == "en") $lang = "en";
else if (LANGUAGE_ID == "ru")  $lang = "ru";
else if (LANGUAGE_ID == "de") $lang = "de";
else if (LANGUAGE_ID == "fr") $lang = "fr";
else $lang = "it";

?>
<?if (!empty($arResult)):?>
    <div id="menu_screen">
        <?php foreach($arResult as $arItem):?>
              <div class="screen_item" style="background-image:url('<?=$arItem['PARAMS']['IMAGE']?>')"></div>
        <?endforeach?>
    </div>
    <div class="columns">
        <div class="column">
            <ul class="main_nav">
                <? $previousLevel = 0;
                foreach($arResult as $arItem):?>
                <?if ($previousLevel && $arItem["DEPTH_LEVEL"] < $previousLevel):?>
                    <?=str_repeat("</ul></li>", ($previousLevel - $arItem["DEPTH_LEVEL"]));?>
                <?endif?>

                <?if ($arItem["IS_PARENT"]):?>
                <?if ($arItem["DEPTH_LEVEL"] == 1):?>
                <li><span class="q_split"><span class="q_split_wrap rev_item">
                    <a href="<?=$arItem["LINK"]?>" class="<?if ($arItem["SELECTED"]):?>root-item-selected<?else:?>root-item<?endif?>">
                        <?=$arItem['PARAMS'][$lang]?>
                    </a></span></span>
                    <ul class="root-item lvl-2">
                        <?else:?>
                        <li><span class="q_split"><span class="q_split_wrap rev_item">
                            <a href="<?=$arItem["LINK"]?>" class="parent<?if ($arItem["SELECTED"]):?> item-selected<?endif?>">
                                <?=$arItem['PARAMS'][$lang]?>
                            </a></span></span>
                            <ul class="lvl-3">
                                <?endif?>
                                <?else:?>
                                    <?if ($arItem["PERMISSION"] > "D"):?>
                                        <?if ($arItem["DEPTH_LEVEL"] == 1):?>
                                            <li><span class="q_split"><span class="q_split_wrap rev_item">
                                                <a href="<?=$arItem["LINK"]?>" class="<?if ($arItem["SELECTED"]):?>root-item-selected<?else:?> root-item<?endif?>"><?=$arItem['PARAMS'][$lang]?>
                                                </a></span></span>
                                            </li>
                                        <?else:?>
                                            <li><span class="q_split"><span class="q_split_wrap rev_item">
                                                <a href="<?=$arItem["LINK"]?>" <?if ($arItem["SELECTED"]):?> class="item-selected"<?endif?>>
                                                    <?=$arItem['PARAMS'][$lang]?>
                                                </a></span></span>
                                            </li>
                                        <?endif?>
                                    <?else:?>
                                        <?if ($arItem["DEPTH_LEVEL"] == 1):?>
                                            <li>
                                                <span class="q_split">
                                                    <span class="q_split_wrap rev_item">
                                                        <a href="" class="<?if ($arItem["SELECTED"]):?>root-item-selected<?else:?>root-item<?endif?>" title="<?=GetMessage("MENU_ITEM_ACCESS_DENIED")?>"><?=$arItem['PARAMS'][$lang]?>
                                                        </a>
                                                    </span>
                                                </span>
                                            </li>
                                        <?else:?>
                                            <li>
                                                <a href="" class="denied" title="<?=GetMessage("MENU_ITEM_ACCESS_DENIED")?>"><?=$arItem['PARAMS'][$lang]?>
                                                </a></li>
                                        <?endif?>

                                    <?endif?>

                                <?endif?>

                                <?$previousLevel = $arItem["DEPTH_LEVEL"];?>

                                <?endforeach?>

                                <?if ($previousLevel > 1)://close last item tags?>
                                    <?=str_repeat("</ul></li>", ($previousLevel-1) );?>
                                <?endif?>

                </ul>
                <?endif?>
        </div>
    </div>