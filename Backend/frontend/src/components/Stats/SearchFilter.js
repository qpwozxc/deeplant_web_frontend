import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
const top100Films = [{label:"소"},{label:"돼지"} ]
const topic = [{label:"전체"},{label:"출생"} ,{label:"사육"} ,{label:"도축"} ,{label:"농장"} ]
const tableTopic = [{label:"지역별/소의 성별 수"},{label:"지역별/소의 등급 수"} ]
export default function SearchFilter() {
  return (

  <Box sx={{display:'flex' ,borderBottom:'1px solid grey', backgroundColor:'white',borderRadius:'5px',marginTop:'70px',justifyContent:'center', width:'75%'}}>
    <Autocomplete disablePortal id="combo-box-demo" options={top100Films} sx={{ marginLeft:2, width: 200 }}
      renderInput={(params) => <TextField {...params} label="종류" />}
    />
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={topic}
      sx={{ marginLeft:2, width: 250 }}
      renderInput={(params) => <TextField {...params} label="주제선택" />}
    />
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={tableTopic}
      sx={{ marginLeft:2,width: 300 }}
      renderInput={(params) => <TextField {...params} label="표선택" />}
    />
    <Button variant="contained" color="success" sx={{ marginLeft:4 ,width: 150 }}>
        조회
    </Button>
  </Box>


  );
}

