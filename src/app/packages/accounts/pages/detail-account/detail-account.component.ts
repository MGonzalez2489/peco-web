import { AccountGraphComponent } from '@accounts/components/account-graph/account-graph.component';
import { TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ResultListDto } from '@core/models/dtos';
import { EntrySearchDto, SearchDto } from '@core/models/dtos/search';
import { Account, Entry } from '@core/models/entities';
import { EntryTableComponent } from '@entries/components';
import { EntryKPIDto } from '@entries/dto';
import { EntryService } from '@entries/entry.service';
import { BasePageComponent } from '@shared/components/base';
import { AccountTypeAvatarComponent } from '@shared/components/data';
import { selectAccountById } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabsModule } from 'primeng/tabs';

const primeSources = [EntryTableComponent];

@Component({
  selector: 'app-detail-account',
  imports: [
    ...primeSources,
    AccountGraphComponent,
    TabsModule,
    ButtonModule,
    PanelModule,
    AccountTypeAvatarComponent,
    TitleCasePipe,
    RouterLink,
  ],
  templateUrl: './detail-account.component.html',
  styleUrl: './detail-account.component.scss',
})
export class DetailAccountComponent extends BasePageComponent {
  private entryService = inject(EntryService);

  account = signal<Account | undefined>(undefined);
  entries = signal<ResultListDto<Entry> | undefined>(undefined);
  kpis = signal<EntryKPIDto | undefined>(undefined);
  filters = new EntrySearchDto();

  constructor() {
    super();
    const accountId = this.getParamFromRoute('accountId');
    if (!accountId) {
      this.navigateBack();
    }
    this.account.set(
      toSignal(this.store$.select(selectAccountById(accountId)))(),
    );
    this.filters.accountId = accountId;
  }
  onSearch(search: SearchDto): void {
    this.filters = search as EntrySearchDto;

    this.entryService.search(search as EntrySearchDto).subscribe((data) => {
      console.log('data', data);
      this.entries.set(data);
    });
  }

  searchKPIs() {
    console.log('entro aqui');
    this.entryService.getKPIs(this.period()!).subscribe((data) => {
      const acc = Object.assign({}, this.account());
      acc!.kpis = data.data;
      this.account.set(acc);
      this.kpis.set(data.data);
    });
  }
}
