<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);?>
<section class="rev_block_text home_block_text section block-card-section block-card-overlap bg-full-image vs-div" style="display: block; transform: translate3d(0px, 0px, 0px);">
    <?foreach($arResult["ITEMS"] as $arItem):?>
    <?
    $img_item = CFile::GetPath($arItem["PROPERTIES"]["TEXT_PICTURE"]["VALUE"]);
    $title_on = $arItem["PROPERTIES"]["TEXT_TITLE_ON"]["VALUE"];
    ?>
    <div style="background-image: url(<?echo $img_item;?>); display: block; transform: translate3d(0px, -24.36px, 0px);" alt="" class="bg-image vs-div" data-speed="-.3"></div>
    <div class="q-container container-inner">
        <div class="columns block-card">
            <div class="column is-12">
                <?php if($title_on == 'yes'){ ?>
                    <h1 class="section-headline">
                    <span class="q_split">
                        <span class="q_split_wrap rev_item" style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);"><?=$arItem["NAME"]?></span></span>
                    </h1>
                <?php }?>
                <div class="section-text">
                    <? echo $arItem['DISPLAY_PROPERTIES']['TEXT_CONTENT']['~VALUE']['TEXT'];?>
                </div>
            </div>
        </div>
    </div>
    <?endforeach;?>
</section>