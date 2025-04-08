export class Chart {
  type = 'line';
  data: ChartData | undefined;
  options: ChartOptions | undefined;
  // height: string;
  // width: string;
}

export class ChartData {
  labels: string[] = [];
  datasets: Dataset[] = [];
}

export interface Dataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
  pointRadius: number;
}

export interface ChartOptions {
  maintainAspectRatio: boolean;
  aspectRatio: number;
  plugins: Plugins;
  scales: Scales;
}

export interface Plugins {
  legend: Legend;
}

export interface Legend {
  display: boolean;
  labels: Labels;
}

export interface Labels {
  color: string;
}

export interface Scales {
  x: X;
  y: X;
}

export interface X {
  pointLabel: Border;
  ticks: Border;
  grid: Border;
  border: Border;
}

export interface Border {
  display: boolean;
}
