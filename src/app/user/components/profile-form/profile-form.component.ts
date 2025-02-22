import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserDto } from '@core/models/dtos';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@shared/components';
import { UserActions } from '@store/actions/profile.actions';
import { AppState } from '@store/reducers';
import { selectUser } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    FloatLabelModule,
    CardModule,
    ButtonModule,
    JsonPipe,
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent extends BaseComponent {
  private store$ = inject(Store<AppState>);

  actions$ = inject(Actions);
  router = inject(Router);

  form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    dateOfBirth: new FormControl(),
  });
  user$ = this.store$.select(selectUser);

  constructor() {
    super();
    this.store$
      .select(selectUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        console.log('entro a mapear data');
        this.form.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth
            ? new Date(data.dateOfBirth)
            : undefined,
        });
      });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.store$.dispatch(
      UserActions.updateUser({ data: this.form.value as UpdateUserDto }),
    );

    this.actions$
      .pipe(ofType(UserActions.updateUserSuccess), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.cancel();
      });
  }
  cancel(): void {
    this.router.navigateByUrl('/profile');
  }
}
