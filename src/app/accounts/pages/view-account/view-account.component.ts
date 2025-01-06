import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@core/bases';
import { Account, Entry } from '@core/models/api';
import { TableDto } from '@core/models/dtos';
import { PaginationMetaModel } from '@core/models/responses';
import { EntryService } from '@core/services';
import { Store } from '@ngrx/store';
import { selectAccountById } from '@store/selectors/account.selectors';
import { AppState } from '@store/states';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-account',
  standalone: false,

  templateUrl: './view-account.component.html',
  styleUrl: './view-account.component.scss',
})
export class ViewAccountComponent extends BaseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store$ = inject(Store<AppState>);
  private entryService = inject(EntryService);
  private accountId: string;
  table = new TableDto<Entry>({ showViewButton: false });
  //
  account$: Observable<Account | undefined>;
  ngOnInit(): void {
    this.createTable();
    this.accountId = this.route.snapshot.params['accountId'];
    this.account$ = this.store$.select(selectAccountById(this.accountId));
    this.getEntriesByAccount();
  }
  createTable(): void {
    this.table.columns = [
      { def: 'description', header: 'Descripcion' },
      { def: 'category', header: 'Categoria' },
      { def: 'type', header: 'Tipo' },
      { def: 'createdAt', header: 'Creado', pipeFormat: `date:medium` },
      { def: 'amount', header: 'Monto', pipeFormat: 'currency' },
    ];
  }

  getEntriesByAccount(): void {
    this.entryService
      .getEntriesByAccountId(this.accountId, this.table.meta)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.table.loadResponse(data);
      });
  }
  search(event: PaginationMetaModel): void {
    this.table.meta = event;
    this.getEntriesByAccount();
  }
}
