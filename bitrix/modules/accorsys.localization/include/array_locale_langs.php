<?
if(!$GLOBALS['accorsysLocalizationNeedCustomLang']){
    IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/translations.php',LANGUAGE_ID);
    IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/additionaltranslations.php',LANGUAGE_ID);
    if(class_exists('CLocale'))
        CLocale::includeLocaleLangFiles();
}

$arAccorsysLocaleLangs = array(
    'al' => GetMessage("LC_LANG_AL_ALBANIAN"),
    'us' => GetMessage("LC_LANG_US_ENGLISH_UNITED_STATES"),
    'sa' => GetMessage("LC_LANG_SA_ARABIC"),
    'am' => GetMessage("LC_LANG_AM_ARMENIAN"),
    'au' => GetMessage("LC_LANG_AU_ENGLISH_AUSTRALIAN"),
    'az' => GetMessage("LC_LANG_AZ_AZERBAIJANI"),
    'by' => GetMessage("LC_LANG_BY_BELARUSIAN"),
    'ba' => GetMessage("LC_LANG_BA_BOSNIAN"),
    'uk' => GetMessage("LC_LANG_UK_ENGLISH_UNITED_KINGDOM"),
    'nz' => GetMessage("LC_LANG_NZ_ENGLISH_NEW_ZEALAND"),
    'bg' => GetMessage("LC_LANG_BG_BULGARIAN"),
    'hr' => GetMessage("LC_LANG_HR_CROATIAN"),
    'cz' => GetMessage("LC_LANG_CZ_CZECH"),
    'dk' => GetMessage("LC_LANG_DK_DANISH"),
    'nl' => GetMessage("LC_LANG_NL_DUTCH"),
    'en' => GetMessage("LC_LANG_EN_ENGLISH"),
    'ee' => GetMessage("LC_LANG_EE_ESTONIAN"),
    'fi' => GetMessage("LC_LANG_FI_FINNISH"),
    'fr' => GetMessage("LC_LANG_FR_FRENCH"),
    'ge' => GetMessage("LC_LANG_GE_GEORGIAN"),
    'de' => GetMessage("LC_LANG_DE_GERMAN"),
    'gr' => GetMessage("LC_LANG_GR_GREEK"),
    'il' => GetMessage("LC_LANG_IL_HEBREW"),
    'hu' => GetMessage("LC_LANG_HU_HUNGARIAN"),
    'is' => GetMessage("LC_LANG_IS_ICELANDIC"),
    'id' => GetMessage("LC_LANG_ID_INDONESIAN"),
    'ie' => GetMessage("LC_LANG_IE_IRISH"),
    'it' => GetMessage("LC_LANG_IT_ITALIAN"),
    'jp' => GetMessage("LC_LANG_JP_JAPANESE"),
    'kz' => GetMessage("LC_LANG_KZ_KAZAKH"),
    'kh' => GetMessage("LC_LANG_KH_KHMER"),
    'kr' => GetMessage("LC_LANG_KR_KOREAN"),
    'kg' => GetMessage("LC_LANG_KG_KYRGYZ"),
    'la' => GetMessage("LC_LANG_LA_LAO"),
    'lv' => GetMessage("LC_LANG_LV_LATVIAN"),
    'lt' => GetMessage("LC_LANG_LT_LITHUANIAN"),
    'mk' => GetMessage("LC_LANG_MK_MACEDONIAN"),
    'my' => GetMessage("LC_LANG_MY_MALAYSIAN"),
    'mt' => GetMessage("LC_LANG_MT_MALTESE"),
    'mn' => GetMessage("LC_LANG_MN_MONGOLIAN"),
    'no' => GetMessage("LC_LANG_NO_NORWEGIAN"),
    'af' => GetMessage("LC_LANG_AF_PASHTO"),
    'ir' => GetMessage("LC_LANG_IR_PERSIAN"),
    'pl' => GetMessage("LC_LANG_PL_POLISH"),
    'br' => GetMessage("LC_LANG_BR_PORTUGUESE_BRAZIL"),
    'pt' => GetMessage("LC_LANG_PT_PORTUGUESE"),
    'ro' => GetMessage("LC_LANG_RO_ROMANIAN"),
    'ru' => GetMessage("LC_LANG_RU_RUSSIAN"),
    'rs' => GetMessage("LC_LANG_RS_SERBIAN"),
    'sk' => GetMessage("LC_LANG_SK_SLOVAK"),
    'si' => GetMessage("LC_LANG_SI_SLOVENIAN"),
    'za' => GetMessage("LC_LANG_ZA_ENGLISH_SOUTH_AFRICA"),
    'es' => GetMessage("LC_LANG_ES_SPANISH"),
    'cn' => GetMessage("LC_LANG_CN_CHINESE_STANDARD"),
    'se' => GetMessage("LC_LANG_SE_SWEDISH"),
    'tj' => GetMessage("LC_LANG_TJ_TAJIK"),
    'th' => GetMessage("LC_LANG_TH_THAI"),
    'tr' => GetMessage("LC_LANG_TR_TURKISH"),
    'tm' => GetMessage("LC_LANG_TM_TURKMEN"),
    'ua' => GetMessage("LC_LANG_UA_UKRAINIAN"),
    'uz' => GetMessage("LC_LANG_UZ_UZBEK"),
    'vn' => GetMessage("LC_LANG_VN_VIETNAMESE")
);

if(class_exists('CLanguage')){
    $rsLangs = CLanguage::GetList($by,$order,array());

    while($arLang = $rsLangs->getNext()){
        if(!isset($arAccorsysLocaleLangs[$arLang["LID"]])){
            $arAccorsysLocaleLangs[$arLang["LID"]] = $arLang["NAME"];
        }
    }
}