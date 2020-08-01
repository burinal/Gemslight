<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();
//CJSCore::Init('jquery');
IncludeTemplateLangFile(__FILE__);
CModule::IncludeModule("krayt.okshop");
CKraytUtilit::LoadColorChem($_REQUEST);
$cur_page = $APPLICATION->GetCurPage(true);
$cp = str_replace(SITE_DIR, "/", $cur_page );
$cur_page_arr = explode('/', $cp);
CJSCore::RegisterExt('lang_js', array(
    'lang' => SITE_TEMPLATE_PATH.'/lang/'.LANGUAGE_ID.'/js/script.php'
));
CJSCore::Init(array('lang_js'));
$GLOBALS['KRAYT_is_sb'] = COption::GetOptionString("krayt.okshop", "k_layout");
$GLOBALS['KRAYT_color'] = COption::GetOptionString("krayt.okshop", "k_color");

if(!$GLOBALS['KRAYT_color'])
{
    $GLOBALS['KRAYT_color'] = 'emerland';
}

if( $GLOBALS['KRAYT_is_sb'] == 1)
{
  $GLOBALS['KRAYT_is_sb'] = true;           
}elseif($k_t == 2 )
{
  $GLOBALS['KRAYT_is_sb'] = false;   
}else
{
    $GLOBALS['KRAYT_is_sb'] = false;
}
use Bitrix\Main\Page\Asset;
?>
<!DOCTYPE html>
<html>
	<head>	
		<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
		<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

		<?
//        $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/all.css");
//        $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/".$GLOBALS['KRAYT_color']."/style.css");
		//include fonts	

		//include jquery-1.11.0 (http://jquery.com/)
//		$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/jquery-1.11.0.min.js");
		//include formstyler (https://github.com/Dimox/jQueryFormStyler)
//		$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/js/formstyler/jquery.formstyler.css");
//		$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/formstyler/jquery.formstyler.min.js");
		//include script to check number (http://digitalbush.com/projects/masked-input-plugin/)
//		$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/jquery.maskedinput.min.js");
//		$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/is.mobile.js");
		//include masonry (http://masonry.desandro.com/)
//		$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/masonry.pkgd.min.js");
        //include jscrollpane (https://github.com/vitch/jScrollPane)
//        $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH.'/js/jscrollpane/jquery.mousewheel.js');
//        $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH.'/js/jscrollpane/jquery.jscrollpane.min.js');
//        $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH.'/js/jscrollpane/jquery.jscrollpane.css');
		//include main script
//		$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/script.js");
//        $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/jquery.elevatezoom.js");
//        $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/jquery.cookie.js");
		$APPLICATION->ShowHead();
		?>
		<title><?$APPLICATION->ShowTitle();?></title>
        <?php
        $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/css/bootstrap.css");
        $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/styles.css");
        $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/fonts/fonts.css", true);
        Asset::getInstance()->addString("<link href='https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900|Roboto+Slab:100,300,400&amp;subset=cyrillic' rel='stylesheet'>");
        Asset::getInstance()->addString("<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>");
        ?>
		<script type="text/javascript">
//         var EmarketSite = {SITE_DIR:'<?//=SITE_DIR?>//'};
//			(function($) {
//				$(function() {
//					$('select').styler();
//				});
//			})(jQuery);
        </script>

	</head>
<body>
	<div id="panel"><?$APPLICATION->ShowPanel();?></div>
    <!-- LOADING -->
    <div class="loader"></div>
    <div id="overlay">
        <div id="loading-items">
            <a href="#" class="logo-loading">
                <img src="<? echo SITE_TEMPLATE_PATH; ?>/images/logo_retina.png"/>
            </a>
            <h5 id="progstat"></h5>
        </div>
    </div>
    <div id="content-overlay"></div>
    <div id="progress-overlay"></div>
    <!-- /LOADING -->
    <!-- MENU BLOCK -->
    <div class="navbar-header" id="mainNav1">
        <div class="navbar-header-toggle">
            <div class="navbar-btn">
                <div class="navbar-btn-label" id="mainNav">
                    <span class="navbar-btn-label-menu">Menu</span>
                </div>
            </div>
        </div>
        <div class="other_navbar_buttons">
            <div class="social search_button" id="butShowHide" style='cursor:pointer'>
                <img class="head_b" src="<? echo SITE_TEMPLATE_PATH; ?>/images/icons/search_icon.png"/>
            </div>
            <div class="social sign_button" id="signShowHide" style='cursor:pointer'>
                <img class="head_b" src="<? echo SITE_TEMPLATE_PATH; ?>/images/icons/signin_icon.png"/>
            </div>
            <div class="social cart_button">
                <?$APPLICATION->IncludeComponent("krayt:sale.basket.basket.small", "light", array(
                    "PATH_TO_BASKET" => SITE_DIR."personal/basket/",
                    "PATH_TO_ORDER" => SITE_DIR."personal/order.php",
                    "SHOW_DELAY" => "N",
                    "SHOW_NOTAVAIL" => "N",
                    "SHOW_SUBSCRIBE" => "N"
                ),
                    false
                );?>
            </div>
        </div>
        <div class="lang_navbar">
            <div class="language-container">
                <?$APPLICATION->IncludeComponent(
                    "accorsys.localization:language.switcher",
                    "dark",
                    Array(
                        "CACHE_TIME" => "3600",
                        "CACHE_TYPE" => "A"
                    )
                );?>

            </div>
        </div>
    </div>
    <div class="sign_modal" style="display:none;" id="forSign">
        <?$APPLICATION->IncludeComponent("bitrix:system.auth.form", "emarket_auth", array(
            "REGISTER_URL" => SITE_DIR."auth/",
            "FORGOT_PASSWORD_URL" => "",
            "PROFILE_URL" => SITE_DIR."personal/",
            "SHOW_ERRORS" => "N"
        ),
            false
        );?>
    </div>
    <div class="search_modal" style="display:none;" id="forSearch">
        <?$APPLICATION->IncludeComponent(
            "bitrix:search.title",
            "light",
            array(
                "NUM_CATEGORIES" => "1",
                "TOP_COUNT" => "5",
                "ORDER" => "rank",
                "USE_LANGUAGE_GUESS" => "Y",
                "CHECK_DATES" => "N",
                "SHOW_OTHERS" => "N",
                "PAGE" => "#SITE_DIR#search/index.php",
                "CATEGORY_0_TITLE" => GetMessage("H_CATALOG_S"),
                "CATEGORY_0" => array(
                    0 => "iblock_catalog",
                ),
                "CATEGORY_0_iblock_catalog" => array(
                    0 => "6",
                ),
                "SHOW_INPUT" => "Y",
                "INPUT_ID" => "emarket-search-input",
                "CONTAINER_ID" => "emarket-search"
            ),
            false
        );?>
    </div>
    <div class="navbar-header-mobile" id="navMobile">
        <a href="/" class="logo">
            <img src="<? echo SITE_TEMPLATE_PATH; ?>/images/logo.png" alt="">
        </a>
        <div class="navbar-btn-bars" id="navMobileBtn">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <div id="navOverlay"></div>
<!--     POPUP MENU -->
    <div id="navContent">
        <div class="navbar-header close" id="closePop">
            <div class="navbar-header-toggle">
                <div class="navbar-btn">
                    <div class="navbar-btn-label">
                        <span class="navbar-btn-label-menu">X</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="top_container">
            <div class="social sign_button" id="signmodalShowHide" style='cursor:pointer'>
                <img class="head_b" src="<? echo SITE_TEMPLATE_PATH; ?>/images/icons/signin_icon.png"/>
            </div>
            <div class="search_modal menusearch">
                <?$APPLICATION->IncludeComponent(
                    "bitrix:search.title",
                    "light",
                    array(
                        "NUM_CATEGORIES" => "1",
                        "TOP_COUNT" => "5",
                        "ORDER" => "rank",
                        "USE_LANGUAGE_GUESS" => "Y",
                        "CHECK_DATES" => "N",
                        "SHOW_OTHERS" => "N",
                        "PAGE" => "#SITE_DIR#search/index.php",
                        "CATEGORY_0_TITLE" => GetMessage("H_CATALOG_S"),
                        "CATEGORY_0" => array(
                            0 => "iblock_catalog",
                        ),
                        "CATEGORY_0_iblock_catalog" => array(
                            0 => "6",
                        ),
                        "SHOW_INPUT" => "Y",
                        "INPUT_ID" => "emarket-search-input",
                        "CONTAINER_ID" => "emarket-search"
                    ),
                    false
                );?>
            </div>
            <div class="social cart_button">
                <?$APPLICATION->IncludeComponent("krayt:sale.basket.basket.small", "light", array(
                    "PATH_TO_BASKET" => SITE_DIR."personal/basket/",
                    "PATH_TO_ORDER" => SITE_DIR."personal/order.php",
                    "SHOW_DELAY" => "N",
                    "SHOW_NOTAVAIL" => "N",
                    "SHOW_SUBSCRIBE" => "N"
                ),
                    false
                );?>
            </div>

        </div>
        <div class="q-container container-inner">
            <? $APPLICATION->IncludeComponent(
                    "bitrix:menu",
                    "main-menu",
                        Array(
                            "ROOT_MENU_TYPE"        => "top",
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
        <div class="bottom_container">
            <div class="lang_navbar">
                <div class="language-container">
                    <?$APPLICATION->IncludeComponent(
                        "accorsys.localization:language.switcher",
                        "dark_one",
                        Array(
                            "CACHE_TIME" => "3600",
                            "CACHE_TYPE" => "A"
                        )
                    );?>

                </div>
            </div>
        </div>
        <div class="sign_modal" style="display:none;" id="forSignModal">
            <?$APPLICATION->IncludeComponent("bitrix:system.auth.form", "emarket_auth", array(
                "REGISTER_URL" => SITE_DIR."auth/",
                "FORGOT_PASSWORD_URL" => "",
                "PROFILE_URL" => SITE_DIR."personal/",
                "SHOW_ERRORS" => "N"
            ),
                false
            );?>
        </div>

    </div>
<!--     POPUP MENU END -->
<!--     /MENU BLOCK -->
<!--     MAIN BLOCK -->
    <div id="mainContent" class="q_smooth">
        <header id="header" class="header">
            <div class="q-container">
                <div class="columns">
                    <div class="column logo-wrap">
                        <a href="/" class="logo">
                            <img src="<? echo SITE_TEMPLATE_PATH; ?>/images/logo.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <div class="vs-div">