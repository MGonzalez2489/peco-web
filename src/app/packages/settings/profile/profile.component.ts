import { Component, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ofType } from '@ngrx/effects';
import { BasePageComponent } from '@shared/components/base';
import { UserActions } from '@store/actions/profile.actions';
import { selectUser } from '@store/selectors';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { UpdateUserDto } from './dto/user.dto';
import { takeUntil } from 'rxjs';

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
export class ProfileComponent extends BasePageComponent {
  mode = signal<'read' | 'edit'>('read');

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl<Date | null>(null),
  });

  user = toSignal(this.store$.select(selectUser));

  constructor() {
    super();
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
        .pipe(ofType(UserActions.updateUserSuccess), takeUntil(this.destroy$))
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
