<?
class Accorsys_localization_CIBlockPropertyPath {

    function GetUserTypeDescription()
    {
        return array(
            "PROPERTY_TYPE"		=> "S",
            "USER_TYPE"			=> "locale_path",
            "DESCRIPTION"		=> GetMessage("LC_EXTENSION_NAME").'. '.GetMessage("LC_TRANSLATION_FILE"),
            "GetPropertyFieldHtml"	=> array("Accorsys_localization_CIBlockPropertyPath","GetPropertyFieldHtml"),
            "ConvertToDB"		=> array("Accorsys_localization_CIBlockPropertyPath","ConvertToDB"),
            "ConvertFromDB"		=> array("Accorsys_localization_CIBlockPropertyPath","ConvertFromDB")
        );
    }

    function GetPropertyFieldHtml($arProperty, $value, $strHTMLControlName)
    {
        CJSCore::Init(array("jquery"));
        $content = "";
        if(trim($value['VALUE']) != ""){
            $content = "
            <a
               click=\"
                $('.show_lang_file').click(function(){
					var name = $('#tr_NAME input[name=NAME]').val();

                    jsUtils.OpenWindow(this.href+'#'+name, 800, 600);
                    return false;
                });
               \"
               class='show_lang_file'
               href='/bitrix/admin/lang_file_view.php?path=".urlencode($value['VALUE'])."&full_src=Y&site=s1&lang=ru&&filter=Y&set_filter=Y'
            >".$value['VALUE']."</a>
            <input type='hidden' name='".$strHTMLControlName["VALUE"]."' value='".$value['VALUE']."'></input>
            <script>

            </script>";
        }

        return $content;
    }


    function ConvertToDB($arProperty, $value)
    {
        $return["VALUE"] = $value['VALUE'];
        $return["DESCRIPTION"] = "LocalePath";

        return $return;
    }

    function ConvertFromDB($arProperty, $value)
    {
        $return["VALUE"] = $value["VALUE"];
        return $return;
    }

}
