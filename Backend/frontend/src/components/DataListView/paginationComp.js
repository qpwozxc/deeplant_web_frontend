import { useState, useEffect, useRef } from "react";

import Pagination from "react-bootstrap/Pagination";

function PaginationComp({getDataList, setDataList}){
    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(78);
    const [currentPN, setCurrentPN] = useState(1);

    const [currentPageArray, setCurrentPageArray] = useState([]);
    const [totalSlicedPageArray, setTotalSlicedPageArray] = useState([]);
    const offset = 0; // 페이지 인덱스 
    const count = 6; // 한페이지당 보여줄 개수
    const limit = 5;
    const page = 0;
    const totalPages = Math.ceil(totalData / count); // 현재 9개

    //페이지네이션 배열 전체 초기화
    useEffect(() => {
        //getDataList(page);
        setTotalSlicedPageArray(sliceByLimit(totalPages, limit));
        setCurrentPageArray(totalSlicedPageArray[0]);
    }, [totalPages, limit]);

    useEffect(() => {
        setCurrentPageArray(totalSlicedPageArray[0]);
    }, [totalSlicedPageArray]);

    // 페이지별 데이터 불러오기
    const handleCurrentPage = (page) => {
        setCurrentPage(page);
        getDataList(page);
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

    return(
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
    );
}

export default PaginationComp;
