import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserActions } from '@store/actions/profile.actions';
import { AppState } from '@store/reducers';
import { selectUser } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { UpdateUserDto } from './dto/user.dto';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    FloatLabelModule,
    ButtonModule,
    PanelModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private store$ = inject(Store<AppState>);
  private actions$ = inject(Actions);
  router = inject(Router);

  mode = signal<'read' | 'edit'>('read');

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl<Date | null>(null),
  });

  user = toSignal(this.store$.select(selectUser));

  constructor() {
    effect(() => {
      this.patchForm();
    });

    effect(() => {
      const m = this.mode();
      if (m === 'read') {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
    effect(() => {
      this.actions$
        .pipe(ofType(UserActions.updateUserSuccess))
        .subscribe(() => {
          this.mode.set('read');
        });
    });
  }

  cancel(): void {
    this.mode.set('read');
    this.patchForm();
  }

  submit(): void {
    if (this.form.invalid) return;

    this.store$.dispatch(
      UserActions.updateUser({ data: this.form.value as UpdateUserDto }),
    );
  }
  private patchForm() {
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
  }
}
