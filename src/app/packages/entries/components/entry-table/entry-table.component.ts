import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationMetaDto, ResultListDto } from '@core/models/dtos';
import { EntrySearchDto } from '@core/models/dtos/search';
import { Entry } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { SelectAccountComponent } from '@shared/components/form';
import { AppState } from '@store/reducers';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { EntryFilterDateComponent } from '../entry-filter-date/entry-filter-date.component';

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
    //
    EntryFilterDateComponent,
    FormsModule,
    SelectModule,
    CardModule,
    SelectAccountComponent,
  ],
  templateUrl: './entry-table.component.html',
  styleUrl: './entry-table.component.scss',
})
export class EntryTableComponent {
  @Input()
  entries: ResultListDto<Entry> | null = null;

  @Input()
  accountId: string | undefined;

  @Input()
  showAccountColumn = false;

  @Output()
  search: EventEmitter<EntrySearchDto> = new EventEmitter<EntrySearchDto>();

  //
  searchObj = new EntrySearchDto();
  store$ = inject(Store<AppState>);
  router = inject(Router);

  onPageChange(
    event: PaginatorState,
    currentPagination: PaginationMetaDto,
  ): void {
    this.searchObj.setPagination(event, currentPagination);
    this.search.emit(this.searchObj);
  }
  sort(event: SortEvent) {
    this.searchObj.setSort(event);
    this.search.emit(this.searchObj);
  }
  filter(event: EntrySearchDto) {
    this.search.emit(event);
  }
  newEntry() {
    let createEntryUrl = '/entries/new';
    if (this.accountId) {
      createEntryUrl += `/${this.accountId}`;
    }
    this.router.navigateByUrl(createEntryUrl);
  }
}
