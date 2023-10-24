import { Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';

const ApiTable=({edited, apiInput, api_data, setApiInput})=>{
    return (
        <TableContainer key='api' component={Paper} sx={{width:'fitContent',overflow:'auto'}}>
            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                <TableHead>
                </TableHead>
                <TableBody>
                    {apiField.map((f, idx)=>{
                        return(
                            <TableRow key={'api-'+idx}>
                                <TableCell key={'api-'+idx+'col1'}>{f}</TableCell>
                                <TableCell key={'api-'+idx+'col2'}>    
                                {
                                    //edited
                                    //? <input key={'api-'+idx+'input'} name={f} style={{height:'23px'}} value={apiInput[f]} placeholder={api_data===null?"":api_data[f]} 
                                    //        onChange={(e)=>{setApiInput((currentField)=>({...currentField, [e.target.name]: e.target.value,}))}}/>
                                    //: 
                                    apiInput[f] ? apiInput[f] : ""
                                }
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ApiTable;

const apiField = ['birthYmd', 'butcheryYmd', 'farmAddr','farmerNm','gradeNm','primalValue','secondaryValue','sexType','species', 'statusType', 'traceNum'];
