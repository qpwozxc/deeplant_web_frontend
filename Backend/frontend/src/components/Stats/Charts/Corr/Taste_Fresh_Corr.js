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

  const calculateCorrelationCoefficient = (arr1, arr2) => {
    // Replace null values with 0
    if (arr1 === null || arr2 === null) {
      return 0;
    }
    const arr1Filled = arr1.map((val) => (val === null ? 0 : val));
    const arr2Filled = arr2.map((val) => (val === null ? 0 : val));

    if (arr1Filled.length === 0 || arr2Filled.length === 0) {
      return 0;
    }

    const n = arr1Filled.length;
    const mean1 = arr1Filled.reduce((acc, val) => acc + val, 0) / n;
    const mean2 = arr2Filled.reduce((acc, val) => acc + val, 0) / n;
    const numerator = arr1Filled.reduce(
      (acc, val, i) => acc + (val - mean1) * (arr2Filled[i] - mean2),
      0
    );
    const denominator1 = Math.sqrt(
      arr1Filled.reduce((acc, val) => acc + Math.pow(val - mean1, 2), 0)
    );
    const denominator2 = Math.sqrt(
      arr2Filled.reduce((acc, val) => acc + Math.pow(val - mean2, 2), 0)
    );

    const correlationCoefficient = numerator / (denominator1 * denominator2);
    return correlationCoefficient;
  };

  const categories = ["Bitterness", "Richness", "Sourness", "Umami"];
  const series = [];

  // Calculate correlation coefficients and create series data
  for (let i = 0; i < categories.length; i++) {
    const seriesData = [];
    for (let j = 0; j < categories.length; j++) {
      if (i === j) {
        seriesData.push(1); // Set diagonal elements to 1
      } else {
        const correlation = calculateCorrelationCoefficient(
          data[categories[i]].unique_values,
          data[categories[j]].unique_values
        );
        seriesData.push(correlation);
      }
    }
    series.push({
      name: categories[i],
      data: seriesData,
    });
  }

  const options = {
    xaxis: {
      categories: categories,
    },
    yaxis: {
      categories: categories,
    },
  };

  return (
    <ApexCharts options={options} series={series} type="heatmap" height={350} />
  );
}
