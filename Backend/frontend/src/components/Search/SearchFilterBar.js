import { useEffect, useState , useRef} from "react";
import {Button, Stack, Card,} from '@mui/material';
import {FaArrowRotateLeft}  from "react-icons/fa6";
import {FaSearch}  from "react-icons/fa";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
const TIME_ZONE = 9 * 60 * 60 * 1000;

function SearchFilterBar({setStartDate, setEndDate}){
    const [isDur, setIsDur] = useState(true);
    const [clicked, setClicked] = useState(false);
    //조회 기간 (탭으로 클릭 시)
    const [duration, setDuration] = useState('week');
    // 조회 기간 (직접 입력할 시)
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    
    // 탭으로 클릭시 
    const handleDr = (event)=>
    {
        setDuration(event.target.value);
        // 직접입력을 null로 바꾸기 (초기화)
        setStart(null);
        setEnd(null);
        setIsDur(true);
    };

    // 탭 api
    useEffect(()=>{
        console.log('duration', duration);
        // call API를 위한 준비
        const s = new Date();
        if (duration === 'week'){
            s.setDate(s.getDate() -7);
        }else if (duration === 'month'){
            s.setMonth(s.getMonth() - 1);
        }else if (duration === 'quarter'){
            s.setMonth(s.getMonth() - 3);
        }else if (duration === 'year'){
            s.setFullYear(s.getFullYear() - 1);
        }
        if (duration !== null){
            setStartDate(new Date(s.getTime() + TIME_ZONE).toISOString().slice(0, -5));
            setEndDate(new Date(new Date().getTime() + TIME_ZONE).toISOString().slice(0, -5))
        }


    },[duration]);

    // 직접 입력할 시 api
    /*const handleSearchDr=()=>{
        if (isDur){
            //call api
            console.log(duration);
        }
    };*/
   
    const handleBtn=()=>{
        if (!isDur ){ 
            console.log(start,end);
            //call api
            if (start){
                const startVal= `${start.$y}-${(String(start.$M+1)).padStart(2,'0')}-${String((start.$D)).padStart(2,'0')}T00:00:00`;
                setStartDate(startVal); 
            }

            if (end){
                const endVal = `${end.$y}-${(String(end.$M+1)).padStart(2,'0')}-${String((end.$D)).padStart(2,'0')}T23:59:59`;
                setEndDate(endVal);
            }
            setDuration(null);
           // setClicked(false);
       }
    }
 
    return(
        <Card style={{display: "flex", justifyContent: "center", alignItems: "center", padding:'0px 10px',
        //width: "string",
        gap: '10px', gridTemplateColumns: 'minmax(400px, max-content) 1fr', width:'fit-content', height: "70px", borderRadius:'10px'}}>
            {duration === 'week'
            ?<Button variant="contained" value="week" style={styles.button} >1주</Button>
            :<Button variant="outlined" value="week" style={styles.button} onClick={handleDr} >1주</Button>
            }
            {
            duration === 'month'
            ?<Button variant="contained" value="month" style={styles.button}>1개월</Button>
            :<Button variant="outlined" value="month" style={styles.button} onClick={handleDr}>1개월</Button>
            }
            {
            duration === "quarter" 
            ?<Button variant="contained" value="quarter" style={styles.button}>1분기</Button>
            :<Button variant="outlined" value="quarter" style={styles.button} onClick={handleDr}>1분기</Button>
            }
            {
            duration === "year"
            ?<Button variant="contained" value="year" style={styles.button}>1년</Button>
            :<Button variant="outlined" value="year" style={styles.button} onClick={handleDr}>1년</Button>
            }
          
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{  mx: "auto" }}>
                <div style={{display:'flex', marginLeft:'20px'}}>
                
                <DatePicker disableFuture onChange={(newVal)=>{setStart(newVal); setIsDur(false);}} value={isDur? null : start} label="시작날짜" slotProps={{ textField: { size: 'small' } }} style={{width:'150px'}} format={"YYYY-MM-DD"}/>
                ~
                <DatePicker disableFuture minDate={start? start:dayjs('1970-01-01')}  onChange={(newVal)=>{setEnd(newVal); setIsDur(false);}} value={isDur? null :end} label="종료날짜" slotProps={{ textField: { size: 'small' } }}  format={"YYYY-MM-DD"}/>
                </div>
                
              </DemoContainer>
            </LocalizationProvider>
            <button onClick={()=>{setIsDur(false); /*setClicked(true); */handleBtn();}}>
            <FaSearch />
            </button>
            <button onClick={()=>{setDuration('week'); setStart(null); setEnd(null); setIsDur(true);}}>
            <FaArrowRotateLeft />
            </button>
    </Card>
    );
  
}

export default SearchFilterBar;
/**
 * 
 * <Stack spacing={2} direction="row" style={{marginTop:'70px', backgroundColor:'white', marginBottom:'10px'}}></Stack>
 */
const styles = {
    button:{
        borderRadius : '50px',
        padding: '0px 15px',
        width:'100px',
        height:'35px',
        fontWeight:'500',
    },

}
