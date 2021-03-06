<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)
{
	die();
}

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Web\Json;
use Bitrix\Sender\Internals\PrettyDate;
use Bitrix\Main\UI\Extension;

Loc::loadMessages(__FILE__);

/** @var CAllMain $APPLICATION */
/** @var array $arParams */
/** @var array $arResult */
$containerId = 'bx-sender-letter-edit';

Extension::load("ui.buttons");
Extension::load("ui.buttons.icons");
?>
<script type="text/javascript">
	BX.ready(function () {

		BX.Sender.Letter.init(<?=Json::encode(array(
			'containerId' => $containerId,
			'actionUrl' => $arResult['ACTION_URL'],
			'isFrame' => $arParams['IFRAME'] == 'Y',
			'isSaved' => $arResult['IS_SAVED'],
			'isTemplateShowed' => $arResult['SHOW_TEMPLATE_SELECTOR'],
			'letterTile' => $arResult['LETTER_TILE'],
			'prettyDateFormat' => PrettyDate::getDateFormat(),
			'mess' => array(
				'patternTitle' => Loc::getMessage('SENDER_COMP_TMPL_LETTER_PATTERN_TITLE'),
				'name' => $arResult['MESSAGE_NAME'],
			)
		))?>);
	});
</script>

<div id="<?=htmlspecialcharsbx($containerId)?>" class="bx-sender-letter-steps">

	<?
	$APPLICATION->IncludeComponent("bitrix:sender.ui.panel.title", "", array('LIST' => array(
		array('type' => 'buttons', 'list' => array(
			array('type' => 'feedback'),
			($arResult['USE_TEMPLATES'] && $arResult['CAN_CHANGE_TEMPLATE'])
			?
				array(
					'type' => 'default',
					'id' => 'SENDER_LETTER_BUTTON_CHANGE',
					'caption' => Loc::getMessage('SENDER_LETTER_EDIT_CHANGE_TEMPLATE'),
					'visible' => !$arResult['SHOW_TEMPLATE_SELECTOR']
				)
			:
				null
		)),
	)));
	?>

	<form method="post" action="<?=htmlspecialcharsbx($arResult['SUBMIT_FORM_URL'])?>" enctype="multipart/form-data">
		<?=bitrix_sessid_post()?>

		<div data-role="template-selector" class="bx-sender-letter-template-selector <?=(!$arResult['SHOW_TEMPLATE_SELECTOR'] ? 'bx-sender-letter-hide' : ' ')?>">
			<?
			if ($arResult['USE_TEMPLATES'])
			{
				$APPLICATION->IncludeComponent(
					"bitrix:sender.template.selector",
					"",
					array(
						"MESSAGE_CODE" => $arParams['MESSAGE_CODE'],
						"IS_TRIGGER" => $arParams['IS_TRIGGER'],
						"CACHE_TIME" => "60",
						"CACHE_TYPE" => "N",
					)
				);
			}
			?>
		</div>

		<div data-role="letter-editor" class="bx-sender-letter-step-2 <?=($arResult['SHOW_TEMPLATE_SELECTOR'] ? 'bx-sender-letter-hide' : 'bx-sender-letter-show')?>">
			<input type="hidden" name="MESSAGE_CODE" value="<?=htmlspecialcharsbx($arResult['MESSAGE_CODE'])?>">
			<input type="hidden" name="MESSAGE_ID" value="<?=htmlspecialcharsbx($arResult['MESSAGE_ID'])?>">

			<input data-role="template-type" type="hidden" name="TEMPLATE_TYPE" value="<?=htmlspecialcharsbx($arResult['ROW']['TEMPLATE_TYPE'])?>">
			<input data-role="template-id" type="hidden" name="TEMPLATE_ID" value="<?=htmlspecialcharsbx($arResult['ROW']['TEMPLATE_ID'])?>">

			<?
			if ($arResult['USE_TEMPLATES'] && $arResult['CAN_CHANGE_TEMPLATE']):
				/*
				$this->SetViewTarget("pagetitle", 100);
				?>
				<span id="SENDER_LETTER_BUTTON_CHANGE" class="webform-small-button webform-small-button-transparent" style="<?=($arResult['SHOW_TEMPLATE_SELECTOR'] ? 'display: none;' : '')?>">
					<?=Loc::getMessage('SENDER_LETTER_EDIT_CHANGE_TEMPLATE')?>
				</span>
				<?
				$this->EndViewTarget();
				*/
			endif;
			?>

			<div class="bx-sender-letter-field sender-letter-edit-row" style="<?=($arParams['IFRAME'] == 'Y' ? 'display: none;' : '')?>">
				<div class="bx-sender-caption sender-letter-edit-title"><?=Loc::getMessage('SENDER_LETTER_EDIT_FIELD_NAME')?>:</div>
				<div class="bx-sender-value">
					<input data-role="letter-title" type="text" name="TITLE" value="<?=htmlspecialcharsbx($arResult['ROW']['TITLE'])?>" class="bx-sender-letter-form-control bx-sender-letter-field-input">
				</div>
			</div>

			<?if ($arParams['SHOW_CAMPAIGNS']):?>
				<div class="sender-letter-edit-row">
					<?
					$APPLICATION->IncludeComponent(
						"bitrix:sender.campaign.selector",
						"",
						array(
							'PATH_TO_ADD' => $arParams['PATH_TO_CAMPAIGN_ADD'],
							'PATH_TO_EDIT' => $arParams['PATH_TO_CAMPAIGN_EDIT'],
							'ID' => $arResult['CAMPAIGN_ID'],
							'READONLY' => !empty($arResult['ROW']['ID']),
						),
						false
					);
					?>
				</div>
			<?endif;?>

			<?if ($arParams['SHOW_SEGMENTS']):?>
				<div class="sender-letter-edit-row">
					<?
					$APPLICATION->IncludeComponent(
						"bitrix:sender.segment.selector",
						"",
						array(
							'PATH_TO_ADD' => $arParams['PATH_TO_SEGMENT_ADD'],
							'PATH_TO_EDIT' => $arParams['PATH_TO_SEGMENT_EDIT'],
							'INCLUDE' => $arResult['SEGMENTS']['INCLUDE'],
							'EXCLUDE' => $arResult['SEGMENTS']['EXCLUDE'],
							'MESSAGE_CODE' => $arResult['MESSAGE_CODE'],
							'READONLY' => $arResult['SEGMENTS']['READONLY'],
							'RECIPIENT_COUNT' => $arResult['SEGMENTS']['RECIPIENT_COUNT'],
							'IS_RECIPIENT_COUNT_EXACT' => $arResult['SEGMENTS']['IS_RECIPIENT_COUNT_EXACT'],
							'DURATION_FORMATTED' => $arResult['SEGMENTS']['DURATION_FORMATTED'],
							'SHOW_COUNTERS' => $arParams['SHOW_SEGMENT_COUNTERS'],
							'MESS' => $arParams['MESS'],
						),
						false
					);
					?>
				</div>
			<?endif;?>

			<?
			$APPLICATION->IncludeComponent(
				"bitrix:sender.message.editor",
				"",
				array(
					"MESSAGE_CODE" => $arResult['MESSAGE_CODE'],
					"MESSAGE_ID" => $arResult['MESSAGE_ID'],
					"MESSAGE" => $arResult['MESSAGE'],
					"TEMPLATE_TYPE" => $arResult['ROW']['TEMPLATE_TYPE'],
					"TEMPLATE_ID" => $arResult['ROW']['TEMPLATE_ID'],
				),
				false
			);
			?>
		</div>

		<div data-role="letter-buttons" style="<?=($arResult['SHOW_TEMPLATE_SELECTOR'] ? 'display: none;' : '')?>">
			<?
			$APPLICATION->IncludeComponent(
				"bitrix:sender.ui.button.panel",
				"",
				array(
					'CHECKBOX' => ($arParams['CAN_EDIT'] && $arResult['CAN_SAVE_AS_TEMPLATE'])
						?
						[
							'NAME' =>  'save_as_template',
							'CAPTION' =>  Loc::getMessage('SENDER_LETTER_EDIT_BTN_SAVE_AS_TEMPLATE')
						]
						:
						null,
					'SAVE' => $arParams['CAN_EDIT'] ? [] : null,
					'CANCEL' => array(
						'URL' => $arParams['PATH_TO_LIST']
					),
				),
				false
			);
			?>
		</div>

	</form>
</div>



