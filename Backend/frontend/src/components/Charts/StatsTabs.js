import { useState } from "react"
import PropTypes from 'prop-types';
import {Tabs, Tab, Box, Button,useTheme}from '@mui/material';
import BarChart from './barChart';
import PieChart from './pieChart';
import AreaChart from './areaChart';
import { IoBarChart , IoPieChart} from "react-icons/io5";
import { FaChartLine } from "react-icons/fa6";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{backgroundColor:'white'}}
    >
      {value === index && (
        <Box sx={{ p: 3 }} >
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function StatsTabs(props) {
    const {pieChartData} = props;
    const [value, setValue] = useState(0);
    const [slot, setSlot] = useState('week');
    const theme = useTheme();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const pieChartColors  = [ 
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
    //console.log('chart colors',pieChartColors.slice(0,chartDatas.pieChart.chartColorsNum));
    return (
      <Box sx={{ width: 'fit-content' ,paddingTop:'0px' }}>
        <PieChart 
            title= {pieChartData.title}
            chartData={pieChartData.chartData}
            chartColors={pieChartColors.slice(0,pieChartData.chartColorsNum)}
          />
        
      </Box>

    );
}
/**
 * <Box sx={{ borderBottom: 1, borderColor: 'divider' ,backgroundColor:'white'}}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example">
          <Tab label={<IoBarChart size="24"/>}{...a11yProps(0)} />
          <Tab label={<IoPieChart size="24"/>} {...a11yProps(1)}/>
          <Tab label={<FaChartLine size="24"/>} {...a11yProps(2)}/>
        </Tabs>
        </Box>

 * <CustomTabPanel value={value} index={0} >
          <BarChart/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          
        </CustomTabPanel>
        
        <CustomTabPanel value={value} index={2} >
        <AreaChart
              title={chartDatas.areaChart.title}
              subheader={chartDatas.areaChart.subheader}
              chartLabels={chartDatas.areaChart.chartLabels}
              chartData={chartDatas.areaChart.chartData}
            />
        </CustomTabPanel>
 */

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
  areaChart:{
    title:"Website Visits",
    subheader:"(+43%) than last year",
    chartLabels:[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
    chartData:[
      {
        name: 'Team A',
        type: 'line',
        fill: 'solid',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
      },
      {
        name: 'Team B',
        type: 'area',
        fill: 'gradient',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      },
      {
        name: 'Team C',
        type: 'line',
        fill: 'solid',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
      },
    ],
  }
};