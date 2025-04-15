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
import { AuthRoutesEnum } from '@auth/auth.routes';
import { LoginDto } from '@auth/dto/login.dto';
import { BasePageComponent } from '@shared/components/base';
import { ErrorMessageComponent } from '@shared/components/information';
import { ControlSizeDirective } from '@shared/directives';
import {
  InvalidDirtyDirective,
  ValidationErrorDirective,
} from '@shared/directives/forms';
import { CustomValidators } from '@shared/validators/passwordMatch.validator';
import { AutoFocus } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    InputTextModule,
    AutoFocus,
    ReactiveFormsModule,
    RouterLink,
    ErrorMessageComponent,
    ValidationErrorDirective,
    InvalidDirtyDirective,
    ControlSizeDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends BasePageComponent {
  authRoutes = AuthRoutesEnum;
  protected form = new FormGroup(
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
