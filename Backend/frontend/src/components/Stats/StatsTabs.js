import { useState } from "react"
import PropTypes from 'prop-types';
import {Tabs, Tab, Box, Button,useTheme}from '@mui/material';
import BarGraph from "./Charts/barGraph";
import PieChart from "./Charts/pieChart";
import AreaChart from "./Charts/BoxPlot";
import { IoBarChart, IoPieChart } from "react-icons/io5";
import * as React from "react";
import { FaChartLine } from "react-icons/fa6";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import BasicScatter from "./Charts/ScatterChart";
import BasicPie from "./Charts/pieChart";
import BoxPlot from "./Charts/BoxPlot";
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
    <Box sx={{ width: "900px", height: "300px", paddingTop: "10px" }}>
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
        <BarGraph />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <BasicPie />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <BasicScatter />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        <BoxPlot />
      </CustomTabPanel>
    </Box>
  );
}