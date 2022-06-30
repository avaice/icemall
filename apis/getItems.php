<?php

session_start();

require("./debug.php");
require("./sqlite.php");


$return = array(
    "status"=>"NG",
    "response"=>"APIエラー");

$search_option = array(
    "id" => isset($_POST["id"]) ? $_POST["id"] : "*",
    "genre" => isset($_POST["genre"]) ? $_POST["genre"] : "*",
    "name" => isset($_POST["name"]) ? $_POST["name"] : "*",
    "stock" => isset($_POST["stock"]) ? $_POST["stock"] : "0",
    "min_price" => isset($_POST["min_price"]) ? $_POST["min_price"] : "0",
    "max_price" => isset($_POST["max_price"]) ? $_POST["max_price"] : "*",
    "start_number" => isset($_POST["start_number"]) ? $_POST["start_number"] : "0",
    "getCount" => isset($_POST["getCount"]) ? min($_POST["getCount"], 100) : "10"    
);




$items_db = sqlite_open("./database/items.db", 0666);
if($items_db){
    $queryStr = sprintf('SELECT * FROM items WHERE id=%s AND genre=%s AND name=%s AND stock >= %s AND price >= %s AND price <= %s AND number >= %s ORDER BY number DESC LIMIT %s',
        $search_option["id"] == "*" ? 'id' : '"'.$search_option["id"].'"',
        $search_option["genre"] == "*" ? 'genre' : $search_option["genre"],
        $search_option["name"] == "*" ? 'name' : '"'.$search_option["name"].'"',
        $search_option["stock"],
        $search_option["min_price"],
        $search_option["max_price"] == "*" ? 'price' : $search_option["max_price"],
        $search_option["start_number"],
        $search_option["getCount"]
    );
    $result = sqlite_query($items_db, $queryStr);
    
    if ($result) {
        $return["status"] = "OK";

        $resultJson = array(
            "start" => $search_option["start_number"],
            "end" => 0,
            "items" => array()
        );

        $i = 0;
        while(1){
            $rows = sqlite_fetch_array($result, SQLITE3_ASSOC);
            if(!$rows)break;
            $resultJson["items"][$i] = array(
                "id" => $rows["id"],
                "genre" => $rows["genre"],
                "date" => $rows["date"],
                "name" => $rows["name"],
                "desc" => $rows["desc"],
                "price" => $rows["price"],
                "stock" => $rows["stock"],
                "image" => $rows["image"]
            );
            $resultJson["end"] = $rows["number"];
            $i++;
        }
        $return["response"] = $resultJson;

    }
}else{
    $return["response"] = "データベース検索に失敗しました。";
}

sqlite_close($items_db);




$json=json_encode($return,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
echo $json;


?>