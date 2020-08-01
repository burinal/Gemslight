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

 ?>
<div class="banner_block">
<section id="q_slide" autoplay animate mousefollow parallax opacity=".3" class="q_slide">
    <div class="q_slide-inner">
        <div class="slides" >
            <?foreach($arResult['ITEMS'] as $arItem){?>
                <? for($i = 0; $i< count($arItem['PROPERTIES']['SLIDER_PHOTO']['VALUE']); $i++){
                    if($i == 0){
                    $class_item = 'q_current'; $id_item='id="page-top-banner"';
                    }
                    else{
                    $class_item = ''; $id_item='';
                    }?>
                    <div class="slide <?php echo $class_item; ?>" <?php echo $id_item; ?> >
                        <div class="slide-content">
                            <div class="caption">
                                <h1 class="q_splitText" editor-binding="slider.title" index-order="i"><?php echo $arItem['PROPERTIES']['SLIDER_TITLE']['VALUE'][$i];?></h1>
                                <div class="sep"></div>
                                <p editor-binding="slider.description"><?php echo $arItem['PROPERTIES']['SLIDER_TEXT']['VALUE'][$i];?></p>
                            </div>
                        </div>
                        <div class="image-container">
                            <div class="image-wrapper">
                                <?php $img_item = CFile::GetPath($arItem["PROPERTIES"]["SLIDER_PHOTO"]["VALUE"][$i]); ?>
                                <img src="<?echo $img_item;?>" alt="" class="image" />
                            </div>
                        </div>
                        <div class="grad-btm"></div>
                    </div>
                <? }
            } ?>
        </div>
        <div class="pagination">
            <div class="item">
            </div>
        </div>
        <div class="arrows">
        </div>
    </div>
</section>
</div>




