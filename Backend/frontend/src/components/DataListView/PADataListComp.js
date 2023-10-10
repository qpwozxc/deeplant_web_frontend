import { useState, useEffect, useRef } from "react";
import { Box,Button } from "@mui/material";
import DataList from "./DataList";
import PaginationComp from "./paginationComp";
import PaginationV2 from "./PaginationV2";
import Spinner from "react-bootstrap/Spinner";
//import HandlePredictClick from "../API/predictPOST";
import GetSingleData from "../../API/detailMeatGet"
//import useGetDetail from "../API/useGetDetail";
// 임시로 local data 사용 
import listData from "../../Data/pagination.json";

const apiIP = '3.38.52.82';

const PADataListComp=({startDate, endDate})=>{
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
  // ***** 우선 전체 fetch 했는데 나중에 예측된 것 , 안된것 토글 만들기 ****
  const getMeatList = async (offset,) => {
     const json = await (
      await fetch(
        `http://${apiIP}/meat/get?offset=${offset}&count=${count}&start=${startDate}&end=${endDate}&${filter}=${filterAsc}`
      )
    ).json();

    // 임시로 json 파일을 땡겨옴 ====api 연결로 수정 
    //json = listData;

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


  // 예측 POST 함수
  const [predictItems, setPredictItems] = useState([]);
  const [isPredicted , setIsPredicted] = useState(false);
  const [data, setData] = useState();
  const [datas, setDatas] = useState([]);
  // 처음 한번만 받아오는 게 나을 듯 
  useEffect(()=>{
    for (let i = 0; i < meatList.length; i++){
        GetSingleData(meatList[i].id, setData);
        if (data){
            setDatas([...datas, data['butcheryYmd']]);
            console.log(meatList[i].id,data['butcheryYmd'] )
        }
            
    }
  },[meatList])
  console.log(currentPage,datas);

  const handlePredict=()=>{
   //console.log(singleData)
    //console.log(predictItems);
    /*for (let i = 0; i < predictItems.length; i++){
        // api -> 함수 컴포넌트 화 ... -> 호출
        const data = GetSingleData(predictItems[i], setSingleData);
        //const datas = useGetDetail(predictItems[i]);
        
        if (singleData)
            console.log(i, singleData['butcheryYmd'])
            //HandlePredictClick(singleData['butcheryYmd']);
    }*/
    // 예측 후 
    setIsPredicted(true);
  }

  return (
    <div>
      <div style={style.listContainer} >
        {
          //meatList.length!==0
          //? (//데이터가 로드된 경우 데이터 목록 반환
          <DataList
            meatList={meatList}
            pageProp={'pa'}
            setChecked = {setPredictItems}
            offset={currentPage-1}
            count={count}
            setFilter={setFilter}
            setFilterAsc={setFilterAsc}
          />
          // )
          // : (// 데이터가 로드되지 않은 경우 (데이터가 0인 경우랑 따로 봐야할듯 )로딩중 반환
          //    <Spinner animation="border" />
          //  )
        }
      </div>
      
      <Box sx={style.paginationBar}>
        <PaginationV2 totalPages={totalPages} totalDatas={totalData} count={count} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </Box>
    </div>
  );
}

export default PADataListComp;


const style = {
  listContainer :{
    textAlign: "center",
    width: "100%",
    paddingRight:'0px',
    //padding: "0px 120px",
    paddingBottom: "0",
    height:'500px'
  },
  paginationBar : {
    display: "flex",
    position: "fixed",
    bottom: "10px",
    marginTop: "40px",
    width: "100%",
    justifyContent: "center",
  },
  PABtnContainer : {
    display:'flex', 
    margin:'20px 0', 
    padding:'0px 100px',  
    justifyContent:'start',
    position:'fixed',
    bottom:'10px',
    left:'50px'
  }
}