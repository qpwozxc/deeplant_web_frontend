import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function DataEdit(){
    //관리번호 받아오기
    const {id} = useParams();
    
    console.log('id',id);
}

export default DataEdit;