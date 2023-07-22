import { useState, useEffect, useRef } from "react";
import { useParams,Link } from "react-router-dom";

import DataView from "../components/SingleData/DataView";
import { Box, Typography, Button, IconButton} from '@mui/material';
import { FaAngleDoubleLeft } from "react-icons/fa";

function DataConfirm(){
    return(
        <Box sx={{ display: "flex"}}>
        <Box sx={style.fixed}>
          
            <Link to={{pathname : '/DataManage'}} >
              <IconButton  size="large">
              <FaAngleDoubleLeft/>
              </IconButton>
            </Link>
         
        </Box>
        <DataView page={"검토"}/>
        </Box>
    );
}

export default DataConfirm;

const style={
    fixed:{
      position: 'fixed', 
      top:'70px',
      right:'0',
      left:'65px',
      zIndex: 1,
      width:'100%',
      borderRadius:'0',
      display:'flex',
      justifyContent:'space-between',
      backgroundColor:'white',
      height: "70px",
    },
  
  }