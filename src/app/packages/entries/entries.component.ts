import { Component, effect, inject, signal } from '@angular/core';
import { ResultListDto } from '@core/models/dtos';
import { EntrySearchDto } from '@core/models/dtos/search';
import { Entry } from '@core/models/entities';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { EntryService } from './entry.service';
import { EntryTableComponent } from './components';

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
  ],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss',
})
export class EntriesComponent {
  private entryService = inject(EntryService);
  entries = signal<ResultListDto<Entry> | null>(null);
  filters = signal<EntrySearchDto | undefined>(undefined);

  constructor() {
    effect(() => {
      const f = this.filters();
      if (f)
        this.entryService.search(f).subscribe((r) => {
          this.entries.set(r);
        });
    });
  }

  search(search?: EntrySearchDto): void {
    this.filters.set(search);
  }
}
