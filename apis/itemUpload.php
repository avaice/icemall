<?php
session_start();

require("./debug.php");
require("./sqlite.php");


$return = array(
    "status"=>"NG",
    "response"=>"APIエラー");



if(
    isset($_POST["key"]) &&
    isset($_POST["genre"]) &&
    isset($_POST["name"]) &&
    isset($_POST["desc"]) &&
    isset($_POST["stock"]) &&
    isset($_POST["price"]) &&
    isset($_POST["image"]) &&
    isset($_SESSION["key"])
    ){
    if($_POST["key"] == $_SESSION["key"]){

        $items_db = sqlite_open("./database/items.db", 0666);
        if($items_db){
            $newId = uniqid();
            $queryStr = sprintf('INSERT INTO items(id,date,genre,name,desc,stock,price,image) VALUES( %d,CURRENT_TIMESTAMP,%d,"%s","%s",%d,%d,"%s")',
             $newId, $_POST["genre"], $_POST["name"], $_POST["desc"], $_POST["stock"], $_POST["price"], $_POST["image"]);       
            if($_POST["id"]){
                $result = sqlite_query($items_db, "SELECT 'number' FROM items WHERE id='".$_POST["id"]."'");
                if ($result) {
                    $newId = $_POST["id"];
                    $queryStr = sprintf('UPDATE items SET genre=%d,name="%s",desc="%s",stock=%d,price=%d,image="%s",date=CURRENT_TIMESTAMP WHERE id="%s"',
                    $_POST["id"], $_POST["genre"], $_POST["name"], $_POST["desc"], $_POST["stock"], $_POST["price"], $_POST["image"]);                    
                }
            }
            $result = sqlite_query($items_db, $queryStr);
            if ($result) {
                $return["status"] = "OK";
                $return["response"] = $newId;
            }else{
                $return["response"] = "データベース登録に失敗しました。";
            }

        }

    }else{
        $return["response"] = "APIキーが間違っています。";
    }
}else{
    $return["response"] = "パラメーターが不足してます。";
}

sqlite_close($items_db);

$json=json_encode($return,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
echo $json;

?>