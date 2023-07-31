import { useState, useEffect, useSyncExternalStore } from "react"
import {Link as RouterLink} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button,Checkbox } from '@mui/material';
import Dot from "../Dot";
import TransitionsModal from "./WarningComp";
import PropTypes from 'prop-types';
function DataList({meatList, pageProp, setDelete, offset, count}){

    //console.log('offset and count',offset,count);
    // 반려함 탭인지 목록 탭인지 예측 탭인지 확인 
    const [page, setPage] = useState('list');
    useEffect(()=>{
        setPage(pageProp);
    }, [pageProp])

    const id = 1;
    // 삭제 체크박스
    //checkboxItems에 체크박스 추가 
    let checkboxes = {};
    meatList.map((content)=>{   
        checkboxes = {...checkboxes, [content.id] : false};
    });
    const [checkboxItems, setCheckboxItems] = useState(checkboxes);
    const [selectAll , setSelectAll] = useState(false);

    // 전체 선택을 누를 경우
    const handleSelectAll=(e)=>{
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        // 전체 체크박스의 체크 상태 한가지로 업데이트 
        setCheckboxItems(
            Object.keys(checkboxItems).reduce((acc, checkbox)=>{
                acc[checkbox] = isChecked;
                return acc;
            },{})
        );
        
    }

    //한개 선택을 누를 경우
    const handleCheckBoxChange = (event) => {
        setCheckboxItems({...checkboxItems, [event.target.value]:event.target.checked,});
    };
     // 전체가 선택/해제되었을 경우 select all 체크박스 업데이트
    useEffect(()=>{
        const allChecked = Object.values(checkboxItems).every((value)=> value);
        setSelectAll(allChecked);
    },[checkboxItems]);

    //부모로 삭제할 데이터 전달
    useEffect(()=>{
        let checkedList = [];
        Object.entries(checkboxItems).map((c) => {
            //return console.log(entrie[0]);
            const id = c[0];
            const checked = c[1];
            checked? checkedList = ([...checkedList, c[0]]):checkedList = ([...checkedList])
        })
        if (typeof setDelete === 'function'){
            console.log('fuction')
            setDelete(checkedList);

        }
    }, [checkboxItems])

    //리스트에 있는 삭제 버튼 클릭 시
    const [isDelClick, setIsDelClick] = useState(false);
    const [delId, setDelId] = useState(null);
    const handleDelete = (id) =>{
        // 경고
        
        setIsDelClick(true);
        console.log("iscliked", isDelClick);
        setDelId(id);
    }

  
    // 테이블 헤더
    function OrderTableHead({ order, orderBy }) {
        return (
        <TableHead>
            <TableRow>
                {// 반려함 탭이나 예측 페이지인 경우 전체 선택 테이블 헤더 추가
                page === 'reject' || page === 'pa'
                ?<TableCell key={"checkbox"} align="center" padding="normal">
                    <Checkbox checked={selectAll} label="전체선택" labelPlacement="top" onChange={(e)=>handleSelectAll(e)} inputProps={{ 'aria-label': 'controlled' }}/>
                </TableCell>
                :<></>}
                {headCells.map((headCell) => (
                    <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    >
                    {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
        );
    }
    
    OrderTableHead.propTypes = {
        order: PropTypes.string,
        orderBy: PropTypes.string
    };
 
    // 테이블 바디 
    // 오름차순 내림차순 정렬
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
    
    return (
        <Box style={{backgroundColor:"white", borderRadius:'5px'}}>
        <TableContainer
            sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' },
            padding:'10px',
            boxShadow:1,
            borderRadius:'5px',
            }}
        >
            <Table
            aria-labelledby="tableTitle"
            sx={{
                '& .MuiTableCell-root:first-of-type': {
                pl: 2
                },
                '& .MuiTableCell-root:last-of-type': {
                pr: 3
                }
            }}
            >
            <OrderTableHead />
          
            <TableBody>
                {meatList.map((content, index) => {
                const isItemSelected = isSelected(content);
                const labelId = `enhanced-table-checkbox-${index}`;
                
                
                const checkboxKey = content.id;
                
                
                return (
                    <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } , height:'70px'}}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    >
                    {//반려함인 경우 삭제 체크박스 추가
                    page === 'reject'
                    ?<TableCell><Checkbox value={content.id} checked={checkboxItems[checkboxKey]} onChange={(e)=>handleCheckBoxChange(e)} inputProps={{ 'aria-label': 'controlled' }}  /></TableCell>
                    : <></>
                    }
                    <TableCell component="th" id={labelId} scope="row" align="left" style={{padding:"5px"}}> {(index+1)+(offset*count)} </TableCell>
                    <TableCell align="left" style={{padding:"5px"}}>
                    <Link color="#000000" component={RouterLink} to={{pathname : `/dataView/${content.id}`}}>
                        {content.id}
                    </Link>
                    </TableCell>
                    <TableCell>
                        {content.farmAddr}
                    </TableCell>
                    <TableCell>
                        {content.name}
                    </TableCell>
                    <TableCell>
                        {content.type }
                    </TableCell>
                    <TableCell>
                        {content.company}
                    </TableCell>
                    <TableCell>
                        {content.createdAt}
                    </TableCell>
                    <TableCell align="left" style={{padding:"5px"}}>
                        {content.statusType === '반려' ?<OrderStatus status={0} />: <></> }
                        {content.statusType === '승인' ?<OrderStatus status={1} />: <></> }
                        {content.statusType === '대기중' ?<OrderStatus status={2} />: <></> }
                    </TableCell>
                    {
                    content.statusType === "승인"
                    ?<TableCell></TableCell>
                    :<TableCell>
                        <Link color="#000000" component={RouterLink} to={{pathname : `/DataConfirm/${content.id}`}}>
                            <Button>검토</Button>
                        </Link>
                    </TableCell>
                    }
                    
                    <TableCell align="right" style={{padding:"5px"}}>
                        <IconButton aria-label="delete" color="primary" onClick={()=>handleDelete(content.id)} >
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                    
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        {
            isDelClick
            ?<TransitionsModal id={delId} setIsDelClick={setIsDelClick}/>
            :<></>
        }
        </Box>
    );
  
}


export default DataList;

// 테이블 헤더 CELL
const headCells = [
    {
      id: 'trackingNo',
      align: 'left',
      disablePadding: false,
      label: 'No.'
    },
    {
      id: 'id',
      align: 'left',
      disablePadding: true,
      label: '관리번호'
    },
    {
        id: 'farmAddr',
        align: 'left',
        disablePadding: true,
        label: '농장주소'
    },
    {
        id: 'userName',
        align: 'left',
        disablePadding: true,
        label: '등록인'
    },
    {
        id: 'userType',
        align: 'center',
        disablePadding: true,
        label: '등록인 타입'
    },
    {
        id: 'company',
        align: 'center',
        disablePadding: true,
        label: '소속'
    },
    {
        id: 'createdAt',
        align: 'center',
        disablePadding: true,
        label: '생성 날짜'
    },
    {
      id: 'accept',
      align: 'center',
      disablePadding: false,
  
      label: '승인 여부'
    },
    {
        id: 'button',
        align: 'center',
        disablePadding: false,
    
        label: '검토'
      },
    {
      id: 'protein',
      align: 'right',
      disablePadding: false,
      label: '삭제'
    }
];

//테이블 상태 컴포넌트
const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
    case 0:
        color = 'error';
        title = '반려';
        break;
    case 1:
        color = 'success';
        title = '승인';
        break;
    case 2:
        color = 'secondary';
        title = '대기';
        break;
    default:
        color = 'primary';
        title = 'None';
    }

    return (
    <Stack direction="row" spacing={1} alignItems="center">
        <Dot color={color} />
        <Typography>{title}</Typography>
    </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};