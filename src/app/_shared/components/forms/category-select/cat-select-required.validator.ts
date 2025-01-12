import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function CatSelectRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    //required validators
    // if (isRequired) {
    if (!value) {
      return { required: true };
    }
    if (value === '-1') {
      return { invalid: true };
    }
    // }

    if (!value) {
      return null;
    }

    return null;
  };
}
