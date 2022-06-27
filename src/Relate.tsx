import React from 'react';
import Item from './Item';

const Relate = () => {
    return (
        <div>
            <h1>関連する商品</h1>
            <div className="items">
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    );
}

export default Relate;