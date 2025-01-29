import { Component, inject, OnInit } from '@angular/core';
import { Account } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { Observable } from 'rxjs';

import { TableModule } from 'primeng/table';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
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
import {
  PaginationMetaDto,
  PagMetaReqDto,
  ResultListDto,
} from '@core/models/dtos';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-accounts',
  imports: [
    TableModule,
    AsyncPipe,
    CurrencyPipe,
    CardModule,
    IconField,
    InputIcon,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    DatePipe,
    RouterLink,
    TagModule,
    PaginatorModule,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit {
  store$ = inject(Store<AppState>);
  accountService = inject(AccountService);
  accounts$ = new Observable<ResultListDto<Account>>();
  constructor() {}

  //aquyi
  ngOnInit(): void {
    this.search();
  }
  search(pagination?: PagMetaReqDto) {
    this.accounts$ = this.accountService.getAll(pagination);
  }
  onPageChange(event: PaginatorState, pagination: PaginationMetaDto) {
    pagination.page = event.page! + 1;
    pagination.take = event.rows!;

    this.search(new PagMetaReqDto(pagination));
  }
}
