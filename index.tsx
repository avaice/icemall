import React from 'react';
import * as ReactDOM from 'react-dom/client';

import Header from './src/Header';
import Footer from './src/Footer';
import Carousel from './src/Carousel';
import Recommend from './src/Recommend';
import Recent from './src/Recent';

import "./style/style.css";

const rootElm = document.getElementById('dom');
if (!rootElm) throw new Error('DOMが見つかりません');

const root = ReactDOM.createRoot(rootElm);
root.render(
    <div>
        <Header />
        <main>
            <Carousel />
            <Recommend />
            <Recent />
        </main>
        <Footer />
        
    </div>
);