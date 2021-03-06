import React from 'react';
import * as ReactDOM from 'react-dom/client';

import Header from './src/Header';
import Footer from './src/Footer';

import HomePage from './src/HomePage';
import GenrePage from './src/GenrePage';
import RecentPage from './src/RecentPage';
import AddItemPage from './src/AddItemPage';
import ItemPage from './src/ItemPage';
import LoginPage from './src/LoginPage';
import AdminPage from './src/AdminPage';
import AdminMainPage from './src/AdminMainPage';
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

        {/* 
        URLで表示ページを分岐する
        Settings.tsxのbasepathでドメイン名以降のサイトのルートディレクトリまでのパスを指定する
         */}
        <BrowserRouter>
        <Routes>
            <Route path={Settings.basepath + "/"} element={<HomePage />} />
            <Route path={Settings.basepath + "category"} element={<GenrePage />} />
            <Route path={Settings.basepath + "recent"} element={<RecentPage />} />
            <Route path={Settings.basepath + "item"} element={<ItemPage />} />
            <Route path={Settings.basepath + "login"} element={<LoginPage />} />
            <Route path={Settings.basepath + "mypage"} element={<AdminPage />} />
            <Route path={Settings.basepath + "admin_main"} element={<AdminMainPage />} />
            <Route path={Settings.basepath + "additem"} element={<AddItemPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>

        <Footer />
    </div>
);