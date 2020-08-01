
; /* Start:"a:4:{s:4:"full";s:84:"/bitrix/templates/okshop/components/bitrix/menu/catalog-menu/script.js?1535138016543";s:6:"source";s:70:"/bitrix/templates/okshop/components/bitrix/menu/catalog-menu/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(function(){
	if($(".emarket-catalog-menu").is(":hidden")) { 
		var timeout_id;
		
		$(".header .catalog-link").on("mouseenter", function(){
			var parent = $(this);
			timeout_id = setTimeout(function(){
				parent.children('.emarket-catalog-menu').stop(true, true);
				parent.children('.emarket-catalog-menu').slideDown(300);
			} , 300);
		})
		$(".header .catalog-link").on("mouseleave", function(){
			if(timeout_id)
				clearTimeout(timeout_id);
			
			$(this).children('.emarket-catalog-menu').slideUp(200);
		})
	}
})
/* End */
;; /* /bitrix/templates/okshop/components/bitrix/menu/catalog-menu/script.js?1535138016543*/
