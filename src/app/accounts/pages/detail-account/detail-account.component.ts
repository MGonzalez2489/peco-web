import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { Observable } from 'rxjs';
import { AccountCardComponent } from '../../components/account-card/account-card.component';

const primeSources = [
  EntryTableComponent,
  CardModule,
  ButtonModule,
  TabsModule,
];

@Component({
  selector: 'app-detail-account',
  imports: [AsyncPipe, AccountCardComponent, ...primeSources],
  templateUrl: './detail-account.component.html',
  styleUrl: './detail-account.component.scss',
})
export class DetailAccountComponent {
  private activatedRoute = inject(ActivatedRoute);
  private store$ = inject(Store<AppState>);
  private entriesService = inject(EntryService);
  private accountId: string;
  //
  account$: Observable<Account | undefined>;
  entries$ = new Observable<ResultListDto<Entry>>();
  constructor() {
    this.accountId = this.activatedRoute.snapshot.params['accountId'];
    if (!this.accountId) {
      alert('he que pedo no hay accId');
    }

    this.account$ = this.store$.select(selectAccountById(this.accountId));
  }

  searchEntries(accountId: string, search?: EntrySearchDto) {
    if (search) search.accountId = accountId;
    this.entries$ = this.entriesService.search(search);
  }

  //TODO:
  //agregar tabla de registros para cuenta especifica con filtros
  //agregar boton para editar/borrar
  //widtgets con graficas
}
