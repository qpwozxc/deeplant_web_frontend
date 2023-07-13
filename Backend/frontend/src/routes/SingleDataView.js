import { useState, useEffect } from "react";
import SingleDataLoad from "../components/Meat/SingleDataLoad";
import Sidebar from "../components/Base/Sidebar";
import { Box } from "@mui/material";
function DataView() {
  const [loading, setLoading] = useState(true);
  return <SingleDataLoad />;
}

export default DataView;
