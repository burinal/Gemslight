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
<section class="system_rev  block-wedding-card bg-vanilla bg-image-section-three reveal q_active block-card-section block-card-overlap bg-full-image vs-div"">
    <?foreach($arResult["ITEMS"] as $arItem):?>
    <?
    $img_item = CFile::GetPath($arItem["PROPERTIES"]["TEXT_PICTURE"]["VALUE"]);
    $title_on = $arItem["PROPERTIES"]["TEXT_TITLE_ON"]["VALUE"];
    ?>
    <div style="background-image: url(<?echo $img_item;?>); display: block; transform: translate3d(0px, -24.36px, 0px);" alt="" class="bg-image vs-div" data-speed="-.3"></div>
    <div class="q-container container-inner">
        <div class="columns card-wrapper type-2">
            <div class="column block-picture">
                <figure class="picture" style="height: 489px;">
                    <div class="rev_clip" style="clip-path: inset(0px); opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
                        <img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" alt="" class="vs-div clip_image" data-speed="-0.15" style="display: block; transform: translate3d(0px, -50.52px, 0px); height: 537.9px; width: auto;">
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
                    <p class="rev_item" editor-binding="description" [editortoolbarbutton]="['bold','italic']" style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
                        <?=$arItem["PROPERTIES"]["TEXT_CONTENT"]["VALUE"]["TEXT"]?>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <?endforeach;?>
</section>