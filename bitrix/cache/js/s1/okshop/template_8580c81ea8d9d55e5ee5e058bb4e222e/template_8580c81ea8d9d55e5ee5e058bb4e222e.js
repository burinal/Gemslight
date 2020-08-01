
; /* Start:"a:4:{s:4:"full";s:99:"/bitrix/components/accorsys.localization/language.switcher/templates/light/script.js?15410775122451";s:6:"source";s:84:"/bitrix/components/accorsys.localization/language.switcher/templates/light/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/

$(function(){
    var plusTopSwitcher = parseInt($('#accorsys-switch-lang').css('top')) == 'NaN' ? 0 : parseInt($('#accorsys-switch-lang').css('top'));
    $('body').click(function() {
        $('#accorsys-switch-lang')
            .find('.selector')
            .hide()
            .end()
            .find('.btn')
            .removeClass('not_clickable');
    });
    $('#accorsys-switch-lang').click(function(event){
        $('#accorsys-switch-lang')
            .find('.selector')
            .show()
            .end()
            .find('.btn')
            .addClass('not_clickable');

        event.stopPropagation();
    });
    $('#bx-panel-expander, #bx-panel-hider').click(function(){
        setTimeout(function(){setSwitcherPosition()},100);
    });
    $('#accorsys-switch-lang .selector a').click(function(){
        setCookie("current_language", $(this).data('lang'),{'path':'/'});
    });
    function setSwitcherPosition(){
        var height = $('#bx-panel').height();
        if(height == 'NaN' || height == 0){
            $('#accorsys-switch-lang').css({'top':plusTopSwitcher + 'px'})
        }else{
            height += plusTopSwitcher;
            $('#accorsys-switch-lang').css({'top':height+'px'})
        }
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
        if(exp && exp.toUTCString) { props.expires = exp.toUTCString()}

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
    setSwitcherPosition();
});

/* End */
;
; /* Start:"a:4:{s:4:"full";s:85:"/bitrix/components/bitrix/map.yandex.view/templates/.default/script.js?15410369191540";s:6:"source";s:70:"/bitrix/components/bitrix/map.yandex.view/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
if (!window.BX_YMapAddPlacemark)
{
	window.BX_YMapAddPlacemark = function(map, arPlacemark)
	{
		if (null == map)
			return false;

		if(!arPlacemark.LAT || !arPlacemark.LON)
			return false;

		var props = {};
		if (null != arPlacemark.TEXT && arPlacemark.TEXT.length > 0)
		{
			var value_view = '';

			if (arPlacemark.TEXT.length > 0)
			{
				var rnpos = arPlacemark.TEXT.indexOf("\n");
				value_view = rnpos <= 0 ? arPlacemark.TEXT : arPlacemark.TEXT.substring(0, rnpos);
			}

			props.balloonContent = arPlacemark.TEXT.replace(/\n/g, '<br />');
			props.hintContent = value_view;
		}

		var obPlacemark = new ymaps.Placemark(
			[arPlacemark.LAT, arPlacemark.LON],
			props,
			{balloonCloseButton: true}
		);

		map.geoObjects.add(obPlacemark);

		return obPlacemark;
	}
}

if (!window.BX_YMapAddPolyline)
{
	window.BX_YMapAddPolyline = function(map, arPolyline)
	{
		if (null == map)
			return false;

		if (null != arPolyline.POINTS && arPolyline.POINTS.length > 1)
		{
			var arPoints = [];
			for (var i = 0, len = arPolyline.POINTS.length; i < len; i++)
			{
				arPoints.push([arPolyline.POINTS[i].LAT, arPolyline.POINTS[i].LON]);
			}
		}
		else
		{
			return false;
		}

		var obParams = {clickable: true};
		if (null != arPolyline.STYLE)
		{
			obParams.strokeColor = arPolyline.STYLE.strokeColor;
			obParams.strokeWidth = arPolyline.STYLE.strokeWidth;
		}
		var obPolyline = new ymaps.Polyline(
			arPoints, {balloonContent: arPolyline.TITLE}, obParams
		);

		map.geoObjects.add(obPolyline);

		return obPolyline;
	}
}
/* End */
;; /* /bitrix/components/accorsys.localization/language.switcher/templates/light/script.js?15410775122451*/
; /* /bitrix/components/bitrix/map.yandex.view/templates/.default/script.js?15410369191540*/
