import { useState } from "react"
import PropTypes from 'prop-types';
import {Tabs, Tab, Box, Button,useTheme}from '@mui/material';
import BarChart from './Charts/barChart';
import PieChart from './Charts/pieChart';
import AreaChart from './Charts/areaChart';
import { IoBarChart , IoPieChart} from "react-icons/io5";
import * as React from "react";
import { FaChartLine } from "react-icons/fa6";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ backgroundColor: "white" }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function StatsTabs() {
  const [value, setValue] = useState(0);
  const [slot, setSlot] = useState("week");
  const [meatOptions, setMeatOptions] = useState(["원육", "처리육"]);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [alignment, setAlignment] = React.useState("맛");

  const handleToggleChange = (event, newAlignment) => {
    setAlignment(newAlignment);

    // Update the options in the second ToggleButtonGroup based on the selected value in the first ToggleButtonGroup
    if (newAlignment === "맛") {
      setMeatOptions(["원육", "처리육"]);
    } else if (newAlignment === "관능") {
      setMeatOptions(["원육", "처리육", "가열육"]);
    }
  };

  return (
    <Box sx={{ width: "60%", paddingTop: "10px" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center", // Optional: Align items vertically in the center
          justifyContent: "space-between", // Optional: Distribute space between the components
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="통계" {...a11yProps(0)} />
          <Tab label="분포" {...a11yProps(1)} />
          <Tab label="상관관계" {...a11yProps(2)} />
          <Tab label="시계열" {...a11yProps(3)} />
        </Tabs>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleToggleChange}
          aria-label="Platform"
        >
          <ToggleButton value="맛">맛</ToggleButton>
          <ToggleButton value="관능">관능</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleToggleChange}
          aria-label="Meat Options"
        >
          {meatOptions.map((option) => (
            <ToggleButton key={option} value={option}>
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BarChart />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <PieChart
          title="지역별 소 도축 수"
          chartData={[
            { label: "서울", value: 39 },
            { label: "부산", value: 1763 },
            { label: "대구", value: 13039 },
            { label: "인천", value: 22324 },
            { label: "광주", value: 4471 },
            { label: "대전", value: 4795 },
            { label: "울산", value: 39843 },
            { label: "세종", value: 30549 },
          ]}
          chartColors={[
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.warning.main,
            theme.palette.error.main,
            theme.palette.common.main,
            theme.palette.augmentColor.main,
            theme.palette.secondary.main,
            theme.palette.grey.main,
          ]}
        />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <AreaChart
          title="Website Visits"
          subheader="(+43%) than last year"
          chartLabels={[
            "01/01/2003",
            "02/01/2003",
            "03/01/2003",
            "04/01/2003",
            "05/01/2003",
            "06/01/2003",
            "07/01/2003",
            "08/01/2003",
            "09/01/2003",
            "10/01/2003",
            "11/01/2003",
          ]}
          chartData={[
            {
              name: "Team A",
              type: "line",
              fill: "solid",
              data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },
            {
              name: "Team B",
              type: "area",
              fill: "gradient",
              data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
            },
            {
              name: "Team C",
              type: "line",
              fill: "solid",
              data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            },
          ]}
        />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        <AreaChart
          title="Website Visits"
          subheader="(+43%) than last year"
          xAxisLabel="Date" // 가로축 제목 설정
          yAxisLabel="Visits"
          chartLabels={[
            "01/01/2003",
            "02/01/2003",
            "03/01/2003",
            "04/01/2003",
            "05/01/2003",
            "06/01/2003",
            "07/01/2003",
            "08/01/2003",
            "09/01/2003",
            "10/01/2003",
            "11/01/2003",
          ]}
          chartData={[
            {
              name: "Team A",
              type: "line",
              fill: "solid",
              data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
            },
            {
              name: "Team B",
              type: "area",
              fill: "gradient",
              data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
            },
            {
              name: "Team C",
              type: "line",
              fill: "solid",
              data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
            },
          ]}
        />
      </CustomTabPanel>
    </Box>
  );
}