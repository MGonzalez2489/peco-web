import { Component, effect, inject, Input, signal } from '@angular/core';
import { EntryKPIDto } from '@entries/dto';
import { EntryService } from '@entries/entry.service';
import { BasePage } from '@shared/components/base';
import { GraphComponent } from '@shared/components/information';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-account-graph',
  imports: [ChartModule, GraphComponent],
  templateUrl: './account-graph.component.html',
  styleUrl: './account-graph.component.scss',
})
export class AccountGraphComponent extends BasePage {
  @Input()
  set accountId(value: string) {
    this.accId.set(value);
  }

  private entryService = inject(EntryService);
  kpis = signal<EntryKPIDto | undefined>(undefined);
  accId = signal<string | undefined>(undefined);

  constructor() {
    super();
    effect(() => {
      const newPeriod = this.period();
      const account = this.accId();
      if (newPeriod && account) {
        this.searchKPIs();
      }
    });
  }

  searchKPIs() {
    const nFilters = { ...this.period()!, accountId: this.accId()! };
    this.entryService.getKPIs(nFilters).subscribe((data) => {
      this.kpis.set(data.data);
    });
  }

  ///////////////////////////////////////
}
