import { AccountCardComponent } from '@accounts/components/account-card/account-card.component';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ResultListDto } from '@core/models/dtos';
import { EntrySearchDto, SearchDto } from '@core/models/dtos/search';
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
  private entryService = inject(EntryService);

  account = signal<Account | undefined>(undefined);
  entries = signal<ResultListDto<Entry> | undefined>(undefined);

  constructor() {
    super();
    const accId = this.activatedRoute.snapshot.params['accountId'];
    this.account.set(toSignal(this.store$.select(selectAccountById(accId)))());
  }
  onSearch(search: SearchDto): void {
    this.entryService.search(search as EntrySearchDto).subscribe((data) => {
      this.entries.set(data);
    });
  }

  //TODO:
  //agregar boton para editar/borrar
  //widtgets con graficas
}
