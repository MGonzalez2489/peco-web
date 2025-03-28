import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResultListDto } from '@core/models/dtos';
import { Account, Entry } from '@core/models/entities';
import { EntrySearchDto } from '@entries/dto/search.dto';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { PaginatedComponent } from '@shared/components/base';
import { TablePlaceholderComponent } from '@shared/components/data';
import { SelectAccountComponent } from '@shared/components/form';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { EntryFilterDateComponent } from '../entry-filter-date/entry-filter-date.component';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-entry-table',
  imports: [
    TableModule,
    PaginatorModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    AmountComponent,
    DatePipe,
    TitleCasePipe,
    TablePlaceholderComponent,
    SelectAccountComponent,
    EntryFilterDateComponent,
    FormsModule,
    PanelModule,
  ],
  templateUrl: './entry-table.component.html',
  styleUrl: './entry-table.component.scss',
})
export class EntryTableComponent extends PaginatedComponent {
  @Input()
  entries: ResultListDto<Entry> | undefined;

  @Input()
  set account(value: Account | undefined) {
    if (value) {
      this.showAccountColumn = false;
    }
    this.selectedAccount.set(value);
  }

  override filters = new EntrySearchDto();

  showAccountColumn = true;

  protected selectedAccount = signal<Account | undefined>(undefined);
  constructor() {
    super();
    effect(() => {
      const nAccount = this.selectedAccount();
      if (nAccount && this.filters) {
        this.filters.accountId = nAccount.publicId;
        this.onSearch(this.filters!);
      }
    });
  }

  onSearch(filters: EntrySearchDto) {
    if (filters.fromDate && filters.toDate) this.search.emit(filters);
  }
}
