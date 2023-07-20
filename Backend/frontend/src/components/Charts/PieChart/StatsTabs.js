import { useState } from "react"
import {Tabs, Tab, Box, Button,useTheme}from '@mui/material';
import PieChart from './pieChart';

export default function StatsTabs(props) {
    const {pieChartData} = props;
    const theme = useTheme();

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

