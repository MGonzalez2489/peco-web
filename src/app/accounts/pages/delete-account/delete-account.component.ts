import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '@core/models/entities';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { selectAccountById } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-account',
  imports: [
    CardModule,
    AsyncPipe,
    CurrencyPipe,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    FieldsetModule,
  ],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss',
})
export class DeleteAccountComponent {
  private store$ = inject(Store<AppState>);
  private activatedRoute = inject(ActivatedRoute);

  actions$ = inject(Actions);
  router = inject(Router);
  account$: Observable<Account | undefined>;
  constructor() {
    const accountId = this.activatedRoute.snapshot.params['accountId'];
    this.account$ = this.store$.select(selectAccountById(accountId));
  }

  cancel(): void {
    this.router.navigate(['/accounts']);
  }
  delete(): void {
    this.cancel();
  }
}
