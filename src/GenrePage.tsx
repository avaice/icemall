import React, {useState} from 'react';
import ItemBox from './ItemBox';
import Settings from './Settings';

let placeHolder:string[] = [];
placeHolder[0] = "Loading";

let n:number;

const GenrePage = () => {
    n = -1;

    const [genreList, setGenreList] = useState(placeHolder);

    Settings.getGenreList((_genreList)=>{
        setGenreList(_genreList);
        console.log(_genreList)
    })

    return (
        <main>
            {
                genreList ? genreList[0] == "Loading" ? "" : genreList.map(genre => (
                    drawItemBox(genre)
                )) : ""
            }
        </main>
    );
}

const drawItemBox = (title:string) => {
    n++;

    if(n==0)return <></>;

    return <>
    <ItemBox title={title} reqParam={[["getCount", "4"],["genre", n.toString()]]} link={"./search?genre=" + n.toString()}/>
    <br/>
    </>;
}

export default GenrePage;