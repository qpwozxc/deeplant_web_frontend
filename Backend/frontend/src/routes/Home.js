import { useState, useEffect , useRef} from "react"
import styles from "./Home.module.css";
import Base from "../components/Base/BaseCmp";
import Form from 'react-bootstrap/Form';
import Search from "../components/Meat/Search";
import DataList from "../components/DataView/DataList";
//import Button from '@mui/material/Button';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import excelController from "../components/DataView/excelController";
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import Papa from "papaparse";
import Sidebar from "../components/Base/Sidebar";
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';

function Home(){
    const [isLoaded, setIsLoaded] = useState(true);
    const [meatList, setMeatList] = useState(["1-2-3-4-5","000189843795-cattle-chuck-chuck","000189843795-pig-boston_shoulder-boston_shoulder","000189843795-pig-tenderloin-foreshank","000189843795-cattle-sirloin-ribeye_roll
    ","000189843795-cattle-striploin-strip_loin"]);
    const [currentPage , setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(78);
    const [currentPN, setCurrentPN] = useState(1);
    const [currentPageArray ,setCurrentPageArray] = useState([]);
    const [totalSlicedPageArray , setTotalSlicedPageArray] = useState([]);
    const [excelFile, setExcelFile] = useState("");
    const fileRef = useRef(null);

    const offset = 0;
    const count = 6;
    const limit = 5;
    const page = 0;
    const totalPages = Math.ceil(totalData/count); // 현재 9개 
    
    //페이지 별 데이터를 count 개수만큼 받아서 meatList에 저장 
    const getMeatList = async(offset) => {
        const response = await fetch(
            `http://localhost:8080/meat?offset=${offset}&count=${count}`
        );
        console.log('response')
        console.log(response);
        const json = await(
            await fetch(
                `http://localhost:8080/meat?offset=${offset}&count=${count}`
            )
        ).json();
        console.log('data:');
       
        console.log(json);
        //setMeatList(json);
        //setIsLoaded(true);
    }

    // 페이지별 데이터 불러오기 
    const handleCurrentPage = (page) =>{
        setCurrentPage(page);
        getMeatList(page);
    }

    //페이지네이션 배열로 나눠서 저장
    const sliceByLimit = (totalPages, limit)=>{
        const totalPageArr = Array(totalPages)
        .fill()
        .map((_, i)=> (i+1));
        console.log('total page', totalPageArr);
        return Array(Math.ceil(totalPages/limit))
        .fill()
        .map((_, i)=>
           totalPageArr.slice(i * limit, (i+1) * limit)
        );
    }

    //페이지네이션 배열 전체 초기화
    useEffect(()=>{
        //getMeatList(page);
        setTotalSlicedPageArray(sliceByLimit(totalPages, limit));
        console.log("total page-array:", totalSlicedPageArray);
        setCurrentPageArray(totalSlicedPageArray[0]);
        
    },[totalPages, limit]);
    useEffect(() => {
        setCurrentPageArray(totalSlicedPageArray[0]);
        console.log("late total page-array:", totalSlicedPageArray);
    }, [totalSlicedPageArray]);
      
    const handleExcelFile = (file) => {
        console.log("file path", file);
        /*const csvToJson = Papa.parse(file, {
            header: true,
            encoding: 'EUC-KR',
            complete: (results) =>{
              console.log("Finished:", results.data);
            }}
          )*/
        /*const reader = new FileReader();
        reader.onload = () => {
            csv.parse(reader.result, (err, data) => {
                console.log(data);
            });
        };
                const res = reader.readAsBinaryString(file);
        console.log('res', res);*/
        ExcelRenderer(file, (err, resp) => {
            if(err){
              console.log(err);            
            }
            else{
                const toJson = {};
                const labData = {};
                const tongue = {};
                for (let i = 1; i < 11; i++){
                    labData[resp.rows[0][i]] = resp.rows[1][i];
                }
                for (let i = 11; i < resp.rows[0].length; i++){
                    tongue[resp.rows[0][i]] = resp.rows[1][i];
                }
                toJson[resp.rows[0][0]] = resp.rows[1][0];
                toJson['lab_data'] = labData;
                toJson['tongue'] = tongue;
                /*resp.rows[0].map((key, index)=>{
                    index == 0? toJson[key] = resp.rows[1][index]:
                    toJson[key] = resp.rows[1][index];
                })*/
                console.log("jsons:",toJson);
                console.log("cols: ",resp.cols, "rows: ", resp.rows);

              fetch(`http://localhost:8080/meat/update`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Request-Headers': 'Content-Type',
                    'Access-Control-Request-Method':'POST',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(toJson),
                })
              
            }
          }); 
    }
    return(
        <Box sx={{ display: 'flex'}}>
            <Sidebar/>
            <Box
            component="main"
            sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            }}
            >
            <Search />
            <div style={{textAlign:'center',width:"100%", padding:'0px 200px', paddingBottom:'0'}}>
            {
                isLoaded?
                //데이터가 로드된 경우 데이터 목록 반환 
                <DataList meatList={meatList} />
                :
                // 데이터가 로드되지 않은 경우 로딩중 반환 
                <Spinner animation="border" />
            }
            </div>
           
            
            
            <div className="" style={{display:'flex', justifyContent:'center', margin:'0px 40px' }}>
                <div class="mb-3" style={{display:'flex',width:'70%', marginTop:"40px"}}>
                    
                    <input class="form-control" accept=".csv,.xlsx,.xls" type="file" id="formFile" ref={fileRef} onChange={(e)=>{setExcelFile(e.target.files[0]);}}
                    style={{marginRight:'20px'}}
                    />
             
                    <Button
                    color="inherit"
                    startIcon={(
                        <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                        </SvgIcon>
                    )}
                    onClick={()=> { handleExcelFile(excelFile); }}
                    style={{ margin:'0px 10px'}}
                    >
                    Import
                    </Button>
                    <Button
                    color="inherit"
                    startIcon={(
                        <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                        </SvgIcon>
                    )}
                    style={{ margin:'0px 10px'}}
                    >
                    Export
                    </Button>
                </div>
                
            </div>

            <div className="pagination-bar" style={{display:'flex' ,width:'100%',justifyContent:'center'}}>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev onClick={()=>{
                    console.log('current pagination', currentPN);
                    currentPN > 0?
                    setCurrentPN(currentPN-1):
                    setCurrentPN(currentPN);
                    console.log('after current pagination', currentPN);
                    setCurrentPageArray(totalSlicedPageArray[currentPN]);
                }} />
                {
                    currentPageArray?
                    currentPageArray.map((m, idx)=>{
                        return (
                            <Pagination.Item key={idx} onClick={()=>{
                                //페이지 api 불러오기 
                                setCurrentPage(m);
                            }}>{m}</Pagination.Item>
                        )
                    }):
                    null
                }
                <Pagination.Next  onClick={()=>{
                    (currentPN < totalSlicedPageArray.length-1 )?
                    setCurrentPN(currentPN+1)
                    : setCurrentPN(currentPN);
                    console.log('current pagination', currentPN);
                    setCurrentPageArray(totalSlicedPageArray[currentPN]);
                }} />
                <Pagination.Last disabled/>
            </Pagination>
                
            </div>
            </Box>
        </Box>
      );
}

export default Home;