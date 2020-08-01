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
<section class="section block-card-section bg-vanilla bg-image-section-one reveal">
    <?foreach($arResult["ITEMS"] as $arItem):?>
	    <?
           $img_item = CFile::GetPath($arItem["PROPERTIES"]["TEXT_PICTURE"]["VALUE"]);
        ?>
			<div class="q-container container-inner">
                <div class="title_about"><h2><?=$arItem["NAME"]?></h2></div>
				<div class="columns block-card-shadow ">
					<div class="column is-7 block-picture">
						<figure class="picture">
							<div class="box wide vs-div" data-speed="-0.2"></div>
							<div class="rev_clip">
								<img src="<?echo $img_item;?>" alt="" class="vs-div clip_image" data-speed="-0.15">
								<div image-binding="img_background"></div>
							</div>
						</figure>
					</div>
					<div class="column is-5 block-entry">
						<div class="inner">
							<p class="rev_item" editor-binding="description_one" [editorToolBarButton]="['bold','italic']"><?= $arItem["PROPERTIES"]["TEXT_CONTENT"]["VALUE"]["TEXT"] ?></p>
							<div class="rev_item">
								<a link-binding="link" href="<?= $arItem["PROPERTIES"]["TEXT_LINK"]["VALUE"]?>"class="btn"><?= $arItem["PROPERTIES"]["TEXT_LINK"]["DESCRIPTION"]?></a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<?endforeach;?>
</section>
