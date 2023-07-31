import { useState, useEffect, useRef } from "react";
import { Box, Button,  Divider, useTheme, Tab ,TabContext ,TabList ,TabPanel} from "@mui/material";
import DataList from "./DataList";
import Pagination from "react-bootstrap/Pagination";
import PaginationComp from "./paginationComp";
import Spinner from "react-bootstrap/Spinner";
import pagination from './pagination.json'
const DataListComp=()=>{
    const [isLoaded, setIsLoaded] = useState(true);// -> 삭제
    const [meatList, setMeatList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [currentPN, setCurrentPN] = useState(1);
    const [currentPageArray, setCurrentPageArray] = useState([]);
    const [totalSlicedPageArray, setTotalSlicedPageArray] = useState([]);
    const offset = 0; // 페이지 인덱스 
    const count = 6; // 한페이지당 보여줄 개수
    const limit = 5;
    const page = 0;
    // 나중에 prop으로 변경
    const period = 7;
    const totalPages = Math.ceil(totalData / count); // 현재 9개
  
    //페이지 별 데이터를 count 개수만큼 받아서 meatList에 저장
    const getMeatList = async (offset) => {
      
      // 기간별 조회 안됨
      //&period=${period}
      const json = await (
        await fetch(`http://localhost:8080/meat/get?offset=${offset}&count=${count}`)
      ).json();
      
      //const json = pagination;
      //console.log("data:",json.meat_dict);

      // 전체 데이터 수
      setTotalData(json["DB Total len"]);
      // 데이터 
      let data = [];
      json.meat_id_list.map((m)=>{
        //console.log(m);
        setMeatList([
          ...meatList,
          json.meat_dict[m],
        ]
        );
        data = [
          ...data,
          json.meat_dict[m],
        ]
        //console.log('meatlist',meatList);
        //console.log('json', data);
        
      });
      setMeatList(data);
      // 데이터 로드 성공
      setIsLoaded(true);
    };
  
    // 페이지별 데이터 불러오기
    const handleCurrentPage = (page) => {
      setCurrentPage(page);
      getMeatList(page);
    };
  
    //페이지네이션 배열로 나눠서 저장
    const sliceByLimit = (totalPages, limit) => {
      const totalPageArr = Array(totalPages)
        .fill()
        .map((_, i) => i + 1);
      return Array(Math.ceil(totalPages / limit))
        .fill()
        .map((_, i) => totalPageArr.slice(i * limit, (i + 1) * limit));
    };
  
    //페이지네이션 배열 전체 초기화
    useEffect(() => {
      getMeatList(page);
      setMeatList(meatList);
      setTotalSlicedPageArray(sliceByLimit(totalPages, limit));
      setCurrentPageArray(totalSlicedPageArray[0]);
    }, [totalPages, limit]);

    useEffect(() => {
      console.log(meatList);
      setCurrentPageArray(totalSlicedPageArray[0]);
    }, [totalSlicedPageArray]);  
    
    return(
        <div style={{marginTop:'70px'}}>
        <div style={{textAlign: "center", width: "100%", padding: "0px 100px", paddingBottom: "0",}}>
        {meatList.length!==0 
        ? (//데이터가 로드된 경우 데이터 목록 반환
          <DataList meatList={meatList} pageProp={'list'}/>
        ) 
        : (// 데이터가 로드되지 않은 경우 로딩중 반환
          <Spinner animation="border" />
        )}
        </div>
          
        <Box sx={{display:'flex', marginTop:'40px', width:'100%', justifyContent:'center'}}>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev
            onClick={() => {
              currentPN > 0
                ? setCurrentPN(currentPN - 1)
                : setCurrentPN(currentPN);
              setCurrentPageArray(totalSlicedPageArray[currentPN]);
            }}
          />
          {currentPageArray
            ? currentPageArray.map((m, idx) => {
                return (
                  <Pagination.Item
                    key={idx}
                    onClick={() => {
                      //페이지 api 불러오기
                      setCurrentPage(m);
                    }}
                  >
                    {m}
                  </Pagination.Item>
                );
              })
            : null}
          <Pagination.Next
            onClick={() => {
              currentPN < totalSlicedPageArray.length - 1
                ? setCurrentPN(currentPN + 1)
                : setCurrentPN(currentPN);
              setCurrentPageArray(totalSlicedPageArray[currentPN]);
            }}
          />
          <Pagination.Last disabled />
        </Pagination>
        </Box>
      </div>
    );
}

export default DataListComp;
