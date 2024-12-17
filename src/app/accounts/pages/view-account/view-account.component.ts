import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Entry } from '@core/models/api';
import { TableDto } from '@core/models/dtos';
import { PaginationMetaModel } from '@core/models/responses';
import { EntryService } from '@core/services';
import { Store } from '@ngrx/store';
import { selectAccountById } from '@store/selectors/account.selectors';
import { AppState } from '@store/states';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-account',
  standalone: false,

  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.scss',
})
export class ViewAccountComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store$ = inject(Store<AppState>);
  private entryService = inject(EntryService);
  private accountId: string;
  table: TableDto<Entry> = {
    columns: [
      { def: 'description', header: 'Descripcion' },
      { def: 'createdAt', header: 'Creado', pipeFormat: `date:medium` },
      { def: 'type', header: 'Tipo' },
      { def: 'amount', header: 'Monto', pipeFormat: 'currency' },
    ],
    dataSource: [],
  };
  //
  account$: Observable<Account | undefined> = new Observable<
    Account | undefined
  >();

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['accountId'];
    this.account$ = this.store$.select(selectAccountById(this.accountId));
    this.getEntriesByAccount();
  }

  getEntriesByAccount() {
    this.entryService
      .getEntriesByAccountId(this.accountId, this.table.meta)
      .subscribe((data) => {
        this.table.dataSource = data.data;
        this.table.meta = data.meta;
      });
  }
  search(event: PaginationMetaModel) {
    this.table.meta = event;
    this.getEntriesByAccount();
  }
}
