import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '@core/models/entities';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@shared/components';
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
import { takeUntil } from 'rxjs';

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
    AsyncPipe,
  ],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss',
})
export class EditAccountComponent extends BaseComponent {
  private activatedRoute = inject(ActivatedRoute);
  private store$ = inject(Store<AppState>);

  actions$ = inject(Actions);
  router = inject(Router);
  accountTypes$ = this.store$.select(selectCatAccountTypes);

  accountId: string;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    balance: new FormControl<number>(0),
    accountTypeId: new FormControl<string>('', [Validators.required]),
    isDefault: new FormControl(false),
  });

  constructor() {
    super();
    this.accountId = this.activatedRoute.snapshot.params['accountId'];
    this.store$
      .select(selectAccountById(this.accountId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.form.patchValue({
          name: data?.name,
          balance: data?.balance,
          isDefault: data?.isDefault,
          accountTypeId: data?.type.publicId,
        });
      });
  }

  submit() {
    if (this.form.invalid) return;

    this.store$.dispatch(
      AccountActions.update({
        data: this.form.value as Account,
        accountId: this.accountId,
      }),
    );

    this.actions$
      .pipe(ofType(AccountActions.updateSuccess), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.cancel();
      });
  }
  cancel(): void {
    this.router.navigate(['/accounts']);
  }
}
