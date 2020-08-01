<?
class Accorsys_localization_CIBlockPropertyLang {

	function GetUserTypeDescription()
	{
		return array(
			"PROPERTY_TYPE"		=> "S",
			"USER_TYPE"			=> "locale_lang",
			"DESCRIPTION"		=> GetMessage("LC_EXTENSION_NAME").'. '.GetMessage("LC_IBLOCK_PROPERTY_LANGUAGE"),
			"GetPropertyFieldHtml"	=> array("Accorsys_localization_CIBlockPropertyLang","GetPropertyFieldHtml"),
			"ConvertToDB"		=> array("Accorsys_localization_CIBlockPropertyLang","ConvertToDB"),
			"ConvertFromDB"		=> array("Accorsys_localization_CIBlockPropertyLang","ConvertFromDB")
		);
	}

	function GetPropertyFieldHtml($arProperty, $value, $strHTMLControlName)
	{
        CJSCore::Init(array("jquery"));
        $dbLangs = CLanguage::GetList($by,$sort,array());
        include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
        include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs_title.php');
        include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_aliases_for_translate.php');

        while($arLang = $dbLangs->getNext()){
            $arSystemLangs[$arLang["LID"]] = $arAccorsysLocaleLangs[$arLang["LID"]].' ('.strtoupper($arLang["LID"]).') - '.$arAccorsysLocaleLangsTitle[$arLang["LID"]];
        }
        asort($arSystemLangs);
        $content = "";
        if(trim($value['VALUE']) != ""){
            $content = "
            <select class='change-lang-select' name='".$strHTMLControlName["VALUE"]."'>";
                foreach($arSystemLangs as $LID => $LANG_NAME){
                    $content .= '<option '.($LID == $value["VALUE"] ? " selected ":"").' data-lang="'.$arAliasLangsForTranslate[$LID].'" value="'.$LID.'">'.$LANG_NAME.'</option>';
                }
            $content .= "</select>
            <script>
                $(function(){
                    $('.locale-block .locale-select textarea').attr('data-lang', $('.change-lang-select option:selected').attr('data-lang'));
                    $('.change-lang-select').change(function(){
                        var arHrefText = $('.show_lang_file').siblings('input:first').val().split('/');
                        for(var i = 0;i < arHrefText.length;i++){
                            if(arHrefText[i].length == 4 && arHrefText[i] == 'lang'){
                                arHrefText[i+1] = $(this).val();
                                var hrefText = arHrefText.join('/');
                                $('.show_lang_file').attr('href',hrefText);
                                $('.show_lang_file').html(hrefText);
                                $('.show_lang_file').siblings('input:first').val(hrefText);
                            }
                        }
                        $('.locale-block .locale-select textarea').attr('data-lang', $('.change-lang-select option:selected').attr('data-lang'));
                    });
                });
            </script>";
        }

		return $content;
	}
	

	function ConvertToDB($arProperty, $value)
	{
		$return["VALUE"] = $value['VALUE'];
        $return["DESCRIPTION"] = "LocaleLang";

		return $return;
	}

	function ConvertFromDB($arProperty, $value)
	{
		$return["VALUE"] = $value["VALUE"];
		return $return;
	}

}
