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

interface ItemBoxProps{
    title : string;
    link? : string;
    reqParam : string[][];
}

const ItemBox = (props:ItemBoxProps) => {
    const [itemsList, setItemsList] = useState(placeHolder);

    let _itemsList : ItemObject[] = [];
    if(!GotData){
        const formData = new FormData();
        formData.append('key', Settings.getApiKey());
        props.reqParam.forEach((req : string[]) => {
            formData.append(req[0], req[1]);
        })
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
            {props.link? <a href={props.link}><h2>{props.title}</h2></a> : <h2>{props.title}</h2>}
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

export default ItemBox;