export interface GraphDataItem {
  name: string;
  value: number;
}

export interface GraphConfig {
  view: [number, number] | undefined;
  colorScheme: {
    domain: string[]
  };
  showLegend: boolean;
  gradient: boolean;
  animations: boolean;
}

export interface BarGraphConfig extends GraphConfig {
  showXAxis: boolean;
  showYAxis: boolean;
  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  showGridLines: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  axisTickFormatting: (x: any) => any;
  scaleMax: number;
}
