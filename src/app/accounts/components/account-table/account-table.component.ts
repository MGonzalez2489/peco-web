import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PaginationMetaDto, ResultListDto } from '@core/models/dtos';
import { SearchDto } from '@core/models/dtos/search';
import { Account } from '@core/models/entities';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-account-table',
  imports: [
    TableModule,
    PaginatorModule,
    TagModule,
    CurrencyPipe,
    CardModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    DatePipe,
    RouterLink,
    ProgressSpinnerModule,
    TitleCasePipe,
  ],
  templateUrl: './account-table.component.html',
  styleUrl: './account-table.component.scss',
})
export class AccountTableComponent {
  accountsSignal = signal<ResultListDto<Account> | undefined | null>(undefined);
  private filtersSignal = signal<SearchDto | undefined>(undefined);

  @Input()
  set accounts(value: ResultListDto<Account> | undefined | null) {
    this.accountsSignal.set(value);
  }

  @Input()
  set filters(value: SearchDto | undefined) {
    this.filtersSignal.set(value);
  }

  @Output()
  search = new EventEmitter<SearchDto>();

  onSort(event: SortEvent) {
    const filters = this.filtersSignal();
    if (filters) {
      filters.setSort(event);
      this.search.emit(filters);
    }
  }
  onPageChange(event: PaginatorState, pagination: PaginationMetaDto) {
    const filters = this.filtersSignal();
    if (filters) {
      filters.setPagination(event, pagination);
      this.search.emit(filters);
    }
  }
}
