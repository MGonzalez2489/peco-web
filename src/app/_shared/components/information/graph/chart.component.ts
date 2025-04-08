import { DatePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Chart } from '@core/models/app';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart',
  imports: [ChartModule],
  templateUrl: './',
  providers: [DatePipe],
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  @Input()
  set chart(value: Chart) {
    this.chartS.set(value);
  }

  chartS = signal<Chart | undefined>(undefined);
}

// export class GraphComponent {
//   @Input()
//   set kpi(value: EntryKPIDto) {
//     this.values.set(value);
//   }
//
//   values = signal<EntryKPIDto | undefined>(undefined);
//
//   datePipe = inject(DatePipe);
//
//   data: any;
//   //
//   options: any;
//   //
//   platformId = inject(PLATFORM_ID);
//   //
//   constructor(private cd: ChangeDetectorRef) {
//     effect(() => {
//       const nValues = this.values();
//       if (nValues) {
//         const localKpis = this.formatLabels(nValues);
//
//         this.initChart(localKpis);
//       }
//     });
//   }
//
//   initChart(kpis: EntryKPIDto) {
//     if (!kpis) return;
//
//     if (isPlatformBrowser(this.platformId)) {
//       const documentStyle = getComputedStyle(document.documentElement);
//       const textColor = documentStyle.getPropertyValue('--p-text-color');
//       const colorSaturation = 200;
//       const greenText = `--p-green-${colorSaturation}`;
//       const redText = `--p-red-${colorSaturation}`;
//
//       const firstValue = kpis.datasets[0].data[0];
//       // const lastValue = kpis.datasets[0].data[kpis.datasets[0].data.length - 1];
//
//       const sum = kpis.datasets[0].data.reduce((a, b) => {
//         return a + b;
//       }, 0);
//
//       const graphColor = sum > firstValue ? greenText : redText;
//       // const textColorSecondary = documentStyle.getPropertyValue(
//       //   '--p-text-muted-color',
//       // );
//       // const surfaceBorder = documentStyle.getPropertyValue(
//       //   '--p-content-border-color',
//       // );
//
//       this.data = {
//         labels: kpis.labels,
//         datasets: [
//           {
//             label: kpis.datasets[0].label,
//             data: kpis.datasets[0].data,
//             fill: false,
//             // backgroundColor: documentStyle.getPropertyValue(graphColor),
//             borderColor: documentStyle.getPropertyValue(graphColor),
//
//             // borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
//             tension: 0.1,
//
//             pointRadius: 0, // Esto oculta los puntos
//           },
//         ],
//       };
//
//       this.options = {
//         maintainAspectRatio: true,
//         aspectRatio: 0.6,
//         plugins: {
//           legend: {
//             display: false,
//             labels: {
//               color: textColor,
//             },
//           },
//         },
//         scales: {
//           x: {
//             pointLabel: { display: false },
//             ticks: { display: false },
//             grid: { display: false },
//             border: { display: false },
//           },
//           y: {
//             pointLabel: { display: false },
//             ticks: { display: false },
//             grid: { display: false },
//             border: { display: false },
//           },
//         },
//         // scales: {
//         //   x: {
//         //     ticks: {
//         //       color: textColorSecondary,
//         //     },
//         //     grid: {
//         //       color: surfaceBorder,
//         //       drawBorder: false,
//         //       display: false,
//         //     },
//         //   },
//         //   y: {
//         //     ticks: {
//         //       color: textColorSecondary,
//         //     },
//         //     grid: {
//         //       display: false,
//         //       color: surfaceBorder,
//         //       drawBorder: false,
//         //     },
//         //   },
//         // },
//       };
//       // console.log('grap', JSON.stringify(this.data));
//       // console.log('options', JSON.stringify(this.options));
//       this.cd.markForCheck();
//     }
//   }
//
//   private formatLabels(kpis: EntryKPIDto) {
//     const nObject = Object.assign({}, kpis);
//     switch (kpis.period) {
//       case 'TODAY':
//         nObject.labels = kpis.labels.map(
//           (f) => this.datePipe.transform(f, 'shortTime') as string,
//         );
//         break;
//       case 'WEEK':
//         nObject.labels = kpis.labels.map(
//           (f) => this.datePipe.transform(f, 'EEEE cc') as string,
//         );
//         break;
//       case 'YEAR':
//         nObject.labels = kpis.labels.map((f) => {
//           const today = new Date(Date.now());
//           today.setMonth(Number(f));
//           return this.datePipe.transform(today, 'LLL') as string;
//         });
//         break;
//
//       default:
//         break;
//     }
//     return nObject;
//   }
// }
