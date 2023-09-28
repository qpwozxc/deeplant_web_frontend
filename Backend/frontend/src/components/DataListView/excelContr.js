import { useState, useEffect, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import { ExcelRenderer,  } from "react-excel-renderer";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { Box, Button,SvgIcon,} from "@mui/material";

const navy =  '#0F3659';

function ExcelController(){
    const fileRef = useRef(null);
    //엑셀파일을 JSON 으로 변환
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Perform action after file selection
        handleExcelFile(file);
    };
    const handleExcelFile = (file) => {
        ExcelRenderer(file, (err, resp) => {
        if (err) {
            console.log(err);
        } else {
            const toJson = {};
            const labData = {};
            const tongue = {};
            for (let i = 1; i < 11; i++) {
            labData[resp.rows[0][i]] = resp.rows[1][i];
            }
            for (let i = 11; i < resp.rows[0].length; i++) {
            tongue[resp.rows[0][i]] = resp.rows[1][i];
            }
            toJson[resp.rows[0][0]] = resp.rows[1][0];
            toJson["lab_data"] = labData;
            toJson["tongue"] = tongue;
            /*resp.rows[0].map((key, index)=>{
                index == 0? toJson[key] = resp.rows[1][index]:
                toJson[key] = resp.rows[1][index];
            })*/
            console.log(file)
            console.log("cols: ", resp.cols, "rows: ", resp.rows);
            console.log('toJson', toJson)
            
            fetch(`http://localhost:8080/meat/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toJson),
            });
            
        }
        });
    };
    return(
        <Box sx={{ display: 'flex', gap: 1, width: "100%", marginTop: "0px" , backgroundColor:'white',border:'1px solid #cfd8dc', marginLeft:'10px',borderRadius:'5px'}}>
          <input class="form-control" accept=".csv,.xlsx,.xls" type="file" id="formFile" ref={fileRef}
            onChange={(e) => {handleFileChange(e);}} style={{display:'none' }}/>
          <Button style={{color:navy}} onClick={()=>{fileRef.current.click();}}>
            <div style={{display:'flex'}}>
              <SvgIcon fontSize="small">
                <ArrowUpOnSquareIcon />
              </SvgIcon>
            <span>Import</span>
            </div>  
          </Button>
          <Button style={{color:navy}} onClick={()=>{}}>
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

export default ExcelController;