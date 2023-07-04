import { FaTrashCan } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react"
import style from './DataList.module.css';
import {Link} from "react-router-dom";

function DataList({idx, content}){
    const [isReviewed, setIsReviewed] = useState(false);
    const id = 1;
    return (
        <div className={style.list_wrapper}>
            <div className={`${style.list_idx}`}>{idx+1}</div>
            <Link to={{pathname : `/dataView/${id}`}}>
                <div className={`${style.list_content}`}>{content}</div>
            </Link>
            <div className={`${style.list_buttons}`}>
            {
                isReviewed ? 
                <Button className={style.list_buttons_button} variant="contained" disabled>Review</Button> : 
                <Button className={style.list_buttons_button} variant="contained" onClick={()=>{setIsReviewed(true)}}>Review</Button>
            } 
            <FaTrashCan/>
            </div>
            
        </div>
        
    );
}

export default DataList;