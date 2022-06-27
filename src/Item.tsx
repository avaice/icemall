import React from 'react';
import Settings from "./Settings"

export type ItemType = {
    url?:string,
    image?:string,
    name?:string,
    price?:number
}

const Item = (props:ItemType) => {
    return (
        <div className="item">
            <a href={props.url} target="_blank" rel="noopener noreferrer"></a>
            {props.image
                ? <img src={props.image}/>
                : <img className="placeholder"/>
            }
            {props.name
                ? <p>{props.name}</p>
                : <p className="placeholder">　　　　</p>
            }
            {props.price
                ? <p className="price">{Math.floor(props.price*Settings.tax).toLocaleString()}円</p>
                : <p className="price placeholder">　　　　</p>
            }
        </div>
    );
}

export default Item;