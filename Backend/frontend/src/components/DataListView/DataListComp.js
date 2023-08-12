import { useState, useEffect, useRef } from "react";
import { Box, } from "@mui/material";
import DataList from "./DataList";
import PaginationComp from "./paginationComp";
import Spinner from "react-bootstrap/Spinner";

const DataListComp=({startDate, endDate, pageType})=>{
  //console.log("date", startDate, endDate);
  const [isLoaded, setIsLoaded] = useState(true);
  const [meatList, setMeatList] = useState([]);
  // 페이지네이션 - api로 부터 받아오는 정보 전체 데이터 개수
  const [totalData, setTotalData] = useState(0);
  // 페이지네이션 컴포넌트와 공유하는 변수 -> current page 변화하면 api 새로 가져옴 
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 2; // 페이지네이션 원소 개수 
  const count = 6; // 한페이지당 보여줄 개수 
  // 페이지네이션 - 전체 페이지 개수 
  const totalPages = Math.ceil(totalData / count);

  // 필터 -> api 연결되면 바꾸기
  const [filter, setFilter] = useState('createdAt');
  const [filterAsc, setFilterAsc] = useState(true);

  //API로부터 fetch 하는 함수
  const getMeatList = async (offset,) => {
    const json = await (
      await fetch(
        `http://3.38.52.82/meat/get?offset=${offset}&count=${count}&start=${startDate}&end=${endDate}&${filter}=${filterAsc}`
      )
    ).json();
    console.log("fetch done!", json);
    // 전체 데이터 수
    setTotalData(json["DB Total len"]);
    // 데이터
    let data = [];
    json.id_list.map((m) => {
      setMeatList([...meatList, json.meat_dict[m]]);
      data = [...data, json.meat_dict[m]];
    });
    setMeatList(data);
    // 데이터 로드 성공
    setIsLoaded(true);
  };

  //데이터 api 로 부터 fetch
  useEffect(() => {
    getMeatList(currentPage - 1 );
  }, [startDate, endDate, currentPage, filter, filterAsc]);

  return (
    <div style={style.wrapper}>
      <div style={style.listContainer} >
        {
          //meatList.length!==0
          //? (//데이터가 로드된 경우 데이터 목록 반환
          <DataList
            meatList={meatList}
            pageProp={pageType}
            offset={currentPage-1}
            count={count}
            setFilter={setFilter}
            setFilterAsc={setFilterAsc}
          />
          // )
          // : (// 데이터가 로드되지 않은 경우 (데이터가 0인 경우랑 따로 봐야할듯 )로딩중 반환
          //    <Spinner animation="border" />
          // totalData ? page 랑 current page , setcurrent 만 넘겨주면 될듯 
          //  )
        }
      </div>
      <Box sx={style.paginationBar}>
        <PaginationComp totalPages={totalPages} limit={limit} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </Box>
    </div>
  );
}

export default DataListComp;


const style = {
  wrapper : {
    position: "fixed", 
    top: "200px", 
    left: "30px", 
    width: "100%",
  },
  listContainer :{
    textAlign: "center",
    width: "100%",
    padding: "0px 120px",
    paddingBottom: "0",
  },
  paginationBar : {
    display: "flex",
    position: "fixed",
    bottom: "10px",
    marginTop: "40px",
    width: "100%",
    justifyContent: "center",
  },
}