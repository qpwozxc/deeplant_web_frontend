import { useState, useEffect, useRef } from "react";
import { Box, Button,  Divider, useTheme, Tab ,TabContext ,TabList ,TabPanel} from "@mui/material";
import DataList from "./DataList";
import Pagination from "react-bootstrap/Pagination";
import PaginationComp from "./paginationComp";
import Spinner from "react-bootstrap/Spinner";
import pagination from './pagination.json'

const TIME_ZONE = 9 * 60 * 60 * 1000;

const DataListComp=({startDate, endDate, pageType})=>{
    console.log('date', startDate, endDate);
    const [isLoaded, setIsLoaded] = useState(true);// -> 삭제
    const [meatList, setMeatList] = useState([]);
    
    // 기간 일주일 전 : 디폴트
    const s = new Date();
    s.setDate(s.getDate() -7)
    const [start, setStart] = useState(new Date(s.getTime() + TIME_ZONE).toISOString().slice(0, -5));
    const [end , setEnd] = useState(new Date(new Date().getTime() + TIME_ZONE).toISOString().slice(0, -5));

    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [currentPN, setCurrentPN] = useState(1);
    const [currentPageArray, setCurrentPageArray] = useState([]);
    const [totalSlicedPageArray, setTotalSlicedPageArray] = useState([]);
    const [offset, setOffset] = useState(0); // 현재 로드하는 페이지의 인덱스 (fetch)
    const count = 6; // 한페이지당 보여줄 개수 (fetch)
    const limit = 5; // 한 화면당 페이지 배열의 원소 개수
    //const page = 0;

    // 나중에 prop으로 변경
    const period = 7;
    const totalPages = Math.ceil(totalData / count); 
  

    //페이지 별 데이터를 count 개수만큼 받아서 meatList에 저장
    const getMeatList = async (offset, ) => {
      //console.log('data loading',offset)
      const json = await (
        await fetch(`http://3.38.52.82/meat/get?offset=${offset}&count=${count}&start=${startDate}&end=${endDate}&createdAt=${true}`)
      ).json();
     console.log('fetch done!', json);
     //console.log('data loaded!',offset)
      // 전체 데이터 수
      setTotalData(json["DB Total len"]);
      // 데이터 
      let data = [];
      json.id_list.map((m)=>{
        setMeatList([
          ...meatList,
          json.meat_dict[m],
        ]
        );
        data = [
          ...data,
          json.meat_dict[m],
        ];
      });
 
      
      setMeatList(data);
      // 데이터 로드 성공
      setIsLoaded(true);
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
      getMeatList(offset,);
      setMeatList(meatList);
      
      totalData && setTotalSlicedPageArray(sliceByLimit(totalPages, limit));
      //console.log(totalData);
      totalData && setCurrentPageArray(totalSlicedPageArray[0]);
    }, [startDate, endDate , totalData]);

    useEffect(() => {
     // console.log(meatList);
      totalData && setCurrentPageArray(totalSlicedPageArray[0]);
    
      //console.log('int?',totalSlicedPageArray[0])
    }, [totalSlicedPageArray]);  


    // 페이지별 데이터 불러오기
    const handleCurrentPage = (page) => {
      //console.log('page',page);
      getMeatList(page-1);
    };

    // < 버튼 클릭시 
    const handleOnClickPrev = () =>{
      currentPN > 0
      ? setCurrentPN(currentPN - 1)
      : setCurrentPN(currentPN);

      setCurrentPageArray(totalSlicedPageArray[currentPN]);
    }

    // > 버튼 클릭시
    const handleOnClickNext = () =>{
      currentPN < totalSlicedPageArray.length - 1
      ? setCurrentPN(currentPN + 1)
      : setCurrentPN(currentPN);

      setCurrentPageArray(totalSlicedPageArray[currentPN]);
    }

    return(
        <div style={{position: 'fixed', top:'200px',left:'30px' ,width:'100%'}}>
          <div style={{textAlign: "center", width: "100%", padding: "0px 150px", paddingBottom: "0",}}>
          {//meatList.length!==0 
          //? (//데이터가 로드된 경우 데이터 목록 반환
            <DataList meatList={meatList} pageProp={pageType} offset={offset} count={count}/>
         // ) 
         // : (// 데이터가 로드되지 않은 경우 (데이터가 0인 경우랑 따로 봐야할듯 )로딩중 반환
        //    <Spinner animation="border" />
        //  )
      }
          </div>
          
          <Box sx={{display:'flex', position: 'fixed', bottom:'10px',marginTop:'40px', width:'100%', justifyContent:'center'}}>
          <Pagination>
            <Pagination.First />
            <Pagination.Prev onClick={handleOnClickPrev}/>
            {currentPageArray
              ? currentPageArray.map((m, idx) => {
                  return (
                    <Pagination.Item key={idx} onClick={()=>{setCurrentPage(m); setOffset(m-1); handleCurrentPage(m);}}>
                      {m}
                    </Pagination.Item>
                  );
                })
              : null}
            <Pagination.Next onClick={handleOnClickNext} />
            <Pagination.Last />
          </Pagination>
          </Box>
      </div>
    );
}

export default DataListComp;
