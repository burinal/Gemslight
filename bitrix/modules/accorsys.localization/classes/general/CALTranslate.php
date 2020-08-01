<?php

class CALTranslate {

    static protected $msTranslateUrl = 'http://api.microsofttranslator.com/v2/Http.svc/Translate';

    static protected $msGetLangListUrl = 'http://api.microsofttranslator.com/v2/Http.svc/GetLanguagesForTranslate';

    static protected $goTranslateUrl = 'https://www.googleapis.com/language/translate/v2';

    static protected $yaTranslateUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

    static function translateController($text, $translateSystem, $lang){
        switch(trim($translateSystem)){
            case 'ya':
                $textTranslate = self::translateYandex($text,$lang);
                break;
            case 'go':
                $textTranslate = self::translateGoogle($text,$lang);
                break;
            case 'ms':
                $textTranslate = self::translateMicrosoft($text,$lang);
                break;
        }

        if(array_key_exists('ERROR',$textTranslate)){
            $_SESSION['AL_TRANSLATE'][] = $text;
        }

        if(!array_key_exists('ERROR',$textTranslate) && strlen($textTranslate) > 0){
            $textTranslate = trim((string)$textTranslate);
        }else{
            $textTranslate = $text;
        }

        return $textTranslate;
    }

    static function translateMicrosoft($text, $lang){

        global $APPLICATION;

        $arErrors = array(
            "0" => "No data",
            "1" => "Cant get token",
            "2" => "Current language not support"
        );

        $arLangs = self::getMicrosoftLanguagesForTranslate();

        if(!in_array($lang,$arLangs)){
            return array(
                "ERROR" => "Y",
                "CODE" => 2,
                "TEXT" => $arErrors[2]
            );
        }
        $token = $APPLICATION->get_cookie("MICROSOFT_TOKEN");
        if(strlen($token) <= 0){
            $token = self::getMicrosoftToken();
            if(strlen($token) > 0){
                $APPLICATION->set_cookie("MICROSOFT_TOKEN", $token, time()+60*9);
            }else{
                return array(
                    "ERROR" => "Y",
                    "CODE" => 1,
                    "TEXT" => $arErrors[1]
                );
            }
        }
        $url = self::$msTranslateUrl;

        $params = "?text=".urlencode(iconv(LANG_CHARSET, "utf-8", $text))."&to=".$lang;
        $translateUrl = $url.$params;
        $authHeader = "Authorization: Bearer ". $token;
            $text = self::curlRequest($translateUrl, $authHeader);
        if(strlen($text) <= 0){
            return array(
                "ERROR" => "Y",
                "CODE" => 0,
                "TEXT" => $arErrors[0]
            );
        }
        $xmlObj = simplexml_load_string($text);
        foreach((array)$xmlObj[0] as $val){
            $text = $val;
        }

        $text = iconv("utf-8", LANG_CHARSET, $text);

        return $text;

    }

    static function testTranslateMS(){
        $text = CALTranslate::translateMicrosoft('hola','en');
        if(strtoupper(trim($text)) == 'HELLO'){
            return true;
        }else{
            return false;
        }
    }

    static function getMicrosoftToken(){
        /*if(!class_exists('AccessTokenAuthentication'))
            include($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/accorsys.localization/classes/general/AccessTokenAuthenticationMicrosoft.php');
        $objMicrosoftAccess = new AccessTokenAuthentication();*/
        $grantType = "client_credentials";
        $scopeUrl = "http://api.microsofttranslator.com";
        $clientID = COption::GetOptionString("accorsys.localization","microsoftTranslatorCliendID");
        $clientSecret = COption::GetOptionString("accorsys.localization","microsoftTranslatorCliendSecret");
        $authUrl = "https://datamarket.accesscontrol.windows.net/v2/OAuth2-13/";
        //$tokenString = $objMicrosoftAccess->getTokens($grantType, $scopeUrl, $clientID, $clientSecret, $authUrl);

            try {
                if(function_exists('curl_init')){
                    //Initialize the Curl Session.
                    $ch = curl_init();
                    //Create the request Array.
                    $paramArr = array (
                        'grant_type'    => $grantType,
                        'scope'         => $scopeUrl,
                        'client_id'     => $clientID,
                        'client_secret' => $clientSecret
                    );
                    //Create an Http Query.//
                    $paramArr = http_build_query($paramArr);
                    //Set the Curl URL.
                    curl_setopt($ch, CURLOPT_URL, $authUrl);
                    //Set HTTP POST Request.
                    curl_setopt($ch, CURLOPT_POST, TRUE);
                    //Set data to POST in HTTP "POST" Operation.
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $paramArr);
                    //CURLOPT_RETURNTRANSFER- TRUE to return the transfer as a string of the return value of curl_exec().
                    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, TRUE);
                    //CURLOPT_SSL_VERIFYPEER- Set FALSE to stop cURL from verifying the peer's certificate.
                    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                    //Execute the  cURL session.
                    $strResponse = curl_exec($ch);
                    //Get the Error Code returned by Curl.
                    $curlErrno = curl_errno($ch);
                    if($curlErrno){
                        $curlError = curl_error($ch);
                        throw new Exception($curlError);
                    }
                    //Close the Curl Session.
                    curl_close($ch);
                    //Decode the returned JSON string.
                    $objResponse = json_decode($strResponse);
                    if ($objResponse->error){
                        throw new Exception($objResponse->error_description);
                    }
                    $tokenString = $objResponse->access_token;
                }
            } catch (Exception $e) {
                //echo "Exception-".$e->getMessage();
            }

        return $tokenString;
    }

    static function getMicrosoftLanguagesForTranslate(){

        global $APPLICATION;

        $arErrors = array(
            "0" => "No data",
            "1" => "Cant get token"
        );
        #endregion


        $token = $APPLICATION->get_cookie("MICROSOFT_TOKEN");
        if(strlen($token) <= 0){
            $token = self::getMicrosoftToken();
            if(strlen($token) > 0){
                $APPLICATION->set_cookie("MICROSOFT_TOKEN", $token, time()+60*9);
            }else{
                return array(
                    "ERROR" => "Y",
                    "CODE" => 1,
                    "TEXT" => $arErrors[1]
                );
            }
        }
        $url = self::$msGetLangListUrl;
        $authHeader = "Authorization: Bearer ". $token;
        $obCache = new CPHPCache();
        $cache_time = 3600*3;
        $cache_id = md5('GetLanguagesForTranslateID');
        $cache_path = '/'.$cache_id;
        if (!$obCache->StartDataCache($cache_time, $cache_id, $cache_path))
        {
            $res = $obCache->GetVars();
            $languageCodes = $res['languageCodes'];
        }else{
            $strRequest = self::curlRequest($url, $authHeader);
            $xmlObj = simplexml_load_string($strRequest);
            $languageCodes = array();
            foreach($xmlObj->string as $language){
                $languageCodes[] = trim($language);
            }
            if(count($languageCodes) > 0)
                $obCache->EndDataCache(array("languageCodes"=>$languageCodes));
        }

        return $languageCodes;
    }

    static function translateGoogle($text, $lang){

        $arErrors = array(
            "0" => "No data"
        );
        $key = COption::GetOptionString("accorsys.localization", 'gtranslate_api_key', '');
        $url = self::$goTranslateUrl;

        $arParams = array();
        $arParams['key'] = $key;
        $arParams['target'] = urlencode($lang);
        $arParams['q'] = urlencode(iconv(LANG_CHARSET, "utf-8", $text));

        $return = json_decode(self::query($url,$arParams));

        $text =  $return->data->translations[0]->translatedText;



        if(strlen($text) <= 0){
            return array(
                "ERROR" => "Y",
                "CODE" => 0,
                "TEXT" => $arErrors[0]
            );
        }
        $text = iconv("utf-8", LANG_CHARSET, $text);

        return $text;

    }

    static function testTranslateGoogle(){
        $text = CALTranslate::translateGoogle('hola','en');
        if(strtoupper($text) == 'HELLO'){
            return true;
        }else{
            return false;
        }
    }

    static function translateYandex($text, $lang){

        $arErrors = array(
            "0" => "No data",
            "401" => "Incorrect API key",
            "402" => "API key blocked",
            "403" => "Overflow daily limit request",
            "404" => "Overflow daily limit translated text",
            "413" => "Overflow max length text",
            "422" => "Text cant translated",
            "501" => "Set the direction of translation is not supported"
        );
        $key = COption::GetOptionString("accorsys.localization", 'ytranslate_api_key', '');

        $url = self::$yaTranslateUrl;

        $arParams = array();
        $arParams['key'] = $key;
        $arParams['lang'] = urlencode($lang);
        $arParams['text'] = urlencode(iconv(LANG_CHARSET, "utf-8", $text));

        $return = json_decode(self::query($url,$arParams));

        //$arErrors

            $text = iconv("utf-8", LANG_CHARSET, $return->text[0]);

        if(isset($arErrors[$return->code]) || strlen($text) <= 0){
            return array(
                "ERROR" => "Y",
                "CODE" => $return->code,
                "TEXT" => $arErrors[$return->code]
            );
        }


        return $text;

    }

    static function testTranslateYandex(){
        $text = CALTranslate::translateYandex('hola','en');
        if(strtoupper($text) == 'HELLO'){
            return true;
        }else{
            return false;
        }
    }

    function query($url,$arParams = array(), $arQueryParams = array())
    {

        if(isset($arQueryParams['TYPE']) && $arQueryParams['TYPE'] == 'GET' || !isset($arQueryParams['TYPE'])){
            $data = '';
            $arHttp = array(
                'method' => 'GET',
                'ignore_errors' => TRUE,
                'header' => 'Content-type: application/x-www-form-urlencoded',
                'content' => http_build_query($data)
            );

            if (isset($arQueryParams['CONTENT_TYPE'])) {
                $arHttp['header'] = 'Content-type: ' . trim($arQueryParams['CONTENT_TYPE']);
            }

            if (strpos('?', $url)) {
                $url .= '&';
            } else {
                $url .= '?';
            }
            foreach ($arParams as $paramName => $paramVal) {
                $url .= $paramName . '=' . $paramVal . '&';
            }

            $url = substr($url, 0, strlen($url) - 1);

            $result = @file_get_contents($url, false, stream_context_create(array(
                'https' => $arHttp
            )));

        }

        return $result;
    }

    function curlRequest($url, $authHeader, $postData=''){
        if(function_exists('curl_init')){
            //Initialize the Curl Session.
            $ch = curl_init();
            //Set the Curl url.
            curl_setopt ($ch, CURLOPT_URL, $url);
            //Set the HTTP HEADER Fields.
            curl_setopt ($ch, CURLOPT_HTTPHEADER, array($authHeader,"Content-Type: text/xml"));
            //CURLOPT_RETURNTRANSFER- TRUE to return the transfer as a string of the return value of curl_exec().
            curl_setopt ($ch, CURLOPT_RETURNTRANSFER, TRUE);
            //CURLOPT_SSL_VERIFYPEER- Set FALSE to stop cURL from verifying the peer's certificate.
            curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, False);
            if($postData) {
                //Set HTTP POST Request.
                curl_setopt($ch, CURLOPT_POST, TRUE);
                //Set data to POST in HTTP "POST" Operation.
                curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
            }
            //Execute the  cURL session.
            $curlResponse = curl_exec($ch);
            //Get the Error Code returned by Curl.
            $curlErrno = curl_errno($ch);
            if ($curlErrno) {
                $curlError = curl_error($ch);
                throw new Exception($curlError);
            }
            //Close a cURL session.
            curl_close($ch);
        }
        return $curlResponse;
    }

    function translateHtml($html, $translateCode, $lang) {
        $html = mb_convert_encoding( $html, 'utf-8', LANG_CHARSET);
        $html = mb_convert_encoding( $html, 'HTML-ENTITIES', 'utf-8');
        $doc = new DOMDocument();
        $doc->encoding = 'utf-8';
        @$doc->loadHTML(htmlspecialchars_decode($html));

        $rTranslateHTML = self::getTranslateHTMLFromNode($doc->documentElement,"", $html, $translateCode, $lang);
        $rTranslateHTML = mb_convert_encoding( $rTranslateHTML,  'utf-8' , 'HTML-ENTITIES');
        $rTranslateHTML = mb_convert_encoding( $rTranslateHTML, LANG_CHARSET, 'utf-8');

        return $rTranslateHTML;
    }

    function getTranslateHTMLFromNode($Node, $Text = "", $html, $translateCode, $lang) {
        if (!isset($Node->tagName)){
            $stringContent = $Node->textContent;
            $stringContent = mb_convert_encoding( $stringContent, 'HTML-ENTITIES', 'utf-8');

            if(strlen(trim($stringContent)) > 0){


                    $tStringContent = mb_convert_encoding( $stringContent, 'utf-8', 'HTML-ENTITIES');
                    $tStringContent = mb_convert_encoding( $tStringContent, LANG_CHARSET, 'utf-8');
                    $tStringContent = CALTranslate::translateController($tStringContent, $translateCode, $lang);

                    if(isset($tStringContent['ERROR'])){
                        $_SESSION['AL_TRANSLATE'][] = $tStringContent;
                    }
                        if(!isset($tStringContent['ERROR']) && strlen($tStringContent) > 0){
                            $tStringContent = mb_convert_encoding( $tStringContent, 'utf-8', LANG_CHARSET);
                            $tStringContent = mb_convert_encoding( $tStringContent, 'HTML-ENTITIES', 'utf-8');

                               // $html = preg_replace('/'.preg_quote($stringContent).'/', $tStringContent, mb_convert_encoding( $html, 'HTML-ENTITIES', 'utf-8'), 1);

                            $pos = strpos(htmlspecialchars_decode($html),htmlspecialchars_decode($stringContent));

                            if($pos !== false){
                                $html = substr_replace(htmlspecialchars_decode($html),$tStringContent,$pos,strlen($stringContent));
                            }

                                //$html = str_replace_once($stringContent,'1',$html);
                        }

            }
            return $html;
        }

        $Node = $Node->firstChild;
        if ($Node != null){
            $html = self::getTranslateHTMLFromNode($Node, $Text, $html, $translateCode, $lang);
        }

        while($Node->nextSibling != null) {
            $html = self::getTranslateHTMLFromNode($Node->nextSibling, $Text, $html, $translateCode, $lang);
            $Node = $Node->nextSibling;
        }
        return $html;
    }
}