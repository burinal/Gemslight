<?
set_time_limit(120);
define("STOP_STATISTICS", true);
define("NO_KEEP_STATISTIC", true);
define("NOT_NEED_PROFILES", true);
define("NOT_NEED_BACKUPS",true);
define('LOCALE_MAX_CHECKED_CHECKBOX',2);
require_once $_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/prolog_before.php';

IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/translations.php',LANGUAGE_ID);
IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/accorsys.localization/additionaltranslations.php',LANGUAGE_ID);

if(class_exists('CLocale'))
    CLocale::includeLocaleLangFiles();

function scan($dir='', &$dirLvl,&$notWritable){
    $isNeedWrite = strpos($dir,'/lang/') !== false;
    if(is_file($dir)){
        if(is_writeable($dir) === false && $isNeedWrite)
            $notWritable["FILES"][] = $dir;
        return false;
    }
    if(!is_dir($dir))
        return false;
    $moduleDir = $dir;
    $dirLvl++;
    $f=opendir($dir);
    while(($file=readdir($f)) !== false){
        if(is_file($moduleDir.$file)){
            if(is_writeable($moduleDir.$file) === false && $isNeedWrite)
                $notWritable["FILES"][] = $moduleDir.$file;
        }
        elseif(is_dir($moduleDir.$file.'/') && $file!="." && $file!=".."){
            $handle = opendir($moduleDir.$file.'/');
            if (!$handle && $isNeedWrite){
                $notWritable["DIRS"][] = $moduleDir.$file.'/';
                continue;
            }elseif(!$handle){
                continue;
            }
            scan($moduleDir.$file.'/',$dirLvl,$notWritable);
            closedir($handle);
        }
    }
    $dirLvl--;
}

if($_REQUEST["system_requirements_ajax_request"] == "Y"){
    require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/classes/mysql/locale.php");

    $notWritable = array();
    $arFolders = array();
    $arFolders[] = $_SERVER["DOCUMENT_ROOT"].'/bitrix/components/';
    $arFolders[] = $_SERVER["DOCUMENT_ROOT"].'/bitrix/templates/';
    $arFolders[] = $_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/lang/ru/tools.php';
    $arFolders[] = $_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/main/lang/en/tools.php';
    $dirLvl = 0;
    foreach($arFolders as $folder){
        scan($folder,$dirLvl,$notWritable);
    }

    $arResult = array();
    if(count($notWritable) == 0){
        $arResult['isAllOk'] = 'true';
        $arResult['commentText'] =
            '<span class="ok-text">'.
            GetMessage("LC_ALL_FILES_AND_FOLDERS_WRITEABLE")
            .'</span>';
    }else{
        $arResult['isAllOk'] = 'false';
        ob_start();
            if(isset($notWritable["FILES"])){
                ?><span>
                    <a style="color:red;" href="javascript:void(0)" class="blockedFiles"><?=GetMessage("LC_BLOCKED_FILES_LIST")?></a>
                </span>
                <br />
                <div id="BXpopUpBlockedFiles" style="display:none">
                    <?=GetMessage("LC_BLOCKED_FILES_LIST").':'?>&nbsp;
                    <br />
                    <br />
                    <?
                    $k = 1;
                    foreach($notWritable["FILES"] as $file){
                        ?>
                        <span><?=$k.'. '.$file?></span>
                        <br />
                        <?
                        $k++;
                    }
                    ?>
                </div>
            <?
            }
            if(isset($notWritable["DIRS"])){
                ?><br />
                <span>
                    <a style="color:red;"  href="javascript:void(0)" class="blockedDirectories"><?=GetMessage("LC_BLOCKED_FOLDERS_LIST")?></a>
                </span>
                <br />
                <div id="BXpopUpBlockedDirectories" style="display:none">
                    <?=GetMessage("LC_BLOCKED_FOLDER_LIST").':'?>&nbsp;
                    <br />
                    <br />
                    <?
                    $k = 1;
                    foreach($notWritable["DIRS"] as $dir){
                        ?>
                        <span><?=$k.'. '.$dir?></span>
                        <br />
                    <?
                    }
                    ?>
                </div>
            <?
            }
        $arResult['commentText'] = ob_get_clean();
    }
    echo(LOC_json_safe_encode($arResult));
}