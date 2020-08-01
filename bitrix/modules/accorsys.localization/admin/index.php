<?
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/include.php");
set_time_limit(3600);

if($_REQUEST['indexStepDelete']){
    if (($deleted = CLocale::ClearIndex()) === true){
        echo json_encode(
            array(
                "ACTION" => "DELETE_COMPLETE"
            )
        );
    }else{
        echo json_encode(
            array(
                "ACTION" => "PROCESS",
                "PERSENTAGE" => $deleted/$_SESSION["ACCORSYS_LOCALIZATION_TOTAL_COUNT_FROM_DELETE_ELEMENTS"]*100
            )
        );
        die();
    }
}elseif($_REQUEST["accorsysLocAjaxReindex"] == 'Y'){
    ob_start();
    $el = new CLocale(true);
    if ($step == 1){
        $_SESSION['ACCORSYS_LOCALIZATION_ALL_FILES_PATH'] = array();
        if($_COOKIE['ACCORSYS_LOCALIZATION_REINDEX_IN_PROCESS'] != 'Y'){
            $_SESSION['ACCORSYS_LOCALIZATION_FILES_SAVED'] = 0;
        }else{
            unset($_REQUEST["accorsysLocAjaxReindex"]);
            $_SESSION['ACCORSYS_LOCALIZATION_FILES_SAVED'] = $_COOKIE['ACCORSYS_LOCALIZATION_FILES_SAVED'];
        }
        foreach($el->arIndexDirectories as $dir)
            $el->setFilesCountToSession($dir);
    }
    $result = $el->Reindex(10,$step);
    ob_clean();

    if($result == "COMPLETE"){
        CModule::IncludeModule('iblock');
        $localeSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
        $localeSettings['last_index_date'] = date("Y.m.d H:i:s");
        $localeSettings['last_count_files'] = count($_SESSION['ACCORSYS_LOCALIZATION_ALL_FILES_PATH']);
        $countIblockElements = CIBlockElement::GetList(array(),array("IBLOCK_CODE"=>"ALOCALE_IBLOCK","IBLOCK_TYPE"=>"alocale"))->SelectedRowsCount();
        $localeSettings['last_count_phrazes'] = $countIblockElements;
        file_put_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini",serialize($localeSettings));
        echo "COMPLETE";
        die();
    }else{
        setcookie('ACCORSYS_LOCALIZATION_FILES_SAVED', $result, time() + 3600*24*30*3,"/");
        echo $_SESSION['ACCORSYS_LOCALIZATION_FILES_SAVED']/count($_SESSION['ACCORSYS_LOCALIZATION_ALL_FILES_PATH'])*100;
        die();
    }
}else{
    CJSCore::init(array('jquery'));
    CLocale::includeLocaleLangFiles();
    $APPLICATION->SetTitle(GetMessage('LC_EXTENSION_NAME'));
    require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_after.php");
    $step = 1;
    ?>
    <script src="/bitrix/js/accorsys.localization/jquery.min.js"></script>
    <h1><?=GetMessage('LC_MENU_ITEM_INDEX')?></h1>
    <p><?=GetMessage('LC_INDEX_DESCRIPTION')?></p>
    <?
    $localeSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/settings.ini"));
    $arIblock = CIBlock::GetList(array(),array("CODE"=>"ALOCALE_IBLOCK"))->GetNext();
    $iblockID = $arIblock['ID'];
    ?>
    <div class="adm-list-table-wrap reindex-table" id="index-table-container">
        <div class="table-borders">
            <table class="internal" style="width:100%;">
                <thead>
                    <tr class="heading">
                        <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner" style="text-align: left;"><?=GetMessage("LC_INDICATORS")?></div></td>
                        <td class="adm-list-table-cell"><div class="adm-list-table-cell-inner" style="text-align: left;"><?=GetMessage("LC_VALUES")?></div></td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="adm-list-table-row">
                        <td class="adm-list-table-cell">1. <?=GetMessage("LC_INDEX_LAST_UPDATE")?></td>
                        <td class="adm-list-table-cell"><?=$localeSettings["last_index_date"]?></td>
                    </tr>
                    <tr class="adm-list-table-row">
                        <td class="adm-list-table-cell">2. <?=GetMessage("LC_INDEX_FILES_COUNT")?></td>
                        <td class="adm-list-table-cell"><?=$localeSettings["last_count_files"]?></td>
                    </tr>
                    <tr class="adm-list-table-row">
                        <td class="adm-list-table-cell">3. <?=GetMessage("LC_INDEX_TRANSLATIONS_COUNT")?></td>
                        <td class="adm-list-table-cell">
                            <a target="_blank" href="/bitrix/admin/iblock_list_admin.php?IBLOCK_ID=<?=$iblockID?>&type=alocale&lang=<?=LANGUAGE_ID?>&find_section_section=0">
                                <?=$localeSettings["last_count_phrazes"]?>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="adm-list-table-footer">
            <div class="table-footer-link">
                <a target="_blank" href="/bitrix/admin/iblock_list_admin.php?IBLOCK_ID=<?=$iblockID?>&type=alocale&lang=<?=LANGUAGE_ID?>&find_section_section=0">
                    <?=GetMessage("LC_TRANSLATION_FILES_INDEX")?>
                </a>
            </div>
        </div>
    </div>
    <div style="height:20px;clear:both;width:100%"><!-- --></div>
    <div class="install-process-block" style="display:none;">
        <p>
            <b class="titleProcessing"><?=GetMessage('LC_INDEXING_IN_PROGRESS')?><?/*=$_SESSION["locale_index_files_count"]*/?> <?/*=GetMessage('LC_INDEX_ELEMENTS')*/?></b>
        </p>
        <div class="adm-progress-bar-outer" style="width: 500px;">
            <div class="adm-progress-bar-inner" style="width: <?=intval($percentage*497)?>px;">
                <div class="adm-progress-bar-inner-text middlevalue" style="width: 500px;">0%</div>
            </div>
            <span class="whitevalue">0%</span>
        </div>
        <div class="adm-info-message-buttons"></div>
    </div>
    <form id="locale_index" name="locale_index" action=/bitrix/admin/lc_lang_index.php" method="POST">
        <?if($_COOKIE['ACCORSYS_LOCALIZATION_REINDEX_IN_PROCESS'] == "Y"){
            ?>
            <input style="margin-left: 5px;" class="adm-btn" type="button" name="countinueIndex" value="<?=GetMessage("LC_CONTINUE")?>" />
            <input type="hidden" name="accorsysLocAjaxReindex" value="Y">
            <?
        }else{
            ?>
            <input type="hidden" name="indexStepDelete" value="Y">
            <?
        }?>
        <input style="margin-left: 5px;" class="adm-btn-reindex myclass" type="submit" name="reindex" value="<?=$_COOKIE['ACCORSYS_LOCALIZATION_REINDEX_IN_PROCESS'] == 'Y' ? GetMessage("LC_RESTART") : GetMessage('LC_REINDEX')?>" />
    </form>
    <style>
        .table-footer-link {
            display: inline-block;
            position: relative;
            top: 8px;
            left: 16px;
        }
        #index-table-container #bx-admin-prefix .list-table td, #bx-admin-prefix .internal tbody td {
            padding-left: 29px!important;
        }
        input.adm-btn-reindex.myclass {
            color:white;
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px 8px, -moz-linear-gradient(center  bottom , #729e00, #97ba00) repeat scroll 0 0, #9ec710 !important;
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px 8px, -webkit-linear-gradient(bottom,  #729e00,  #97ba00) ,#9ec710 !important;
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px 8px, -ms-linear-gradient(bottom, #729e00, #97ba00) , #9ec710 !important;
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px 8px, linear-gradient(bottom, #729e00, #97ba00) , #9ec710 !important;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25), 0 1px 0 #d5e71a inset;
            line-height: 16px;
            font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
            font-size: 13px;
            font-weight: bold;
            text-shadow: none;
            padding-left: 28px !important;
        }
        input.adm-btn-reindex.myclass:hover {
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px 8px, -moz-linear-gradient(center  top , #acce11, #8abb0d) repeat scroll 0 0, #9ec710 !important;
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px 8px, -webkit-linear-gradient(top,  #acce11,  #8abb0d) , #9ec710 !important;
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px 8px, -ms-linear-gradient(top, #acce11, #8abb0d) , #9ec710 !important;
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px 8px, linear-gradient(top, #acce11, #8abb0d) , #9ec710 !important;
            padding-left: 28px !important;
        }
        .adm-workarea input[disabled][type="submit"].adm-btn-reindex {
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px -47px, -moz-linear-gradient(center  top , #acce11, #8abb0d) repeat scroll 0 0, #9ec710 !important;
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px -47px, -webkit-linear-gradient(top,  #acce11,  #8abb0d) , #9ec710 !important;
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px -47px, -ms-linear-gradient(top, #acce11, #8abb0d) , #9ec710 !important;
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px -47px, linear-gradient(top, #acce11, #8abb0d) , #9ec710 !important;
            color: #ccc;
            text-shadow: none;
        }
        .adm-workarea input[disabled][type="submit"].adm-btn-reindex:hover {
            background: url("../images/accorsys.localization/refresh.png") no-repeat 9px -47px,  #86ad00 !important;
            color: #ccc;
            text-shadow: none;
        }
        .install-process-block {
            padding-bottom: 20px;
        }
    </style>
    <script>
        jqLoc(function(){
            var reindexStep = 1;
            jqLoc('#locale_index').submit(function(){
                jqLoc('input[name="countinueIndex"]').attr('disabled',true);
                deleteProcessStart();
                return false
            });
            jqLoc('input[name="countinueIndex"]').click(function(){
                jqLoc(this).attr('disabled',true);
                indexProcessStart();
                return false
            });
            function indexProcessStart(){
                jqLoc('.reindex-table').hide();
                jqLoc('.install-process-block').show();
                jqLoc('.adm-btn-reindex').attr('disabled',true);
                reindexStep = 1;
                var percentage = 0;
                var maxPersentage = 0;
                jqLoc('.titleProcessing').html('<?=GetMessage("LC_INDEXING_FILES")?>');
                setTimeout(function(){
                    changePercentProgress(1);
                },800);
                stepIndexFiles(maxPersentage);
            }
            function deleteProcessStart(){
                jqLoc('.reindex-table').hide();
                jqLoc('.install-process-block').show();
                jqLoc('.adm-btn-reindex').attr('disabled',true);
                reindexStep = 1;
                var percentage = 0;
                var maxPersentage = 0;
                jqLoc('.titleProcessing').html('<?=GetMessage("LC_FLUSHING_INDEX_WAIT")?>');
                setTimeout(function(){
                    changePercentProgress(1);
                },800);
                stepDeleteIndex(maxPersentage);
            }
            function stepDeleteIndex(maxPersentage){
                var curData = {'step':reindexStep,'reindex':'gogo','accorsysLocAjaxReindex':'Y','indexStepDelete':'Y'};
                jqLoc.ajax({
                    type: "POST",
                    url: '/bitrix/admin/lc_lang_index.php',
                    data: curData,
                    success: function(data)
                    {
                        var objData = {};
                        if(objData = JSON.parse(data)){
                            reindexStep++;
                            if(objData.ACTION == 'DELETE_COMPLETE'){
                                indexProcessStart();
                                return false;
                            }
                            var curPersentage = maxPersentage + parseFloat(parseFloat(objData.PERSENTAGE)*((100-maxPersentage)/100)) + 1;
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
                jqLoc.ajax({
                    type: "POST",
                    url: '/bitrix/admin/lc_lang_index.php',
                    data: curData,
                    success: function(data)
                    {16^01^45
                        setCookie("ACCORSYS_LOCALIZATION_REINDEX_IN_PROCESS","Y");
                        reindexStep++;
                        if(jqLoc.trim(data) == 'COMPLETE'){
                            deleteCookie("ACCORSYS_LOCALIZATION_REINDEX_IN_PROCESS");
                            jqLoc( "#index-table-container" ).load(document.location.href + " #index-table-container"
                            ,function(){
                                jqLoc('input[name="countinueIndex"]').remove();
                                jqLoc('.reindex-table').show();
                                jqLoc('.adm-btn-reindex').attr('disabled',false);
                                jqLoc('.install-process-block').hide();
                                changePercentProgress(100);
                                jqLoc('.titleProcessing').html('<?=GetMessage("LC_CONGRATS")?>');
                                jqLoc('.successInstall').show();
                            });
                            return false;
                        }
                        var curPersentage = maxPersentage + parseFloat(parseFloat(data)*((100-maxPersentage)/100)) + 1;
                        curPersentage = (Math.round(curPersentage * 100) / 100);
                        changePercentProgress(curPersentage);

                        stepIndexFiles(maxPersentage);
                    },
                    fail:function (){
                        setTimeout(function(){stepIndexFiles(maxPersentage);},1500);
                    }
                });
            }
            function changePercentProgress(currentPercentage){
                if(isNaN(currentPercentage)){
                    reindexStep--;
                    return false;
                }
                if(currentPercentage > 100)
                    currentPercentage = 100;
                var persantage= currentPercentage/100 * 497;
                jqLoc('.adm-progress-bar-inner').css('width',persantage+'px');
                jqLoc('.middlevalue').html(currentPercentage + '%');
                jqLoc('.whitevalue').html(currentPercentage + '%');
            }

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
        });
    </script>
    <?
    require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin.php");
}