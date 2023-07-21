import { useEffect, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        position: 'bottom',
        offsetX: -10,
        offsetY: 0
      }
    }
  }],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: '13px',
            fontWeight: 900
          }
        }
      }
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ["transparent"],
  },
  xaxis: {
    categories: [
      "소",
      "돼지",
    ],
  },
  yaxis: {
    title: {
      text: "개",
    },
  },
  legend: {
    position: 'right',
    offsetY: 40
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return `$ ${val} thousands`;
      },
    },
  },
  /*legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 16,
      height: 16,
      radius: "50%",
      offsexX: 2,
      offsexY: 2,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50,
    },
  },
  */
};

// ==============================|| SALES COLUMN CHART ||============================== //

const StackedBarChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const stackColors  = [ 
    theme.palette.primary.light,
    theme.palette.secondary.dark,
    theme.palette.success.light,
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.error.main,
    theme.palette.info.light,
    theme.palette.secondary.main,
    theme.palette.warning.light,
    theme.palette.action.main,
    theme.palette.success.main,
    theme.palette.mode.main,
    theme.palette.success.dark,
    theme.palette.secondary.light,
    theme.palette.error.light,
    theme.palette.warning.dark,
    theme.palette.secondary.dark,
  ];
  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series] = useState([
    
    {
      name: "등심",
      data: [120, 45],
    },
    {
      name: "삼겹살",
      data: [0, 55],//값 넣을때 비율로 계산해서 넣기 
    },
    {
      name: "채끝",
      data: [110, 0],
    },
    {
      name: "목심",
      data: [180, 90],
    },
    {
      name: "앞다리",
      data: [180, 90],
    },
    {
      name: "안심",
      data: [180, 90],
    },
    {
      name: "안심",
      data: [180, 90],
    },
  ]);

  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: stackColors,
      xaxis: {
        labels: {
          style: {
            colors: stackColors,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: stackColors,
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
      
    }));
  }, [stackColors]);

  return (
    <div id="chart" style={{ backgroundColor: "white", borderRadius: "5px" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={450}
      />
    </div>
  );
};

export default StackedBarChart;

const series=[
  {
    name:''
  }
]
const cowCategory = [
  { value: "tenderloin", label: "안심" },
  { value: "sirloin", label: "등심" },
  { value: "chuck", label: "목심" },
  { value: "blade", label: "앞다리" },
  { value: "rib", label: "갈비" },
  { value: "striploin", label: "채끝" },
  { value: "round", label: "우둔" },
  { value: "bottom_round", label: "설도" },
  { value: "brisket", label: "양지" },
  { value: "shank", label: "사태" },
]; 
const pigCategory = [
  { value: "tenderloin", label: "안심" },
  { value: "loin", label: "등심" },
  { value: "boston_shoulder", label: "목심" },
  { value: "picinc_shoulder", label: "앞다리" },
  { value: "spare_ribs", label: "갈비" },
  { value: "belly", label: "삼겹살" },
  { value: "ham", label: "뒷다리" },
];