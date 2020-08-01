<?if(!check_bitrix_sessid()) return;?>

<?php
chmod($_SERVER["DOCUMENT_ROOT"]."/ajax/",0755);
chmod($_SERVER["DOCUMENT_ROOT"]."/bitrix/",0755);
chmod($_SERVER["DOCUMENT_ROOT"]."/bitrix/admin/",0755);
chmod($_SERVER["DOCUMENT_ROOT"]."/bitrix/components/",0755);
chmod($_SERVER["DOCUMENT_ROOT"]."/bitrix/images/",0755);
chmod($_SERVER["DOCUMENT_ROOT"]."/bitrix/js/",0755);
chmod($_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/dbconn.php",0755);
chmod($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/tools.php",0755);
chmod($_SERVER["DOCUMENT_ROOT"]."/bitrix/themes/",0755);
chmod($_SERVER["DOCUMENT_ROOT"]."/bitrix/themes/.default/",0755);
chmod($_SERVER["DOCUMENT_ROOT"]."/bitrix/themes/.default/icons/",0755);

/*
function rightOnFilesAndFolders($dir=''){
    $moduleDir = $dir;
    $f=opendir($dir);
    while(($file=readdir($f)) !== false){
        if(is_file($moduleDir.$file)){
            chmod($moduleDir.$file,0755);
        }elseif(is_dir($moduleDir.$file.'/') && $file!="." && $file!=".."){
            $handle = opendir($moduleDir.$file.'/');
            chmod($moduleDir.$file.'/',0755);
            rightOnFilesAndFolders($moduleDir.$file.'/');
            closedir($handle);
        }
    }
}

$notWritable = array();
$arFolders = array();
/*$arFolders[] = $_SERVER["DOCUMENT_ROOT"]."/";
$arFolders[] = $_SERVER["DOCUMENT_ROOT"]."/bitrix/php_interface/";
$arFolders[] = $_SERVER["DOCUMENT_ROOT"]."/ajax/";
$arFolders[] = $_SERVER["DOCUMENT_ROOT"]."/bitrix/js/";
$arFolders[] = $_SERVER["DOCUMENT_ROOT"]."/bitrix/images/";
$arFolders[] = $_SERVER["DOCUMENT_ROOT"].'/bitrix/admin/';
$arFolders[] = $_SERVER["DOCUMENT_ROOT"].'/bitrix/themes/';
$arFolders[] = $_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/';*/

foreach($arFolders as $folder){
    rightOnFilesAndFolders($folder);
}

DeleteDirFilesEx("/bitrix/images/accorsys.localization");
DeleteDirFilesEx("/bitrix/js/accorsys.localization");
DeleteDirFilesEx("/ajax/accorsys.localization");
DeleteDirFilesEx("/ajax/accorsys.localization");

CopyDirFiles($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/images", $_SERVER["DOCUMENT_ROOT"]."/bitrix/images", false, true);
CopyDirFiles($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/js", $_SERVER["DOCUMENT_ROOT"]."/bitrix/js/accorsys.localization", false, true);
CopyDirFiles($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/public", $_SERVER["DOCUMENT_ROOT"]."/", false, true);

IncludeModuleLangFile(__FILE__);
CJSCore::Init(array("jquery"));
CJSCore::Init(array("popup"));

global $APPLICATION;
$APPLICATION->AddHeadString('<link rel="stylesheet" type="text/css" href="/bitrix/js/accorsys.localization/flags.css.php">');
$APPLICATION->AddHeadString('<script type="text/javascript" src="/bitrix/js/accorsys.localization/history.js.php"></script>');
$isBackTry = $_REQUEST['isBackSlide'] == "on";
$siteStep = 1;
if(!$isBackTry){
    $oldSettings = file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini");
    if(trim($oldSettings) != ""){
        file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini",$oldSettings);
        file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini","");
    }
}

/*copy coded langs */
global $APPLICATION;
$arSite = $APPLICATION->GetSiteByDir('/');

$isUtf = true;
if(strtoupper($arSite['CHARSET']) != 'UTF8' && strtoupper($arSite['CHARSET']) != 'UTF-8'){
    $isUtf = false;
}
function delTreeDirs($dir) {
    $files = array_diff(scandir($dir), array('.','..'));
    foreach ($files as $file) {
        (is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
    }
    return rmdir($dir);
}
$arDirsForRemove = array();
function additionalsLangsDel($dir='',&$arDirsForRemove){
    $moduleDir = $dir;
    $f=opendir($dir);
    while(($file=readdir($f)) !== false){
        if(is_dir($moduleDir.$file.'/') && $file!="." && $file!=".."){
            $arDirsForRemove[] = $moduleDir.$file;
        }
    }
}
additionalsLangsDel($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/lang_extra/',$arDirsForRemove);
foreach($arDirsForRemove as $dir){
    delTreeDirs($dir);
}
$zip = new ZipArchive;
if ($zip->open($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/lang_extra/extra_langs.zip') === TRUE){
    $zip->extractTo($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/lang_extra/');
    $zip->close();
}
function additionalsLangs($dir='',$isUtf){
    $moduleDir = $dir;
    $f=opendir($dir);
    while(($file=readdir($f)) !== false){
        if(is_file($moduleDir.$file)){
            if($isUtf){
                if(strpos($file,"utf-8") !== false){
                    $contentFile = file_get_contents($moduleDir.$file);
                    $toFile = str_replace("/include/lang_extra/","/lang/",str_replace($file, "additionaltranslations.php",$moduleDir.$file));
                    file_put_contents($toFile,$contentFile);
                    chmod($toFile,0755);
                }
            }else{
                if(strpos($file,"cp1251") !== false){
                    $contentFile = file_get_contents($moduleDir.$file);
                    $toFile = str_replace("/include/lang_extra/","/lang/",str_replace($file, "additionaltranslations.php",$moduleDir.$file));
                    file_put_contents($toFile,$contentFile);
                    chmod($toFile,0755);
                }
            }
        }
        elseif(is_dir($moduleDir.$file.'/') && $file!="." && $file!=".."){
            additionalsLangs($moduleDir.$file.'/',$isUtf);
        }
    }
}
additionalsLangs($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/include/lang_extra/',$isUtf);

if(!file_exists($_SERVER["DOCUMENT_ROOT"].'/bitrix/images/accorsys.localization/banners/localization_bitrix_extension_banner_'.LANGUAGE_ID.'_1920x300.png')){
    $urlBanner = "..//images/accorsys.localization/banners/localization_bitrix_extension_banner_en_1920x300.png";
}else{
    $urlBanner = "..//images/accorsys.localization/banners/localization_bitrix_extension_banner_".LANGUAGE_ID."_1920x300.png";
}
?>
<?/*<p class="modul_info-item ">,&nbsp;<?= GetMessage('LC_ABOUT_VERSION').' '.$GLOBALS['locale_module_version']?></p>
*/?>
<div id="installContainer">
    <div id="installContent">
        <div class="adm-detail-block">
            <form id="formstep" method="post" action="<?=$APPLICATION->GetCurPage()?>" name="form1" enctype="multipart/form-data">
                <div id="resized_elem">
                    <div class="banner-container">
                        <a target="_blank" href="<?=GetMessage("LC_PRODUCT_PAGE_URL")?>">
                            <div class="banner"></div>
                        </a>
                    </div>
                    <div class="adm-detail-title"><?=GetMessage("LC_INSTALL_STEP_TITLE_EULA")?></div>

                    <!--<p><?=GetMessage('LC_COPYRIGHT')?></p>-->
                </div>
                <div id="resize_line" >
                    <span id="tag"></span>
                    <hr />
                </div>
                <p>
                <div class="eula_parent" >
                    <div class="eula_container" >
                        <?=file_get_contents($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/accorsys.localization/lang/".LANGUAGE_ID."/eula.html");?>
                    </div>
                </div>
                </p>

                <?=bitrix_sessid_post()?>

                <div class="consent">
                    <!--new-->
                    <input id="continue" <?=$isBackTry ? " checked='checked' ":""?> type="checkbox" title="<?=GetMessage("LC_CHECK_UNCHECK")?>"  class="adm-checkbox adm-designed-checkbox agreelicense">
                    <label for="continue" class="adm-designed-checkbox-label adm-checkbox consent-adm-checkbox"><?=GetMEssage("LC_EULA_ACCEPT")?></label>
                    <!--new-->
                </div>

                <input type="hidden" name="lang" value="<?=LANGUAGE_ID?>">
                <input type="hidden" name="id" value="accorsys.localization">
                <input type="hidden" name="install" value="Y">
                <input type="hidden" class='step' name="step" value="2">
                <input type="hidden" class="siteStep" value="<?=$siteStep?>">

                <div class="buttons">
                    <input type="submit" <?=$isBackTry ? "":" disabled='true' "?> name="inst" value="<?=GetMessage('LC_INSTALL_MESS_NEXT').'&nbsp;&nbsp;&nbsp;&nbsp;&#707;'?>" />
                    <div class="preload inline_block">
                        <div class="preloader" style="display:none;"></div>
                    </div>
                </div>
            </form>
        </div>
        <style>
            .module_image {
                padding:25px;
            }
            .eula_container h1 {
                text-align: left;
            }
            .banner-container {
                margin-bottom: 25px;
            }
            .banner {
                height: 297px;
                background: url('<?=$urlBanner?>') 90% 40%  no-repeat;
            }

            .module-logo {
                background: url("/bitrix/images/accorsys.localization/bitrix_localization_module_box_ru(160x160).png") no-repeat scroll 50% 50% rgba(0, 0, 0, 0);
                width:160px;
                height:160px;
            }
            .eula_parent {
                width: calc(100% - 15px);
                padding: 9px 0 9px 15px;
                border-radius: 5px;
                overflow: hidden;
                background: white;
            }
            .eula_container {
                padding: 14px 30px 0 30px;
                height: 360px;
                /*height: 571px;*/
                overflow-y: scroll;
                text-align: justify;
            }
            #resize_line {
                position: relative;
                cursor: n-resize;
            }
            #resize_line hr{
                padding: 2px 0;
                border-bottom: 0;
                border-left: 0;
                border-right: 0;
            }
            #resized_elem {
                overflow:hidden;
            }
            #tag {
                background: url("/bitrix/images/accorsys.localization/tag.png") no-repeat scroll 50% 50% rgba(0, 0, 0, 0);
                height: 16px;
                left: 50%;
                margin: -7px 0 0 -28px;
                position: absolute;
                width: 57px;
            }
            #resized_elem p:first-of-type {
                margin-top: 0;
            }
            /*----------------------------*/

            .consent {
                margin-left: 0px;
                margin-top: 25px;
            }
            .consent-adm-checkbox {
                width: auto!important;
                padding: 0 25px;
            }

            label[for="continue"] {
                margin-left: 3px;
            }

            .buttons {
                margin: 20px 0 14px 0px;
            }

            .button input {
                padding: 0 25px 0px !important;
            }

            /*-----------helper classes-----*/

            .inline_block {
                display: inline-block;
            }
            .float_left {
                float: left;
            }
            .float_right {
                float: right;
            }

            /*mystyles*/
            .img-loader {
                background: url("/bitrix/panel/main/images/waiter-white.gif") no-repeat scroll center center rgb(255, 255, 255);
                height: 285px;
                opacity: 0.66;
                position: absolute;
                width: 269px;
                z-index: 9999;
            }

        </style>
    </div>
</div>
<style>
    :focus {
        outline: none;
    }
    .backForm {
        padding-left: 15px !important;
    }
    .modul_info {
        position: relative;
        top: 10px;
        right: -10px;
    }
    .modul_info-item {
        bottom: 43px;
        color: #25282c;
        display: inline-block;
        font-size: 22px;
        font-weight: bold;
        left: 377px;
        margin: 0;
        position: relative;
    }
    .adm-info-message ul {
        margin: 0 0 0 33px;
        padding: 0;
    }
    #installContent .adm-info-message {
        padding: 30px 45px 30px 33px;
    }
    #installContent .adm-info-message li {
        line-height: 25px;
    }
    .adm-table-refresh {
        position: absolute;
        right: 8px;
        top: 9px;
    }
    .adm-table-refresh:before {
        background: url("../images/accorsys.localization/refresh.png") no-repeat 0px -27px;
        content: "";
        height: 14px;
        left: 13px;
        position: absolute;
        top: 7px;
        width: 13px;
    }
    .preload {
        margin: 0px 12px 0px 0px;
        vertical-align: middle;
        margin-left: 15px;
    }
    .preloader {
        width: 70px;
        height: 30px;
        background: #aaa;
        background: url("../images/accorsys.localization/preloader.gif") no-repeat center;
    }
    .adm-info-message > h4 {
        margin-top:0px;
    }
    .flag-container-default-lang .ico-flag-NOFLAG {
        border:0px;
        margin-top:8px !important;
    }
    #formstep .adm-info-message {
        display: block;
    }
    .non-bullit li {
        list-style: outside none none;
    }
    .non-bullit {
        padding-left: 0;
    }
    div.spacer {
        clear:both;
        height:1px;
        width:100%;
    }
</style>
<script type="text/javascript">
$(function(){
    // возвращает cookie если есть или undefined
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }
    // уcтанавливает cookie
    function setCookie(name, value, props) {
        props = props || {}
        var exp = props.expires
        if (typeof exp == "number" && exp) {
            var d = new Date()
            d.setTime(d.getTime() + exp*1000)
            exp = props.expires = d
        }
        if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

        value = encodeURIComponent(value)
        var updatedCookie = name + "=" + value
        for(var propName in props){
            updatedCookie += "; " + propName
            var propValue = props[propName]
            if(propValue !== true){ updatedCookie += "=" + propValue }
        }
        document.cookie = updatedCookie

    }
    // удаляет cookie
    function deleteCookie(name) {
        setCookie(name, null, { expires: -1 })
    }
    function fixEvent(e) {
        e = e || window.event;
        if ( e.pageX == null && e.clientX != null ) {
            var html = document.documentElement;
            var body = document.body;
            e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
            e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
        }
        if (!e.which && e.button) {
            e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
        }
        return e
    }
    var reindexStep = 0;
    var firstStep = true;
    function changePercentProgress(currentPercentage){
        if(isNaN(currentPercentage)){
            reindexStep--;
            return false;
        }
        if(currentPercentage > 100)
            currentPercentage = 100;

        var persantage= currentPercentage/100 * 497;
        $('#installContent .adm-progress-bar-inner').css('width',persantage+'px');
        $('#installContent .middlevalue').html(currentPercentage + '%');
        $('#installContent .whitevalue').html(currentPercentage + '%');
    }
    function indexProcessStart(){
        $('.reindex-table').hide();
        $('.install-process-block').show();
        $('.adm-btn-reindex').attr('disabled',true);
        reindexStep = 1;
        var maxPersentage = 50;
        $('.titleProcessing').html('<?=GetMessage("LC_INDEXING_FILES")?>');
        stepIndexFiles(maxPersentage);
    }
    function deleteProcessStart(){
        $('.reindex-table').hide();
        $('.install-process-block').show();
        $('.adm-btn-reindex').attr('disabled',true);
        reindexStep = 1;
        var maxPersentage = 80;
        $('.titleProcessing').html('<?=GetMessage("LC_FLUSHING_INDEX_WAIT")?>');
        stepDeleteIndex(maxPersentage);
    }
    function stepDeleteIndex(maxPersentage){
        var curData = {'step':reindexStep,'reindex':'gogo','accorsysLocAjaxReindex':'Y','indexStepDelete':'Y'};
        $.ajax({
            type: "POST",
            url: '/bitrix/admin/lc_lang_index.php',
            data: curData,
            success: function(data)
            {
                var objData = {};
                if(objData = JSON.parse(data)){
                    reindexStep++;
                    if(objData.ACTION == 'DELETE_COMPLETE'){
                        changePercentProgress(50);
                        indexProcessStart(maxPersentage);
                        return false;
                    }
                    var curPersentage = 30 + parseFloat(parseFloat(objData.PERSENTAGE)*((100-maxPersentage)/100));
                    curPersentage = (Math.round(curPersentage * 100) / 100);
                    changePercentProgress(curPersentage);

                    stepDeleteIndex(maxPersentage);
                }
            },
            fail:function (){
                setTimeout(function(){stepIndexFiles(maxPersentage);},1500);
            }
        });
    }
    function stepIndexFiles(maxPersentage){
        var curData = {'step':reindexStep,'reindex':'gogo','accorsysLocAjaxReindex':'Y'};
        $.ajax({
            type: "POST",
            url: '/bitrix/admin/lc_lang_index.php',
            data: curData,
            success: function(data)
            {
                setCookie("ACCORSYS_LOCALIZATION_REINDEX_IN_PROCESS","Y");
                reindexStep++;
                if($.trim(data) == 'COMPLETE'){
                    deleteCookie("ACCORSYS_LOCALIZATION_REINDEX_IN_PROCESS");
                    changePercentProgress(100);
                    $('.titleProcessing').html('<?=GetMessage("LC_CONGRATS")?>');
                    $('.adm-progress-bar-outer').hide();
                    $('.successInstall').show();
                    return false;
                }
                var curPersentage = 50 + parseFloat(parseFloat(data)*((100-maxPersentage)/100));
                curPersentage = (Math.round(curPersentage * 100) / 100);
                changePercentProgress(curPersentage);

                stepIndexFiles(maxPersentage);
            },
            fail:function (){
                setTimeout(function(){stepIndexFiles(maxPersentage);},1500);
            }
        });
    }
    var savedInstallFormData;
    function onStepForm () {
        $('#formstep').submit(function(){
            $('.buttons input').attr('disabled',true);
            $('.preloader').show();
            var url = $(this).attr('action');
            var dataForNextStep = $("#formstep").serialize();
            if($('.toLastStep').val() == 'true'){
                $("#formstep").append($('<input type="hidden" name="install_now" value="true">'));
                savedInstallFormData = $("#formstep").serialize();
            }
            $.ajax({
                type: "POST",
                url: url,
                data: dataForNextStep ,
                success: function(data)
                {
                    $('#installContainer').empty().html($(data).find('#installContent'));
                    onStepForm();
                    var loadedModuleInstall = false;
                    var percentage = 0;
                    var maxPersentage = 100;
                    var needIndex = $('#installContent .needIndex').val() == 'need';
                    var needAddToFav = $('#installContent .isNeedAddToFav').val() == 'need';
                    if(needIndex){
                        maxPersentage = 30;
                    }
                    if($('#installContent').find('.step').val() == "finalPage"){
                        setTimeout(function(){
                            changePercentProgress(1);
                        },800);
                        $.ajax({
                            type: "POST",
                            url: '/ajax/accorsys.localization/accorsys_localization_save_settings_and_final_install.php',
                            data: savedInstallFormData ,
                            success: function(){
                                loadedModuleInstall = true;
                                curPersantageSpeed = 50;
                                var finishInterval = setInterval(function(){
                                    percentage++;
                                    changePercentProgress(percentage);
                                    if(percentage >= maxPersentage){
                                        clearInterval(finishInterval);
                                        if(needIndex){
                                            $('.titleProcessing').html('<?=GetMessage("LC_INDEXING_FILES")?>');
                                            deleteProcessStart(maxPersentage);
                                        }else{
                                            $('.titleProcessing').html('<?=GetMessage("LC_CONGRATS")?>');
                                            $('.adm-progress-bar-outer').hide();
                                            $('.successInstall').show();
                                        }
                                    }
                                },50);
                            }
                        });
                        var myIntervalPercentage = setInterval(function(){
                            percentage++;
                            changePercentProgress(percentage);
                            if(percentage >= maxPersentage || loadedModuleInstall){
                                if(needAddToFav){
                                    var url = '/bitrix/admin/favorite_act.php?act=add';
                                    $.ajax({
                                        type: "POST",
                                        url: url,
                                        data: {
                                            "addurl":'lc_inapp_purchases.php?lang=<?=LANGUAGE_ID?>',
                                            "menu_id":'accorsys_inapp_store',
                                            "name":"<?=GetMessage('LC_INAPP_PURCHASES').' - '.GetMessage("LC_EXTENSION_NAME")?>",
                                            "sessid":$('#sessid').val()
                                        }});
                                }
                                clearInterval(myIntervalPercentage);
                            }
                        },4000);
                    }else{
                        var siteStep = parseInt($('#formstep').find('.step').val()) - 1;
                        stepJavascriptCallbacks(siteStep);
                    }
                }
            });
            return false;
        });

        $('.backForm').click(function(){
            var siteStep = parseInt($("#formstep").find('.step').val()) - 2;

            if(siteStep < 4){
                var url = $('#formstep').attr('action');
                $.ajax({
                    type: "POST",
                    url: url,
                    data: $("#formstep").serialize(),
                    success: function(data){}
                });
            }

            ajaxForm(siteStep);
        });

        $('.refreshform').click(function(){
            var siteStep = parseInt($("#formstep").find('.step').val()) - 1;
            ajaxForm(siteStep);
        })

    }

    function changeStepHash(numberStep){
        cpHash.remove('installStep');
        cpHash.add('installStep',numberStep);
    }

    if(!cpHash.get().installStep){
        cpHash.add('installStep',1);
    }else{
        if(cpHash.get().installStep == 'finalstep'){
            cpHash.remove('installStep');
        }else{
            ajaxForm(cpHash.get().installStep);
        }
    }

    function stepJavascriptCallbacks(siteStep){
        changeStepHash(siteStep);
        $('body,html').animate({
            scrollTop: 0
        }, 50);
        switch(siteStep){
            case 1:
                step1CallBack();
                break;
            case 2:
                step2CallBack();
                break;
            case 3:
                step3CallBack();
                break;
            case 4:
                step4CallBack();
                break;
            case 5:

                break;
            case 6:

                break;
            case 7:

                break;
        }
    }

    function ajaxForm(siteStep){
        $('.buttons input').attr('disabled',true);
        $('.preloader').show();
        var url = $("#formstep").attr('action');
        $.ajax({
            type: "POST",
            url: url,
            data: {step : siteStep,
                isBackSlide : 'on',
                install : 'Y',
                id : 'accorsys.localization',
                lang : '<?=LANGUAGE_ID?>',
                sessid : $('#sessid').val()
            },
            success: function(data)
            {
                $('#installContainer').empty().html($(data).find('#installContent'));
                var siteStep = parseInt($('#formstep').find('.step').val()) - 1;

                stepJavascriptCallbacks(siteStep);
                onStepForm();
            }
        });
    }

    function step1CallBack (){
        var r_clicked = false;
        var height, heightT;
        var $objTop = $('#installContainer #resized_elem');
        var $objBot = $('#installContainer .eula_container');
        var $objbanner = $('#resized_elem .banner');
        var bannerHeight = $objbanner.height();
        $('#resize_line').mousedown(function(e){
            e = fixEvent(e);
            r_clicked = e.pageY;
            height = $objTop.height();
            heightT = $objBot.height();
            return false;
        });
        $(document).mouseup(function(){
            r_clicked = false;
        })
        $('body').mousemove(function(e){
            if (r_clicked){
                var new_height = height+e.pageY-r_clicked;
                var new_heightT = heightT-e.pageY+r_clicked;
                if (new_height > 0 && new_heightT > 360){
                    var intNewHeight = parseInt(new_height);
                    if((intNewHeight) <= bannerHeight && (intNewHeight) >= 190)
                        $objbanner.css('height',(intNewHeight)+'px');
                    $objTop.css('height',new_height + 'px');
                    $objBot.css('height',new_heightT + 'px');
                }
            }
        });
        $('.agreelicense').change(function(){
            if($(this).attr('checked') == "checked"){
                $('#formstep').find('input[type="submit"]').attr('disabled',false);
            }else{
                $('#formstep').find('input[type="submit"]').attr('disabled',true);
            }
        });
    }
    var usedCallback = false;
    function step2CallBack (){
        $('#formstep').find('input[type="submit"]').attr('disabled',true);
        $('.anyway').change(function(){
            if($(this).attr('checked') == "checked"){
                if(confirm("<?=GetMessage('LC_CONTINUE_ANYWAY_ALERT')?>")){
                    $('#formstep').find('input[type="submit"]').attr('disabled',false);
                }else{
                    $(this).attr('checked', false);
                }
            }else{
                $('#formstep').find('input[type="submit"]').attr('disabled',true);
            }
        });

        $.get('/ajax/accorsys.localization/accorsys_localization_check_files.php',{
            'system_requirements_ajax_request':'Y',
            'lang':'<?=LANGUAGE_ID?>'
        },function(objData){
            var objData = JSON.parse(objData);

            $('#formstep .status-module > div').empty();
            $('#formstep .status-module > div').addClass(objData.isAllOk == 'true' ? 'ok-module' : 'fail-module');
            $('#formstep .comment-module').html(objData.commentText);
            if(objData.isAllOk == 'false'){
                $('#formstep').find('input[type="submit"]').attr('disabled',true);
                $('.anyway').parents('.consent:first').show();
                $('.anyway').attr('checked',false);
            }else{
                $('#formstep').find('input[type="submit"]').attr('disabled',false);
            }
            window.BXDEBUG = true;
            if(!usedCallback){
                usedCallback = true;
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
            }
        });
    }

    function step3CallBack(){
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
            $('#select_all_extend').attr('checked',false);
            var stringNewOptions = '';
            $('.addlang-container-inactive .container-checkbox').find('input[type="checkbox"]:checked').each(function(){
                $(this).attr("checked",false);
                $(this).parents('.checkbox-wrap:first').prependTo('.addlang-container-active .container-checkbox');
                stringNewOptions = '<option class="'+ $(this).attr("langid") +'" value="' + $(this).attr("langid") + '">'+ $(this).attr("langtext") +'</option>';
                $('.site-lang-select-block .select-wrap select').append($(stringNewOptions));
            });
            if(stringNewOptions != ''){
                $('.choise-langs-table tbody tr').find('select').show();
                switchLanguageChangeState();
            }
            notSelectedAdditionLangsChanger();
        });
        $('#button-add').click(function(){
            $('#select_all_defaults').attr('checked',false);
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
            switchLanguageChangeState();
            notSelectedAdditionLangsChanger();
        });
        switchLanguageChangeState();
    }
    function notSelectedAdditionLangsChanger(){
        $('.inputs-additional-langs-changer').empty();
        var isNotUsed = true;
        $('.addlang-container-active .checkbox-wrap').each(function(){
            var curCheckbox = $(this).find('input[type="checkbox"]');
            if(curCheckbox.attr('issystem') != 'system'){
                $('.inputs-additional-langs-changer').append(
                    $('<input type="hidden" value="'+ curCheckbox.attr('langid') +'" name="arAdditionalLangsChanger['+ curCheckbox.attr('langid') +']">')
                );
                isNotUsed = false;
            }
        });
        if(!isNotUsed){
            $('<input type="hidden" value="nothing" name="arAdditionalLangsChanger">');
        }
    }
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

    var availableGroups = {};
    function step4CallBack(){
        availableGroups = {};
        $('.tempGroups select.select-group:first option').each(function(){
            if($(this).val() != 'delete' && $(this).val() != 'default')
                availableGroups[$(this).val()] = $(this).text();
        });
        $('#formstep select.select-group').change(function(){
            onChangeSelectGroup($(this));
        });
        $('.user-interface-lang select').change(function(){
            $(this).siblings('span.flag-container-default-lang').find('span').attr("class",'ico-flag-' + $(this).val().toUpperCase());
        });
        $('.user-interface-lang select').each(function(){
            $(this).siblings('span.flag-container-default-lang').find('span').attr("class",'ico-flag-' + $(this).val().toUpperCase());
        });
        hideSelectedGroups();
    }
    function checkCountUsersTips(){
        var countUsers = 0;
        $('.data-group .count-users').each(function(){
            countUsers += parseInt($(this).find('a').text());
        });
        $.ajax({
            type: "POST",
            url: '/ajax/accorsys.localization/get_users_in_groups.php',
            data: $("#formstep").serialize() ,
            success: function(data)
            {
                if($.trim(data) == ""){
                    if($('.adm-info-message li').length < 2)
                        $('.adm-info-message').hide();
                    $('.accorsys-rec-needMoreUserLisence').remove();
                }else{
                    $('.adm-info-message').show();
                    if($('.adm-info-message .accorsys-rec-needMoreUserLisence').length > 0){
                        $('.accorsys-rec-needMoreUserLisence').html(data);
                    }else{
                        var textForUsersCount = "<?=GetMessage("LC_GROUP_USER_COUNT")?>";
                        $('.adm-info-message ul').append('<li class="accorsys-rec-needMoreUserLisence">'+data+'</li>');
                    }
                }
            }
        });
    }
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
    function onChangeSelectGroup(changedSelect){
        if($.trim($(changedSelect).val()) == "delete"){
            $(changedSelect).parents('tr:first').remove();
            checkCountUsersTips();
            hideSelectedGroups();
            return false;
        }
        if($.trim($(changedSelect).val()) == "default"){
            checkCountUsersTips();
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
        checkCountUsersTips();
        hideSelectedGroups();
    }

    $('.adm-fav-link').hide();
    onStepForm();
    step1CallBack();

});
</script>