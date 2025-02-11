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
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginDto } from '@core/models/dtos';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

const components = [
  ButtonModule,
  CardModule,
  InputTextModule,
  FloatLabelModule,
  PasswordModule,
  Message,
  CheckboxModule,
];

@Component({
  selector: 'app-login',
  imports: [...components, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  store$ = inject(Store<AppState>);
  formBuilder = inject(FormBuilder);
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
