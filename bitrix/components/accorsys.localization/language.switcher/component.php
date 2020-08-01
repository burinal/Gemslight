<?php if(!defined("B_PROLOG_INCLUDED")||B_PROLOG_INCLUDED!==true)die();
if($this->StartResultCache(false, SITE_ID))
{
	$REQUEST_SCHEME = $_SERVER['HTTPS']=='on'?'https':'http';
	if(!function_exists("localization_url_write")){
		function localization_deleteGET($url, $name, $amp = true) {
			$url = str_replace("&amp;", "&", $url); // Заменяем сущности на амперсанд, если требуется
			list($url_part, $qs_part) = array_pad(explode("?", $url), 2, ""); // Разбиваем URL на 2 части: до знака ? и после
			parse_str($qs_part, $qs_vars); // Разбиваем строку с запросом на массив с параметрами и их значениями
			unset($qs_vars[$name]); // Удаляем необходимый параметр
			if (count($qs_vars) > 0) { // Если есть параметры
				$url = $url_part."?".http_build_query($qs_vars); // Собираем URL обратно
				if ($amp) $url = str_replace("&", "&amp;", $url); // Заменяем амперсанды обратно на сущности, если требуется
			}
			else $url = $url_part; // Если параметров не осталось, то просто берём всё, что идёт до знака ?
			return $url; // Возвращаем итоговый URL
		}

		function localization_url_write($url, $varname, $value) // substitute get parameter
		{
			if (is_array($varname)) {
				foreach ($varname as $i => $n) {
					$v = (is_array($value))
						? ( isset($value[$i]) ? $value[$i] : NULL )
						: $value;
					$url = localization_url_write($url, $n, $v);
				}
				return $url;
			}

			preg_match('/^([^?]+)(\?.*?)?(#.*)?$/', $url, $matches);
			$gp = (isset($matches[2])) ? $matches[2] : ''; // GET-parameters
			if (!$gp) return $url;

			$pattern = "/([?&])$varname=.*?(?=&|#|\z)/";
			if (preg_match($pattern, $gp)) {
				if($value == NULL){
					$substitution = "";
				}else{
					$substitution = ($value !== '') ? "\${1}$varname=" . preg_quote($value) : '';
				}
				$newgp = preg_replace($pattern, $substitution, $gp); // new GET-parameters
				$newgp = preg_replace('/^&/', '?', $newgp);
			}
			else {
				$s = ($gp) ? '&' : '?';
				$newgp = $gp.$s.$varname.'='.$value;
			}

			$anchor = (isset($matches[3])) ? $matches[3] : '';
			$newurl = $matches[1].$newgp.$anchor;
			return $newurl;
		}
	}

	global $APPLICATION;
	CJSCore::Init('jquery');
	$APPLICATION->AddHeadString('<link rel="stylesheet" type="text/css" href="/bitrix/js/accorsys.localization/flags.css.php">');
	$rsLang = CLanguage::GetList($by,$order);
	include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs_title.php');
	$arDefLangs = $arAccorsysLocaleLangsTitle;
	$arLangs = unserialize(COption::GetOptionString("accorsys.localization","accorsysSiteLang"));
	$arNeededLangs = array();
	$lcSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
	foreach($arLangs as $indexSiteID => $arIndexLangs){
		foreach($arIndexLangs as $lang){
			if(trim($lang) != "" && $indexSiteID == SITE_ID)
				$arNeededLangs[$lang] = $arDefLangs[$lang];
		}
	}
	asort($arNeededLangs);
	$arResult['SITES'] = array();
	foreach($arNeededLangs as $LID => $NAME)
	{
		if($LID == LANGUAGE_ID){
			$arResult['CURRENT'] = array(
				'CODE' => $LID,
				'NAME' => $NAME,
			);
			continue;
		}
		$newUrl = "";
		foreach($lcSettings['alias_langs'][SITE_ID] as $langURL){
			$curUrl = $REQUEST_SCHEME.'://'.$_SERVER['SERVER_NAME'].$APPLICATION->GetCurPageParam(false,false,false);
			if(strpos($curUrl,$langURL['mainURL']) !== false){
				foreach($langURL['subLANG'] as $key => $lang){
					if($lang == $LID && trim($langURL['subURL'][$key]) != ""){
						if(substr($langURL['subURL'][$key],0,1) == '"' && substr($langURL['subURL'][$key],-1,1) == '"'){
							$subURL = substr($langURL['subURL'][$key],1,(strlen($langURL['subURL'][$key])-1));
							$newUrl = $subURL;
						}else{
							if(substr($langURL['mainURL'],-1) == '/' && substr($langURL['subURL'][$key],-1) != '/')
								$langURL['subURL'][$key] .= '/';
							if(substr($langURL['mainURL'],-1) != '/' && substr($langURL['subURL'][$key],-1) == '/')
								$langURL['mainURL'] .= '/';
							$newUrl = str_replace($langURL['mainURL'], $langURL['subURL'][$key],$curUrl);
							$newUrl = localization_deleteGET($newUrl,'lang');
						}
					}
				}
			}
		}
		if($newUrl == "")
			$newUrl = $REQUEST_SCHEME.'://'.$_SERVER['SERVER_NAME'].$APPLICATION->GetCurUri();

		$arResult['SITES'][] = array(
			'CODE' => $LID,
			'NAME' => $NAME,
			'LINK' => $newUrl,
		);

	}
	$this->IncludeComponentTemplate();
}
?>