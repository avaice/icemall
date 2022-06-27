import React from 'react';
import Item from './Item';

const Recent = () => {
    return (
        <div>
            <h1>最近チェックした商品</h1>
            <div className="items">
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    );
}

export default Recent;