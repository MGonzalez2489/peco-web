import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationMetaDto } from '@core/models/dtos';
import { SearchDto } from '@core/models/dtos/search';
import { SortEvent } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

@Component({ template: '' })
export class PaginatedComponent {
  @Input()
  filters: SearchDto | undefined;

  @Output()
  search = new EventEmitter<SearchDto>();

  onSort(event: SortEvent) {
    if (this.filters) {
      const newOrder = event.order === 1 ? 'ASC' : 'DESC';
      if (
        this.filters.orderBy != event.field ||
        this.filters.order != newOrder
      ) {
        this.filters.orderBy = event.field;
        this.filters.order = newOrder;
        this.emitValue();
      }
    }
  }
  onPageChange(event: PaginatorState, pagination: PaginationMetaDto) {
    if (this.filters) {
      this.filters.page = event.page! + 1;
      this.filters.take = event.rows!;
      if (event.rows === pagination.itemCount) {
        this.filters.showAll = true;
      }
      this.emitValue();
    }
  }
  private emitValue() {
    this.search.emit(this.filters);
  }
}
