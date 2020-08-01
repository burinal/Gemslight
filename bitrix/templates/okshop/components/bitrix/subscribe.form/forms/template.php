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
<div class="columns_item block-reservation">
<div class="pretext_block">
    <p><?=GetMessage("pretext")?></p>
</div>
<div class="subscribe-form"  id="subscribe-form">
<?
$frame = $this->createFrame("subscribe-form", false)->begin();
?>
	<div action="<?=$arResult["FORM_ACTION"]?>">
        <div class="subscribe_pole">
            <?foreach($arResult["RUBRICS"] as $itemID => $itemValue):?>
            <label for="sf_RUB_ID_<?=$itemValue["ID"]?>">
			    <input type="checkbox" name="sf_RUB_ID[]" id="sf_RUB_ID_<?=$itemValue["ID"]?>" value="<?=$itemValue["ID"]?>"<?if($itemValue["CHECKED"]) echo " checked"?> /> <?=$itemValue["NAME"]?>
		    </label><br />
            <?endforeach;?>
        </div>
        <div class="main_block">
            <div class="left"><input type="text" name="sf_EMAIL" size="20" value="<?=$arResult["EMAIL"]?>" title="<?=GetMessage("subscr_form_email_title")?>" placeholder="<?=GetMessage("subscr_form_email_title")?>" /></div>
            <div class="right"><input type="submit" name="OK" value="<?=GetMessage("subscr_form_button")?>" /></div>
        </div>
	</form>
<? $frame->beginStub(); ?>
	<form action="<?=$arResult["FORM_ACTION"]?>">
        <div class="subscribe_pole">
		<?foreach($arResult["RUBRICS"] as $itemID => $itemValue):?>
			<label for="sf_RUB_ID_<?=$itemValue["ID"]?>">
				<input type="checkbox" name="sf_RUB_ID[]" id="sf_RUB_ID_<?=$itemValue["ID"]?>" value="<?=$itemValue["ID"]?>" /> <?=$itemValue["NAME"]?>
			</label><br />
		<?endforeach;?>
        </div>
        <div class="main_block">
            <div class="left"><input type="text" name="sf_EMAIL" size="20" value="" title="<?=GetMessage("subscr_form_email_title")?>" placeholder="<?=GetMessage("subscr_form_email_title")?>"/></div>
            <div class="right"><input type="submit" name="OK" value="<?=GetMessage("subscr_form_button")?>" /></div>
        </div>
	</form>
<? $frame->end(); ?>
</div>
</div>
