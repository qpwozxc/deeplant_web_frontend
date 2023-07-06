import { useState, useEffect } from "react"
import Base from "../components/Base/BaseCmp";
import SingleDataLoad from "../components/Meat/SingleDataLoad";
import styles from "./DataView.module.css"
function DataView(){
    const [loading, setLoading] = useState(true);
    return (
        <div className={styles.container}>
            <Base/>
            <SingleDataLoad/>
        </div>
    );
}

export default DataView;