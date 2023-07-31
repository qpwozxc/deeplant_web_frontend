import { useState, useEffect, useRef } from "react";
import { Box, Button,  Divider, useTheme, Tab ,TabContext ,TabList ,TabPanel} from "@mui/material";
// 데이터 목록 컴포넌트
import DataList from "./DataList";
// 삭제 경고창 컴포넌트
import TransitionsModal from "./WarningComp";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import SearchFilterBar from "../Search/SearchFilterBar";
import ExcelController from "../SingleData/excelContr";

const RejectedDataListComp=()=>{
    const [isLoaded, setIsLoaded] = useState(true);
    const [meatList, setMeatList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    // 전체 데이터 
    const [totalData, setTotalData] = useState(0);
    // 현재 페이지 번호 
    const [currentPN, setCurrentPN] = useState(1);
    // 현재 화면에 나타난 배열 ex ) [1,2,3,4,5]
    const [currentPageArray, setCurrentPageArray] = useState([]);
    // 5개씩 자른 전체 배열 ex ) [[1,2,3,4,5],[6,7,8,9,10,], ...]
    const [totalSlicedPageArray, setTotalSlicedPageArray] = useState([]);
    const offset = 0; // 현재 로드하는 페이지의 인덱스 (fetch)
    const count = 6; // 한페이지당 보여줄 개수 (fetch)

    const limit = 5; // 한 화면당 페이지 배열의 원소 개수
    //const page = 0;
    const totalPages = Math.ceil(totalData / count); 
  
    //페이지 별 데이터를 count 개수만큼 받아서 meatList에 저장
    const getMeatList = async (offset) => {
      
      const json = await (
        await fetch(`http://3.38.52.82/meat/status?statusType=1&offset=${offset}&count=${count}`)
      ).json();
      console.log('fetch done!');
      // 전체 데이터 수
      setTotalData(json["DB Total len"]);
      // 데이터 
      setMeatList(json['반려']);

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
      getMeatList(offset);
      // 페이지네이션 배열 슬라이스 
      totalData && setTotalSlicedPageArray(sliceByLimit(totalPages, limit));
    }, [totalPages, limit]);

    useEffect(() => {
      totalData && setCurrentPageArray(totalSlicedPageArray[0]);
    }, [totalSlicedPageArray]);  

    // 페이지별 데이터 불러오기
    const handleCurrentPage = (offset) => {
      setCurrentPage(offset);
      getMeatList(offset);
    };

    // 삭제할 데이터 목록
    const [deleteItems, setDeleteItems] = useState([]);
    const [isDelClick, setIsDelClick] = useState(false);
    const setDelete =(items)=>{
        setDeleteItems(items);
    }
    // 삭제버튼 클릭
    const handleDeleteBtn = () =>{
        console.log('tow delete',deleteItems);
        // 경고
        setIsDelClick(true);
        //console.log("iscliked", isDelClick);
        // api 연결 
    }
    
    return(
      <div>
        <Box sx={styles.fixed}>
        <SearchFilterBar/>
        <div style={{display: "flex",justifyContent: "center", alignItems:'center', paddingRight:'85px'}}>
        <ExcelController/>
        </div>
        </Box>
      
        <div style={{marginTop:'70px'}}>
        <div style={{textAlign: "center", width: "100%", padding: "0px 100px", paddingBottom: "0",}}>
        {isLoaded ? (
          //데이터가 로드된 경우 데이터 목록 반환
          <DataList meatList={meatList} pageProp={'reject'} setDelete={setDeleteItems} offset={offset} count={count}/>
        ) : (
          // 데이터가 로드되지 않은 경우 로딩중 반환
          <Spinner animation="border"/>
        )}
        </div>
          <Box sx={{display:'flex', margin:'20px 0', padding:'0px 100px', width:'100%', justifyContent:'start'}}>
            <Button variant="contained" onClick={handleDeleteBtn}>삭제</Button>
          </Box>
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
        {
            isDelClick       
            ?<TransitionsModal id={deleteItems} setIsDelClick={setIsDelClick}/>
            :<></>
        }
      </div>
      </div>
    );
}

export default RejectedDataListComp;

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
};

