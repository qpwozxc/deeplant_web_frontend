import { useState, useEffect, useRef } from "react";
// 검색 필터 컴포넌트
import SearchFilterBar from "../components/Search/SearchFilterBar";
// 목록 컴포넌트
import DataListComp from "../components/DataListView/DataListComp";
// 목록 통계 컴포넌트
import DataStat from "../components/Charts/DataStat";
// 반려 데이터 목록 컴포넌트
import RejectedDataListComp from "../components/DataListView/RejectedDataListComp";
// 엑셀 파일 export/ import 컴포넌트
import ExcelController from "../components/DataListView/excelContr";
// mui 
import { Box, Button, } from "@mui/material";
// import timezone
import { TIME_ZONE } from "../config";

const navy =  '#0F3659';

function Dashboard() { 
  // 목록/ 통계/ 반려함 탭 메뉴
  const [value, setValue] = useState('list');
  const [period, setPeriod] = useState(7);
  const s = new Date();
  s.setDate(s.getDate() -7);
  const [startDate, setStartDate] = useState(new Date(s.getTime() + TIME_ZONE).toISOString().slice(0, -5));
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + TIME_ZONE).toISOString().slice(0, -5));

  useEffect(()=>{
    console.log('str', startDate, 'end', endDate);
  },[startDate, endDate]);

  return (
    <div style={{overflow: 'overlay', width:'100%', marginTop:'0px'}}>
      <Box>
        {
          value === "reject"
          ? <h1>Dashboard {'>'} 반려함</h1>
          : <h1>Dashboard</h1>
        }
        <div style={{display:'flex', width:'100%', justifyContent:'end'}}>
          <Button  style = {value === "reject"? styles.tabBtnCilcked : styles.tabBtn} value="reject" variant="outlined" onClick={(e)=>{setValue(e.target.value)}}>반려함</Button>
        </div>
      </Box>
    
      <Box sx={styles.fixed}>
        <SearchFilterBar setStartDate={setStartDate} setEndDate={setEndDate}/>
        <div style={{display: "flex",justifyContent: "center", alignItems:'center', paddingRight:'85px'}}>
          <ExcelController/>
        </div>
      </Box>

      <Box sx={styles.fixedTab}>
        <div style={{display:'flex'}}>
          <Button  style = {value === "list" ? styles.tabBtnCilcked : styles.tabBtn} value="list" variant="outlined" onClick={(e)=>{setValue(e.target.value)}}>목록</Button>
          <Button  style = {value === "stat" ? styles.tabBtnCilcked : styles.tabBtn} value="stat" variant="outlined" onClick={(e)=>{setValue(e.target.value)}}>통계</Button>
        </div>
      </Box >

      { value === "list" && <DataListComp startDate={startDate} endDate={endDate}/> }
      { value === "stat" && <DataStat startDate={startDate} endDate={endDate}/>}
      { value === "reject" && <RejectedDataListComp startDate={startDate} endDate={endDate}/> }
    </div>
  );
}

export default Dashboard;


const styles={
  fixed:{
    //position: 'fixed', 
    //top:'170px',
    right:'0',
    left:'65px',
    zIndex: 1,
    width:'100%',
    borderRadius:'0',
    display:'flex',
    justifyContent:'space-between',
    backgroundColor:'white',
  },
  fixedTab:{
    //position: 'fixed', 
    //top:'240px',
    right:'0',
    left:'0px',
    width:'100%',
    borderRadius:'0',
    backgroundColor:'',
    display:'flex', 
    justifyContent:'space-between' ,
   // marginBottom:'10px', 
    marginTop:'30px', 
    padding:'0px 100px', 
    borderBottom:'solid rgba(0, 0, 0, 0.12)',
    borderBottomWidth: 'thin',
    marginLeft: '16px',
    marginRight: '16px',
  },
  tabBtn:{
    border:'none',
    color:navy,
  },
  tabBtnCilcked:{
    border: `1px solid ${navy}`,
    color:navy,
  },
 
}





