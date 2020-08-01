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
<section id="page_summary" class="section our-story-summary bg-image-section-one testi">
 
			<div class="q-container container-inner">
                <div class="title_section"><h2>Feedback</h2></div>
				<div class="columns type-1" id="">
					<div class="column" id="testiTwo" vold-flickity [listenData]="binding?.testimonials.length">
					<?foreach($arResult["ITEMS"] as $arItem):?>
						<div class="slide">
							<p><?=$arItem["PREVIEW_TEXT"]?></p>
							<div class="info">
                                <p><span class="name"><?=$arItem["NAME"]?></span></p>
                                <p><span class="city"><?= $arItem["PROPERTIES"]["REV_CITY"]["VALUE"]?></span></p>
                                <p><span class="date"><?php echo date("d F Y", strtotime($arItem["ACTIVE_FROM"]));  ?></span></p>
                            </div>
						</div>
						<?endforeach;?>
					</div>
				</div>
			</div>
		</section>