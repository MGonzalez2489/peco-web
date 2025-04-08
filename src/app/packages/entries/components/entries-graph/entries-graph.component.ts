/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { EntryKPIDto } from '@entries/dto';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-entries-graph',
  imports: [PanelModule, ChartModule],
  templateUrl: './entries-graph.component.html',
  providers: [DatePipe],
  styleUrl: './entries-graph.component.scss',
})
export class EntriesGraphComponent {
  @Input()
  set kpis(value: EntryKPIDto) {
    this.initChart(value);
  }

  datePipe = inject(DatePipe);

  @Input()
  isLoading = false;
  data: any;
  //
  options: any;
  //
  platformId = inject(PLATFORM_ID);
  //
  constructor(private cd: ChangeDetectorRef) {}
  //
  // themeEffect = effect(() => {
  //   // if (this.configService.transitionComplete()) {
  //   //   if (this.designerService.preset()) {
  //   //     this.initChart();
  //   //   }
  //   // }
  // });
  //
  // ngOnInit() {
  //   this.initChart();
  // }
  //
  initChart(kpis: EntryKPIDto) {
    if (!kpis) return;

    kpis = this.formatLabels(kpis);

    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
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
            borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
            tension: 0.4,
          },
          // {
          //   label: 'Second Dataset',
          //   data: [28, 48, 40, 19, 86, 27, 90],
          //   fill: false,
          //   borderColor: documentStyle.getPropertyValue('--p-gray-500'),
          //   tension: 0.4,
          // },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: { display: false },
            grid: { display: false },
            border: { display: false },
          },
          y: {
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
