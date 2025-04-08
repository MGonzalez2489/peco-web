import { AccountCardComponent } from '@accounts/components/account-card/account-card.component';
import { AccountGraphComponent } from '@accounts/components/account-graph/account-graph.component';
import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ResultListDto } from '@core/models/dtos';
import { EntrySearchDto, SearchDto } from '@core/models/dtos/search';
import { Account, Entry } from '@core/models/entities';
import { EntryTableComponent } from '@entries/components';
import { EntryKPIDto } from '@entries/dto';
import { EntryService } from '@entries/entry.service';
import { BasePage } from '@shared/components/base';
import { selectAccountById } from '@store/selectors';
import { TabsModule } from 'primeng/tabs';

const primeSources = [EntryTableComponent];

@Component({
  selector: 'app-detail-account',
  imports: [
    AccountCardComponent,
    ...primeSources,
    AccountGraphComponent,
    TabsModule,
    JsonPipe,
  ],
  templateUrl: './detail-account.component.html',
  styleUrl: './detail-account.component.scss',
})
export class DetailAccountComponent extends BasePage {
  private activatedRoute = inject(ActivatedRoute);
  private entryService = inject(EntryService);

  account = signal<Account | undefined>(undefined);
  entries = signal<ResultListDto<Entry> | undefined>(undefined);
  kpis = signal<EntryKPIDto | undefined>(undefined);
  filters = new EntrySearchDto();

  constructor() {
    super();
    const accId = this.activatedRoute.snapshot.params['accountId'];
    this.account.set(toSignal(this.store$.select(selectAccountById(accId)))());
    this.filters.accountId = accId;
    effect(() => {
      this.searchKPIs();
      this.onSearch(this.filters);
    });
  }
  onSearch(search: SearchDto): void {
    this.filters = search as EntrySearchDto;

    this.entryService.search(search as EntrySearchDto).subscribe((data) => {
      this.entries.set(data);
    });
  }

  searchKPIs() {
    this.entryService.getKPIs(this.period()!).subscribe((data) => {
      this.kpis.set(data.data);
    });
  }
}
