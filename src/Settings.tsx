
class Settings{
    static setTitleBar = (title : string) => {
        document.title = title + " - icemall";
    }
    static tax : number = 1.10;
    static basepath : string = "/lab/iceshop/"
}


export default Settings;