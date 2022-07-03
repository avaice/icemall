import React from 'react';


import Carousel from './Carousel';
import ItemBox from './ItemBox';

const HomePage = () => {
    return (
        <main>
            <Carousel />
            <ItemBox title="おすすめ商品" reqParam={[["getCount", "12"]]}/>
        </main>
    );
}

export default HomePage;