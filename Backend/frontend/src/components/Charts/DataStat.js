import PieChart from "./PieChart/pieChart";
import StackedBarChart from "./PieChart/StackedBarChart";
import SearchFilterBar from "../Search/SearchFilterBar";
import ExcelController from "../SingleData/excelContr";

import Map from "./choroplethMap/Map";
import { Box,  useTheme, } from "@mui/material";
const DataStat = ()=>{
        
    const theme = useTheme();
    return(
        <div>
        <Box sx={styles.fixed}>
        <SearchFilterBar/>
        <div style={{display: "flex",justifyContent: "center", alignItems:'center', paddingRight:'85px'}}>
        <ExcelController/>
        </div>
        </Box>
        <Box sx={{display:'flex', width:"100%",height:'100%', marginBottom:'10px', justifyContent:'center', alignItems:'center'}}>   
            <div style={{width:'400px', margin:'0px 20px'}}>
                <PieChart 
                    //chartData={pieChartD1.chartData}
                    chartColors={[/*theme.palette.primary.main*/'#3700B3','#FF0266' /*theme.palette.warning.main,*/]}
                    //isFilter={pieChartD1.isFilter}
                    />
            </div>  
            <div style={{width:'350px', margin:'0px 20px'}}>
                <StackedBarChart />    
            </div>
            <div style={{margin:'0px 20px'}}>
                <Map/>
            </div>
        </Box>
        </div>
    );


}

export default DataStat;
const styles={
    fixed:{
      position: 'fixed', 
      top:'70px',
      right:'0',
      left:'65px',
      zIndex: 1,
      width:'100%',
      borderRadius:'0',
      display:'flex',
      justifyContent:'center',
      backgroundColor:'white',
    },
  };
const pieChartD1 = {
    chartColorsNum:2,
    chartData :[12,150]
  }
  
  /*const pieChartColors  = [ 
    theme.palette.success.light,
    theme.palette.secondary.dark,
    theme.palette.success.light,
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.error.main,
    theme.palette.info.light,
    theme.palette.secondary.main,
    theme.palette.warning.light,
    theme.palette.action.main,
    theme.palette.success.main,
    theme.palette.mode.main,
    theme.palette.success.dark,
    theme.palette.secondary.light,
    theme.palette.error.light,
    theme.palette.warning.dark,
    theme.palette.secondary.dark,
  ];*/