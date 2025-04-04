/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  Input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { EntryKPIDto } from '@entries/dto';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-graph',
  imports: [ChartModule],
  templateUrl: './graph.component.html',
  providers: [DatePipe],
  styleUrl: './graph.component.scss',
})
export class GraphComponent {
  @Input()
  set kpi(value: EntryKPIDto) {
    this.values.set(value);
  }

  values = signal<EntryKPIDto | undefined>(undefined);

  datePipe = inject(DatePipe);

  data: any;
  //
  options: any;
  //
  platformId = inject(PLATFORM_ID);
  //
  constructor(private cd: ChangeDetectorRef) {
    effect(() => {
      const nValues = this.values();
      if (nValues) {
        this.initChart(nValues);
      }
    });
  }

  initChart(kpis: EntryKPIDto) {
    if (!kpis) return;

    kpis = this.formatLabels(kpis);

    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const colorSaturation = 200;
      const greenText = `--p-green-${colorSaturation}`;
      const redText = `--p-red-${colorSaturation}`;

      const firstValue = kpis.datasets[0].data[0];
      // const lastValue = kpis.datasets[0].data[kpis.datasets[0].data.length - 1];

      const sum = kpis.datasets[0].data.reduce((a, b) => {
        return a + b;
      }, 0);

      const graphColor = sum > firstValue ? greenText : redText;
      // const textColorSecondary = documentStyle.getPropertyValue(
      //   '--p-text-muted-color',
      // );
      // const surfaceBorder = documentStyle.getPropertyValue(
      //   '--p-content-border-color',
      // );

      this.data = {
        labels: kpis.labels,
        datasets: [
          {
            label: kpis.datasets[0].label,
            data: kpis.datasets[0].data,
            fill: false,
            // backgroundColor: documentStyle.getPropertyValue(graphColor),
            borderColor: documentStyle.getPropertyValue(graphColor),

            // borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
            tension: 0.1,

            pointRadius: 0, // Esto oculta los puntos
          },
        ],
        options: {
          fill: false,
          interaction: {
            intersect: false,
          },
          radius: 0,
        },
      };

      this.options = {
        maintainAspectRatio: true,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            pointLabel: { display: false },
            ticks: { display: false },
            grid: { display: false },
            border: { display: false },
          },
          y: {
            pointLabel: { display: false },
            ticks: { display: false },
            grid: { display: false },
            border: { display: false },
          },
        },
        // scales: {
        //   x: {
        //     ticks: {
        //       color: textColorSecondary,
        //     },
        //     grid: {
        //       color: surfaceBorder,
        //       drawBorder: false,
        //       display: false,
        //     },
        //   },
        //   y: {
        //     ticks: {
        //       color: textColorSecondary,
        //     },
        //     grid: {
        //       display: false,
        //       color: surfaceBorder,
        //       drawBorder: false,
        //     },
        //   },
        // },
      };
      this.cd.markForCheck();
    }
  }

  private formatLabels(kpis: EntryKPIDto) {
    switch (kpis.period) {
      case 'TODAY':
        kpis.labels = kpis.labels.map(
          (f) => this.datePipe.transform(f, 'shortTime') as string,
        );
        break;
      case 'WEEK':
        kpis.labels = kpis.labels.map(
          (f) => this.datePipe.transform(f, 'EEEE cc') as string,
        );
        break;
      case 'YEAR':
        kpis.labels = kpis.labels.map((f) => {
          const today = new Date(Date.now());
          today.setMonth(Number(f));
          return this.datePipe.transform(today, 'LLL') as string;
        });
        break;

      default:
        break;
    }
    return kpis;
  }
}
