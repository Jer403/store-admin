import {
  BarChart,
  LineChart,
  RadialChart,
  StackedBarChart,
} from "../components/ApexCharts";

export function Metrics() {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <p>Metrics</p>
        <LineChart></LineChart>
        <RadialChart></RadialChart>
        <BarChart></BarChart>
        <StackedBarChart></StackedBarChart>
      </div>
    </>
  );
}
