import {useState, useEffect} from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {  Card ,IconButton,TextField, MenuItem ,FormControl} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { IoFilter } from "react-icons/io5";
import TransitionsModal from "./Modal";

function Search() {
  const [search, setSearch] = useState("");
  // 날짜기반 검색인지 아닌지 확인
  const [isDate, setIsDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState("user_based");
  const [toggle, setToggle] = useState(false);

  //일반 검색인지 필터 검색인지 구분
  const [isFilter , setIsFilter] = useState(false);


  const onChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    //검색기능 filter함수 이용 
  };

  const handleChange = (event) => {
    setCategoryItem(event.target);
    event.target.value === "date_based" ? setIsDate(true) : setIsDate(false);
    setValue(event.target.value);
    // api 호출
  };
  const category = [
    {
      name: "사용자 검색",
      value: "user_based",
    },
    {
      name: "날짜 검색",
      value: "date_based",
    },
  ];
  const [categoryItem, setCategoryItem] = useState(category[0]);

  function filterCategory(category) {
    setCategoryItem(category);
    setToggle(false);
    category.value === "date_based" ? setIsDate(true) : setIsDate(false);
    // api 호출
  }

  return (
    <Card
      style={{
        display: "grid",//"flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
        marginTop:'70px',
        //width: "string",
        gap: '10px',
        gridTemplateColumns: 'minmax(400px, max-content) 1fr',
        width:'fit-content',
        height: "80px",
        borderRadius:'10px'
      }}
    >
      {
        isFilter?
        
        <TransitionsModal/>
       
        :
        <div style={{display:'flex', width:'auto'}}>


          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width:'auto' }} size="sm" >
          <Select value={value} onChange={handleChange} label="검색 설정">
            <MenuItem
              value="user_based"
              onClick={() => filterCategory(category[0])}
            >
              사용자
            </MenuItem>
            <MenuItem
              value="date_based"
              onClick={() => filterCategory(category[1])}
            >
              날짜
            </MenuItem>
          </Select>
          </FormControl>
          {isDate ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{  mx: "auto" }}>
                <div style={{display:'flex',}}>
                <DatePicker label="날짜를 선택하세요" slotProps={{ textField: { size: 'small' } }} format={"YYYY-MM-DD"}/>
                ~
                <DatePicker label="날짜를 선택하세요" slotProps={{ textField: { size: 'small' } }}  format={"YYYY-MM-DD"}/>
                </div>
                
              </DemoContainer>
            </LocalizationProvider>
          ) : (
            <TextField
              sx={{ mx: "auto" }}
              variant="outlined"
              label="사용자명을 입력하세요"
              placeholder="검색"
              onChange={onChange}
              size="small"
            />
          )}


      </div>  
      }
      <div style={{display:'flex',width:' fit-content'}}>
      <IconButton>
        <SearchIcon color="primary" onClick={()=>{setIsFilter(false)}} />
      </IconButton>
      <IconButton>
        <IoFilter onClick={()=>{setIsFilter(true)}} />
      </IconButton>
      </div>
      
    </Card>
    
  );
}

export default Search;
