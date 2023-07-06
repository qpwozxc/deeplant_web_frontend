import { FaTrashCan } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react"
import {Link} from "react-router-dom";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import style from './DataList.module.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function DataList({idx, content}){
    const [isReviewed, setIsReviewed] = useState(false);
    const id = 1;
    return (
        <tr className={`${style.table_row}`}>
            <td>
                
                <div className={`${style.list_idx}`}>{idx+1}</div>
                
            </td>
            <td>
                <Link to={{pathname : `/dataView/${content}`}}>
                <div className={`${style.list_content}` } >{content}</div>
                </Link>
            </td>
            <td>
                {  
                isReviewed ? 
                <Button size="small" className={style.list_buttons_button} variant="contained" disabled>Review</Button> : 
                <Button size="small" className={style.list_buttons_button} variant="contained" onClick={()=>{setIsReviewed(true)}}>Review</Button>
                } 
            </td>
            <td>
            <IconButton aria-label="delete">
            <DeleteIcon />
            </IconButton>
            </td>
            </tr>
        
    );
}
/*
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
*/
export default DataList;