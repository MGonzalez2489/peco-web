import { DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationMetaDto, ResultListDto } from '@core/models/dtos';
import { EntrySearchDto, SearchDto } from '@core/models/dtos/search';
import { Entry } from '@core/models/entities';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { EntriesFilterFormComponent } from '../entries-filter-form/entries-filter-form.component';

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
    JsonPipe,
    //
    Dialog,
    EntriesFilterFormComponent,
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
  search: EventEmitter<SearchDto> = new EventEmitter<SearchDto>();

  searchObj = new SearchDto();
  //filter
  visible: boolean = false;

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
  showDialog() {
    this.visible = true;
  }
  filter(event: EntrySearchDto) {
    console.log('filter', event);
    this.search.emit(event);
  }
}
