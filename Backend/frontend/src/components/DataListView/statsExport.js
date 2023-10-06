import { useState, useEffect, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import { ExcelRenderer,  } from "react-excel-renderer";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { Box, Button,SvgIcon,} from "@mui/material";

const navy =  '#0F3659';
const apiIP = '3.38.52.82';

function StatsExport(){
    
    return(
        <Box>
          <Button style={{color:navy , backgroundColor:'white', border:`1px solid ${navy}`, height:'35px', borderRadius:'10px'}} onClick={()=>{}}>
            <div style={{display:'flex'}}>
              <SvgIcon fontSize="small">
                  <ArrowDownOnSquareIcon />
              </SvgIcon>
            <span>Export</span>
            </div>
          </Button>
        </Box>
    );
}

export default StatsExport;