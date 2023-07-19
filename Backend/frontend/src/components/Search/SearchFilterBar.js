import { useEffect, useState , useRef} from "react";
import {Button, Stack, Card} from '@mui/material';
import {FaArrowRotateLeft}  from "react-icons/fa6";
import {FaSearch}  from "react-icons/fa";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
function SearchFilterBar(){
    return(
        <Card style={{display: "flex", justifyContent: "center", alignItems: "center", padding:'0px 10px',
        //width: "string",
        gap: '10px', gridTemplateColumns: 'minmax(400px, max-content) 1fr', width:'fit-content', height: "70px", borderRadius:'10px'}}>
            <Button variant="outlined" style={styles.button} >1주</Button>
            <Button variant="outlined" style={styles.button}>1개월</Button>
            <Button variant="contained" style={styles.button}>1분기</Button>
            <Button variant="outlined" style={styles.button}>1년</Button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{  mx: "auto" }}>
                <div style={{display:'flex',}}>
                <span>직접입력</span>
                <DatePicker label="시작날짜" slotProps={{ textField: { size: 'small' } }} style={{width:'150px'}} format={"YYYY-MM-DD"}/>
                ~
                <DatePicker label="종료날짜" slotProps={{ textField: { size: 'small' } }}  format={"YYYY-MM-DD"}/>
                </div>
                
              </DemoContainer>
            </LocalizationProvider>
        <FaArrowRotateLeft/>
        <FaSearch/>
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
