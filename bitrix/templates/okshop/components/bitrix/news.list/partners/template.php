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
    <?=$arResult["NAV_STRING"]?>
    <?foreach($arResult["ITEMS"] as $arItem):?>
        <div class="item">
            <div class="q-container container-inner">
            <div class="left_item">
                <img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" width="<?=$arItem["PREVIEW_PICTURE"]["WIDTH"]?>" height="<?=$arItem["PREVIEW_PICTURE"]["HEIGHT"]?>" alt="<?=$arItem["PREVIEW_PICTURE"]["ALT"]?>" title="<?=$arItem["PREVIEW_PICTURE"]["TITLE"]?>" />
            </div>
            <div class="right_item">
                <h4 class="title"><?= $arItem["NAME"]?></h4>
                <div class="info">
                    <?foreach($arItem["PROPERTIES"] as $arItemInfo):?>
                        <div class="props">
                        <div class="label"><?= $arItemInfo['NAME']?>:</div>
                        <div class="text">
                            <?php if (is_array($arItemInfo['~VALUE'])){ echo $arItemInfo['~VALUE']['TEXT'];}
                                  else if($arItemInfo['CODE'] == 'DEALER_INFO'){
                                      $arFilter = Array('IBLOCK_ID'=>LC_S1_45, 'GLOBAL_ACTIVE'=>'Y');
                                      $db_list = CIBlockSection::GetList($arFilter, true);
                                      while($ar_result = $db_list->GetNext())
                                      {
                                          if($ar_result['ID'] == $arItem["PROPERTIES"]['DEALER_INFO']['VALUE']){
                                              echo $ar_result['NAME'];
                                          }
                                      }
                                  }
                                  else{echo $arItemInfo['~VALUE'];}
                            ?>
                        </div>
                        </div>
                    <?endforeach;?>
                </div>
            </div>
            </div>
        </div>
    <?endforeach;?>




