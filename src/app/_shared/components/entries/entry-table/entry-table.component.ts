import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationMetaDto, ResultListDto, SearchDto } from '@core/models/dtos';
import { Entry } from '@core/models/entities';
import { AmountComponent } from '@shared/components/amount/amount.component';
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
  ],
  templateUrl: './entry-table.component.html',
  styleUrl: './entry-table.component.scss',
})
export class EntryTableComponent implements OnInit {
  @Input()
  entries: ResultListDto<Entry> = new ResultListDto();

  @Input()
  showAccountColumn: boolean = false;

  @Output()
  search: EventEmitter<SearchDto> = new EventEmitter<SearchDto>();
  ngOnInit(): void {}

  onPageChange(event: PaginatorState, pagination: PaginationMetaDto): void {
    pagination.page = event.page! + 1;
    pagination.take = event.rows!;
    this.search.emit(new SearchDto(pagination));
  }
}
