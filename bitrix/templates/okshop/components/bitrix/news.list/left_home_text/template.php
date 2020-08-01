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
<section class="left_home_text section block-card-section block-card-overlap bg-image-section-four reveal q_active">
    <div class="q-container container-inner">
        <?foreach($arResult["ITEMS"] as $arItem):?>
        <?
        $img_item = CFile::GetPath($arItem["PROPERTIES"]["TEXT_PICTURE"]["VALUE"]);
        $title_on = $arItem["PROPERTIES"]["TEXT_TITLE_ON"]["VALUE"];
        ?>
        <div class="columns overlap-wrapper type-2">
            <div class="column block-entry bg-vanilla vs-div" data-speed=".1" style="display: block; transform: translate3d(0px, 1.73px, 0px);">
                <div class="inner ">
                    <?php if($title_on == 'yes'){ ?>
                    <h2 class="title">
                        <span class="q_split">
                                <span class="q_split_wrap rev_item" editor-binding="title_two" [editortoolbarbutton]="['bold','italic']"><?=$arItem["NAME"]?></span>
                            </span>
                    </h2>
                        <div class="title-line"></div>
                    <?php }?>
                    <div class="editor_text" editor-binding="description" [editortoolbarbutton]="['bold','italic']"><?= $arItem["PROPERTIES"]["TEXT_CONTENT"]["VALUE"]["TEXT"] ?></div>

                </div>
            </div>
            <div class="column block-picture">
                <figure class="picture" style="height: 486px;">
                    <div class="rev_clip" style="clip-path: inset(0px); opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
                        <img src="<?echo $img_item;?>" alt="" class="vs-div clip_image" data-speed="-0.15" style="display: block; transform: translate3d(0px, 9.4px, 0px); height: 534.6px; width: auto;">
                        <div image-binding="img_background"></div>
                    </div>
                </figure>
            </div>
        </div>
        <?endforeach;?>
    </div>
</section>
