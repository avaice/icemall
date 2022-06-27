import React from 'react';
import { useLocation } from 'react-router-dom';
import Relate from './Relate';

import "../style/item.css";


const ItemPage = () => {
    const search = useLocation().search;
    const query = new URLSearchParams(search);

    return (
        <main>
            
            <div id="itemDetail">
                <div id="itemDetail_img">
                    <img className="placeholder"/>
                </div>
                <div id="itemDetail_command">
                    <h2 id="itemDetail_title" className="placeholder">　　　　　　　　　　</h2>
                    <p id="itemDetail_zaiko">在庫あり</p>
                    <p id="itemDetail_price">10,000円(税込)</p>
                    <div id="itemDetail_addCart">
                        カートに入れる
                    </div>
                </div>
            </div>
            <div id="itemDesc">
                <h2>商品説明</h2>
                <p>id={query.get('id')}</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
                <p className="placeholder">　　　　　　　　　　　　　　　　　　　　　</p>
            </div>

            <Relate />
        </main>
    );
}

export default ItemPage;