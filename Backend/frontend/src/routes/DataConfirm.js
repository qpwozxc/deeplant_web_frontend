import { useState, useEffect, useRef } from "react";
import { useParams,Link } from "react-router-dom";
import { DataLoad } from "../components/DataDetailPage/SingleDataLoad";
import DataView from "../components/DataDetailPage/DataView";
import { Box, Typography, Button, IconButton} from '@mui/material';
import { FaAngleDoubleLeft } from "react-icons/fa";

function DataConfirm(){
    //현재 로그인한 유저 이메일
    const [currentUser, setCurrUser] = useState("admin@admin.com")
    const idParam  = useParams();
    return(
        <Box sx={{ display: "flex"}}>
        <Box sx={style.fixed}>
          
            <Link to={{pathname : '/DataManage'}} >
              <IconButton sx={{backgroundColor:'white'}} size="large">
              <FaAngleDoubleLeft/>
              </IconButton>
            </Link>
         
        </Box>
        {DataLoad(idParam.id, "검토", currentUser)}
        
        </Box>
    );
}
//<DataView page={"검토"}/>
export default DataConfirm;

const style={
  fixed:{
    position: 'fixed', 
    top:'70px',
    right:'0',
    left:'65px',
    zIndex: 1,
    width:'fit-content',
    borderRadius:'0',
    display:'flex',
    justifyContent:'space-between',
    backgroundColor:'#F5F5F5',
    height: "70px",
  },
  
  }