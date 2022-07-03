import React from 'react';
import Settings from './Settings';

const apiKey = Settings.getApiKey();


const loginCheck = () => {
    const formData = new FormData();
    formData.append('key', apiKey);

    fetch(new Request(Settings.apipath + "apiKeyCheck.php", {
        method: 'POST',
        body: formData,
        credentials:"include"
    })).then(response => response.json())
    .then((data) => {
        const result = JSON.parse(JSON.stringify(data));
        if(result["status"] != "OK"){
            localStorage.removeItem("key");
            window.location.href = "./login";
        }else{
            window.location.href = "./admin_main";
        }
    });
}



const AdminPage = () => {
    loginCheck();
    return (
        <main style={{textAlign:"center"}}>
            通信中...<br/><br />
            <img src="./images/spinning-circles-black.svg" width="60px"></img>
        </main>
    );
}

export default AdminPage;