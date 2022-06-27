import React, { useState }  from 'react';
import "../style/login.css";
import Settings from './Settings';

type Props = {
};

class LoginPage extends React.Component<{}, {loginResponse: string}> {

    

    constructor(props : Props){
        super(props);
        this.state = {loginResponse: ""};
    }

    render(){
    
        return (
            <main>
                <div id="loginPanel">
                    <h2>ログイン</h2>
                    <form id="loginForm">
                        <p id="loginForm_errText">{this.state.loginResponse}</p>
                        <input type="text" placeholder="メールアドレス" name="mail" onKeyDown={this.keyCheck}/><br/>
                        <input type="password" placeholder="パスワード" name="pass" onKeyDown={this.keyCheck}/>
                        <div className="btn" id="submitBtn" onClick={this.login}>
                            ログイン
                        </div>
                    </form>
                </div>
            </main>
        );
    }

    keyCheck: React.KeyboardEventHandler<HTMLInputElement> = (e): void => {
        if (e.key === "Enter") {
            this.login();
        }  
    }   

    login = async () => {
        
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
            }else if(this){
                this.setState({loginResponse: result["response"]});
            }
        });
    }

}





export default LoginPage;