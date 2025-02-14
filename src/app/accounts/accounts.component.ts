import { Component, inject } from '@angular/core';
import { Account } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { Observable } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

import { ResultListDto } from '@core/models/dtos';
import { SearchDto } from '@core/models/dtos/search';
import { AccountService } from '@core/services';
//
import { InputSearchComponent } from '@shared/components/form/input-search/input-search.component';
import { selectIsBusy } from '@store/selectors';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccountTableComponent } from './components/account-table/account-table.component';

@Component({
  selector: 'app-accounts',
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RouterLink,
    InputSearchComponent,
    AsyncPipe,
    ProgressSpinnerModule,
    AccountTableComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  store$ = inject(Store<AppState>);
  accounts$ = new Observable<ResultListDto<Account>>();
  isBusy$ = this.store$.select(selectIsBusy);
  accountService = inject(AccountService);
  //
  filters = new SearchDto();
  constructor() {
    this.onSearch(this.filters);
  }

  onSearch(newFilters: SearchDto) {
    this.filters = newFilters;
    this.accounts$ = this.accountService.getAll(this.filters);
  }
  hintSearch(value: string | undefined) {
    this.filters.hint = value;
    this.onSearch(this.filters);
  }
}
