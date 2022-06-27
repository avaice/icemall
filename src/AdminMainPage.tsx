import React from 'react';
import Settings from './Settings';

const apiKey = Settings.getApiKey();


const AdminMainPage = () => {
    return (
        <main>
            <div id="loginPanel">
                <h2>管理ページ</h2>
                <p>
                    ログイン済みです
                </p>
                <div className="btn" onClick={logout} style={{width:"100px"}}>
                        ログアウト
                </div>
            </div>
        </main>
    );
}


const logout = async () => {
    const formData = new FormData();
    formData.append('key', apiKey);

    const request = new Request(Settings.apipath + "logout.php", {
        method: 'POST',
        body: formData,
        credentials:"include"
    });
    await fetch(request).then(response => response.json())
    .then((data) => {
        const result = JSON.parse(JSON.stringify(data));
        if(result["status"] == "OK"){
            window.location.href = "./";
        }else{
            alert("ログアウトに失敗しました。\n" + result["response"]);
        }
    });
}

export default AdminMainPage;