import React from 'react';
import "../style/login.css";

const LoginPage = () => {
    return (
        <main>
            <div id="loginPanel">
                <h2>ログイン</h2>
                <form id="loginForm">
                    <input type="text" placeholder="メールアドレス" name="mail"/><br/>
                    <input type="password" placeholder="パスワード" name="pass"/>
                    <div className="btn" id="submitBtn">
                        ログイン
                    </div>
                </form>
            </div>
        </main>
    );
}

export default LoginPage;