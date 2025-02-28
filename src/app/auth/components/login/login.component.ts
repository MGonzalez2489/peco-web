import { Component, inject } from '@angular/core';
import {
  FormBuilder,
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
import { selectIsBusy } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

const components = [
  ButtonModule,
  CardModule,
  InputTextModule,
  FloatLabelModule,
  PasswordModule,
  CheckboxModule,
];

@Component({
  selector: 'app-login',
  imports: [
    ...components,
    ReactiveFormsModule,
    RouterLink,
    ErrorMessageComponent,
    InvalidDirtyDirective,
    ValidationErrorDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private store$ = inject(Store<AppState>);
  private formBuilder = inject(FormBuilder);

  isBusy = toSignal(this.store$.select(selectIsBusy));
  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberme: new FormControl(false),
    });
  }

  submit(): void {
    if (this.loginForm.invalid) return;

    const request: LoginDto = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.store$.dispatch(AuthActions.login({ data: request }));
  }
}
