import { Component, inject } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/actions/auth.actions';
import { AppState } from '@store/reducers';
//primeng
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { LoginDto } from '@core/models/dtos';
import { ErrorMessageComponent } from '@shared/components/information';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { CustomValidators } from '@shared/validators/passwordMatch.validator';
import { selectIsBusy } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

const components = [
  ButtonModule,
  CardModule,
  InputTextModule,
  FloatLabelModule,
  PasswordModule,
];

@Component({
  selector: 'app-register',
  imports: [
    ...components,
    ReactiveFormsModule,
    RouterLink,
    ErrorMessageComponent,
    ValidationErrorDirective,
    InvalidDirtyDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private store$ = inject(Store<AppState>);
  isBusy = toSignal(this.store$.select(selectIsBusy));
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [CustomValidators.MatchValidator('password', 'confirmPassword')],
  );

  submit(): void {
    if (this.registerForm.invalid) return;

    const request: LoginDto = {
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };

    this.store$.dispatch(AuthActions.register({ data: request }));
  }
}
