<?
if(!check_bitrix_sessid()) return;

CJSCore::Init(array("jquery"));
$ariblockID = CIblock::getList(array(),array("CODE"=>'ALOCALE_IBLOCK'))->getNext();
$iblockID = $ariblockID["ID"];
?>
<form id="uninstallform" action="<?=$APPLICATION->GetCurPage()?>">
<?=bitrix_sessid_post()?>
	<input type="hidden" name="lang" value="<?=LANGUAGE_ID?>">
	<input type="hidden" name="id" value="accorsys.localization">
	<input type="hidden" name="uninstall" value="Y">
	<input type="hidden" name="step" value="2">
	<input type="hidden" name="iblockID" value="<?=$iblockID?>">
	<?=CAdminMessage::ShowMessage(GetMessage("LC_CAUTION_UNINSTALL"))?>
	<p><?=GetMessage('LC_UNINST_MESS')?></p>
	<p><font color="red"><?=GetMessage('CAUTION_MESS_1')?></font></p>
    <p><label>
        <input type="checkbox" name="remove_iblock" value="Y" /> <?=GetMessage('LC_UNINSTALL_DELETE_IBLOCK')?>
    </label></p>
    <p><label>
        <input type="checkbox" name="remove_settings" value="Y" /> <?=GetMessage("LC_USER_SETTINGS")?>
    </label></p>
    <div class="button inline_block">
        <input type="button" name="inst" value="<?=GetMessage('LC_UNINST_MOD')?>">
        <div class="preload inline_block">
            <div class="preloader" style="display:none;"></div>
        </div>
    </div>
</form>
<style>
    .preloader {
        width: 70px;
        height: 30px;
        background: #aaa;
        background: url("../images/accorsys.localization/preloader.gif") no-repeat center;
    }
    .preload {
        margin: 0px 12px 0px 0px;
        vertical-align: middle;
        margin-left: 15px;
    }
    .inline_block {
        display: inline-block;
    }
</style>
<script>
    $(function(){
        var iblockID = $('input[name="iblockID"]').val();
        var elementsCount = 300;
        $('input[name="inst"]').click(function(){
            $('#adm-favorites-cap-hint-block').parents('div:first').find('a').each(function(){
                if($(this).attr('href').indexOf('lc_inapp_purchases.php') + 1){
                    var idFav = $(this).parents('div.adm-submenu-item-name:first').attr('data-fav-id');
                    var url = '/bitrix/admin/favorite_act.php?act=delete&id='+idFav;
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: {'sessid':$('#sessid').val()}
                    });
                }
            });
            $(this).attr('disabled',true);
            $(this).closest('form').find('.preloader').show();
            if($('input[name="remove_iblock"]').is(':checked')){
                stepDeleteIblock(iblockID, elementsCount);
            }else{
                $('#uninstallform').submit();
            }
        });
        function stepDeleteIblock(iblockID, elementsCount){
            $.post('/ajax/accorsys.localization/accorsys_step_deleteIblock.php', {
                'iblockID': iblockID,
                'elementsCount':elementsCount,
                'action':'deleteiblock'
            },function(data){
                if($.trim(data) == 'GONEXT'){
                    stepDeleteIblock(iblockID,elementsCount);
                }else if($.trim(data) == 'COMPLETE'){
                    $('#uninstallform').submit();
                }
            });
        }
    });
</script>