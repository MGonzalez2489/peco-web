/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { AsyncPipe } from '@angular/common';
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { AccountType } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { InvalidDirtyDirective } from '@shared/directives/forms';
import { AppState } from '@store/reducers';
import { selectCatAccountTypes } from '@store/selectors';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select-account-type',
  imports: [
    FloatLabelModule,
    AsyncPipe,
    SelectModule,
    ReactiveFormsModule,
    InvalidDirtyDirective,
  ],
  template: `<p-floatlabel>
    <p-select
      [options]="(accountTypes$ | async)!"
      optionLabel="displayName"
      fluid="true"
      id="accountType"
      [formControl]="formControl"
      (onChange)="select($event)"
      (onBlur)="onTouched()"
      [appInvalidDirty]="directive"
    />
    <label for="typeAccount">Tipo de Cuenta</label>
  </p-floatlabel> `,
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
  implements ControlValueAccessor, Validator, OnInit
{
  @Input()
  directive: FormGroupDirective | undefined;

  private store$ = inject(Store<AppState>);
  accountTypes$ = this.store$.select(selectCatAccountTypes);

  formControl = new FormControl();

  ngOnInit(): void {
    //map validators
    const validators = this.rootControl?.validator;
    if (validators) {
      this.formControl.setValidators(validators);
      this.formControl.updateValueAndValidity();
    }
  }

  get rootControl() {
    if (this.directive && this.directive.control) {
      const form = this.directive.control.get('accountType');
      return form;
    }
    return null;
  }
  select(event: SelectChangeEvent) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.onChange(event.value);
  }

  //ControlValueAccessor && Validator
  onChange = (_: any) => {
    this.writeValue(_);
  };
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnValidatorChange?(_fn: () => void): void {}
}
