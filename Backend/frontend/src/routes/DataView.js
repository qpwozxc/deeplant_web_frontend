import { useState, useEffect } from "react"
import Base from "../components/Base/BaseCmp";
import SingleDataLoad from "../components/Meat/SingleDataLoad";
import styles from "./DataView.module.css"
import Sidebar from "../components/Base/Sidebar";
import { Box,  } from '@mui/material';
function DataView(){
    const [loading, setLoading] = useState(true);
    return (
        <Box sx={{ display: 'flex'}}>
            <Sidebar/>
            <Base/>
            
            <SingleDataLoad/>
            
           
        </Box>
    );
}

export default DataView;