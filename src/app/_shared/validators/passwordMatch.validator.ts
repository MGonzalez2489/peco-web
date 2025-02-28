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
      }
      return null;
    };
  }
}
