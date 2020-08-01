<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>

</div>
<footer id="footer" class="section footer">
    <div class="q-container container-inner">
        <div class="columns">
            <div class="column q-1-4-desktop column-left">
                <div class="inner">
                    <div class="logo_block">
                        <img src="<? echo SITE_TEMPLATE_PATH; ?>/images/logo_retina.png"/>
                    </div>
                    <div class="bottom">
                        <ul class="payments">
                            <li><img src="<? echo SITE_TEMPLATE_PATH; ?>/images/icons/visa.png"/></li>
                            <li><img src="<? echo SITE_TEMPLATE_PATH; ?>/images/icons/mastercard.png"/></li>
                            <li><img src="<? echo SITE_TEMPLATE_PATH; ?>/images/icons/paypal.png"/></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="column q-1-4-desktop column-left">
                <? $APPLICATION->IncludeComponent(
                    "bitrix:menu",
                    "footer-menu",
                    Array(
                        "ROOT_MENU_TYPE"        => "bottom1",
                        "MAX_LEVEL"             => "3",
                        "CHILD_MENU_TYPE"       => "submenu",
                        "USE_EXT"               => "Y",
                        "DELAY"                 => "N",
                        "ALLOW_MULTI_SELECT"    => "Y",
                        "MENU_CACHE_TYPE"       => "N",
                        "MENU_CACHE_TIME"       => "3600",
                        "MENU_CACHE_USE_GROUPS" => "Y",
                        "MENU_CACHE_GET_VARS"   => ""
                    )
                ); ?>
            </div>
            <div class="column q-1-4-desktop column-left">
                <? $APPLICATION->IncludeComponent(
                    "bitrix:menu",
                    "footer-menu",
                    Array(
                        "ROOT_MENU_TYPE"        => "bottom2",
                        "MAX_LEVEL"             => "3",
                        "CHILD_MENU_TYPE"       => "submenu",
                        "USE_EXT"               => "Y",
                        "DELAY"                 => "N",
                        "ALLOW_MULTI_SELECT"    => "Y",
                        "MENU_CACHE_TYPE"       => "N",
                        "MENU_CACHE_TIME"       => "3600",
                        "MENU_CACHE_USE_GROUPS" => "Y",
                        "MENU_CACHE_GET_VARS"   => ""
                    )
                ); ?>
            </div>
            <div class="column q-1-4-desktop column-right">
                <div class="inner">
                    <h4><? echo GetMessage("FOOTER_STAY"); ?></h4>
                    <ul class="icons">
                        <li class="icon_fb"><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li class="icon_tlg"><a href="#"><i class="fa fa-telegram" aria-hidden="true"></i></a></li>
                        <li class="icon_insta"><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                    </ul>
                    <ul class="contacts">
                        <li><img src="<? echo SITE_TEMPLATE_PATH; ?>/images/icons/icon_map.png"/> <span>Gemslight des Kuehbacher<br>Oskar Hirschgraben, 6003 Luzen</span></li>
                        <li><img src="<? echo SITE_TEMPLATE_PATH; ?>/images/icons/icon_phone.png"/> <a href="tel:+41764968108">+41 764 96 81 08</a></li>
                        <li><img src="<? echo SITE_TEMPLATE_PATH; ?>/images/icons/icon_email.png"/> <a href="mailto:info@gemslight.ch">info@gemslight.ch</a></li>
                    </ul>
                </div>
                <div class="vs-div2"></div>
            </div>
        </div>
    </div>
</footer>
</div>
<script src="<? echo SITE_TEMPLATE_PATH; ?>/js/scripts.js"></script>
<script src="<? echo SITE_TEMPLATE_PATH; ?>/js/scripts_lang.js"></script>
<script>
    setTimeout(init(), 3000);
</script>
</body>
</html>