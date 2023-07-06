import { useState, useEffect } from "react"
import styles from "./Home.module.css";
import Base from "../components/Base/BaseCmp";
import Form from 'react-bootstrap/Form';
import Search from "../components/Meat/Search";
import DataList from "../components/DataView/DataList";
import Button from '@mui/material/Button';
import { FaChevronLeft,FaChevronRight } from "react-icons/fa6";
import { width } from "@mui/system";
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';

import { DataGrid } from '@mui/x-data-grid';
import Table from 'react-bootstrap/Table';

function Home(){
    const [isLoaded, setIsLoaded] = useState(true);
    const [meatList, setMeatList] = useState(["1-2-3-4-5",1,1,1,1,1,1]);
    const [currentPage , setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(78);
    const [currentPN, setCurrentPN] = useState(1);
    const [currentPageArray ,setCurrentPageArray] = useState([]);
    const [totalSlicedPageArray , setTotalSlicedPageArray] = useState([]);
    
    // 페이지가 5개 미만인 경우 
    // < 1 2 3 >
    // 페이지가 5개 이상인 경우
    // < 1 2 3 4 5 ... >

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
                <div style={{width:'100%', marginRight:'20px'}}>
                    <Form.Group controlId="formFile" className="mb-3" >
                    <Form.Label>엑셀 파일 업로드</Form.Label>
                    <Form.Control type="file" />
                    </Form.Group>
                </div>
                <div style={{display:'flex', alignItems:'center',justifyContent:'center',margin:'35px', marginBottom:'0px'}}>
                    <Button variant="outlined" style={{height:'35px', width:'100px'}}>업로드</Button>
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