import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '@core/bases';
import { SignInDto } from '@core/models/dtos';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  RegisterAction,
  RegisterSuccessAction,
} from '@store/actions/auth.action';
import { AppState } from '@store/states';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends BaseComponent {
  private store$ = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private router = inject(Router);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.form.invalid) return;

    const data: SignInDto = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.store$.dispatch(RegisterAction({ params: data }));

    this.actions$
      .pipe(ofType(RegisterSuccessAction), takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.router.navigate(['/home']);
      });
  }
}
