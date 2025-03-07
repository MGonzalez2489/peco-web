import { JsonPipe, Location } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountCreateDto } from '@core/models/dtos';
import { Account, AccountType } from '@core/models/entities';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SelectAccountTypeComponent } from '@shared/components/form';
import { ValidationErrorDirective } from '@shared/directives/forms';
import { AccountActions } from '@store/actions/account.actions';
import { AppState } from '@store/reducers';
import { selectAccountById, selectCatAccountTypes } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-edit-account',
  imports: [
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    InputNumberModule,
    SelectModule,
    ValidationErrorDirective,
    SelectAccountTypeComponent,
    JsonPipe,
  ],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss',
})
export class EditAccountComponent {
  private activatedRoute = inject(ActivatedRoute);
  private store$ = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private location = inject(Location);

  accountTypes = toSignal(this.store$.select(selectCatAccountTypes));

  account = signal<Account | undefined>(undefined);

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    balance: new FormControl<number>(0),
    accountType: new FormControl<AccountType | undefined>(undefined, [
      Validators.required,
    ]),
    isDefault: new FormControl(false),
  });

  constructor() {
    const accId = this.activatedRoute.snapshot.params['accountId'];

    this.account.set(toSignal(this.store$.select(selectAccountById(accId)))());
    effect(() => {
      const acc = this.account();
      if (acc) {
        this.form.patchValue({
          name: acc.name,
          balance: acc.balance,
          isDefault: acc.isDefault,
          accountType: acc.type,
        });
      }
    });

    effect(() => {
      this.actions$.pipe(ofType(AccountActions.updateSuccess)).subscribe(() => {
        this.cancel();
      });
    });
  }

  submit() {
    if (this.form.invalid) return;

    const acc = this.account();
    if (acc) {
      const newValue: AccountCreateDto = {
        name: this.form.value.name!,
        accountTypeId: this.form.value.accountType!.publicId,
        balance: this.form.value.balance!,
        isDefault: this.form.value.isDefault!,
      };

      this.store$.dispatch(
        AccountActions.update({
          data: newValue,
          accountId: acc.publicId,
        }),
      );
    }
  }
  cancel(): void {
    this.location.back();
  }
}
