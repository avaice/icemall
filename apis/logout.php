<?php
session_start();

require("./debug.php");

$return = array(
    'status'=>'NG',
    'response'=>"APIエラー");



if(isset($_POST["key"]) && isset($_SESSION["key"])){
    if($_POST["key"] == $_SESSION["key"]){
        session_destroy();
        $return["status"] = "OK";
        $return["response"] = "Success.";
    }else{
        $return["response"] = "APIキーが間違っています。正しくは".$_SESSION["key"];
    }
}else{
    $return["response"] = "APIキーが指定されていません。";
}


$json=json_encode($return,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
echo $json;

?>