import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInDto } from '@core/models/dtos';
import { Store } from '@ngrx/store';
import { SigninAction } from '@store/actions/auth.action';
import { AppState } from '@store/states';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: false,
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  store$ = inject(Store<AppState>);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.form.invalid) return;

    this.store$.dispatch(
      SigninAction({ params: this.form.value as SignInDto }),
    );
  }
}
