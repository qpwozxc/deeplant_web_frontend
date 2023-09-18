import ApexCharts from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { da } from "date-fns/locale";

export default function Taste_Fresh_Map({ startDate, endDate }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://3.38.52.82/meat/statistic?type=4&start=${startDate}&end=${endDate}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const ChartSeries = Object.keys(chartData).map((property) => {
    const uniqueValues = chartData[property].unique_values;
    const frequencies = new Array(10).fill(0);

    uniqueValues.forEach((value) => {
      const index = Math.floor(value);
      frequencies[index] += 1;
    });

    return {
      name: property,
      data: frequencies,
    };
  });

  const ChartOption = {
    chart: {
      height: 350,
      type: "heatmap",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "numeric",
      tickAmount: 10, // Number of ticks on the x-axis
      min: 0,
      max: 10, // Adjust the max value as needed
    },
    title: {
      text: "원육 맛데이터 범위별 분포(빈도수)",
    },
    grid: {
      padding: {
        right: 20,
      },
    },
  };

  return (
    <ApexCharts
      options={ChartOption}
      series={ChartSeries}
      type="heatmap"
      height={350}
    />
  );
}
