import { Component, inject, OnInit } from '@angular/core';
import { Account } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { Observable } from 'rxjs';

import { TableModule } from 'primeng/table';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { TagModule } from 'primeng/tag';
import { AccountService } from '@core/services';
import { PaginationMetaDto, ResultListDto } from '@core/models/dtos';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SearchDto } from '@core/models/dtos/search';
import { SortEvent } from 'primeng/api';
//
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

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
    JsonPipe,
    //
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
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
  handleSearch() {
    console.log('search');
    if (this.searchObj.hint && this.searchObj.hint.length % 4 === 0) {
      this.search();
    } else if (this.searchObj.hint === '') {
      this.clearSearch();
    }
  }
}
