import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ResultListDto } from '@core/models/dtos';
import { EntrySearchDto } from '@core/models/dtos/search';
import { Account, Entry } from '@core/models/entities';
import { BasePage } from '@shared/components/base';
import { SelectAccountComponent } from '@shared/components/form';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { EntryFilterDateComponent, EntryTableComponent } from './components';
import { EntryService } from './entry.service';

@Component({
  selector: 'app-entries',
  imports: [
    CardModule,
    ButtonModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    EntryTableComponent,
    SelectAccountComponent,
    EntryFilterDateComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss',
})
export class EntriesComponent extends BasePage {
  private entryService = inject(EntryService);
  entries = signal<ResultListDto<Entry> | undefined>(undefined);
  filters = new EntrySearchDto();
  account = signal<Account | undefined>(undefined);

  constructor() {
    super();
    this.onSearch(this.filters);

    effect(() => {
      const nAcc = this.account();
      if (nAcc) {
        this.filters.accountId = nAcc.publicId ? nAcc.publicId : undefined;
        this.onSearch(this.filters);
      }
    });
  }

  onSearch(search: EntrySearchDto): void {
    if (!search.toDate || !search.fromDate) return;

    this.entryService.search(search).subscribe((data) => {
      this.entries.set(data);
    });
  }
}
