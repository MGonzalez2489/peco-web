import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input()
  accounts: ResultListDto<Account> | undefined | null;

  @Input()
  filters: SearchDto | undefined;

  @Output()
  search = new EventEmitter<SearchDto>();

  onSort(event: SortEvent) {
    this.filters?.setSort(event);
    this.emit();
  }

  onPageChange(event: PaginatorState, pagination: PaginationMetaDto) {
    this.filters?.setPagination(event, pagination);
    this.emit();
  }

  private emit(): void {
    this.search.emit(this.filters!);
  }
}
