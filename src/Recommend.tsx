import React from 'react';
import Item from './Item';

const Recommend = () => {
    return (
        <div>
            <h2>おすすめ商品</h2>
            <div className="items">
                <Item url="item?id=testdata" image="./images/item_sample.png" name="すてきな本" price={3000} />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    );
}

export default Recommend;