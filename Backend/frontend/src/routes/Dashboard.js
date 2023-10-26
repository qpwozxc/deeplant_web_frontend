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
import StatsExport from "../components/DataListView/statsExport";
// mui 
import { Box, Button, } from "@mui/material";
// import timezone
import { TIME_ZONE } from "../config";
// import icon
import {FaBoxOpen} from "react-icons/fa";

const navy =  '#0F3659';

function Dashboard() { 
  // 목록/ 통계/ 반려함 탭 메뉴
  const [value, setValue] = useState('list');
  //const [period, setPeriod] = useState(7);
  const s = new Date();
  s.setDate(s.getDate() -7);
  const [startDate, setStartDate] = useState(new Date(s.getTime() + TIME_ZONE).toISOString().slice(0, -5));
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + TIME_ZONE).toISOString().slice(0, -5));
  // 완료버튼 클릭 여부 
  const [isDateFilterClicked, setIsDateFilterClicked] = useState(false);

  useEffect(()=>{
    console.log('str', startDate, 'end', endDate);
  },[startDate, endDate]);

  return (
    <div style={{overflow: 'overlay', width:'100%', marginTop:'120px',height:'100%', paddingLeft:'30px', paddingRight:'20px'}}>
      {/**페이지 제목 Dashboard ()> 반려함) */}
      <Box style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
        {
          value === "reject"
          ? <div style={{display:'flex'}}>
              <span style={{color:'#b0bec5', fontSize:'30px', fontWeight:'600'}}>Dashboard {'>'} </span>
              <span style={{color:`${navy}`, fontSize:'30px', fontWeight:'600'}}>반려함</span>
            </div>
          : <span style={{color:`${navy}`, fontSize:'30px', fontWeight:'600'}}>Dashboard</span>
        }
        <div style={{display:'flex',justifyContent:'end'}}>
          <Button  style = {value === "reject"? styles.tabBtnCilcked : {color:`${navy}`, border:`1px solid ${navy}`}} value="reject" variant="outlined" onClick={(e)=>{setValue(e.target.value)}}>
            <FaBoxOpen style={{marginRight:'3px'}}/>
            반려함
          </Button>
        </div>
      </Box>

      {/**이동 탭 (목록, 통계 , 반려) */}
      <Box sx={styles.fixedTab}>
        <div style={{display:'flex'}}>
          <Button  style = {value === "list" ? styles.tabBtnCilcked : styles.tabBtn} value="list" variant="outlined" onClick={(e)=>{setValue(e.target.value)}}>목록</Button>
          <Button  style = {value === "stat" ? styles.tabBtnCilcked : styles.tabBtn} value="stat" variant="outlined" onClick={(e)=>{setValue(e.target.value)}}>통계</Button>
        </div>
      </Box >

      {/**검색필터, 엑셀  */}
      <Box sx={styles.fixed}>
        <SearchFilterBar setStartDate={setStartDate} setEndDate={setEndDate} />
        <div style={{display: "flex",justifyContent: "center", alignItems:'center', paddingRight:'85px'}}>
          { value === "list" && <ExcelController/>}
          { value === "stat" && <StatsExport/>}
        </div>
      </Box>

      { value === "list" && <DataListComp startDate={startDate} endDate={endDate}/> }
      { value === "stat" && <DataStat startDate={startDate} endDate={endDate}/>}
      { value === "reject" && <RejectedDataListComp startDate={startDate} endDate={endDate}/> }
    </div>
  );
}

export default Dashboard;


const styles={
  fixed:{
    zIndex: 1,
    borderRadius:'0',
    display:'flex',
    justifyContent:'space-between',
    backgroundColor:'white',
    margin:'10px 0px'
  },
  fixedTab:{
    right:'0',
    left:'0px',
    borderRadius:'0',
    backgroundColor:'',
    display:'flex', 
    justifyContent:'space-between' ,
    marginTop:'30px', 
    borderBottom:'solid rgba(0, 0, 0, 0.12)',
    borderBottomWidth: 'thin',
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





