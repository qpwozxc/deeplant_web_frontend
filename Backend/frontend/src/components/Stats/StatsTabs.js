import { useState } from "react"
import PropTypes from 'prop-types';
import {Tabs, Tab, Box, Button,useTheme}from '@mui/material';
import BarChart from './barChart';
import PieChart from './pieChart';
import AreaChart from './areaChart';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

export default function StatsTabs() {
    const [value, setValue] = useState(0);
    const [slot, setSlot] = useState('week');
    const theme = useTheme();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example">
          <Tab label="Item One"{...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)}/>
          <Tab label="Item Three" {...a11yProps(2)}/>
        </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <BarChart/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <PieChart 
            title="Current Visits"
            chartData={[
              { label: 'America', value: 4344 },
              { label: 'Asia', value: 5435 },
              { label: 'Europe', value: 1443 },
              { label: 'Africa', value: 4443 },
            ]}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.info.main,
              theme.palette.warning.main,
              theme.palette.error.main,
            ]}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
          <AreaChart slot={slot}/>
        </CustomTabPanel>
      </Box>

    );
}