import React from 'react';


import Carousel from './Carousel';
import Recommend from './Recommend';
import Recent from './Recent';

const HomePage = () => {
    return (
        <main>
            <Carousel />
            <Recommend />
            <Recent />
        </main>
    );
}

export default HomePage;