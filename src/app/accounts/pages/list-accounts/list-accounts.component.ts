import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/bases';
import { Account } from '@core/models/api';
import { TableDto } from '@core/models/dtos';
import { PaginationMetaModel } from '@core/models/responses';
import { AccountService } from '@core/services';
import { Store } from '@ngrx/store';
import { selectAccounts } from '@store/selectors/account.selectors';
import { AppState } from '@store/states';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-accounts',
  standalone: false,
  templateUrl: './list-accounts.component.html',
  styleUrl: './list-accounts.component.scss',
})
export class ListAccountsComponent extends BaseComponent implements OnInit {
  accountService = inject(AccountService);
  store$ = inject(Store<AppState>);
  table = new TableDto<Account>();

  ngOnInit(): void {
    this.createSearchTable();
    //modify the search to be triggered only by filter
    // this.search(this.table.meta);
    this.store$
      .select(selectAccounts)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.table.dataSource = data;
      });
  }

  createSearchTable() {
    this.table.columns = [
      { def: 'name', header: 'Nombre', pipeFormat: 'titlecase' },
      { def: 'isDefault', header: 'Default', type: 'boolean' },
      { def: 'balance', header: 'Balance', pipeFormat: 'currency' },
    ];
  }

  search(event?: PaginationMetaModel) {
    if (event) this.table.meta = event;
    this.accountService
      .getAll(this.table.meta)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((accounts) => {
        this.table.loadResponse(accounts);
      });
  }
}
