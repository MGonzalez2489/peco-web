import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetAllAccountsAction } from '@store/actions/account.action';
import { selectAccounts } from '@store/selectors/account.selectors';
import { AppState } from '@store/states';

@Component({
  selector: 'app-account-list',
  standalone: false,

  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss',
})
export class AccountListComponent {
  private store$ = inject(Store<AppState>);
  private router = inject(Router);
  accounts$ = this.store$.select(selectAccounts);
  constructor() {
    this.store$.dispatch(GetAllAccountsAction());
  }
  addAccount(): void {
    this.router.navigate(['/accounts/add-account']);
  }
}
