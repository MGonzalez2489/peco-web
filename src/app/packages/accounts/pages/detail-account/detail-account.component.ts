import { AccountGraphComponent } from '@accounts/components/account-graph/account-graph.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResultListDto } from '@core/models/dtos';
import { EntrySearchDto, SearchDto } from '@core/models/dtos/search';
import { Account, Entry } from '@core/models/entities';
import { EntryListComponent, EntryTableComponent } from '@entries/components';
import { EntryKPIDto } from '@entries/dto';
import { EntryService } from '@entries/entry.service';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { BasePageComponent } from '@shared/components/base';
import { AccountTypeAvatarComponent } from '@shared/components/data';
import { selectAccountById } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabsModule } from 'primeng/tabs';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detail-account',
  imports: [
    EntryTableComponent,
    EntryListComponent,
    AccountGraphComponent,
    TabsModule,
    ButtonModule,
    PanelModule,
    AccountTypeAvatarComponent,
    TitleCasePipe,
    RouterLink,
    AmountComponent,
    DatePipe,
  ],
  templateUrl: './detail-account.component.html',
  styleUrl: './detail-account.component.scss',
})
export class DetailAccountComponent
  extends BasePageComponent
  implements OnInit
{
  private entryService = inject(EntryService);
  private search$ = new Subject<EntrySearchDto>();
  account = signal<Account | undefined>(undefined);
  entries = signal<ResultListDto<Entry> | undefined>(undefined);
  kpis = signal<EntryKPIDto | undefined>(undefined);
  filters = new EntrySearchDto();

  constructor() {
    super();
  }

  ngOnInit(): void {
    const accountId = this.getParamFromRoute('accountId');
    if (!accountId) {
      this.navigateBack();
    }

    this.search$
      .pipe(
        switchMap((searchDto) => this.entryService.search(searchDto)),
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.entries.set(data);
      });

    this.store$
      .select(selectAccountById(accountId))
      .pipe(takeUntil(this.destroy$))
      .subscribe((account) => {
        this.account.set(account);
        if (account) {
          this.onSearch(this.filters);
        }
      });
  }
  onSearch(search: SearchDto): void {
    this.filters = {
      ...this.filters,
      ...search,
      accountId: this.account()?.publicId,
    } as EntrySearchDto;

    this.search$.next(this.filters);
  }
}
