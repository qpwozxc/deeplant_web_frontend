import {useState, useEffect} from "react";
import styles from "./Search.module.css";
import {FaMagnifyingGlass} from "react-icons/fa6";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {  Card ,IconButton,TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  const [search, setSearch] = useState("");
  // 날짜기반 검색인지 아닌지 확인
  const [isDate, setIsDate] = useState(false);
  const [date, setDate] = useState(new Date());
  //select value set
  const [value, setValue] = useState("user_based");
  const [toggle, setToggle] = useState(false);

  const onChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
        marginTop:'70px',
        width: "500px",
        height: "80px",
      }}
    >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="sm" >
       
        <Select value={value} onChange={handleChange} label="검색 설정">
          <MenuItem
            value="user_based"
            onClick={() => filterCategory(category[0])}
          >
            사용자 검색
          </MenuItem>
          <MenuItem
            value="date_based"
            onClick={() => filterCategory(category[1])}
          >
            날짜 검색
          </MenuItem>
        </Select>
      </FormControl>
      {isDate ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ mx: "auto" }}>
            <DatePicker label="날짜를 선택하세요" slotProps={{ textField: { size: 'small' } }} />
          </DemoContainer>
        </LocalizationProvider>
      ) : (
        <TextField
          sx={{ mx: "auto" }}
          variant="outlined"
          label="사용자명을 입력하세요"
          placeholder="사용자명을 입력하세요"
          onChange={onChange}
          size="small"
        />
      )}
      <IconButton>
        <SearchIcon color="primary" />
      </IconButton>
    </Card>
  );
}

export default Search;
