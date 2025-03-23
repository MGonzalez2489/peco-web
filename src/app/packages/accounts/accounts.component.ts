import { Component, effect, inject, signal } from '@angular/core';
import { Account } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

import { ResultListDto } from '@core/models/dtos';
import { SearchDto } from '@core/models/dtos/search';
//
import { toSignal } from '@angular/core/rxjs-interop';
import { InputSearchComponent } from '@shared/components/form/input-search/input-search.component';
import { selectIsBusy } from '@store/selectors';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccountService } from './account.service';
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
    ProgressSpinnerModule,
    AccountTableComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  private store$ = inject(Store<AppState>);
  private accountService = inject(AccountService);
  filterSignal = signal(new SearchDto());

  isBusy = toSignal(this.store$.select(selectIsBusy));
  accounts = signal<ResultListDto<Account> | undefined>(undefined);

  constructor() {
    effect(() => {
      const filters = this.filterSignal();

      this.accountService.getAll(filters).subscribe((data) => {
        this.accounts.set(data);
      });
    });
  }

  onSearch(newFilters: SearchDto) {
    this.filterSignal.set(newFilters);
  }
  hintSearch(value: string | undefined) {
    const filters = this.filterSignal();
    const newFilters = Object.assign({}, filters);
    newFilters.hint = value;
    this.filterSignal.set(newFilters);
  }
}
