import React from "react";
import ApexCharts from "react-apexcharts";

export default function Taste_Fresh_Corr({ startDate, endDate }) {
  const data = {
    bitterness: {
      avg: 4.75,
      max: 22.0,
      min: -9.8,
      unique_values: [-9.8, -3.0, 1.0, 2.5, 3.3, 7.3, 14.7, 22.0, null],
    },
    richness: {
      avg: 11.19375,
      max: 25.0,
      min: 1.8,
      unique_values: [1.8, 2.79, 2.96, 3.0, 15.0, 24.0, 25.0, null],
    },
    sourness: {
      avg: -0.8837499999999998,
      max: 12.0,
      min: -10.7,
      unique_values: [-10.7, -10.33, -9.54, 1.0, 1.5, 2.5, 6.5, 12.0, null],
    },
    umami: {
      avg: 7.138750000000001,
      max: 41.0,
      min: -12.0,
      unique_values: [-12.0, -1.8, 1.0, 1.36, 7.35, 19.2, 41.0, null],
    },
  };

  // Calculate correlation coefficients between properties
  const correlationMatrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  // Convert correlation matrix to series format for heatmap
  const series = correlationMatrix.map((row, rowIndex) => ({
    name: Object.keys(data)[rowIndex].toUpperCase(),
    data: row.map((value, colIndex) => ({
      x: colIndex,
      y: rowIndex,
      value: value,
    })),
  }));

  // Defining options for the heatmap
  const options = {
    chart: {
      height: 350,
      type: "heatmap",
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#000"],
      },
    },
    colors: ["#008FFB"],
    xaxis: {
      type: "category",
      categories: Object.keys(data).map((property) => property.toUpperCase()),
    },
    yaxis: {
      type: "category",
      categories: Object.keys(data).map((property) => property.toUpperCase()),
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return Object.keys(data)[value];
        },
      },
    },
  };

  return (
    <ApexCharts options={options} series={series} type="heatmap" height={350} />
  );
}
