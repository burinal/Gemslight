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
$strTitle = "";
?>
<section id="home_accommodation" class="section block-fullscreen bg-image-section-two reveal inversion">
			<div class="q-container container-inner">
				<div class="columns ">
					<div class="column is-12">
						<h1 class="section-headline">
                        <span class="q_split">
                            <span class="q_split_wrap rev_item" editor-binding="title">Catalogues</span>
                        </span>
						</h1>
						<p class="rev_item" editor-binding="description">Catalogues description - 'Stylish accommodation option at Jannata Resort &amp; Spa incorporates a choice of 16 Deluxe Suites, 2 Deluxe Family Suite and 2 Pool Villas to anticipate all of your holiday needs. All categories are the epitome of Balinese luxury with customized interiors and essential home comforts.'
						</p>
					</div>
				</div>
				<div class="columns">
					<div class="column villas-container">
						<div id="accommodations" class="accommodations column-grid-container">
						<?
	foreach($arResult["SECTIONS"] as $arSection)
	{
        if(!isset($arSection['PICTURE']))
        {
           continue;
        }
        $select = "";
		$this->AddEditAction($arSection['ID'], $arSection['EDIT_LINK'], CIBlock::GetArrayByID($arSection["IBLOCK_ID"], "SECTION_EDIT"));
		$this->AddDeleteAction($arSection['ID'], $arSection['DELETE_LINK'], CIBlock::GetArrayByID($arSection["IBLOCK_ID"], "SECTION_DELETE"), array("CONFIRM" => GetMessage('CT_BCSL_ELEMENT_DELETE_CONFIRM')));
        if ($_REQUEST['SECTION_ID']==$arSection['ID'])
        {
            $select = "active";
        }
		$img_item = CFile::GetPath($arSection["DETAIL_PICTURE"]);
		?>
							<div class="accommodation-type column-item">
									<div class="accommodation-bg" style="background-image: url(<?=$arSection['PICTURE']['SRC']?>)">
										<div class="accommodation-bg-change" data-src="<?php echo $img_item; ?>" style="background-image: url(<?php echo $img_item; ?>)"></div>
							</div>
                                <div class="category_title">
                                <a href="<?=$arSection["SECTION_PAGE_URL"]?>" class="">
                                    <h4 class="accommodation-name" ><?=$arSection["NAME"]?></h4>
                                </a>
                                </div>
							</div>
		<? } ?>
		
		
						</div>
					</div>
				</div>
			</div>
		</section>
