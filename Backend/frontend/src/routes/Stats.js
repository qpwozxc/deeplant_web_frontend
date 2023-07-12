import { useState, useEffect } from "react";
import Sidebar from "../components/Base/Sidebar";
import SearchFilter from "../components/Stats/SearchFilter";
import StatsTabs from "../components/Stats/StatsTabs";

function Stats() {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Sidebar />
      <div style={{ paddingTop: "80px", width: "100%" }}>
        <SearchFilter />
        <StatsTabs />
      </div>
    </div>
  );
}

export default Stats;
