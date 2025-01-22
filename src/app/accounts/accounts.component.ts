import { Component, inject } from '@angular/core';
import { Account } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectAccounts } from '@store/selectors';
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
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  store$ = inject(Store<AppState>);
  accounts$: Observable<Account[]>;
  constructor() {
    this.accounts$ = this.store$.select(selectAccounts);
  }
}
