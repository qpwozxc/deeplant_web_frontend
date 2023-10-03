import { useState, useEffect, useRef } from "react";
import { Box, Button,  } from "@mui/material";
// 데이터 목록 컴포넌트
import DataList from "./DataList";
import Spinner from "react-bootstrap/Spinner";
import PaginationV2 from "./PaginationV2";
import './DataListComp.module.css'
const navy =  '#0F3659';
const apiIP = '3.38.52.82';

const RejectedDataListComp=({startDate, endDate})=>{
    const [isLoaded, setIsLoaded] = useState(true);
    const [meatList, setMeatList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    // 전체 데이터 
    const [totalData, setTotalData] = useState(0);
    const offset = 0; // 현재 로드하는 페이지의 인덱스 (fetch)
    const count = 6; // 한페이지당 보여줄 개수 (fetch)
    const limit = 5; // 한 화면당 페이지 배열의 원소 개수
    const totalPages = Math.ceil(totalData / count); 
  
    //api fetch
    const getMeatList = async (offset) => {
      const json = await (
        await fetch(`http://${apiIP}/meat/status?statusType=1&offset=${offset}&count=${count}&start=${startDate}&end=${endDate}`)
      ).json();
      console.log('fetch done!');
      // 전체 데이터 수 fetch
      setTotalData(json["DB Total len"]);
      // 데이터 fetch
      setMeatList(json['반려']);
      // 데이터 로드 성공
      setIsLoaded(true);
    };
  
      //데이터 api 로 부터 fetch
    useEffect(() => {
      getMeatList(currentPage - 1);
    }, [startDate, endDate, currentPage]);

/**
 * 
 * <Box sx={style.deletBtnContainer}>
          <Button variant="contained" style={style.deleteBtn} onClick={handleDeleteBtn}>삭제</Button>
        </Box>
 */
    
    return(
        <div>
          <div style={style.listContainer}>
            {isLoaded ? (
              //데이터가 로드된 경우 데이터 목록 반환
              <DataList meatList={meatList} pageProp={'reject'} offset={offset} count={count} totalPages={totalPages}/>
            ) : (
              // 데이터가 로드되지 않은 경우 로딩중 반환
              <Spinner animation="border"/>
            )}
          </div>
          <Box sx={style.paginationBar}>
            <PaginationV2 totalPages={totalPages} totalDatas={totalData} count={count} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </Box>
      </div>
    );
}

export default RejectedDataListComp;
const style = {
  listContainer :{
    textAlign: "center",
    width: "100%",
    paddingRight:'0px',
    //padding: "0px 150px",
    paddingBottom: "0",
    height:'400px',
  },
  paginationBar : {
    display: "flex",
    position: "fixed",
    bottom: "10px",
    marginTop: "40px",
    width: "100%",
    justifyContent: "center",
  },
  deletBtnContainer : {
    display:'flex', 
    margin:'20px 0', 
    padding:'0px 100px', 
    width:'100%', 
    justifyContent:'start'
  },
  deleteBtn :{
    backgroundColor:"transparent",
    color : navy,
    fontWeight : '600',
  }
}