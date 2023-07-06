import { useState, useEffect } from "react"
import Base from "../components/Base/BaseCmp";
import Sidebar from "../components/Base/Sidebar";
import Box from '@mui/material/Box';
function Stats(){
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar/>
            <Base/>
            'stats'
        </Box>
    );
}

export default Stats;