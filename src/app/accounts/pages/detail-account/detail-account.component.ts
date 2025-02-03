import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Account, Entry } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectAccountById } from '@store/selectors';
import { AccountCardComponent } from '../../components/account-card/account-card.component';
import { Observable } from 'rxjs';
import { EntryService } from '@core/services';
import { ResultListDto, SearchDto } from '@core/models/dtos';
import { EntryTableComponent } from '@shared/components/entries';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

const primeSources = [EntryTableComponent, CardModule, ButtonModule];

@Component({
  selector: 'app-detail-account',
  imports: [AsyncPipe, AccountCardComponent, ...primeSources, RouterLink],
  templateUrl: './detail-account.component.html',
  styleUrl: './detail-account.component.scss',
})
export class DetailAccountComponent {
  private activatedRoute = inject(ActivatedRoute);
  private store$ = inject(Store<AppState>);
  private entriesService = inject(EntryService);
  //
  account$: Observable<Account | undefined>;
  entries$ = new Observable<ResultListDto<Entry> | undefined>();
  constructor() {
    const accId = this.activatedRoute.snapshot.params['accountId'];
    if (!accId) {
      alert('he que pedo no hay accId');
    }

    this.account$ = this.store$.select(selectAccountById(accId));
    this.searchEntries(accId);
  }
  searchEntries(accountId: string, search?: SearchDto) {
    this.entries$ = this.entriesService.getEntriesByAccountId(
      accountId,
      search,
    );
  }

  //TODO:
  //agregar tabla de registros para cuenta especifica con filtros
  //agregar boton para editar/borrar
  //widtgets con graficas
}
