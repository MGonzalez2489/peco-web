import { AccountCardComponent } from '@accounts/components/account-card/account-card.component';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ResultListDto } from '@core/models/dtos';
import { EntrySearchDto } from '@core/models/dtos/search';
import { Account, Entry } from '@core/models/entities';
import { EntryTableComponent } from '@entries/components';
import { EntryService } from '@entries/entry.service';
import { BasePage } from '@shared/components/base';
import { selectAccountById } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';

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
export class DetailAccountComponent extends BasePage {
  private activatedRoute = inject(ActivatedRoute);
  private entriesService = inject(EntryService);

  account = signal<Account | undefined>(undefined);
  entries = signal<ResultListDto<Entry> | undefined>(undefined);
  private searchSignal = signal<EntrySearchDto | undefined>(undefined);

  constructor() {
    super();
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
