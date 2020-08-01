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
<section class="one_block_text section block-wedding-card bg-vanilla bg-image-section-three reveal q_active">
    <?foreach($arResult["ITEMS"] as $arItem):?>
    <?
    $img_item = CFile::GetPath($arItem["PROPERTIES"]["TEXT_PICTURE"]["VALUE"]);
    $title_on = $arItem["PROPERTIES"]["TEXT_TITLE_ON"]["VALUE"];
    ?>
    <div class="q-container container-inner">
        <div class="columns card-wrapper type-1 module-container">
            <div class="column block-picture">
                <figure class="picture">
                    <div class="rev_clip" style="clip-path: inset(0px); opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
                        <img src="<?echo $img_item;?>" alt="" class="vs-div clip_image" data-speed="-0.15" style="display: block; transform: translate3d(0px, -25.04px, 0px); height: 511.5px; width: auto;">
                        <div image-binding="img_background"></div>
                    </div>
                </figure>
            </div>
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