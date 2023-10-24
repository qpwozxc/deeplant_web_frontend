import { useState, useEffect } from "react";
import { useParams, useLocation ,Link } from "react-router-dom";
import { Box, Typography, Button, IconButton} from '@mui/material';
import "bootstrap/dist/css/bootstrap.css"; 
import { FaArrowLeft } from "react-icons/fa";
import DataLoad from "../components/DataDetailPage/DetailDataController";

const navy =  '#0F3659';

function DataPredict(){
    //현재 로그인한 유저 이메일
    const [currentUser, setCurrUser] = useState("admin@admin.com");

    //로그인한 관리자의 관리번호 받아오기
    //const {editId} = useParams();
    //관리번호
     const idParam  = useParams();

    return (
      <Box sx={{ display: "flex"}}>
        <Box sx={style.fixed}>
          <div style={{display:'flex', alignItems:'center', marginLeft:'10px'}}>
            <Link to={{pathname : '/PA'}} style={{textDecorationLine:'none',display:'flex', alignItems:'center',}} >
              <IconButton style={{color:`${navy}`, backgroundColor:'white', border:`1px solid ${navy}`, borderRadius:'10px', marginRight:'10px'}}>
                <FaArrowLeft/>
              </IconButton>
            </Link>
            {/**컴포넌트화 시키기 */}
            <span style={{textDecoration:'none', color:`${navy}`, fontSize:'30px', fontWeight:'600'}}>
               {idParam.id}
            </span>
          </div>
        </Box>
        <DataLoad id = {idParam.id} page = {"예측"} currentUser={currentUser}/>
        
      </Box>
    );
}
export default DataPredict;

const style={
  fixed:{
    position: 'fixed', 
    top:'95px',
    right:'0',
    left:'80px',
    zIndex: 1,
    width:'fit-content',
    borderRadius:'0',
    display:'flex',
    justifyContent:'space-between',
    //backgroundColor:'#F5F5F5',
    height: "70px",
  },

}

