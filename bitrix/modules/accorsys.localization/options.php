<?php
$module_id = "accorsys.localization";

CLocale::includeLocaleLangFiles();
$HS_RIGHT = $APPLICATION->GetGroupRight($module_id);

if ($HS_RIGHT >="R"):
CModule::IncludeModule("iblock");
CModule::IncludeModule($module_id);
$isWorkflowModule = CModule::IncludeModule("workflow");
$APPLICATION->AddHeadString('<link rel="stylesheet" type="text/css" href="/bitrix/js/accorsys.localization/flags.css.php">');
$APPLICATION->AddHeadString('<script type="text/javascript" src="/bitrix/js/accorsys.localization/history.js.php"></script>');
CopyDirFiles($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/images", $_SERVER["DOCUMENT_ROOT"]."/bitrix/images", false, true);
CJSCore::Init(array("jquery"));
$dbSites = CSite::GetList($by = "sort", $order = "asc");
while($arSite = $dbSites->fetch()){
    $arSites[$arSite["LID"]] = $arSite;
}
$arAllOptionsGroup = array();
$rsGroups = CGroup::GetList($by = "c_sort", $order = "asc", array());

if(intval($rsGroups->SelectedRowsCount()) > 0)
{
    while($arGroup = $rsGroups->Fetch())
    {
        $arGroups[$arGroup["ID"]] = $arGroup["NAME"];
    }
}

$dbLangList = CLanguage::GetList($by,$order);

while($arLang = $dbLangList->getNext()){
    if(isset($arLang["LID"])){
        $arConstLangs[] = $arLang;
    }
}

if(!$isWorkflowModule){
    include($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/default_option.php');
    $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));

    foreach($lcTempSettings['arGroupValues'] as $key => $value){
        $lcTempSettings['arGroupValues'][$key] = $key;
    }

    COption::SetOptionString("accorsys.localization","arGroupValues",serialize($lcTempSettings['arGroupValues']));

    file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini", serialize($lcTempSettings));
}

if($REQUEST_METHOD=="POST" && $HS_RIGHT >= "W" && check_bitrix_sessid())
{
	if(strlen($RestoreDefaults)>0)
	{
        include($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/default_option.php');
        $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));

        $lcTempSettings['arGroupValues'] = array(1 => 1);
        COption::SetOptionString("accorsys.localization","arGroupValues",serialize($lcTempSettings['arGroupValues']));

        $lcTempSettings['gtranslate_api_key'] = "";
        COption::SetOptionString("accorsys.localization","gtranslate_api_key", $lcTempSettings['gtranslate_api_key']);

        $lcTempSettings['ytranslate_api_key'] = "";
        COption::SetOptionString("accorsys.localization","ytranslate_api_key", $lcTempSettings['ytranslate_api_key']);

        $lcTempSettings['microsoftTranslatorCliendID'] = "";
        COption::SetOptionString("accorsys.localization","microsoftTranslatorCliendID", $lcTempSettings['microsoftTranslatorCliendID']);

        $lcTempSettings['microsoftTranslatorCliendSecret'] = "";
        COption::SetOptionString("accorsys.localization","microsoftTranslatorCliendSecret", $lcTempSettings['microsoftTranslatorCliendSecret']);

        $lcTempSettings['wiki_url_tpl'] = $localization_default_option['wiki_url_tpl'];
        COption::SetOptionString("accorsys.localization","wiki_url_tpl", $lcTempSettings['wiki_url_tpl']);

        $lcTempSettings['ytube_url_tpl'] = $localization_default_option['ytube_url_tpl'];
        COption::SetOptionString("accorsys.localization","ytube_url_tpl", $lcTempSettings['ytube_url_tpl']);

        $arLangsForIndexes = array();
        foreach($lcTempSettings['accorsysSiteLang'] as $indexSiteID => $arIndexLangs){
            foreach($arIndexLangs as $lang){
                if(trim($lang) != "")
                    $arLangsForIndexes[$lang] = $lang;
            }
        }

        foreach($arLangsForIndexes as $value){
            COption::SetOptionString("accorsys.localization",'index_lang_'.$value,'Y');
        }

        $lcTempSettings['idexesIncludePath'] = array();
        $lcTempSettings['idexesIncludePath'][] = '/bitrix/modules/main/lang/en/tools.php';
        $lcTempSettings['idexesIncludePath'][] = '/bitrix/modules/main/lang/ru/tools.php';

        COption::SetOptionString("accorsys.localization","idexesIncludePath",serialize($lcTempSettings['idexesIncludePath']));

        file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini", serialize($lcTempSettings));
    }
	else
	{

        $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
        $lcTempSettings['gtranslate_api_key'] = $_REQUEST['gtranslate_api_key'];
        COption::SetOptionString("accorsys.localization","gtranslate_api_key", $lcTempSettings['gtranslate_api_key']);

        $lcTempSettings['ytranslate_api_key'] = $_REQUEST['ytranslate_api_key'];
        COption::SetOptionString("accorsys.localization","ytranslate_api_key", $lcTempSettings['ytranslate_api_key']);

        $lcTempSettings['gtranslate_url_tpl'] = $_REQUEST['gtranslate_url_tpl'];
        COption::SetOptionString("accorsys.localization","gtranslate_url_tpl", $lcTempSettings['gtranslate_url_tpl']);

        $lcTempSettings['ytranslate_url_tpl'] = $_REQUEST['ytranslate_url_tpl'];
        COption::SetOptionString("accorsys.localization","ytranslate_url_tpl", $lcTempSettings['ytranslate_url_tpl']);

        $lcTempSettings['wiki_url_tpl'] = $_REQUEST['wiki_url_tpl'];
        COption::SetOptionString("accorsys.localization","wiki_url_tpl", $lcTempSettings['wiki_url_tpl']);

        $lcTempSettings['ytube_url_tpl'] = $_REQUEST['ytube_url_tpl'];
        COption::SetOptionString("accorsys.localization","ytube_url_tpl", $lcTempSettings['ytube_url_tpl']);

        $lcTempSettings['translated_text_color'] = $_REQUEST['translated_text_color'];
        COption::SetOptionString("accorsys.localization","translated_text_color", $lcTempSettings['translated_text_color']);

        $lcTempSettings['delete_from_files'] = $_REQUEST['delete_from_files'];
        COption::SetOptionString("accorsys.localization","delete_from_files", $lcTempSettings['delete_from_files']);

        $lcTempSettings['microsoftTranslatorCliendID'] = $_REQUEST['microsoftTranslatorCliendID'];
        COption::SetOptionString("accorsys.localization","microsoftTranslatorCliendID", $lcTempSettings['microsoftTranslatorCliendID']);

        $lcTempSettings['microsoftTranslatorCliendSecret'] = $_REQUEST['microsoftTranslatorCliendSecret'];
        COption::SetOptionString("accorsys.localization","microsoftTranslatorCliendSecret", $lcTempSettings['microsoftTranslatorCliendSecret']);
        $lcSettings['notUsedIBlocksConstants'] = 'reWrite';

        foreach($arSites as $siteLID => $site){
            $lcTempSettings['isNeedLangSwitcher'][$siteLID] = isset($_REQUEST['isNeedLangSwitcher'][$siteLID]) ? "on":"off";
            COption::SetOptionString("accorsys.localization","isNeedLangSwitcher[".$siteLID."]", $lcTempSettings['isNeedLangSwitcher'][$siteLID]);
        }

        if(isset($_REQUEST['alias_langs'])){
            $lcTempSettings['alias_langs'] = $_REQUEST['alias_langs'];
            foreach($_REQUEST['alias_langs'] as $aliasSite => $aliasLangs){
                foreach($aliasLangs as $aliasKey => $aliasValues){
                    if(trim($aliasValues['mainURL']) == "")
                        unset($lcTempSettings['alias_langs'][$aliasSite][$aliasKey]);
                }
            }
        }
        if(isset($_REQUEST['accorsysSiteLang'])){
            foreach($_REQUEST['accorsysSiteLang'] as $siteID => $arLangs){
                foreach($arLangs as $lang){
                    if(!isset($lcTempSettings['accorsysSiteLang'][$siteID][$lang]))
                        $_REQUEST['index_lang_'.$lang] = 'Y';

                    $arTempLangsSite[$siteID][$lang] = $lang;
                }
            }
            $lcTempSettings['accorsysSiteLang'] = $arTempLangsSite;
        }

        include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
        $arLangs = $arAccorsysLocaleLangs;
        $rsLangs = CLanguage::getList($by,$order);
        while($lang = $rsLangs->getNext()){
            $arSystemLangs[$lang["LID"]] = $lang["NAME"];
        }
        $objLang = new CLanguage;

        CLocale::includeLocaleLangFiles('en');
        $GLOBALS['accorsysLocalizationNeedCustomLang'] = true;
        include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/array_locale_langs.php');
        $forSystemLangs = $arAccorsysLocaleLangs;
        $GLOBALS['accorsysLocalizationNeedCustomLang'] = false;
        CLocale::includeLocaleLangFiles();

        foreach($lcTempSettings['accorsysSiteLang'] as $siteLangID =>  $arSitelang){
            $arSite = CSite::GetByID($siteLangID)->fetch();
            foreach($arSitelang as $lang){
                if(trim($lang) != "" && !isset($arSystemLangs[$lang])){
                    $arLangFields = array(
                        "LID" => $lang,
                        "ACTIVE" => "Y",
                        "SORT" => "100",
                        "DEF" => "N",
                        "NAME" => $forSystemLangs[$lang],
                        "FORMAT_DATE" => $arSite["FORMAT_DATE"],
                        "FORMAT_DATETIME" => $arSite["FORMAT_DATETIME"],
                        "CHARSET" => $arSite["CHARSET"],
                        "CULTURE_ID" => $arSite["CULTURE_ID"]
                    );
                    $objLang->Add($arLangFields);
                    if (strlen($objLang->LAST_ERROR)>0)
                        $strError .= $objLang->LAST_ERROR;
                }
            }
        }
        if(isset($_REQUEST['arAdditionalLangsChanger'])){
            if(trim($siteLangID) == ""){
                $dbSite = CSite::GetList($by,$order,array());
                $arSite = $dbSite->fetch();
            }else{
                $arSite = CSite::GetByID($siteLangID)->fetch();
            }
            foreach($_REQUEST['arAdditionalLangsChanger'] as $lang){
                if(trim($lang) != "" && !isset($arSystemLangs[$lang])){
                    $arLangFields = array(
                        "LID" => $lang,
                        "ACTIVE" => "Y",
                        "SORT" => "100",
                        "DEF" => "N",
                        "NAME" => $forSystemLangs[$lang],
                        "FORMAT_DATE" => $arSite["FORMAT_DATE"],
                        "FORMAT_DATETIME" => $arSite["FORMAT_DATETIME"],
                        "CHARSET" => $arSite["CHARSET"],
                        "CULTURE_ID" => $arSite["CULTURE_ID"]
                    );
                    $objLang->Add($arLangFields);
                    if (strlen($objLang->LAST_ERROR)>0)
                        $strError .= $objLang->LAST_ERROR;
                }
            }
        }


        COption::SetOptionString("accorsys.localization","accorsysSiteLang",serialize($lcTempSettings['accorsysSiteLang']));

        $lcTempSettings['arGroupValues'] = $_REQUEST['arGroupValues'];
        COption::SetOptionString("accorsys.localization","arGroupValues",serialize($lcTempSettings['arGroupValues']));

        $lcTempSettings['idexesIncludePath'] = $_REQUEST['idexesIncludePath'];
        foreach($lcTempSettings['idexesIncludePath'] as $key => $path){
            if(trim($path) == ""){
                unset($lcTempSettings['idexesIncludePath'][$key]);
            }
        }
        COption::SetOptionString("accorsys.localization","idexesIncludePath",serialize($lcTempSettings['idexesIncludePath']));

        $lcTempSettings['defaultIntefaceLanguage'] = $_REQUEST['defaultIntefaceLanguage'];
        COption::SetOptionString("accorsys.localization","defaultIntefaceLanguage", serialize($lcTempSettings['defaultIntefaceLanguage']));

        CLocale::includeLocaleLangFiles();
        $lcTempSettings['idexesExcludePath'] = $_REQUEST['idexesExcludePath'];
        foreach($lcTempSettings['idexesExcludePath'] as $key => $path){
            if(trim($path) == ""){
                unset($lcTempSettings['idexesExcludePath'][$key]);
            }
        }
        COption::SetOptionString("accorsys.localization","idexesExcludePath",serialize($lcTempSettings['idexesExcludePath']));

        $arLangsForIndexes = array();
        foreach($lcTempSettings['accorsysSiteLang'] as $indexSiteID => $arIndexLangs){
            foreach($arIndexLangs as $lang){
                if(trim($lang) != "")
                    $arLangsForIndexes[$lang] = $lang;
            }
        }

        foreach($arLangsForIndexes as $value){
            if(isset($_REQUEST['index_lang_'.$value])){
                COption::SetOptionString("accorsys.localization",'index_lang_'.$value,'Y');
            }else{
                COption::RemoveOption("accorsys.localization",'index_lang_'.$value);
            }
        }

        $lcTempSettings['arConstants'] = $_REQUEST['arConstants'];
        foreach($lcTempSettings['arConstants'] as $siteID => $arConstants){
            foreach($arConstants as $constName => $constLangs){
                $isNeedConsts = false;
                foreach($constLangs as $val){
                    if(trim($val) != ""){
                        $isNeedConsts = true;
                    }
                }
                if(!$isNeedConsts){
                    unset($lcTempSettings['arConstants'][$siteID][$constName]);
                }
            }
        }
        file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini", serialize($lcTempSettings));
    }
}else{
    $lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
}
$countUsers = 0;
$arCountUsers = array();
$obUser = new CAccorsysExtensionsUser("accorsys.localization");
foreach($lcTempSettings['arGroupValues'] as $groupID => $isDoc){
    foreach(CGroup::GetGroupUser($groupID) as $user){
        $arCountUsers[$user] = $user;
    }
}

$countUsers = count($arCountUsers);
if((int)$countUsers > (int)$obUser->userCount){
    $arRecomendations['recomendations'][5]['needMoreUserLisence'] = str_replace(array("#USER_COUNT#",'#USER_COUNT_BUY#','#USER_COUNT_DIFF#'),array("<span>".$countUsers."</span>","<span>".$obUser->userCount."</span>","<span>".($countUsers - $obUser->userCount)."</span>"),GetMessage("LC_INAPP_PURCHASES_REMINDER"));
}

$obAccess = new CAccorsysExtensionsAccess("accorsys.localization");
$arDaysToLeft = $obAccess->daysToLeftModule("accorsys.localization");
$arDaysToLeft["DAYS_LEFT"] = (int)$arDaysToLeft["DAYS_LEFT"];
if($arDaysToLeft["DAYS_LEFT"] < 30){
    if($arDaysToLeft["IS_TRIAL"]){
        $arRecomendations['recomendations'][5]['trialDaysLeft'] = str_replace("#DAYS_LEFT#","<span>".$arDaysToLeft["DAYS_LEFT"]."</span>",GetMessage("LC_TRIAL_PERIOD_DAYS_LEFT"));
    }elseif($arDaysToLeft["DAYS_LEFT"] < 0){
        $arRecomendations['recomendations'][5]['daysLeft'] = str_replace(array("#USER_COUNT_BUY#",'#DAYS_LEFT#'),array($obUser->userCount, "<span>".$arDaysToLeft["DAYS_LEFT"]."</span>"),GetMessage("LC_UPDATE_SUBSCRIPTION_EXPIRED"));
    }else{
        $arRecomendations['recomendations'][5]['daysLeft'] = str_replace("#DAYS_LEFT#","<span>".$arDaysToLeft["DAYS_LEFT"]."</span>",GetMessage("->LC_UPDATE_SUBSCRIPTION_RENEW"));
    }
}

?>
   <div id="tabControl_layout" class="adm-detail-block">
       <div id="tabControl_tabs" class="adm-detail-tabs-block" >
           <span data-select-tab="langs" class="adm-detail-tab adm-detail-tab-active" id="tab_cont_langs"><?=GetMessage("LC_LANGS")?></span>
           <span data-select-tab="url_controller" class="adm-detail-tab adm-detail-tab-last" id="tab_cont_url_controller"><?=GetMessage("LC_LANGUAGE_SWITCHING_SETTINGS")?></span>
           <span data-select-tab="iblocks" class="adm-detail-tab adm-detail-tab-last" id="tab_cont_iblocks"><?=GetMessage("LC_CONSTANTS_SETTINGS")?></span>
           <span data-select-tab="indexing" class="adm-detail-tab adm-detail-tab-last" id="tab_cont_indexing"><?=GetMessage("LC_INDEXING")?></span>
           <span data-select-tab="permissions" class="adm-detail-tab adm-detail-tab-last" id="tab_cont_permissions"><?=GetMessage("LC_ACCESS_SETTINGS")?></span>
           <span data-select-tab="general" class="adm-detail-tab adm-detail-tab-last" id="tab_cont_general"><?=GetMessage("LC_DEFAULT_SETTINGS")?></span>
           <div id="tabControl_expand_link" title="<?=GetMessage("LC_ROLL_UP_ALL_TABS")?>" class="adm-detail-title-setting">
               <span class="adm-detail-title-setting-btn adm-detail-title-expand"></span>
           </div>
       </div>
       <div class="adm-detail-content-wrap">
           <form id="option-form" action="" method="post">
               <div id="langs" class="adm-detail-content">
                   <?include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/option_sections/languages.php');?>
               </div>
               <div id="url_controller" class="adm-detail-content">
                   <?include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/option_sections/url_controller.php');?>
               </div>
               <div id="iblocks" class="adm-detail-content">
                   <?include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/option_sections/iblocks.php');?>
               </div>
               <div id="indexing" class="adm-detail-content">
                   <?include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/option_sections/indexing.php');?>
               </div>
               <div id="permissions" class="adm-detail-content">
                   <?include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/option_sections/permissions.php');?>
               </div>
               <div id="general" class="adm-detail-content">
                   <?include($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/option_sections/general.php');?>
               </div>
               <?if(isset($arRecomendations['recomendations'])){?>
                   <center style="width:100%">
                       <div class="adm-info-message">
                           <h4>
                               <?=GetMessage("LC_RECOMMENDED_ACTIONS")?>
                           </h4>
                           <ul <?=count($arRecomendations['recomendations'],true) == 2 ? 'class="non-bullit"':''?>>
                               <?foreach($arRecomendations['recomendations'] as $arReccomend){
                                   foreach($arReccomend as $key => $rec){
                                       ?>
                                       <li class="accorsys-rec-<?=$key?>">
                                           <?=$rec?>
                                       </li>
                                   <?
                                   }
                               }?>
                           </ul>
                       </div>
                   </center>
               <?}?>
                <div id="tabControl_buttons_div" class="adm-detail-content-btns-wrap adm-detail-content-btns-pin">
                   <div class="adm-detail-content-btns">
                       <input class="adm-btn-save" type="submit" title="<?=GetMessage("LC_SAVE_CHANGES")?>" value="<?=GetMessage("LC_SAVE_CHANGES")?>" name="Update">
                       <input style="float:right; margin-right: 0;" type="submit" value="<?=GetMessage("LC_RESTORE_DEFAULTS")?>" onclick="return confirm('<?=GetMessage("LC_WARNING_RESTORE_DEFAULTS")?>') ? true:false" title="<?=GetMessage("LC_RESTORE_DEFAULTS")?>" name="RestoreDefaults">
                       <?=bitrix_sessid_post()?>
                   </div>
               </div>
           </form>
       </div>
   </div>
<script>
   $(function(){
       if(cpHash.get().open_tab){
           selectTab(cpHash.get().open_tab);
       }
       $('span.adm-detail-tab').click(function(){
           if($(this).hasClass('adm-detail-tab-disable'))
               return false;
           selectTab($(this).attr('data-select-tab'));
       });
       function selectTab(tabID){
           $('span.adm-detail-tab').removeClass('adm-detail-tab-active');
           $('#tab_cont_'+tabID).addClass('adm-detail-tab-active');
           $('.adm-detail-content-wrap form > div.adm-detail-content').hide();
           $('.adm-detail-content-wrap div#'+tabID).show();
           cpHash.remove('open_tab');
           cpHash.add('open_tab',tabID);
       }
       $('#tabControl_expand_link').click(function(){
           if($('span.adm-detail-tab').hasClass('adm-detail-tab-disable')){
               $(this).removeClass('adm-detail-title-setting-active');
               $('span.adm-detail-tab').removeClass('adm-detail-tab-disable');
               $('.adm-detail-content-wrap form > div.adm-detail-content').hide();
               $('.adm-detail-content-wrap div#'+$('.adm-detail-tab-active').attr('data-select-tab')).show();
           }else{
               $(this).addClass('adm-detail-title-setting-active');
                $('span.adm-detail-tab').addClass('adm-detail-tab-disable');
                $('.adm-detail-content-wrap form > div.adm-detail-content').show();
            }

        });

        /*start lagsTab*/
        $('#select_all_extend').change(function(){
            if($(this).attr('checked') == "checked"){
                $('.addlang-container-inactive').find('input[type="checkbox"]').each(function(){
                    if(!$(this).attr('disabled')){
                        $(this).attr("checked",true);
                    }
                });
            }else{
                $('.addlang-container-inactive').find('input[type="checkbox"]').attr("checked",false);
            }
        });
        $('#select_all_defaults').change(function(){
            if($(this).attr('checked') == "checked"){
                $('.addlang-container-active').find('input[type="checkbox"]').each(function(){
                    if($(this).attr('issystem') != 'system')
                        $(this).attr("checked",true);
                });
            }else{
                $('.addlang-container-active').find('input[type="checkbox"]').attr("checked",false);
            }
        });
        $('tr').mouseenter(function(){return false;});

        $('.site-lang-select-block').each(function(){
            $(this).find('select').change(function(){
                onChangeSelectLang(this);
            });
        });

        $('#button-withdraw').click(function(){
            $('.addlang-container-inactive .container-checkbox').find('input[type="checkbox"]:checked').each(function(){
                $(this).attr("checked",false);
                $(this).parents('.checkbox-wrap:first').prependTo('.addlang-container-active .container-checkbox');
                stringNewOptions = '<option class="'+ $(this).attr("langid") +'" value="' + $(this).attr("langid") + '">'+ $(this).attr("langtext") +'</option>';
                $('.site-lang-select-block .select-wrap select').append($(stringNewOptions));
            });
            notSelectedAdditionLangsChanger();
            switchLanguageChangeState();
            $('#select_all_extend').attr('checked',false);
        });
        $('#button-add').click(function(){
            $('.addlang-container-active .container-checkbox').find('input[type="checkbox"]:checked').each(function(){
                $(this).attr("checked",false);
                if($(this).attr('issystem') != 'system'){
                    $(this).parents('.checkbox-wrap:first').prependTo('.addlang-container-inactive .container-checkbox');
                    $('.ico-flag-'+$(this).attr("langid").toUpperCase()).each(function(){
                        $(this).parents('.select-wrap:first').remove();
                    });

                    $('option.'+$(this).attr("langid")).remove();
                }
            });
            notSelectedAdditionLangsChanger();
            switchLanguageChangeState();
        });

       function notSelectedAdditionLangsChanger(){
           $('.inputs-additional-langs-changer').empty();
           var isNotUsed = true;
           $('.addlang-container-active .checkbox-wrap').each(function(){
               var curCheckbox = $(this).find('input[type="checkbox"]');
               if(curCheckbox.attr('issystem') != 'system'){
                   $('.inputs-additional-langs-changer').append(
                       '<input type="hidden" value="'+ curCheckbox.attr('langid') +'" name="arAdditionalLangsChanger['+ curCheckbox.attr('langid') +']">'
                   );
                   isNotUsed = false;
               }
           });
           if(!isNotUsed){
               $('<input type="hidden" value="nothing" name="arAdditionalLangsChanger">');
           }
       }

        switchLanguageChangeState();
        function switchLanguageChangeState(){
            $('.addlang-container-inactive .countlangs').html('('+($('.addlang-container-inactive .container-checkbox input[type="checkbox"]').length - $('.addlang-container-inactive .container-checkbox input[type="checkbox"][disabled="true"]').length)+')');
            $('.addlang-container-active .countlangs').html('('+$('.addlang-container-active .container-checkbox input[type="checkbox"]').length+')');

            if($('.addlang-container-active .additional-langs').length == 0){
                $('#button-add').addClass('disabled');
                $('#select_all_defaults').attr('disabled',true);
                $('#select_all_defaults').attr('checked',false);
            }else{
                $('#button-add').removeClass('disabled');
                $('#select_all_defaults').attr('disabled',false);
            }
            if($('.addlang-container-inactive .additional-langs').length == 0){
                $('#button-withdraw').addClass('disabled');
                $('#select_all_extend').attr('disabled',true);
                $('#select_all_extend').attr('checked',false);
            }else{
                $('#button-withdraw').removeClass('disabled');
                $('#select_all_extend').attr('disabled',false);
            }
            $('.choise-langs-table tbody tr').each(function(){
                hideSelectedLanguages($(this).find('.select-wrap select').last());
            });
        }
        function hideSelectedLanguages(curSelect){
            var availableLangs = {};
            var selectedLangs = {};
            $('.addlang-container-active .container-checkbox .adm-checkbox').each(function(){
                if($(this).attr('langid'))
                    availableLangs[$(this).attr('langid')] = $(this).attr('langtext');
            });
            $(curSelect).parents('td:first').find('select').each(function(){
                if($(this).val() != ""){
                    selectedLangs[$(this).val()] = 'Y';
                }
            });
            selectedLangs[$(curSelect).closest('tr').find('.default_language input').val()] = 'Y';
            $(curSelect).parents('td:first').find('select').each(function(){
                var curSelect = $(this);
                $(curSelect).parents('td:first').find('select').each(function(){
                    if(curSelect.get(0) !== this && curSelect.val() != ""){
                        $(this).find('option.' + curSelect.val()).remove();
                    }
                });
            });
            for(var lang in availableLangs){
                if(!selectedLangs[lang]){
                    $(curSelect).parents('td:first').find('select').each(function(){
                        if(!$(this).find('option.'+lang).get(0))
                            $(this).append('<option class="'+lang+'" value="'+lang+'">'+availableLangs[lang]+'</option>');
                    });
                }
            }
            if(Object.keys(selectedLangs).length >= Object.keys(availableLangs).length){
               $(curSelect).parents('td:first').find('select').last().parents('.select-wrap').hide();
            }else{
               $(curSelect).parents('td:first').find('select').last().parents('.select-wrap').show();
            }
        }

        function onChangeSelectLang(changedselect){
            var tempSelect = $(changedselect).parents('tr:first').find('.site-lang-select-block .select-wrap').last().clone(true,true);
            if($.trim($(changedselect).val()) == ""){
                var siblingSelect = $(changedselect).parents('td:first').find('select').last();
                $(changedselect).parents('.select-wrap').remove();
                hideSelectedLanguages(siblingSelect);
                return false;
            }
            $(changedselect).parents('.select-wrap:first').find('.flag-container-default-lang > span:first').attr("class",'ico-flag-' + $(changedselect).val().toUpperCase());
            if($(changedselect).hasClass("used")){
                hideSelectedLanguages(changedselect);
                return false;
            }

            var newSelect = tempSelect.clone(true,true);
            $(changedselect).addClass('used');
            var toSite = $(changedselect).parents('.site-lang-select-block:first').find('select:first').attr('name');
            newSelect.find('select:first').attr("name",toSite);
            $(changedselect).parents('.select-wrap:first').after(newSelect);
            hideSelectedLanguages(changedselect);
        }
        /*end lagsTab*/

        /*start group-access*/
       function hideSelectedGroups(){
           var groupTable = $('table.data-group');
           var selectedGroups = {};
           groupTable.find('select.select-group').each(function(){
               if($(this).val() != "delete" && $(this).val() != "default"){
                   selectedGroups[$(this).val()] = 'Y';
               }
           });
           groupTable.find('select.select-group').each(function(){
               var curSelect = $(this);
               groupTable.find('select.select-group').each(function(){
                   if(curSelect.get(0) !== this && curSelect.val() != "delete"){
                       $(this).find('option[value="' + curSelect.val()+'"]').remove();
                   }
               });
           });
           for(var groupID in availableGroups){
               if(!selectedGroups[groupID]){
                   groupTable.find('select.select-group').each(function(){
                       if(!$(this).find('option[value="'+groupID+'"]').get(0) && $(this).find('option[value="delete"]').get(0))
                           $(this).find('option[value="delete"]').after('<option value="'+groupID+'">'+availableGroups[groupID]+'</option>');
                       if(!$(this).find('option[value="'+groupID+'"]').get(0) && $(this).find('option[value="default"]').get(0))
                        $(this).find('option[value="default"]').after('<option value="'+groupID+'">'+availableGroups[groupID]+'</option>');
                   });
               }
           }
           if(Object.keys(selectedGroups).length >= Object.keys(availableGroups).length){
               groupTable.find('select.select-group').last().parents('tr:first').hide();
           }else{
               groupTable.find('select.select-group').last().parents('tr:first').show();
           }
       }
        $('.user-interface-lang select').change(function(){
            $(this).siblings('span.flag-container-default-lang').find('span').attr("class",'ico-flag-' + $(this).val().toUpperCase());
        });
        $('.tempGroups').appendTo('body');
        var availableGroups = {};
        $('.tempGroups select.select-group:first option').each(function(){
           if($(this).val() != 'delete' && $(this).val() != 'default')
               availableGroups[$(this).val()] = $(this).text();
        });
        $('.group-access select.select-group').change(function(){
            onChangeSelectGroup($(this));
        });
        hideSelectedGroups();
        function onChangeSelectGroup(changedSelect){
            if($.trim($(changedSelect).val()) == "delete"){
                $(changedSelect).parents('tr:first').remove();
                hideSelectedGroups();
                return false;
            }
            if($.trim($(changedSelect).val()) == "default"){
                hideSelectedGroups();
                return false;
            }

            var newTr = $('.locale-group-tr-id-'+$(changedSelect).val()).clone(true,true);
            var myTr = newTr.clone(true,true);
            $(myTr).attr("class","adm-list-table-row");
            $(myTr).find('select:first').change(function(){
                onChangeSelectGroup($(this));
            });

            $(changedSelect).parents('tr:first').before($(myTr));
            if($(changedSelect).hasClass('default-select')){
                $(changedSelect).val("default");
            }else{
                $(changedSelect).parents('tr:first').remove();
            }
            hideSelectedGroups();
        }
        /*end group-access*/

        /*start system-requirement*/
        $('.system-requirement .anyway').change(function(){

            if($(this).attr('checked') == "checked"){
                $('.system-requirement').find('input[type="submit"]').attr('disabled',false);
            }else{
                $('.system-requirement').find('input[type="submit"]').attr('disabled',true);
            }
        });

        window.BXDEBUG = true;
        BX.ready(function(){
            var oPopup = new BX.PopupWindow('BXpopUpBlockedDirectories', window.body, {
                autoHide : true,
                offsetTop : 1,
                offsetLeft : 0,
                lightShadow : true,
                closeIcon : true,
                closeByEsc : true,
                overlay: {
                    backgroundColor: 'gray', opacity: '80'
                }
            });
            oPopup.setContent(BX('BXpopUpBlockedDirectories').innerHTML);
            BX.bindDelegate(
                document.body, 'click', {className: 'blockedDirectories' },
                BX.proxy(function(e){
                    if(!e)
                        e = window.event;
                    oPopup.show();
                    return BX.PreventDefault(e);
                }, oPopup)
            );


        });
        BX.ready(function(){
            var oPopup = new BX.PopupWindow('BXpopUpBlockedFiles', window.body, {
                autoHide : true,
                offsetTop : 1,
                offsetLeft : 0,
                lightShadow : true,
                closeIcon : true,
                closeByEsc : true,
                overlay: {
                    backgroundColor: 'gray', opacity: '80'
                }
            });
            oPopup.setContent(BX('BXpopUpBlockedFiles').innerHTML);
            BX.bindDelegate(
                document.body, 'click', {className: 'blockedFiles'},
                BX.proxy(function(e){
                    if(!e)
                        e = window.event;
                    oPopup.show();
                    return BX.PreventDefault(e);
                }, oPopup)
            );
        });
        /*end system-requirement*/
       $('.adm-table-refresh').click(function(){
            window.location.href = window.location.href;
       });
    });
</script>
<style>
.const-url-main-header {
    width: 300px;
}
#url_controller_edit_table .ico-flag- {
    border: 0 none;
}
#url_controller_edit_table .select-wrap {
    margin: 5px 5px 5px 20px;
}
#url_controller_edit_table .adm-detail-content-cell-r.lang-main-header-td {
    padding-left: 20px;
}
.lang-main-header {
    width: 220px;
}
.lang-alias-container {
    float:left;
    margin-right: 14px;
    margin-left: 16px;
    min-width: 420px;
}
.lang-constants .adm-detail-block {
    margin-bottom: 30px;
}
.lang-constants .adm-detail-block:last-of-type {
    margin-bottom: 0px;
}
.lang-constants .adm-list-table-cell.action {
    width:30px;
}
.user-interface-lang select {
    width: 160px;
}
.user-interface-lang .ico-flag-curLang, .user-interface-lang .ico-flag-CURLANG {
    background:transparent!important;
    border:0px;
}
.lang-constants.adm-detail-content-item-block table tbody td .table-cell-wrap.center {
    text-align: left;
}
.lang-constants.adm-detail-content-item-block table thead td .table-cell-wrap.center {
    text-align: left;
}
.lang-constants.adm-detail-content-item-block table tbody td .select-infoblock-wrap {
    text-align: left;
}
.lang-constants.adm-detail-content-item-block table tbody td .table-cell-wrap {
    text-align: left;
}
.adm-workarea a.adm-btn, .adm-workarea span.adm-btn.switch-button {
    height:23px;
    margin-bottom:20px;
    line-height: 22px;
}
td.only-in-workflow {
    min-width: 220px;
}
.adm-input-help-icon-locale:hover {
    background-position: 4px -384px;
}
.adm-input-help-icon-locale {
    background: url("/bitrix/panel/main/images/bx-admin-sprite.png") no-repeat scroll 4px -414px rgba(0, 0, 0, 0);
    height: 30px;
    margin-left: 3px;
    margin-top: -4px;
    position: absolute;
    text-decoration: none;
    width: 30px;
}
.table-borders {
    min-width: 885px;
}
.adm-list-table-cell {
    vertical-align: middle;
}
.table-cell-wrap {
    margin-right: 16px;
}
.select-language {
    display: inline-block;
    position: relative;
    width:160px;
}
.select-language-wrap {
    display: inline-block;
    margin: 10px 10px 5px 0;
}
#langs .adm-list-table-header .adm-list-table-cell {
    padding-top: 6px;
    vertical-align: middle;
}
#langs .adm-list-table-cell {
    padding-top: 29px;
    vertical-align: top;
}
#langs .adm-list-table-cell.langs-cell {
    padding-top: 11px;
}
.flag-container > span {
    margin-left: -43px;
    width: 16px;
    height: 11px;
    vertical-align: middle;
    float:inherit;
    margin-top: -2px;
}
.flag-container-default-lang > span {
    margin-left: -22px;
    width: 16px;
    height: 11px;
    vertical-align: middle;
    float:inherit;
    margin-top: -2px;
    margin-right: 3px;
}
.addlang {
    margin: 0 0 30px;
}
.addlang-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.addlang-container-active, .addlang-container-inactive {
    width: calc((100% - 80px) / 2);
}
.container-active-title, .container-inactive-title {
    color: #3f4b54;
    font-size: 14px;
    padding: 5px 0px 3px 16px;
    vertical-align: middle;
    text-shadow: 0 1px #fff;
    font-weight: 700;
}
.checkbox-wrap-top {
    vertical-align: middle;
    padding-left: 19px;
}
.container-checkbox {
    height: 180px;
    overflow-y: auto;
    background: #fff;
}
.checkbox-wrap {
    padding: 10px 21px;
}
.checkbox-wrap:hover, .checkbox-wrap:nth-of-type(odd):hover {
    background: #E0E9EC;
}
.checkbox-wrap:nth-of-type(odd) {
    background: #F5F9F9;
}
.lang-lable-disabled {
    color: #636c6e;
}
.container-checkbox label {
    margin-left: 6px;
    padding-left: 60px;
    padding-top: 1px;
    position: relative;
    white-space: nowrap;
}
label:before {
    content: "";
    position: absolute;
    display: block;
    top: 2px;
    left: 26px;
    width: 16px;
    height: 11px;
}
.container-checkbox input {
    margin: 6px 3px;
}
.addlang-container-switch {
    display: inline-block;
    margin: 0 5px;
    vertical-align: middle;
}
.switch-button {
    display: block !important;
    width: 30px;
    height: 30px;
    margin: 10px 0px;
    cursor: pointer;
}
.switch-button-add {
    position: relative;
}
.switch-button-add:after {
    content: "";
    position: absolute;
    top: 7px;
    left: 22px;
    display: block;
    width: 15px;
    height: 15px;
    background: url("/bitrix/panel/main/images/bx-admin-sprite-small-1.png")no-repeat center -303px;
}
.switch-button-withdraw {
    position: relative;
}
.switch-button-withdraw:after {
    content: "";
    position: absolute;
    top: 7px;
    left: 22px;
    display: block;
    width: 15px;
    height: 15px;
    background: url("/bitrix/panel/main/images/bx-admin-sprite-small-1.png")no-repeat center -324px;
}
.table-footer-link {
    display: inline-block;
    position: relative;
    top: 8px;
    left: 16px;
}
.button input {
    padding: 0 25px 0px !important;
}

.default_language {
    vertical-align: middle;
}
.inline_block {
    display: inline-block;
}
.center {
    text-align: center;
}
.select-wrap {
    float: left;
    margin-bottom: 5px;
    margin-top: 5px;
    margin-right: 20px;
    margin-left: 20px;
}
.table-lang-wrap {
    margin-left: 20px;
    white-space: nowrap;
}
#formstep .adm-list-table-row:hover .adm-list-table-cell {
    position: initial;
}
#option-form .adm-list-table-row:hover .adm-list-table-cell {
    position:initial;
}
.site_name {
    color: #000;
    font-size: 18px;
    margin: 0 0 12px 3px;
    padding: 0;
}
.site_name:nth-of-type(2) {
    margin-top: 12px;
}

.adm-list-table-cell-inner.center {
    text-align: center;
}
.table-cell-wrap.center {
    white-space: nowrap;
    text-align: center;
}
.select-infoblock-wrap {
    margin-right: 16px;
    text-align: center;
}
.table-cell-wrap.right {
    text-align: right;
}
.select-group {
    display: inline-block;
    position: relative;
    width: 375px;
}
.select-group-wrap {
    display: inline-block;
    margin: 5px 10px 5px 0;
}
#localization_check_demands .table-borders {
    min-width: 536px;
}
.adm-list-table-cell.center {
    padding-left: 0;
}
label[for="continue"] {
    margin-left: 3px;
}
.adm-detail-content-wrap {
    min-width: 826px;
}
.adm-detail-content-btns {
    padding-left: 12px;
}
.adm-detail-content:nth-of-type(n+2){
    display: none;
}
#localization_check_demands .ok-module {
    background: url("/bitrix/panel/main/images/bx-admin-sprite-small.png") no-repeat scroll 0 -2874px rgba(0, 0, 0, 0);
    width:18px;
    height:18px;
    margin: 0 auto;
}
#localization_check_demands .fail-module {
    background: url("/bitrix/panel/main/images/bx-admin-sprite-small.png") no-repeat scroll 0 -2903px rgba(0, 0, 0, 0);
    width:18px;
    height:18px;
    margin: 0 auto;
}
#localization_check_demands .img-loader {
    background: url("/bitrix/panel/main/images/waiter-white.gif") no-repeat scroll center center white;
    border-radius: 3px;
    height: 30px;
    margin-left: 455px;
    opacity: 0.5;
    position: absolute;
    width: 145px;
    z-index: 9999;
}
#popup-window-content-BXpopUpBlockedFiles{
    padding: 20px 10px;
}
#popup-window-content-BXpopUpBlockedDirectories{
    padding: 20px 10px;
}
.adm-detail-content-cell-c {
    text-align: center;
    padding: 6px 0;
}
.adm-detail-content-cell-c label {
    margin-left: 6px;
    padding-left: 60px;
    padding-top: 1px;
    position: relative;
}
#indexing .adm-info-message ul li {
    line-height: 30px;
}
#indexing .adm-info-message span {
    margin-bottom:10px;
    margin-left:30px;
    font-weight:bold;
}
#permissions table td {
    padding-bottom: 20px;
    padding-top: 20px;
}
.adm-input-help-icon-locale:hover {
    background-position: 4px -384px;
}
.adm-input-help-icon-locale {
    background: url("/bitrix/panel/main/images/bx-admin-sprite.png") no-repeat scroll 4px -414px rgba(0, 0, 0, 0);
    height: 30px;
    margin-left: 3px;
    margin-top: -4px;
    position: absolute;
    text-decoration: none;
    width: 30px;
}
.flag-container-default-lang .ico-flag-NOFLAG {
    border:0px;
    margin-top:8px !important;
}
.addlang-container .switch-button.switch-button-add.adm-btn.disabled {
    background-image: none !important;
    border: 1px solid #ccc;
    box-shadow: none;
}
.addlang-container .switch-button.switch-button-add.adm-btn.disabled:hover {
    background-image: none !important;
    background: #e0e9ec!important;
    border: 1px solid #ccc;
    box-shadow: none;
    cursor:default;
}
.addlang-container .switch-button.switch-button-add.adm-btn.disabled:active {
    background-image: none !important;
    border: 1px solid #ccc;
    box-shadow: none;
}
.addlang-container .switch-button.switch-button-withdraw.adm-btn.disabled {
    background-image: none !important;
    border: 1px solid #ccc;
    box-shadow: none;
}
.addlang-container .switch-button.switch-button-withdraw.adm-btn.disabled:hover {
    background-image: none !important;
    background: #e0e9ec!important;
    border: 1px solid #ccc;
    box-shadow: none;
    cursor:default;
}
.addlang-container .switch-button.switch-button-withdraw.adm-btn.disabled:active {
    background-image: none !important;
    border: 1px solid #ccc;
    box-shadow: none;
}
.adm-workarea a.adm-btn:active, .adm-workarea span.adm-btn.switch-button:active {
    height:23px!important;
    margin-bottom:20px!important;
    line-height: 22px!important;
}
#tabControl_layout .adm-info-message ul {
    margin: 0 0 0 33px;
    padding: 0;
}
#tabControl_layout .adm-info-message {
    padding: 30px 45px 30px 33px;
    text-align:left;
    display:block;
    margin-right:18px;
    margin-left:12px;
}
.refresh-list {
    margin-bottom: 12px;
}
.adm-table-refresh {
    position: absolute;
    right: 8px;
    top: 9px;
}
.adm-table-refresh:before {
    background: url("/bitrix/images/accorsys.localization/refresh.png") no-repeat 0px -27px;
    content: "";
    height: 14px;
    left: 13px;
    position: absolute;
    top: 7px;
    width: 13px;
}
#tabControl_layout .indexes-params .adm-info-message {
    margin: 30px 0 0;
}
#tabControl_layout .adm-info-message li {
    line-height: 25px;
}
.non-bullit li {
    list-style: outside none none;
}
.non-bullit {
    margin-left:0px;
    padding-left:0px;
}
#tabControl_layout .adm-info-message > h4 {
    margin-top:0px;
}
.lable-interface-lang-container {
    height: 35px;
}
#url_controller_edit_table .adm-designed-checkbox-label {
    width: 100%;
}
#url_controller_edit_table .lang-alises-row td.adm-detail-content-cell-r {
    padding-left: 39px;
}
#url_controller_edit_table tr.line-spacer {
    height: 1px;
}
#url_controller_edit_table .adm-detail-content-cell-l {
    padding: 17px 4px 14px 0;
    text-align: right;
}
#url_controller_edit_table .line-aliases-spacer td{
    /*border-bottom: 1px solid #CCC;*/
}
#url_controller_edit_table .flag-container > span {
    float: inherit;
    height: 11px;
    margin-left: 13px;
    margin-top: 2px;
    vertical-align: middle;
    width: 16px;
}
#url_controller_edit_table .adm-detail-content-cell-c label {
    padding-left: 0px;
}
.edit-table.default .line-aliases-spacer, .edit-table.default .lang-alises-row {
    opacity: 0.5;
}
#url_controller_edit_table td .langs-aliases:last-of-type {
    margin-bottom: 0px;
}
#url_controller_edit_table .langs-aliases {
    clear: both;
    display: block;
    float: right;
    margin-bottom: 5px;
    width: 255px;
    margin-top: 5px;
}
#url_controller_edit_table.default .adm-submenu-add-desktop-icon {
    cursor: default;
}
#url_controller_edit_table .adm-detail-content-cell-r {
    padding: 22px 0 22px 4px;
    vertical-align: top;
}
#url_controller_edit_table .cell-data-wrapper {
    padding-left: 13px;
    float: left;
}
#url_controller_edit_table span.lang-title {
    margin-left: 10px;
}
#url_controller_edit_table tr.spacer {
    height: 20px;
}
#url_controller_edit_table .adm-detail-content-cell-r > span {
    display: block;
    float: left;
}
</style>

<?endif;?>