<?
IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/translations.php',LANGUAGE_ID);
IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/additionaltranslations.php',LANGUAGE_ID);

if(class_exists('CLocale'))
    CLocale::includeLocaleLangFiles();

$arAccorsysLocaleLangsTitle = array(
    'al' => GetMessage("LC_LANG_AL_ALBANIAN_TITLE"),
    'us' => GetMessage("LC_LANG_US_ENGLISH_UNITED_STATES_TITLE"),
    'sa' => GetMessage("LC_LANG_SA_ARABIC_TITLE"),
    'am' => GetMessage("LC_LANG_AM_ARMENIAN_TITLE"),
    'au' => GetMessage("LC_LANG_AU_ENGLISH_AUSTRALIAN_TITLE"),
    'az' => GetMessage("LC_LANG_AZ_AZERBAIJANI_TITLE"),
    'by' => GetMessage("LC_LANG_BY_BELARUSIAN_TITLE"),
    'ba' => GetMessage("LC_LANG_BA_BOSNIAN_TITLE"),
    'uk' => GetMessage("LC_LANG_UK_ENGLISH_UNITED_KINGDOM_TITLE"),
    'nz' => GetMessage("LC_LANG_NZ_ENGLISH_NEW_ZEALAND_TITLE"),
    'bg' => GetMessage("LC_LANG_BG_BULGARIAN_TITLE"),
    'hr' => GetMessage("LC_LANG_HR_CROATIAN_TITLE"),
    'cz' => GetMessage("LC_LANG_CZ_CZECH_TITLE"),
    'dk' => GetMessage("LC_LANG_DK_DANISH_TITLE"),
    'nl' => GetMessage("LC_LANG_NL_DUTCH_TITLE"),
    'en' => GetMessage("LC_LANG_EN_ENGLISH_TITLE"),
    'ee' => GetMessage("LC_LANG_EE_ESTONIAN_TITLE"),
    'fi' => GetMessage("LC_LANG_FI_FINNISH_TITLE"),
    'fr' => GetMessage("LC_LANG_FR_FRENCH_TITLE"),
    'ge' => GetMessage("LC_LANG_GE_GEORGIAN_TITLE"),
    'de' => GetMessage("LC_LANG_DE_GERMAN_TITLE"),
    'gr' => GetMessage("LC_LANG_GR_GREEK_TITLE"),
    'il' => GetMessage("LC_LANG_IL_HEBREW_TITLE"),
    'hu' => GetMessage("LC_LANG_HU_HUNGARIAN_TITLE"),
    'is' => GetMessage("LC_LANG_IS_ICELANDIC_TITLE"),
    'id' => GetMessage("LC_LANG_ID_INDONESIAN_TITLE"),
    'ie' => GetMessage("LC_LANG_IE_IRISH_TITLE"),
    'it' => GetMessage("LC_LANG_IT_ITALIAN_TITLE"),
    'jp' => GetMessage("LC_LANG_JP_JAPANESE_TITLE"),
    'kz' => GetMessage("LC_LANG_KZ_KAZAKH_TITLE"),
    'kh' => GetMessage("LC_LANG_KH_KHMER_TITLE"),
    'kr' => GetMessage("LC_LANG_KR_KOREAN_TITLE"),
    'kg' => GetMessage("LC_LANG_KG_KYRGYZ_TITLE"),
    'la' => GetMessage("LC_LANG_LA_LAO_TITLE"),
    'lv' => GetMessage("LC_LANG_LV_LATVIAN_TITLE"),
    'lt' => GetMessage("LC_LANG_LT_LITHUANIAN_TITLE"),
    'mk' => GetMessage("LC_LANG_MK_MACEDONIAN_TITLE"),
    'my' => GetMessage("LC_LANG_MY_MALAYSIAN_TITLE"),
    'mt' => GetMessage("LC_LANG_MT_MALTESE_TITLE"),
    'mn' => GetMessage("LC_LANG_MN_MONGOLIAN_TITLE"),
    'no' => GetMessage("LC_LANG_NO_NORWEGIAN_TITLE"),
    'af' => GetMessage("LC_LANG_AF_PASHTO_TITLE"),
    'ir' => GetMessage("LC_LANG_IR_PERSIAN_TITLE"),
    'pl' => GetMessage("LC_LANG_PL_POLISH_TITLE"),
    'br' => GetMessage("LC_LANG_BR_PORTUGUESE_BRAZIL_TITLE"),
    'pt' => GetMessage("LC_LANG_PT_PORTUGUESE_TITLE"),
    'ro' => GetMessage("LC_LANG_RO_ROMANIAN_TITLE"),
    'ru' => GetMessage("LC_LANG_RU_RUSSIAN_TITLE"),
    'rs' => GetMessage("LC_LANG_RS_SERBIAN_TITLE"),
    'sk' => GetMessage("LC_LANG_SK_SLOVAK_TITLE"),
    'si' => GetMessage("LC_LANG_SI_SLOVENIAN_TITLE"),
    'za' => GetMessage("LC_LANG_ZA_ENGLISH_SOUTH_AFRICA_TITLE"),
    'es' => GetMessage("LC_LANG_ES_SPANISH_TITLE"),
    'cn' => GetMessage("LC_LANG_CN_CHINESE_STANDARD_TITLE"),
    'se' => GetMessage("LC_LANG_SE_SWEDISH_TITLE"),
    'tj' => GetMessage("LC_LANG_TJ_TAJIK_TITLE"),
    'th' => GetMessage("LC_LANG_TH_THAI_TITLE"),
    'tr' => GetMessage("LC_LANG_TR_TURKISH_TITLE"),
    'tm' => GetMessage("LC_LANG_TM_TURKMEN_TITLE"),
    'ua' => GetMessage("LC_LANG_UA_UKRAINIAN_TITLE"),
    'uz' => GetMessage("LC_LANG_UZ_UZBEK_TITLE"),
    'vn' => GetMessage("LC_LANG_VN_VIETNAMESE_TITLE")
);

if(class_exists('CLanguage')){
    $rsLangs = CLanguage::GetList($by,$order,array());

    while($arLang = $rsLangs->getNext()){
        if(!isset($arAccorsysLocaleLangsTitle[$arLang["LID"]])){
            $arAccorsysLocaleLangsTitle[$arLang["LID"]] = $arLang["NAME"];
        }
    }
}