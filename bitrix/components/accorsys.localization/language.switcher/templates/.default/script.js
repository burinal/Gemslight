
$(function(){
    var plusTopSwitcher = parseInt($('#accorsys-switch-lang').css('top')) == 'NaN' ? 0 : parseInt($('#accorsys-switch-lang').css('top'));
    $('body').click(function() {
        $('#accorsys-switch-lang .selector').hide();
    });
    $('#accorsys-switch-lang').click(function(event){
        $('#accorsys-switch-lang .selector').show();
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
    setSwitcherPosition();
});
