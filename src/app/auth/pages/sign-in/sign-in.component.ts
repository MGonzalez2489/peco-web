import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '@core/bases';
import { SignInDto } from '@core/models/dtos';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SigninAction, SigninSuccessAction } from '@store/actions/auth.action';
import { AppState } from '@store/states';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: false,
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent extends BaseComponent {
  store$ = inject(Store<AppState>);
  actions$ = inject(Actions);
  router = inject(Router);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.form.invalid) return;

    this.store$.dispatch(
      SigninAction({ params: this.form.value as SignInDto }),
    );

    this.actions$
      .pipe(ofType(SigninSuccessAction), takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.router.navigate(['/home']);
      });
  }
}
