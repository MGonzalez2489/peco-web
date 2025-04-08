import { Component, Input } from '@angular/core';
import { Chart } from '@core/models/app';
import { Account } from '@core/models/entities';
import { EntryKPIDto } from '@entries/dto';
import { ChartComponent } from '@shared/components/information';

@Component({
  selector: 'app-account-card-graph',
  imports: [ChartComponent],
  templateUrl: './account-card-graph.component.html',
  styleUrl: './account-card-graph.component.scss',
})
export class AccountCardGraphComponent {
  @Input()
  set account(value: Account | undefined) {
    if (value && value.kpis) {
      this.initChart(value.kpis);
    }
  }

  chart: Chart | undefined = undefined;

  initChart(kpis: EntryKPIDto | undefined) {
    if (!kpis) return;

    const nChart = new Chart();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const colorSaturation = 200;
    const greenText = `--p-green-${colorSaturation}`;
    const redText = `--p-red-${colorSaturation}`;

    const firstValue = kpis.datasets[0].data[0];

    const sum = kpis.datasets[0].data.reduce((a, b) => {
      return a + b;
    }, 0);

    const graphColor = sum > firstValue ? greenText : redText;

    nChart.data = {
      labels: kpis.labels,
      datasets: [
        {
          label: kpis.datasets[0].label,
          data: kpis.datasets[0].data,
          fill: false,
          borderColor: documentStyle.getPropertyValue(graphColor),
          tension: 0.1,
          pointRadius: 0, // Esto oculta los puntos
        },
      ],
    };

    nChart.options = {
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
    };

    this.chart = nChart;
  }
}
