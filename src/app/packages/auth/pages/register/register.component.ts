import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthActions } from '@store/actions/auth.actions';
//primeng
import { RouterLink } from '@angular/router';
import { LoginDto } from '@auth/dto/login.dto';
import { BasePage } from '@shared/components/base';
import { ErrorMessageComponent } from '@shared/components/information';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { CustomValidators } from '@shared/validators/passwordMatch.validator';
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
export class RegisterComponent extends BasePage {
  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [CustomValidators.MatchValidator('password', 'confirmPassword')],
  );

  submit(): void {
    if (this.form.invalid) return;

    const request: LoginDto = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.store$.dispatch(AuthActions.register({ data: request }));
  }
}
