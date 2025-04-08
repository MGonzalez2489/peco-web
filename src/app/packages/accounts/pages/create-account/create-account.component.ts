import { Component, effect, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';

import { AccountCreateDto } from '@accounts/dto';
import { AccountType } from '@core/models/entities';
import { BasePage } from '@shared/components/base';
import {
  SelectAccountTypeComponent,
  SelectColorComponent,
} from '@shared/components/form';
import { ErrorMessageComponent } from '@shared/components/information';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { AccountActions } from '@store/actions/account.actions';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-create-account',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    SelectModule,
    SelectAccountTypeComponent,
    InvalidDirtyDirective,
    ValidationErrorDirective,
    ErrorMessageComponent,
    PanelModule,
    SelectColorComponent,
    JsonPipe,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent extends BasePage {
  private actions$ = inject(Actions);

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    balance: new FormControl<number>(0, [Validators.required]),
    accountType: new FormControl<AccountType | null>(null, [
      Validators.required,
    ]),
    color: new FormControl<string>('', { nonNullable: true }),
    isDefault: new FormControl<boolean>(false),
  });

  constructor() {
    super();
    effect(() => {
      const createSuccess = this.actions$.pipe(
        ofType(AccountActions.createSuccess),
      );
      createSuccess.subscribe(() => {
        this.cancel();
      });
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const newAccount: AccountCreateDto = {
      name: this.form.value.name!,
      accountTypeId: this.form.value.accountType!.publicId,
      balance: this.form.value.balance!,
      isDefault: this.form.value.isDefault!,
      color: this.form.value.color!,
    };
    this.store$.dispatch(AccountActions.create({ data: newAccount }));
  }

  cancel(): void {
    this.location.back();
  }
}
