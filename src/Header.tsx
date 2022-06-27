import React from 'react';

const Header = () => {
    return (
        <header>
            <a href="./">
            <img id="header_logo" src={`./images/logo.png`}/>
            </a>
            <div id="header_bar1">
                <form id="header_bar1_searchbar" action="./search" method="get">
                    <input type="text" name="q" placeholder="なにがほしい？"/>
                    <a href="#" className="material-icons">search</a>
                </form>
                <div id="header_bar1_cart" className="btn material-icons">
                    shopping_cart
                </div>
            </div>

            <div id="header_navbar">
                <a className="header_navbar_item" href="./category.html">カテゴリーから探す</a>
                <a className="header_navbar_item" href="./recent.html">最近チェックした商品</a>
                <a className="header_navbar_item" href="./mypage">マイページ</a>
            </div>
        </header>
    );
}

export default Header;