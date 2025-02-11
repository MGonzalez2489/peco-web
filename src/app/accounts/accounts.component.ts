import { Component, inject, OnInit } from '@angular/core';
import { Account } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { Observable } from 'rxjs';

import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

import { PaginationMetaDto, ResultListDto } from '@core/models/dtos';
import { SearchDto } from '@core/models/dtos/search';
import { AccountService } from '@core/services';
import { SortEvent } from 'primeng/api';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
//
import { InputSearchComponent } from '@shared/components/form/input-search/input-search.component';

@Component({
  selector: 'app-accounts',
  imports: [
    TableModule,
    AsyncPipe,
    CurrencyPipe,
    CardModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    DatePipe,
    RouterLink,
    TagModule,
    PaginatorModule,
    InputSearchComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit {
  store$ = inject(Store<AppState>);
  accountService = inject(AccountService);
  //
  searchObj: SearchDto;
  accounts$ = new Observable<ResultListDto<Account>>();
  //search hint

  constructor() {
    this.searchObj = new SearchDto();
    this.searchObj.orderBy = 'name';
  }

  ngOnInit(): void {
    this.search();
  }
  search() {
    this.accounts$ = this.accountService.getAll(this.searchObj);
  }
  onPageChange(event: PaginatorState, pagination: PaginationMetaDto) {
    this.searchObj.setPagination(event, pagination);
    this.search();
  }
  sort(event: SortEvent) {
    console.log('se llamo el on sort', event);
    this.searchObj.setSort(event);
    this.search();
  }
  clearSearch() {
    delete this.searchObj.hint;
    this.search();
  }
}
