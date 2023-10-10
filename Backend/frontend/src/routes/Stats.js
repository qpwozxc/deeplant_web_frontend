import SearchFilter from "../components/Stats/SearchFilter";
import StatsTabs from "../components/Stats/StatsTabs";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SearchFilterBar from "../components/Search/SearchFilterBar";
import { useState, useEffect, useRef } from "react";
import { TIME_ZONE } from "../config";

function Stats() {
  const s = new Date();
  s.setDate(s.getDate() - 7);
  const [startDate, setStartDate] = useState(
    new Date(s.getTime() + TIME_ZONE).toISOString().slice(0, -5)
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + TIME_ZONE).toISOString().slice(0, -5)
  );
  

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          width: "100%",
          paddingLeft: "210px",
          paddingBottom: "20px",
        }}
      >
        <SearchFilterBar setStartDate={setStartDate} setEndDate={setEndDate} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingBottom: "20px",
        }}
      >
        <StatsTabs startDate={startDate} endDate={endDate} />
      </Box>
    </Container>
  );
}

export default Stats;
