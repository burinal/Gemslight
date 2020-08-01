<form name='new_locale_tag'>
    <span class="name-bold">Язык перевода</span>
    <div class="search-popup-block-wrapper">
        <select>
            <option selected="selected">Выбрать</option>
            <option value="en">Английский</option>
            <option value="ru">Русский</option>
        </select>
    </div>
    <input type='hidden' name='text' value='' />
    <input type='hidden' name='lang' value='ru' />
    <span class="name-bold">Текст для перевода</span>
    <div class="locale-block">
        <div class="locale-select">
            <a class="locale-flag"></a>
            <textarea id="translation"></textarea>
            <div class="clr" ></div>
        </div>
    </div>
    <div class="adm-workarea" style="text-align:center">
        <input class="adm-btn-cancel" type="button" value="Закрыть" name='cancel' />
    </div>
</form>