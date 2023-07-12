import { useEffect, useState,useRef } from "react";

const DataEditList=(data)=>{
    return(
        <div class="row">
        <div class="col-5" style={{borderRight: '1px solid rgb(174, 168, 168)'}}>{f}</div>
        <div class="col-7">
            <input value={data===null?"":data[f]} placeholder='null'/>
        </div>
        </div>
    );
}

export default DataEditList;