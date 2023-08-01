import ApexCharts from "react-apexcharts";
import React, { useEffect, useState } from "react";

export default function Taste_Fresh_Map() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://3.38.52.82/meat/statistic?type=4");

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
  }, []);

  useEffect(() => {
    // Function to transform chartData into required format for heatmap
    const transformDataForHeatmap = () => {
      const transformedSeries = {};

      // Loop through each attribute in chartData
      Object.entries(chartData).forEach(([attribute, data]) => {
        const values = data.unique_values.sort((a, b) => a - b);
        const seriesData = [];

        // Loop through each unique value in the attribute
        for (let i = 0; i < values.length; i++) {
          const rangeStart = i === 0 ? 0 : values[i - 1];
          const rangeEnd = values[i];
          const frequency = values.filter(
            (value) => value >= rangeStart && value <= rangeEnd
          ).length;

          for (let j = 0; j < frequency; j++) {
            seriesData.push({
              x: `W${i + 1}`,
              y: values[i],
            });
          }
        }

        // Add an empty data point for x-axis label consistency
        seriesData.push({
          x: `W${values.length + 1}`,
          y: null,
        });

        transformedSeries[attribute] = seriesData;
      });

      return transformedSeries;
    };

    if (Object.keys(chartData).length > 0) {
      const transformedSeries = transformDataForHeatmap();
      setChartOptions({
        ...chartOptions,
        series: Object.entries(transformedSeries).map(([attribute, data]) => ({
          name: attribute,
          data,
        })),
      });
    }
  }, [chartData]);

  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        height: 450,
        type: "heatmap",
      },
      xaxis: {
        type: "category",
        categories: Array.from({ length: 10 }, (_, i) => `W${i + 1}`),
        title: {
          text: "범위", // X-axis label
        },
      },
      yaxis: {
        title: {
          text: "Attributes", // Y-axis label
        },
      },
    },
    series: [], // Initialize with an empty array
  });

  return (
    <div>
      {Object.keys(chartData).length > 0 && chartOptions.series.length > 0 ? (
        <ApexCharts
          options={chartOptions.options}
          series={chartOptions.series}
          type="heatmap"
          height={450}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
