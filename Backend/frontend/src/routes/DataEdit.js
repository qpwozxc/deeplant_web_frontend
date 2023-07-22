import { useState } from "react";
import { useParams, useLocation ,Link } from "react-router-dom";
import { Box, Typography, Button, IconButton} from '@mui/material';

import ExcelController from "../components/SingleData/excelContr";
import DataView from "../components/SingleData/DataView";
import "bootstrap/dist/css/bootstrap.css"; 
import { FaAngleDoubleLeft } from "react-icons/fa";
function DataEdit(){
    //현재 로그인한 유저 이메일
    const [currentUser, setCurrUser] = useState("admin@admin.com");

    //로그인한 관리자의 관리번호 받아오기
    const {editId} = useParams();
    return (
      <Box sx={{ display: "flex"}}>
        <Box sx={style.fixed}>
          <div style={{display:'flex', alignItems:'center', marginLeft:'10px'}}>
            <Link to={{pathname : '/DataManage'}} >
              <IconButton  size="large">
              <FaAngleDoubleLeft/>
              </IconButton>
            </Link>
          </div>
          <div style={{display: "flex",justifyContent: "center", alignItems:'center', paddingRight:'85px'}}>
            <ExcelController/>
          </div>
        </Box>
        <DataView page={"수정및조회"} currentUser={currentUser}/>
      </Box>
    );
}

export default DataEdit;

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

