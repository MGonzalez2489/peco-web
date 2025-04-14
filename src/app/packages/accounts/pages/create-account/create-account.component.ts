import { AccountFormComponent } from '@accounts/components/account-form/account-form.component';
import { AccountCreateDto } from '@accounts/dto';
import { NgTemplateOutlet } from '@angular/common';
import { Component, effect } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ofType } from '@ngrx/effects';
import { BasePageComponent } from '@shared/components/base';
import { AccountActions } from '@store/actions/account.actions';
import { PanelModule } from 'primeng/panel';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-account',
  imports: [
    ReactiveFormsModule,
    PanelModule,
    AccountFormComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent extends BasePageComponent {
  constructor() {
    super();
    effect(() => {
      this.actions$
        .pipe(ofType(AccountActions.createSuccess), takeUntil(this.destroy$))
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

    this.store$.dispatch(AccountActions.create({ data: newAccount! }));
  }
}
