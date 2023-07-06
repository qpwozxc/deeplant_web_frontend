import { useState, useEffect , useRef} from "react"
import styles from "./Home.module.css";
import Base from "../components/Base/BaseCmp";
import Form from 'react-bootstrap/Form';
import Search from "../components/Meat/Search";
import DataList from "../components/DataView/DataList";
import Button from '@mui/material/Button';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import Papa from "papaparse";
import csv from 'csv';

function Home(){
    const [isLoaded, setIsLoaded] = useState(true);
    const [meatList, setMeatList] = useState(["1-2-3-4-5",1,1,1,1,1,1]);
    const [currentPage , setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(78);
    const [currentPN, setCurrentPN] = useState(1);
    const [currentPageArray ,setCurrentPageArray] = useState([]);
    const [totalSlicedPageArray , setTotalSlicedPageArray] = useState([]);
    const [excelFile, setExcelFile] = useState("");
    const fileRef = useRef(null);

    const offset = 0;
    const count = 7;
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
        const reader = new FileReader();
        reader.onload = () => {
            csv.parse(reader.result, (err, data) => {
                console.log(data);
            });
        };

        const res = reader.readAsBinaryString(file);
        console.log('res', res);
        ExcelRenderer(file, (err, resp) => {
            if(err){
              console.log(err);            
            }
            else{
                console.log("cols: ",resp.cols, "rows: ", resp.rows);
              /*this.setState({
                cols: resp.cols,
                rows: resp.rows
              });*/
              
            }
          }); 
    }
    return(
        <div>
            <Base/> 
            <div style={{padding:'0px 100px', paddingBottom:'0'}}>
            <Search />

            </div>
            <div style={{display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
            <Table striped bordered hover style={{width:"80%", padding:'0px 100px', paddingBottom:'0'}}>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>관리번호</th>
                    <th>검토여부</th>
                    <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                {
                isLoaded?
                //데이터가 로드된 경우 데이터 목록 반환 
                meatList.map((m, idx) =>
                    <DataList
                        key={idx}
                        content={m}
                        idx={idx}
                    />
                )
                :
                // 데이터가 로드되지 않은 경우 로딩중 반환 
                <Spinner animation="border" />
                }
                </tbody>
            </Table>
            </div > 
            
            <div className="" style={{display:'flex', justifyContent:'space-between', margin:'0px 40px' }}>
                <div class="mb-3" style={{width:'100%', marginRight:'20px'}}>
                    <label for="formFile" class="form-label">엑셀 파일 업로드</label>
                    <input class="form-control" accept=".csv,.xlsx,.xls" type="file" id="formFile" ref={fileRef} onChange={(e)=>{setExcelFile(e.target.files[0]);}} />
                </div>
                <div style={{display:'flex', alignItems:'center',justifyContent:'center',margin:'35px', marginBottom:'0px'}}>
                    <Button variant="outlined" style={{height:'35px', width:'100px'}} onClick={()=> { handleExcelFile(excelFile); }}>업로드</Button>
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
        </div>
      );
}

export default Home;