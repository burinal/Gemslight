<?
class Accorsys_localization_CIBlockPropertyText {

    function GetUserTypeDescription()
    {
        return array(
            "PROPERTY_TYPE"		=> "S",
            "USER_TYPE"			=> "locale_text",
            "DESCRIPTION"		=> GetMessage("LC_EXTENSION_NAME").'. '.GetMessage("LC_IBLOCK_PROPERTY_TRANSLATION"),
            "GetPropertyFieldHtml"	=> array("Accorsys_localization_CIBlockPropertyText","GetPropertyFieldHtml"),
            "ConvertToDB"		=> array("Accorsys_localization_CIBlockPropertyText","ConvertToDB"),
            "ConvertFromDB"		=> array("Accorsys_localization_CIBlockPropertyText","ConvertFromDB")
        );
    }

    function GetPropertyFieldHtml($arProperty, $value, $strHTMLControlName)
    {
        $locale = new CLocale();
        $GLOBALS['isAddedAccorsysLineScript'] = true;
        $locale->OnPrologHandler(true);
        $content = '
            <div class="locale-block admin-locale-block">
                <div class="locale-select">
                    <textarea class="js-clearOrNotTextareaLang" style="float:left;height:100px!important;margin:0px;resize: none;" name="'.$strHTMLControlName["VALUE"].'" data-lang="" style="height:55px;width:261px;">'.$value['VALUE'].'</textarea>
                    <div style="position:relative;" class="locale-click-wrapper">
                        <a class="locale-click-arrow" href="#" title="'.GetMessage('LC_ADDITIONAL_ACTIONS').'"></a>
                        <div class="locale_popup" style="display: none;">
                            <span style="/*right: 10px;*/" class="locale_popup_angle"></span>
                            <ul>
                                <li><a class="g_translate" href="#"><span class="span-icon icon-google">'.GetMessage('LC_USE_GOOGLE_TRANSLATE').'</span></a></li>
                                <li><a class="microsoft_translate" href="#"><span class="span-icon icon-microsoft">'.GetMessage('LC_USE_MICROSOFT_TRANSLATOR').'</span></a></li>
                                <li><a class="y_translate" href="#"><span class="span-icon icon-ya">'.GetMessage('LC_USE_YANDEX_TRANSLATE').'</span></a></li>
                                <li class="locale_popup_separator" style="display:block;"><!-- --></li>
                                <li><a class="wiki" href="#"><span class="span-icon icon-wiki">'.GetMessage('LC_FIND_IN_WIKI').'</span></a></li>
                                <li><a class="youtube" href="#"><span class="span-icon icon-youtube">'.GetMessage('LC_FIND_IN_YOUTUBE').'</span></a></li>
                                <li class="locale_popup_separator" style="display: none;"></li>
                                <li style="display: none;"><a class="undo" href="#"><span class="span-icon icon-undo">'.GetMessage('LC_CANCEL').'</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="clr"></div>
                </div>
            </div>
            <script>
                $(function(){
                    $(".locale-select").each(function(){
                        if(!$(this).hasClass("script-added")){
                            $(this).addKeyupLocaleHandler().addLocaleFormHandlers();
                        }
                    });
                });
            </script>

        ';

        return $content;
    }


    function ConvertToDB($arProperty, $value)
    {
        $return["VALUE"] = $value['VALUE'];
        $return["DESCRIPTION"] = "LocaleText";

        return $return;
    }

    function ConvertFromDB($arProperty, $value)
    {
        $return["VALUE"] = $value["VALUE"];
        return $return;
    }

}
