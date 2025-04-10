import { Component, effect, inject, signal } from '@angular/core';
import { Account } from '@core/models/entities';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

import { ResultListDto } from '@core/models/dtos';
import { SearchDto } from '@core/models/dtos/search';
//
import { BasePage } from '@shared/components/base';
import { InputSearchComponent } from '@shared/components/form/input-search/input-search.component';
import { MenuItem } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpeedDialModule } from 'primeng/speeddial';
import { AccountService } from './account.service';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { AccountSearchDto } from './dto';

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
    SpeedDialModule,
    AccountCardComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent extends BasePage {
  private accountService = inject(AccountService);
  private router = inject(Router);
  filters = new AccountSearchDto();
  accounts = signal<ResultListDto<Account> | undefined>(undefined);
  dItems: MenuItem[] = [
    {
      label: 'Nueva Cuenta',
      icon: 'pi pi-plus',
      command: () => {
        this.router.navigate(['/accounts/new']);
      },
    },
  ];

  constructor() {
    super();
    effect(() => {
      this.period();
      this.filters.showAll = !this.pageData().filterByPeriod;

      this.onSearch(this.filters);
    });
  }
  onSearch(search: SearchDto) {
    this.filters = search as AccountSearchDto;
    this.accountService.getAll(this.filters).subscribe((data) => {
      this.accounts.set(data);
    });
  }

  searchHint(hint: string | undefined) {
    this.filters.hint = hint;
    this.onSearch(this.filters);
  }
}
