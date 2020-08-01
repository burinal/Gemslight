<?if(!check_bitrix_sessid()) return;?>
<?
CJSCore::Init(array("jquery"));
$lcTempSettings = unserialize(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/accorsys.localization/install/settings/tempsettings.ini"));
?>
<div id="installContent">
    <div class="adm-detail-title"><?=GetMessage("LC_INSTALL_STEP_TITLE_SETUP")?></div>
    <input type="hidden" value="finalPage" class="step">
    <?if($_REQUEST['isIndexFiles'] == 'on'){
        ?>
            <input type="hidden" class="needIndex" value="need">
        <?
    }?>
    <?if($_REQUEST['isNeedAddToFav'] == 'on'){
        ?>
            <input type="hidden" class="isNeedAddToFav" value="need">
            <?=bitrix_sessid_post()?>
        <?
    }?>
    <h2 class="titleProcessing" style="font-weight: normal;font-size:18px;"><?=GetMessage("LC_INSTALL_WAIT")?></h2>
    <div class="adm-progress-bar-outer" style="width: 500px;">
        <div class="adm-progress-bar-inner" style="width: <?=intval($percentage*497)?>px;">
            <div class="adm-progress-bar-inner-text middlevalue" style="width: 500px;">0%</div>
        </div>
        <span class="whitevalue">0%</span>
    </div>

    <div class="adm-info-message">
        <h4>
            <?=GetMessage("LC_RECOMMENDED_ACTIONS")?>
        </h4>
        <ul <?=count($arRecomendations['recomendations'],true) == 2 ? 'class="non-bullit"':''?>>
            <?foreach($lcTempSettings['recomendations'] as $arReccomend){
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
    <div class="successInstall" style="display:none;">
        <span style="font-size:16px;">
            <a target="_blank" style="margin-right:20px;" class="adm-btn adm-btn-save" href="/bitrix/admin/lc_inapp_purchases.php"><?=GetMessage("LC_GO_TO_INAPP_PURCHASES")?></a>
            <a target="_blank" class="adm-btn" href="/bitrix/admin/settings.php?mid=accorsys.localization&mid_menu=1&open_tab=iblocks"><?=GetMessage("LC_BTN_CONSTANT_MANAGEMENT")?></a>
        </span>
    </div>
    <style>
        #bx-admin-prefix .adm-progress-bar-outer .middlevalue {
            color:white;
            line-height:31px;
        }
        #installContent .adm-detail-title {
            padding:3px 53px 12px 0;
        }
        #installContent .adm-info-message {
            margin-top: 27px;
            margin-bottom: 27px;
        }
    </style>
</div>