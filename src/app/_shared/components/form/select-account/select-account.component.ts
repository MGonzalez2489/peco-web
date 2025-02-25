/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { AsyncPipe, TitleCasePipe } from '@angular/common';
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
import { Account } from '@core/models/entities';
import { Store } from '@ngrx/store';
import { InvalidDirtyDirective } from '@shared/directives/forms';
import { AppState } from '@store/reducers';
import { selectAccounts } from '@store/selectors';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select-account',
  imports: [
    SelectModule,
    FloatLabelModule,
    AsyncPipe,
    InvalidDirtyDirective,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  standalone: true,
  template: `<p-floatlabel>
    <p-select
      [options]="(accounts$ | async)!"
      optionLabel="name"
      [fluid]="true"
      id="account"
      [formControl]="formControl"
      (onChange)="select($event)"
      (onBlur)="onTouched()"
      [appInvalidDirty]="directive"
    >
      <ng-template #selectedItem let-selectedOption>
        @if (selectedOption) {
          <div>{{ selectedOption.name | titlecase }}</div>
        }
      </ng-template>
      <ng-template let-account #item>
        <div>{{ account.name | titlecase }}</div>
      </ng-template>
    </p-select>

    <label for="account">Cuenta</label>
  </p-floatlabel> `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAccountComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,

      useExisting: forwardRef(() => SelectAccountComponent),
      multi: true,
    },
  ],
})
export class SelectAccountComponent
  implements ControlValueAccessor, Validator, OnInit
{
  @Input()
  directive: FormGroupDirective | undefined;

  private store$ = inject(Store<AppState>);
  accounts$ = this.store$.select(selectAccounts);

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
      const form = this.directive.control.get('account');
      return form;
    }
    return null;
  }

  select(event: SelectChangeEvent) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.onChange(event.value);
  }

  //value accesor
  onChange = (_value: Account) => {};

  onTouched = () => {};

  writeValue(obj: any): void {
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
}
