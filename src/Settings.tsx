
class Settings{
    static setTitleBar = (title : string) => {
        document.title = title + " - icemall";
    }
    static tax : number = 1.10;
    static basepath : string = process.env.NODE_ENV === "production" ? "/lab/iceshop/" : "";
    static apipath : string = "https://cho-ice.xyz/lab/iceshop/apis/";
    static genre: any;

    static getGenreList = (callback: (arg0: any) => void) => {
        if(!Settings.genre){
            fetch(new Request(Settings.apipath + "database/genre.json")).then(response => response.json())
            .then((data) => {
                const result = JSON.parse(JSON.stringify(data));
                Settings.genre = result;
                callback(result);
            });
        }
    }

    static getApiKey = () => {
        const key = localStorage.getItem("key");
        if (!key)return "NOT_LOGINED";
        return key;
    }
    static setRecent = (arg:string) => {
        let recent : string[] = this.getRecent();
        if(!recent.includes(arg)){
            recent.unshift(arg);
            if(recent.length > 10){
                recent = recent.slice(0, -1);
            }
            localStorage.setItem("icemall_recent", JSON.stringify(recent));
        }
    }
    static getRecent = () => {
        const savedata = localStorage.getItem("icemall_recent");
        let recent : string[];
        if(!savedata)
            recent = [];
        else
            recent = JSON.parse(savedata);
        return recent;
    }
}


export default Settings;