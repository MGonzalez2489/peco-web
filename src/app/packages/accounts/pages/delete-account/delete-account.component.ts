import { CurrencyPipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Account } from '@core/models/entities';
import { ofType } from '@ngrx/effects';
import { BasePageComponent } from '@shared/components/base';
import { AccountActions } from '@store/actions/account.actions';
import { selectAccountById } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { takeUntil } from 'rxjs';

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
export class DeleteAccountComponent extends BasePageComponent {
  account = signal<Account | undefined>(undefined);

  constructor() {
    super();
    const accountId = this.getParamFromRoute('accountId');
    this.account.set(
      toSignal(this.store$.select(selectAccountById(accountId)))(),
    );

    effect(() => {
      this.actions$
        .pipe(ofType(AccountActions.deleteSuccess), takeUntil(this.destroy$))
        .subscribe(() => {
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
