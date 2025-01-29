import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { CardModule } from 'primeng/card';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { AccountActions } from '@store/actions/account.actions';
import { BaseComponent } from '@shared/components';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { AccountCreateDto } from '@core/models/dtos';

@Component({
  selector: 'app-create-account',
  imports: [
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent extends BaseComponent {
  store$ = inject(Store<AppState>);
  actions$ = inject(Actions);
  router = inject(Router);
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    balance: new FormControl<number>(0, [Validators.required]),
    isDefault: new FormControl<boolean>(false),
  });

  submit(): void {
    if (this.form.invalid) return;

    this.store$.dispatch(
      AccountActions.create({ data: this.form.value as AccountCreateDto }),
    );

    this.actions$
      .pipe(ofType(AccountActions.createSuccess), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.cancel();
      });
  }

  cancel(): void {
    this.router.navigate(['/accounts']);
  }
}
