
class Settings{
    static setTitleBar = (title : string) => {
        document.title = title + " - icemall";
    }
    static tax : number = 1.10;
    static basepath : string = process.env.NODE_ENV === "production" ? "/lab/iceshop/" : "";
    static apipath : string = "https://cho-ice.xyz/lab/iceshop/apis/";

    static getApiKey = () => {
        const key = localStorage.getItem("key");
        if (!key)return "NOT_LOGINED";
        return key;
    }
}


export default Settings;