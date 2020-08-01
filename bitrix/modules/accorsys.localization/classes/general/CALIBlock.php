<?php

class CLEIBlock {

	static public $translateId = array();

	static function CopyIBlock($ID, $isSetSessionOldId = false, $arFields = array()){

		CModule::IncludeModule("iblock");

		$ib = new CIBlock();
		$res = CIBlock::GetByID($ID);
		if($arIBlockFields = $res->GetNext()){
			foreach($arIBlockFields as $k=>$v){
				if(strpos($k,'~') !== false){
					$arIBlockFields[ltrim($k,'~')] = $v;
					unset($arIBlockFields[$k]);
				}
			}
		}

		if(isset($arFields['ACTIVE'])){
			$arIBlockFields["ACTIVE"] = $arFields["ACTIVE"];
		}

		if(isset($arFields['NAME'])){
			$arIBlockFields["NAME"] = $arFields["NAME"];
		}

		if(isset($arFields['CODE'])){
			$arIBlockFields["CODE"] = $arFields["CODE"];
		}

		if(isset($arFields['SITE_ID'])){
			$arIBlockFields["SITE_ID"] = $arFields["SITE_ID"];
		}else{
			$arSiteId = array();
			$rsSites = CIBlock::GetSite($ID);
			while($arSite = $rsSites->Fetch()){
				$arSiteId[] = $arSite["SITE_ID"];
			}
			$arIBlockFields["SITE_ID"] = $arSiteId;
		}

		if(isset($arFields['SORT'])){
			$arIBlockFields["SORT"] = $arFields["SORT"];
		}

		$arIBlockFields["PICTURE"] = CFile::MakeFileArray($arIBlockFields["PICTURE"]);
		$NewID = $ib->Add($arIBlockFields);

		if(CModule::IncludeModule('catalog')){
			$objCatalog = new CCatalog;

			$dbCatalog = $objCatalog->GetList(array(), array("IBLOCK_ID" => $ID));
			if($arCatalog = $dbCatalog->Fetch()){
				CCatalog::Add(array("IBLOCK_ID" => $NewID));
			}
		}


		$arIBlockFields = CIBlock::GetFields($ID);
		CIBlock::setFields($NewID, $arIBlockFields);

		$ipropTemlates = new \Bitrix\Iblock\InheritedProperty\IblockTemplates($ID);
		$arIBlockIPropertyTemplates = $ipropTemlates->findTemplates();

		foreach($arIBlockIPropertyTemplates as $code => $ar){
			$arIBlockIPropertyTemplates[$code] = $ar['TEMPLATE'];
		}
		$ipropTemplates = new \Bitrix\Iblock\InheritedProperty\IblockTemplates($NewID);
		$ipropTemplates->set($arIBlockIPropertyTemplates);

		$ibp = new CIBlockProperty();
		$arMapPropertyID = array();

		$dbIBlockProperty = CIBlock::GetProperties($ID, Array(), Array());
		while($arIBlockProperty = $dbIBlockProperty->GetNext())
		{
			foreach($arIBlockProperty as $k=>$v){
				if(strpos($k,'~') === 0){
					$realName = substr($k,1);
					$arIBlockProperty[$realName] = $arIBlockProperty[$k];
					unset($arIBlockProperty[$k]);
				}
			}
			$isRequired = false;
			if($arIBlockProperty['IS_REQUIRED'] == 'Y'){
				$isRequired = true;
				$arIBlockProperty['IS_REQUIRED'] = 'N';
			}

			$arIBlockProperty['IBLOCK_ID'] = $NewID;

			$PropID = $ibp->Add($arIBlockProperty);

			$arMapPropertyID[$arIBlockProperty['ID']] = $PropID;
			if($isSetSessionOldId){

				if($isRequired)
					$_SESSION['AL_MAP_PROPERTIES_IS_REQUIRED'][$NewID][$PropID] = 'Y';

				$_SESSION['AL_MAP_PROPERTIES'][$NewID] = $arMapPropertyID;
			}

		}
		$rsPropertyEnums = CIBlockPropertyEnum::GetList(Array("ID"=>"ASC"), Array("IBLOCK_ID"=>$ID));
		while($arPropertyEnums = $rsPropertyEnums->GetNext())
		{
			foreach($arPropertyEnums as $k=>$v){
				if(strpos($k,'~') === 0){
					$realName = substr($k,1);
					$arPropertyEnums[$realName] = $arPropertyEnums[$k];
					unset($arPropertyEnums[$k]);
				}
			}
			$arPropertyEnums['PROPERTY_ID'] = $arMapPropertyID[$arPropertyEnums['PROPERTY_ID']];

			$ibpenum = new CIBlockPropertyEnum;
			$ibpenum->Add($arPropertyEnums);

		}
		$arIBlockPermissions = CIBlock::GetGroupPermissions($ID);
		CIBlock::SetPermission($NewID, $arIBlockPermissions);

		return $NewID;
	}

	static function CopyIBlockSection($fromIBlockID, $toIBlockID, $isSetSessionOldId = false){
		CModule::IncludeModule('iblock');
		$arMapSections = array();

		$dbSectionList= CIBlockSection::GetTreeList(Array('IBLOCK_ID'=>$fromIBlockID));
		while($arSectionList = $dbSectionList->GetNext())
		{
			$arNewSections = array(
				'ACTIVE' => $arSectionList['ACTIVE'],
				'SORT' => $arSectionList['SORT'],
				'NAME' => $arSectionList['~NAME'],
				'PICTURE' => CFile::MakeFileArray($arSectionList['PICTURE']),
				'DESCRIPTION' => $arSectionList['~DESCRIPTION'],
				'DESCRIPTION_TYPE' => $arSectionList['DESCRIPTION_TYPE'],
				'SEARCHABLE_CONTENT' => $arSectionList['~SEARCHABLE_CONTENT'],
				'XML_ID' => $arSectionList['XML_ID'],
				'CODE' => $arSectionList['CODE'],
				'DETAIL_PICTURE' =>CFile::MakeFileArray($arSectionList['DETAIL_PICTURE']),
				'LIST_PAGE_URL' => $arSectionList['LIST_PAGE_URL'],
				'SECTION_PAGE_URL' => $arSectionList['SECTION_PAGE_URL']
			);

			if(isset($arMapSections[$arSectionList['IBLOCK_SECTION_ID']])){
				$arNewSections['IBLOCK_SECTION_ID'] = $arMapSections[$arSectionList['IBLOCK_SECTION_ID']];
			}

			$arNewSections['IBLOCK_ID'] = $toIBlockID;

			$bs = new CIBlockSection;
			$ID = $bs->Add($arNewSections);

			if(intval($ID) > 0){
				$_SESSION['AL_COPY_INFO'][$toIBlockID]['ADD_SECTIONS_COUNT']+=1;
			}

			$arMapSections[$arSectionList['ID']] = $ID;
		}

		if($isSetSessionOldId){
			$_SESSION['AL_MAP_SECTIONS'][$toIBlockID] = $arMapSections;
		}

		return $arMapSections;
	}

	static function CopyTranslateIBlockElement ($arParams = array()){

		CModule::IncludeModule('iblock');

		$arNavParams = array(
			"nPageSize" => $arParams['iBlockCopyCount'] ? $arParams['iBlockCopyCount'] : 10,

		);

		$arNavParams["iNumPage"] = $arParams['nextPage'];

		$dbElement = CIBlockElement::GetList(
			Array("ID"=> "ASC"),
			Array($arParams['arFilter']),
			false,
			$arNavParams
		);

		while ($rsElement = $dbElement->GetNextElement()) {

			$obElement = new CIBlockElement;

			$arElementFields = $rsElement->GetFields();
			$arElementProperties = $rsElement->GetProperties();

			foreach ($arElementFields as $k => $v) {
				if (strpos($k, '~') !== false) {
					unset($arElementFields[$k]);
				}
			}

			$arElementPropertiesTemp = array();

			$arErrorRequired = array();
			$fromLang = $arParams['fromLangCopySelect'];
			if($fromLang == 'allLang')
				foreach ($arElementProperties as $propertiesValue){
					if($propertiesValue['CODE'] == 'lang'){
						$fromLang = $propertiesValue['VALUE'];
					}
				}
			foreach ($arElementProperties as $propertiesValue){
				if($propertiesValue['CODE'] == 'lang'){
					$propertiesValue['VALUE'] = $arParams['toLangCopySelect'];
				}
				if($propertiesValue['CODE'] == 'lang_file'){
					$propertiesValue['VALUE'] = str_replace('/lang/'.$fromLang.'/','/lang/'.$arParams['toLangCopySelect'].'/',$propertiesValue['VALUE']);
					$toLanguageFile = $propertiesValue['VALUE'];
				}

				switch(trim($propertiesValue['PROPERTY_TYPE'])){
					case 'F':
						if (is_array($propertiesValue['VALUE'])) {
							foreach ($propertiesValue['VALUE'] as $key => $value) {
								$arElementPropertiesTemp[$propertiesValue['CODE']]['n' . $key] = array('VALUE' => CFile::MakeFileArray(CFile::CopyFile($value)));
								if ($propertiesValue['DESCRIPTION'][$key]) {
									$arElementPropertiesTemp[$propertiesValue['CODE']]['n' . $key]['DESCRIPTION'] = $propertiesValue['DESCRIPTION'][$key];
								}
							}
						} else {
							$arElementPropertiesTemp[$propertiesValue['CODE']]['n0'] = array('VALUE' => CFile::MakeFileArray(CFile::CopyFile($propertiesValue['VALUE'])));
						}
						break;

					case 'L':
						$propertyEnums = CIBlockPropertyEnum::GetList(Array("DEF" => "DESC", "SORT" => "ASC"), Array("IBLOCK_ID" => $toIBlockID, "PROPERTY_ID" => $arMapProperties[$propertiesValue['ID']]));
						while ($enumFields = $propertyEnums->GetNext()) {
							if (in_array($enumFields['VALUE'], $propertiesValue['VALUE'])) {
								$arElementPropertiesTemp[$propertiesValue['CODE']][] = array('VALUE' => $enumFields['ID']);
							}
						}
						break;

					case 'S':
					case 'N':
					case 'E':
					case 'G':
						if(strtoupper($propertiesValue['USER_TYPE']) == "HTML"){

							if ($propertiesValue['MULTIPLE'] == 'Y') {
								foreach ($propertiesValue['VALUE'] as $key => $value) {
									$arElementPropertiesTemp[$propertiesValue['CODE']][] =  array('VALUE'=>array('TYPE'=>$value['TYPE'], 'TEXT'=>htmlspecialchars_decode($value['TEXT'])));
								}
							} else {
								$arElementPropertiesTemp[$propertiesValue['CODE']] =  array('VALUE'=>array('TYPE'=>$propertiesValue['VALUE']['TYPE'], 'TEXT'=>htmlspecialchars_decode($propertiesValue['VALUE']['TEXT'])));
							}
						}else{
							if (is_array($propertiesValue['VALUE'])) {
								foreach ($propertiesValue['VALUE'] as $key => $value) {
									$arElementPropertiesTemp[$propertiesValue['CODE']][] = $value;
								}
							} else {
								$arElementPropertiesTemp[$propertiesValue['CODE']] = $propertiesValue['VALUE'];
							}
						}
						break;
				}
			}
			$arElementProperties = $arElementPropertiesTemp;

			if (count($arElementProperties) > 0) {
				$arElementFields['PROPERTY_VALUES'] = $arElementProperties;
			}
			unset($arElementFields['ID']);
			$result = $obElement->Add($arElementFields);
			if (intval($result) <= 0 && $arParams['actionOnExistsElements'] == "overwrite"){
				$arExistElement = CIBlockElement::GetList(array(),array(
					"IBLOCK_ID" => $arParams['filter']["IBLOCK_ID"],
					"PROPERTY_lang" => $arParams['toLangCopySelect'],
					"PROPERTY_lang_file" => $toLanguageFile
				));
				if($arForUpdateElement = $arExistElement->getNext()){
					$result = $obElement->Update($arForUpdateElement['ID'],$arElementFields);
				}
			}else{
				$_SESSION['AL_COPY_INFO']['LOCALE_IBLOCK_LEMENTS']['ADD_ELEMENT_COUNT']+=1;
			}
		}

		if(intval($dbElement->NavPageNomer) != intval($dbElement->NavPageCount) && intval($dbElement->NavPageCount) > 0){
			return array(
				"NEXT_PAGE" => $dbElement->NavPageNomer + 1,
				"ALL" => intval($dbElement->SelectedRowsCount()),
				"MAKE" => ($dbElement->NavPageNomer * $arNavParams['nPageSize'])
			);
		}else{
			return array(
				'SUCCESS'=>'Y',
			);
		}
	}

	static function CopyIBlockElement($fromIBlockID, $toIBlockID, $arMapSections = array(), $arMapProperties = array(),$arFilter = array()){

		CModule::IncludeModule('iblock');

		if(isset($_SESSION['AL_MAP_SECTIONS'][$toIBlockID]) && count($arMapSections) <= 0){
			$arMapSections = $_SESSION['AL_MAP_SECTIONS'][$toIBlockID];
		}

		if(isset($_SESSION['AL_MAP_PROPERTIES'][$toIBlockID]) && count($arMapProperties) <= 0){
			$arMapProperties = $_SESSION['AL_MAP_PROPERTIES'][$toIBlockID];
		}

		$arNavParams = array(
			"nPageSize" => AL_IBLOCK_COPY_COUNT ? AL_IBLOCK_COPY_COUNT : 3,
		);
		if(AL_IBLOCK_COPY_IS_FIRST_PAGE && AL_IBLOCK_COPY_IS_FIRST_PAGE == 'Y'){
			$arNavParams["iNumPage"] = 1;
		}


		$dbElement = CIBlockElement::GetList(
			Array("ID"=> "ASC"),
			Array("IBLOCK_ID"=>$fromIBlockID),
			false,
			$arNavParams
		);
		$countIBlockElement = $dbElement->SelectedRowsCount();

		$dbElementNew = CIBlockElement::GetList(
			Array("ID"=> "ASC"),
			Array("IBLOCK_ID"=>$toIBlockID),
			false,
			false,
			array('ID')
		);
		$countNewIBlockElement = $dbElementNew->SelectedRowsCount();

		if(intval($countNewIBlockElement) > intval($countIBlockElement)){
			return true;
		}

		if(isset($_SESSION['AL_IBLOCK_COPY_STEP'][$toIBlockID]) &&
			$_SESSION['AL_IBLOCK_COPY_STEP'][$toIBlockID] == $dbElement->NavPageNomer ){

			return array(
				"PAGE_NUMBER" => $dbElement->NavPageNomer + 1,
				"PAGE_NAME" => "PAGEN_" .  $dbElement->NavNum,
				"ALL" => intval($dbElement->SelectedRowsCount()),
				"REPEAT" => 'Y',
				"MAKE" => ($dbElement->NavPageNomer * $arNavParams['nPageSize'])
			);
		}

		$_SESSION['AL_IBLOCK_COPY_STEP'][$toIBlockID] == $dbElement->NavPageNomer;



		while ($rsElement = $dbElement->GetNextElement()) {

			$obElement = new CIBlockElement;

			$arElementFields = $rsElement->GetFields();
			$arElementProperties = $rsElement->GetProperties();
			$curElementID = $arElementFields['ID'];

			foreach ($arElementFields as $k => $v) {
				if (strpos($k, '~') !== false) {
					$arElementFields[ltrim($k,'~')] = $v;
					unset($arElementFields[$k]);
				}
			}

			$arElementPropertiesTemp = array();

			$arErrorRequired = array();

			foreach ($arElementProperties as $propertiesValue){

				if($propertiesValue['IS_REQUIRED'] == 'Y' && trim($propertiesValue['VALUE']) == ''){
					$arErrorRequired[] = array(
						'NAME'=>$propertiesValue['NAME'],
						'ERROR'=>'1'
					);
				}

				switch(trim($propertiesValue['PROPERTY_TYPE'])){
					case 'F':
						if (is_array($propertiesValue['~VALUE'])){
							foreach ($propertiesValue['~VALUE'] as $key => $value) {
								$arElementPropertiesTemp[$propertiesValue['CODE']]['n' . $key] = array('VALUE' => CFile::MakeFileArray(CFile::CopyFile($value)));
								if ($propertiesValue['DESCRIPTION'][$key]) {
									$arElementPropertiesTemp[$propertiesValue['CODE']]['n' . $key]['DESCRIPTION'] = $propertiesValue['DESCRIPTION'][$key];
								}
							}
						} else {
							$arElementPropertiesTemp[$propertiesValue['CODE']]['n0'] = array('VALUE' => CFile::MakeFileArray(CFile::CopyFile($propertiesValue['~VALUE'])));
						}
						break;

					case 'L':
						$propertyEnums = CIBlockPropertyEnum::GetList(Array("DEF" => "DESC", "SORT" => "ASC"), Array("IBLOCK_ID" => $toIBlockID, "PROPERTY_ID" => $arMapProperties[$propertiesValue['ID']]));
						if(is_array($propertiesValue['~VALUE'])){
							while ($enumFields = $propertyEnums->GetNext()) {
								if (in_array($enumFields['~VALUE'], $propertiesValue['~VALUE'])) {
									$arElementPropertiesTemp[$propertiesValue['CODE']][] = $enumFields['ID'];
								}
							}
						}else{
							while ($enumFields = $propertyEnums->GetNext()) {
								if ($enumFields['~VALUE'] == $propertiesValue['~VALUE']) {
									$arElementPropertiesTemp[$propertiesValue['CODE']][] = array('VALUE' => $enumFields['ID']);
								}
							}
						}
						break;
					case 'S':
					case 'N':
					case 'E':
					case 'G':
						if(strtoupper($propertiesValue['USER_TYPE']) == "HTML"){

							if ($propertiesValue['MULTIPLE'] == 'Y') {
								foreach ($propertiesValue['~VALUE'] as $key => $value) {
									$arElementPropertiesTemp[$propertiesValue['CODE']][] =  array('VALUE'=>array('TYPE'=>$value['TYPE'], 'TEXT'=>htmlspecialchars_decode($value['TEXT'])));
								}
							} else {
								$arElementPropertiesTemp[$propertiesValue['CODE']] =  array('VALUE'=>array('TYPE'=>$propertiesValue['~VALUE']['TYPE'], 'TEXT'=>htmlspecialchars_decode($propertiesValue['~VALUE']['TEXT'])));
							}
						}else{
							if (is_array($propertiesValue['~VALUE'])) {
								foreach ($propertiesValue['~VALUE'] as $key => $value) {
									$arElementPropertiesTemp[$propertiesValue['CODE']][] = $value;
								}
							} else {
								$arElementPropertiesTemp[$propertiesValue['CODE']] = $propertiesValue['~VALUE'];
							}
						}
						break;
				}
			}
			$arElementProperties = $arElementPropertiesTemp;

			$arElementFields['IBLOCK_ID'] = $toIBlockID;

			if (isset($arMapSections[$arElementFields['IBLOCK_SECTION_ID']])) {
				$arElementFields['IBLOCK_SECTION_ID'] = $arMapSections[$arElementFields['IBLOCK_SECTION_ID']];
			} else {
				$arElementFields['IBLOCK_SECTION_ID'] = false;
			}


			if ($arElementFields['PREVIEW_PICTURE'])
				$arElementFields['PREVIEW_PICTURE'] = CFile::MakeFileArray(CFile::CopyFile($arElementFields['PREVIEW_PICTURE']));

			if ($arElementFields['DETAIL_PICTURE'])
				$arElementFields['DETAIL_PICTURE'] = CFile::MakeFileArray(CFile::CopyFile($arElementFields['DETAIL_PICTURE']));

			if (count($arElementProperties) > 0) {
				$arElementFields['PROPERTY_VALUES'] = $arElementProperties;
			}

			$result = $obElement->Add($arElementFields);

			if (intval($result) <= 0){
				/*return array(
						"ERROR" => $obElement->LAST_ERROR
				);*/
			}else{
				if(CModule::IncludeModule('catalog')){
					$arOldProductParams = CCatalogProduct::GetByID($curElementID);
					$arOldProductParams ['ID'] = (int)$result;
					if($arOldProductParams !== false){
						CCatalogProduct::Add($arOldProductParams);
					}
				}

				if(CModule::IncludeModule('sale')){
					$db_res = CPrice::GetList(array(),array(
						"PRODUCT_ID" => (int)$curElementID
					));

					while ($ar_res = $db_res->Fetch())
					{
						$arFields = Array(
							"PRODUCT_ID" => (int)$result,
							"CATALOG_GROUP_ID" => $ar_res['CATALOG_GROUP_ID'],
							"PRICE" => $ar_res['PRICE'],
							"CURRENCY" => $ar_res['CURRENCY'],
							"QUANTITY_FROM" => $ar_res['QUANTITY_FROM'],
							"QUANTITY_TO" => $ar_res['QUANTITY_TO']
						);

						$res = CPrice::GetList(
							array(),
							array(
								"PRODUCT_ID" => (int)$result,
								"CATALOG_GROUP_ID" => $ar_res['CATALOG_GROUP_ID']
							)
						);

						if ($arr = $res->Fetch())
						{
							CPrice::Update($arr["ID"], $arFields);
						}
						else
						{
							CPrice::Add($arFields);
						}
					}
				}


				$_SESSION['AL_COPY_INFO'][$toIBlockID]['ADD_ELEMENT_COUNT']+=1;
				if(!empty($arErrorRequired))
					$_SESSION['ACCORSYS_LOCALIZATION_IMPORT_ERROR'][$toIBlockID][$result] = $arErrorRequired;
			}
		}

		if(intval($dbElement->NavPageNomer) != intval($dbElement->NavPageCount) && intval($dbElement->NavPageCount) > 0){
			return array(
				"PAGE_NUMBER" => $dbElement->NavPageNomer + 1,
				"PAGE_NAME" => "PAGEN_" .  $dbElement->NavNum,
				"ALL" => intval($dbElement->SelectedRowsCount()),
				"MAKE" => ($dbElement->NavPageNomer * $arNavParams['nPageSize'])
			);
			$_SESSION['AL_COPY_STEP'][$toIBlockID] = intval($dbElement->NavPageNomer);

		}else{

			if(count($_SESSION['AL_MAP_PROPERTIES_IS_REQUIRED'][$toIBlockID]) > 0){
				foreach($_SESSION['AL_MAP_PROPERTIES_IS_REQUIRED'][$toIBlockID] as $id=>$val){
					$ibp = new CIBlockProperty;
					$ibp->Update($id, array('IS_REQUIRED'=>$val));
				}
				unset($_SESSION['AL_MAP_PROPERTIES_IS_REQUIRED'][$toIBlockID]);
			}

			if(isset($_SESSION['AL_MAP_SECTIONS'][$toIBlockID])){
				unset($_SESSION['AL_MAP_SECTIONS'][$toIBlockID]);
			}

			if(isset($_SESSION['AL_IBLOCK_COPY_STEP']))unset($_SESSION['AL_IBLOCK_COPY_STEP'][$toIBlockID]);

			if(isset($_SESSION['AL_COPY_STEP'][$toIBlockID]))unset($_SESSION['AL_COPY_STEP'][$toIBlockID]);

			$errorImport = false;
			if($_SESSION['ACCORSYS_LOCALIZATION_IMPORT_ERROR'][$toIBlockID]){
				$errorImport = $_SESSION['ACCORSYS_LOCALIZATION_IMPORT_ERROR'][$toIBlockID];
				unset($_SESSION['ACCORSYS_LOCALIZATION_IMPORT_ERROR'][$toIBlockID]);
			}
			$dbIblock = CIblock::GetByID($toIBlockID);
			$arIblock = $dbIblock->GetNext();
			return array(
				'ERROR'=>$errorImport?$errorImport:'N',
				'IBLOCK_ID' => $toIBlockID,
				'IBLOCK_TYPE' => $arIblock['IBLOCK_TYPE_ID']
			);
		}

	}


	static function deleteIBlockElement($iblockId){

		global $DB;
		CModule::IncludeModule("iblock");

		if(intval($iblockId) > 0){
			$arNavParams = array(
				"nTopCount" => 100,

			);

			$dbElement = CIBlockElement::GetList(
				Array("ID"=> "ASC"),
				Array("IBLOCK_ID"=>$iblockId),
				false,
				$arNavParams,
				array('ID')
			);

			While($arElement = $dbElement->GetNext()){
				$DB->StartTransaction();
				if(!CIBlockElement::Delete($arElement['ID']))
				{
					$DB->Rollback();
				}
				else
					$DB->Commit();
			}

			$dbElement = CIBlockElement::GetList(
				Array("ID"=> "ASC"),
				Array("IBLOCK_ID"=>$iblockId),
				false,
				false,
				array('ID')
			);

			$count = $dbElement->SelectedRowCount();

			if(intval($count) > 0){
				return $count;
			}else{
				return true;
			}

		}

	}

	/**
	 * IBLOCK_ID
	 * FIELD_CODE_LIST
	 * PROPERTY_CODE_LIST
	 * TRANSLATE_SYSTEM_CODE <- ya - yandex, go - google , ms - microsoft
	 * LANG
	 */
	static function translateIBlockElement($arFields){
		CModule::IncludeModule('iblock');

		if(!class_exists('CALTranslate'))
			require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/classes/general/CALTranslate.php");

		$arNavParams = array(
			"nPageSize" => $arFields['nPageSize'] ? $arFields['nPageSize']:10
		);

		if(AL_IBLOCK_COPY_IS_FIRST_PAGE && AL_IBLOCK_COPY_IS_FIRST_PAGE == 'Y'){
			$arNavParams["iNumPage"] = 1;
		}

		$arPermission = array(
			'S',
			'HTML'
		);

		$arSelectFields = array();
		$arSelectProperty = array();

		foreach($arFields['FIELD_CODE_LIST'] as $k => $v){
			$arSelectFields[] = strtoupper($v);
		}

		foreach($arFields['PROPERTY_CODE_LIST'] as $k => $v){
			$arSelectProperty[] = strtoupper($v);
		}
		///$arNavParams["iNumPage"] = 1;

		$arFilter = Array(
			"IBLOCK_ID"=>intval($arFields['IBLOCK_ID'])
		);

		if(isset($arFields['ID'])){
			$arFilter['ID'] = $arFields['ID'];
		}

		CModule::IncludeModule("iblock");
		$dbElement = CIBlockElement::GetList(
			Array("ID"=> "ASC"),
			$arFilter,
			false,
			$arNavParams
		);


		while ($rsElement = $dbElement->GetNextElement()) {

			$arElementFields = $rsElement->GetFields();
			$arElementProperties = $rsElement->GetProperties();
			foreach($arElementFields as $k => $v){
				if(strpos($k,'~') === 0){
					$realName = substr($k,1);
					$arElementFields[$realName] = $arElementFields[$k];
				}
			}
			foreach($arElementProperties as $k => $v){
				if(strpos($k,'~') === 0){
					$realName = substr($k,1);
					$arElementProperties[$realName] = $arElementProperties[$k];
				}
			}

			$arFieldsValue = array();
			foreach($arSelectFields as $k => $v){
				if($arElementFields[$v]){
					$arFieldsValue[$v] = $arElementFields[$v];
				}
			}

			$arMoreInformationProperties = array();
			$arPropertiesValue = array();
			foreach($arElementProperties as $k => $v){

				if(in_array(strtoupper($k),$arSelectProperty)){

					$arMoreInformationProperties[strtoupper($k)] = $v;

					if(!in_array($v['PROPERTY_TYPE'],$arPermission) /*|| strlen($v['USER_TYPE']) > 0 && !in_array($v['USER_TYPE'],$arPermission)*/
					){
						continue;
					}

					if(is_array($v['PROPERTY_VALUE_ID'])){
						foreach($v['PROPERTY_VALUE_ID'] as $key => $val){
							$arPropertiesValue[$k][$val] = $v['~VALUE'][$key];
						}
					}else{
						if(intval($v['PROPERTY_VALUE_ID']) > 0)
							$arPropertiesValue[$k][$v['PROPERTY_VALUE_ID']] = $v['~VALUE'];
					}
				}
			}

			$arTranslateFields = array();


			foreach($arFieldsValue as $code => $value){
				if($code == 'PREVIEW_TEXT' && $arElementFields['PREVIEW_TEXT_TYPE'] == 'html' ||
					$code =='DETAIL_TEXT' && $arElementFields['DETAIL_TEXT_TYPE'] == 'html'){

					$arTranslateFields[$code] = htmlspecialchars_decode(CALTranslate::translateHtml($value, $arFields['TRANSLATE_SYSTEM_CODE'], $arFields['LANG']));
				}else{
					$arTranslateFields[$code] = htmlspecialchars_decode(CALTranslate::translateController($value, $arFields['TRANSLATE_SYSTEM_CODE'], $arFields['LANG']));
				}
			}

			$el = new CIBlockElement;
			$el->Update($arElementFields['ID'], $arTranslateFields);

			if(count($arPropertiesValue) > 0){
				$arTranslateProperties = array();
				foreach ($arPropertiesValue as $code => $value) {
					foreach ($value as $id => $v) {
						if (is_array($v)) {
							if($arMoreInformationProperties[strtoupper($code)]['USER_TYPE'] == 'HTML'){
								if(strtoupper($v['TYPE']) == 'HTML'){
									$value = $v['TEXT'];
									$textTranslate = CALTranslate::translateHtml($value, $arFields['TRANSLATE_SYSTEM_CODE'], $arFields['LANG']);

								}else{
									$value = $v['TEXT'];
									$textTranslate = htmlspecialchars_decode(CALTranslate::translateController($value, $arFields['TRANSLATE_SYSTEM_CODE'], $arFields['LANG']));
								}
								$arTranslateProperties[$code][$id] = array('VALUE'=>array('TYPE'=>$v['TYPE'], 'TEXT'=>trim($textTranslate)));
							}
						} else {
							if($arMoreInformationProperties[$code]['MULTIPLE'] == 'Y'){
								$textTranslate = htmlspecialchars_decode(CALTranslate::translateController($v, $arFields['TRANSLATE_SYSTEM_CODE'], $arFields['LANG']));
								$arTranslateProperties[$code][] = trim((string)$textTranslate);
							}else{
								$textTranslate = htmlspecialchars_decode(CALTranslate::translateController($v, $arFields['TRANSLATE_SYSTEM_CODE'], $arFields['LANG']));
								$arTranslateProperties[$code] = trim((string)$textTranslate);
							}
						}
					}
				}
			}

			foreach($arTranslateProperties as $k => $v){
				CIBlockElement::SetPropertyValuesEx($arElementFields['ID'], $arElementFields['IBLOCK_ID'], array($k =>$v ));
			}
		}

		if(intval($dbElement->NavPageNomer) != intval($dbElement->NavPageCount) && $dbElement->SelectedRowsCount() != 0){
			return array(
				"PAGE_NUMBER" => $dbElement->NavPageNomer + 1,
				"PAGE_NAME" => "PAGEN_" .  $dbElement->NavNum,
				"ALL" => intval($dbElement->SelectedRowsCount()),
				"MAKE" => ($dbElement->NavPageNomer * $arNavParams['nPageSize'])
			);
		}else{
			return array(
				'success' => 'Y'
			);
		}
		#endregion
	}


	static function translateIBlockSections($arFields){
		CModule::IncludeModule('iblock');
		if(!class_exists('CALTranslate'))
			require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/classes/general/CALTranslate.php");

		if(intval($arFields['IBLOCK_ID']) <= 0){
			return true;
		}

		$arFilter = Array(
			'IBLOCK_ID' => intval($arFields['IBLOCK_ID'])
		);

		if(isset($arFields['ID'])){
			$arFilter['ID'] = $arFields['ID'];
		}

		$db_list = CIBlockSection::GetList(Array($by=>$order), $arFilter);
		while($ar_result = $db_list->GetNext())
		{
			$arUpdate = array();
			$arUpdate['NAME'] = htmlspecialchars_decode(CALTranslate::translateController($ar_result['~NAME'], $arFields['TRANSLATE_SYSTEM_CODE'], $arFields['LANG']));
			$arUpdate['DESCRIPTION'] = htmlspecialchars_decode(CALTranslate::translateHtml($ar_result['~DESCRIPTION'], $arFields['TRANSLATE_SYSTEM_CODE'], $arFields['LANG']));
			$bs = new CIBlockSection;
			$bs->Update($ar_result['ID'], $arUpdate);
		}

		return true;
	}


}