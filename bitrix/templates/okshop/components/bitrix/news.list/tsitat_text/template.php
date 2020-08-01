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
<section class="tsit_block_text section block-wedding-card bg-vanilla bg-image-section-three reveal q_active">
    <?foreach($arResult["ITEMS"] as $arItem):?>
    <? $title_on = $arItem["PROPERTIES"]["TEXT_TITLE_ON"]["VALUE"]; ?>
    <div class="q-container container-inner">
        <div class="columns card-wrapper type-1 module-container">
            <div class="column block-entry">
                <div class="inner">
                    <?php if($title_on == 'yes'){ ?>
                        <h2 class="title">
                        <span class="q_split">
                                <span class="q_split_wrap rev_item" editor-binding="title_one" [editortoolbarbutton]="['bold','italic']"><?=$arItem["NAME"]?></span>
                            </span>
                        </h2>
                    <?php }?>
                    <p class="rev_item" editor-binding="description" [editortoolbarbutton]="['bold','italic']">
                        <?= $arItem["PROPERTIES"]["TEXT_CONTENT"]["VALUE"]["TEXT"] ?>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <?endforeach;?>
</section>