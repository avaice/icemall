import React from 'react';
import * as ReactDOM from 'react-dom/client';

import Header from './src/Header';
import Footer from './src/Footer';

import HomePage from './src/HomePage';
import ItemPage from './src/ItemPage';
import LoginPage from './src/LoginPage';
import NotFound from './src/NotFound';

import Settings from './src/Settings';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./style/style.css";



const rootElm = document.getElementById('dom');
if (!rootElm) throw new Error('DOMが見つかりません');

const root = ReactDOM.createRoot(rootElm);
root.render(
    <div>        
        <Header />
        <BrowserRouter>
        <Routes>
            <Route path={Settings.basepath + "/"} element={<HomePage />} />
            <Route path={Settings.basepath + "item"} element={<ItemPage />} />
            <Route path={Settings.basepath + "login"} element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
        <Footer />
    </div>
);