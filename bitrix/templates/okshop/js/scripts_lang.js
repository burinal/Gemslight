jQuery(function(){
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

jQuery(function(){
    var plusTopSwitcher = parseInt($('#accorsys-switch-lang_menu').css('top')) == 'NaN' ? 0 : parseInt($('#accorsys-switch-lang_menu').css('top'));
    $('body').click(function() {
        $('#accorsys-switch-lang')
            .find('.selector')
            .hide()
            .end()
            .find('.btn')
            .removeClass('not_clickable');
    });
    $('#accorsys-switch-lang_menu').click(function(event){
        $('#accorsys-switch-lang_menu')
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
    $('#accorsys-switch-lang_menu .selector a').click(function(){
        setCookie("current_language", $(this).data('lang'),{'path':'/'});
    });
    function setSwitcherPosition(){
        var height = $('#bx-panel').height();
        if(height == 'NaN' || height == 0){
            $('#accorsys-switch-lang_menu').css({'top':plusTopSwitcher + 'px'})
        }else{
            height += plusTopSwitcher;
            $('#accorsys-switch-lang_menu').css({'top':height+'px'})
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

$(document).ready(function () {
    var $forSearch = $('#forSearch'),
        $head_b = $('.head_b');
    $('#butShowHide').click(function () {
        $forSearch.finish();
        var vis = $('#forSearch').is(":visible"),
            text = vis ? 'Показать фото Галерею' : 'Скрыть фото Галерею';
        $head_b.text(text);
        $forSearch.slideToggle("slow");
        return false;
    });
});
$(document).ready(function () {
    var $forSign = $('#forSign'),
        $head_b = $('.head_b');
    $('#signShowHide').click(function () {
        $forSign.finish();
        var vis = $('#forSign').is(":visible"),
            text = vis ? 'Показать фото Галерею' : 'Скрыть фото Галерею';
        $head_b.text(text);
        $forSign.slideToggle("slow");
        return false;
    });
});
$(document).ready(function () {
    var $forSign = $('#forSignModal'),
        $head_b = $('.head_b');
    $('#signmodalShowHide').click(function () {
        $forSign.finish();
        var vis = $('#forSignModal').is(":visible"),
            text = vis ? 'Показать фото Галерею' : 'Скрыть фото Галерею';
        $head_b.text(text);
        $forSign.slideToggle("slow");
        return false;
    });
});