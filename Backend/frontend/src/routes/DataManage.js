import { useState, useEffect, useRef } from "react";
import Search from "../components/Meat/Search";
import DataList from "../components/DataView/DataList";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

function DataManage() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [meatList, setMeatList] = useState([
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
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(78);
  const [currentPN, setCurrentPN] = useState(1);
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalSlicedPageArray, setTotalSlicedPageArray] = useState([]);
  const [excelFile, setExcelFile] = useState("");
  const fileRef = useRef(null);

  const offset = 0;
  const count = 6;
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

  //엑셀파일을 JSON 으로 변환
  const handleExcelFile = (file) => {
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const toJson = {};
        const labData = {};
        const tongue = {};
        for (let i = 1; i < 11; i++) {
          labData[resp.rows[0][i]] = resp.rows[1][i];
        }
        for (let i = 11; i < resp.rows[0].length; i++) {
          tongue[resp.rows[0][i]] = resp.rows[1][i];
        }
        toJson[resp.rows[0][0]] = resp.rows[1][0];
        toJson["lab_data"] = labData;
        toJson["tongue"] = tongue;
        /*resp.rows[0].map((key, index)=>{
            index == 0? toJson[key] = resp.rows[1][index]:
            toJson[key] = resp.rows[1][index];
        })*/
        console.log("cols: ", resp.cols, "rows: ", resp.rows);
        console.log('toJson', toJson)
        /*
        fetch(`http://localhost:8080/meat/update`, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Request-Headers": "Content-Type",
            "Access-Control-Request-Method": "POST",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toJson),
        });
        */
      }
    });
  };
  return (
    <>
    <Box sx={{display:'flex'}}>
    <Search />
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop:'70px',
          alignItems:'end',
          paddingBottom:'10px',
        }}
      >
        
        <Box sx={{ display: 'flex', gap: 5, width: "70%", marginTop: "0px" , backgroundColor:'white', paddingRight: "10px", borderRadius:'5px'}}>
          <input class="form-control" accept=".csv,.xlsx,.xls" type="file" id="formFile" ref={fileRef}
            onChange={(e) => {setExcelFile(e.target.files[0]);}} style={{ }}/>

          <Button color="info" startIcon={
              <SvgIcon fontSize="small">
                <ArrowUpOnSquareIcon />
              </SvgIcon>
            } 
            onClick={() => {handleExcelFile(excelFile);}} style={{  width:'auto'}}>
            Import
          </Button>
          <Button
            color="primary"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowDownOnSquareIcon />
              </SvgIcon>
            }
            style={{}}
          >
            Export
          </Button>
          </Box>
        
       
      </div>

    </Box>
      
      <div
        style={{
          textAlign: "center",
          width: "100%",
          padding: "0px 200px",
          paddingBottom: "0",
        }}
      >
        {isLoaded ? (
          //데이터가 로드된 경우 데이터 목록 반환
          <DataList meatList={meatList} />
        ) : (
          // 데이터가 로드되지 않은 경우 로딩중 반환
          <Spinner animation="border" />
        )}
      </div>

      
        <Box sx={{display:'flex', marginTop:'20px'}}>
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
     
    </>
  );
}

export default DataManage;
