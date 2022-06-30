<?php
session_start();

require("./debug.php");

$return = array(
    "status"=>"NG",
    "response"=>"APIエラー");



if(isset($_POST["key"]) && isset($_FILES["image"]) && isset($_SESSION["key"])){
    if($_POST["key"] == $_SESSION["key"]){
        $image = uniqid().".webp";
        if(exif_imagetype($_FILES["image"]["tmp_name"])){
            $img = null;
            switch (mime_content_type($_FILES["image"]["tmp_name"])) {
                case 'image/jpeg':
                    $img = imagecreatefromjpeg($_FILES["image"]["tmp_name"]);
                    break;
                case 'image/png':
                    $img = imagecreatefrompng($_FILES["image"]["tmp_name"]);
                    break;
                default:
                    $return["response"] = "非対応の画像フォーマットです。JPEG/PNGを使用してください。";
                    break;
            }
            if($img){
                if(imagewebp($img, "./database/images/".$image)){
                    $return["status"] = "OK";
                    $return["response"] = "database/images/".$image;
                }else{
                    $return["response"] = "サーバーでのwebp変換処理時にエラーが発生しました。";
                }
            }
        }else{
            $return["response"] = "画像でないデータが送信されました。";
        }
    }else{
        $return["response"] = "APIキーが間違っています。";
    }
}else{
    //セッション切れ判定
    if(!isset($_SESSION["key"])){
        $return["response"] = "セッションが無効です。";
    }else{
        $return["response"] = "パラメーターが不足してます。";
    }
}


$json=json_encode($return,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
echo $json;

?>