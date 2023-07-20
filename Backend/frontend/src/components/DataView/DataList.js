import { useState, useEffect } from "react"
import {Link as RouterLink} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Dot from "../Dot";
import PropTypes from 'prop-types';
function DataList({meatList}){
    const [isReviewed, setIsReviewed] = useState(false);
    const id = 1;
    // ==============================|| ORDER TABLE - HEADER ||============================== //

    function OrderTableHead({ order, orderBy }) {
        return (
        <TableHead>
            <TableRow>
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
 
    // ==============================|| ORDER TABLE ||============================== //
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
                    
                    <TableCell component="th" id={labelId} scope="row" align="left" style={{padding:"5px"}}> {index+1} </TableCell>
                    <TableCell align="left" style={{padding:"5px"}}>
                    <Link color="#000000" component={RouterLink} to={{pathname : `/dataView/${content}`}}>
                        {content.id}
                    </Link>
                    </TableCell>
                    <TableCell>
                        {content.farmAddr}
                    </TableCell>
                    <TableCell>
                        {content.userName }
                    </TableCell>
                    <TableCell>
                        {content.userType }
                    </TableCell>
                    <TableCell>
                        {content.company}
                    </TableCell>
                    <TableCell>
                        {content.meatCreatedAt}
                    </TableCell>
                    <TableCell align="left" style={{padding:"5px"}}>
                        <OrderStatus status={(index===3||index===5)?2: (index===0)?0:1} />
                    </TableCell>
                    <TableCell align="right" style={{padding:"5px"}}>
                        <IconButton aria-label="delete" color="primary">
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                    
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
  
}


export default DataList;

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
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
        align: 'left',
        disablePadding: true,
        label: '생성 날짜'
    },
    {
      id: 'carbs',
      align: 'left',
      disablePadding: false,
  
      label: '승인 여부'
    },
    {
      id: 'protein',
      align: 'right',
      disablePadding: false,
      label: '삭제'
    }
  ];

    // ==============================|| ORDER TABLE - STATUS ||============================== //

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