import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export function LineChart() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    series: [
      {
        name: "Ventas",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Ventas generales de productos",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Feb 1",
          "Feb 2",
          "Feb 3",
          "Feb 4",
          "Feb 5",
          "Feb 6",
          "Feb 7",
          "Feb 8",
          "Feb 9",
        ],
      },
    },
  });

  return (
    <div>
      <div id="chart" className="w-xl">
        <ReactApexChart
          options={state.options as ApexOptions}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export function RadialChart() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    series: [70],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      labels: ["Cricket"],
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options as ApexOptions}
          series={state.series}
          type="radialBar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export function BarChart() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: number) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Monthly Inflation in Argentina, 2002",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  });

  return (
    <div>
      <div id="chart" className="w-xl">
        <ReactApexChart
          options={state.options as ApexOptions}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export function StackedBarChart() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    series: [
      {
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "PRODUCT D",
        data: [21, 7, 25, 13, 22, 8],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: "end", // 'around', 'end'
          borderRadiusWhenStacked: "last", // 'all', 'last'
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "01/01/2011 GMT",
          "01/02/2011 GMT",
          "01/03/2011 GMT",
          "01/04/2011 GMT",
          "01/05/2011 GMT",
          "01/06/2011 GMT",
        ],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  });

  return (
    <div>
      <div id="chart" className="w-xl">
        <ReactApexChart
          options={state.options as ApexOptions}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
