import { useState } from "react"
import PropTypes from 'prop-types';
import {Tabs, Tab, Box, Button,useTheme}from '@mui/material';
import BarGraph from "./Charts/barGraph";
import PieChart from "./Charts/pieChart";
import AreaChart from "./Charts/BoxPlot/Sens_FreshMeat";
import { IoBarChart, IoPieChart } from "react-icons/io5";
import * as React from "react";
import { FaChartLine } from "react-icons/fa6";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import BasicScatter from "./Charts/ScatterChart";
import BasicPie from "./Charts/pieChart";
import FreshMeat_BoxPlot from "./Charts/BoxPlot/Sens_FreshMeat";
import ProcMeat_BoxPlot from "./Charts/BoxPlot/Sens_ProcMeat";
import HeatedMeat_BoxPlot from "./Charts/BoxPlot/Sens_HeatedMeat";
import Sens_FreshMeat from "./Charts/BoxPlot/Sens_FreshMeat";
import Sens_ProcMeat from "./Charts/BoxPlot/Sens_ProcMeat";
import Sens_HeatedMeat from "./Charts/BoxPlot/Sens_HeatedMeat";
import Taste_FreshMeat from "./Charts/Taste_FreshMeat";
import Taste_ProcMeat from "./Charts/Taste_ProcMeat";
import Sens_Stat from "./Charts/Sens_Stat";
import Sens_Fresh_Map from "./Charts/HeatMap/Sens_Fresh_Map";
import Sens_Heated_Map from "./Charts/HeatMap/Sens_Heated_Map";
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
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [alignment, setAlignment] = React.useState("맛");
  const handleFirstChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [secondary, setSecondary] = React.useState("원육");
  const handleSecondChange = (event, newSecond) => {
    setSecondary(newSecond);
  };

  return (
    <Box sx={{ width: "900px", height: "350px" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
          onChange={handleFirstChange}
          aria-label="Platform"
        >
          <ToggleButton value="맛">맛</ToggleButton>
          <ToggleButton value="관능">관능</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          color="primary"
          value={secondary}
          exclusive
          onChange={handleSecondChange}
          aria-label="Platform"
        >
          <ToggleButton value="원육">원육</ToggleButton>
          <ToggleButton value="처리육">처리육</ToggleButton>
          <ToggleButton value="가열육" disabled={alignment === "맛"}>
            가열육
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {alignment === "관능" && secondary === "원육" ? (
          <Sens_FreshMeat />
        ) : alignment === "관능" && secondary === "처리육" ? (
          <Sens_ProcMeat />
        ) : alignment === "관능" && secondary === "가열육" ? (
          <Sens_HeatedMeat />
        ) : alignment === "맛" && secondary === "원육" ? (
          <Taste_FreshMeat />
        ) : alignment === "맛" && secondary === "처리육" ? (
          <Taste_ProcMeat />
        ) : null}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <BasicScatter />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        {alignment === "관능" && secondary === "원육" ? (
          <Sens_Fresh_Map />
        ) : alignment === "관능" && secondary === "가열육" ? (
          <Sens_Heated_Map />
        ) : null}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        <BarGraph />
      </CustomTabPanel>
    </Box>
  );
}