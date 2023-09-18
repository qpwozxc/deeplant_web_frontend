import { useState, useEffect } from "react";
import SearchFilterBar from "../components/Search/SearchFilterBar";
// 데이터 목록
import PADataListComp from "../components/DataListView/PADataListComp";
// mui 
import { Box, Button, } from "@mui/material";

const TIME_ZONE = 9 * 60 * 60 * 1000;

function PA(){
    const s = new Date();
    s.setDate(s.getDate() -7);
    const [startDate, setStartDate] = useState(new Date(s.getTime() + TIME_ZONE).toISOString().slice(0, -5));
    const [endDate, setEndDate] = useState(new Date(new Date().getTime() + TIME_ZONE).toISOString().slice(0, -5));

    return(
        <div>
            <Box sx={styles.fixed}>
                <SearchFilterBar setStartDate={setStartDate} setEndDate={setEndDate}/>
            </Box>
            <Box sx={{marginTop:'210px'}}>
                <PADataListComp startDate={startDate} endDate={endDate}/>
            </Box>
            
        </div>
    );
}
export default PA;

const styles={
    fixed:{
      position: 'fixed', 
      top:'70px',
      right:'0',
      left:'65px',
      zIndex: 1,
      width:'100%',
      borderRadius:'0',
      display:'flex',
      justifyContent:'center',
      backgroundColor:'white',
    }, 
    
 
  }
  