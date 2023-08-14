import { Box, Button,Paper, ButtonGroup,IconButton,ToggleButton, ToggleButtonGroup,TextField, Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@mui/material';
import { useEffect, useState } from 'react';

const RawTable=(rawInput)=>{
    const[rawdata, setRawData] = useState({});
    useEffect(()=>{
        setRawData(rawInput)
    },[rawInput])

    return (
        <TableContainer key='rawmeat' component={Paper} sx={{width:'fitContent',overflow:'auto'}}>
            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                <TableHead>
                </TableHead>
                <TableBody>
                    {rawField.map((f, idx)=>{
                        return(
                            <TableRow key={'raw-Row'+idx}>
                                <TableCell key={'raw-'+idx+'col1'}>{f}</TableCell>
                                <TableCell key={'raw-'+idx+'col2'}>{rawInput[f] ? rawInput[f] : ""}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RawTable;

const rawField =['marbling','color','texture','surfaceMoisture','overall',];
