import { useParams,Link } from "react-router-dom";

import { Box, Typography, Button, IconButton} from '@mui/material';
import { FaAngleDoubleLeft } from "react-icons/fa";
import ExcelController from "../DataListView/excelContr";

function navBar(){
    return(
        <Box sx={{display:'flex', marginTop:'70px'}}>
          <div style={{display:'flex', alignItems:'center', marginLeft:'10px'}}>
            <Link to={{pathname : '/DataManage'}} >
              <IconButton  size="large">
              <FaAngleDoubleLeft/>
              </IconButton>
            </Link>
          </div>
          <div style={{display: "flex",justifyContent: "center", alignItems:'center', paddingRight:'85px'}}>
            <ExcelController/>
          </div>
        </Box>
    );
}

export default navBar;

const style={
    fixed:{
      position: 'fixed', 
      top:'70px',
      right:'0',
      left:'65px',
      zIndex: 1,
      width:'100%',
      borderRadius:'0',
      display:'flex',
      justifyContent:'space-between',
      backgroundColor:'white',
      height: "70px",
    },
  
  }