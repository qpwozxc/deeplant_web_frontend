import { useState, useEffect } from "react"
import Base from "../components/Base/BaseCmp";
import Sidebar from "../components/Base/Sidebar";
import Box from '@mui/material/Box';
import SearchFilter from "../components/Stats/SearchFilter";
import StatsTabs from "../components/Stats/StatsTabs";

function Stats(){
    return (
        <div style={{ display: 'flex', width:"100%" }}>
            <Sidebar/>
            <Base/>
            <div style={{ paddingTop:'80px' , width:"100%"}}>
            <SearchFilter/>
            
            <StatsTabs/>
            
            </div>
            
        </div>
    );
}

export default Stats;