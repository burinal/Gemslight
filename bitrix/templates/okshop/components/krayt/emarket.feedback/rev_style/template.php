<?
if(!defined("B_PROLOG_INCLUDED")||B_PROLOG_INCLUDED!==true)die();
/**
 * Bitrix vars
 *
 * @var array $arParams
 * @var array $arResult
 * @var CBitrixComponentTemplate $this
 * @global CMain $APPLICATION
 * @global CUser $USER
 */
?>
<section id="contact_form" class="section block-card-section block-card-overlap bg-full-image vs-div" style="display: block; transform: translate3d(0px, 0px, 0px);">
	<div style="transform: translate3d(0px, -44.7px, 0px);" alt="" class="bg-image vs-div" data-speed="-.3"></div>
	
	<div class="q-container-small container-inner">
	    <div class="mfeedback">
		    <div class="contact_form_title"><? echo getMessage("CONTACT_FORM_TITLE");?></div>
			<div class="form_block">
			     <?if(!empty($arResult["ERROR_MESSAGE"])){
	               foreach($arResult["ERROR_MESSAGE"] as $v)
				 ShowError($v);
				 }
				 if(strlen($arResult["OK_MESSAGE"]) > 0){?><div class="mf-ok-text"><?=$arResult["OK_MESSAGE"]?></div><?}?>
				 <form action="<?=POST_FORM_ACTION_URI?>" method="POST">
				 <?=bitrix_sessid_post()?>
                     <div class="mf-name leftinput">
                         <input type="text" name="user_name" value="<?=$arResult["AUTHOR_NAME"]?>" placeholder="<?=GetMessage("MFT_NAME")?>">
                     </div>
                     <div class="mf-surname rightinput">
                         <input type="text" name="user_surname" value="<?=$arResult["AUTHOR_SURNAME"]?>" placeholder="<?=GetMessage("MF_SURNAME")?>">
                     </div>
                     <div class="mf-phone leftinput">
                         <input type="text" name="user_phone" value="<?=$arResult["AUTHOR_PHONE"]?>" placeholder="<?=GetMessage("MF_PHONE")?>">
                     </div>
                     <div class="mf-email rightinput">
                         <input type="text" name="user_email" value="<?=$arResult["AUTHOR_EMAIL"]?>" placeholder="<?=GetMessage("MFT_EMAIL")?>">
                     </div>
                     <div class="mf-message">
                         <textarea name="MESSAGE" rows="5" cols="40" PLACEHOLDER="<?=GetMessage("MFT_MESSAGE")?>"><?=$arResult["MESSAGE"]?></textarea>
                     </div>
                     <div class="mf-submit">
                         <input type="submit" name="submit" value="<?=GetMessage("MFT_SUBMIT")?>">
                     </div>
                     <?if($arParams["USE_CAPTCHA"] == "Y"):?>
                         <div class="mf-captcha">
                             <div class="mf-text"><?=GetMessage("MFT_CAPTCHA")?></div>
                             <input type="hidden" name="captcha_sid" value="<?=$arResult["capCode"]?>">
                             <img src="/bitrix/tools/captcha.php?captcha_sid=<?=$arResult["capCode"]?>" width="180" height="40" alt="CAPTCHA">
                             <div class="mf-text"><?=GetMessage("MFT_CAPTCHA_CODE")?><span class="mf-req">*</span></div>
                             <input type="text" name="captcha_word" size="30" maxlength="50" value="">
                         </div>
                     <?endif;?>
                     <input type="hidden" name="PARAMS_HASH" value="<?=$arResult["PARAMS_HASH"]?>">
                 </form>
			</div>
		</div>
	</div>
</section>