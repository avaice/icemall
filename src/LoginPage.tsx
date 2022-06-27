import React from 'react';
import "../style/login.css";
import Settings from './Settings';


const LoginPage = () => {
    return (
        <main>
            <div id="loginPanel">
                <h2>ログイン</h2>
                <form id="loginForm">
                    <input type="text" placeholder="メールアドレス" name="mail"/><br/>
                    <input type="password" placeholder="パスワード" name="pass"/>
                    <div className="btn" id="submitBtn" onClick={login}>
                        ログイン
                    </div>
                </form>
            </div>
        </main>
    );
}

const login = async () => {
    const loginElm : HTMLFormElement  = document.querySelector("#loginForm") as HTMLFormElement;
    if (!loginElm) throw new Error('ログインフォームのDOMが見つかりません');

    const idElm = loginElm.elements[0] as HTMLInputElement;
    const passElm = loginElm.elements[1] as HTMLInputElement;
    const formData = new FormData();
    formData.append('id', idElm.value);
    formData.append('pass', passElm.value);

    const request = new Request(Settings.apipath + "login.php", {
        method: 'POST',
        body: formData,
        credentials:"include"
    });
    await fetch(request).then(response => response.json())
    .then((data) => {
        const result = JSON.parse(JSON.stringify(data));
        if(result["status"] == "OK"){
            localStorage.setItem("key", result["response"]);
            window.location.href = "./mypage";
        }
    });
}

export default LoginPage;