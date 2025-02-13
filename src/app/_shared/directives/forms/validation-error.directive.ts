import { Directive, DoCheck, ElementRef, inject, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appValidationError]',
  standalone: true,
})
export class ValidationErrorDirective implements DoCheck {
  private elementRef = inject(ElementRef);

  @Input('appValidationError')
  control: string | undefined;
  @Input()
  directive: FormGroupDirective | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  ngDoCheck() {
    if (this.directive && this.control !== '') {
      const ctrl = this.directive?.form.controls[this.control!];
      if (ctrl?.invalid && this.directive?.submitted) {
        this.errors = ctrl?.errors;
        this.updateErrorMessage();
      } else {
        this.cleanErrorMessage();
      }
    }
  }

  /**
   * Updates the displayed error message in the DOM.
   */
  private updateErrorMessage() {
    const error = this.getErrorMessage(this.errors);
    if (error && error !== '') {
      this.elementRef.nativeElement.innerHTML = error;
      this.elementRef.nativeElement.classList.add('text-red-500');
    } else {
      this.cleanErrorMessage();
    }
  }

  private cleanErrorMessage() {
    this.errors = undefined;
    this.elementRef.nativeElement.innerHTML = '';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getErrorMessage(errors: any): string {
    let errorMessage = '';
    if (errors.required) {
      errorMessage += 'Este campo es requerido. ';
    }
    if (errors.email) {
      errorMessage += 'Formato de correo invalido. ';
    }
    if (errors.minlength) {
      errorMessage += `Este campo debe tener al menos ${errors.minlength.requiredLength} caracteres. `;
    }
    if (errors.maxlength) {
      errorMessage += `Este campo no puede tener más de ${errors.maxlength.requiredLength} caracteres. `;
    }
    // Agregar más condiciones según sea necesario
    return errorMessage.trim();
  }
}
