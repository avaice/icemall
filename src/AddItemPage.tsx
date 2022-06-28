import React, { Component } from "react";
import { useLocation } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../style/additem.css";

const AddItemPage = () => {
    const search = useLocation().search;
    const query = new URLSearchParams(search);

    return (
        <main>
            <h2>商品の追加</h2>
            <div id="itemDetail">
                <div id="itemDetail_img">
                    <img src="./images/img_placeholder.png" onClick={uploadImage} />
                </div>
                <div id="itemDetail_command">
                    <input id="item_title" type="text" placeholder='商品名'></input>
                    <input id="item_zaiko" type="number" value='1'></input>個
                    <input id="item_price" type="number" placeholder='価格（税抜き）'></input>円
                    <div id="itemDetail_addCart">
                        追加
                    </div>
                </div>
            </div>
            <div id="itemDesc">
                <h2>商品説明</h2>
                <Editor
                    editorClassName="desc-editor"
                    editorStyle={{minHeight:"300px"}}
                    toolbarStyle={{backgroundColor:"var(--color-input)"}}
                 />
            </div>
        </main>
    );
}

const uploadImage = () => {

}

export default AddItemPage;