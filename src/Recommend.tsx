import React, {useState} from 'react';
import Item, {ItemObject, _ItemPlaceHolder} from './Item';
import Settings from './Settings';

let placeHolder:ItemObject[] = [];
placeHolder[0] = {id:"",
genre:-1,
date:"",
name:"loading",
desc:"",
price:0,
stock:0,
image:""};
let GotData = false;


const Recommend = () => {
    const [itemsList, setItemsList] = useState(placeHolder);

    let _itemsList : ItemObject[] = [];
    if(!GotData){
        const formData = new FormData();
        formData.append('key', Settings.getApiKey());
        formData.append('getCount', "12");
        fetch(new Request(Settings.apipath + "getItems.php", {
            method: 'POST',
            body: formData
        })).then(response => response.json())
        .then((data) => {
            const result = JSON.parse(JSON.stringify(data));
            GotData = true;
            if(result["status"] == "OK"){
                if(result["response"]["items"].length > 0){

                    for(let i=0; i<result["response"]["items"].length; i++){
                        _itemsList[i] = result["response"]["items"][i];
                    }
                    setItemsList(_itemsList);
                }else{
                    _itemsList[0] = JSON.parse(JSON.stringify(placeHolder[0]));
                    _itemsList[0].name = "none";
                    setItemsList(_itemsList);
                }
            }
        });
    
    }
    return (
        <div>
            <h2>新着商品</h2>
            <div className="items">
                {
                    itemsList ? itemsList.map(item => (
                        item.name == "loading" ? _ItemPlaceHolder : item.name == "none" ? "ありません" :<Item name={item.name} price={item.price} image={Settings.apipath + item.image} url={"./item?id=" + item.id} key={item.id}/>
                    )) : _ItemPlaceHolder
                }
            </div>
        </div>
    );
}

export default Recommend;