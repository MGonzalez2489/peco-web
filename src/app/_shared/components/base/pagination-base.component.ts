import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchDto } from '@core/models/dtos/search';
import { SortEvent } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { Base } from './base-container.component';

@Component({ template: '' })
export class PaginatedComponent extends Base {
  @Input()
  filters: SearchDto | undefined;

  @Output()
  search = new EventEmitter<SearchDto>();

  protected onSort(event: SortEvent) {
    if (this.filters) {
      const newOrder = event.order === 1 ? 'ASC' : 'DESC';
      if (
        this.filters.orderBy != event.field ||
        this.filters.order != newOrder
      ) {
        this.filters.orderBy = event.field;
        this.filters.order = newOrder;
        this.search.emit(this.filters);
      }
    }
  }
  protected onPageChange(event: PaginatorState) {
    if (this.filters) {
      this.filters.page = event.page! + 1;
      this.filters.take = event.rows!;

      this.emitValue();
    }
  }
  private emitValue() {
    this.search.emit(this.filters);
  }
}
