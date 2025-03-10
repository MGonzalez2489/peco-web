import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ResultListDto } from '@core/models/dtos';
import { EntrySearchDto } from '@core/models/dtos/search';
import { Account, Entry } from '@core/models/entities';
import { EntryService } from '@core/services';
import { Store } from '@ngrx/store';
import { EntryTableComponent } from '@shared/components/entries';
import { AppState } from '@store/reducers';
import { selectAccountById } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { AccountCardComponent } from '../../components/account-card/account-card.component';

const primeSources = [
  EntryTableComponent,
  CardModule,
  ButtonModule,
  TabsModule,
];

@Component({
  selector: 'app-detail-account',
  imports: [AccountCardComponent, ...primeSources],
  templateUrl: './detail-account.component.html',
  styleUrl: './detail-account.component.scss',
})
export class DetailAccountComponent {
  private activatedRoute = inject(ActivatedRoute);
  private store$ = inject(Store<AppState>);
  private entriesService = inject(EntryService);

  account = signal<Account | undefined>(undefined);
  entries = signal<ResultListDto<Entry> | undefined>(undefined);
  private searchSignal = signal<EntrySearchDto | undefined>(undefined);

  constructor() {
    const accId = this.activatedRoute.snapshot.params['accountId'];

    const search = this.searchSignal();
    const newSearch = Object.assign({}, search);
    newSearch.accountId = accId;
    this.searchSignal.set(search);
    this.account.set(toSignal(this.store$.select(selectAccountById(accId)))());

    effect(() => {
      const search = this.searchSignal();

      if (search) {
        this.entriesService.search(search).subscribe((data) => {
          this.entries.set(data);
        });
      }
    });
  }

  searchEntries(accountId: string, search?: EntrySearchDto) {
    const newSearch = Object.assign({}, search);
    newSearch.accountId = accountId;

    this.searchSignal.set(newSearch);
  }

  //TODO:
  //agregar boton para editar/borrar
  //widtgets con graficas
}
