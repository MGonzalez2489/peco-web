import { DatePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Chart } from '@core/models/app';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart',
  imports: [ChartModule],
  templateUrl: './chart.component.html',
  providers: [DatePipe],
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  @Input()
  set chart(value: Chart) {
    this.chartS.set(value);
  }

  @Input()
  height = '100';

  @Input()
  width = '150';

  chartS = signal<Chart | undefined>(undefined);
}
