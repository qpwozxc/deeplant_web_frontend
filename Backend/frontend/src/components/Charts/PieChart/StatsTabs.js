import { useState } from "react"
import {Tabs, Tab, Box, Button,useTheme}from '@mui/material';
import PieChart from './pieChart';

export default function StatsTabs(props) {
    const {pieChartData} = props;
    const [value, setValue] = useState(0);
    const [slot, setSlot] = useState('week');
    const theme = useTheme();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const pieChartColors  = [ 
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
    ];
    return (
      <Box sx={{ width: '100%' ,paddingTop:'0px',}}>
        <PieChart 
            title= {pieChartData.title}
            chartData={pieChartData.chartData}
            chartColors={pieChartColors.slice(0,pieChartData.chartColorsNum)}
            isFilter={pieChartData.isFilter}
          /> 
      </Box>
    );
}

const chartDatas = {
  pieChart:{
    title:"지역별 소 도축 수",
    chartData : [
      { label: '서울', value: 39 },
      { label: '부산', value: 1763 },
      { label: '대구', value: 13039 },
      { label: '인천', value: 22324 },
      { label: '광주', value: 4471 },
      { label: '대전', value: 4795 },
      { label: '울산', value: 39843 },
      { label: '세종', value: 30549 },
    ],
    chartColorsNum :8,
  },
 };