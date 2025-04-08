import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { SearchDto } from '@core/models/dtos/search';
import { SortEvent } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

@Component({ template: '' })
export class PaginatedComponent {
  protected isLoading = signal(false);

  @Input()
  filters: SearchDto | undefined;

  @Output()
  search = new EventEmitter<SearchDto>();

  @Input()
  set loadingData(value: boolean) {
    this.isLoading.set(value);
  }

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
        // this.emitValue();
      }
    }
  }
  protected onPageChange(event: PaginatorState) {
    if (this.filters) {
      this.filters.page = event.page! + 1;
      this.filters.take = event.rows!;
      // if (event.rows === pagination.itemCount) {
      //   this.filters.showAll = true;
      // }
      this.emitValue();
    }
  }
  private emitValue() {
    this.search.emit(this.filters);
  }
}
