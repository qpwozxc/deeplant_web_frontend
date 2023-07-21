import { useState, useEffect, useRef } from "react";
import { Box, Button,  Divider, useTheme, Tab ,TabContext ,TabList ,TabPanel} from "@mui/material";
import DataList from "./DataList";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import TransitionsModal from "./WarningComp";
const RejectedDataListComp=()=>{
    const [isLoaded, setIsLoaded] = useState(true);
    const [meatList, setMeatList] = useState(sampleMeatList);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(78);
    const [currentPN, setCurrentPN] = useState(1);
    const [currentPageArray, setCurrentPageArray] = useState([]);
    const [totalSlicedPageArray, setTotalSlicedPageArray] = useState([]);
    const offset = 0;
    const count = 6; // 한페이지당 보여줄 개수
    const limit = 5;
    const page = 0;
    const totalPages = Math.ceil(totalData / count); // 현재 9개
  
    //페이지 별 데이터를 count 개수만큼 받아서 meatList에 저장
    const getMeatList = async (offset) => {
      const response = await fetch(
        `http://localhost:8080/meat?offset=${offset}&count=${count}`
      );
      console.log("response",response);
      const json = await (
        await fetch(`http://localhost:8080/meat?offset=${offset}&count=${count}`)
      ).json();
      console.log("data:",json);
      //setMeatList(json);
      //setIsLoaded(true);
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
      //getMeatList(page);
      setTotalSlicedPageArray(sliceByLimit(totalPages, limit));
      setCurrentPageArray(totalSlicedPageArray[0]);
    }, [totalPages, limit]);
    useEffect(() => {
      setCurrentPageArray(totalSlicedPageArray[0]);
    }, [totalSlicedPageArray]);  

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
        <div style={{marginTop:'70px'}}>
        <div style={{textAlign: "center", width: "100%", padding: "0px 100px", paddingBottom: "0",}}>
        {isLoaded ? (
          //데이터가 로드된 경우 데이터 목록 반환
          <DataList meatList={meatList} isRJPg={true} setDelete={setDeleteItems}/>
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
    );
}

export default RejectedDataListComp;

const sampleMeatList = [
    {
      id:"000189843795-cattle-chuck-chuck",
      userName:"김수현",
      userType:'1',
      company:'deeplant1',
      meatCreatedAt:"7/13/2023",
      farmAddr :"강원도 원주시 호저면 매호리",
      accepted : 'rejected',
    },
    {
        id:"000189843795-pig-boston_shoulder-boston_shoulder",
        userName:"나",
        userType:'3',
        company:'deeplant1',
        meatCreatedAt:"7/13/2023",
        farmAddr :"강원도 홍천군",
        accepted : 'rejected',
      },
  ];