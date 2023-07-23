import SearchFilterBar from "../components/Search/SearchFilterBar";
// 데이터 목록
import DataListComp from "../components/DataListView/DataListComp";
// mui 
import { Box, Button, } from "@mui/material";

function PA(){
    return(
        <div>
            <Box sx={styles.fixed}>
                <SearchFilterBar/>
            </Box>
            <Box sx={{marginTop:'210px'}}>
            <DataListComp/>
            </Box>
            
        </div>
    );
}
export default PA;

const styles={
    fixed:{
      position: 'fixed', 
      top:'70px',
      right:'0',
      left:'65px',
      zIndex: 1,
      width:'100%',
      borderRadius:'0',
      display:'flex',
      justifyContent:'center',
      backgroundColor:'white',
    },
 
  }
  