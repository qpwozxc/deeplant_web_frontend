import { useState, useEffect } from "react"
import styles from "./Home.module.css";
import Base from "../components/Base/BaseCmp";

import Search from "../components/Meat/Search";
import DataList from "../components/DataView/DataList";
function Home(){
    const [isLoaded, setIsLoaded] = useState(true);
    const [meatList, setMeatList] = useState([1,1,1,1,1,1,1,1]);
    const offset = 0;
    const count = 3;
    const totalData = 24;
    
    const getMeatList = async() => {
        const json = await(
            await fetch(
                `http://localhost:8080/meat?offest=${offset}&count=${count}`
            )
        ).json();
        setMeatList(json);
        console.log(json);
        setIsLoaded(true);
    }

    return(
        <div>
            <Base/> 
            <div style={{padding:'70px 60px', paddingBottom:'0'}}>
            <Search />
            </div>
            
            {
                isLoaded?
                (<div className="wrapper" style={{padding:'20px 40px', paddingBottom:'0'}}>      
                    { 
                    meatList.map((m, idx) =>
                        <DataList
                            key={idx}
                            content={m}
                            idx={idx}
                        />
                    )}
                </div>
                ):
                <div>Loading...</div>
            }
        </div>
      );
}

export default Home;