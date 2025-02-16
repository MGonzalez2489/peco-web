/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { AsyncPipe, NgClass } from '@angular/common';
import { Component, forwardRef, inject, OnInit, Optional } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { AccountType } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { BaseComponent } from '@shared/components/_base.component';
import { AppState } from '@store/reducers';
import { selectCatAccountTypes } from '@store/selectors';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-account-type',
  imports: [
    FloatLabelModule,
    AsyncPipe,
    SelectModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './select-account-type.component.html',
  styleUrl: './select-account-type.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAccountTypeComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,

      useExisting: forwardRef(() => SelectAccountTypeComponent),
      multi: true,
    },
  ],
})
export class SelectAccountTypeComponent
  extends BaseComponent
  implements ControlValueAccessor, Validator, OnInit
{
  private store$ = inject(Store<AppState>);
  accountTypes$ = this.store$.select(selectCatAccountTypes);

  formControl = new FormControl();

  errorMessage: string | undefined;

  constructor(@Optional() private controlContainer: ControlContainer) {
    super();
  }

  ngOnInit(): void {
    if (this.rootControl?.hasValidator(Validators.required)) {
      this.formControl.addValidators(Validators.required);
      this.formControl.updateValueAndValidity();
    }

    this.formControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.onChange(value);
      });

    // Subscribe to statusChanges to update the validation messages
    this.formControl.statusChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.errors(this.formControl.errors);
      });
  }

  get rootControl() {
    if (this.controlContainer && this.controlContainer.control) {
      return this.controlContainer.control.get('accountType');
    }
    return null;
  }

  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(obj: AccountType): void {
    this.formControl.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_control: AbstractControl): ValidationErrors | null {
    return this.formControl.validator?.(this.formControl) ?? null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.formControl.statusChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(fn);
  }

  select(event: SelectChangeEvent) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.formControl.setValue(event.value);
  }
  errors(errors: ValidationErrors | null) {
    this.errorMessage = undefined;

    if (errors) {
      this.errorMessage = Object.keys(errors)
        .map((key) => {
          switch (key) {
            case 'required':
              return 'Este campo es requerido.';
            case 'email':
              return 'Formato de correo inválido.';
            case 'minlength':
              return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
            case 'maxlength':
              return `Este campo no puede tener más de ${errors['maxlength'].requiredLength} caracteres.`;
            default:
              return '';
          }
        })
        .join(' ');
    }
  }
}
