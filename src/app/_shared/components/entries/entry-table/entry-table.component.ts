import { DatePipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResultListDto, SearchDto } from '@core/models/dtos';
import { Entry } from '@core/models/entities';
import { AmountComponent } from '@shared/components/amount/amount.component';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

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
  ],
  templateUrl: './entry-table.component.html',
  styleUrl: './entry-table.component.scss',
})
export class EntryTableComponent implements OnInit {
  @Input()
  entries: ResultListDto<Entry> | null;

  @Input()
  showAccountColumn: boolean = false;

  @Output()
  search: EventEmitter<SearchDto> = new EventEmitter<SearchDto>();

  //
  searchObj = new SearchDto();
  constructor() {}
  ngOnInit(): void {}

  onPageChange(event: PaginatorState): void {
    this.searchObj.page = event.page! + 1;
    this.searchObj.take = event.rows!;
    this.search.emit(this.searchObj);
  }
  sort(event: SortEvent) {
    const newOrder = event.order === 1 ? 'ASC' : 'DESC';
    if (
      this.searchObj.orderBy != event.field ||
      this.searchObj.order != newOrder
    ) {
      this.searchObj.orderBy = event.field;
      this.searchObj.order = newOrder;
      this.search.emit(this.searchObj);
    }
  }
}
