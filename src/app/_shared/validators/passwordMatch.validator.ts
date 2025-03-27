import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      if (!sourceCtrl || !targetCtrl) return null;

      const sValue = sourceCtrl.value;
      const tValue = targetCtrl.value;

      if (!sValue || !tValue) return null;

      if (tValue !== sValue) {
        sourceCtrl.setErrors({ mismatch: true });
        targetCtrl.setErrors({ mismatch: true });
        return { mismatch: true };
      }

      if (sourceCtrl.hasError('mismatch')) {
        delete sourceCtrl!.errors!['mismatch'];
        sourceCtrl.updateValueAndValidity();
      }
      if (targetCtrl.hasError('mismatch')) {
        delete targetCtrl!.errors!['mismatch'];
        targetCtrl.updateValueAndValidity();
      }

      return null;
    };
  }
}
