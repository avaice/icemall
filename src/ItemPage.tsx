import React , {useState} from 'react';
import { useLocation } from 'react-router-dom';
import Relate from './Relate';
import Settings from './Settings';
import "../style/item.css";
import CircularJSON from 'circular-json';

let itemUpdated = false;

const ItemPage = () => {
    
    const placeHolder = {
        title:(
            <>
                <p className="placeholder">　　　　　　　　　　</p>
            </>
        ),
        desc:(
            <>
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
            </>
        ),
        stock:-1,
        price:-1,
        genre:-1,
        imgElm:<img className="placeholder"/>
    }
    const [itemState, setItemState] = useState(placeHolder);
    const search = useLocation().search;
    const query = new URLSearchParams(search);

    if(!itemUpdated){
        const formData = new FormData();
        formData.append('key', Settings.getApiKey());
        formData.append('id', query.get('id') as string);
        fetch(new Request(Settings.apipath + "getItems.php", {
            method: 'POST',
            body: formData
        })).then(response => response.json())
        .then((data) => {
            
            const result = JSON.parse(JSON.stringify(data));
            let _copyState = JSON.parse(CircularJSON.stringify(itemState));
            if(result["status"] == "OK"){
                if(result["response"]["items"].length > 0){
                    _copyState.title = result["response"]["items"][0]["name"];
                    _copyState.stock = parseInt(result["response"]["items"][0]["stock"]);
                    _copyState.price = parseInt(result["response"]["items"][0]["price"]);
                    _copyState.desc = <div dangerouslySetInnerHTML={{__html : result["response"]["items"][0]["desc"]}}></div>;
                    _copyState.imgElm = <img src={Settings.apipath + result["response"]["items"][0]["image"]}/>;
                    _copyState.genre = parseInt(result["response"]["items"][0]["genre"]);
                    Settings.setRecent(result["response"]["items"][0]["id"]);
                }else{
                    _copyState.title = "商品が見つかりませんでした";
                    _copyState.desc = <p>存在しない商品か、削除された可能性があります。</p>;
                    _copyState.imgElm = <img className="placeholder"/>;
                }

            }else{
                _copyState.title = "商品取得時にエラーが発生しました";
                _copyState.desc = <p>ERROR!</p>;
                _copyState.imgElm = <img className="placeholder"/>;
            }
            setItemState(_copyState);
        });
        itemUpdated = true;
    }
    
    
    return (
        <main>
            
            <div id="itemDetail">
                <div id="itemDetail_img">
                    {itemState.imgElm}
                </div>
                <div id="itemDetail_command">
                    <h2 id="itemDetail_title">{itemState.title}</h2>
                    <p id="itemDetail_zaiko">在庫数:{itemState.stock != -1 ? itemState.stock : <span className="placeholder">　　</span>}</p>
                    <p id="itemDetail_price">{itemState.price != -1 ? Math.floor(itemState.price * Settings.tax).toLocaleString() : <span className="placeholder">　　　　</span>}円(税込)</p>
                    <div id="itemDetail_addCart">
                        カートに入れる
                    </div>
                </div>
            </div>
            <h2>商品説明</h2>
            <div id="itemDesc">
                {itemState.desc}
            </div>

            <Relate genre={itemState.genre}/>
        </main>
    );
}

export default ItemPage;