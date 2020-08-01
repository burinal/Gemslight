<?php

define("STOP_STATISTICS", true);
define("NO_KEEP_STATISTIC", true);
define("NOT_NEED_PROFILES", true);
define("NOT_NEED_BACKUPS",true);
define('LOCALE_MAX_CHECKED_CHECKBOX',2);
if(isset($_REQUEST["LANGUAGE_ID"])){
	define("LANGUAGE_ID",$_REQUEST["LANGUAGE_ID"]);
}

require_once $_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php';

CLocale::includeLocaleLangFiles();


include($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/include/array_aliases_for_translate.php');

$arSite = CSite::GetById(SITE_ID)->Fetch();
if (strtoupper($arSite['CHARSET']) == "CP-1251") $arSite['CHARSET'] = "cp1251";
CModule::IncludeModule('iblock');
$component_name = trim($_REQUEST["comp"]);
$template_name = trim($_REQUEST["tpl"]);
$text = trim($_REQUEST["text"]);
if (strtoupper($arSite['CHARSET']) != 'UTF8' && strtoupper($arSite['CHARSET']) != 'UTF-8'){
	$text = iconv("utf-8", $arSite['CHARSET'], $text);
}
if (strtoupper($arSite['CHARSET']) != 'UTF8' && strtoupper($arSite['CHARSET']) != 'UTF-8'){
	$_REQUEST['oldFindedText'] = iconv("utf-8", $arSite['CHARSET'], $_REQUEST['oldFindedText']);
}

$action = trim($_REQUEST["action"]);
$files = $_REQUEST["files"];
$decodedInlcudeArea = json_decode($_REQUEST["includeAreas"]);
$filesAreas = isset($_REQUEST["includeAreas"]) ? $decodedInlcudeArea[0] : false;
$fileFromRequest = $_REQUEST["files"];
$artext = $_REQUEST["artext"];
$arOffset = $_REQUEST["arOffset"];
$tag_name = trim($_REQUEST["tag_name"]) == '' ? trim($_REQUEST["tag"]): trim($_REQUEST["tag_name"]) ;
$new_tag_name = trim($_REQUEST['new_tag_name']);
$objType = trim($_REQUEST['objType']);
$objTextType = trim($_REQUEST['objTextType']);
$objSelector = trim($_REQUEST['objSelector']);
$siteTemplate = trim($_REQUEST['siteTemplate']);
if (is_array($files)){
	$k = count($files);
	for ($i=0;$i<$k;$i++){
		if (trim($files[$i]))
			$files[$i] = trim($files[$i]);
	}
}else{
	$files = false;
}

foreach ($artext as $number => $arText){
	foreach($arText as $key => $text){
		if (strtoupper($arSite['CHARSET']) != 'UTF8' && strtoupper($arSite['CHARSET']) != 'UTF-8'){
			$savedText = $text;
			$text = iconv("utf-8", $arSite['CHARSET'], $text);
			if($text == ""){
				$text = GetMessage("LC_CP1251_NOT_SUPPORT_THIS_LANG");
			}
		}
		$artext[$number][$key] = trim($text);
	}
}

CModule::IncludeModule('accorsys.localization');

function localeCropLatin($text){
	return preg_replace("'[^A-z0-9\_]'",'_',$text);
}

if ( !check_bitrix_sessid() || !CLocale::userHasAccess()) {
	echo(json_encode(Array("MESSAGE" => "redirect")));
	exit();
}

switch ($action){
	case "search":
		$obj = new CLocale;
		if ($tag_name){
			$rs = $obj->findTags(Array("%NAME"=>$tag_name));
		}elseif ($new_tag_name){
			$rs = $obj->findTags(Array("%NAME"=>$new_tag_name));
		}elseif ($artext){
			foreach ($artext as $text){
				$rs = $obj->findTags(Array("%PROPERTY_text"=>$text));
				if ($rs->SelectedRowsCount()) break;
			}
		}

		if($rs){
			$arResult["items"] = Array();
			while ($ar = $rs->Fetch()){
				$arResult["items"][] = Array(
					"NAME"=>$ar["NAME"],
					"TEXT"=>$ar["PROPERTY_TEXT_VALUE"]
				);
			}
		}
		break;
	case "find":
		$arLocaleFound = CLocale::FindLocaleText(
			array(
				'filesAreas' => $filesAreas,
				'text' => $text,
				'component_name' => $component_name,
				'template_name' => $template_name,
				'siteTemplate' => $siteTemplate,
			)
		);
		if($_REQUEST['htmlTag'] == 'a' && empty($found) && trim(strip_tags($text)) != ""){
			$text = strip_tags($text);
			$arResult['CHANGED'] = $text;
			$arLocaleFound = CLocale::FindLocaleText(
				array(
					'filesAreas' => $filesAreas,
					'text' => $text,
					'component_name' => $component_name,
					'template_name' => $template_name,
					'siteTemplate' => $siteTemplate,
				)
			);
		}

		$newTagDefaultName = $arLocaleFound['newTagDefaultName'];
		$found = $arLocaleFound['found'];
		switch ($objType){
			case "a":
				$objType = 'link';
				break;
		}
		if ($objSelector){
			$objType .= '_'.localeCropLatin($objSelector);
		}
		$newTagDefaultName .= '_'.strtoupper($objType."_".$objTextType);
		$hideTagInput = $_REQUEST['hideTagInput']=='Y';

		$newTagDefaultName = str_replace('__', '_', $newTagDefaultName);
		$str_input = "";
		if (is_array($found) && !empty($found)){
			$text_find = Array();
			$mess = '';
			if (count($found) > LOCALE_MAX_CHECKED_CHECKBOX){
				$checked = "";
			}else{
				$checked = 'checked="checked" ';
			}
			foreach ($found as $k=>$found_el){
				$file_ext = array_pop(explode(".",$found_el["FILE"]));
				$text_find[] = $found_el["FILE"].$found_el["POS"];
				$mess .= '<div class="find-text-in-file">' .
					"<input type='hidden' name='files[" . $k . "]' value='".$found_el["FILE"]."' />" .
					'<input type="checkbox" '.$checked.'name="arOffset[' . $k. ']" value="' . $found_el['POS'] . '" />' .
					'<label style="background: url(/bitrix/images/accorsys.localization/icons/file_'.$file_ext.'.png) 0 3px no-repeat; padding-left: 20px;">' .
					'<span class="cropped-text" style="color:#2675d7 !important">'.
					'<span class="file_found"> ' .
					$found_el["FILE"] .
					'</span>:<span style="color:#2675d7 !important">'.
					$found_el['POS'].
					'</span><br />' .
					$found_el['CROP_TEXT'].
					'<span class="file_found"></span>' .
					'</span>'.
					'</label>' .
					'</div>';
			}
		}else{
			$arAllText = Array();
			$text = explode(' ', $text);
			foreach ($text as $k=>$v){
				if (strlen($v) > 40){
					$arAllText[] = wordwrap($v, 40, " ", 1);
				}else{
					$arAllText[] = $v;
				}
			}
			$text =  implode(' ',$arAllText);

			$arProducts = CLocale::getAccorsysProductsXML();
			$liveEditor = $arProducts['zhivoy_redaktor']['RU'];
			$liveEditor['subvalues'] = array_shift($liveEditor['items']);
			$notFoundMessText = '
              <div class="message">
                 '.GetMessage('LC_SELECTED_TEXT_NOT_FOUND_IN_FILES').'
              </div>
              <div class="tips">
                 '.GetMessage('LC_LIVE_EDITOR_RECOMMENDED').'
              </div>
              <div class="advertis">
                 <div class="advertis-product">
                    <div class="advertis-product-border">
                      <div class="advertis-product-image">
                        <a target="_blank" href="'.$liveEditor['url'].'">
                         <img src="'.$liveEditor['img'].'">
                        </a>
                      </div>
                      <div class="advertis-product-descr">
                        <div class="advertis-product-descr-name"><a style="text-decoration:none;" target="_blank" href="'.$liveEditor['url'].'">'.GetMessage('LC_LIVE_EDITOR').'</a></div>
                        <div class="descr-group">
                          <span class="advertis-product-descr-price">'.$liveEditor['subvalues']['price_max'].'</span>
                          <a target="_blank" href="'.$liveEditor['url'].'" class="advertis-product-descr-buy">'.GetMessage('LC_BUY_NOW').'</a>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            ';
			$mess = (str_replace(
				Array('#TEXT#', '#COMPONENT#'),
				Array((substr(htmlspecialchars($text, NULL,''),0,180).(strlen($text)>180?"...":'')), htmlspecialchars($to_find,NULL,'')),
				$notFoundMessText
			));
			$arResult['FOUND'] = 'NOT_FOUND';
		}

		$arResult = Array(
			"CHANGED"=> isset($arResult['CHANGED']) ? $arResult['CHANGED']:'accorsys_not_changed',
			"TEXT"=>$text,
			"MESSAGE"=>$mess,
			"FOUND"=>$arResult['FOUND'] == "NOT_FOUND" ? $arResult['FOUND']:$found
		);

		if (!empty($found)){
			//$text = str_replace("'","\\\'",$text);
			$arLangs = CLocale::GetSiteLangs();

			$new_tag_elem = new CLocaleElement();

			$arLangsText = Array();
			foreach($new_tag_elem->langs as $lang){
				$arLangsText[$lang] = $text;
			}

			$arLangInputCurrent = $new_tag_elem->GetLangInputs(LANGUAGE_ID,false,$arLangsText);
			$arLangsInput = $new_tag_elem->GetLangInputs(false,true,$arLangsText);

			$arLangsShort = Array();
			foreach ($arLangs as $key=>$val){
				if ($val["LID"] != LANGUAGE_ID){
					$arLangsShort[] = '<a href="#" title="'.$val['NAME'].'"  class="lang-trigger" rel="'.$val["LID"].'"><span class="lang-trigger-flag lang-trigger-flag-'.strtoupper($val["LID"]).'"></span><span class="lang-trigger-val">'.$val["LID"].'</span></a>';
				}
			}

			$arLangsShort = implode('<!--<span>, </span>-->', $arLangsShort); // ???? ?????????? ????? ?? ??????? ?? ?????

			$hideTagAttr = $hideTagInput?' style="display:none;"':'';
			$tagInputName = $hideTagInput?'':'tag_name';

			$lang_id = LANGUAGE_ID;
			$tag_mess = GetMessage('LC_MESSAGE_ID');
			$help_tag_mess = '<a target="_blank" class="adm-input-help-icon-locale" href="javascript::void(0)" title="'.GetMessage("LC_MESSAGE_ID_TITLE").'"></a>';
			$ok_mess = GetMessage('LC_SAVE');
			$found_mess = GetMessage('LC_FOUND_IN_FILES_NEW_PHRASE');
			$help_found_mess = '<a target="_blank" class="adm-input-help-icon-locale" href="javascript::void(0)" title="'.GetMessage("LC_FOUND_IN_FILES_NEW_PHRASE_TITLE").'"></a>';
			$cancel_mess = GetMessage('LC_CANCEL');
			$newTagDefaultName;
			if(trim($arLangsShort) != ""){
				$arLangsShort = '<p class=""><span class="add_others_lang"></span>'.$arLangsShort.'</p>';
			}else{
				$arLangsShort = '<p class="">'.GetMessage('LC_ADD_SITE_LANGUAGES').'</p>';
			}
			$disabledSave = $checked == ""?'disabled="disable"':'';

			$tagInputArea = $_REQUEST['actionType'] == 'changeText' ?
				''
				:
				"<div class='search-popup-block-wrapper padding-left-26'".$hideTagAttr.">
                    <input class='input-select' type='text' name='".$tagInputName."' value='".$newTagDefaultName."' />
                    <ul class='selectblock' style='display: none;'>
                    </ul>
                </div>
                <div class='separator'> </div>";

			if($_REQUEST['actionType'] == 'changeText'){
				$height = "55px";
				$inputSize = strlen($text);
				if($inputSize > 70 && $inputSize <= 200){
					$height = "140px";
				}elseif($inputSize > 200){
					$height = "200px";
				}
				$found_mess = GetMessage('LC_FOUND_IN_FILES_TEXT_EDIT');
				$help_found_mess = '<a class="adm-input-help-icon-locale" href="javascript::void(0)" title="'.GetMessage('LC_FOUND_IN_FILES_TEXT_EDIT_TITLE').'"></a>';
				$arLangInputCurrent = '
                <div class="locale-block block-'.LANGUAGE_ID.'">
                    <div class="locale-select">
                        <textarea name="artext[0]['.LANGUAGE_ID.']" data-lang="'.LANGUAGE_ID.'" data-real-lang="'.LANGUAGE_ID.'" style="height:'.$height.';width: calc(100% - 15px) !important;" class="js-clearOrNotTextareaLang" data-lang-count-file="0">'.$text.'</textarea>
                    </div>
                </div>
                <div class="spacer"><!-- --></div>
                ';
				$arLangsShort = '';
				$arLangsInput = '';

				$hideTagAttr = true;
				$tag_mess = GetMessage('LC_SELECTED_TEXT_EDIT');
				$help_tag_mess = '';
			}

			$arResult["FORM"] = <<<FORM1
            <form name='new_locale_tag'>
                <span class="name-bold padding-left-26"$hideTagAttr>
                    $tag_mess
                    $help_tag_mess
                </span>
                $tagInputArea
                $arLangInputCurrent
                $arLangsShort
                $arLangsInput
                <div class="separator"> </div>
                <p class="padding-left-26">
                    $found_mess
                    $help_found_mess
                </p>
                <div class="search-popup-block-results">
                    $mess
                </div>
                <div class="adm-workarea" style="text-align:center">
                    <input $disabledSave class="adm-btn-save" type="button" value="$ok_mess" name='submit' />&nbsp;
                    <input class="adm-btn-cancel" type="button" value="$cancel_mess" name='cancel' />
                </div>
            </form>
            <span class="resize"></span>
FORM1;
			//sleep(80);
		}

		break;
	case "addTitle":
		if (!empty($files) && !empty($artext)){
			foreach($files as $key => $file){
				$attribute = 'title';
				$new_tag_elem = new CLocaleElement();
				$new_tag_elem->SetTagName($tag_name);
				$new_tag_elem->_path_to_file = strpos($file,$_SERVER['DOCUMENT_ROOT']) !== false ? $file : $_SERVER["DOCUMENT_ROOT"].$file;

				foreach ($new_tag_elem->langs as $lang){
					$text = $new_tag_elem->GetTextForLid($lang);

					if(trim($artext[$key][$lang]) == ""){
						$arCheckTitle = CLocaleElement::checkTitle($text);
						$newLText = $arCheckTitle['text'];
					}elseif (strpos($text,'class="locale-title-tag"')!==false){
						$newLText = preg_replace("/".$attribute."=\".*?\" data-mark=\"end-of-locale-title-tag\"/isU",$attribute.'="'.$artext[$key][$lang].'" data-mark="end-of-locale-title-tag"',$text);
					}else{
						$newLText = '<loc class="locale-title-tag" '.$attribute.'="'.$artext[$key][$lang].'" data-mark="end-of-locale-title-tag">'.$text.'</loc>';
					}
					if ($newLText){
						$artext[$key][$lang] = $newLText;
						if ($artext[$key][$lang] && $artext[$key][$lang]!=$text){
							$new_tag_elem->setTag($artext[$key][$lang],$lang,$tag_name);
						}
					}
				}
			}

			$arResult = Array(
				"MESSAGE"=>($new_tag_elem->GetMessage()?$new_tag_elem->GetMessage():"OK")
			);
		}
		break;
	case "newTag":

		if (CLocale::userHasAccess() != 'A') exit;
		$message = "";
		$arLangs = CLocale::GetSiteLangs();

		$arExtLang = Array();

		foreach ($arLangs as $key=>$val){
			if ($artext[0][$val['LID']]){
				$arExtLang[$val['LID']] = trim($artext[0][$val['LID']]);
			}
		}

		if ($files && ($tag_name || $text)){

			$new_tag_elem = new CLocaleElement($text);

			$new_tag_elem->SetTagName($tag_name);

			$new_tag_elem->SaveToFiles($files,$arOffset,$arExtLang);

			$arResult = Array(
				"TEXT"=>$new_tag_elem->GetText(),
				"MESSAGE"=>$new_tag_elem->GetMessage(),
				"ERROR"=>$new_tag_elem->GetError()
			);
		}

		break;
	case "saveTag":
		if (!empty($files) && !empty($artext)){
			foreach($files as $key => $file){
				$isSystem = $_REQUEST['is_system'] == "Y" ? true : false;
				$new_tag_elem = new CLocaleElement("",false,false,$isSystem);
				$new_tag_elem->SetTagName($tag_name);
				$new_tag_elem->_path_to_file = $file;

				foreach($new_tag_elem->langs as $lang){
					$text = $new_tag_elem->GetTextForLid($lang);
					if(trim($artext[$key][$lang])!=trim($text) || trim($new_tag_name) != "" && $tag_name != $new_tag_name) {
						$new_tag_elem->setTag($artext[$key][$lang],$lang,$new_tag_name);
					}
				}
			}
			$arResult = Array(
				"MESSAGE"=>'OK'
			);
		}
		break;
	case "deleteHint":
		if(trim($_REQUEST["tag"] != "")){
			$isSystem = $_REQUEST['is_system'] == "Y" ? true : false;
			$new_tag_elem = new CLocaleElement("",false,false,$isSystem);
			$new_tag_elem->SetTagName($tag_name);
			$new_tag_elem->_path_to_file = $_REQUEST['file'] ? $_REQUEST['file']:$_REQUEST['files'][0];

			$locale_engine = new CLocale();

			$arLangs = $locale_engine->GetSiteLangs();

			$arLangs = CLocale::GetSiteLangs();
			$arLangsShort = Array();
			$arFilesContentsTag = array();
			foreach ($arLangs as $key=>$val){
				if($val["LID"] == $_REQUEST["LANGUAGE_ID"] && $_REQUEST['ORIGINAL_TEXT'] != 'EMPTY_VALUE' && trim($new_tag_elem->GetTextForLid($val["LID"])) == ''){

					$new_tag_elem->_path_to_file = str_replace('\\','/',$new_tag_elem->_path_to_file);
					$new_tag_elem->_path_to_file = strpos($new_tag_elem->_path_to_file,$_SERVER["DOCUMENT_ROOT"]) !== false ? $new_tag_elem->_path_to_file:$_SERVER["DOCUMENT_ROOT"].$new_tag_elem->_path_to_file;

					$needMoreTabsForFiles = '';

					foreach($arAllTemplateFiles as $lang => $files){
						foreach($files as $file){
							$trueFile = str_replace('/lang/'.$lang,'/lang/'.$_REQUEST['LANGUAGE_ID'],$file);
							$arFilesForTryFind[serialize($trueFile)] = $trueFile;
						}
					}
					foreach($arFilesForTryFind as $file){
						if(is_file($file)){
							$findedFileContent = file_get_contents($file);
							$matches = array();
							preg_match('/\$MESS[\s]{0,}\[[\s]{0,}[\'|\"]{1}'.$tag_name.'[\'|\"]{1}\][\s]{0,}\=[\s]{0,}[\'|\"]{1}(.*)[\'|\"]{1}[\s]{0,}\;/isU',$findedFileContent,$matches);
							if(count($matches)> 0){
								if($curLangText == ''){
									$curLangText = $matches[1];
								}elseif($curLangText != $matches[1]){
									$needMoreTabsForFiles = true;
								}
								$arFilesContentsTag[] = str_replace('/lang/'.$_REQUEST['LANGUAGE_ID'],'#LANG_TAG_REPLACE#',$file);
							}
						}
					}
					$str_input = '';
					break;
				}
			}
			if(!empty($arFilesContentsTag)){
				foreach($arFilesContentsTag as  $tagFile){
					$new_tag_elem->_path_to_file = $tagFile;
					foreach($new_tag_elem->langs as $lang){
						$text = $new_tag_elem->GetTextForLid($lang);
						if(trim($text) == "")
							continue;
						$matches = array();
						$text = preg_replace("/\<loc class=\"locale-title-tag\".*data-mark=\"end-of-locale-title-tag\"\>/isU",'',$text);
						$text = rtrim(trim($text),'</loc>');
						$new_tag_elem->setTag($text,$lang,$new_tag_name);
					}
				}
			}else{
				foreach($new_tag_elem->langs as $lang){
					$text = $new_tag_elem->GetTextForLid($lang);
					if(trim($text) == "")
						continue;
					$matches = array();
					$text = preg_replace("/\<loc class=\"locale-title-tag\".*data-mark=\"end-of-locale-title-tag\"\>/isU",'',$text);
					$text = rtrim(trim($text),'</loc>');
					$new_tag_elem->setTag($text,$lang,$new_tag_name);
				}
			}
			$arResult = Array(
				"MESSAGE"=>($new_tag_elem->GetMessage()?$new_tag_elem->GetMessage():"OK")
			);
		}
		break;
	case "deleteTag":
		if (CLocale::userHasAccess() != 'A') exit;
		$file = CLocale::getRealFile(trim($_REQUEST['file']));
		$tag = trim($_REQUEST['tag']);
		$new_tag_elem = new CLocaleElement();

		$new_tag_elem->SetTagName($tag);
		$onlyLangFile = $_REQUEST['onlyLangFile']?true:false;
		if (file_exists($file)){
			$new_tag_elem->_path_to_file = $file;

			$locale_engine = new CLocale();

			$arLangs = $locale_engine->GetSiteLangs();

			$arLangs = CLocale::GetSiteLangs();
			$arLangsShort = Array();

			$needFindAnotherFiles = false;
			foreach ($arLangs as $key=>$val){
				if($val["LID"] == $_REQUEST["LANGUAGE_ID"] && $text != 'EMPTY_VALUE' && trim($new_tag_elem->GetTextForLid($val["LID"])) == ''){
					$needFindAnotherFiles = true;
				}
			}

			$count = $new_tag_elem->deleteTag($onlyLangFile,$needFindAnotherFiles,$text);
			$arResult = Array(
				"MESSAGE"=>$count
			);
		}
		break;
	case "getTagValues":
		if (!empty($files) && $tag_name){
			$needFindAnotherFiles = false;
			$str_input = "";
			$new_tag_elem = new CLocaleElement();
			$new_tag_elem->SetTagName($tag_name);
			$new_tag_elem->isNeedCheckDisabledInputs = true;
			$new_tag_elem->_path_to_file = $files[0];

			$str_input .= $new_tag_elem->GetLangInputs();

			$locale_engine = new CLocale();

			$arLangs = $locale_engine->GetSiteLangs();

			$arLangs = CLocale::GetSiteLangs();
			$arLangsShort = Array();

			foreach ($arLangs as $key=>$val){
				$curLangText = $new_tag_elem->GetTextForLid($val["LID"]);
				$arCheckTitle = array();
				$arCheckTitle = CLocaleElement::checkTitle($curLangText);
				if($arCheckTitle['isNeedSaveTitle']){
					$curLangText = $arCheckTitle['text'];
				}
				if($val["LID"] == $_REQUEST["LANGUAGE_ID"] && $_REQUEST['ORIGINAL_TEXT'] != 'EMPTY_VALUE' && trim($new_tag_elem->GetTextForLid($val["LID"])) == ''){
					$needFindAnotherFiles = true;
				}
				if ($val["LID"] != LANGUAGE_ID  && trim($curLangText) == ''){
					$arLangsShort[] = '<a href="#" class="lang-trigger" title="'.$val['NAME'].'" rel="'.$val["LID"].'"><span class="lang-trigger-flag lang-trigger-flag-'.strtoupper($val["LID"]).'"></span><span class="lang-trigger-val">'.$val["LID"].'</span></a>';
				}
			}


			$arLangsShort = implode('<!--<span>, </span>-->', $arLangsShort);
			if(trim($arLangsShort) != ""){
				$arLangsShort = '<p class="add_lang_wrapp"><span class="add_others_lang"></span>'.$arLangsShort.'</p>';
			}

			if(count($arLangs) <= 1 && trim($arLangsShort) == ""){
				$strNeedMoreLangs = '<p class="add_lang_wrapp ">'.GetMessage('LC_ADD_SITE_LANGUAGES').'</p>';
			}

			foreach ($files as $key => $file){
				$str_input .= "<input type='hidden' style='width:200px;' name='files[".$key."]' value='".$file."' />";
			}
			$arResult = Array(
				"MESSAGE"=>$tag_name
			);
			$tag_mess = GetMessage('LC_MESSAGE_ID');
			$help_tag_mess = '<a target="_blank" class="adm-input-help-icon-locale" href="javascript::void(0)" title="'.GetMessage("LC_MESSAGE_ID_TITLE").'"></a>';
			$ok_mess = GetMessage('LC_SAVE');
			$cancel_mess = GetMessage('LC_CANCEL');

			if($needFindAnotherFiles){
				$files[0] = str_replace('\\','/',$files[0]);
				$files[0] = strpos($files[0],$_SERVER["DOCUMENT_ROOT"]) !== false ? $files[0]:$_SERVER["DOCUMENT_ROOT"].$files[0];

				$needMoreTabsForFiles = '';
				$arAllTemplateFiles = CLocale::getTemplateLangFiles($files[0],$tag_name);

				foreach($arAllTemplateFiles as $lang => $files){
					if(!isset($arLangs[$lang]))
						continue;
					foreach($files as $file){
						$trueFile = str_replace('/lang/'.$lang,'/lang/'.$_REQUEST['LANGUAGE_ID'],$file);
						if(is_file($file)){
							$findedFileContent = file_get_contents($file);
							$matches = array();
							preg_match('/\$MESS[\s]{0,}\[[\s]{0,}[\'|\"]{1}'.$tag_name.'[\'|\"]{1}\][\s]{0,}\=[\s]{0,}[\'|\"]{1}(.*)[\'|\"]{1}[\s]{0,}\;/isU',$findedFileContent,$matches);
							if(count($matches)> 0){
								if($curLangText == ''){
									$curLangText = $matches[1];
								}elseif($curLangText != $matches[1]){
									$needMoreTabsForFiles = true;
								}
								$arFilesContentsTag[md5($trueFile)] = str_replace('/lang/'.$_REQUEST['LANGUAGE_ID'],'#LANG_TAG_REPLACE#',$trueFile);
							}
						}
					}
				}

				$str_input = '';
				foreach($arFilesContentsTag as $fileNumber => $tagFile){
					$tagFile = str_replace('\\','/',$tagFile);
					$tagFile = strpos($tagFile,$_SERVER["DOCUMENT_ROOT"]) !== false ? $tagFile:$_SERVER["DOCUMENT_ROOT"].$tagFile;

					$new_tag_elem->_path_to_file = $tagFile;
					$arLangs = CLocale::GetSiteLangs();
					$arLangsShort = Array();

					foreach($arLangs as $key=>$val){
						if($val["LID"] == $_REQUEST["LANGUAGE_ID"] && trim($new_tag_elem->GetTextForLid($val["LID"])) == ''){
							$needFindAnotherFiles = true;
						}
						$curLangText = $new_tag_elem->GetTextForLid($val["LID"]);
						$arCheckTitle = array();
						$arCheckTitle = CLocaleElement::checkTitle($curLangText);
						if($arCheckTitle['isNeedSaveTitle']){
							$curLangText = $arCheckTitle['text'];
						}
						if (trim($curLangText) == '' && $val["LID"] != LANGUAGE_ID){
							$arLangsShort[] = '<a href="#" class="lang-trigger" title="'.$val['NAME'].'" rel="'.$val["LID"].'"><span class="lang-trigger-flag lang-trigger-flag-'.strtoupper($val["LID"]).'"></span><span class="lang-trigger-val">'.$val["LID"].'</span></a>';
						}
					}

					$arLangsShort = implode('<!--<span>, </span>-->', $arLangsShort);
					if(trim($arLangsShort) != ""){
						$arLangsShort = '<p class="add_lang_wrapp "><span class="add_others_lang"></span>'.$arLangsShort.'</p>';
					}

					$pureTagFile = str_replace('#LANG_TAG_REPLACE#','',$tagFile);
					$str_input .= '<div class="block-lang-file">';
					$str_input .= '<span class="address-file padding-left-26" style="/*display: block;width: 450px;*/">'.GetMessage('LC_PATH').': '.$pureTagFile.'</span>';
					$str_input .= '<input type="hidden" value="'.$tagFile.'" name="files['.$fileNumber.']">';
					$str_input .= $new_tag_elem->GetLangInputs(false, false, Array(), false, false, $fileNumber);
					$str_input .= $arLangsShort;
					$str_input .= '</div>';
				}
				$miltiFileseErrText = GetMessage('LC_ERROR_NO_EXACT_FILE');
				$arResult["FORM"] = <<<FORM
                <div class="error_on_top_popup error_not_find_in_default_files">$miltiFileseErrText</div>
                <form name='new_locale_tag' class='new_locale_tag_form'>
                <span class="name-bold padding-left-26">
                    $tag_mess
                    $help_tag_mess
                </span>
                <div class="search-popup-block-wrapper padding-left-26">
                    <input type="text" name="new_tag_name" class="input-select" value="$tag_name" />
                    <ul class="selectblock" style="display: none;">
                    </ul>
                </div><input type='hidden' name='tag_name' value='$tag_name' />
                <div class="separator"></div>
                $str_input
                $strNeedMoreLangs
                <div class="adm-workarea" style="text-align:center">
                <input class="adm-btn-save" type='button' name='submit' value='$ok_mess' />&nbsp;
                <input class="adm-btn-cancel" type="button" value="$cancel_mess" name='cancel' />
                </div>
                </form>
                <span class="resize"></span>
FORM;
			}else{
				$arResult["FORM"] = <<<FORM
            <form name='new_locale_tag' class='new_locale_tag_form'>
            <span class="name-bold padding-left-26">
                $tag_mess
                $help_tag_mess
            </span>
            <div class="search-popup-block-wrapper padding-left-26">
                <input type="text" name="new_tag_name" class="input-select" value="$tag_name" />
                <ul class="selectblock" style="display: none;">
                </ul>
            </div><input type='hidden' name='tag_name' value='$tag_name' />
            <div class="separator"></div>
            $str_input
            $arLangsShort
            $strNeedMoreLangs
            <div class="adm-workarea" style="text-align:center">
            <input class="adm-btn-save" type='button' name='submit' value='$ok_mess' />&nbsp;
            <input class="adm-btn-cancel" type="button" value="$cancel_mess" name='cancel' />
            </div>
            </form>
            <span class="resize"></span>
FORM;
			}
		}
		break;
	case "addTitleForm":
		if (!empty($files) && $tag_name){
			$str_input = "";
			$new_tag_elem = new CLocaleElement();
			$new_tag_elem->SetTagName($tag_name);

			$new_tag_elem->_path_to_file = $files[0];

			$str_input .= $new_tag_elem->GetLangInputs(false,false,array(),true);

			foreach ($files as $file){
				$str_input .= "<input type='hidden' style='width:200px;' name='files[]' value='".$file."' />";
			}

			$locale_engine = new CLocale();
			$arLangs = $locale_engine->GetSiteLangs();

			$arLangs = CLocale::GetSiteLangs();
			$arLangsShort = Array();

			foreach ($arLangs as $key=>$val){
				$arCheckTitle = CLocaleElement::checkTitle($new_tag_elem->GetTextForLid($val["LID"]));
				if(trim($arCheckTitle['isNeedSaveTitle'])){
					$curText = $arCheckTitle['text'];
				}else{
					$curText = $new_tag_elem->GetTextForLid($val["LID"]);
				}
				if($val["LID"] == $_REQUEST["LANGUAGE_ID"] && $_REQUEST['ORIGINAL_TEXT'] != 'EMPTY_VALUE' && trim($curText) == ''){
					$needFindAnotherFiles = true;
				}
				if (!$arCheckTitle['isNeedTitle'] && $val["LID"] != LANGUAGE_ID && trim($arCheckTitle['textTitle']) == ''){
					$arLangsShort[] = '<a href="#" class="lang-trigger" title="'.$val['NAME'].'" rel="'.$val["LID"].'"><span class="lang-trigger-flag lang-trigger-flag-'.strtoupper($val["LID"]).'"></span><span class="lang-trigger-val">'.$val["LID"].'</span></a>';
				}
			}

			$arLangsShort = implode('<!--<span>, </span>-->', $arLangsShort);
			if(trim($arLangsShort) != ""){
				$arLangsShort = '<p class="add_lang_wrapp"><span class="add_others_lang"></span>'.$arLangsShort.'</p>';
			}

			$arResult = Array(
				"MESSAGE"=>'OK'
			);

			$tag_mess = GetMessage('LC_MESSAGE_TRANSLATIONS_HINT');
			$help_tag_mess = '<a target="_blank" class="adm-input-help-icon-locale" href="javascript::void(0)" title="'.GetMessage("LC_MESSAGE_ID_TITLE").'"></a>';
			$ok_mess = GetMessage('LC_SAVE');
			$cancel_mess = GetMessage('LC_CANCEL');

			if($needFindAnotherFiles){
				$files[0] = str_replace('\\','/',$files[0]);
				$files[0] = strpos($files[0],$_SERVER["DOCUMENT_ROOT"]) !== false ? $files[0]:$_SERVER["DOCUMENT_ROOT"].$files[0];

				$needMoreTabsForFiles = '';
				$arAllTemplateFiles = CLocale::getTemplateLangFiles($files[0],$tag_name);
				foreach($arAllTemplateFiles as $lang => $files){
					foreach($files as $file){
						$trueFile = str_replace('/lang/'.$lang,'/lang/'.$_REQUEST['LANGUAGE_ID'],$file);
						$arFilesForTryFind[serialize($trueFile)] = $trueFile;
					}
				}
				foreach($arFilesForTryFind as $file){
					if(is_file($file)){
						$findedFileContent = file_get_contents($file);
						$matches = array();
						preg_match('/\$MESS[\s]{0,}\[[\s]{0,}[\'|\"]{1}'.$tag_name.'[\'|\"]{1}\][\s]{0,}\=[\s]{0,}[\'|\"]{1}(.*)[\'|\"]{1}[\s]{0,}\;/isU',$findedFileContent,$matches);
						if(count($matches)> 0){
							if($curLangText == ''){
								$curLangText = $matches[1];
							}elseif($curLangText != $matches[1]){
								$needMoreTabsForFiles = true;
							}
							$arFilesContentsTag[] = str_replace('/lang/'.$_REQUEST['LANGUAGE_ID'],'#LANG_TAG_REPLACE#',$file);
						}
					}
				}
				$str_input = '';
				foreach($arFilesContentsTag as $fileNumber => $tagFile){
					$tagFile = str_replace('\\','/',$tagFile);
					$tagFile = strpos($tagFile,$_SERVER["DOCUMENT_ROOT"]) !== false ? $tagFile:$_SERVER["DOCUMENT_ROOT"].$tagFile;

					$new_tag_elem->_path_to_file = $tagFile;
					$arLangs = CLocale::GetSiteLangs();
					$arLangsShort = Array();

					foreach($arLangs as $key=>$val){
						$arCheckTitle = CLocaleElement::checkTitle($new_tag_elem->GetTextForLid($val["LID"]));
						if($val["LID"] == $_REQUEST["LANGUAGE_ID"] && $_REQUEST['ORIGINAL_TEXT'] != 'EMPTY_VALUE' && trim($arCheckTitle['text'])== ''){
							$needFindAnotherFiles = true;
						}
						if (!$arCheckTitle['isNeedTitle'] && $val["LID"] != LANGUAGE_ID && trim($arCheckTitle['textTitle']) == ''){
							$arLangsShort[] = '<a href="#" class="lang-trigger" title="'.$val['NAME'].'" rel="'.$val["LID"].'"><span class="lang-trigger-flag lang-trigger-flag-'.strtoupper($val["LID"]).'"></span><span class="lang-trigger-val">'.$val["LID"].'</span></a>';
						}
					}

					$arLangsShort = implode('<!--<span>, </span>-->', $arLangsShort);
					if(trim($arLangsShort) != ""){
						$arLangsShort = '<p class="add_lang_wrapp "><span class="add_others_lang"></span>'.$arLangsShort.'</p>';
					}

					$pureTagFile = str_replace('#LANG_TAG_REPLACE#','',$tagFile);
					$str_input .= '<div class="block-lang-file">';
					$str_input .= '<span class="address-file padding-left-26" style="/*display: block;width: 450px;*/">'.GetMessage('LC_PATH').': '.$pureTagFile.'</span>';
					$str_input .= '<input type="hidden" value="'.$tagFile.'" name="files['.$fileNumber.']">';
					$str_input .= $new_tag_elem->GetLangInputs(false, false, array(), true, false, $fileNumber);
					$str_input .= $arLangsShort;
					$str_input .= '</div>';
				}
				$miltiFileseErrText = GetMessage('LC_ERROR_NO_EXACT_FILE');

				$arResult["FORM"] = <<<FORM
                <div class="error_on_top_popup error_not_find_in_default_files">$miltiFileseErrText</div>
        <form name='new_locale_tag'>
        <span class="padding-left-26 name-bold">
            $tag_mess
            $help_tag_mess
        </span>
        <div style="display:none;" class="search-popup-block-wrapper">
            <input type="text" name="tag_name" class="input-select" value="$tag_name" />
            <ul class="selectblock" style="display: none;">
            </ul>
        </div>
        $str_input
        $strNeedMoreLangs
        <div class="adm-workarea" style="text-align:center">
            <input class="adm-btn-save" type='button' name='submit' value='$ok_mess' />&nbsp;
            <input class="adm-btn-cancel" type='button' value='$cancel_mess' name='cancel' />
        </div>
        </form>
        <span class="resize"></span>
FORM;
			}else{
				$arResult["FORM"] = <<<FORM
        <form name='new_locale_tag'>
        <span class="padding-left-26 name-bold">
            $tag_mess
            $help_tag_mess
        </span>
        <div style="display:none;" class="search-popup-block-wrapper">
            <input type="text" name="tag_name" class="input-select" value="$tag_name" />
            <ul class="selectblock" style="display: none;">
            </ul>
        </div>
        $str_input
        $arLangsShort
        $strNeedMoreLangs
        <div class="adm-workarea" style="text-align:center">
            <input class="adm-btn-save" type='button' name='submit' value='$ok_mess' />&nbsp;
            <input class="adm-btn-cancel" type='button' value='$cancel_mess' name='cancel' />
        </div>
        </form>
        <span class="resize"></span>
FORM;
			}
		}
		break;
	case "getEula":
		$arResult["HTML"] = file_get_contents($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/accorsys.localization/lang/".LANGUAGE_ID."/eula.html");
		break;
	case "activateTag":
	case "deactivateTag":
		$file = CLocale::getRealFile(trim($_REQUEST['file']));
		$tag = trim($_REQUEST['tag']);

		$new_tag_elem = new CLocaleElement($text);
		$new_tag_elem->SetTagName($tag);

		$new_tag_elem->_path_to_lang = $file;
		$new_tag_elem->{$action}();
		$arResult = Array(
			"MESSAGE"=>'OK'
		);
		break;
	case "getTranslateTemplate":
		$lang_win_title = GetMessage("LC_TRANSLATE_WINDOW_LANG_TITLE");
		$lang_win_text = GetMessage("LC_TRANSLATE_WINDOW_TEXT");
		$lang_win_close = GetMessage("LC_CLOSE");
		$lang_win_translatorsTitle = GetMessage("LC_TRANSLATE_WINDOW_LANG_TITLE");
		$lang_win_microsoftTranslator = GetMessage("LC_MICROSOFT_TRANSLATOR_API_SETTINGS_TITLE");
		$lang_win_yandexTranslator = GetMessage("LC_YANDEX_TRANSLATE_API_SETTINGS_TITLE");
		$lang_win_googleTranslator = GetMessage("LC_GOOGLE_TRANSLATE_API_SETTINGS_TITLE");
		$lang_win_insert = $APPLICATION->get_cookie('CONTENTEDITOR') == 'Y' ? GetMessage('LC_TRANSLATE_WINDOW_PASTE') : GetMessage('LC_TRANSLATE_WINDOW_PASTE_PREVIEW');

		$translator_name = $_REQUEST['translator_name'];
		$cur_lang = LANGUAGE_ID;
		$cur_lang_upper = strtoupper(LANGUAGE_ID);
		$locale_engine = new CLocale();
		$arLangs = $locale_engine->GetSiteLangs();
		$strLangs = '';
		foreach ($arLangs as $lang){
			$arSelectLangs[$lang['LID']] = $lang['NAME'].' ('.strtoupper($lang['LID']).')';

		}
		asort($arSelectLangs);
		foreach($arSelectLangs as $LID => $NAME){
			$strLangs .= '<option '.($cur_lang == $LID?'selected="selected" ':'').'value="'.$LID.'">'.$NAME.'</option>';
		}
		$arResult["HTML"] = <<<HTML
        <form name='new_locale_tag' class='new_locale_tag_form'>
            <span class="name-bold padding-left-26">$lang_win_translatorsTitle</span>
            <div class="search-popup-block-wrapper">
                <span class="bx-core-popup-menu-item-icon loc-searchTranslateGoogle"></span>
                <select class="translation-service">
                   <option value="loc_googleTranslate">$lang_win_googleTranslator</option>
                   <option value="loc_microsoftTranslate">$lang_win_microsoftTranslator</option>
                   <option value="loc_translate_ya">$lang_win_yandexTranslator</option>
                </select>
            </div>
            <span class="name-bold padding-left-26">$lang_win_title</span>
            <div class="search-popup-block-wrapper">
                <div class="select-wrap">
                    <span style="float:left;" class="flag-container-default-lang">
                       <span class="ico-flag-$cur_lang_upper" style="margin-top:9px;margin-right:0px;"></span>
                    </span>
                    <select class="change-langs">
                        $strLangs
                    </select>
                </div>
                <div style="clear:both;"></div>
            </div>
            <input type='hidden' name='lang' value='$cur_lang' />
            <span class="name-bold padding-left-26">$lang_win_text</span>
            <div class="locale-block">
                <div class="locale-select">
                    <textarea name="translation" id="translation" style=" height: 140px; border-top-right-radius: 5px; width: calc(100% - 47px) !important; margin-left: 24px;"> $text</textarea>
                    <div class="clr" ></div>
                </div>
            </div>
            <div class="adm-workarea" style="text-align:center;">
                <input class="adm-btn-cancel" type="button" value="$lang_win_close" name='cancel' />
                <input class="adm-btn-save js-replace-by-translated" type="button" value="$lang_win_insert" name='copy' />
            </div>
        </form>
        <span class="resize"></span>
HTML;

		break;
}

if(defined('LANG_CHARSET') && strtoupper(LANG_CHARSET) != "UTF8" && strtoupper(LANG_CHARSET) != "UTF-8"){
	foreach($arResult as $key => $value){
		$arResult[$key] = iconv("cp1251","UTF-8",$arResult[$key]);
	}
	echo json_encode($arResult);
}else{
	echo(LOC_json_safe_encode($arResult));
}

