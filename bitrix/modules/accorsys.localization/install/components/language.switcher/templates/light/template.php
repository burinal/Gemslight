<?php if(!defined("B_PROLOG_INCLUDED")||B_PROLOG_INCLUDED!==true)die();
if(method_exists ( $this , 'setFrameMode'))
    $this->setFrameMode(true);
?>
<?global $USER;?>
<div id="accorsys-switch-lang" class="popup">
    <?
    if(method_exists ( $this , 'setFrameMode'))
        $frame = $this->createFrame()->begin();
    ?>
    <div class="accorsys-btn">
        <div class="AccorsyslanguageContainer default">
            <span class="flag-container-default-lang">
                <span class="ico-flag-<?=strtoupper($arResult['CURRENT']['CODE'])?>"></span>
            </span>
            <a data-lang="<?=$arResult['CURRENT']['CODE']?>"><?=$arResult['CURRENT']['NAME']?></a>
        </div>
    </div>
    <div class="selector" style="display:none;">
        <?foreach($arResult['SITES'] as $site):?>
            <div class="AccorsyslanguageContainer">
                <span class="flag-container-default-lang">
                    <span class="ico-flag-<?=strtoupper($site['CODE'])?>"></span>
                </span>
                <a href="<?=$site['LINK']?>" data-lang="<?=$site['CODE']?>"><?=$site['NAME']?></a>
            </div>
        <?endforeach;?>
    </div>
    <?
    if(method_exists ( $this , 'setFrameMode'))
        $frame->end();
    ?>
</div>

