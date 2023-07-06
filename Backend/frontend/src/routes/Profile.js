import { useState, useEffect } from "react"
import Base from "../components/Base/BaseCmp";
import Box from '@mui/material/Box';
import Sidebar from "../components/Base/Sidebar";
function Profile(){
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar/>
            <Base/>
            profile
            </Box>
    );
}

export default Profile;