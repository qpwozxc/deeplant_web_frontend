import { useState, useEffect } from "react"
import Base from "../components/Base/BaseCmp";
import DataLoad from "../components/Meat/DataLoad";
import styles from "./DataView.module.css"
import Sidebar from "../components/Base/Sidebar";
function DataView(){
    const [loading, setLoading] = useState(true);
    return (
        <div className={styles.container}>
            <Sidebar/>
            <Base/>
            <DataLoad/>
        </div>
    );
}

export default DataView;