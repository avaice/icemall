import React from 'react';
import Settings from "./Settings"

export type ItemType = {
    url?:string,
    image?:string,
    name?:string,
    price?:number
}

export interface ItemObject{
    id:string;
    genre:number;
    date:string;
    name:string;
    desc:string;
    price:number;
    stock:number;
    image:string;
}

const Item = (props:ItemType) => {
    return (
        <div className="item">
            <a href={props.url}></a>
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

export const _ItemPlaceHolder = <>
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
    <Item></Item>
    </>



export default Item;