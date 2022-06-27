import React from 'react';
import "../style/item.css";

import Settings from './Settings';

const ItemPage = () => {
    Settings.setTitleBar("ページが見つかりません");
    return (
        <main>
            <h2>404 NOT FOUND</h2><hr/>
            <p>
                お探しのページは見つかりませんでした・・・。
            </p>
        </main>
    );
}

export default ItemPage;