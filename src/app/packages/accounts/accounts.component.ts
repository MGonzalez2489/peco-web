import { Component, inject, signal } from '@angular/core';
import { Account } from '@core/models/entities';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

import { ResultListDto } from '@core/models/dtos';
import { SearchDto } from '@core/models/dtos/search';
//
import { BasePage } from '@shared/components/base';
import { InputSearchComponent } from '@shared/components/form/input-search/input-search.component';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccountService } from './account.service';
import { AccountTableComponent } from './components/account-table/account-table.component';

@Component({
  selector: 'app-accounts',
  imports: [
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RouterLink,
    InputSearchComponent,
    ProgressSpinnerModule,
    AccountTableComponent,
    PanelModule,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent extends BasePage {
  private accountService = inject(AccountService);
  filters = new SearchDto();
  accounts = signal<ResultListDto<Account> | undefined>(undefined);

  constructor() {
    super();
    this.onSearch(this.filters);
  }
  onSearch(search: SearchDto) {
    this.accountService.getAll(search).subscribe((data) => {
      this.accounts.set(data);
    });
  }

  searchHint(hint: string | undefined) {
    this.filters.hint = hint;
    this.onSearch(this.filters);
  }
}
