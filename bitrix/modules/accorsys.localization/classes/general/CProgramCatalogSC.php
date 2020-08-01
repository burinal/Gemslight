<?php
class CProgramCatalogSC {
    private $default_url = "";
    private $showcase_id = '';
    private $this_url = '';
    private $bxKey = '';
    private $default_cpage = 10;
    private $showcase_type = 'product_list';//product_list,product_detail,license_detail
    private $getData = array();
    private $data = array();
    private $products = array();
    private $mainProducts = array();
    private $arLicense= array();
    private $excludeProductCodeList = array();
    private $InstallParams = array();
    private $arLicenseB = array();
    private $arProductB = array();
    private $arSLresponce = array();
    private $main_product_code = false;
    private $DefaultUrlLang = array(
        'ru'=> 'http://www.programcatalog.ru/showcase_api/',
        'en'=> 'http://www.programcatalog.com/showcase_api/'
    );

    function __construct($arParams = array())
    {
        if(isset($arParams['default_url'])){
            $this->default_url=$arParams['default_url'];
        }
        if(isset($arParams['showcase_id'])){
            $this->showcase_id=$arParams['showcase_id'];
        }
        if(isset($arParams['bitrix_key'])){
            $this->bxKey=$arParams['bitrix_key'];
        }
        if(isset($arParams['showcase_type'])){
            $this->showcase_type=$arParams['showcase_type'];
        }
        if(isset($arParams['main_product_code'])){
            $this->main_product_code=$arParams['main_product_code'];
            self::setParams(array('main_product_code'=>$arParams['main_product_code']));
        }

        if(isset($arParams['main_product_code'])){
            self::setParams(array('exclude_products_code'=>$arParams['exclude_products_code']));
        }
        if(isset($arParams['is_point_rait'])){
            self::setParams(array('is_point_rait'=>$arParams['is_point_rait']));
        }

        if(isset($arParams['NAVIGATION'])){
            self::setParams(array('PAGEN_1'=>$arParams['NAVIGATION']["PAGE_1"]));
            if((int)$arParams['NAVIGATION']["COUNT"] > 0)
                self::setParams(array('COUNT'=>$arParams['NAVIGATION']["COUNT"]));
        }
        if(strlen($this->bxKey)<=0){
            require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/update_client.php");
            $this->bxKey = CUpdateClient::GetLicenseKey();
        }
        if( $this->bxKey != ''){
            //$this->InstallParams['BX_KEY'] = $this->bxKey;
            //������� ������� ������������

            $SL = new CAccorsysLS();
            $this->arLicenseB = $SL->getLicense();
            $this->arProductB = $SL->getProduct();
        }
        if(isset($arParams['lang'])){
            $this->default_url = $this->DefaultUrlLang[$arParams['lang']];
        }else{
            $this->default_url = $this->DefaultUrlLang['ru'];
        }
        if(isset($arParams['showcase_id']))
            $this->getShowCaseById();
    }
    /*
     * ������� �������� �������� �� ���� ��������
     */
    function getLicenseBbyProductCode($code){
        if(isset($this->arLicenseB[$code])){
            return $this->arLicenseB[$code];
        }else{
            return false;
        }
    }
    /*
     * ������� ��������� ���� �� ��������� �������� � ������
     */
    function isPurchasedLicenseByProductCode($code){
        if(isset($this->arProductB[$code])){
            return true;
        }else{
            return false;
        }
    }



    /*
     * ������� ��������� ���������� ��� �������
     */
    function setParams($ar=array()){
        //�������� ���������
        foreach($ar as $paramName=>$paramValue){
            $this->InstallParams[$paramName] = $paramValue;
        }
        //��������� ��������� � ������
        $i=0;
        $this->this_url = $this->default_url;
        foreach($this->InstallParams as $paramName=>$paramValue){
            if(is_array($paramValue)){
                foreach($paramValue as $value){
                    if($i==0){
                        $this->this_url.='?'.$paramName.'[]='.$value;
                    }else{
                        $this->this_url.='&'.$paramName.'[]='.$value;
                    }
                    $i++;
                }
            }else{
                if($i==0){
                    $this->this_url.='?'.$paramName.'='.$paramValue;
                }else{
                    $this->this_url.='&'.$paramName.'='.$paramValue;
                }
                $i++;
            }
        }
    }


    /*
     * ������� xml
     */
     function getShowCaseById($showcase_id = false){
         if($showcase_id == false){
             $showcase_id = $this->showcase_id;
         }
         //��������� �������� id �������
         self::setParams(array('ID'=>$showcase_id));
         //print_r($this->this_url);

         //$this->data = simplexml_load_file($this->this_url);

         $this->data = $this->Query($this->this_url);

         //print_r($this->data);
         if($this->data==false){
             //print_r(GetMessage("LC_ERROR_NO_INTERNET_CONNECTION"));
         }else{
             //���������� ������ ���������
             self::getProductsSystem();
             //���������� ������� ���������
         }

     }
     /*
     *
     * ������� �������� ������ �������� � �������������,�����,���-��� � ������
     */
     function getProductPrice($actionID = false,$itemID = false,$count = false){

         if($actionID === false || $itemID === false || $count === false)
             return array();

         //��������� �������� id �������
         self::setParams(array('ACTION'=>$actionID,
                               'ids'=>$itemID,
                               'qtys'=> $count));
         //print_r($this->this_url);
         //print_r($this->this_url);
         //$this->data = simplexml_load_file($this->this_url);

         //p($this->this_url);
         $this->data = $this->Query($this->this_url);

         //print_r($this->data);
         if($this->data == false){
             //print_r(GetMessage("LC_ERROR_NO_INTERNET_CONNECTION"));
         }else{
             //���������� ������ ���������
             return self::getPriceSystem();
         }
     }

    /**
     * ������� �������� ������ ������� � ���� �������
     * @param bool $actionID -> getProductCartList
     * @param bool $arItemID -> ������ ���� $arItemID[13231] = 13231
     * @param bool $arCount -> ������ ���� $arCount[13231] = 1
     * @return array
     */
    function getProductsPrice($actionID = false,$arItemID = false,$arCount = false){
        if($actionID === false || $actionID === false || $arCount === false)
            return array();

        self::setParams(array('ACTION'=>$actionID));
        //��������� �������� id �������
        foreach($arItemID as $k=>$v){
            self::setParams(
                array(
                    'ids['.$v.']'=>$v,
                    'qtys['.$v.']'=> $arCount[$v]
                )
            );
        }

        //$this->data = simplexml_load_file($this->this_url);
        $this->data = $this->Query($this->this_url, false, 3600);
        if($this->data == false){
            //print_r(GetMessage("LC_ERROR_NO_INTERNET_CONNECTION"));
        }else{
            //���������� ������ ���������
            return self::getPriceSystem();
        }
    }

    /*
    * ������� ������ ������ � �������� id �������� �� ��������
    */
    function getLicenseByProductIdQuery($id,$showcase_id = false){
        //��������� �������� productid
        if(!$showcase_id){
            $showcase_id = $this->showcase_id;
        }
        self::setParams(array('ID'=>$showcase_id,'productid'=>$id));
        $this->data = $this->Query($this->this_url);
        if($this->data==false){
            //print_r(GetMessage("LC_ERROR_NO_INTERNET_CONNECTION"));
        }else{
            self::getProductsSystem();
        }

        //������ ������ �������� ��������
        return $this->arLicense[$id];
    }

    /*
     * TODO::������� ��������� �����������
     */


    /*
     * ������� ������ ���������
     */
    protected function getProductsSystem(){
        if(!empty($this->data['xml_catalog']['#']['catalog'][0])){
            $this->products['showcase_name'] = $this->data['xml_catalog']['#']['show_case_name'][0]['#'];
            $this->products['show_case_product_count'] = $this->data['xml_catalog']['#']['show_case_product_count'][0]['#'];
            if(isset($this->data['xml_catalog']['#']['format_currency'][0]['#'])){
                foreach($this->data['xml_catalog']['#']['format_currency'][0]['#'] as $key => $value){
                    $this->products['format_currency'][$key] = $value[0]['#'];
                }
            }
            foreach($this->data['xml_catalog']['#']['catalog'][0]['#']['product'] as $arProduct){
                //$this->products[$arProduct['@']['id']] = $arProduct['#'];
                    $tempArProducte = array();
                    $tempArProducte['id'] = $arProduct['@']['id'];
                    foreach($arProduct['#'] as $k=>$v){
                        if($k == 'url_buy'){
                            $tempArProducte[$k] = $v[0]['#'].'&action=ADD2BASKETP&backurl=/cart/';
                        }elseif($k == 'screenshot_list'){
                            $tempScreenshotList = array();
                            foreach($v[0] as $key => $item){
                                foreach($item as $screenShot){
                                    foreach($screenShot as $shot){
                                        if(trim($shot['#']) != 'http://www.programcatalog.ru' && trim($shot['#']) != '')
                                            $tempScreenshotList[] = $shot['#'];
                                    }

                                }
                            }
                            $tempArProducte[$k] = $tempScreenshotList;
                        }else{
                            $tempArProducte[$k] = $v[0]['#'];
                        }

                    }
                //������� ��������� ��������
                $tempArProducte['IS_BUY'] = self::isPurchasedLicenseByProductCode($tempArProducte['code'])?'Y':'N';

                $this->products['ITEMS'][$arProduct['@']['id']] = $tempArProducte;

                self::getLicenseByProductIdSystem($tempArProducte['id'],$this->products['ITEMS']);
                //������� ���������� ������������� � ��������� ������
                if($tempArProducte['IS_BUY']=='Y'){
                    $this->products['ITEMS'][$arProduct['@']['id']]['qty'] = $GLOBALS['AC_MODE_'.$tempArProducte['code']];
                }
            }
            foreach($this->data['xml_catalog']['#']['catalog'][0]['#']['main_product'] as $arProduct){
                //$this->products[$arProduct['@']['id']] = $arProduct['#'];
                    $tempArProducte = array();
                    $tempArProducte['id'] = $arProduct['@']['id'];
                    foreach($arProduct['#'] as $k=>$v){
                        if($k == 'url_buy'){
                            $tempArProducte[$k] = $v[0]['#'].'&action=ADD2BASKETP&backurl=/cart/';
                        }elseif($k == 'screenshot_list'){
                            $tempScreenshotList = array();
                            foreach($v[0] as $key => $item){
                                foreach($item as $screenShot){
                                    foreach($screenShot as $shot){
                                        if(trim($shot['#']) != 'http://www.programcatalog.ru' && trim($shot['#']) != '')
                                            $tempScreenshotList[] = $shot['#'];
                                    }
                                }
                            }
                            $tempArProducte[$k] = $tempScreenshotList;
                        }else{
                            $tempArProducte[$k] = $v[0]['#'];
                        }
                    }
                //������� ��������� ��������
                $tempArProducte['IS_BUY'] = self::isPurchasedLicenseByProductCode($tempArProducte['code'])?'Y':'N';
                $this->mainProducts[$arProduct['@']['id']] = $tempArProducte;

                self::getLicenseByProductIdSystem($tempArProducte['id'], $this->mainProducts);
                //������� ���������� ������������� � ��������� ������
                if($tempArProducte['IS_BUY']=='Y'){
                    $this->mainProducts[$arProduct['@']['id']]['qty'] = $GLOBALS['AC_MODE_'.$tempArProducte['code']];
                }
            }
        }
        //$this->products = $this->data->catalog;
        return $this->products;
    }
    /*
     * ������� ������ ���
     */
    protected function getPriceSystem(){
        if(!empty($this->data['xml_catalog']['#']['catalog_basket'][0])){
            foreach($this->data['xml_catalog']['#']['catalog_basket'][0]['#']['item'] as $arProduct){
                //$this->products[$arProduct['@']['id']] = $arProduct['#'];
                    $tempArProducte = array();
                    $tempArProducte['id'] = $arProduct['@']['id'];
                    foreach($arProduct['#'] as $k=>$v){
                        $tempArProducte[$k] = $v[0]['#'];
                    }
                $this->products['items'][] = $tempArProducte;
            }
            $this->products['sum_cart_price'] = $this->data['xml_catalog']['#']['catalog_basket'][0]['#']['sum_cart'][0]['#'];

            if(isset($this->data['xml_catalog']['#']['format_currency'][0]['#'])){
                foreach($this->data['xml_catalog']['#']['format_currency'][0]['#'] as $key => $value){
                    $this->products['format_currency'][$key] = $value[0]['#'];
                }
            }
        }
        //$this->products = $this->data->catalog;
        return $this->products;
    }

    /*
     * ������ ������ ���������
     */
    function getProducts(){
        if(count($this->products["ITEMS"])>0){
            return $this->products;
        }
        return false;
    }
    function getProductById($id){
        if(isset($this->products["ITEMS"][$id])){
            return $this->products["ITEMS"][$id];
        }
        return false;
    }
    function getProductByCode($code){
        foreach($this->products["ITEMS"] as $product){
            if($product['code'] == $code){
                return $product;
            }
        }
        return false;
    }
    function getMainProductByCode($code){
        foreach($this->mainProducts as $product){
            if($product['code'] == $code){
                return $product;
            }
        }
        return false;
    }
    function getNavigationArray(){
        $arValue = array();
        foreach($this->data['xml_catalog']['#']['nav'][0]['#'] as $code => $value){
            $arValue[$code] = $value[0]['#'];
        }
        return $arValue;
    }


    /*
     * �������� ������ �������� �� id �������� ��� �������
     */
    protected function getLicenseByProductIdSystem($id,$arProduct){

        if(isset($arProduct[$id])){
            if(count($arProduct[$id]['product_editions']['product_edition'])>0){
                $arLicense = array();
                foreach($arProduct[$id]['product_editions']['product_edition'] as $editionGroup){
                    $arLicense[$editionGroup['@']['id']]['name_section'] = $editionGroup['#']['name'][0]['#'];
                    $arLicense[$editionGroup['@']['id']]['group_name'] = $editionGroup['#']['group_name'][0]['#'];
                    foreach($editionGroup['#']['product_edition_element'] as $arlicen){
                        $tempArLicense = array();
                        $tempArLicense['id'] = $arlicen['@']['id'];
                        foreach($arlicen['#'] as $k=>$v){
                            if($k == 'url_buy'){
                                $tempArLicense[$k] = $v[0]['#'].'&action=ADD2BASKETP&backurl=/cart/';
                            }else{
                                $tempArLicense[$k] = $v[0]['#'];
                            }
                        }
                        //p($tempArLicense);
                        //p($this->arLicenseB);
                        if(isset($this->arLicenseB[$tempArLicense['article']])){
                            //����� ����� ���������))
                            $tempArLicense['buy_qty'] = $this->arLicenseB[$tempArLicense['article']]['QTY'];
                            $tempArLicense['IS_BUY'] = "Y";
                        }
                       // p($arlicen);
                        $arLicense[$editionGroup['@']['id']]['ITEMS'][] = $tempArLicense;
                    }
                }

                //die();
                //isPurchasedLicenseByProductCode
                $this->arLicense[$id] = $arLicense;
            }
            return $this->arLicense;
        }
        return false;
    }
    /*
     * �������� ������ �������� �� id �������� �
     */
    function getLicenseByProductId($id){
        if(isset($this->arLicense[$id])){
            return $this->arLicense[$id];
        }
        return false;
    }
    /*
     * ������� �������� ���������� ���������� �������� � ��������
     */
    function getCountLicenseByProductId($id){
        if(isset($this->arLicense[$id])){
            $count = 0;
            foreach($this->arLicense[$id] as $group){
                $count+=count($group['ITEMS']);
            }
            return $count;
        }
        return 0;
    }



    function setData($ar){
        $this->getData = array_merge($this->getData,$ar);
    }

    public function Query($url,$arParams = false, $cacheTime = 21600){
        global $APPLICATION;

        if(strpos('?',$url)){
            $url.='&';
        }else{
            $url.='?';
        }

        foreach($arParams as $paramName=>$paramVal){
            $url.=$paramName.'='.$paramVal.'&';
        }

        $url = substr($url,0,strlen($url)-1);

        $obCache = new CPHPCache();

        $cacheID = 'ProgramCatalogSC'.md5($url);
        $cachePath = '/ProgramCatalogSC/'.$cacheID;

        if ($cacheTime > 0 && $obCache->InitCache($cacheTime, $cacheID, $cachePath))
        {
            $vars = $obCache->GetVars();
            $result = unserialize($vars['result']);

        }
        if (!isset($result) || strlen($result)<0)
        {
            if(ini_get('allow_url_fopen') == 1){
                $result = @file_get_contents($url, false, stream_context_create(array(
                    'http' => array(
                        'method'  => 'POST',
                        'header'  => 'Content-type: application/x-www-form-urlencoded',
                        //'content' => http_build_query($params)
                    )
                )));
            }elseif(function_exists('curl_init')){
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_HEADER, 0);
                curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
                curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
                $result = curl_exec($ch);
                curl_close($ch);
            }else{
                $ht = new CHTTP();

                if($res = $ht->Get($url))
                {
                    if(in_array($ht->status, array("200")))
                    {
                        $result = $res;
                    }
                }
            }

            //////////// end cache /////////
            if ($cacheTime > 0)
            {
                $obCache->StartDataCache($cacheTime, $cacheID, $cachePath);
                $obCache->EndDataCache(array('result' => serialize($result)));
            }
        }


        if($result){
            $res = $APPLICATION->ConvertCharset($result, "windows-1251", SITE_CHARSET);
            require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/xml.php");
            $objXML = new CDataXML();
            $objXML->LoadString($res);
            $arResult = $objXML->GetArray();
            if(!empty($arResult) && is_array($arResult))
            {
                return $arResult;
            }
        }

        return false;

    }
} 