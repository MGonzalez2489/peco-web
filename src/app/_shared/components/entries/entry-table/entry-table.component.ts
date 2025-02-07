import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PaginationMetaDto, ResultListDto } from '@core/models/dtos';
import { EntrySearchDto } from '@core/models/dtos/search';
import { Entry } from '@core/models/entities';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { EntryFilterDateComponent } from '../entry-filter-date/entry-filter-date.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectAccounts } from '@store/selectors';
import { SelectModule } from 'primeng/select';
import { map } from 'rxjs';
import { Router } from '@angular/router';

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
    AsyncPipe,
  ],
  templateUrl: './entry-table.component.html',
  styleUrl: './entry-table.component.scss',
})
export class EntryTableComponent {
  @Input()
  entries: ResultListDto<Entry> | null;

  @Input()
  showAccountColumn: boolean = false;

  @Output()
  search: EventEmitter<EntrySearchDto> = new EventEmitter<EntrySearchDto>();

  //
  searchObj = new EntrySearchDto();
  store$ = inject(Store<AppState>);
  router = inject(Router);
  accounts$ = this.store$.select(selectAccounts).pipe(
    map((options) => [
      {
        name: 'Todas',
        publicId: undefined,
      },
      ...options,
    ]),
  );

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
    if (this.searchObj.accountId) {
      createEntryUrl += `/${this.searchObj.accountId}`;
    }
    this.router.navigateByUrl(createEntryUrl);
  }
}
