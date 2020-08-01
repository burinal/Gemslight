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
<section class="right_block_text section bg-vanilla bg-image-section-one block-card-section block-card-overlap reveal q_active">
    <?foreach($arResult["ITEMS"] as $arItem):?>
    <?
    $img_item1 = CFile::GetPath($arItem["PROPERTIES"]["TEXT_PICTURE"]["VALUE"]);
    $title_on1 = $arItem["PROPERTIES"]["TEXT_TITLE_ON"]["VALUE"];
    ?>
        <div class="columns overlap-wrapper type-1">
            <div class="column block-picture wide">
                <figure class="picture" style="height: 573px;">
                    <div class="rev_clip" style="clip-path: inset(0px); opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
                        <img src="<?php echo $img_item1;?>" alt="" class="vs-div clip_image" data-speed="-0.15" style="display: block; transform: none; height: 630.3px; width: auto;">
                        <div image-binding="img_background"></div>
                    </div>
                </figure>
            </div>
            <div class="text_main_block">
                <div class="q-container container-inner">
            <div class="column block-entry bg-white vs-div" data-speed=".1" style="display: block; transform: none;">
                <div class="inner">
                    <?php if($title_on1 == 'yes'){ ?>
                        <h2 class="title">
                        <span class="q_split">
                                <span class="q_split_wrap rev_item" editor-binding="title_one" [editortoolbarbutton]="['bold','italic']"><?=$arItem["NAME"]?></span>
                            </span>
                        </h2>
                        <div class="title-line"></div>
                    <?php }?>
                    <p class="rev_item editor_text" editor-binding="description" [editortoolbarbutton]="['bold','italic']" style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
                        <?= $arItem["PROPERTIES"]["TEXT_CONTENT"]["VALUE"]["TEXT"] ?>
                    </p>
                </div>
            </div>
            </div>
            </div>
        </div>
    <?endforeach;?>
</section>