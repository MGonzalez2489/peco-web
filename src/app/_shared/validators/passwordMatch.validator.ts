import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      if (sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value) {
        sourceCtrl.setErrors({ mismatch: true });
        targetCtrl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        if (
          sourceCtrl &&
          sourceCtrl.errors &&
          sourceCtrl.hasError('mismatch')
        ) {
          delete sourceCtrl.errors['mismatch'];
          sourceCtrl.updateValueAndValidity();
        }
        if (
          targetCtrl &&
          targetCtrl.errors &&
          targetCtrl.hasError('mismatch')
        ) {
          delete targetCtrl.errors['mismatch'];
          targetCtrl.updateValueAndValidity();
        }
        return null;
      }
    };
  }
}
