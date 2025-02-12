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
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginDto } from '@core/models/dtos';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { selectIsBusy } from '@store/selectors';
import { ErrorMessageComponent } from '@shared/components/information';

const components = [
  ButtonModule,
  CardModule,
  InputTextModule,
  FloatLabelModule,
  PasswordModule,
  Message,
];

@Component({
  selector: 'app-register',
  imports: [
    ...components,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    ErrorMessageComponent,
    AsyncPipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  store$ = inject(Store<AppState>);
  isBusy$ = this.store$.select(selectIsBusy);
  formBuilder = inject(FormBuilder);
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    if (this.registerForm.invalid) return;

    const request: LoginDto = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.store$.dispatch(AuthActions.register({ data: request }));
  }
}
