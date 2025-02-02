import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResultListDto } from '@core/models/dtos';
import { Entry } from '@core/models/entities';
import { EntryService } from '@core/services';
import { BaseComponent } from '@shared/components';
import { EntryTableComponent } from '@shared/components/entries';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entries',
  imports: [
    CardModule,
    ButtonModule,
    RouterLink,
    TableModule,
    CurrencyPipe,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    EntryTableComponent,
    AsyncPipe,
  ],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss',
})
export class EntriesComponent extends BaseComponent {
  entryService = inject(EntryService);
  entries$ = new Observable<ResultListDto<Entry> | undefined>();
  constructor() {
    super();
    this.search();
  }

  search(): void {
    this.entries$ = this.entryService.getAll();
  }
}
