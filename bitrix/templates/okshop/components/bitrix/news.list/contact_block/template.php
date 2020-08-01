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
$this->setFrameMode(true);
?>
<?foreach($arResult["ITEMS"] as $arItem):?>
<div class="block-section-maps bg-image-section-one bg-vanilla">
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="q-container-contacts container-inner">
                <div class="inner">
                        <span class="title">
                            <span class="split-line">
                                <?echo $arItem["NAME"]?>
                            </span>
                        </span>
                        <div class="info_blocks fadeInUp" data-wow-delay=".7s" data-wow-duration="2s" editor-binding="address">
                            <? echo $arItem['DISPLAY_PROPERTIES']['TEXT_CONTENT']['~VALUE']['TEXT'];?>
                        </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?endforeach;?>