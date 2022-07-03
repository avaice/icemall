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
let n = 0;

interface RecentProps{
    option : string | null;
}

const Recent = (props : RecentProps) => {
    const [itemsList, setItemsList] = useState(placeHolder);

    let _itemsList : ItemObject[] = [];
    if(!GotData){
        GotData = true;
        const recent = Settings.getRecent();
        if(recent.length == 0){
            _itemsList[0] = JSON.parse(JSON.stringify(placeHolder[0]));
            _itemsList[0].name = "none";
            setItemsList(_itemsList);
        }
        recent.forEach(rId => {
            const formData = new FormData();
            formData.append('key', Settings.getApiKey());
            formData.append('id', rId);
            fetch(new Request(Settings.apipath + "getItems.php", {
                method: 'POST',
                body: formData
            })).then(response => response.json())
            .then((data) => {
                const result = JSON.parse(JSON.stringify(data));
                if(result["status"] == "OK"){
                    if(result["response"]["items"].length > 0){
                        _itemsList.push(result["response"]["items"][0]);
                    }
                    n++;
                    if(n == recent.length){
                        setItemsList(_itemsList);
                    }
                }
            });
        })
        
    }
    return (
        <div>
            <h2>最近チェックした商品</h2>
            <div className={props.option == "wrap" ? "items-wrap items" : "items"}>
                {
                    itemsList ? itemsList.map(item => (
                        item.name == "loading" ? _ItemPlaceHolder : item.name == "none" ? "ありません" :<Item name={item.name} price={item.price} image={Settings.apipath + item.image} url={"./item?id=" + item.id} key={item.id}/>
                    )) : _ItemPlaceHolder
                }
            </div>
        </div>
    );
}

export default Recent;