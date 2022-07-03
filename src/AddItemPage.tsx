import React, { Component, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import { convertToHTML } from 'draft-convert';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../style/additem.css";
import Settings from './Settings';

type objHandler = {
    target : HTMLInputElement;
  };


const DescEditor = (props : {id:string}) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const handleEditorChange = (state : EditorState) => {
        setEditorState(state);
        convertContentToHTML();
        }
    const convertContentToHTML = () => {
        const html = convertToHTML(editorState.getCurrentContent());
        const htmlElm : HTMLInputElement = document.getElementById(props.id) as HTMLInputElement;
        if(!html || !htmlElm)return;
        htmlElm.value = html;
    }

    return (
        <>
            <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            />
            <input type="hidden" id={props.id}/>
        </>
    )
}


const AddItemPage = () => {
    const search = useLocation().search;
    const query = new URLSearchParams(search);

    Settings.getGenreList((genreList) => {
        console.log(genreList)
        let n=0;
        let selectEle = "";
        const selectDom = document.getElementById("item_genre");
        if(!selectDom)return alert("商品ジャンルの取得に失敗しました");
        genreList["genre"].forEach((element:string) => {
            selectEle = selectEle + `<option value=${n}>${element}</option>`;
            n++;
        });
        selectDom.innerHTML = selectEle;
    })

    return (
        <main>
            <h2>商品の追加</h2>
            <div id="itemDetail">
                <div id="itemDetail_img">
                    <label style={{cursor:"pointer"}}><img id="itemImage" src="./images/img_placeholder.png"/>
                    <input type="file" name="image" accept=".png, .jpg, .jpeg" style={{display:"none"}} onChange={uploadImage}/>  </label>
                </div>
                <div id="itemDetail_command">
                    <input id="item_title" type="text" placeholder='商品名'></input>
                    ジャンル：<select id="item_genre">
                    </select><br/>
                    <input id="item_zaiko" type="number" defaultValue='1'></input>個
                    <input id="item_price" type="number" placeholder='価格（税抜き）'></input>円
                    <input id="item_image" type="hidden"></input>
                    <input id="item_id" type="hidden"></input>
                    <div id="itemDetail_addCart" onClick={uploadItem}>
                        追加
                    </div>
                </div>
            </div>
            <div id="itemDesc">
                <h2>商品説明</h2>
                <DescEditor
                    id="item_desc"
                 />
            </div>
        </main>
    );
}

const uploadItem = () => {

    const itemTitleElm : HTMLInputElement | null = document.querySelector("#item_title");
    const itemZaikoElm : HTMLInputElement | null = document.querySelector("#item_zaiko");
    const itemGenreElm : HTMLSelectElement | null = document.querySelector("#item_genre");
    const itemPriceElm : HTMLInputElement | null = document.querySelector("#item_price");
    const itemImageElm : HTMLInputElement | null = document.querySelector("#item_image");
    const itemDescElm : HTMLInputElement | null = document.querySelector("#item_desc");
    const itemIdElm : HTMLInputElement | null = document.querySelector("#item_id");
    if(!itemTitleElm || !itemZaikoElm || !itemPriceElm || !itemImageElm || !itemIdElm || !itemDescElm || !itemGenreElm)return alert("エラー:商品情報入力フォームのDOMが見つかりません");
    if(itemTitleElm.value == "" || itemZaikoElm.value == "" || itemPriceElm.value == "" || itemImageElm.value == "")return alert("エラー:入力内容が不足しています");

    const formData = new FormData();
    formData.append("key", Settings.getApiKey());
    formData.append("genre", itemGenreElm.selectedIndex.toString());
    formData.append("name", itemTitleElm.value);
    formData.append("desc", itemDescElm.value);
    formData.append("stock", itemZaikoElm.value);
    formData.append("price", itemPriceElm.value);
    formData.append("image", itemImageElm.value);
    itemIdElm.value != "" ? formData.append("id", itemIdElm.value) : "";
    
    fetch(Settings.apipath + "itemUpload.php", {
         method: "POST", body: formData ,credentials:"include"
        }).then(response => response.json())
        .then((data) => {

            const result = JSON.parse(JSON.stringify(data));
            
            if(result["status"] == "OK"){

                if(window.confirm(itemIdElm.value == "" ? "アップロードに成功しました！\nページを確認しますか？" : "更新に成功しました！\nページを確認しますか？")){
                    window.open("./item?id=" + result["response"], "_blank");
                }
                itemIdElm.value = result["response"];

            }else if(this){

                alert("アップロードに失敗しました。\n" + result["response"]);

            }

    });

}

const uploadImage = (event : objHandler) => {

    if(!event.target.files)return;

    const formData = new FormData();
    formData.append("key", Settings.getApiKey());
    formData.append("image", event.target.files[0]);
    fetch(Settings.apipath + "imgUpload.php", {
         method: "POST", body: formData ,credentials:"include"
        }).then(response => response.json())
        .then((data) => {

            const result = JSON.parse(JSON.stringify(data));
            
            if(result["status"] == "OK"){

                const itemImageElm : HTMLImageElement | null = document.querySelector("#itemImage");
                const itemImageInputElm : HTMLInputElement | null = document.querySelector("#item_image");
                if(!itemImageElm || !itemImageInputElm)return alert("エラー:画像管理領域のDOMが見つかりません");
                itemImageElm.src = Settings.apipath + result["response"];
                itemImageInputElm.value = result["response"];

            }else if(this){

                alert("画像アップロードに失敗しました。\n" + result["response"]);

            }

        });

}

export default AddItemPage;