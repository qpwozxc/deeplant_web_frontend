import { useState, useEffect, } from "react";
import { Box, } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import DataList from "./DataList";
import Pagination from "./Pagination";
import getMeatList from "../../API/getMeatList";
import { useMeatListFetch } from "../../API/getMeatListSWR";

const DataListComp=({startDate, endDate})=>{
  const [isLoaded, setIsLoaded] = useState(false);
  // 고기 데이터 목록
  const [meatList, setMeatList] = useState([]);

  // 데이터 전체 개수
  const [totalData, setTotalData] = useState(0);
  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);
  // setCurrentPage를 dataList로 전달 
  // 한페이지당 보여줄 개수 
  const count = 6; 

  //데이터 API로 부터 fetch
  const handleMeatListLoad = async () => {
    const json = await getMeatList((currentPage - 1),count, startDate, endDate);  
    // 데이터 가공
    setTotalData(json["DB Total len"]);
    let data = [];
    json.id_list.map((m) => {
      //setMeatList([...meatList, json.meat_dict[m]]);
      data = [...data, json.meat_dict[m]];
    });
    setMeatList(data);
    // 데이터 로드 성공
    setIsLoaded(true);
  }

  useEffect(() => {
    handleMeatListLoad();  
  }, [startDate, endDate, currentPage, ]);

  return (
    <div >
      <div style={style.listContainer} >
        {
          isLoaded
          ? (//데이터가 로드된 경우 데이터 목록 반환
            <DataList
              meatList={meatList}
              pageProp={'list'}
              offset={currentPage-1}
              count={count}
            />
          )
          : (// 데이터가 로드되지 않은 경우 로딩중 반환
              <Spinner animation="border" />
          )
        }
      </div>
      <Box sx={style.paginationBar}>
        <Pagination totalDatas={totalData} count={count} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </Box>
    </div>
  );
}

export default DataListComp;


const style = {
  listContainer :{
    textAlign: "center",
    width: "100%",
    paddingRight:'0px',
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
}