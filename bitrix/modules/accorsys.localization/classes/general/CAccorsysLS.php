<?php

class CAccorsysLS extends CProgramCatalogSC {

    private $defaulSLurl = 'https://licensing.accorsys.com:8080/';
    //private $client;
    private $arLicense;
    private $arSLresponce;
    private $arProduct;
    private $bxKey;
    private $moduleId;
    function __construct($moduleId = false){
        require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/update_client.php");
        $this->bxKey = CUpdateClient::GetLicenseKey();
        if($moduleId)$this->moduleId = $moduleId;
    }
    function getBuyLS(){

        $this->arSLresponce = $this->query(
            $this->defaulSLurl.'api/v1/bound_order_items',
            array(
                "boundLicenseToken"=>md5($this->bxKey)
            )
        );
        if($this->arSLresponce != 502){

            if(count($this->arSLresponce->licenses) > 0){

                if(strlen($this->moduleId)>0)
                    CAccorsysExtensionsAccess::writeAccess($this->moduleId,$this->arSLresponce);

                $sumLicenseType = array();
                foreach($this->arSLresponce->licenses as $val){
                    $this->arProduct[$val->productCode] = array(
                        "VENDOR_CODE"=>$val->vendorCode,
                        "CATALOG_ORDER_ID"=>$val->orderNumberExternal,
                        "CODE"=>$val->productCode
                    );

                    $qty = 0;
                    if(isset($sumLicenseType[$val->licenseTypeId])){
                        $qty = $this->arLicense[$val->licenseTypeId]['QTY'];
                    }

                    $this->arLicense[] = array(
                        "CODE"=>$val->licenseTypeId,
                        "PRODUCT_CODE"=>$val->productCode,
                        "MAJOR_VERSION"=>$val->majorVersionCode,
                        "QTY"=>$val->licenseQuantity,
                        "EXPIRE_DATE" => $val->expiryDate
                    );


                    /*$this->arLicense[$val->licenseTypeId]['QTY'] = intval($qty)
                        + intval($val->licenseQuantity);*/

                    $sumLicenseType[$val->licenseTypeId] = intval($qty)
                        + intval($val->licenseQuantity);

                    $GLOBALS['AC_MODE_'.$val->productCode]= $sumLicenseType;
                }
                $this->saveBuy();
            }else{
                CAccorsysExtensionsAccess::delAccess($this->moduleId);
                $this->delBuy();
                global $DB;
                $fpath = $_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/".$this->moduleId."/install/mysql/install.sql";
                if(file_exists($fpath)){
                    $this->errors = $DB->RunSQLBatch($fpath);
                }
            }

        }

        return $this->arSLresponce;

    }

    function query($url,$arParams = array(),$type='GET'){
        $data = '';



        if($type == 'GET'){
            $arHttp = array(
                'method'  => $type,
                'header'  => 'Content-type: application/x-www-form-urlencoded',
                'content' => http_build_query($data)
            );
            if(strpos('?',$url)){
                $url.='&';
            }else{
                $url.='?';
            }
            foreach($arParams as $paramName=>$paramVal){
                $url.=$paramName.'='.$paramVal.'&';
            }

            $url = substr($url,0,strlen($url)-1);

            if(function_exists('curl_init') && ($ch = curl_init())) {

                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
                curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
                curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
                curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0);

                $result = curl_exec($ch);

                /*$curlErrno = curl_errno($ch);

                if($curlErrno){
                    $curlError = curl_error($ch);
                    //throw new Exception($curlError);
                }*/

            }else{
                $result = @file_get_contents($url, false, stream_context_create(array(
                    'https' => $arHttp
                )));
            }


        }else{

            if(strtoupper(LANG_CHARSET) != "UTF-8")
                foreach($arParams as $k=>$v){
                    $arParams[$k] = iconv(LANG_CHARSET,"UTF-8",$v);
                }

            if(function_exists('curl_init') && ($ch = curl_init())){

                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Content-type: application/json',
                ));

                $jsonParam = json_encode($arParams,JSON_UNESCAPED_UNICODE);

                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                //curl_setopt($ch, CURLOPT_HEADER, 1);
                curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,20);
                curl_setopt($ch, CURLOPT_FRESH_CONNECT, 1);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
                curl_setopt($ch, CURLOPT_DNS_USE_GLOBAL_CACHE, 0);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonParam);

                $result = curl_exec($ch);

                $curlErrno = curl_errno($ch);
                if ($curlErrno) {
                    $curlError = curl_error($ch);
                }
                curl_close($ch);

            }else{
                $jsonParam = json_encode($arParams,JSON_UNESCAPED_UNICODE);

                $opts = array('http' =>
                    array(
                        'method' => 'POST',
                        'ignore_errors' => TRUE,
                        'header' => "Content-type: application/json \r\n" ,
                        'content' => $jsonParam
                    )
                );
                $context  = stream_context_create($opts);
                $result = @file_get_contents($url, false, $context);
            }
        }
        return self::returnQuery($result);
    }


    function saveBuy(){
        global $DB;
        $isertData = "";
        if(count($this->arLicense) > 0){
            foreach($this->arLicense as $license){
                $DB->Query("DELETE FROM accorsys_license_buy WHERE MODULE_ID='".$license["PRODUCT_CODE"]."'");
                $isertData .= " ('".$license["PRODUCT_CODE"]."', '".$license["CODE"]."', ".$license["QTY"].", '".$license["EXPIRE_DATE"]."'),";
            }
            if ($isertData{strlen($isertData)-1} == ',') {
                $isertData = substr($isertData,0,-1);
            }
            $DB->Query("INSERT INTO accorsys_license_buy (MODULE_ID, LICENSE_TYPE_ID, QTY, EXPIRE_DATE) VALUES".$isertData);
        }
    }

    function delBuy(){
        global $DB;
        $DB->Query("DELETE FROM accorsys_license_buy WHERE MODULE_ID='".$this->moduleId."'");
    }


    function getBuy(){
        global $DB;
        return $DB->Query("SELECT * FROM accorsys_license_buy", false, "File: ".__FILE__."<br>Line: ".__LINE__);
    }
    function getLicense(){
        if(count($this->arLicense)>0){
            return $this->arLicense;
        }
        else{
            return false;
        }
    }
    function getProduct(){
        if(count($this->arProduct)>0){
            return $this->arProduct;
        }
        else{
            return false;
        }
    }

    function returnQuery($result){
        if($result === false){
            $arReturn = 502;
        }else{
            $arReturn = json_decode($result);
        }


        try {
            $obEr = new errorCheckingSL($arReturn);
        } catch (exceptionSL $e) {

            return $e;/*array(
                'code'=>$e->getCode(),
                'message'=>$e->getMessage()
            );*/
        }

        return $arReturn;
    }

    function activate($key){
        $arSettings = CAccorsysSettingsSL::get($this->moduleId);

        IncludeModuleLangFile(__FILE__);
        $r = $this->query(
            $this->defaulSLurl.'api/v1/licenses/activateExtension',
            array(
                "licenseKey"=>trim($key),
                "vendorCode"=>$arSettings['vendorCode'],
                "productCode"=>$arSettings['productCode'],
                "installationId"=>$arSettings['installationId'],
                "productVersionCode"=>$arSettings['productVersionCode'],
                "registrationName"=>$arSettings['registrationName'],
                "currentDateTime"=>gmdate('Y-m-d', time()).'T'.gmdate('H:i:s', time()).'Z',//date("Y-m-d").'T'.date("H:i:s").'Z',
                "clientIp"=>$_SERVER['REMOTE_ADDR'],
                "boundLicenseToken"=>md5($this->bxKey)
            ),
            "POST"
        );




        if($r != false){

            if(is_object($r) &&  get_class($r) == 'exceptionSL'){

                return array(
                    'activate'=>$r->getCode(),
                    'message'=>$r->getMessage()
                );
            }

            try {
                $obEr = new errorCheckingSL($r->result);
            } catch (exceptionSL $e) {

                return array(
                    'activate'=>$e->getCode(),
                    'message'=>$e->getMessage()
                );
            }

            try {
                if($r->installationIdActivationFound == 1){
                    $obEr = new errorCheckingSL(5);
                }
            } catch (exceptionSL $e) {

                return array(
                    'activate'=>$e->getCode(),
                    'message'=>$e->getMessage()
                );
            }
        }

        self::getBuyLS();
        //CAccorsysExtensionsAccess::writeAccess($this->moduleId,$r);

        $arReturn = array(
            'activate'=>'1',
            'message'=>iconv(LANG_CHARSET,"UTF-8",GetMessage('LC_LICENSING_KEY_ACTIVATION_SUCCESS'))
        );

        return $arReturn;
    }
}
class exceptionSL extends Exception{
    public function __construct($message, $code = 0, Exception $previous = null) {
        parent::__construct($message, $code, $previous);
    }
    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }
    /*public function customFunction() {
    }*/
}
class errorCheckingSL
{
    const THROW_FAILED  = 1;
    const THROW_ERROR_SERVER = 502;
    const THROW_LICENSE_IS_BLOCKED = 2;
    const THROW_NO_AVAILABLE_ACTIVATIONS = 3;
    const THROW_LICENSE_HAS_EXPIRED = 4;
    const THROW_INSTALLATION_ID_ACTIVATION_FOUND = 5;
    function __construct($avalue = 0) {
        if(property_exists($avalue,'errors')){
            foreach($avalue->errors as $arError){
                throw new exceptionSL($arError->description, $arError->code);
            }
        }elseif(is_numeric($avalue)){
            IncludeModuleLangFile(__FILE__);

            switch ($avalue){
                case self::THROW_FAILED:
                    throw new exceptionSL(iconv(LANG_CHARSET,"UTF-8",GetMessage('LC_LICENSING_ACTIVATION_FAILED')), 0);//'not activation license 1'
                    break;
                case self::THROW_LICENSE_IS_BLOCKED:
                    throw new exceptionSL(iconv(LANG_CHARSET,"UTF-8",GetMessage('LC_LICENSING_LICENSE_KEY_BLOCKED')), 2);//LicenseIsBlocked
                    break;
                case self::THROW_NO_AVAILABLE_ACTIVATIONS:
                    throw new exceptionSL(iconv(LANG_CHARSET,"UTF-8",GetMessage('LC_LICENSING_NO_ACTIVATIONS_AVAILABLE')), 3); //'NoAvailableActivations'
                    break;
                case self::THROW_LICENSE_HAS_EXPIRED:
                    throw new exceptionSL(iconv(LANG_CHARSET,"UTF-8",GetMessage('LC_LICENSING_LICENSE_EXPIRED')), 4);//'LicenseHasExpired'
                    break;
                case self::THROW_INSTALLATION_ID_ACTIVATION_FOUND:

                    throw new exceptionSL(iconv(LANG_CHARSET,"UTF-8",GetMessage('LC_LICENSING_LICENSE_KEY_ALREADY_ACTIVATED')), 5);
                    break;
                case self::THROW_ERROR_SERVER:
                    throw new exceptionSL(iconv(LANG_CHARSET,"UTF-8",'Bad Gateway'), 502);
                    break;
                default:
                    return $avalue;
                    break;
            }
        }else{
            return $avalue;
        }
    }
}

class CAccorsysSettingsSL {
    static function write($moduleId,$arParams=array()){
        include($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/".$moduleId."/.sl.settings.php");
        $arNewParam = array(
            "vendorCode"=>'',
            "productCode"=>'',
            "productVersionCode"=>'',
            "installationId"=>'',
            "registrationName"=>''
        );

        if(!empty($arParams)){
            foreach($arParams as $key=>$val){
                $arSettingsSL[$key] = $val;
            }
        }
        foreach($arSettingsSL as $key=>$val){
            $arNewParam[$key] = $val;
        }
        if(!isset($arNewParam['installationId']) || empty($arNewParam['installationId'])){
            require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/update_client.php");
            $bxKey = CUpdateClient::GetLicenseKey();
            $arUpdateList = CUpdateClient::GetUpdatesList($error, LANG, "Y");
            $arNewParam['registrationName'] = $arUpdateList['CLIENT'][0]['@']['NAME'];
            $arNewParam['installationId'] = md5($bxKey.time());
        }
        $strSettings = "<?\n";
            $strSettings.= '$arSettingsSL = array('."\n";
                $i = 1;
                foreach($arNewParam as $key=>$val){
                    $strSettings.= "\t".'"'.str_replace('"','\"',$key).'"=>"'.str_replace('"','\"',$val).'"';
                    if($i<count($arNewParam))
                        $strSettings.= ",\n";
                    $i++;
                }
            $strSettings.="\n".');'."\n";
        $strSettings.='?>';
        $pathSettings = $_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/".$moduleId."/.sl.settings.php";
        $h = @fopen($pathSettings, "w");
        @fwrite($h, $strSettings);
        @fclose($h);
        // $APPLICATION->SaveFileContent($DOC_ROOT.$path, "<"."?\n".$strMenuLinks."\n?".">");
    }

    static function get($moduleId){
        include($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/".$moduleId."/.sl.settings.php");
        return $arSettingsSL;
    }
}


class CAccorsysExtensionsAccess {
    private $obRestriction = array();
    private $moduleId = '';

    function __construct($moduleId){
        $this->moduleId = $moduleId;
        self::isModuleUpdate($moduleId);
    }

    static function writeAccess($moduleId,$obQuerySL = false){

        if(strlen($moduleId)<=0 || !$obQuerySL )return false;
        global $DB;
        $moduleId = trim($moduleId);

        $arLicense = array();
        if(property_exists($obQuerySL,'licenses')){
            foreach($obQuerySL->licenses as $k=>$v){
                if($moduleId == $v->productCode){
                    $arLicense[] = array(
                        'licenseTypeId'=>$v->licenseTypeId,
                        'licenseQuantity'=>$v->licenseQuantity,
                        'expiryDate'=>$v->expiryDate
                    );
                }
            }
        }elseif(property_exists($obQuerySL,'licenseTypeId')){
            $arLicense[] = array(
                'licenseTypeId'=>$obQuerySL->licenseTypeId,
                'licenseQuantity'=>$obQuerySL->licenseQuantity,
                'expiryDate'=>$obQuerySL->expiryDate
            );
            $isAddExtention = true;
        }

        $arBuyLicense = array();
        foreach($arLicense as $key=>$arExtention){
            $arTempExten = array();
            switch($arExtention['licenseTypeId']){
                case 'AL-2-NS-UL':
                    $arBuyLicense['EXTENSIONS'][$arExtention['licenseTypeId']]["TYPE"] = 'user';
                    $arBuyLicense['EXTENSIONS'][$arExtention['licenseTypeId']]["VALUE"] += $arExtention['licenseQuantity'];
                    break;
                case 'LC-2-OTHER':
                    $arTempExten[] = array(
                        "TYPE"=>'other',
                        "VALUE"=>$arExtention['expiryDate']
                    );
                    $arBuyLicense['EXTENSIONS'][] = $arTempExten;
                    break;
            }

        }

        //var_dump($arBuyLicense['EXTENSIONS']);
        if(count($arBuyLicense['EXTENSIONS']) > 0){
            $strExtention = serialize($arBuyLicense['EXTENSIONS']);
            $h = @fopen($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/".$moduleId."/license.ini", "w");
            @fwrite($h, $strExtention);
            @fclose($h);
            $res = $DB->Query("SELECT * FROM accorsys_extensions WHERE MODULE_ID='".$moduleId."'", false, "File: ".__FILE__."<br>Line: ".__LINE__);
            if($res->SelectedRowsCount()>0){
                //update
                $arThisExtention = array();

                while($ar = $res->Fetch()){
                    if($ar['MODULE_ID'] == $moduleId){
                        $arThisExtention = unserialize($ar['EXTENSIONS']);
                    }
                }

                #region old code
                if(false && count($arThisExtention)>0 && $isAddExtention){
                    foreach($arThisExtention as $key=>$val){
                        foreach($arBuyLicense['EXTENSIONS'] as $kNewEx => $arNewExtention){
                            if($val['TYPE'] == $arNewExtention['TYPE']){
                                if($val['TYPE'] == 'user'){

                                    #region
                                    /*$arLoc = self::daysToLeftModule('accorsys.localization');
                                    if($arLoc['IS_TRIAL']){*/
                                    $arThisExtention[$key] = array(
                                        'TYPE'=>$val['TYPE'],
                                        'VALUE'=>$arNewExtention['VALUE']
                                    );
                                    /* }else{
                                         $arThisExtention[$key] = array(
                                             'TYPE'=>$val['TYPE'],
                                             'VALUE'=>$val['VALUE'] + $arNewExtention['VALUE']
                                         );
                                     }*/
                                    unset($arBuyLicense['EXTENSIONS'][$kNewEx]);
                                    #endregion

                                }else{
                                }
                            }
                        }
                    }
                    if(count($arBuyLicense['EXTENSIONS'])>0){
                        $arThisExtention = array_merge($arBuyLicense['EXTENSIONS'],$arThisExtention);
                    }

                    $strExtention = serialize($arThisExtention);
                }
                #endregion

                $arUpdate['MODULE_ID'] = $moduleId;
                $arUpdate['EXTENSIONS'] = $strExtention;
                $arUpdate['HASH'] = md5_file(__FILE__);
                $strUpdate = $DB->PrepareUpdate("accorsys_extensions", $arUpdate);
                if($strUpdate!="")
                {
                    $strSql = "UPDATE accorsys_extensions SET ".$strUpdate." WHERE MODULE_ID='".$moduleId."'";
                    $DB->Query($strSql, true, "File: ".__FILE__."<br>Line: ".__LINE__);
                }
                return true;
            }else{
                //insert
                $DB->Query("INSERT INTO accorsys_extensions (MODULE_ID,EXTENSIONS,HASH)VALUES('".$moduleId."','".$strExtention."','".md5_file(__FILE__)."')",true);
                return $DB->LastID();
            }
        }else{
            return false;
        }

    }

    static function getAccess($moduleId = false){
        global $DB;
        $res = $DB->Query("SELECT * FROM accorsys_extensions WHERE MODULE_ID='".$moduleId."'", false, "File: ".__FILE__."<br>Line: ".__LINE__);
        $ar = array();
        if($res->SelectedRowsCount()==1){
            if($arRes = $res->Fetch()){
                if($arRes['EXTENSIONS']!='')
                    $ar = unserialize($arRes['EXTENSIONS']);
            }
            if($arRes['HASH'] != md5_file(__FILE__)){
                //echo 'hren tebe a ne modul';
            }
        }else{
            //$DB->Query("INSERT INTO accorsys_extensions (MODULE_ID,HASH)VALUES('".$moduleId."','".md5_file(__FILE__)."')",true);
        }
        /*$ar[] = array(
            "MODULE_ID"=>"accorsys.localization",
            "EXTENSIONS"=>array(
                array(
                    "TYPE"=>'user',
                    "VALUE"=>'2'
                ),
                array(
                    "TYPE"=>'other',
                    "VALUE"=>'3'
                )
            )
        );*/
        /*p($ar);
        $arRestrictionByModule = array();
        foreach($ar as $arItemRestriction){
            if($arItemRestriction['MODULE_ID'] == $moduleId){
                $arRestrictionByModule = $arItemRestriction["EXTENSIONS"];
                break;
            }
        }*/
        if(empty($ar)){
            $ar[] = array("TYPE"=>'user','VALUE'=>0);
        }
        return $ar;
    }

    public function isAccess(){
        $arRestriction = $this->getAccess($this->moduleId);

        //if(count($arRestriction)<=0)return false;
        foreach($arRestriction as $item){
            switch($item['TYPE']){
                case "user":
                    $this->obRestriction[] = new CAccorsysExtensionsUser($this->moduleId,$item['VALUE']);
                    break;
            }
        }

        if(count($this->obRestriction)>0){
            foreach($this->obRestriction as $restriction){
                $restriction->isAccess();
            }
        }
    }

    /* @ module_id - module id
     * return
     * array(
     *  "DAYS_LEFT" => $days,
     *  "IS_TRIAL" => $isTrial
     * );
     */
    static function daysToLeftModule($moduleId){
        require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/update_client_partner.php");
        $stableVersionsOnly = COption::GetOptionString("main", "stable_versions_only", "Y");
        $arRequestedModules = array($moduleId);
        $errorMessage = '';
        $arUpdateList = CUpdateClientPartner::GetUpdatesList($errorMessage, LANG, $stableVersionsOnly, $arRequestedModules, Array("fullmoduleinfo" => "Y"));
        $arClientModules = CUpdateClientPartner::GetCurrentModules($strError_tmp);
        $modules = Array();
        $modulesNew = Array();
        if(!empty($arUpdateList["MODULE"]))
        {
            foreach($arUpdateList["MODULE"] as $k => $v)
            {
                if(!array_key_exists($v["@"]["ID"], $arClientModules))
                {
                    $bHaveNew = true;
                    $modulesNew[] = Array(
                        "NAME" => $v["@"]["NAME"],
                        "ID" => $v["@"]["ID"],
                        "DESCRIPTION" => $v["@"]["DESCRIPTION"],
                        "PARTNER" => $v["@"]["PARTNER_NAME"],
                        "FREE_MODULE" => $v["@"]["FREE_MODULE"],
                        "DATE_FROM" => $v["@"]["DATE_FROM"],
                        "DATE_TO" => $v["@"]["DATE_TO"],
                        "UPDATE_END" => $v["@"]["UPDATE_END"],
                    );
                }
                else
                {
                    $modules[$v["@"]["ID"]] = Array(
                        "VERSION" => (isset($v["#"]["VERSION"]) ? $v["#"]["VERSION"][count($v["#"]["VERSION"]) - 1]["@"]["ID"] : ""),
                        "FREE_MODULE" => $v["@"]["FREE_MODULE"],
                        "DATE_FROM" => $v["@"]["DATE_FROM"],
                        "DATE_TO" => $v["@"]["DATE_TO"],
                        "UPDATE_END" => $v["@"]["UPDATE_END"],
                    );
                }
            }
        }
        if($info = CModule::CreateModuleObject($moduleId))
        {
            $modules[$moduleId]["MODULE_ID"] = $info->MODULE_ID;
            $modules[$moduleId]["MODULE_NAME"] = $info->MODULE_NAME;
            $modules[$moduleId]["MODULE_DESCRIPTION"] = $info->MODULE_DESCRIPTION;
            $modules[$moduleId]["MODULE_VERSION"] = $info->MODULE_VERSION;
            $modules[$moduleId]["MODULE_VERSION_DATE"] = $info->MODULE_VERSION_DATE;
            $modules[$moduleId]["MODULE_SORT"] = $info->MODULE_SORT;
            $modules[$moduleId]["MODULE_PARTNER"] = $info->PARTNER_NAME;
            $modules[$moduleId]["MODULE_PARTNER_URI"] = $info->PARTNER_URI;
            $modules[$moduleId]["IsInstalled"] = $info->IsInstalled();
            if(defined(str_replace(".", "_", $info->MODULE_ID)."_DEMO"))
            {
                $modules[$moduleId]["DEMO"] = "Y";
                if($info->IsInstalled())
                {
                    if(CModule::IncludeModuleEx($info->MODULE_ID) != MODULE_DEMO_EXPIRED)
                    {
                        $modules[$moduleId]["DEMO_DATE"] = ConvertTimeStamp($GLOBALS["SiteExpireDate_".str_replace(".", "_", $info->MODULE_ID)], "SHORT");
                    }
                    else
                        $modules[$moduleId]["DEMO_END"] = "Y";
                }
            }
        }
        $isTrial = false;
        if($modules[$moduleId]["DEMO"] == "Y"){
            $isTrial = true;
            $daysToLeft = (strtotime($modules[$moduleId]['DEMO_DATE']) - time())/60/60/24;
            $isInvert = $daysToLeft < 0;
        }else{

            $daysToLeft = (strtotime($modules[$moduleId]['DATE_TO']) - time())/60/60/24;
            $isInvert = $daysToLeft < 0;
        }

        return array(
            "IS_EXPIRE" => $isInvert,
            "DAYS_LEFT" => $daysToLeft,
            "IS_TRIAL" => $isTrial
        );
    }

    static function isModuleUpdate($moduleId){
        global $USER;
        if(!is_object($USER))
            return false;

        require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/classes/general/update_client_partner.php");
        $stableVersionsOnly = COption::GetOptionString("main", "stable_versions_only", "Y");
        $arRequestedModules = array($moduleId);

        $arUpdateList = CUpdateClientPartner::GetUpdatesList($errorMessage, LANG, $stableVersionsOnly, $arRequestedModules, Array("fullmoduleinfo" => "Y"));
        $arClientModules = CUpdateClientPartner::GetCurrentModules($strError_tmp);

        $modules = Array();
        $modulesNew = Array();
        if(!empty($arUpdateList["MODULE"]))
        {
            foreach($arUpdateList["MODULE"] as $k => $v)
            {
                if(!array_key_exists($v["@"]["ID"], $arClientModules))
                {
                    $bHaveNew = true;
                    $modulesNew[] = Array(
                        "NAME" => $v["@"]["NAME"],
                        "ID" => $v["@"]["ID"],
                        "DESCRIPTION" => $v["@"]["DESCRIPTION"],
                        "PARTNER" => $v["@"]["PARTNER_NAME"],
                        "FREE_MODULE" => $v["@"]["FREE_MODULE"],
                        "DATE_FROM" => $v["@"]["DATE_FROM"],
                        "DATE_TO" => $v["@"]["DATE_TO"],
                        "UPDATE_END" => $v["@"]["UPDATE_END"],
                    );
                }
                else
                {
                    $modules[$v["@"]["ID"]] = Array(
                        "VERSION" => (isset($v["#"]["VERSION"]) ? $v["#"]["VERSION"][count($v["#"]["VERSION"]) - 1]["@"]["ID"] : ""),
                        "FREE_MODULE" => $v["@"]["FREE_MODULE"],
                        "DATE_FROM" => $v["@"]["DATE_FROM"],
                        "DATE_TO" => $v["@"]["DATE_TO"],
                        "UPDATE_END" => $v["@"]["UPDATE_END"],
                    );
                }
            }
        }

        if(!empty($modules[$moduleId]['VERSION'])){
            $info = CModule::CreateModuleObject($moduleId);
            $arModules["MODULE_ID"] = $info->MODULE_ID;
            $arModules["MODULE_NAME"] = $info->MODULE_NAME;
            $arModules["MODULE_DESCRIPTION"] = $info->MODULE_DESCRIPTION;
            $arModules["LAST_VERSION"] = $info->MODULE_VERSION;
            $arModules["NEW_VERSION"] = $modules[$moduleId]['VERSION'];
            $arModules["MODULE_VERSION_DATE"] = $info->MODULE_VERSION_DATE;
            $arModules["MODULE_SORT"] = $info->MODULE_SORT;
            $arModules["MODULE_PARTNER"] = $info->PARTNER_NAME;
            $arModules["MODULE_PARTNER_URI"] = $info->PARTNER_URI;

            $messageError = str_replace('#MODULE_VERSION_NEW#', $arModules["NEW_VERSION"] ,GetMessage('LC_ALERT_UPDATE_AVAILABLE_MESSAGE'));

            $ar = array(
                "ID"=>$moduleId."_sl_module_update",
                "SORT"=>"1",
                "TITLE"=>GetMessage('LC_ALERT_UPDATE_AVAILABLE_TITLE'),
                "HTML"=>$messageError,
                "COLOR"=>"blue alert-update-module-class a-locale",
                "FOOTER"=>'<a href="/bitrix/admin/update_system_partner.php?tabControl_active_tab=tab2&addmodule='.$moduleId.'" >'.GetMessage("LC_ALERT_UPDATE_AVAILABLE_LINK").'</a>'
            );

            $ObError = new CAccorsysError($ar);
            if($ObError)
                $ObError->show();
        }
    }

    static  function  delAccess($moduleId){
        global $DB;
        $strSql = "DELETE FROM accorsys_extensions WHERE MODULE_ID='".$moduleId."'";
        $DB->Query($strSql, true, "File: ".__FILE__."<br>Line: ".__LINE__);
    }
}


abstract class CAccorsysExtensions{
    abstract function isAccess();
}
class CAccorsysExtensionsUser extends  CAccorsysExtensions{
    public $userCount = 0;
    private $moduleId = '';
    public $isNeedToAddUser = 0;

    function __construct($moduleId,$restrictionValue = false){
        if(strlen($moduleId)>0){
            $this->moduleId = trim($moduleId);
        }else{
            return false;
        }
        if(!$restrictionValue){
            $arRestriction = CAccorsysExtensionsAccess::getAccess($moduleId);
            foreach($arRestriction as $item){
                switch($item['TYPE']){
                    case "user":
                        $this->userCount+=intval($item['VALUE']);
                        break;
                }
            }
        }else{
            $this->userCount+=intval($restrictionValue);
        }
    }

    public function isAccess($curSession = ''){
        global $DB;
        global $USER;
        $curSession = $curSession == '' ? session_id():$curSession;
        $needToGetNew = false;
        $dbUsers = $this->getUsers();
        $curCountUsers = $dbUsers->SelectedRowsCount();
        if($this->isNeedToAddUser)
            $curCountUsers += $this->isNeedToAddUser;

        while($arUser = $dbUsers->getNext()){
            $interval = (time() - strtotime($arUser['TIMESTAMP_X']))/60;
            if($interval > 15){
                $DB->Query("DELETE FROM accorsys_extensions_users WHERE ID='".intval($arUser['ID'])."'",true);
                $needToGetNew = true;
            }elseif($arUser['SESSION_ID'] == $curSession){
                return true;
            }
        }
        if($needToGetNew){
            $dbUsers = $this->getUsers();
            $curCountUsers = $dbUsers->SelectedRowsCount();
        }

        if($this->userCount == 1){
            $ar = array(
                "ID"=>"accorsys.localization_module_extend_user",
                "SORT"=>"1",
                "TITLE"=>GetMessage('LC_ALERT_LICENSING_EXTEND_USER_LIMIT_TITLE'),
                "HTML"=>str_replace("#USER_COUNT_BUY#", $this->userCount, GetMessage('LC_ALERT_LICENSING_EXTEND_USER_LIMIT_MESSAGE')),
                "COLOR"=>"blue alert-extend-user-class a-locale",
                "FOOTER"=>'<a target="_blank" href="/bitrix/admin/lc_inapp_purchases.php" >'.GetMessage("LC_ALERT_LICENSING_EXTEND_USER_LIMIT_LINK").'</a>'
            );
            $ObError = new CAccorsysError($ar);
            if($ObError)
                $ObError->show();
        }
        if($curCountUsers > $this->userCount){
            return false;
        }
        return true;
    }

    public function addUser($userId,$curSession = false){
        global $DB;
        $this->isNeedToAddUser = 1;
        $curSession = $curSession === false ? session_id():$curSession;

        if($this->isAccess($curSession)){
            if(intval($userId)<=0)
                return false;
            $dbUser = $this->getUserById($userId);

            while($arUser = $dbUser->getNext()){
                $arUsers[$arUser['SESSION_ID']] = $arUser;
            }

            if($curSession != session_id() && !isset($arUsers[$curSession])){
                return false;
            }

            if(!isset($arUsers[$curSession])){
                $_SESSION['accorsys_user_change_last_change_date'] = date('Y-m-d h:i:s');
                $DB->Query("INSERT INTO accorsys_extensions_users (USER_ID,MODULE_ID,SESSION_ID,TIMESTAMP_X)VALUES('".intval($userId)."','".$this->moduleId."','".$curSession."', CURRENT_TIMESTAMP)",true);
                return $DB->LastID();
            }else{
                $interval = (time() - strtotime($_SESSION['accorsys_user_change_last_change_date']))/60;
                if($interval > 2){
                    $_SESSION['accorsys_user_change_last_change_date'] = date('Y-m-d h:i:s');
                    $DB->Query("UPDATE accorsys_extensions_users SET USER_ID='".intval($userId)."',MODULE_ID='".$this->moduleId."',SESSION_ID='".$curSession."', TIMESTAMP_X= CURRENT_TIMESTAMP WHERE USER_ID='".intval($userId)."' AND SESSION_ID='".$curSession."'",true);
                }
            }
            return true;
        }
        else{
            $dbUsers = $this->getUsers();
            $curCountUsers = $dbUsers->SelectedRowsCount();
            if(isset($_COOKIE['ACCORSYS_LOCALIZATION_NEED_MORE_LICENSE'])){
                setcookie('BITRIX_SM_LC_ENABLE', null, -1);
                setcookie('ACCORSYS_LOCALIZATION_NEED_MORE_LICENSE', null, -1);
            }elseif($_COOKIE['BITRIX_SM_LC_ENABLE'] == 'Y'){
                setcookie('ACCORSYS_LOCALIZATION_NEED_MORE_LICENSE', $curCountUsers.'Y'.$this->userCount, time() + 3600,"/");
            }
            return false;
        }
    }

    public function deleteUserBySession($sessionID){
        global $DB;
        $DB->StartTransaction();
        $res = $DB->Query("DELETE FROM accorsys_extensions_users WHERE SESSION_ID='".$sessionID."'", false, "File: ".__FILE__."<br>Line: ".__LINE__);
        if($res)
            $DB->Commit();
        else
            $DB->Rollback();
        return $res;
    }
    public function deleteUser($userId){
        if(intval($userId)<=0)return false;
        global $DB;
        $userId = intval($userId);
        $DB->StartTransaction();
        $res = $DB->Query("DELETE FROM accorsys_extensions_users WHERE USER_ID=".$userId." AND SESSION_ID='".session_id()."'", false, "File: ".__FILE__."<br>Line: ".__LINE__);
        if($res)
            $DB->Commit();
        else
            $DB->Rollback();
        return $res;
    }

    private function getUsers(){
        global $DB;
        return $DB->Query("SELECT * FROM accorsys_extensions_users", false, "File: ".__FILE__."<br>Line: ".__LINE__);
    }

    public function getUserById($userId){
        global $DB;
        if(intval($userId)<=0)return false;
        return $DB->Query("SELECT * FROM accorsys_extensions_users WHERE USER_ID='".intval($userId)."'", false, "File: ".__FILE__."<br>Line: ".__LINE__);
    }
}

class CAccorsysError{
    private $arError = array();
    private $errirId = 'sl_error';

    function __construct($ar){
        if(isset($ar['ID'])){
            $this->errirId = str_replace('.','_',$ar['ID']);
            unset($ar['ID']);
        }
        $this->arError = $ar;
    }

    function show($needShow = false){
        global $APPLICATION;
        $stackError = CAccorsysErrorStack::getInstance();
        if(!$stackError->set($this->errirId,$this->arError))
            return true;

        CAdminInformer::AddItem($this->arError);
        $isShowError = $APPLICATION->get_cookie($this->errirId);
        if(!$isShowError || $needShow){
            $APPLICATION->set_cookie($this->errirId, "Y", time()+60*60*24*14);
            $APPLICATION->AddHeadString('<script>BX.ready(function(){BX.adminInformer.Toggle(BX("adm-header-notif-block"));});</script>',true);
        }
     }
}


class CAccorsysErrorStack {
    private $arErrors = array();
    private static $instance;

    private function _construct(){}

    public static function getInstance(){
        if(empty(self::$instance)){
            self::$instance = new CAccorsysErrorStack();
        }
        return self::$instance;
    }

    public function set($ID,$VAL){
        if(!$this->get($ID)){
            $this->arErrors[$ID] = $VAL;
            return true;
        }
        return false;
    }

    public function get($ID){
        if(isset($this->arErrors[$ID]))return $this->arErrors[$ID];
        return false;
    }

}
