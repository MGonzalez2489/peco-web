import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ResultListDto } from '@core/models/dtos';
import { EntrySearchDto, SearchDto } from '@core/models/dtos/search';
import { Entry } from '@core/models/entities';
import { BasePageComponent } from '@shared/components/base';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { EntryListComponent, EntryTableComponent } from './components';
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
    EntryListComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss',
})
export class EntriesComponent extends BasePageComponent {
  private entryService = inject(EntryService);
  entries = signal<ResultListDto<Entry> | undefined>(undefined);
  filters = new EntrySearchDto();

  constructor() {
    super();

    effect(() => {
      this.period();
      this.onSearch(this.filters);
    });
  }

  onSearch(search: SearchDto): void {
    this.filters = search as EntrySearchDto;

    this.entryService.search(this.filters).subscribe((data) => {
      this.entries.set(data);
    });
  }
}
