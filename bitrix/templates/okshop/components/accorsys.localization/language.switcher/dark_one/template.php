<?php if(!defined("B_PROLOG_INCLUDED")||B_PROLOG_INCLUDED!==true)die();
if(method_exists ( $this , 'setFrameMode'))
    $this->setFrameMode(true);
?>
<?global $USER;?>
<div id="accorsys-switch-lang_menu" class="popup">
    <?
    if(method_exists ( $this , 'setFrameMode'))
        $frame = $this->createFrame()->begin();
    ?>
    <div class="accorsys-btn">
        <div class="AccorsyslanguageContainer default">
            <a data-lang="<?=$arResult['CURRENT']['CODE']?>"><?=$arResult['CURRENT']['CODE']?></a>
        </div>
    </div>
    <div class="selector" style="display:none;">
        <?foreach($arResult['SITES'] as $site):?>
            <div class="AccorsyslanguageContainer">
                <a href="<?=$site['LINK']?>" data-lang="<?=$site['CODE']?>"><?=$site['CODE']?></a>
            </div>
        <?endforeach;?>
    </div>
    <?
    if(method_exists ( $this , 'setFrameMode'))
        $frame->end();
    ?>
</div>

