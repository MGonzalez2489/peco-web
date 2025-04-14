import { AccountFormComponent } from '@accounts/components/account-form/account-form.component';
import { AccountCreateDto } from '@accounts/dto';
import { Component, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Account } from '@core/models/entities';
import { ofType } from '@ngrx/effects';
import { BasePageComponent } from '@shared/components/base';
import { AccountActions } from '@store/actions/account.actions';
import { selectAccountById } from '@store/selectors';
import { PanelModule } from 'primeng/panel';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-account',
  imports: [PanelModule, AccountFormComponent],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss',
})
export class EditAccountComponent extends BasePageComponent {
  account = signal<Account | undefined>(undefined);

  constructor() {
    super();
    const accId = this.getParamFromRoute('accountId');
    if (!accId) {
      this.navigateBack();
    }

    this.account.set(toSignal(this.store$.select(selectAccountById(accId)))());

    effect(() => {
      this.actions$
        .pipe(ofType(AccountActions.updateSuccess), takeUntil(this.destroy$))
        .subscribe(() => {
          this.saveAccount(null);
        });
    });
  }
  saveAccount(newAccount: AccountCreateDto | null) {
    if (!newAccount) {
      this.location.back();
      return;
    }

    this.store$.dispatch(
      AccountActions.update({
        data: newAccount!,
        accountId: this.account()!.publicId!,
      }),
    );
  }
}
