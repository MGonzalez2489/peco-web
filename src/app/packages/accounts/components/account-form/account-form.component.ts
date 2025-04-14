import { AccountCreateDto } from '@accounts/dto';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Account, AccountType } from '@core/models/entities';
import { BaseComponent } from '@shared/components/base';
import {
  FormButtonsComponent,
  SelectAccountTypeComponent,
  SelectColorComponent,
} from '@shared/components/form';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-account-form',
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
    PanelModule,
    SelectColorComponent,
    FormButtonsComponent,
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent extends BaseComponent {
  @Input()
  set account(value: Account | undefined) {
    if (value) this.patchForm(value);
  }

  @Output()
  save = new EventEmitter<AccountCreateDto | null>();

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    balance: new FormControl<number>(0, [Validators.required]),
    accountType: new FormControl<AccountType | null>(null, [
      Validators.required,
    ]),
    color: new FormControl<string>('', { nonNullable: true }),
    isDefault: new FormControl<boolean>(false),
  });

  patchForm(account: Account) {
    this.form.patchValue({
      name: account.name,
      balance: account.balance,
      isDefault: account.isDefault,
      color: account.color,
      accountType: account.type,
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
    this.save.emit(newAccount);
  }

  cancel(): void {
    this.save.emit(null);
  }
}
