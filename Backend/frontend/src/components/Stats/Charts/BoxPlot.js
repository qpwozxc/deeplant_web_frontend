import React from "react";
import ApexCharts from "react-apexcharts";

export default function BoxPlot() {
  const chartOptions = {
    chart: {
      height: 500,
      width: 500,
    },
  };
  const chartSeries = [
    { name: "오늘의 기온", data: [19, 26, 20, 9] },
    { name: "내일의 기온", data: [30, 26, 34, 10] },
  ];
  return (
    <div>
      <ApexCharts type="line" series={chartSeries} options={chartOptions} />
    </div>
  );
}
