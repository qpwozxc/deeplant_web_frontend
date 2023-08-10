import { useState, useEffect, useRef } from "react";

import Pagination from "react-bootstrap/Pagination";

function PaginationComp({totalPages, limit,currentPage, setCurrentPage }){
    const [currentPageArray, setCurrentPageArray] = useState([]);
    const [totalSlicedPageArray, setTotalSlicedPageArray] = useState([]);

    //페이지네이션 배열로 나눠서 저장
    const sliceByLimit = (totalPages, limit) => {
        const totalPageArr = Array(totalPages)
        .fill()
        .map((_, i) => i);
        return Array(Math.ceil(totalPages / limit))
        .fill()
        .map((_, i) => totalPageArr.splice(0,limit));
    };


    // 현재 페이지네이션 바 
    useEffect (()=>{
        if (currentPage % limit === 1){
        setCurrentPageArray(totalSlicedPageArray[Math.floor(currentPage/limit)]);
        }else if (currentPage % limit === 0){
        setCurrentPageArray(totalSlicedPageArray[Math.floor(currentPage/limit)-1]);
        }
    },[currentPage, totalSlicedPageArray]);

    // 페이지네이션 배열 설정 (초기 설정)
    useEffect(() => {
        if (totalPages) {  
        setTotalSlicedPageArray(sliceByLimit(totalPages, limit));
        setCurrentPageArray(totalSlicedPageArray[0]);
        }
    }, [totalPages]);

    return(
        <Pagination>
          <Pagination.First onClick={()=>setCurrentPage(1)} disabled = {currentPage === 1}/>
          <Pagination.Prev onClick={()=> setCurrentPage(currentPage- 1)} disabled={currentPage === 1} />
          {currentPageArray
            ? currentPageArray.map((m) => {
                return (
                  <Pagination.Item
                    key={m + 1}
                    onClick={() =>setCurrentPage(m +1)}
                    active={m +1 === currentPage}
                  >
                    {m + 1}
                  </Pagination.Item>
                );
              })
            : null}
          <Pagination.Next  onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={()=>setCurrentPage(totalPages)} disabled={currentPage === totalPages}/>
          
        </Pagination>
    );
}

export default PaginationComp;
