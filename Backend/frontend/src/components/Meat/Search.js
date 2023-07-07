import {useState, useEffect} from "react";
import styles from "./Search.module.css";
import {FaMagnifyingGlass} from "react-icons/fa6";
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon , Typography} from '@mui/material';

function Search(){
    const [search, setSearch] = useState("");
    // 날짜기반 검색인지 아닌지 확인 
    const [isDate, setIsDate] = useState(false);
    const [date, setDate] = useState(new Date());
    //select value set
    const [value, setValue] = useState('user_based');
    const [toggle , setToggle] = useState(false);

    const onChange = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }
    

    const handleChange = (event) => {
        setCategoryItem(event.target);
        event.target.value === "date_based" ? setIsDate(true) : setIsDate(false);
        setValue(event.target.value);
           // api 호출 
    };
    const category = [
        {
            name:"사용자 검색",
            value:"user_based"
        },
        {
            name:"날짜 검색",
            value:"date_based"
        }
    ];
    const [categoryItem, setCategoryItem] = useState(category[0]);
    
    function filterCategory (category){
        setCategoryItem(category);
        setToggle(false);
        category.value === "date_based" ? setIsDate(true) : setIsDate(false);
        // api 호출 
    }

    return(
        <div style={{marginTop:'60px', marginBottom:"20px", width:'100%'}} fullWidth>
            <Typography variant="h4">
                Meat Datas
            </Typography>
            <div className={styles.search_input} style={{ width: "100%"}} fullWidth>
            <Card sx={{ p: 2 }} style={{display:'flex',width: "100%"}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} style={{width: "10%"}}>
                    <InputLabel id="demo-simple-select-standard-label">검색</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={handleChange}
                    label="검색 설정"
                    >
                    <MenuItem value="user_based" onClick={()=> filterCategory(category[0])}>
                        사용자 검색
                    </MenuItem>
                    <MenuItem value="date_based" onClick={()=> filterCategory(category[1])}>날짜 검색</MenuItem>
                    </Select>
                </FormControl>
                {isDate ?
                    (<DatePicker className="" style={{padding:"16.5px"}} dateFormat="yyyy년 MM월 dd일" locale={ko} selected={date} onChange={date => setDate(date)} />) 
                : (
                    <OutlinedInput
                    style={{width: "70%", marginLeft:"20px"}}
                    defaultValue=""
                    fullWidth
                    placeholder="사용자명을 입력하세요"
                    startAdornment={(
                        <InputAdornment position="start">
                        <SvgIcon
                            color="action"
                            fontSize="small"
                        >
                            <MagnifyingGlassIcon />
                        </SvgIcon>
                        </InputAdornment>
                    )}
                    sx={{ maxWidth: 500 }}
                    onChange={onChange}
                    />
                    )
                }
                <div style={{width: "10%"}} className={styles.search_btn_wrapper}>
                <button className={styles.search_btn} onClick={()=>{console.log('click button')}}>
                    <FaMagnifyingGlass onClick={()=>{console.log('clicked')}}/>
                    </button>
                </div>
                </Card>
            </div>
        </div>
    );
}

export default Search;
