import { useState, useEffect, useSyncExternalStore } from "react"
import {Link as RouterLink} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button,Checkbox , IconButton} from '@mui/material';
import {FaRegTrashAlt} from "react-icons/fa";
import Dot from "../Dot";
import TransitionsModal from "./WarningComp";
import PropTypes from 'prop-types';
function DataList({meatList, pageProp, setChecked, offset, count, }){
    
    // 체크된 아이템 배열 
    const [checkItems, setCheckItems] = useState([]);

    // 체크박스 전체 단일 개체 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {// 체크가 된 경우 
            setCheckItems([...checkItems, id]);
        } else {// 체크가 안 된 경우 
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            const idArray = [];
            // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서, 전체 체크 박스 체크
            meatList.forEach((el) => idArray.push(el.id));
            setCheckItems(idArray);
        }

        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckItems([]);
        }
    };


    //부모로 삭제할 데이터 전달  //setElete로 삭제할 고기 아이디 전달함 
    useEffect(()=>{
        if (typeof setChecked === 'function'){
            setChecked(checkItems);
        }
    }, [checkItems]);


    //리스트에 있는 삭제 버튼(전체 선택) 클릭 시
    const [isDelClick, setIsDelClick] = useState(false);
    const [delId, setDelId] = useState(null);

    const handleDelete = (id) =>{
        setIsDelClick(true);
        setDelId(id);
    }
  
   
    // 테이블 헤더
    function OrderTableHead({ order, orderBy }) {
        return (
        <TableHead>
            <TableRow>
                {// 반려함 탭이나 예측 페이지인 경우 전체 선택 테이블 헤더 추가
                (pageProp === 'reject' || pageProp === 'pa')
                ?<TableCell key={"checkbox"} align="center" padding="none">
                    <Checkbox 
                    checked={
                    checkItems.length === meatList.length
                    ? true
                    : false} 
                    label="전체선택" 
                    labelPlacement="top" 
                    onChange={(e)=>handleAllCheck(e.target.checked)} 
                    inputProps={{ 'aria-label': 'controlled' }}/>
                </TableCell>
                :<></>}
                {headCells.map((headCell) => (
                    <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    padding={headCell.disablePadding ? 'none'  :'none'} // normal
                    sortDirection={orderBy === headCell.id ? order : false}   
                    >
                    <div key={headCell.id} style={{display:'flex',alignItems:'center',padding:'6px', fontWeight:'600', color:'#90a4ae'}} >
                        {headCell.label}           
                    </div>
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
        <Box style={{backgroundColor:"white", borderRadius:'5px', height:'100%'}}>
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
            height:'100%',
            }}
        >
            <Table
            aria-labelledby="tableTitle"
            sx={{
                '& .MuiTableCell-root:first-of-type': { pl: 2 },
                '& .MuiTableCell-root:last-of-type': { pr: 3 }
            }}
            >
            <OrderTableHead />
          
            <TableBody>
                {
                meatList.map((content, index) => {
                const isItemSelected = isSelected(content);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                    <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    >
                        {//반려함이나 예측 페이지인 경우 삭제 체크박스 추가
                        (pageProp === 'reject' || pageProp === 'pa')
                        &&
                        <TableCell>
                            <Checkbox 
                             value={content.id}
                             key={content.id} 
                             checked={checkItems.includes(content.id) ? true : false} 
                             onChange={(e)=> handleSingleCheck(e.target.checked, content.id)} 
                             inputProps={{ 'aria-label': 'controlled' }}/>
                        </TableCell>
                        }
                        <TableCell component="th" id={labelId} scope="row" align="center" style={style.tableCell}> 
                            {(index+1)+(offset*count)} 
                        </TableCell>
                        <TableCell align="center" style={style.tableCell}>
                            <Link 
                                color="#000000" 
                                component={RouterLink}
                                style={{textDecorationLine:'none',}} 
                                to= {pageProp === 'pa' 
                                    ?{pathname:`/dataPA/${content.id}`} 
                                    : content.statusType === "승인" ? {pathname : `/dataView/${content.id}`}
                                                                    :{pathname : `/DataConfirm/${content.id}`}}>
                                {content.id}
                            </Link>
                        </TableCell>
                        <TableCell align="center" style={style.tableCell}> 
                            {content.farmAddr? content.farmAddr : '-'} 
                        </TableCell>
                        <TableCell align="center" style={style.tableCell}> 
                            {content.name} 
                        </TableCell>
                        <TableCell align="center" style={style.tableCell}> {content.type } </TableCell>
                        <TableCell align="center" style={style.tableCell}> {content.company} </TableCell>
                        <TableCell align="center" style={style.tableCell}> {content.createdAt.replace('T',' ')} </TableCell>
                        <TableCell align="center" style={style.tableCell}>
                            {content.statusType === '반려' && <OrderStatus status={0} />}
                            {content.statusType === '승인' && <OrderStatus status={1} />}
                            {content.statusType === '대기중' && <OrderStatus status={2} />}
                        </TableCell>
                        <TableCell align="center" style={style.tableCell }>
                            <IconButton aria-label="delete" color="#90a4ae" onClick={()=>handleDelete(content.id)} > 
                                <FaRegTrashAlt/> 
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

const style={
    tableCell : {
        fontSize:'17px',
        fontWeight:'600',
        padding:'5px',
    }
}

// 테이블 헤더 CELL
const headCells = [
    {
      id: 'trackingNo',
      align: 'center',
      disablePadding: false,
      label: 'No.'
    },
    {
      id: 'id',
      align: 'center',
      disablePadding: true,
      label: '관리번호'
    },
    {
        id: 'farmAddr',
        align: 'center',
        disablePadding: true,
        label: '농장주소'
    },
    {
        id: 'userName',
        align: 'center',
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
   /* {
        id: 'button',
        align: 'center',
        disablePadding: false,
    
        label: '검토'
      },*/
    {
      id: 'accept',
      align: 'center',
      disablePadding: false,
      label: '승인 여부'
    },
    {
      id: 'delete',
      align: 'center',
      disablePadding: false,
      label: '삭제'
    }
];

//테이블 상태 컴포넌트
const OrderStatus = ({ status }) => {
    let color;
    let title;
    let backgroundColor;

    switch (status) {
    case 0:
        backgroundColor = '#ffcdd2';
        color = '#e53935';
        title = '반려';
        break;
    case 1:
        backgroundColor = '#b9f6ca';
        color = '#00e676';
        title = '승인';
        break;
    case 2:
        backgroundColor = '#bcaaa4';
        color = '#5d4037';
        title = '대기';
        break;
    default:
        color = 'primary';
        title = 'None';
    }

    return (
    <Stack direction="row" spacing={1} alignItems="center">
        <Button style={{backgroundColor:backgroundColor, height:'30px', width:'35px', borderRadius:'10px'}}>
            <span style={{color:color,fontSize:'15px',fontWeight:'600',padding:'5px',}}>
                {title}
            </span>
        </Button>
    </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};