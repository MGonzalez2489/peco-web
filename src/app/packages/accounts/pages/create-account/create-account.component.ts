import { AccountFormComponent } from '@accounts/components/account-form/account-form.component';
import { AccountCreateDto } from '@accounts/dto';
import { Component, effect, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { BasePage } from '@shared/components/base';
import { AccountActions } from '@store/actions/account.actions';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, PanelModule, AccountFormComponent],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent extends BasePage {
  private actions$ = inject(Actions);

  constructor() {
    super();
    effect(() => {
      this.actions$.pipe(ofType(AccountActions.createSuccess)).subscribe(() => {
        this.saveAccount(null);
      });
    });
  }

  saveAccount(newAccount: AccountCreateDto | null) {
    if (!newAccount) {
      this.location.back();
      return;
    }

    this.store$.dispatch(AccountActions.create({ data: newAccount! }));
  }
}
