/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, computed, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Base } from '../base';
@Component({ template: '' })
export class BaseFormControl
  extends Base
  implements ControlValueAccessor, Validator, OnInit
{
  @Input() directive: FormGroupDirective | undefined;
  formControl = new FormControl();

  protected inpId = 'someInput';

  rootControl = computed(() => {
    if (this.directive && this.directive.control) {
      return this.directive.control.get(this.inpId);
    }
    return null;
  });
  validators = computed(() => {
    return this.rootControl()?.validator;
  });

  ngOnInit(): void {
    if (this.validators()) {
      this.formControl.setValidators(this.validators()!);
      this.formControl.updateValueAndValidity();
    }
  }

  onChange = (_: any) => {
    this.writeValue(_);
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
