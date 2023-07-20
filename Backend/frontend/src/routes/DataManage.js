import { useState, useEffect, useRef } from "react";
import SearchFilterBar from "../components/Search/SearchFilterBar";
import DataList from "../components/DataView/DataList";
import Pagination from "react-bootstrap/Pagination";
import PieChart from "../components/Charts/PieChart/pieChart";
import StackedBarChart from "../components/Charts/PieChart/StackedBarChart";
import Map from "../components/Charts/choroplethMap/Map";
import Spinner from "react-bootstrap/Spinner";
import { Box, Button,  Divider, useTheme, Tab ,TabContext ,TabList ,TabPanel} from "@mui/material";
import ExcelController from "../components/Meat/excelContr";
function DataManage() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [meatList, setMeatList] = useState(sampleMeatList);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(78);
  const [currentPN, setCurrentPN] = useState(1);
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalSlicedPageArray, setTotalSlicedPageArray] = useState([]);
  
  //목록/ 통계 토글
  const [isList, setList] = useState(true);
// 통계 autocomplete category
  const [meatType, setMeatType] = useState('total');
  // 소 / 돼지 부위 
  const [meatCat, setMeatCat] = useState(null);
  const theme = useTheme();
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

  return (
    <div style={{overflow: 'overlay', width:'100%', marginTop:'140px'}}>
    <Box sx={styles.fixed}>
      <SearchFilterBar/>
      <div style={{display: "flex",justifyContent: "center", alignItems:'center', paddingRight:'85px'}}>
        <ExcelController/>
      </div>
    </Box>

    <Box sx={styles.fixedTab}>
      <div style={{display:'flex'}}>
      <Button  style = {isList? {} : styles.tabBtn} variant="outlined" onClick={()=>{setList(true)}}>목록</Button>
      <Button  style = {isList? styles.tabBtn: {}} variant="outlined" onClick={()=>{setList(false)}}>통계</Button>
      </div>
      <div>
      <Button  style = {isList? styles.tabBtn: {}} variant="outlined" onClick={()=>{setList(false)}}>반려함</Button>
      </div>
      
    </Box >

    {
      isList
      ?
      <div style={{marginTop:'70px'}}>
        <div style={{textAlign: "center", width: "100%", padding: "0px 100px", paddingBottom: "0",}}>
        {isLoaded ? (
          //데이터가 로드된 경우 데이터 목록 반환
          <DataList meatList={meatList} />
        ) : (
          // 데이터가 로드되지 않은 경우 로딩중 반환
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
    :
    <div>
    <Box sx={{display:'flex', width:"100%",height:'100%', marginBottom:'10px', justifyContent:'center', alignItems:'center'}}>   
        <div style={{width:'400px', margin:'0px 20px'}}>
          <PieChart title= {pieChartD1.title}
            chartData={pieChartD1.chartData}
            chartColors={[theme.palette.primary.main, theme.palette.warning.main,]}
            isFilter={pieChartD1.isFilter}/>
        </div>  
        <div style={{width:'350px', margin:'0px 20px'}}>
        <StackedBarChart />    
        </div>
        <div style={{margin:'0px 20px'}}><Map/></div>
    </Box>
    </div>
    }
  
    </div>
  );
}

export default DataManage;

const pieChartD1 = {
  title :'신선육/숙성육',
  chartData : [
    {label:'신선육', value:520},
    {label:'숙성육', value:1520}
  ],
  chartColorsNum:2,
  isFilter:false,
}
const pieChartD2 = {
  title :'소/돼지',
  chartData : [
    {label:'소', value:1520},
    {label:'돼지', value:220}
  ],
  chartColorsNum:2,
  isFilter:true,
}

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
  fixedTab:{
    position: 'fixed', 
    top:'120px',
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
    color:'#9e9e9e',
  }
}

const meatCategory  = [{value:"total", label:"전체"},{value:"cow",label:"소"},{value:"pig",label:"돼지"} ];


const sampleMeatList = [
  {
    id:"000189843795-cattle-chuck-chuck",
    userName:"김수현",
    userType:'1',
    company:'deeplant1',
    meatCreatedAt:"7/13/2023",
    farmAddr :"강원도 원주시 호저면 매호리"
  },
  {
    id:"000189843795-cattle-chuck-chuck",
    userName:"김",
    userType:'1',
    company:'deeplant2',
    meatCreatedAt:"7/13/2023",
    farmAddr :"강원도 철원군"
  },
  {
    id:"000189843795-pig-boston_shoulder-boston_shoulder",
    userName:"나",
    userType:'3',
    company:'deeplant1',
    meatCreatedAt:"7/13/2023",
    farmAddr :"강원도 홍천군"
  },
  {
    id:"000189843795-pig-tenderloin-foreshank",
    userName:"박",
    userType:'2',
    company:'gsUniv',
    meatCreatedAt:"11/13/2021",
    farmAddr :"경기도 김포시"
  },
  {
    id:"000189843795-cattle-sirloin-ribeye_roll",
    userName:"이",
    userType:'3',
    company:'deeplant2',
    meatCreatedAt:"7/14/2022",
    farmAddr :"경기도 안성시"
  },
  {
    id:"000189843795-cattle-striploin-strip_loin",
    userName:"최",
    userType:'1',
    company:'gsUniv',
    meatCreatedAt:"7/14/2023",
    farmAddr :"경기도 용인시 처인구"
  },
  {
    id:"000189843795-cattle-striploin-strip_loin",
    userName:"최",
    userType:'1',
    company:'gsUniv',
    meatCreatedAt:"7/14/2023",
    farmAddr :"경기도 용인시 처인구"
  },
  {
    id:"000189843795-cattle-striploin-strip_loin",
    userName:"최",
    userType:'1',
    company:'gsUniv',
    meatCreatedAt:"7/14/2023",
    farmAddr :"경기도 용인시 처인구"
  },
  {
    id:"000189843795-cattle-striploin-strip_loin",
    userName:"최",
    userType:'1',
    company:'gsUniv',
    meatCreatedAt:"7/14/2023",
    farmAddr :"경기도 용인시 처인구"
  },
];

