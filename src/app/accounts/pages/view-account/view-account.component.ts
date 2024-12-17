import { Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Account, Entry } from '@core/models/api';
import { PaginationMetaModel, ResultListModel } from '@core/models/responses';
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
  //table
  // entries: Entry[] = [];
  entries: ResultListModel<Entry>;
  displayedColumns: string[] = ['description', 'created', 'type', 'amount'];

  //
  account$: Observable<Account | undefined> = new Observable<
    Account | undefined
  >();

  ngOnInit(): void {
    const accountId = this.route.snapshot.params['accountId'];
    this.account$ = this.store$.select(selectAccountById(accountId));
    this.getEntriesByAccount(accountId);
  }

  getEntriesByAccount(accountId: string, pageOptions?: PaginationMetaModel) {
    this.entryService
      .getEntriesByAccountId(accountId, pageOptions)
      .subscribe((data) => {
        this.entries = data;
        console.log('entries', this.entries);
      });
  }
  handlePageEvent(e: PageEvent, accountId: string) {
    console.log('e', e);
    this.entries.meta.take = e.pageSize;
    this.entries.meta.page = e.pageIndex;
    this.getEntriesByAccount(accountId, this.entries.meta);
  }
}
