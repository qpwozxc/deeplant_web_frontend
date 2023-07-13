import Base from "../components/Base/BaseCmp";
import Sidebar from "../components/Base/Sidebar";
import { Box,  } from '@mui/material';
function DataView(){
    return (
        <Box sx={{ display: 'flex'}}>
            <Sidebar/>
            <Base/>        
        </Box>
    );
}

export default DataView;