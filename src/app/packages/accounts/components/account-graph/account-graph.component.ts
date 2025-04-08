import { Component, Input, signal } from '@angular/core';
import { EntryKPIDto } from '@entries/dto';
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

  // private entryService = inject(EntryService);
  kpis = signal<EntryKPIDto | undefined>(undefined);
  accId = signal<string | undefined>(undefined);
}
