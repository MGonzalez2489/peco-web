import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '@core/models/entities';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AccountActions } from '@store/actions/account.actions';
import { AppState } from '@store/reducers';
import { selectAccountById } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-delete-account',
  imports: [
    CardModule,
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
  private actions$ = inject(Actions);
  private router = inject(Router);

  account = signal<Account | undefined>(undefined);

  constructor() {
    const accId = this.activatedRoute.snapshot.params['accountId'];
    this.account.set(toSignal(this.store$.select(selectAccountById(accId)))());

    effect(() => {
      this.actions$.pipe(ofType(AccountActions.deleteSuccess)).subscribe(() => {
        this.cancel();
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/accounts']);
  }

  delete(accountId: string): void {
    this.store$.dispatch(AccountActions.delete({ accountId }));
  }
  updateIsDefault(newValue: boolean) {
    const currentAccount = this.account();
    if (currentAccount) {
      console.log('newvalue', newValue);
    }
  }
}
