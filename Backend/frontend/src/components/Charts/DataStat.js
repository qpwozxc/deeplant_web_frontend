import PieChart from "./PieChart/pieChart";
import StackedBarChart from "./PieChart/StackedBarChart";
import Map from "./choroplethMap/Map";
import { Box,  useTheme, } from "@mui/material";
const DataStat = ()=>{
    const theme = useTheme();
    return(
        <div>
        <Box sx={{display:'flex', width:"100%",height:'100%', marginBottom:'10px', justifyContent:'center', alignItems:'center'}}>   
            <div style={{width:'400px', margin:'0px 20px'}}>
            <PieChart title= {pieChartD1.title}
                chartData={pieChartD1.chartData}
                chartColors={[theme.palette.primary.main, theme.palette.warning.main,]}
                isFilter={pieChartD1.isFilter}/>
            </div>  
            <div style={{width:'350px', margin:'0px 20px'}}>
            <StackedBarChart />    
            </div>
            <div style={{margin:'0px 20px'}}><Map/></div>
        </Box>
        </div>
    );
}

export default DataStat;

const pieChartD1 = {
    title :'신선육/숙성육',
    chartData : [
      {label:'신선육', value:520},
      {label:'숙성육', value:1520}
    ],
    chartColorsNum:2,
    isFilter:false,
  }
  