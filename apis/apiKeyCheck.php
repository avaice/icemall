<?php
session_start();

require("./debug.php");

$return = array(
    'status'=>'NG',
    'response'=>"APIエラー");



if(isset($_POST["key"]) && isset($_SESSION["key"])){
    if($_POST["key"] == $_SESSION["key"]){
        $return["status"] = "OK";
        $return["response"] = "That API Key is valid.";
    }else{
        $return["response"] = "That API key is invalid or out-of-date.";
    }
}else{
    $return["response"] = "APIキーが指定されていません。";
}


$json=json_encode($return,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
echo $json;

?>