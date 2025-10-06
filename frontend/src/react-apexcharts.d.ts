declare module "react-apexcharts" {
  import { Component } from "react";
  import { ApexOptions } from "apexcharts";

  interface Props {
    type?: "line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap";
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    options: ApexOptions;
    width?: string | number;
    height?: string | number;
  }

  export default class ReactApexChart extends Component<Props> {}
}