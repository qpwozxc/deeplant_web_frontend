import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import {useState, useEffect, useRef} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
}));

function SearchFilter(){
    const [anchorEl, setAnchorEl] = useState(null);
    //검색필터
    const date = ['생성기간'];
    const pigGrade = ['1+', '1', '2'];
    const filterDom = useRef();
    const handleClick = (event) => {
        let popHolder = event.currentTarget.parentElement;

        setAnchorEl(popHolder);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //검색 필터 체크박스 확인 
    //데이터 목록이랑 어떻게 연결? 퀴리문 저장 
    /*
     * 
     *  부모 Component에서 useState를 통해 전달받을 데이터를 저장할 변수를 선언하고 props로 setter를 전달한다.
자식 Component에서는 부모로부터 전달받은 setter를 통해 전달할 데이터를 저장하면 
     */
    const [checked, setChecked] = useState([0]);
    const [clickedCheckList, setClickedCheckList] = useState([]);
    //const {search} = useLocation();
    const navigate = useNavigate();
    const handleCheckList = (e,content, idx,type) =>{
        e.target.checked
        ? setClickedCheckList([
            ...clickedCheckList,
            {id: idx, content, type:type},
        ])
        : setClickedCheckList(
            clickedCheckList.filter(list => list.content !== content)
        );
    }

    //쿼리문 만들기
    const makeQueryString = () =>{
        const queryString = clickedCheckList
            .map(({id, content, type})=>{
            return `${type}=${content}`;
            })
            .map((item,idx)=>{
                return idx === 0 ? item : '&' + item;
            })
            .join()
            console.log(queryString);
            //navigate(`?${queryString}`)
    }
/**
 * <Button aria-describedby={id} variant="contained" onClick={}>
        Open Popover
      </Button>
 * 
 */
    return(
       
     
        <Box sx={{ flexGrow: 1 , width:'1000px'}}>
        <Grid container spacing={2} columns={14}>
            <Grid xs={8} ref={filterDom} style={{display:'flex'}}>
            {FILTER_CATEGORYS.map(({type,title,contents}, idx)=>{
                return(
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <div style={{width:'auto'}}>{title}</div>
                    {console.log(title, '-',contents)}
                    {
                    contents.map((c, idx)=>{
                        const labelId = `checkbox-list-${type}-${idx}`;
                        return(
                        <ListItem key={idx} disablePadding>
                            <ListItemButton role={undefined} onClick={(e) =>{ handleCheckList(e,c, idx, type)}} dense>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={checked.indexOf(1) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${c}`} />
                            </ListItemButton>
                        </ListItem>
                        );
                    })}
                </List>
               
                );
                } )}
            </Grid>
          


          <Grid xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{  mx: "auto" }}>
                <DatePicker label="날짜를 선택하세요" slotProps={{ textField: { size: 'small' } }} format={"YYYY-MM-DD"}/>           
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{  mx: "auto" }}>
                <DatePicker label="날짜를 선택하세요" slotProps={{ textField: { size: 'small' } }} format={"YYYY-MM-DD"}/>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          
        </Grid>
        </Box>
        
    
    );
}

export default SearchFilter;

const FILTER_CATEGORYS = [
    {
        type : 'speices',
        title :'육종',
        contents : [
            '소',
            '돼지',
        ],
    },
    {
        type : 'grade',
        title : '등급',/**일단 소로 저장해 놓고 나중에 contents를 바꾸는 걸로 */
        contents : [
            '1++', 
            '1+', 
            '1',
            '2',
            '3',
        ],
    },
    {
        type : 'gender',
        title :'성별',
        contents : [
            '암',
            '수',
            '거세',
        ],
    },
    {
        type : 'speices',
        title :'사용자등급',
        contents : [
            '일반 사용자', 
            '연구자', 
            '관리자',
        ],
    },
]

/***
 * 
 * <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical:  'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
      >
      </Popover>
 */

/**
 * 
 *   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {species.map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                <ListItem
                    key={value}
                    disablePadding
                >
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                    <ListItemIcon>
                        <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                </ListItem>
                );
            })
            
            }
            </List>
 */