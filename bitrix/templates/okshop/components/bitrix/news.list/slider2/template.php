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

$kolvo = 0;
 ?>
<section id="q_slide" autoplay animate mousefollow parallax opacity=".3" class="q_slide">
    <div class="q_slide-inner">
        <div class="slides sl_slide2" >
            <?foreach($arResult['ITEMS'] as $arItem){?>
                <? for($i = 0; $i< count($arItem['PROPERTIES']['SLIDER_PHOTO']['VALUE']); $i++){
                    $kolvo++;
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
                        <div class="info_block">
                            <?=htmlspecialcharsBack($arItem['PROPERTIES']['SLIDER_INFO']['VALUE'][$i]['TEXT'])?>
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
        <div class="pagination pag_slide2">
            <?php for($k=0; $k<$kolvo; $k++){?>
                <div class="item">
                    <span class="icon"><?php echo $k+1; ?></span>
                </div>
            <?php } ?>
        </div>
        <div class="arrows sl_slide2">
            <a  class="arrow prev q_magnet" friction=".3">
                    <span class="svg svg-arrow-left">
                        <svg version="1.1" id="svg4-Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                             y="0px" width="10px" height="26px" viewBox="0 0 14 26" enable-background="new 0 0 14 26" xml:space="preserve">
                            <path d="M13,26c-0.256,0-0.512-0.098-0.707-0.293l-12-12c-0.391-0.391-0.391-1.023,0-1.414l12-12c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L2.414,13l11.293,11.293c0.391,0.391,0.391,1.023,0,1.414C13.512,25.902,13.256,26,13,26z"
                            /> </svg>
                        <span class="alt sr-only"></span>
                    </span>
            </a>
            <a   class="arrow next q_magnet" friction=".3">
                    <span class="svg svg-arrow-right">
                        <svg version="1.1" id="svg5-Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                             y="0px" width="10px" height="26px" viewBox="0 0 14 26" enable-background="new 0 0 14 26" xml:space="preserve">
                            <path d="M1,0c0.256,0,0.512,0.098,0.707,0.293l12,12c0.391,0.391,0.391,1.023,0,1.414l-12,12c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414L11.586,13L0.293,1.707c-0.391-0.391-0.391-1.023,0-1.414C0.488,0.098,0.744,0,1,0z"/> </svg>
                        <span class="alt sr-only"></span>
                    </span>
            </a>
        </div>
    </div>
</section>




