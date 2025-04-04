export interface EntryKPIDto {
  labels: string[];
  datasets: EntryKPIDataSet[];
  period: string;
}

export interface EntryKPIDataSet {
  label: string;
  data: number[];
}
