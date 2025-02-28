import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserDto } from '@core/models/dtos';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/profile.actions';
import { AppState } from '@store/reducers';
import { selectUser } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    FloatLabelModule,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private store$ = inject(Store<AppState>);
  actions$ = inject(Actions);
  router = inject(Router);

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl<Date | null>(null),
  });

  user = toSignal(this.store$.select(selectUser));

  constructor() {
    effect(() => {
      const userData = this.user();
      if (userData) {
        this.form.patchValue({
          firstName: userData.firstName,
          lastName: userData.lastName,
          dateOfBirth: userData.dateOfBirth
            ? new Date(userData.dateOfBirth)
            : null,
        });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.store$.dispatch(
      UserActions.updateUser({ data: this.form.value as UpdateUserDto }),
    );

    this.actions$.pipe(ofType(UserActions.updateUserSuccess)).subscribe(() => {
      console.log('actualizado');
    });
  }
}
