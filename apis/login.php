<?php
session_start();

require("./debug.php");
require("./sqlite.php");

$return = array(
    'status'=>'NG',
    'response'=>"APIエラー");


if(isset($_POST["id"]) && isset($_POST["pass"])){

    $user_db = sqlite_open("user.db", 0666);
    if($user_db){
        $result = sqlite_query($user_db, "SELECT mail, pass FROM user WHERE mail='".$_POST["id"]."'");
        //メアドで検索結果がある＝登録されている
        if ($result) {
            
            $rows = sqlite_fetch_array($result, SQLITE3_ASSOC);
            if(password_verify($_POST["pass"],$rows["pass"])){
                //パスワードあってる
                $_SESSION["id"] = $_POST["id"];
                $_SESSION["key"] = uniqid();
                $return["status"] = "OK";
                $return["response"] = $_SESSION["key"];
            }else{
                //パスワードちがう
                $return["response"] = "登録されていないか、パスワードが違います。";
            }
        }else{
            $return["response"] = "登録されていないか、パスワードが違います。";
        }
        sqlite_close($user_db);
    }

}else{

    $return["response"] = "入力事項に不足があります。";

}



$json=json_encode($return,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
echo $json;

?>